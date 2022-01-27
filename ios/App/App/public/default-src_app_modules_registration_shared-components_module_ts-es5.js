(function () {
  "use strict";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["default-src_app_modules_registration_shared-components_module_ts"], {
    /***/
    69579: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "IsEmptyHelper": function IsEmptyHelper() {
          return (
            /* binding */
            _IsEmptyHelper
          );
        }
        /* harmony export */

      });

      var stringify = __webpack_require__(
      /*! json-stringify-safe */
      73050);

      var _IsEmptyHelper = /*#__PURE__*/function () {
        function _IsEmptyHelper() {
          _classCallCheck(this, _IsEmptyHelper);
        }

        _createClass(_IsEmptyHelper, null, [{
          key: "isEmpty",
          value: function isEmpty(obj) {
            if (obj === null || obj === undefined) {
              return true;
            } else if (typeof obj === 'string') {
              return obj.length === 0;
            } else if (typeof obj === 'number' || typeof obj === 'boolean') {
              return false;
            } else if (obj instanceof Array) {
              var arr = obj;
              return arr.length === 0 || !arr.some(function (x) {
                return !_IsEmptyHelper.isEmpty(x);
              });
            } else {
              var props = Object.getOwnPropertyNames(obj);

              if (props.length === 0) {
                return stringify(obj) === '{}';
              } else {
                return !props.some(function (x) {
                  return !_IsEmptyHelper.isEmpty(obj[x]);
                });
              }
            }
          }
        }]);

        return _IsEmptyHelper;
      }();
      /***/

    },

    /***/
    5361: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LocationService": function LocationService() {
          return (
            /* binding */
            _LocationService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var _modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../modules/auth/services/regobs-auth.service */
      18955);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @varsom-regobs-common/regobs-api */
      39778);

      var _LocationService = /*#__PURE__*/function () {
        function _LocationService(regobsAuthService, apiLocationService) {
          _classCallCheck(this, _LocationService);

          this.regobsAuthService = regobsAuthService;
          this.apiLocationService = apiLocationService;
        }

        _createClass(_LocationService, [{
          key: "getLocationWithinRadiusObservable",
          value: function getLocationWithinRadiusObservable(geoHazard, lat, lng, radius) {
            var _this = this;

            return this.regobsAuthService.loggedInUser$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)(function (loggedInUser) {
              return _this.apiLocationService.LocationWithinRadius({
                geoHazardTypeIds: [geoHazard],
                radius: radius,
                latitude: lat,
                longitude: lng,
                observerGuid: null,
                returnCount: 100
              });
            }));
          }
        }]);

        return _LocationService;
      }();

      _LocationService.ɵfac = function LocationService_Factory(t) {
        return new (t || _LocationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_3__.LocationService));
      };

      _LocationService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
        token: _LocationService,
        factory: _LocationService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    3942: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UserGroupService": function UserGroupService() {
          return (
            /* binding */
            _UserGroupService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _nanosql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../nanosql */
      20580);
      /* harmony import */


      var _modules_data_load_services_data_load_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../modules/data-load/services/data-load.service */
      97123);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs */
      73794);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs */
      9553);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs */
      57850);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs */
      14500);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../modules/auth/services/regobs-auth.service */
      18955);
      /* harmony import */


      var _nano_sql_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @nano-sql/core */
      43268);
      /* harmony import */


      var _nano_sql_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nano_sql_core__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @varsom-regobs-common/regobs-api */
      39778);

      var _UserGroupService = /*#__PURE__*/function () {
        function _UserGroupService(regobsAuthService, userSettingService, accountApiService, dataLoadService) {
          _classCallCheck(this, _UserGroupService);

          this.regobsAuthService = regobsAuthService;
          this.userSettingService = userSettingService;
          this.accountApiService = accountApiService;
          this.dataLoadService = dataLoadService;
        }

        _createClass(_UserGroupService, [{
          key: "updateUserGroups",
          value: function updateUserGroups() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var loggedInUser, appMode;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.regobsAuthService.getLoggedInUserAsPromise();

                    case 2:
                      loggedInUser = _context.sent;

                      if (!loggedInUser.isLoggedIn) {
                        _context.next = 9;
                        break;
                      }

                      _context.next = 6;
                      return (0, rxjs__WEBPACK_IMPORTED_MODULE_7__.firstValueFrom)(this.userSettingService.appMode$);

                    case 6:
                      appMode = _context.sent;
                      _context.next = 9;
                      return this.checkLastUpdatedAndUpdateDataIfNeeded(appMode, loggedInUser.email);

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "checkLastUpdatedAndUpdateDataIfNeeded",
          value: function checkLastUpdatedAndUpdateDataIfNeeded(appMode, email) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var dataLoadId, dataLoad, lastUpdateLimit;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      dataLoadId = this.getDataLoadId(appMode, email);
                      _context2.next = 3;
                      return this.dataLoadService.getState(dataLoadId);

                    case 3:
                      dataLoad = _context2.sent;
                      lastUpdateLimit = moment__WEBPACK_IMPORTED_MODULE_3___default()().subtract(1, 'hour');

                      if (!(!dataLoad.lastUpdated || moment__WEBPACK_IMPORTED_MODULE_3___default()(dataLoad.lastUpdated).isBefore(lastUpdateLimit))) {
                        _context2.next = 8;
                        break;
                      }

                      _context2.next = 8;
                      return this.updateUserGroupsForUser(appMode, email);

                    case 8:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "updateUserGroupsForUser",
          value: function updateUserGroupsForUser(appMode, email) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var dataLoadId, result;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      dataLoadId = this.getDataLoadId(appMode, email);
                      _context3.next = 3;
                      return this.dataLoadService.startLoading(dataLoadId);

                    case 3:
                      _context3.next = 5;
                      return (0, rxjs__WEBPACK_IMPORTED_MODULE_8__.lastValueFrom)(this.accountApiService.AccountGetObserverGroups());

                    case 5:
                      result = _context3.sent;
                      this.saveUserGroups(appMode, email, result);
                      _context3.next = 9;
                      return this.dataLoadService.loadingCompleted(dataLoadId, result.length);

                    case 9:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "saveUserGroups",
          value: function saveUserGroups(appMode, email, observerGroups) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var userGroups, instanceName;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      userGroups = (observerGroups || []).map(function (val) {
                        return {
                          key: "".concat(email, "_").concat(val.Id),
                          userId: email,
                          Id: val.Id,
                          Name: val.Name
                        };
                      });
                      instanceName = _nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.getInstanceName(_nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.TABLES.OBSERVER_GROUPS.name, appMode);
                      _context4.next = 4;
                      return (0, _nano_sql_core__WEBPACK_IMPORTED_MODULE_5__.nSQL)(instanceName).loadJS(userGroups);

                    case 4:
                      _context4.next = 6;
                      return this.deleteUserGroupsNoLongerInResult(appMode, userGroups.map(function (ug) {
                        return ug.key;
                      }));

                    case 6:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "deleteUserGroupsNoLongerInResult",
          value: function deleteUserGroupsNoLongerInResult(appMode, ids) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return _nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.getInstance(_nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.TABLES.OBSERVER_GROUPS.name, appMode).query('delete').where(function (dbGroup) {
                        return ids.indexOf(dbGroup.key) < 0;
                      }).exec();

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }));
          }
        }, {
          key: "getDataLoadId",
          value: function getDataLoadId(appMode, email) {
            return "".concat(_nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.TABLES.OBSERVER_GROUPS.name, "_").concat(appMode, "_").concat(email);
          }
        }, {
          key: "getUserGroupsAsObservable",
          value: function getUserGroupsAsObservable() {
            var _this2 = this;

            return (0, rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([this.regobsAuthService.loggedInUser$, this.userSettingService.appMode$]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  loggedInUser = _ref2[0],
                  appMode = _ref2[1];

              return loggedInUser.isLoggedIn ? (0, rxjs__WEBPACK_IMPORTED_MODULE_11__.from)(_this2.getUserGroupsFromDb(appMode, loggedInUser.email)) : (0, rxjs__WEBPACK_IMPORTED_MODULE_11__.from)(Promise.resolve([]));
            }));
          }
        }, {
          key: "getUserGroups",
          value: function getUserGroups() {
            return this.getUserGroupsAsObservable().pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.take)(1)).toPromise();
          }
        }, {
          key: "getUserGroupsFromDb",
          value: function getUserGroupsFromDb(appMode, email) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      return _context6.abrupt("return", _nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.getInstance(_nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.TABLES.OBSERVER_GROUPS.name, appMode).query('select').where(function (x) {
                        return x.userId === email;
                      }).exec());

                    case 1:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }));
          }
        }]);

        return _UserGroupService;
      }();

      _UserGroupService.ɵfac = function UserGroupService_Factory(t) {
        return new (t || _UserGroupService)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_4__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_14__.AccountService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_modules_data_load_services_data_load_service__WEBPACK_IMPORTED_MODULE_2__.DataLoadService));
      };

      _UserGroupService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({
        token: _UserGroupService,
        factory: _UserGroupService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    47434: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LeafletClusterHelper": function LeafletClusterHelper() {
          return (
            /* binding */
            _LeafletClusterHelper
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../settings */
      30015);

      var _LeafletClusterHelper = /*#__PURE__*/function () {
        function _LeafletClusterHelper() {
          _classCallCheck(this, _LeafletClusterHelper);
        }

        _createClass(_LeafletClusterHelper, null, [{
          key: "createMarkerClusterGroup",
          value: function createMarkerClusterGroup(options) {
            var defaultOptions = {
              spiderfyOnMaxZoom: true,
              showCoverageOnHover: false,
              zoomToBoundsOnClick: true,
              maxClusterRadius: _settings__WEBPACK_IMPORTED_MODULE_1__.settings.map.maxClusterRadius,
              iconCreateFunction: _LeafletClusterHelper.createClusterIcon
            };
            return leaflet__WEBPACK_IMPORTED_MODULE_0__.markerClusterGroup(Object.assign(Object.assign({}, defaultOptions), options || {}));
          }
        }, {
          key: "createClusterIcon",
          value: function createClusterIcon(cluster) {
            var length = cluster.getAllChildMarkers().length;
            var size = length < 100 ? 35 : length < 1000 ? 50 : 70;
            return leaflet__WEBPACK_IMPORTED_MODULE_0__.divIcon({
              html: '<div>' + length + '</div>',
              iconSize: [size, size],
              iconAnchor: [size / 2.0, size / 2.0],
              className: 'circle-marker-cluster'
            });
          }
        }]);

        return _LeafletClusterHelper;
      }();
      /***/

    },

    /***/
    26869: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AddPictureItemComponent": function AddPictureItemComponent() {
          return (
            /* binding */
            _AddPictureItemComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @ionic-native/camera/ngx */
      34483);
      /* harmony import */


      var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../settings */
      30015);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var _core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../core/helpers/data-url.helper */
      78872);
      /* harmony import */


      var _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic-native/ionic-webview/ngx */
      73039);
      /* harmony import */


      var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic-native/file/ngx */
      18659);
      /* harmony import */


      var _shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../shared/services/logging/logging.service */
      93042);
      /* harmony import */


      var _shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../shared/services/logging/log-level.model */
      73465);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! rxjs */
      47599);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! rxjs */
      32185);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! rxjs/operators */
      34864);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! src/app/core/helpers/observable-helper */
      59364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../blob-image/blob-image.component */
      44037);
      /* harmony import */


      var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../text-comment/text-comment.component */
      32032);

      function AddPictureItemComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "ro-blob-image", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-fab", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-fab-button", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddPictureItemComponent_div_1_Template_ion_fab_button_click_3_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r4);

            var attachment_r1 = restoredCtx.$implicit;

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r3.removeImage(attachment_r1);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](4, "ion-icon", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "app-text-comment", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function AddPictureItemComponent_div_1_Template_app_text_comment_valueChange_5_listener($event) {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r4);

            var attachment_r1 = restoredCtx.$implicit;
            return attachment_r1.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var attachment_r1 = ctx.$implicit;

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("imgBlob", attachment_r1.blob);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 4, ctx_r0.pictureCommentText));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](7, 6, ctx_r0.pictureCommentPlaceholder));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", attachment_r1.Comment);
        }
      }

      var DEBUG_TAG = 'AddPictureItemComponent';
      var MIME_TYPE = 'image/jpeg';

      var _AddPictureItemComponent = /*#__PURE__*/function (_src_app_core_helpers) {
        _inherits(_AddPictureItemComponent, _src_app_core_helpers);

        var _super = _createSuper(_AddPictureItemComponent);

        function _AddPictureItemComponent(translateService, camera, platform, file, logger, webView, toastController, domSanitizer, actionSheetController, newAttachmentService, cdr) {
          var _this3;

          _classCallCheck(this, _AddPictureItemComponent);

          _this3 = _super.call(this);
          _this3.translateService = translateService;
          _this3.camera = camera;
          _this3.platform = platform;
          _this3.file = file;
          _this3.logger = logger;
          _this3.webView = webView;
          _this3.toastController = toastController;
          _this3.domSanitizer = domSanitizer;
          _this3.actionSheetController = actionSheetController;
          _this3.newAttachmentService = newAttachmentService;
          _this3.cdr = cdr;
          _this3.title = 'REGISTRATION.ADD_IMAGES';
          _this3.pictureCommentText = 'REGISTRATION.IMAGE_DESCRIPTION';
          _this3.pictureCommentPlaceholder = 'REGISTRATION.IMAGE_DESCRIPTION_PLACEHOLDER';
          _this3.icon = 'camera';
          _this3.showIcon = true;
          _this3.iconColor = 'dark';
          _this3.attachmentType = 'Attachment';
          return _this3;
        }

        _createClass(_AddPictureItemComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this4 = this;

            this.newAttachmentService.getAttachments(this.registrationId).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(function (attachments) {
              return attachments.filter(function (a) {
                return a.RegistrationTID === _this4.registrationTid && a.type === _this4.attachmentType && a.ref === _this4.ref;
              });
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(function (attachments) {
              return attachments.length === 0 ? (0, rxjs__WEBPACK_IMPORTED_MODULE_15__.of)([]) : (0, rxjs__WEBPACK_IMPORTED_MODULE_16__.forkJoin)(_toConsumableArray(attachments.map(function (a) {
                return _this4.newAttachmentService.getBlob(_this4.registrationId, a.id).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.take)(1), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(function (blob) {
                  return Object.assign(Object.assign({}, a), {
                    blob: blob
                  });
                }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.catchError)(function (err) {
                  _this4.logger.error(err, DEBUG_TAG, 'Could not get blob from attachment');

                  return (0, rxjs__WEBPACK_IMPORTED_MODULE_15__.of)(Object.assign(Object.assign({}, a), {
                    blob: undefined
                  }));
                }));
              })));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.takeUntil)(this.ngDestroy$)).subscribe(function (result) {
              _this4.attachments = result;

              _this4.cdr.detectChanges();
            });
          }
        }, {
          key: "addClick",
          value: function addClick() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var _this5 = this;

              var translations, actionSheet;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!(this.onBeforeAdd !== undefined)) {
                        _context7.next = 3;
                        break;
                      }

                      _context7.next = 3;
                      return Promise.resolve(this.onBeforeAdd());

                    case 3:
                      _context7.next = 5;
                      return this.translateService.get(['REGISTRATION.GENERAL_COMMENT.ADD_PICTURE', 'REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO', 'REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY', 'DIALOGS.CANCEL']).toPromise();

                    case 5:
                      translations = _context7.sent;
                      _context7.next = 8;
                      return this.actionSheetController.create({
                        header: translations['REGISTRATION.GENERAL_COMMENT.ADD_PICTURE'],
                        buttons: [{
                          text: translations['REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO'],
                          handler: function handler() {
                            return _this5.getPicture(_this5.camera.PictureSourceType.CAMERA);
                          }
                        }, {
                          text: translations['REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY'],
                          handler: function handler() {
                            return _this5.getPicture(_this5.camera.PictureSourceType.PHOTOLIBRARY);
                          }
                        }, {
                          text: translations['DIALOGS.CANCEL'],
                          role: 'cancel'
                        }]
                      });

                    case 8:
                      actionSheet = _context7.sent;
                      actionSheet.present();

                    case 10:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));
          }
        }, {
          key: "getPicture",
          value: function getPicture(sourceType) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var options, imageUrl, arrayBuffer;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (this.platform.is('hybrid')) {
                        _context8.next = 4;
                        break;
                      }

                      _context8.next = 3;
                      return this.addDummyImage();

                    case 3:
                      return _context8.abrupt("return", true);

                    case 4:
                      _context8.prev = 4;
                      options = {
                        quality: _settings__WEBPACK_IMPORTED_MODULE_1__.settings.images.quality,
                        destinationType: this.camera.DestinationType.FILE_URI,
                        sourceType: sourceType,
                        encodingType: this.camera.EncodingType.JPEG,
                        mediaType: this.camera.MediaType.PICTURE,
                        targetHeight: _settings__WEBPACK_IMPORTED_MODULE_1__.settings.images.size,
                        targetWidth: _settings__WEBPACK_IMPORTED_MODULE_1__.settings.images.size,
                        correctOrientation: true,
                        saveToPhotoAlbum: sourceType === _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_0__.PictureSourceType.CAMERA // NOTE: saveToPhotoAlbum=true causes a bug in latest cordova cameraplugin

                      };
                      _context8.next = 8;
                      return this.camera.getPicture(options);

                    case 8:
                      imageUrl = _context8.sent;
                      _context8.next = 11;
                      return this.validateImage(imageUrl);

                    case 11:
                      if (_context8.sent) {
                        _context8.next = 14;
                        break;
                      }

                      this.showErrorToast('REGISTRATION.INVALID_IMAGE'); //TODO: Vis bedre feilmelding

                      return _context8.abrupt("return", true);

                    case 14:
                      this.logger.debug("Got image url from camera plugin: ".concat(imageUrl), DEBUG_TAG);
                      _context8.next = 17;
                      return this.getArrayBuffer(imageUrl);

                    case 17:
                      arrayBuffer = _context8.sent;
                      _context8.next = 20;
                      return this.addImage(new Blob([arrayBuffer]), MIME_TYPE);

                    case 20:
                      _context8.next = 26;
                      break;

                    case 22:
                      _context8.prev = 22;
                      _context8.t0 = _context8["catch"](4);
                      this.logger.log('User could not add image, most likely no access or invalid image', _context8.t0, _shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_8__.LogLevel.Warning, DEBUG_TAG);
                      this.showErrorToast('Could not save image. Do you have enough space?'); //TODO: Vis bedre feilmelding og på flere språk

                    case 26:
                      return _context8.abrupt("return", true);

                    case 27:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this, [[4, 22]]);
            }));
          }
        }, {
          key: "getArrayBuffer",
          value: function getArrayBuffer(fileUrl) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var entry, pathSplitted, filename, directory, arrayBuffer;
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return this.file.resolveLocalFilesystemUrl(fileUrl);

                    case 2:
                      entry = _context9.sent;

                      if (entry.isFile) {
                        _context9.next = 5;
                        break;
                      }

                      throw Error("".concat(fileUrl, " is not a file!"));

                    case 5:
                      pathSplitted = entry.nativeURL.split('/');
                      filename = pathSplitted.pop();
                      directory = pathSplitted.join('/');
                      _context9.next = 10;
                      return this.file.readAsArrayBuffer(directory, filename);

                    case 10:
                      arrayBuffer = _context9.sent;
                      return _context9.abrupt("return", arrayBuffer);

                    case 12:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "validateImage",
          value: function validateImage(src) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
              var entry;
              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      if (!src) {
                        _context10.next = 5;
                        break;
                      }

                      _context10.next = 3;
                      return this.file.resolveLocalFilesystemUrl(src);

                    case 3:
                      entry = _context10.sent;
                      return _context10.abrupt("return", entry.name.endsWith('jpg'));

                    case 5:
                      return _context10.abrupt("return", false);

                    case 6:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, _callee10, this);
            }));
          }
        }, {
          key: "showErrorToast",
          value: function showErrorToast(messageKey) {
            var _this6 = this;

            this.translateService.get(messageKey).subscribe(function (translation) {
              return (0, tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(_this6, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var toast;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.next = 2;
                        return this.toastController.create({
                          message: translation,
                          mode: 'md',
                          duration: 4000
                        });

                      case 2:
                        toast = _context11.sent;
                        toast.present();

                      case 4:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11, this);
              }));
            });
          }
        }, {
          key: "addDummyImage",
          value: function addDummyImage() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
              var dummyImage, blob;
              return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      _context12.next = 2;
                      return _core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__.DataUrlHelper.getDataUrlFromSrcUrl('/assets/images/dummyregobsimage.jpeg');

                    case 2:
                      dummyImage = _context12.sent;
                      blob = _core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__.DataUrlHelper.convertDataURIToBinary(dummyImage);
                      _context12.next = 6;
                      return this.addImage(new Blob([blob]), 'image/jpeg');

                    case 6:
                    case "end":
                      return _context12.stop();
                  }
                }
              }, _callee12, this);
            }));
          }
        }, {
          key: "addImage",
          value: function addImage(data, mimeType) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.next = 2;
                      return this.newAttachmentService.addAttachment(this.registrationId, data, mimeType, this.geoHazard, this.registrationTid, this.attachmentType, this.ref);

                    case 2:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, _callee13, this);
            }));
          }
        }, {
          key: "removeImage",
          value: function removeImage(image) {
            this.newAttachmentService.removeAttachment(this.registrationId, image.id);
          }
        }]);

        return _AddPictureItemComponent;
      }(src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_9__.NgDestoryBase);

      _AddPictureItemComponent.ɵfac = function AddPictureItemComponent_Factory(t) {
        return new (t || _AddPictureItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_0__.Camera), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_22__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_6__.File), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_7__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_5__.WebView), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_22__.ToastController), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_22__.ActionSheetController), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__.NewAttachmentService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.ChangeDetectorRef));
      };

      _AddPictureItemComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
        type: _AddPictureItemComponent,
        selectors: [["app-add-picture-item"]],
        inputs: {
          registrationId: "registrationId",
          registrationTid: "registrationTid",
          geoHazard: "geoHazard",
          title: "title",
          pictureCommentText: "pictureCommentText",
          pictureCommentPlaceholder: "pictureCommentPlaceholder",
          icon: "icon",
          showIcon: "showIcon",
          iconColor: "iconColor",
          onBeforeAdd: "onBeforeAdd",
          attachmentType: "attachmentType",
          ref: "ref"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
        decls: 7,
        vars: 6,
        consts: [[1, "images"], ["class", "image-wrapper", 4, "ngFor", "ngForOf"], [3, "click"], ["slot", "start", 3, "color", "name"], [1, "image-wrapper"], [3, "imgBlob"], ["slot", "fixed", "vertical", "top", "horizontal", "end", 1, "ion-no-margin"], ["size", "small", "color", "dark", 1, "map-control-fab", 3, "click"], ["name", "close"], ["rows", "2", 3, "value", "title", "placeholder", "valueChange"]],
        template: function AddPictureItemComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, AddPictureItemComponent_div_1_Template, 8, 8, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-item", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddPictureItemComponent_Template_ion_item_click_2_listener() {
              return ctx.addClick();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx.attachments);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", ctx.iconColor)("name", ctx.icon);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 4, ctx.title));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonLabel, _blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_10__.BlobImageComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonFab, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonFabButton, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__.TextCommentComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe],
        styles: [".images[_ngcontent-%COMP%] {\n  padding-top: 0px;\n  padding-top: var(--images-padding-top, 0px);\n  padding-bottom: 0px;\n  padding-bottom: var(--images-padding-bottom, 0px);\n  background: inherit;\n  background: var(--images-background, inherit);\n}\n.images[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  padding-bottom: 0px;\n  padding-bottom: var(--image-wrapper-padding-bottom, 0px);\n  margin-left: 0px;\n  margin-left: var(--image-wrapper-margin-left, 0px);\n  margin-right: 0px;\n  margin-right: var(--image-wrapper-margin-right, 0px);\n  background: inherit;\n  background: var(--image-wrapper-background, inherit);\n}\n.images[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   app-text-comment[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: -5px;\n  --ion-item-background: var(--image-comment-background, #fff);\n}\n.images[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   ion-fab-button[_ngcontent-%COMP%] {\n  padding: 8px;\n  margin: unset;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtFQUFBLDJDQUFBO0VBQ0EsbUJBQUE7RUFBQSxpREFBQTtFQUNBLG1CQUFBO0VBQUEsNkNBQUE7QUFDSjtBQUFJO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUFBLHdEQUFBO0VBQ0EsZ0JBQUE7RUFBQSxrREFBQTtFQUNBLGlCQUFBO0VBQUEsb0RBQUE7RUFDQSxtQkFBQTtFQUFBLG9EQUFBO0FBRVI7QUFBUTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLDREQUFBO0FBRVo7QUFDUTtFQUNJLFlBQUE7RUFDQSxhQUFBO0FBQ1oiLCJmaWxlIjoiYWRkLXBpY3R1cmUtaXRlbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWFnZXMge1xyXG4gICAgcGFkZGluZy10b3A6IHZhcigtLWltYWdlcy1wYWRkaW5nLXRvcCwgMHB4KTtcclxuICAgIHBhZGRpbmctYm90dG9tOiB2YXIoLS1pbWFnZXMtcGFkZGluZy1ib3R0b20sIDBweCk7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pbWFnZXMtYmFja2dyb3VuZCwgaW5oZXJpdCk7XHJcbiAgICAuaW1hZ2Utd3JhcHBlciB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiB2YXIoLS1pbWFnZS13cmFwcGVyLXBhZGRpbmctYm90dG9tLCAwcHgpO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1pbWFnZS13cmFwcGVyLW1hcmdpbi1sZWZ0LCAwcHgpO1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogdmFyKC0taW1hZ2Utd3JhcHBlci1tYXJnaW4tcmlnaHQsIDBweCk7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW1hZ2Utd3JhcHBlci1iYWNrZ3JvdW5kLCBpbmhlcml0KTtcclxuXHJcbiAgICAgICAgYXBwLXRleHQtY29tbWVudCB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtNXB4O1xyXG4gICAgICAgICAgICAtLWlvbi1pdGVtLWJhY2tncm91bmQ6ICB2YXIoLS1pbWFnZS1jb21tZW50LWJhY2tncm91bmQsICNmZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW9uLWZhYi1idXR0b24ge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICAgICAgICAgIG1hcmdpbjogdW5zZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19 */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    15248: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AddWebUrlItemComponent": function AddWebUrlItemComponent() {
          return (
            /* binding */
            _AddWebUrlItemComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _pages_add_web_url_modal_add_web_url_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../pages/add-web-url-modal/add-web-url-modal.page */
      47687);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function AddWebUrlItemComponent_ion_item_0_span_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var url_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", url_r1.UrlDescription, " - ");
        }
      }

      function AddWebUrlItemComponent_ion_item_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AddWebUrlItemComponent_ion_item_0_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);

            var i_r2 = restoredCtx.index;

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r5.addOrEdit(i_r2);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, AddWebUrlItemComponent_ion_item_0_span_2_Template, 2, 1, "span", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var url_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", url_r1.UrlDescription);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](url_r1.UrlLine);
        }
      }

      var _AddWebUrlItemComponent = /*#__PURE__*/function () {
        function _AddWebUrlItemComponent(modalController, zone) {
          _classCallCheck(this, _AddWebUrlItemComponent);

          this.modalController = modalController;
          this.zone = zone;
          this.title = 'REGISTRATION.ADD_WEB_URL.TITLE';
          this.weburlsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.icon = 'add-circle-outline';
          this.iconColor = 'dark';
        }

        _createClass(_AddWebUrlItemComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "addOrEdit",
          value: function addOrEdit(index) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
              var weburl, modal, result;
              return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      weburl = index !== undefined ? this.weburls[index] : undefined;
                      _context14.next = 3;
                      return this.modalController.create({
                        component: _pages_add_web_url_modal_add_web_url_modal_page__WEBPACK_IMPORTED_MODULE_0__.AddWebUrlModalPage,
                        componentProps: {
                          weburl: weburl
                        }
                      });

                    case 3:
                      modal = _context14.sent;
                      modal.present();
                      _context14.next = 7;
                      return modal.onDidDismiss();

                    case 7:
                      result = _context14.sent;

                      if (result.data) {
                        if (result.data["delete"]) {
                          this.removeAtIndex(index);
                        } else {
                          if (index !== undefined) {
                            this.setWebUrl(index, result.data);
                          } else {
                            this.addWebUrl(result.data);
                          }
                        }
                      }

                    case 9:
                    case "end":
                      return _context14.stop();
                  }
                }
              }, _callee14, this);
            }));
          }
        }, {
          key: "setWebUrl",
          value: function setWebUrl(index, url) {
            var _this7 = this;

            this.zone.run(function () {
              _this7.weburls[index] = url;

              _this7.weburlsChange.emit(_this7.weburls);
            });
          }
        }, {
          key: "addWebUrl",
          value: function addWebUrl(url) {
            var _this8 = this;

            this.zone.run(function () {
              if (!_this8.weburls) {
                _this8.weburls = [];
              }

              _this8.weburls.push(url);

              _this8.weburlsChange.emit(_this8.weburls);
            });
          }
        }, {
          key: "removeAtIndex",
          value: function removeAtIndex(index) {
            var _this9 = this;

            this.zone.run(function () {
              if (_this9.weburls && _this9.weburls.length > 0) {
                _this9.weburls.splice(index, 1);

                _this9.weburlsChange.emit(_this9.weburls);
              }
            });
          }
        }]);

        return _AddWebUrlItemComponent;
      }();

      _AddWebUrlItemComponent.ɵfac = function AddWebUrlItemComponent_Factory(t) {
        return new (t || _AddWebUrlItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone));
      };

      _AddWebUrlItemComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _AddWebUrlItemComponent,
        selectors: [["app-add-web-url-item"]],
        inputs: {
          title: "title",
          weburls: "weburls",
          icon: "icon",
          iconColor: "iconColor"
        },
        outputs: {
          weburlsChange: "weburlsChange"
        },
        decls: 6,
        vars: 6,
        consts: [[3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["slot", "start", 3, "color", "name"], [4, "ngIf"]],
        template: function AddWebUrlItemComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AddWebUrlItemComponent_ion_item_0_Template, 4, 2, "ion-item", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AddWebUrlItemComponent_Template_ion_item_click_1_listener() {
              return ctx.addOrEdit();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "ion-icon", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.weburls);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", ctx.iconColor)("name", ctx.icon);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 4, ctx.title));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtd2ViLXVybC1pdGVtLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    30922: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "Base64ImageComponent": function Base64ImageComponent() {
          return (
            /* binding */
            _Base64ImageComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);

      var _Base64ImageComponent = /*#__PURE__*/function () {
        function _Base64ImageComponent(sanitizer) {
          _classCallCheck(this, _Base64ImageComponent);

          this.sanitizer = sanitizer;
          this.dataUrlTag = 'data:image/jpeg;base64,';
        }

        _createClass(_Base64ImageComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var applyImageUrlTag = !this.base64encodedImage.startsWith('data:image');
            this.imgSrc = this.sanitizer.bypassSecurityTrustUrl((applyImageUrlTag ? this.dataUrlTag : '') + this.base64encodedImage);
          }
        }]);

        return _Base64ImageComponent;
      }();

      _Base64ImageComponent.ɵfac = function Base64ImageComponent_Factory(t) {
        return new (t || _Base64ImageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer));
      };

      _Base64ImageComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _Base64ImageComponent,
        selectors: [["app-base64-image"]],
        inputs: {
          base64encodedImage: "base64encodedImage",
          dataUrlTag: "dataUrlTag"
        },
        decls: 1,
        vars: 1,
        consts: [[3, "src"]],
        template: function Base64ImageComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiYXNlNjQtaW1hZ2UuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    44037: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "BlobImageComponent": function BlobImageComponent() {
          return (
            /* binding */
            _BlobImageComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);

      var _BlobImageComponent = /*#__PURE__*/function () {
        function _BlobImageComponent(sanitizer) {
          _classCallCheck(this, _BlobImageComponent);

          this.sanitizer = sanitizer;
        }

        _createClass(_BlobImageComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.blobUrl = URL.createObjectURL(this.imgBlob);
            this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(this.blobUrl);
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.blobUrl) {
              URL.revokeObjectURL(this.blobUrl);
            }
          }
        }]);

        return _BlobImageComponent;
      }();

      _BlobImageComponent.ɵfac = function BlobImageComponent_Factory(t) {
        return new (t || _BlobImageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer));
      };

      _BlobImageComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BlobImageComponent,
        selectors: [["ro-blob-image"]],
        inputs: {
          imgBlob: "imgBlob"
        },
        decls: 1,
        vars: 1,
        consts: [[3, "src"]],
        template: function BlobImageComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
          }
        },
        styles: ["img[_ngcontent-%COMP%] {\n  height: inherit;\n  width: inherit;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ItaW1hZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUFDRiIsImZpbGUiOiJibG9iLWltYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW1ne1xyXG4gIGhlaWdodDogaW5oZXJpdDtcclxuICB3aWR0aDogaW5oZXJpdDtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxufSJdfQ== */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    40241: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HelpTextComponent": function HelpTextComponent() {
          return (
            /* binding */
            _HelpTextComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _services_help_text_help_text_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../services/help-text/help-text.service */
      30325);
      /* harmony import */


      var _pages_modal_pages_help_modal_help_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../pages/modal-pages/help-modal/help-modal.page */
      94763);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function HelpTextComponent_ion_grid_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-grid");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-col", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ion-button", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HelpTextComponent_ion_grid_0_Template_ion_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r1.showHelp();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 1, "HELP.TITLE"));
        }
      }

      var _HelpTextComponent = /*#__PURE__*/function () {
        function _HelpTextComponent(helpTextService, userSettingService, modalController, ngZone) {
          _classCallCheck(this, _HelpTextComponent);

          this.helpTextService = helpTextService;
          this.userSettingService = userSettingService;
          this.modalController = modalController;
          this.ngZone = ngZone;
          this.isVisible = false;
        }

        _createClass(_HelpTextComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
              var _this10 = this;

              var userSetting;
              return regeneratorRuntime.wrap(function _callee15$(_context15) {
                while (1) {
                  switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.next = 2;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1)).toPromise();

                    case 2:
                      userSetting = _context15.sent;
                      _context15.next = 5;
                      return this.helpTextService.getHelpTextByKey(userSetting.language, userSetting.appMode, this.geoHazard, this.registrationTid);

                    case 5:
                      this.helpText = _context15.sent;

                      if (this.helpText) {
                        this.ngZone.run(function () {
                          _this10.isVisible = true;
                        });
                      }

                    case 7:
                    case "end":
                      return _context15.stop();
                  }
                }
              }, _callee15, this);
            }));
          }
        }, {
          key: "showHelp",
          value: function showHelp() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
              var modal;
              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      _context16.next = 2;
                      return this.modalController.create({
                        component: _pages_modal_pages_help_modal_help_modal_page__WEBPACK_IMPORTED_MODULE_2__.HelpModalPage,
                        componentProps: {
                          helpText: this.helpText.Text
                        }
                      });

                    case 2:
                      modal = _context16.sent;
                      modal.present();

                    case 4:
                    case "end":
                      return _context16.stop();
                  }
                }
              }, _callee16, this);
            }));
          }
        }]);

        return _HelpTextComponent;
      }();

      _HelpTextComponent.ɵfac = function HelpTextComponent_Factory(t) {
        return new (t || _HelpTextComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_help_text_help_text_service__WEBPACK_IMPORTED_MODULE_1__.HelpTextService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone));
      };

      _HelpTextComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _HelpTextComponent,
        selectors: [["app-help-text"]],
        inputs: {
          registrationTid: "registrationTid",
          geoHazard: "geoHazard"
        },
        decls: 1,
        vars: 1,
        consts: [[4, "ngIf"], [1, "ion-text-center"], ["fill", "clear", 3, "click"]],
        template: function HelpTextComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, HelpTextComponent_ion_grid_0_Template, 6, 3, "ion-grid", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isVisible);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButton],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWxwLXRleHQuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    31610: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "KdvRadiobuttonListComponent": function KdvRadiobuttonListComponent() {
          return (
            /* binding */
            _KdvRadiobuttonListComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../core/services/kdv/kdv.service */
      88430);
      /* harmony import */


      var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../core/helpers/observable-helper */
      59364);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function KdvRadiobuttonListComponent_ion_list_header_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-list-header", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 1, ctx_r0.title), " ");
        }
      }

      function KdvRadiobuttonListComponent_ion_radio_group_1_ng_container_1_div_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "selected": a0
        };
      };

      function KdvRadiobuttonListComponent_ion_radio_group_1_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-item", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "ion-radio", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, KdvRadiobuttonListComponent_ion_radio_group_1_ng_container_1_div_5_Template, 2, 0, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var item_r4 = ctx.$implicit;

          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c0, item_r4.Id === ctx_r3.value))("hidden", !ctx_r3.isVisible(item_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.useDescription ? item_r4.Description : item_r4.Name);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", item_r4.Id);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r4.Id === ctx_r3.value);
        }
      }

      function KdvRadiobuttonListComponent_ion_radio_group_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-radio-group", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function KdvRadiobuttonListComponent_ion_radio_group_1_Template_ion_radio_group_ngModelChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r6.onChange($event);
          })("ngModelChange", function KdvRadiobuttonListComponent_ion_radio_group_1_Template_ion_radio_group_ngModelChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r8.value = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, KdvRadiobuttonListComponent_ion_radio_group_1_ng_container_1_Template, 6, 7, "ng-container", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var kdvelements_r2 = ctx.ngIf;

          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r1.value);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", kdvelements_r2);
        }
      }

      var _c1 = ["*"];

      var _KdvRadiobuttonListComponent = /*#__PURE__*/function () {
        function _KdvRadiobuttonListComponent(kdvService, ngZone) {
          _classCallCheck(this, _KdvRadiobuttonListComponent);

          this.kdvService = kdvService;
          this.ngZone = ngZone;
          this.showZeroValues = false;
          this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        }

        _createClass(_KdvRadiobuttonListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.kdvelements$ = this.kdvService.getKdvRepositoryByKeyObservable(this.kdvKey).pipe((0, _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_1__.enterZone)(this.ngZone));
          }
        }, {
          key: "onChange",
          value: function onChange(value) {
            this.valueChange.emit(value);
          }
        }, {
          key: "isVisible",
          value: function isVisible(item) {
            if (this.showZeroValues) {
              return true;
            } else {
              return item.Id % 100 !== 0;
            }
          }
        }]);

        return _KdvRadiobuttonListComponent;
      }();

      _KdvRadiobuttonListComponent.ɵfac = function KdvRadiobuttonListComponent_Factory(t) {
        return new (t || _KdvRadiobuttonListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__.KdvService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone));
      };

      _KdvRadiobuttonListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _KdvRadiobuttonListComponent,
        selectors: [["app-kdv-radiobutton-list"]],
        inputs: {
          title: "title",
          kdvKey: "kdvKey",
          value: "value",
          useDescription: "useDescription",
          showZeroValues: "showZeroValues"
        },
        outputs: {
          valueChange: "valueChange"
        },
        ngContentSelectors: _c1,
        decls: 3,
        vars: 4,
        consts: [["class", "ion-text-uppercase", 4, "ngIf"], [3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "ion-text-uppercase"], [3, "ngModel", "ngModelChange"], [4, "ngFor", "ngForOf"], [3, "ngClass", "hidden"], ["mode", "md", "slot", "start", 3, "value"], [4, "ngIf"]],
        template: function KdvRadiobuttonListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, KdvRadiobuttonListComponent_ion_list_header_0_Template, 4, 3, "ion-list-header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, KdvRadiobuttonListComponent_ion_radio_group_1_Template, 2, 2, "ion-radio-group", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.title);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, ctx.kdvelements$));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonRadioGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonRadio, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.RadioValueAccessor],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJrZHYtcmFkaW9idXR0b24tbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    22241: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "KdvSelectComponent": function KdvSelectComponent() {
          return (
            /* binding */
            _KdvSelectComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../core/services/kdv/kdv.service */
      88430);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _KdvSelectComponent = /*#__PURE__*/function () {
        function _KdvSelectComponent(kdvService, ngZone) {
          _classCallCheck(this, _KdvSelectComponent);

          this.kdvService = kdvService;
          this.ngZone = ngZone;
          this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
          this.showZeroValues = false;
          this.disabled = false;
          this.labelColor = 'medium';
          this.showResetButton = true;
          this.kdvelements = [];
        }

        _createClass(_KdvSelectComponent, [{
          key: "selectOptions",
          get: function get() {
            var _this11 = this;

            return this.kdvelements.map(function (el) {
              return {
                id: el.Id,
                text: _this11.useDescription ? el.Description : el.Name,
                disabled: !_this11.isVisible(el),
                icon: _this11.getIconFunc ? _this11.getIconFunc(el) : undefined
              };
            });
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this12 = this;

            this.subscription = this.kdvService.getKdvRepositoryByKeyObservable(this.kdvKey).subscribe(function (kdvelements) {
              _this12.ngZone.run(function () {
                _this12.kdvelements = kdvelements;
              });
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
          }
        }, {
          key: "isVisible",
          value: function isVisible(item) {
            if (this.filter !== undefined && !this.filter(item.Id)) {
              return false;
            }

            if (!this.showZeroValues) {
              return item.Id % 100 !== 0;
            }

            return true;
          }
        }]);

        return _KdvSelectComponent;
      }();

      _KdvSelectComponent.ɵfac = function KdvSelectComponent_Factory(t) {
        return new (t || _KdvSelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__.KdvService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone));
      };

      _KdvSelectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _KdvSelectComponent,
        selectors: [["app-kdv-select"]],
        inputs: {
          title: "title",
          kdvKey: "kdvKey",
          value: "value",
          showZeroValues: "showZeroValues",
          disabled: "disabled",
          labelColor: "labelColor",
          showResetButton: "showResetButton",
          useDescription: "useDescription",
          filter: "filter",
          getIconFunc: "getIconFunc"
        },
        outputs: {
          valueChange: "valueChange"
        },
        decls: 5,
        vars: 9,
        consts: [["position", "stacked", 1, "ion-text-uppercase", 3, "color"], [3, "selectedValue", "options", "disabled", "title", "showReset", "selectedValueChange"]],
        template: function KdvSelectComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "app-select", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("selectedValueChange", function KdvSelectComponent_Template_app_select_selectedValueChange_4_listener($event) {
              return ctx.value = $event;
            })("selectedValueChange", function KdvSelectComponent_Template_app_select_selectedValueChange_4_listener($event) {
              return ctx.valueChange.emit($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", ctx.labelColor);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 7, ctx.title));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("selectedValue", ctx.value)("options", ctx.selectOptions)("disabled", ctx.disabled)("title", ctx.title)("showReset", ctx.showResetButton);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_1__.SelectComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJrZHYtc2VsZWN0LmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    14984: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ModalSaveOrDeleteButtonsComponent": function ModalSaveOrDeleteButtonsComponent() {
          return (
            /* binding */
            _ModalSaveOrDeleteButtonsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      54364);

      function ModalSaveOrDeleteButtonsComponent_ion_row_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-col", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ion-button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModalSaveOrDeleteButtonsComponent_ion_row_6_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r1["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ion-icon", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 1, "DIALOGS.DELETE"), " ");
        }
      }

      var _ModalSaveOrDeleteButtonsComponent = /*#__PURE__*/function () {
        function _ModalSaveOrDeleteButtonsComponent(translateService, alertController) {
          _classCallCheck(this, _ModalSaveOrDeleteButtonsComponent);

          this.translateService = translateService;
          this.alertController = alertController;
          this.saveText = 'DIALOGS.OK';
          this.saveDisabled = false;
          this.saveClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.deleteClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.showDelete = false;
          this.alertTitle = 'DIALOGS.ARE_YOU_SURE';
          this.alertMessage = '';
        }

        _createClass(_ModalSaveOrDeleteButtonsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ok",
          value: function ok() {
            this.saveClicked.emit();
          }
        }, {
          key: "delete",
          value: function _delete() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
              var _this13 = this;

              var toTranslate, translations, alert;
              return regeneratorRuntime.wrap(function _callee17$(_context17) {
                while (1) {
                  switch (_context17.prev = _context17.next) {
                    case 0:
                      toTranslate = [this.alertTitle, 'DIALOGS.CANCEL', 'DIALOGS.OK'];

                      if (this.alertMessage) {
                        toTranslate.push(this.alertMessage);
                      }

                      _context17.next = 4;
                      return this.translateService.get(toTranslate).toPromise();

                    case 4:
                      translations = _context17.sent;
                      _context17.next = 7;
                      return this.alertController.create({
                        header: translations[this.alertTitle],
                        message: this.alertMessage ? translations[this.alertMessage] : undefined,
                        buttons: [{
                          text: translations['DIALOGS.CANCEL'],
                          role: 'cancel'
                        }, {
                          text: translations['DIALOGS.OK'],
                          handler: function handler() {
                            _this13.deleteClicked.emit();
                          }
                        }]
                      });

                    case 7:
                      alert = _context17.sent;
                      alert.present();

                    case 9:
                    case "end":
                      return _context17.stop();
                  }
                }
              }, _callee17, this);
            }));
          }
        }]);

        return _ModalSaveOrDeleteButtonsComponent;
      }();

      _ModalSaveOrDeleteButtonsComponent.ɵfac = function ModalSaveOrDeleteButtonsComponent_Factory(t) {
        return new (t || _ModalSaveOrDeleteButtonsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.AlertController));
      };

      _ModalSaveOrDeleteButtonsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _ModalSaveOrDeleteButtonsComponent,
        selectors: [["app-modal-save-or-delete-buttons"]],
        inputs: {
          saveText: "saveText",
          saveDisabled: "saveDisabled",
          showDelete: "showDelete",
          alertTitle: "alertTitle",
          alertMessage: "alertMessage"
        },
        outputs: {
          saveClicked: "saveClicked",
          deleteClicked: "deleteClicked"
        },
        decls: 7,
        vars: 5,
        consts: [[1, "ion-no-padding"], ["size", "6", "offset", "3"], ["expand", "block", "fill", "solid", "color", "primary", 3, "disabled", "click"], [4, "ngIf"], ["size", "small", "fill", "clear", "expand", "block", 3, "click"], ["slot", "start", "name", "trash"]],
        template: function ModalSaveOrDeleteButtonsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-grid", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ion-col", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModalSaveOrDeleteButtonsComponent_Template_ion_button_click_3_listener() {
              return ctx.ok();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ModalSaveOrDeleteButtonsComponent_ion_row_6_Template, 6, 3, "ion-row", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.saveDisabled);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 3, ctx.saveText), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showDelete);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonButton, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    25023: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NavigationButtonsComponent": function NavigationButtonsComponent() {
          return (
            /* binding */
            _NavigationButtonsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _services_summary_item_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/summary-item.service */
      13741);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function NavigationButtonsComponent_ion_button_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavigationButtonsComponent_ion_button_3_Template_ion_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r2.goBack();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "ion-icon", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 1, ctx_r0.previous.title));
        }
      }

      function NavigationButtonsComponent_ion_button_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavigationButtonsComponent_ion_button_5_Template_ion_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r4.goForward();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "ion-icon", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 1, ctx_r1.next.title));
        }
      }

      var _NavigationButtonsComponent = /*#__PURE__*/function () {
        function _NavigationButtonsComponent(summaryItemService, router, ngZone) {
          _classCallCheck(this, _NavigationButtonsComponent);

          this.summaryItemService = summaryItemService;
          this.router = router;
          this.ngZone = ngZone;
        }

        _createClass(_NavigationButtonsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
              var _this14 = this;

              var currentUrl, prevAndNext;
              return regeneratorRuntime.wrap(function _callee18$(_context18) {
                while (1) {
                  switch (_context18.prev = _context18.next) {
                    case 0:
                      currentUrl = this.router.url;
                      _context18.next = 3;
                      return this.summaryItemService.getPreviousAndNext(this.registration, currentUrl);

                    case 3:
                      prevAndNext = _context18.sent;
                      this.ngZone.run(function () {
                        if (prevAndNext.next) {
                          _this14.next = prevAndNext.next;
                        }

                        if (prevAndNext.previous) {
                          _this14.previous = prevAndNext.previous;
                        }
                      });

                    case 5:
                    case "end":
                      return _context18.stop();
                  }
                }
              }, _callee18, this);
            }));
          }
        }, {
          key: "goBack",
          value: function goBack() {
            this.summaryItemService.navigateTo(this.registration, this.previous, 'back');
          }
        }, {
          key: "goForward",
          value: function goForward() {
            this.summaryItemService.navigateTo(this.registration, this.next, 'forward');
          }
        }]);

        return _NavigationButtonsComponent;
      }();

      _NavigationButtonsComponent.ɵfac = function NavigationButtonsComponent_Factory(t) {
        return new (t || _NavigationButtonsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_summary_item_service__WEBPACK_IMPORTED_MODULE_0__.SummaryItemService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone));
      };

      _NavigationButtonsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _NavigationButtonsComponent,
        selectors: [["app-navigation-buttons"]],
        inputs: {
          registration: "registration"
        },
        decls: 6,
        vars: 2,
        consts: [["size", "6"], ["class", "left-button", "color", "primary", "fill", "outline", "expand", "block", 3, "click", 4, "ngIf"], ["class", "right-button", "color", "primary", "fill", "outline", "expand", "block", 3, "click", 4, "ngIf"], ["color", "primary", "fill", "outline", "expand", "block", 1, "left-button", 3, "click"], ["slot", "start", "name", "arrow-back"], ["color", "primary", "fill", "outline", "expand", "block", 1, "right-button", 3, "click"], ["slot", "end", "name", "arrow-forward"]],
        template: function NavigationButtonsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-grid");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-col", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, NavigationButtonsComponent_ion_button_3_Template, 5, 3, "ion-button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ion-col", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, NavigationButtonsComponent_ion_button_5_Template, 5, 3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.previous);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.next);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonText],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
        styles: ["ion-grid[_ngcontent-%COMP%] {\n  --ion-grid-padding: 10px;\n}\n\nion-button[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n\nion-button[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 25px;\n}\n\nion-button.left-button[_ngcontent-%COMP%] {\n  margin-right: 5px;\n}\n\nion-button.right-button[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24tYnV0dG9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQ0FBQTtBQUNGOztBQUFFO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUFFSjs7QUFDRTtFQUNFLGlCQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtBQUFKIiwiZmlsZSI6Im5hdmlnYXRpb24tYnV0dG9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcclxuICAtLWlvbi1ncmlkLXBhZGRpbmc6IDEwcHg7XHJcbn1cclxuXHJcbmlvbi1idXR0b24ge1xyXG4gIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG4gIGlvbi10ZXh0IHtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICBsaW5lLWhlaWdodDogMjVweDtcclxuICB9XHJcblxyXG4gICYubGVmdC1idXR0b24ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgfVxyXG5cclxuICAmLnJpZ2h0LWJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    24857: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NumericInputComponent": function NumericInputComponent() {
          return (
            /* binding */
            _NumericInputComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _pages_modal_pages_numeric_input_modal_numeric_input_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../pages/modal-pages/numeric-input-modal/numeric-input-modal.page */
      89043);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function NumericInputComponent_ion_label_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-label", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx_r0.title), " ");
        }
      }

      function NumericInputComponent_ion_text_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-text", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.displayValue);
        }
      }

      function NumericInputComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-text", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx_r3.placeholder));
        }
      }

      var _NumericInputComponent = /*#__PURE__*/function () {
        function _NumericInputComponent(modalController) {
          _classCallCheck(this, _NumericInputComponent);

          this.modalController = modalController;
          this.decimalPlaces = 0;
          this.min = -100000;
          this.max = 100000;
          this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.readonly = false;
          this.isOpen = false;
        }

        _createClass(_NumericInputComponent, [{
          key: "displayValue",
          get: function get() {
            var converted = this.convert(this.value, 'from');

            if (converted !== undefined) {
              return converted.toLocaleString();
            }

            return undefined;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "openPicker",
          value: function openPicker() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
              var modal, result;
              return regeneratorRuntime.wrap(function _callee19$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      if (!(!this.isOpen && !this.readonly)) {
                        _context19.next = 11;
                        break;
                      }

                      this.isOpen = true;
                      _context19.next = 4;
                      return this.modalController.create({
                        component: _pages_modal_pages_numeric_input_modal_numeric_input_modal_page__WEBPACK_IMPORTED_MODULE_0__.NumericInputModalPage,
                        cssClass: 'numeric-input-modal',
                        componentProps: {
                          value: this.convert(this.value, 'from'),
                          decimalPlaces: this.decimalPlaces,
                          min: this.min,
                          max: this.max,
                          suffix: this.suffix,
                          decimalSeparator: this.decimalSeparator,
                          title: this.title
                        }
                      });

                    case 4:
                      modal = _context19.sent;
                      modal.present();
                      _context19.next = 8;
                      return modal.onDidDismiss();

                    case 8:
                      result = _context19.sent;

                      if (result.data && result.data.ok) {
                        this.value = this.convert(result.data.value, 'to');
                        this.valueChange.emit(this.value);
                      }

                      this.isOpen = false;

                    case 11:
                    case "end":
                      return _context19.stop();
                  }
                }
              }, _callee19, this);
            }));
          }
        }, {
          key: "convert",
          value: function convert(val, direction) {
            if (val === undefined || val === null || val === 0 || this.convertRatio === undefined) {
              return val;
            }

            return direction === 'from' ? val * this.convertRatio : val / this.convertRatio;
          }
        }]);

        return _NumericInputComponent;
      }();

      _NumericInputComponent.ɵfac = function NumericInputComponent_Factory(t) {
        return new (t || _NumericInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController));
      };

      _NumericInputComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _NumericInputComponent,
        selectors: [["app-numeric-input"]],
        inputs: {
          decimalPlaces: "decimalPlaces",
          min: "min",
          max: "max",
          suffix: "suffix",
          decimalSeparator: "decimalSeparator",
          value: "value",
          title: "title",
          placeholder: "placeholder",
          convertRatio: "convertRatio",
          readonly: "readonly"
        },
        outputs: {
          valueChange: "valueChange"
        },
        decls: 5,
        vars: 3,
        consts: [["tabindex", "0", 3, "click", "keyup.enter"], ["color", "medium", "position", "stacked", "class", "ion-text-uppercase", 4, "ngIf"], ["class", "ion-align-self-start", 4, "ngIf", "ngIfElse"], ["ph", ""], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start"], ["color", "medium", 1, "ion-align-self-start"]],
        template: function NumericInputComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputComponent_Template_ion_item_click_0_listener() {
              return ctx.openPicker();
            })("keyup.enter", function NumericInputComponent_Template_ion_item_keyup_enter_0_listener() {
              return ctx.openPicker();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, NumericInputComponent_ion_label_1_Template, 3, 3, "ion-label", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, NumericInputComponent_ion_text_2_Template, 2, 1, "ion-text", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, NumericInputComponent_ng_template_3_Template, 3, 3, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.title);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.displayValue)("ngIfElse", _r2);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonText],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJudW1lcmljLWlucHV0LmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    51535: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "RegistrationContentWrapperComponent": function RegistrationContentWrapperComponent() {
          return (
            /* binding */
            _RegistrationContentWrapperComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _help_text_help_text_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../help-text/help-text.component */
      40241);
      /* harmony import */


      var _navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../navigation-buttons/navigation-buttons.component */
      25023);
      /* harmony import */


      var _save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../save-and-go-back-button/save-and-go-back-button.component */
      80403);

      function RegistrationContentWrapperComponent_ion_grid_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-grid", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-col", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵprojection"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-col", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "app-help-text", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "app-navigation-buttons", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "app-save-and-go-back-button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("reset", function RegistrationContentWrapperComponent_ion_grid_0_Template_app_save_and_go_back_button_reset_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r1.emitReset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("registrationTid", ctx_r0.registrationTid)("geoHazard", ctx_r0.registration.geoHazard);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("registration", ctx_r0.registration);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
        }
      }

      var _c0 = ["*"];

      var _RegistrationContentWrapperComponent = /*#__PURE__*/function () {
        function _RegistrationContentWrapperComponent() {
          _classCallCheck(this, _RegistrationContentWrapperComponent);

          this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
        }

        _createClass(_RegistrationContentWrapperComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "emitReset",
          value: function emitReset() {
            this.reset.emit();
          }
        }]);

        return _RegistrationContentWrapperComponent;
      }();

      _RegistrationContentWrapperComponent.ɵfac = function RegistrationContentWrapperComponent_Factory(t) {
        return new (t || _RegistrationContentWrapperComponent)();
      };

      _RegistrationContentWrapperComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _RegistrationContentWrapperComponent,
        selectors: [["app-registration-content-wrapper"]],
        inputs: {
          registration: "registration",
          registrationTid: "registrationTid",
          isEmpty: "isEmpty"
        },
        outputs: {
          reset: "reset"
        },
        ngContentSelectors: _c0,
        decls: 1,
        vars: 1,
        consts: [["class", "pull-last-bottom ion-no-padding ion-no-margin", 4, "ngIf"], [1, "pull-last-bottom", "ion-no-padding", "ion-no-margin"], [1, "ion-no-padding"], [3, "registrationTid", "geoHazard"], [3, "registration"], [3, "registration", "registrationTid", "reset"]],
        template: function RegistrationContentWrapperComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵprojectionDef"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, RegistrationContentWrapperComponent_ion_grid_0_Template, 9, 5, "ion-grid", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol, _help_text_help_text_component__WEBPACK_IMPORTED_MODULE_1__.HelpTextComponent, _navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_2__.NavigationButtonsComponent, _save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_3__.SaveAndGoBackButtonComponent],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    80403: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SaveAndGoBackButtonComponent": function SaveAndGoBackButtonComponent() {
          return (
            /* binding */
            _SaveAndGoBackButtonComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SaveAndGoBackButtonComponent_ion_row_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-row", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SaveAndGoBackButtonComponent_ion_row_6_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r1.doReset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "svg-icon", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 1, "REGISTRATION.RESET"), " ");
        }
      }

      var _SaveAndGoBackButtonComponent = /*#__PURE__*/function () {
        function _SaveAndGoBackButtonComponent(navContoller, commonRegistrationService, cdr) {
          _classCallCheck(this, _SaveAndGoBackButtonComponent);

          this.navContoller = navContoller;
          this.commonRegistrationService = commonRegistrationService;
          this.cdr = cdr;
          this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
          this.hasData = false;
        }

        _createClass(_SaveAndGoBackButtonComponent, [{
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            if (changes && changes.registration && !changes.registration.isFirstChange()) {
              this.setHasData();
            }
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.setHasData();
          }
        }, {
          key: "setHasData",
          value: function setHasData() {
            var _this15 = this;

            if (this.registration != null && this.registrationTid != null) {
              this.commonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1)).subscribe(function (hasData) {
                _this15.hasData = hasData;

                _this15.cdr.markForCheck();
              });
            }
          }
        }, {
          key: "goBack",
          value: function goBack() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
              return regeneratorRuntime.wrap(function _callee20$(_context20) {
                while (1) {
                  switch (_context20.prev = _context20.next) {
                    case 0:
                      this.navContoller.navigateBack('registration/edit/' + this.registration.id);

                    case 1:
                    case "end":
                      return _context20.stop();
                  }
                }
              }, _callee20, this);
            }));
          }
        }, {
          key: "doReset",
          value: function doReset() {
            this.reset.emit();
          }
        }]);

        return _SaveAndGoBackButtonComponent;
      }();

      _SaveAndGoBackButtonComponent.ɵfac = function SaveAndGoBackButtonComponent_Factory(t) {
        return new (t || _SaveAndGoBackButtonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef));
      };

      _SaveAndGoBackButtonComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _SaveAndGoBackButtonComponent,
        selectors: [["app-save-and-go-back-button"]],
        inputs: {
          registration: "registration",
          registrationTid: "registrationTid"
        },
        outputs: {
          reset: "reset"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]],
        decls: 7,
        vars: 4,
        consts: [["size", "12"], ["expand", "block", "fill", "solid", "color", "primary", "routerDirection", "backward", 1, "back-button", 3, "click"], ["class", "reset-button-row", 4, "ngIf"], [1, "reset-button-row"], [1, "ion-text-center"], ["color", "dark", "size", "small", "fill", "clear", 1, "reset-button", 3, "click"], ["src", "/assets/icon/reset.svg"]],
        template: function SaveAndGoBackButtonComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-grid");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-col", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ion-button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SaveAndGoBackButtonComponent_Template_ion_button_click_3_listener() {
              return ctx.goBack();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SaveAndGoBackButtonComponent_ion_row_6_Template, 6, 3, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 2, "REGISTRATION.BACK_TO_OBSERVATION"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasData);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButton, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, angular_svg_icon__WEBPACK_IMPORTED_MODULE_7__.SvgIconComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe],
        styles: ["ion-grid[_ngcontent-%COMP%] {\n  background-color: #fff;\n  margin-top: 30px;\n  --ion-grid-padding: 10px;\n}\n\n.back-button[_ngcontent-%COMP%] {\n  background-color: #fff;\n  background-color: var(--ion-background-color, #fff);\n  height: var(--ion-button-height);\n}\n\n.reset-button-row[_ngcontent-%COMP%]   .reset-button[_ngcontent-%COMP%] {\n  margin-bottom: calc(0px + 10px);\n  margin-bottom: calc(var(--ion-safe-area-bottom, 0px) + 10px);\n}\n\n.reset-button-row[_ngcontent-%COMP%]   svg-icon[_ngcontent-%COMP%] {\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhdmUtYW5kLWdvLWJhY2stYnV0dG9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0JBQUE7RUFDQSxnQkFBQTtFQUNBLHdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxzQkFBQTtFQUFBLG1EQUFBO0VBQ0EsZ0NBQUE7QUFDSjs7QUFHSTtFQUNJLCtCQUFBO0VBQUEsNERBQUE7QUFBUjs7QUFHSTtFQUNJLGFBQUE7QUFEUiIsImZpbGUiOiJzYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gICAgLS1pb24tZ3JpZC1wYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4uYmFjay1idXR0b24ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IsI2ZmZik7XHJcbiAgICBoZWlnaHQ6IHZhcigtLWlvbi1idXR0b24taGVpZ2h0KTtcclxufVxyXG5cclxuLnJlc2V0LWJ1dHRvbi1yb3cge1xyXG4gICAgLnJlc2V0LWJ1dHRvbiB7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogY2FsYyh2YXIoLS1pb24tc2FmZS1hcmVhLWJvdHRvbSwgMHB4KSArIDEwcHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN2Zy1pY29uIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgfVxyXG59XHJcbiJdfQ== */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    5717: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SetLocationInMapComponent": function SetLocationInMapComponent() {
          return (
            /* binding */
            _SetLocationInMapComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _map_services_map_map_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../map/services/map/map.service */
      29789);
      /* harmony import */


      var _core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../core/services/helpers/helper.service */
      22791);
      /* harmony import */


      var _map_services_map_search_map_search_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../map/services/map-search/map-search.service */
      39297);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs/operators */
      76477);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var _core_services_location_location_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../core/services/location/location.service */
      5361);
      /* harmony import */


      var _pages_obs_location_utm_source_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../pages/obs-location/utm-source.enum */
      38714);
      /* harmony import */


      var _map_helpers_leaflet_cluser_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../map/helpers/leaflet-cluser.helper */
      47434);
      /* harmony import */


      var _core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../core/services/geo-position/geo-position.service */
      27494);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _map_components_map_map_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../map/components/map/map.component */
      6781);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _c0 = ["editLocationNameInput"];

      function SetLocationInMapComponent_app_map_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-map", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("mapReady", function SetLocationInMapComponent_app_map_1_Template_app_map_mapReady_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r9);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r8.onMapReady($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("showSupportMaps", false)("center", ctx_r0.locationMarker.getLatLng());
        }
      }

      function SetLocationInMapComponent_ng_container_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, "REGISTRATION.OBS_LOCATION.SHOW_DETAILS"), " ");
        }
      }

      function SetLocationInMapComponent_ng_container_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, "REGISTRATION.OBS_LOCATION.HIDE_DETAILS"), " ");
        }
      }

      function SetLocationInMapComponent_ion_row_13_ng_container_6_div_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceHTML"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 30);
        }
      }

      function SetLocationInMapComponent_ion_row_13_ng_container_6_svg_icon_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceHTML"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "svg-icon", 31);
        }

        if (rf & 2) {
          var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("src", ctx_r16.fromMarkerIconUrl);
        }
      }

      function SetLocationInMapComponent_ion_row_13_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "svg", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "line", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceHTML"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-label", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "svg", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "line", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, SetLocationInMapComponent_ion_row_13_ng_container_6_div_7_Template, 1, 0, "div", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, SetLocationInMapComponent_ion_row_13_ng_container_6_svg_icon_8_Template, 1, 1, "svg-icon", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r10.distanceToObservationText);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r10.fromMarker);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.fromMarker);
        }
      }

      function SetLocationInMapComponent_ion_row_13_ion_icon_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "ion-icon", 32);
        }
      }

      function SetLocationInMapComponent_ion_row_13_ng_container_18_ion_row_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r17.selectedLocation.Name, " ");
        }
      }

      function SetLocationInMapComponent_ion_row_13_ng_container_18_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SetLocationInMapComponent_ion_row_13_ng_container_18_ion_row_1_Template, 4, 1, "ion-row", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](17);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r12.selectedLocation)("ngIfElse", _r6);
        }
      }

      function SetLocationInMapComponent_ion_row_13_span_28_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"](", ", ctx_r13.viewInfo.elevation, " ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "MAP_CENTER_INFO.ABOVE_SEA_LEVEL"), " ");
        }
      }

      function SetLocationInMapComponent_ion_row_13_ion_row_29_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-label", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 1, ctx_r14.fromLocationText));
        }
      }

      function SetLocationInMapComponent_ion_row_13_Template(rf, ctx) {
        if (rf & 1) {
          var _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-grid", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-col", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "svg-icon", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, SetLocationInMapComponent_ion_row_13_ng_container_6_Template, 9, 3, "ng-container", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "ion-col", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "ion-grid", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "ion-row", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-col", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "ion-grid", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SetLocationInMapComponent_ion_row_13_Template_ion_grid_click_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r19);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r18.editLocation();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, SetLocationInMapComponent_ion_row_13_ion_icon_12_Template, 1, 0, "ion-icon", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "ion-col", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "ion-label", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](17, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](18, SetLocationInMapComponent_ion_row_13_ng_container_18_Template, 2, 2, "ng-container", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "ion-col", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "ion-label", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](23);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](24, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](25, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](26, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](27, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](28, SetLocationInMapComponent_ion_row_13_span_28_Template, 3, 4, "span", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](29, SetLocationInMapComponent_ion_row_13_ion_row_29_Template, 5, 3, "ion-row", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("src", ctx_r3.locationMarkerIconUrl);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.showFromMarkerInDetails);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.canEditLocationName);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](17, 12, ctx_r3.locationTitle));

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r3.editLocationName)("ngIfElse", _r4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate4"]("", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](24, 14, ctx_r3.locationMarker.getLatLng().lat, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](25, 17, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](26, 19, ctx_r3.locationMarker.getLatLng().lng, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](27, 22, "MAP_CENTER_INFO.EAST_SHORT"), "");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r3.isLoading && ctx_r3.viewInfo && ctx_r3.viewInfo.elevation !== null);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.showFromMarkerInDetails);
        }
      }

      function SetLocationInMapComponent_ng_template_14_Template(rf, ctx) {
        if (rf & 1) {
          var _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-input", 35, 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function SetLocationInMapComponent_ng_template_14_Template_ion_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r22);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r21.locationName = $event;
          })("ionBlur", function SetLocationInMapComponent_ng_template_14_Template_ion_input_ionBlur_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r22);

            var ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r23.onLocationEditComplete();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("max", 60)("ngModel", ctx_r5.locationName);
        }
      }

      function SetLocationInMapComponent_ng_template_16_ng_container_2_ng_container_1_span_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("", ctx_r27.viewInfo.location.name, ",\xA0");
        }
      }

      function SetLocationInMapComponent_ng_template_16_ng_container_2_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, SetLocationInMapComponent_ng_template_16_ng_container_2_ng_container_1_span_2_Template, 2, 1, "span", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r26.viewInfo.location.name !== ctx_r26.viewInfo.location.adminName);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("", ctx_r26.viewInfo.location.adminName, "\xA0 ");
        }
      }

      function SetLocationInMapComponent_ng_template_16_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SetLocationInMapComponent_ng_template_16_ng_container_2_ng_container_1_Template, 4, 2, "ng-container", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r24.viewInfo && ctx_r24.viewInfo.location);
        }
      }

      function SetLocationInMapComponent_ng_template_16_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-spinner", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }
      }

      function SetLocationInMapComponent_ng_template_16_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, SetLocationInMapComponent_ng_template_16_ng_container_2_Template, 2, 1, "ng-container", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, SetLocationInMapComponent_ng_template_16_ng_container_3_Template, 2, 0, "ng-container", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r7.isLoading);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r7.isLoading);
        }
      }

      var _c1 = function _c1(a0, a1) {
        return {
          "open": a0,
          "details-small": a1
        };
      };

      var defaultIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      var previousUsedPlaceIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
        iconUrl: '/assets/icon/map/prev-used-place.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: 'leaflet/marker-shadow.png',
        shadowSize: [41, 41]
      });

      var _SetLocationInMapComponent = /*#__PURE__*/function () {
        function _SetLocationInMapComponent(mapService, helperService, ngZone, mapSearchService, geoPositionService, locationService) {
          _classCallCheck(this, _SetLocationInMapComponent);

          this.mapService = mapService;
          this.helperService = helperService;
          this.ngZone = ngZone;
          this.mapSearchService = mapSearchService;
          this.geoPositionService = geoPositionService;
          this.locationService = locationService;
          this.fromMarkerIconUrl = '/assets/icon/map/obs-location.svg';
          this.locationMarkerIconUrl = '/assets/icon/map/obs-location.svg';
          this.locationSet = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter();
          this.showPreviousUsedLocations = true;
          this.showUserPosition = true;
          this.confirmLocationText = 'REGISTRATION.OBS_LOCATION.CONFIRM_TEXT';
          this.fromLocationText = 'REGISTRATION.OBS_LOCATION.CURRENT_LOCATION';
          this.locationTitle = 'REGISTRATION.OBS_LOCATION.TITLE';
          this.mapReady = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter();
          this.showPolyline = true;
          this.showFromMarkerInDetails = true;
          this.allowEditLocationName = false;
          this.isSaveDisabled = false;
          this.followMode = false;
          this.showDetails = false;
          this.distanceToObservationText = '';
          this.isLoading = false;
          this.locations = [];
          this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
          this.locationGroup = _map_helpers_leaflet_cluser_helper__WEBPACK_IMPORTED_MODULE_6__.LeafletClusterHelper.createMarkerClusterGroup();
          this.editLocationName = false;
        }

        _createClass(_SetLocationInMapComponent, [{
          key: "canEditLocationName",
          get: function get() {
            return this.allowEditLocationName && !(this.selectedLocation && this.selectedLocation.Id);
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
              var locationMarkerIcon, lastView;
              return regeneratorRuntime.wrap(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      leaflet__WEBPACK_IMPORTED_MODULE_0__.Marker.prototype.options.icon = defaultIcon;
                      locationMarkerIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
                        iconUrl: this.locationMarkerIconUrl,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        shadowUrl: 'leaflet/marker-shadow.png',
                        shadowSize: [41, 41]
                      });
                      this.followMode = !this.locationMarker && !this.fromMarker;
                      this.mapService.followMode = this.followMode;

                      if (this.locationMarker) {
                        _context21.next = 13;
                        break;
                      }

                      if (!this.fromMarker) {
                        _context21.next = 9;
                        break;
                      }

                      this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.fromMarker.getLatLng(), {
                        icon: locationMarkerIcon
                      });
                      _context21.next = 13;
                      break;

                    case 9:
                      _context21.next = 11;
                      return this.mapService.mapView$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.take)(1)).toPromise();

                    case 11:
                      lastView = _context21.sent;

                      if (lastView) {
                        this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(lastView.center, {
                          icon: locationMarkerIcon
                        });
                      } else {
                        this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(59.1, 10.3), {
                          icon: locationMarkerIcon
                        });
                      }

                    case 13:
                      this.updateMapViewInfo();

                    case 14:
                    case "end":
                      return _context21.stop();
                  }
                }
              }, _callee21, this);
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }, {
          key: "getLocationsObservable",
          value: function getLocationsObservable() {
            var _this16 = this;

            return this.mapService.mapView$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(function (mapView) {
              return mapView && mapView.center !== undefined && mapView.bounds !== undefined;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(function (mapView) {
              return _this16.locationService.getLocationWithinRadiusObservable(_this16.geoHazard, mapView.center.lat, mapView.center.lng, Math.round(mapView.bounds.getNorthWest().distanceTo(mapView.bounds.getSouthEast()) / 2));
            }));
          }
        }, {
          key: "addLocationIfNotExists",
          value: function addLocationIfNotExists(loc) {
            var _this17 = this;

            var existing = this.locations.some(function (location) {
              return loc.Id === location.Id;
            });

            if (!existing) {
              this.locations.push(loc);
              var marker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(loc.LatLngObject.Latitude, loc.LatLngObject.Longitude), {
                icon: previousUsedPlaceIcon
              }).addTo(this.locationGroup);
              marker.on('click', function () {
                return _this17.setToPrevouslyUsedLocation(loc);
              });
            }
          }
        }, {
          key: "onMapReady",
          value: function onMapReady(m) {
            var _this18 = this;

            this.map = m;
            this.locationMarker.setZIndexOffset(100).addTo(this.map);

            if (this.fromMarker) {
              this.fromMarker.addTo(this.map);
            }

            this.locationGroup.addTo(this.map);
            this.map.on('dragstart', function () {
              _this18.ngZone.run(function () {
                _this18.isLoading = true;
              });
            });
            this.map.on('dragend', function () {
              return _this18.updateMapViewInfo();
            });
            this.map.on('drag', function () {
              return _this18.moveLocationMarkerToCenter();
            });

            if (this.showPreviousUsedLocations) {
              this.getLocationsObservable().pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$)).subscribe(function (locations) {
                locations.forEach(function (loc) {
                  return _this18.addLocationIfNotExists(loc);
                });
              });
            }

            this.mapService.followMode$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$)).subscribe(function (val) {
              _this18.followMode = val;

              if (_this18.followMode && _this18.userposition) {
                _this18.setLocationMarkerLatLng({
                  lat: _this18.userposition.coords.latitude,
                  lng: _this18.userposition.coords.longitude
                });
              }
            });
            this.mapSearchService.mapSearchClick$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$)).subscribe(function (item) {
              var latLng = item instanceof leaflet__WEBPACK_IMPORTED_MODULE_0__.LatLng ? item : item.latlng;

              _this18.setLocationMarkerLatLng(latLng);
            });
            this.geoPositionService.currentPosition$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$)).subscribe(function (pos) {
              return _this18.positionChange(pos);
            });

            if (!this.followMode) {
              this.map.setView(this.locationMarker.getLatLng(), 15);
            }

            this.mapReady.emit(this.map);
            this.updatePathAndDistance();
          }
        }, {
          key: "setLocationMarkerLatLng",
          value: function setLocationMarkerLatLng(latLng) {
            this.locationMarker.setLatLng(latLng);
            this.updatePathAndDistance();
            this.updateMapViewInfo();
          }
        }, {
          key: "setToPrevouslyUsedLocation",
          value: function setToPrevouslyUsedLocation(location) {
            var _this19 = this;

            this.ngZone.run(function () {
              _this19.mapService.followMode = false;
              _this19.selectedLocation = location;

              _this19.setLocationMarkerLatLng(leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(location.LatLngObject.Latitude, location.LatLngObject.Longitude));

              _this19.map.panTo(_this19.locationMarker.getLatLng());

              _this19.showDetails = true;
            });
          }
        }, {
          key: "moveLocationMarkerToCenter",
          value: function moveLocationMarkerToCenter() {
            this.mapService.followMode = false;
            this.selectedLocation = null;
            var center = this.map.getCenter();
            this.locationMarker.setLatLng(center);
            this.updatePathAndDistance();
          }
        }, {
          key: "updateMapViewInfo",
          value: function updateMapViewInfo() {
            var _this20 = this;

            var latLng = this.locationMarker.getLatLng();
            this.mapSearchService.getViewInfo({
              center: latLng,
              bounds: null,
              zoom: 0
            }, this.geoHazard).subscribe(function (val) {
              _this20.ngZone.run(function () {
                _this20.viewInfo = val;
                _this20.isLoading = false;
              });
            }, function (_) {
              _this20.ngZone.run(function () {
                _this20.viewInfo = null;
                _this20.isLoading = false;
              });
            });
          }
        }, {
          key: "positionChange",
          value: function positionChange(position) {
            this.userposition = position;

            if (this.followMode) {
              this.setLocationMarkerLatLng({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            } else {
              this.updatePathAndDistance();
            }
          }
        }, {
          key: "updatePathAndDistance",
          value: function updatePathAndDistance() {
            var _this21 = this;

            var from = this.fromMarker ? this.fromMarker.getLatLng() : this.userposition ? leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(this.userposition.coords.latitude, this.userposition.coords.longitude) : this.locationMarker.getLatLng();
            var locationMarkerLatLng = this.locationMarker.getLatLng();
            var path = [locationMarkerLatLng, from];

            if (this.map) {
              if (!this.pathLine) {
                this.pathLine = leaflet__WEBPACK_IMPORTED_MODULE_0__.polyline(path, {
                  color: 'black',
                  weight: 6,
                  opacity: 0.9,
                  dashArray: '1,12'
                });

                if (this.showPolyline) {
                  this.pathLine.addTo(this.map);
                }
              } else {
                this.pathLine.setLatLngs(path);
              }

              if (this.fromMarker) {
                if (this.fromMarker.getLatLng().equals(this.locationMarker.getLatLng())) {
                  this.fromMarker.setOpacity(0);
                  this.pathLine.setStyle({
                    opacity: 0
                  });
                } else {
                  this.fromMarker.setOpacity(1);
                  this.pathLine.setStyle({
                    opacity: 0.9
                  });
                }
              }
            }

            this.ngZone.run(function () {
              _this21.distanceToObservationText = _this21.helperService.getDistanceText(locationMarkerLatLng.distanceTo(from));
            });
          }
        }, {
          key: "toggleDetails",
          value: function toggleDetails() {
            var _this22 = this;

            this.ngZone.run(function () {
              _this22.showDetails = !_this22.showDetails;
            });
          }
        }, {
          key: "getLocationName",
          value: function getLocationName(location) {
            if (location) {
              return location.adminName !== location.name ? "".concat(location.name, " / ").concat(location.adminName) : location.name;
            }

            return '';
          }
        }, {
          key: "confirmLocation",
          value: function confirmLocation() {
            var obsLocation = this.getLocation();
            this.locationSet.emit(obsLocation);
          }
        }, {
          key: "getLocation",
          value: function getLocation() {
            var obsLocation = {
              Latitude: this.locationMarker.getLatLng().lat,
              Longitude: this.locationMarker.getLatLng().lng,
              Uncertainty: 0,
              UTMSourceTID: _pages_obs_location_utm_source_enum__WEBPACK_IMPORTED_MODULE_5__.UtmSource.SelectedInMap
            };

            if (this.editLocationName && this.locationName && this.locationName.length > 0) {
              obsLocation.ObsLocationID = undefined;
              obsLocation.LocationName = this.locationName.substring(0, 60);
            } else if (this.selectedLocation) {
              obsLocation.ObsLocationID = this.selectedLocation.Id;
              obsLocation.LocationName = this.selectedLocation.Name;
            }

            if (this.viewInfo && this.viewInfo.location) {
              obsLocation.LocationDescription = this.getLocationName(this.viewInfo.location);
            }

            if (this.followMode && this.userposition) {
              obsLocation.UTMSourceTID = _pages_obs_location_utm_source_enum__WEBPACK_IMPORTED_MODULE_5__.UtmSource.GPS;
              obsLocation.Uncertainty = Math.round(this.userposition.coords.accuracy);
            }

            return obsLocation;
          }
        }, {
          key: "editLocation",
          value: function editLocation() {
            var _this23 = this;

            if (this.canEditLocationName) {
              this.editLocationName = true;
              setTimeout(function () {
                if (_this23.editLocationNameInput) {
                  _this23.editLocationNameInput.setFocus();
                }
              }, 50);
            }
          }
        }, {
          key: "onLocationEditComplete",
          value: function onLocationEditComplete() {
            var _a;

            if (((_a = this.editLocationNameInput.value) === null || _a === void 0 ? void 0 : _a.toString().length) === 0) {
              // User has deleted all text
              this.editLocationName = false;
              this.updateMapViewInfo();
            }
          }
        }]);

        return _SetLocationInMapComponent;
      }();

      _SetLocationInMapComponent.ɵfac = function SetLocationInMapComponent_Factory(t) {
        return new (t || _SetLocationInMapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_map_services_map_map_service__WEBPACK_IMPORTED_MODULE_1__.MapService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_2__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_map_services_map_search_map_search_service__WEBPACK_IMPORTED_MODULE_3__.MapSearchService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_7__.GeoPositionService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_location_location_service__WEBPACK_IMPORTED_MODULE_4__.LocationService));
      };

      _SetLocationInMapComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _SetLocationInMapComponent,
        selectors: [["app-set-location-in-map"]],
        viewQuery: function SetLocationInMapComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editLocationNameInput = _t.first);
          }
        },
        inputs: {
          geoHazard: "geoHazard",
          fromMarker: "fromMarker",
          fromMarkerIconUrl: "fromMarkerIconUrl",
          locationMarker: "locationMarker",
          locationMarkerIconUrl: "locationMarkerIconUrl",
          showPreviousUsedLocations: "showPreviousUsedLocations",
          showUserPosition: "showUserPosition",
          confirmLocationText: "confirmLocationText",
          fromLocationText: "fromLocationText",
          locationTitle: "locationTitle",
          selectedLocation: "selectedLocation",
          showPolyline: "showPolyline",
          showFromMarkerInDetails: "showFromMarkerInDetails",
          allowEditLocationName: "allowEditLocationName",
          isSaveDisabled: "isSaveDisabled"
        },
        outputs: {
          locationSet: "locationSet",
          mapReady: "mapReady"
        },
        decls: 18,
        vars: 12,
        consts: [[3, "ngClass"], [3, "showSupportMaps", "center", "mapReady", 4, "ngIf"], [1, "bottom-info", "ion-no-padding"], [1, "confirm-button-col"], ["expand", "block", "color", "varsom-orange", 3, "disabled", "click"], [1, "ion-no-padding"], [1, "show-details-col", "ion-no-padding", "ion-text-center"], ["color", "dark", "size", "small", "fill", "clear", 3, "click"], [4, "ngIf"], ["class", "details-row", 4, "ngIf"], ["editLocationTemplate", ""], ["viewInfoTemplate", ""], [3, "showSupportMaps", "center", "mapReady"], ["slot", "start", "name", "chevron-up"], ["slot", "start", "name", "chevron-down"], [1, "details-row"], ["size", "2", 1, "ion-no-padding", "ion-text-center"], [1, "obs-location-marker", 3, "src"], [1, "padding-bottom"], ["size", "12", 1, "ion-no-padding", "padding-right"], [1, "arrow-box", 3, "click"], ["class", "edit-icon", "name", "create", 4, "ngIf"], [1, "detail-header", "ion-text-uppercase", "ion-no-margin"], [4, "ngIf", "ngIfElse"], [1, "small-text", "ion-no-margin"], ["width", "4px", "height", "15px", "viewBox", "0 0 4 15", 1, "dotted-line"], ["x1", "1", "x2", "1", "y1", "2", "y2", "14", "stroke", "#000", "stroke-width", "2", "stroke-linecap", "round", "stroke-dasharray", "1,4"], [1, "distance-label", "small-text", "ion-no-margin"], ["class", "leaflet-usermarker", 4, "ngIf"], [3, "src", 4, "ngIf"], [1, "leaflet-usermarker"], [3, "src"], ["name", "create", 1, "edit-icon"], [1, "detail-obs-info", "ion-no-margin", "ion-text-wrap"], [1, "ion-no-margin", "arrow-box", "detail-header", "block", "ion-text-uppercase"], ["type", "text", 3, "max", "ngModel", "ngModelChange", "ionBlur"], ["editLocationNameInput", ""], ["color", "dark", "name", "dots"]],
        template: function SetLocationInMapComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SetLocationInMapComponent_app_map_1_Template, 1, 2, "app-map", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-grid", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "ion-button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SetLocationInMapComponent_Template_ion_button_click_5_listener() {
              return ctx.confirmLocation();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "ion-row", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "ion-col", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SetLocationInMapComponent_Template_ion_button_click_10_listener() {
              return ctx.toggleDetails();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, SetLocationInMapComponent_ng_container_11_Template, 4, 3, "ng-container", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, SetLocationInMapComponent_ng_container_12_Template, 4, 3, "ng-container", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, SetLocationInMapComponent_ion_row_13_Template, 30, 24, "ion-row", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, SetLocationInMapComponent_ng_template_14_Template, 4, 2, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](16, SetLocationInMapComponent_ng_template_16_Template, 4, 2, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction2"](9, _c1, ctx.showDetails, !ctx.showFromMarkerInDetails));

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.locationMarker);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx.isSaveDisabled);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 7, ctx.confirmLocationText));

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.showDetails);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.showDetails);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.showDetails);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonButton, _map_components_map_map_component__WEBPACK_IMPORTED_MODULE_8__.MapComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonIcon, angular_svg_icon__WEBPACK_IMPORTED_MODULE_18__.SvgIconComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonInput, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonSpinner],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DecimalPipe],
        styles: ["[_nghost-%COMP%] {\n  --bottom-content-height: 94px;\n  --map-center-info-height: 0px;\n}\n\napp-map[_ngcontent-%COMP%] {\n  position: absolute;\n  display: block;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: var(--bottom-content-height);\n}\n\n.bottom-info[_ngcontent-%COMP%] {\n  background-color: #fff;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9999;\n  height: var(--bottom-content-height);\n  transition-property: all;\n  transition-duration: 0.5s;\n  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);\n}\n\n.bottom-info[_ngcontent-%COMP%]   .confirm-button-col[_ngcontent-%COMP%] {\n  padding-bottom: 0px;\n  padding-left: 14px;\n  padding-right: 14px;\n  padding-top: 6px;\n}\n\n.bottom-info[_ngcontent-%COMP%]   .confirm-button-col[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n\n.open[_ngcontent-%COMP%]   .bottom-info[_ngcontent-%COMP%] {\n  height: 252px;\n}\n\n.open.details-small[_ngcontent-%COMP%]   .bottom-info[_ngcontent-%COMP%] {\n  height: 200px;\n}\n\n.open.details-small[_ngcontent-%COMP%]   .obs-location-marker[_ngcontent-%COMP%] {\n  margin-top: 28px;\n}\n\n.details-row[_ngcontent-%COMP%]   .dotted-line[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.details-row[_ngcontent-%COMP%]   .obs-location-marker[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  display: inline-block;\n}\n\n.details-row[_ngcontent-%COMP%]   .distance-label[_ngcontent-%COMP%] {\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\n\n.details-row[_ngcontent-%COMP%]   .detail-obs-info[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 14px;\n  line-height: 30px;\n}\n\n.details-row[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  height: 20px;\n}\n\n.details-row[_ngcontent-%COMP%]   .edit-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 20px;\n  top: 10px;\n}\n\n.padding-right[_ngcontent-%COMP%] {\n  padding-right: 10px;\n}\n\n.padding-bottom[_ngcontent-%COMP%] {\n  padding-bottom: 10px;\n}\n\n.fill-parent[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.block[_ngcontent-%COMP%] {\n  display: block !important;\n}\n\n.detail-header[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n\n.small-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n\n.leaflet-usermarker[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  background-color: #fff;\n  background-size: 100%;\n  border-radius: 50%;\n  box-shadow: 1px 1px 5px 0px black;\n  display: inline-block;\n  transform: translateY(-9px) translateX(-2px);\n  margin-top: 10px;\n}\n\n.leaflet-usermarker[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  background-color: #4286f4;\n  border-radius: 50%;\n  left: 2px;\n  top: 2px;\n}\n\n.arrow-box[_ngcontent-%COMP%] {\n  border: 2px solid #d7d6d6;\n  z-index: 20;\n  padding: 10px;\n  padding-left: 15px;\n}\n\n.arrow-box[_ngcontent-%COMP%]:before {\n  content: \"\";\n  display: block;\n  width: 10px;\n  height: 10px;\n  border: 2px solid #d7d6d6;\n  transform: translateY(-7px) rotate(45deg);\n  position: absolute;\n  top: 50%;\n  left: -6px;\n  z-index: 10;\n}\n\n.arrow-box[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  top: 50%;\n  left: -3px;\n  width: 10px;\n  height: 10px;\n  border: 2px solid transparent;\n  position: absolute;\n  background: white;\n  z-index: 11;\n  transform: translateY(-7px) rotate(45deg);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldC1sb2NhdGlvbi1pbi1tYXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw2QkFBQTtFQUNBLDZCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxvQ0FBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxvQ0FBQTtFQUNBLHdCQUFBO0VBQ0EseUJBQUE7RUFDQSxzREFBQTtBQUNGOztBQUNFO0VBQ0UsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFDSTtFQUNFLGdDQUFBO0FBQ047O0FBTUU7RUFDRSxhQUFBO0FBSEo7O0FBT0k7RUFDRSxhQUFBO0FBTE47O0FBUUk7RUFDRSxnQkFBQTtBQU5OOztBQVlFO0VBQ0UsV0FBQTtBQVRKOztBQVlFO0VBQ0UsZ0JBQUE7RUFDQSxxQkFBQTtBQVZKOztBQWFFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtBQVhKOztBQWNFO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFaSjs7QUFlRTtFQUNFLFlBQUE7QUFiSjs7QUFnQkU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FBZEo7O0FBa0JBO0VBQ0UsbUJBQUE7QUFmRjs7QUFrQkE7RUFDRSxvQkFBQTtBQWZGOztBQWtCQTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtBQWZGOztBQWtCQTtFQUNFLHlCQUFBO0FBZkY7O0FBa0JBO0VBQ0UsZUFBQTtBQWZGOztBQWtCQTtFQUNFLGVBQUE7QUFmRjs7QUFrQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUdBLGlDQUFBO0VBQ0EscUJBQUE7RUFDQSw0Q0FBQTtFQUNBLGdCQUFBO0FBZkY7O0FBa0JBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7QUFmRjs7QUFrQkE7RUFDRSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUFmRjs7QUFrQkE7RUFDRSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFLQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FBZkY7O0FBa0JBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUtBLHlDQUFBO0FBZkYiLCJmaWxlIjoic2V0LWxvY2F0aW9uLWluLW1hcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICAtLWJvdHRvbS1jb250ZW50LWhlaWdodDogOTRweDtcclxuICAtLW1hcC1jZW50ZXItaW5mby1oZWlnaHQ6IDBweDtcclxufVxyXG5cclxuYXBwLW1hcCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJvdHRvbTogdmFyKC0tYm90dG9tLWNvbnRlbnQtaGVpZ2h0KTtcclxufVxyXG5cclxuLmJvdHRvbS1pbmZvIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICB6LWluZGV4OiA5OTk5O1xyXG4gIGhlaWdodDogdmFyKC0tYm90dG9tLWNvbnRlbnQtaGVpZ2h0KTtcclxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBhbGw7XHJcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC41cztcclxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAsIDEsIDAuNSwgMSk7XHJcblxyXG4gIC5jb25maXJtLWJ1dHRvbi1jb2wge1xyXG4gICAgcGFkZGluZy1ib3R0b206IDBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTRweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDE0cHg7XHJcbiAgICBwYWRkaW5nLXRvcDogNnB4O1xyXG5cclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICBoZWlnaHQ6IHZhcigtLWlvbi1idXR0b24taGVpZ2h0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5vcGVuIHtcclxuICAvLyAtLWJvdHRvbS1jb250ZW50LWhlaWdodDogMjUycHg7XHJcbiAgLmJvdHRvbS1pbmZvIHtcclxuICAgIGhlaWdodDogMjUycHg7XHJcbiAgfVxyXG5cclxuICAmLmRldGFpbHMtc21hbGwge1xyXG4gICAgLmJvdHRvbS1pbmZvIHtcclxuICAgICAgaGVpZ2h0OiAyMDBweDtcclxuICAgIH1cclxuXHJcbiAgICAub2JzLWxvY2F0aW9uLW1hcmtlciB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDI4cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uZGV0YWlscy1yb3cge1xyXG4gIC5kb3R0ZWQtbGluZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG4gIC5vYnMtbG9jYXRpb24tbWFya2VyIHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgfVxyXG5cclxuICAuZGlzdGFuY2UtbGFiZWwge1xyXG4gICAgcGFkZGluZy10b3A6IDNweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzcHg7XHJcbiAgfVxyXG5cclxuICAuZGV0YWlsLW9icy1pbmZvIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XHJcbiAgfVxyXG5cclxuICBpb24tc3Bpbm5lciB7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuZWRpdC1pY29uIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAyMHB4O1xyXG4gICAgdG9wOiAxMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLnBhZGRpbmctcmlnaHQge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5wYWRkaW5nLWJvdHRvbSB7XHJcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5maWxsLXBhcmVudCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxufVxyXG5cclxuLmJsb2NrIHtcclxuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZGV0YWlsLWhlYWRlciB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG4uc21hbGwtdGV4dCB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG4ubGVhZmxldC11c2VybWFya2VyIHtcclxuICB3aWR0aDogMThweDtcclxuICBoZWlnaHQ6IDE4cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMXB4IDFweCA1cHggMHB4IGJsYWNrO1xyXG4gIC1tb3otYm94LXNoYWRvdzogMXB4IDFweCA1cHggMHB4IGJsYWNrO1xyXG4gIGJveC1zaGFkb3c6IDFweCAxcHggNXB4IDBweCBibGFjaztcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC05cHgpIHRyYW5zbGF0ZVgoLTJweCk7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLmxlYWZsZXQtdXNlcm1hcmtlcjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXCI7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiAxNHB4O1xyXG4gIGhlaWdodDogMTRweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI4NmY0O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBsZWZ0OiAycHg7XHJcbiAgdG9wOiAycHg7XHJcbn1cclxuXHJcbi5hcnJvdy1ib3gge1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICNkN2Q2ZDY7XHJcbiAgei1pbmRleDogMjA7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbn1cclxuXHJcbi5hcnJvdy1ib3g6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlwiO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiAxMHB4O1xyXG4gIGhlaWdodDogMTBweDtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjZDdkNmQ2O1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTdweCkgcm90YXRlKDQ1ZGVnKTtcclxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTdweCkgcm90YXRlKDQ1ZGVnKTtcclxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNTAlO1xyXG4gIGxlZnQ6IC02cHg7XHJcbiAgei1pbmRleDogMTA7XHJcbn1cclxuXHJcbi5hcnJvdy1ib3g6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6IFwiXCI7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgdG9wOiA1MCU7XHJcbiAgbGVmdDogLTNweDtcclxuICB3aWR0aDogMTBweDtcclxuICBoZWlnaHQ6IDEwcHg7XHJcbiAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIHotaW5kZXg6IDExO1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTdweCkgcm90YXRlKDQ1ZGVnKTtcclxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTdweCkgcm90YXRlKDQ1ZGVnKTtcclxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbn1cclxuIl19 */"]
      });
      /***/
    },

    /***/
    52386: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompressionTestListComponent": function CompressionTestListComponent() {
          return (
            /* binding */
            _CompressionTestListComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _compression_test_modal_compression_test_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./compression-test-modal/compression-test-modal.page */
      32677);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../pipes/kdv-description.pipe */
      46862);
      /* harmony import */


      var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../pipes/meters-to-cm.pipe */
      50795);

      function CompressionTestListComponent_ion_item_5_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "kdvDescription");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var compressionTest_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](3, 3, compressionTest_r1.PropagationTID, "Snow_PropagationKDV")));
        }
      }

      function CompressionTestListComponent_ion_item_5_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var compressionTest_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](compressionTest_r1.TapsFracture);
        }
      }

      function CompressionTestListComponent_ion_item_5_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "metersToCm");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var compressionTest_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("@", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 1, compressionTest_r1.FractureDepth, 0), "cm");
        }
      }

      function CompressionTestListComponent_ion_item_5_ion_icon_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "ion-icon", 8);
        }
      }

      function CompressionTestListComponent_ion_item_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CompressionTestListComponent_ion_item_5_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11);

            var i_r2 = restoredCtx.index;

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r10.addOrEditCompressionTest(i_r2);
          })("keyup.enter", function CompressionTestListComponent_ion_item_5_Template_ion_item_keyup_enter_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11);

            var i_r2 = restoredCtx.index;

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r12.addOrEditCompressionTest(i_r2);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, CompressionTestListComponent_ion_item_5_ng_container_2_Template, 4, 6, "ng-container", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, CompressionTestListComponent_ion_item_5_ng_container_3_Template, 2, 1, "ng-container", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, CompressionTestListComponent_ion_item_5_ng_container_4_Template, 3, 4, "ng-container", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](8, "kdvDescription");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, CompressionTestListComponent_ion_item_5_ion_icon_9_Template, 1, 0, "ion-icon", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var compressionTest_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", compressionTest_r1.PropagationTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", compressionTest_r1.TapsFracture > 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", compressionTest_r1.FractureDepth > 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](7, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](8, 7, compressionTest_r1.ComprTestFractureTID, "Snow_ComprTestFractureKDV")));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", compressionTest_r1.IncludeInSnowProfile);
        }
      }

      var _CompressionTestListComponent = /*#__PURE__*/function () {
        function _CompressionTestListComponent(modalController) {
          _classCallCheck(this, _CompressionTestListComponent);

          this.modalController = modalController;
          this.includeInSnowProfileAsDefault = false;
          this.testsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
          this.isOpen = false;
        }

        _createClass(_CompressionTestListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "addOrEditCompressionTest",
          value: function addOrEditCompressionTest(index) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
              var add, modal, result, compressionTest;
              return regeneratorRuntime.wrap(function _callee22$(_context22) {
                while (1) {
                  switch (_context22.prev = _context22.next) {
                    case 0:
                      if (this.isOpen) {
                        _context22.next = 13;
                        break;
                      }

                      this.isOpen = true;
                      add = index === undefined;
                      _context22.next = 5;
                      return this.modalController.create({
                        component: _compression_test_modal_compression_test_modal_page__WEBPACK_IMPORTED_MODULE_0__.CompressionTestModalPage,
                        componentProps: {
                          compressionTest: add ? undefined : (this.tests || [])[index],
                          includeInSnowProfileAsDefault: this.includeInSnowProfileAsDefault
                        }
                      });

                    case 5:
                      modal = _context22.sent;
                      modal.present();
                      _context22.next = 9;
                      return modal.onDidDismiss();

                    case 9:
                      result = _context22.sent;
                      this.isOpen = false;

                      if (result.data) {
                        if (result.data["delete"]) {
                          this.removeTest(index);
                        } else {
                          compressionTest = result.data;

                          if (this.tests === undefined) {
                            this.tests = [];
                          }

                          if (add) {
                            this.tests.push(compressionTest);
                          } else {
                            this.tests[index] = compressionTest;
                          }
                        }
                      }

                      this.testsChange.emit(this.tests);

                    case 13:
                    case "end":
                      return _context22.stop();
                  }
                }
              }, _callee22, this);
            }));
          }
        }, {
          key: "removeTest",
          value: function removeTest(index) {
            if (this.tests !== undefined && this.tests.length > 0) {
              this.tests.splice(index, 1);
            }
          }
        }]);

        return _CompressionTestListComponent;
      }();

      _CompressionTestListComponent.ɵfac = function CompressionTestListComponent_Factory(t) {
        return new (t || _CompressionTestListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController));
      };

      _CompressionTestListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _CompressionTestListComponent,
        selectors: [["app-compression-test-list"]],
        inputs: {
          tests: "tests",
          includeInSnowProfileAsDefault: "includeInSnowProfileAsDefault"
        },
        outputs: {
          testsChange: "testsChange"
        },
        decls: 11,
        vars: 7,
        consts: [["lines", "full"], [1, "ion-text-uppercase"], ["tabindex", "0", "detail", "true", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "click", "keyup.enter"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], ["tabindex", "0", "detail", "true", 3, "click", "keyup.enter"], [4, "ngIf"], ["slot", "end", "name", "link", 4, "ngIf"], ["slot", "end", "name", "link"]],
        template: function CompressionTestListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-list", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-list-header", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, CompressionTestListComponent_ion_item_5_Template, 10, 10, "ion-item", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-item", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CompressionTestListComponent_Template_ion_item_click_6_listener() {
              return ctx.addOrEditCompressionTest();
            })("keyup.enter", function CompressionTestListComponent_Template_ion_item_keyup_enter_6_listener() {
              return ctx.addOrEditCompressionTest();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "ion-icon", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](10, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](4, 3, "REGISTRATION.SNOW.COMPRESSION_TEST.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.tests);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](10, 5, "REGISTRATION.SNOW.COMPRESSION_TEST.ADD_NEW"));
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe, _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_1__.KdvDescriptionPipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_2__.MetersToCmPipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    32677: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompressionTestModalPage": function CompressionTestModalPage() {
          return (
            /* binding */
            _CompressionTestModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */
      14984);
      /* harmony import */


      var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../../shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function CompressionTestModalPage_ion_item_17_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-label", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "app-select", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("selectedValueChange", function CompressionTestModalPage_ion_item_17_Template_app_select_selectedValueChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r4.compressionTest.TapsFracture = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 3, "REGISTRATION.SNOW.COMPRESSION_TEST.TAPS_FRACTURE"));

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("selectedValue", ctx_r0.compressionTest.TapsFracture)("options", ctx_r0.tapsArray);
        }
      }

      function CompressionTestModalPage_app_numeric_input_18_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-numeric-input", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_app_numeric_input_18_Template_app_numeric_input_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r6.compressionTest.FractureDepth = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx_r1.compressionTest.FractureDepth)("min", 0)("max", 999)("decimalPlaces", 0)("convertRatio", 100);
        }
      }

      function CompressionTestModalPage_app_kdv_select_19_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-kdv-select", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_app_kdv_select_19_Template_app_kdv_select_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r8.compressionTest.ComprTestFractureTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx_r2.compressionTest.ComprTestFractureTID);
        }
      }

      function CompressionTestModalPage_app_kdv_select_20_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-kdv-select", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_app_kdv_select_20_Template_app_kdv_select_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r10.compressionTest.StabilityEvalTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx_r3.compressionTest.StabilityEvalTID);
        }
      }

      var _CompressionTestModalPage = /*#__PURE__*/function () {
        function _CompressionTestModalPage(modalController) {
          _classCallCheck(this, _CompressionTestModalPage);

          this.modalController = modalController;
          this.includeInSnowProfileAsDefault = false;
          this.showDelete = false;
          this.tapsArray = [];
          this.includeInSnowProfileDisabled = false;
        }

        _createClass(_CompressionTestModalPage, [{
          key: "isValid",
          get: function get() {
            var clone = Object.assign({}, this.compressionTest);
            clone.IncludeInSnowProfile = undefined;
            return !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(clone);
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            for (var i = 1; i <= 30; i++) {
              this.tapsArray.push({
                id: i,
                text: i.toString()
              });
            }

            if (!this.compressionTest) {
              this.compressionTest = {};

              if (this.includeInSnowProfileAsDefault) {
                this.compressionTest.IncludeInSnowProfile = true;
              }
            } else {
              this.showDelete = true;
            }

            this.checkIfIncludeInSnowProfileShouldBeDisabled();
          }
        }, {
          key: "checkIfIncludeInSnowProfileShouldBeDisabled",
          value: function checkIfIncludeInSnowProfileShouldBeDisabled() {
            if (this.isLBT()) {
              this.compressionTest.IncludeInSnowProfile = false;
              this.includeInSnowProfileDisabled = true;
              return;
            }

            this.includeInSnowProfileDisabled = false;
          }
        }, {
          key: "tapsFractureVisible",
          value: function tapsFractureVisible() {
            return !(this.isCTNorECTX() || this.isCTVorECTV() || this.isLBT());
          }
        }, {
          key: "isCTNorECTX",
          value: function isCTNorECTX() {
            return this.compressionTest.PropagationTID === 15 || this.compressionTest.PropagationTID === 24;
          }
        }, {
          key: "isCTVorECTV",
          value: function isCTVorECTV() {
            return this.compressionTest.PropagationTID === 11 || this.compressionTest.PropagationTID === 21;
          }
        }, {
          key: "isLBT",
          value: function isLBT() {
            return this.compressionTest.PropagationTID === 5;
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }, {
          key: "ok",
          value: function ok() {
            this.modalController.dismiss(this.compressionTest);
          }
        }, {
          key: "delete",
          value: function _delete() {
            this.modalController.dismiss({
              "delete": true
            });
          }
        }]);

        return _CompressionTestModalPage;
      }();

      _CompressionTestModalPage.ɵfac = function CompressionTestModalPage_Factory(t) {
        return new (t || _CompressionTestModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController));
      };

      _CompressionTestModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
        type: _CompressionTestModalPage,
        selectors: [["app-compression-test-modal"]],
        inputs: {
          compressionTest: "compressionTest",
          includeInSnowProfileAsDefault: "includeInSnowProfileAsDefault"
        },
        decls: 23,
        vars: 19,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["lines", "full"], ["slot", "end", "name", "IncludeInSnowProfile", 3, "disabled", "ngModel", "ngModelChange"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.TEST_TYPE", "kdvKey", "Snow_PropagationKDV", 3, "value", "valueChange"], [4, "ngIf"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.DISTANCE_FROM_TOP", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.FRACTURE_TYPE", "kdvKey", "Snow_ComprTestFractureKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.STABILITY_EVAL", "kdvKey", "Snow_StabilityEvalKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [3, "saveDisabled", "showDelete", "saveClicked", "deleteClicked"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.TAPS_FRACTURE", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.DISTANCE_FROM_TOP", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.FRACTURE_TYPE", "kdvKey", "Snow_ComprTestFractureKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.STABILITY_EVAL", "kdvKey", "Snow_StabilityEvalKDV", 3, "value", "valueChange"]],
        template: function CompressionTestModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CompressionTestModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "ion-list", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](14, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "ion-toggle", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CompressionTestModalPage_Template_ion_toggle_ngModelChange_15_listener($event) {
              return ctx.compressionTest.IncludeInSnowProfile = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "app-kdv-select", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_Template_app_kdv_select_valueChange_16_listener($event) {
              return ctx.compressionTest.PropagationTID = $event;
            })("valueChange", function CompressionTestModalPage_Template_app_kdv_select_valueChange_16_listener() {
              return ctx.checkIfIncludeInSnowProfileShouldBeDisabled();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, CompressionTestModalPage_ion_item_17_Template, 5, 5, "ion-item", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](18, CompressionTestModalPage_app_numeric_input_18_Template, 1, 5, "app-numeric-input", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](19, CompressionTestModalPage_app_kdv_select_19_Template, 1, 1, "app-kdv-select", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](20, CompressionTestModalPage_app_kdv_select_20_Template, 1, 1, "app-kdv-select", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "app-text-comment", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_Template_app_text_comment_valueChange_21_listener($event) {
              return ctx.compressionTest.Comment = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "app-modal-save-or-delete-buttons", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("saveClicked", function CompressionTestModalPage_Template_app_modal_save_or_delete_buttons_saveClicked_22_listener() {
              return ctx.ok();
            })("deleteClicked", function CompressionTestModalPage_Template_app_modal_save_or_delete_buttons_deleteClicked_22_listener() {
              return ctx["delete"]();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 13, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](8, 15, "REGISTRATION.SNOW.COMPRESSION_TEST.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](14, 17, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.INCLUDE_IN_SNOW_PROFILE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx.includeInSnowProfileDisabled)("ngModel", ctx.compressionTest.IncludeInSnowProfile);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx.compressionTest.PropagationTID);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.tapsFractureVisible());

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isCTNorECTX());

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isCTNorECTX());

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isLBT());

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx.compressionTest.Comment);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("saveDisabled", !ctx.isValid)("showDelete", ctx.showDelete);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_1__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_2__.KdvSelectComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__.TextCommentComponent, _modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_4__.ModalSaveOrDeleteButtonsComponent, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_5__.SelectComponent, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_6__.NumericInputComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LW1vZGFsLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    55935: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ExposedHeightComponent": function ExposedHeightComponent() {
          return (
            /* binding */
            _ExposedHeightComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function ExposedHeightComponent_ion_item_18_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-select", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedValueChange", function ExposedHeightComponent_ion_item_18_Template_app_select_selectedValueChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r2.exposedHight1 = $event;
          })("selectedValueChange", function ExposedHeightComponent_ion_item_18_Template_app_select_selectedValueChange_4_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r4.applyChanges();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 3, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selectedValue", ctx_r0.exposedHight1)("options", ctx_r0.heightArray);
        }
      }

      function ExposedHeightComponent_ion_item_19_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-select", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedValueChange", function ExposedHeightComponent_ion_item_19_Template_app_select_selectedValueChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r5.exposedHight2 = $event;
          })("selectedValueChange", function ExposedHeightComponent_ion_item_19_Template_app_select_selectedValueChange_4_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r7.applyChanges();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 3, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT2"));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selectedValue", ctx_r1.exposedHight2)("options", ctx_r1.lowerHeightArray);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "selected": a0
        };
      };

      var _ExposedHeightComponent = /*#__PURE__*/function () {
        function _ExposedHeightComponent(ngZone) {
          _classCallCheck(this, _ExposedHeightComponent);

          this.ngZone = ngZone;
          this.exposedHeightComboTIDChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.exposedHight1Change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.exposedHight2Change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        }

        _createClass(_ExposedHeightComponent, [{
          key: "heightArray",
          get: function get() {
            var options = [];

            for (var id = 0; id <= 8000; id += 100) {
              options.push({
                id: id,
                text: "".concat(id, " m")
              });
            }

            return options;
          }
        }, {
          key: "lowerHeightArray",
          get: function get() {
            var _this24 = this;

            return this.heightArray.filter(function (x) {
              return _this24.exposedHight1 === undefined || x.id < _this24.exposedHight1;
            });
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.setExposedHeights(this.exposedHeightComboTID);
          }
        }, {
          key: "setExposedHeights",
          value: function setExposedHeights(exposedHeightComboTID) {
            if (exposedHeightComboTID === 0) {
              this.exposedHeightTop = true;
              this.exposedHeightMiddle = true;
              this.exposedHeightBottom = true;
            } else if (exposedHeightComboTID === 1) {
              // Hvit nederst
              this.exposedHeightTop = true;
              this.exposedHeightMiddle = true;
              this.exposedHeightBottom = false;
            } else if (exposedHeightComboTID === 2) {
              // Svart nederst
              this.exposedHeightTop = false;
              this.exposedHeightMiddle = false;
              this.exposedHeightBottom = true;
            } else if (exposedHeightComboTID === 3) {
              // Hvit i midten
              this.exposedHeightTop = true;
              this.exposedHeightMiddle = false;
              this.exposedHeightBottom = true;
            } else if (exposedHeightComboTID === 4) {
              // Svart i midten
              this.exposedHeightTop = false;
              this.exposedHeightMiddle = true;
              this.exposedHeightBottom = false;
            } else {
              this.exposedHeightTop = false;
              this.exposedHeightMiddle = false;
              this.exposedHeightBottom = false;
            }
          }
        }, {
          key: "toggleExsposedHeightCombo",
          value: function toggleExsposedHeightCombo(position) {
            if (position === 'top') {
              this.exposedHeightTop = !this.exposedHeightTop;
            } else if (position === 'middle') {
              this.exposedHeightMiddle = !this.exposedHeightMiddle;
            } else {
              this.exposedHeightBottom = !this.exposedHeightBottom;
            }

            this.applyChanges();
          }
        }, {
          key: "sholdUseExposedHight2",
          value: function sholdUseExposedHight2() {
            return this.exposedHeightTop && this.exposedHeightBottom && !this.exposedHeightMiddle || !this.exposedHeightTop && !this.exposedHeightBottom && this.exposedHeightMiddle;
          }
        }, {
          key: "updateExposedHeightComboTID",
          value: function updateExposedHeightComboTID(top, middle, bottom) {
            if (top && middle && bottom) {
              this.exposedHeightComboTID = 0;
            } else if (!top && middle && !bottom) {
              this.exposedHeightComboTID = 4;
            } else if (top && !middle && bottom) {
              this.exposedHeightComboTID = 3;
            } else if (bottom) {
              this.exposedHeightComboTID = 2;
            } else if (top) {
              this.exposedHeightComboTID = 1;
            } else {
              this.exposedHeightComboTID = undefined;
            }
          }
        }, {
          key: "applyChanges",
          value: function applyChanges() {
            this.updateExposedHeightComboTID(this.exposedHeightTop, this.exposedHeightMiddle, this.exposedHeightBottom);

            if (!this.sholdUseExposedHight2()) {
              this.exposedHight2 = undefined;
            }

            this.exposedHeightComboTIDChange.emit(this.exposedHeightComboTID);
            this.exposedHight1Change.emit(this.exposedHight1);
            this.exposedHight2Change.emit(this.exposedHight2);
          }
        }]);

        return _ExposedHeightComponent;
      }();

      _ExposedHeightComponent.ɵfac = function ExposedHeightComponent_Factory(t) {
        return new (t || _ExposedHeightComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone));
      };

      _ExposedHeightComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _ExposedHeightComponent,
        selectors: [["app-exposed-height"]],
        inputs: {
          exposedHeightComboTID: "exposedHeightComboTID",
          exposedHight1: "exposedHight1",
          exposedHight2: "exposedHight2"
        },
        outputs: {
          exposedHeightComboTIDChange: "exposedHeightComboTIDChange",
          exposedHight1Change: "exposedHight1Change",
          exposedHight2Change: "exposedHight2Change"
        },
        decls: 20,
        vars: 23,
        consts: [["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap", "ion-margin-bottom"], [1, "exposedHight"], [1, "top", "padding-bottom", 3, "ngClass", "click"], ["size", "12", 1, "ion-text-center", "ion-align-self-center"], [1, "middle", "padding-bottom", 3, "ngClass", "click"], [1, "bottom", 3, "ngClass", "click"], [4, "ngIf"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT1", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT2", 3, "selectedValue", "options", "selectedValueChange"]],
        template: function ExposedHeightComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ion-text", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ion-grid", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ion-row", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExposedHeightComponent_Template_ion_row_click_6_listener() {
              return ctx.toggleExsposedHeightCombo("top");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ion-col", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "ion-row", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExposedHeightComponent_Template_ion_row_click_10_listener() {
              return ctx.toggleExsposedHeightCombo("middle");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "ion-col", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](13, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "ion-row", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExposedHeightComponent_Template_ion_row_click_14_listener() {
              return ctx.toggleExsposedHeightCombo("bottom");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "ion-col", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](17, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, ExposedHeightComponent_ion_item_18_Template, 5, 5, "ion-item", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, ExposedHeightComponent_ion_item_19_Template, 5, 5, "ion-item", 7);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 9, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT_COMBO"));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](17, _c0, ctx.exposedHeightTop));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](9, 11, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.TOP"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](19, _c0, ctx.exposedHeightMiddle));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](13, 13, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.MIDDLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](21, _c0, ctx.exposedHeightBottom));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](17, 15, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.BOTTOM"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.exposedHeightTop || ctx.exposedHeightMiddle || ctx.exposedHeightBottom);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.sholdUseExposedHight2());
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonRow, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_0__.SelectComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
        styles: [".exposedHight[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%] {\n  min-height: 60px;\n  margin-bottom: 10px;\n  background-position: center !important;\n  background-size: contain !important;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.selected[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.top[_ngcontent-%COMP%] {\n  background: #fff url(\"/assets/images/mountain-top-grey.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.top.selected[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7) url(\"/assets/images/mountain-top-black.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.middle[_ngcontent-%COMP%] {\n  background: #fff url(\"/assets/images/mountain-middle-grey.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.middle.selected[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7) url(\"/assets/images/mountain-middle-black.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.bottom[_ngcontent-%COMP%] {\n  background: #fff url(\"/assets/images/mountain-bottom-grey.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.bottom.selected[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7) url(\"/assets/images/mountain-bottom-black.png\") no-repeat;\n}\nion-text[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cG9zZWQtaGVpZ2h0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNDQUFBO0VBQ0EsbUNBQUE7QUFBUjtBQUdZO0VBQ0ksV0FBQTtBQURoQjtBQUtRO0VBQ0ksc0VBQUE7QUFIWjtBQUlZO0VBQ0kscUZBQUE7QUFGaEI7QUFNUTtFQUNJLHlFQUFBO0FBSlo7QUFLWTtFQUNRLHdGQUFBO0FBSHBCO0FBT1E7RUFDSSx5RUFBQTtBQUxaO0FBTVk7RUFDSSx3RkFBQTtBQUpoQjtBQVVBO0VBQ0ksV0FBQTtBQVBKIiwiZmlsZSI6ImV4cG9zZWQtaGVpZ2h0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4cG9zZWRIaWdodCB7XHJcbiAgICBpb24tcm93IHtcclxuICAgICAgICBtaW4taGVpZ2h0OiA2MHB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluICFpbXBvcnRhbnQ7XHJcblxyXG4gICAgICAgICYuc2VsZWN0ZWQge1xyXG4gICAgICAgICAgICBpb24tY29sIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnRvcCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmYgdXJsKFwiL2Fzc2V0cy9pbWFnZXMvbW91bnRhaW4tdG9wLWdyZXkucG5nXCIpIG5vLXJlcGVhdDtcclxuICAgICAgICAgICAgJi5zZWxlY3RlZCB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNykgdXJsKFwiL2Fzc2V0cy9pbWFnZXMvbW91bnRhaW4tdG9wLWJsYWNrLnBuZ1wiKSBuby1yZXBlYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYubWlkZGxlIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZiB1cmwoXCIvYXNzZXRzL2ltYWdlcy9tb3VudGFpbi1taWRkbGUtZ3JleS5wbmdcIikgbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICAmLnNlbGVjdGVkIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNykgdXJsKFwiL2Fzc2V0cy9pbWFnZXMvbW91bnRhaW4tbWlkZGxlLWJsYWNrLnBuZ1wiKSBuby1yZXBlYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuYm90dG9tIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZiB1cmwoXCIvYXNzZXRzL2ltYWdlcy9tb3VudGFpbi1ib3R0b20tZ3JleS5wbmdcIikgbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICAmLnNlbGVjdGVkIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwwLjcpIHVybChcIi9hc3NldHMvaW1hZ2VzL21vdW50YWluLWJvdHRvbS1ibGFjay5wbmdcIikgbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcbn1cclxuXHJcbmlvbi10ZXh0IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    70133: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ValidExpositionComponent": function ValidExpositionComponent() {
          return (
            /* binding */
            _ValidExpositionComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _c0 = function _c0(a0) {
        return {
          "selected": a0
        };
      };

      function ValidExpositionComponent_ion_grid_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-grid", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r1.setExposition(7);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r3.setExposition(0);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r4.setExposition(1);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_12_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r5.setExposition(6);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](14, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_15_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r6.toggleAllExpositions();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](17, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_18_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r7.setExposition(2);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](20, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_22_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r8.setExposition(5);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](24, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_25_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r9.setExposition(4);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](27, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_28_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r10.setExposition(3);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](30, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](36, _c0, ctx_r0.validExpositionCopy[7] === "1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 18, "DIRECTION.NW"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](38, _c0, ctx_r0.validExpositionCopy[0] === "1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 20, "DIRECTION.N"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](40, _c0, ctx_r0.validExpositionCopy[1] === "1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](10, 22, "DIRECTION.NE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](42, _c0, ctx_r0.validExpositionCopy[6] === "1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](14, 24, "DIRECTION.W"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](44, _c0, ctx_r0.validExpositionCopy === "11111111"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](17, 26, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.ALL"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](46, _c0, ctx_r0.validExpositionCopy[2] === "1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](20, 28, "DIRECTION.E"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](48, _c0, ctx_r0.validExpositionCopy[5] === "1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](24, 30, "DIRECTION.SW"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](50, _c0, ctx_r0.validExpositionCopy[4] === "1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](27, 32, "DIRECTION.S"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](52, _c0, ctx_r0.validExpositionCopy[3] === "1"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](30, 34, "DIRECTION.SE"), " ");
        }
      }

      var EMPTY_EXPOSITION = '00000000';
      var ALL_EXPOSITION = '11111111';

      var _ValidExpositionComponent = /*#__PURE__*/function () {
        function _ValidExpositionComponent(ngZone) {
          _classCallCheck(this, _ValidExpositionComponent);

          this.ngZone = ngZone;
          this.validExpositionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_ValidExpositionComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            if (!this.validExposition) {
              this.validExpositionCopy = EMPTY_EXPOSITION;
            } else {
              this.validExpositionCopy = this.validExposition;
            }
          }
        }, {
          key: "setExposition",
          value: function setExposition(index) {
            var existingValue = this.validExpositionCopy.substr(index, 1);
            var newValue = existingValue === '1' ? '0' : '1';
            this.validExpositionCopy = this.validExpositionCopy.substr(0, index) + newValue + this.validExpositionCopy.substr(index + 1);
            this.applyChanges();
          }
        }, {
          key: "toggleAllExpositions",
          value: function toggleAllExpositions() {
            this.validExpositionCopy = this.validExpositionCopy === ALL_EXPOSITION ? EMPTY_EXPOSITION : ALL_EXPOSITION;
            this.applyChanges();
          }
        }, {
          key: "applyChanges",
          value: function applyChanges() {
            var _this25 = this;

            this.ngZone.run(function () {
              if (_this25.validExpositionCopy === EMPTY_EXPOSITION) {
                _this25.validExposition = undefined;
              } else {
                _this25.validExposition = _this25.validExpositionCopy;
              }

              _this25.validExpositionChange.emit(_this25.validExposition);
            });
          }
        }]);

        return _ValidExpositionComponent;
      }();

      _ValidExpositionComponent.ɵfac = function ValidExpositionComponent_Factory(t) {
        return new (t || _ValidExpositionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
      };

      _ValidExpositionComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _ValidExpositionComponent,
        selectors: [["app-valid-exposition"]],
        inputs: {
          validExposition: "validExposition"
        },
        outputs: {
          validExpositionChange: "validExpositionChange"
        },
        decls: 6,
        vars: 4,
        consts: [["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap", "ion-margin-bottom"], ["class", "exposition ion-no-padding", 4, "ngIf"], [1, "exposition", "ion-no-padding"], ["size", "4", 1, "ion-text-center", 3, "ngClass", "click"]],
        template: function ValidExpositionComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ion-text", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ValidExpositionComponent_ion_grid_5_Template, 31, 54, "ion-grid", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.VALID_EXPOSITION"));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.validExpositionCopy);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
        styles: [".exposition[_ngcontent-%COMP%] {\n  border: 2px solid lightgrey;\n}\n.exposition[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {\n  padding: 18px;\n  background: lightgrey;\n  border: 2px solid lightgrey;\n}\n.exposition[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col.selected[_ngcontent-%COMP%] {\n  color: #fff;\n  background: rgba(0, 0, 0, 0.8);\n}\nion-text[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwyQkFBQTtBQUNKO0FBQ1E7RUFDSSxhQUFBO0VBQ0EscUJBQUE7RUFDQSwyQkFBQTtBQUNaO0FBQ1k7RUFDSSxXQUFBO0VBQ0EsOEJBQUE7QUFDaEI7QUFLQTtFQUNJLFdBQUE7QUFGSiIsImZpbGUiOiJ2YWxpZC1leHBvc2l0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4cG9zaXRpb24ge1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgbGlnaHRncmV5O1xyXG4gICAgaW9uLXJvdyB7XHJcbiAgICAgICAgaW9uLWNvbCB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDE4cHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JleTtcclxuICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgbGlnaHRncmV5O1xyXG5cclxuICAgICAgICAgICAgJi5zZWxlY3RlZCB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW9uLXRleHQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn0iXX0= */"]
      });
      /***/
    },

    /***/
    32032: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TextCommentComponent": function TextCommentComponent() {
          return (
            /* binding */
            _TextCommentComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _TextCommentComponent = /*#__PURE__*/function () {
        function _TextCommentComponent() {
          _classCallCheck(this, _TextCommentComponent);

          this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.rows = 4;
          this.disabled = false;
          this.max = 1024;
        }

        _createClass(_TextCommentComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "onBlur",
          value: function onBlur() {
            if (this.value) {
              this.value = this.value.trim();
            }

            this.valueChange.emit(this.value);
          }
        }]);

        return _TextCommentComponent;
      }();

      _TextCommentComponent.ɵfac = function TextCommentComponent_Factory(t) {
        return new (t || _TextCommentComponent)();
      };

      _TextCommentComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _TextCommentComponent,
        selectors: [["app-text-comment"]],
        inputs: {
          title: "title",
          placeholder: "placeholder",
          value: "value",
          rows: "rows",
          disabled: "disabled",
          max: "max"
        },
        outputs: {
          valueChange: "valueChange"
        },
        decls: 6,
        vars: 11,
        consts: [["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["autocapitalize", "sentences", "type", "textarea", 3, "maxlength", "disabled", "rows", "ngModel", "autoGrow", "placeholder", "ionBlur", "ngModelChange"]],
        template: function TextCommentComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ion-textarea", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ionBlur", function TextCommentComponent_Template_ion_textarea_ionBlur_4_listener() {
              return ctx.onBlur();
            })("ngModelChange", function TextCommentComponent_Template_ion_textarea_ngModelChange_4_listener($event) {
              return ctx.value = $event;
            })("ngModelChange", function TextCommentComponent_Template_ion_textarea_ngModelChange_4_listener($event) {
              return ctx.valueChange.emit($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 7, ctx.title));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 9, ctx.placeholder));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("maxlength", ctx.max)("disabled", ctx.disabled)("rows", ctx.rows)("ngModel", ctx.value)("autoGrow", true);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonTextarea, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgModel],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
        styles: ["ion-textarea[_ngcontent-%COMP%] {\n  min-height: 55px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQtY29tbWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0YiLCJmaWxlIjoidGV4dC1jb21tZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXRleHRhcmVhIHtcclxuICBtaW4taGVpZ2h0OiA1NXB4O1xyXG59Il19 */"]
      });
      /***/
    },

    /***/
    99736: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "YesNoSelectComponent": function YesNoSelectComponent() {
          return (
            /* binding */
            _YesNoSelectComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _YesNoSelectComponent = function _YesNoSelectComponent() {
        _classCallCheck(this, _YesNoSelectComponent);

        this.labelColor = 'medium';
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.options = [{
          id: true,
          text: 'DIALOGS.YES'
        }, {
          id: false,
          text: 'DIALOGS.NO'
        }];
      };

      _YesNoSelectComponent.ɵfac = function YesNoSelectComponent_Factory(t) {
        return new (t || _YesNoSelectComponent)();
      };

      _YesNoSelectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _YesNoSelectComponent,
        selectors: [["app-yes-no-select"]],
        inputs: {
          value: "value",
          labelColor: "labelColor",
          title: "title"
        },
        outputs: {
          valueChange: "valueChange"
        },
        decls: 5,
        vars: 7,
        consts: [["position", "stacked", 1, "ion-text-uppercase", 3, "color"], [3, "selectedValue", "title", "options", "selectedValueChange"]],
        template: function YesNoSelectComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-select", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedValueChange", function YesNoSelectComponent_Template_app_select_selectedValueChange_4_listener($event) {
              return ctx.value = $event;
            })("selectedValueChange", function YesNoSelectComponent_Template_app_select_selectedValueChange_4_listener($event) {
              return ctx.valueChange.emit($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", ctx.labelColor);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 5, ctx.title));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selectedValue", ctx.value)("title", ctx.title)("options", ctx.options);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonLabel, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_0__.SelectComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ5ZXMtbm8tc2VsZWN0LmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    47687: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AddWebUrlModalPage": function AddWebUrlModalPage() {
          return (
            /* binding */
            _AddWebUrlModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */
      14984);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _AddWebUrlModalPage = /*#__PURE__*/function () {
        function _AddWebUrlModalPage(modalController) {
          _classCallCheck(this, _AddWebUrlModalPage);

          this.modalController = modalController;
          this.isNew = true;
        }

        _createClass(_AddWebUrlModalPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            if (this.weburl) {
              this.urlToSave = Object.assign({}, this.weburl);
              this.isNew = false;
            } else {
              this.urlToSave = {};
            }
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }, {
          key: "ok",
          value: function ok() {
            this.modalController.dismiss(this.urlToSave);
          }
        }, {
          key: "delete",
          value: function _delete() {
            this.modalController.dismiss({
              "delete": true
            });
          }
        }]);

        return _AddWebUrlModalPage;
      }();

      _AddWebUrlModalPage.ɵfac = function AddWebUrlModalPage_Factory(t) {
        return new (t || _AddWebUrlModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController));
      };

      _AddWebUrlModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _AddWebUrlModalPage,
        selectors: [["app-add-web-url-modal"]],
        inputs: {
          weburl: "weburl"
        },
        decls: 22,
        vars: 16,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.GENERAL_COMMENT.COMMENT_TITLE", "rows", "2", 3, "value", "valueChange"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["type", "url", 3, "ngModel", "ngModelChange"], [3, "saveDisabled", "showDelete", "saveClicked", "deleteClicked"]],
        template: function AddWebUrlModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AddWebUrlModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "ion-list", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "ion-list-header", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](14, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "app-text-comment", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("valueChange", function AddWebUrlModalPage_Template_app_text_comment_valueChange_15_listener($event) {
              return ctx.urlToSave.UrlDescription = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "ion-label", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](19, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "ion-input", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function AddWebUrlModalPage_Template_ion_input_ngModelChange_20_listener($event) {
              return ctx.urlToSave.UrlLine = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "app-modal-save-or-delete-buttons", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("saveClicked", function AddWebUrlModalPage_Template_app_modal_save_or_delete_buttons_saveClicked_21_listener() {
              return ctx.ok();
            })("deleteClicked", function AddWebUrlModalPage_Template_app_modal_save_or_delete_buttons_deleteClicked_21_listener() {
              return ctx["delete"]();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 8, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](8, 10, "REGISTRATION.ADD_WEB_URL.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](14, 12, "REGISTRATION.ADD_WEB_URL.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx.urlToSave.UrlDescription);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](19, 14, "REGISTRATION.ADD_WEB_URL.URL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.urlToSave.UrlLine);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("saveDisabled", !ctx.urlToSave.UrlLine)("showDelete", !ctx.isNew);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_1__.TextCommentComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonInput, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_2__.ModalSaveOrDeleteButtonsComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtd2ViLXVybC1tb2RhbC5wYWdlLnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    56587: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HelpModalPageModule": function HelpModalPageModule() {
          return (
            /* binding */
            _HelpModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _help_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./help-modal.page */
      94763);
      /* harmony import */


      var ngx_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ngx-markdown */
      36731);
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../shared/shared.module */
      72271);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _HelpModalPageModule = function _HelpModalPageModule() {
        _classCallCheck(this, _HelpModalPageModule);
      };

      _HelpModalPageModule.ɵfac = function HelpModalPageModule_Factory(t) {
        return new (t || _HelpModalPageModule)();
      };

      _HelpModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _HelpModalPageModule
      });
      _HelpModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, ngx_markdown__WEBPACK_IMPORTED_MODULE_3__.MarkdownModule.forChild()]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_HelpModalPageModule, {
          declarations: [_help_modal_page__WEBPACK_IMPORTED_MODULE_0__.HelpModalPage],
          imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, ngx_markdown__WEBPACK_IMPORTED_MODULE_3__.MarkdownModule]
        });
      })();
      /***/

    },

    /***/
    94763: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HelpModalPage": function HelpModalPage() {
          return (
            /* binding */
            _HelpModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var ngx_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ngx-markdown */
      36731);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _HelpModalPage = /*#__PURE__*/function () {
        function _HelpModalPage(modalController) {
          _classCallCheck(this, _HelpModalPage);

          this.modalController = modalController;
        }

        _createClass(_HelpModalPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "close",
          value: function close() {
            this.modalController.dismiss();
          }
        }]);

        return _HelpModalPage;
      }();

      _HelpModalPage.ɵfac = function HelpModalPage_Factory(t) {
        return new (t || _HelpModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController));
      };

      _HelpModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _HelpModalPage,
        selectors: [["app-help-modal"]],
        inputs: {
          helpText: "helpText"
        },
        decls: 11,
        vars: 7,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "end"], [3, "click"], [1, "ion-padding", 3, "click"], [3, "data"]],
        template: function HelpModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpModalPage_Template_ion_button_click_3_listener() {
              return ctx.close();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "ion-content", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpModalPage_Template_ion_content_click_9_listener() {
              return ctx.close();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "markdown", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 3, "DIALOGS.OK"));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 5, "HELP.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("data", ctx.helpText);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonContent, ngx_markdown__WEBPACK_IMPORTED_MODULE_3__.MarkdownComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWxwLW1vZGFsLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    24783: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NumericInputModalPageModule": function NumericInputModalPageModule() {
          return (
            /* binding */
            _NumericInputModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _numeric_input_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./numeric-input-modal.page */
      89043);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _NumericInputModalPageModule = function _NumericInputModalPageModule() {
        _classCallCheck(this, _NumericInputModalPageModule);
      };

      _NumericInputModalPageModule.ɵfac = function NumericInputModalPageModule_Factory(t) {
        return new (t || _NumericInputModalPageModule)();
      };

      _NumericInputModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _NumericInputModalPageModule
      });
      _NumericInputModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_NumericInputModalPageModule, {
          declarations: [_numeric_input_modal_page__WEBPACK_IMPORTED_MODULE_0__.NumericInputModalPage],
          imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]
        });
      })();
      /***/

    },

    /***/
    89043: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NumericInputModalPage": function NumericInputModalPage() {
          return (
            /* binding */
            _NumericInputModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../core/helpers/number-helper */
      27714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function NumericInputModalPage_ion_title_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-title");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx_r0.title), " ");
        }
      }

      function NumericInputModalPage_ion_text_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2212");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function NumericInputModalPage_ion_text_18_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\xA0", ctx_r2.suffix, "");
        }
      }

      function NumericInputModalPage_ion_col_23_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-button", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_col_23_Template_ion_button_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10);

            var i_r8 = restoredCtx.$implicit;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r9.pushNumber(i_r8);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var i_r8 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r8);
        }
      }

      function NumericInputModalPage_ion_col_25_Template(rf, ctx) {
        if (rf & 1) {
          var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-button", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_col_25_Template_ion_button_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r13);

            var i_r11 = restoredCtx.$implicit;

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r12.pushNumber(i_r11);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var i_r11 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r11);
        }
      }

      function NumericInputModalPage_ion_col_27_Template(rf, ctx) {
        if (rf & 1) {
          var _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-button", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_col_27_Template_ion_button_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r16);

            var i_r14 = restoredCtx.$implicit;

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r15.pushNumber(i_r14);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var i_r14 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r14);
        }
      }

      function NumericInputModalPage_ion_button_30_Template(rf, ctx) {
        if (rf & 1) {
          var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_button_30_Template_ion_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r17.toggleNegative();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "+ / - ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("fill", ctx_r6.isNegative ? "solid" : "clear");
        }
      }

      function NumericInputModalPage_ion_button_35_Template(rf, ctx) {
        if (rf & 1) {
          var _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_button_35_Template_ion_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r20);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r19.pushDecimalSeparator();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r7.decimalSep);
        }
      }

      var _c0 = function _c0() {
        return ["1", "2", "3"];
      };

      var _c1 = function _c1() {
        return ["4", "5", "6"];
      };

      var _c2 = function _c2() {
        return ["7", "8", "9"];
      };

      var _NumericInputModalPage = /*#__PURE__*/function () {
        function _NumericInputModalPage(modalController) {
          _classCallCheck(this, _NumericInputModalPage);

          this.modalController = modalController;
          this.min = -100000;
          this.max = 100000;
          this.decimalPlaces = 0;
          this.decimalSep = '.';
          this.isNegative = false;
          this.numbers = [];
        }

        _createClass(_NumericInputModalPage, [{
          key: "textVal",
          get: function get() {
            return this.numbers.join('');
          }
        }, {
          key: "localeString",
          get: function get() {
            return this.textVal.replace('.', this.decimalSep);
          }
        }, {
          key: "numberVal",
          get: function get() {
            var num = parseFloat(this.textVal);

            if (isNaN(num)) {
              return undefined;
            }

            return parseFloat(this.textVal) * (this.isNegative ? -1 : 1);
          }
        }, {
          key: "keyEvent",
          value: function keyEvent(event) {
            if (event.key.match('[0-9]')) {
              this.pushNumber(event.key);
            }

            if (event.key.match('[,.]')) {
              this.pushDecimalSeparator();
            }

            if (event.keyCode === 13) {
              // Enter click
              this.done();
            }

            if (event.keyCode === 8) {
              // Backspace
              this.clear();
            }
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            if (this.value !== undefined) {
              this.isNegative = this.value < 0;
              var positiveValue = this.value * (this.isNegative ? -1 : 1);
              this.numbers = _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.setDecimalPlaces(positiveValue, this.decimalPlaces).toString(10).split('');
            }

            if (this.max !== undefined && this.max <= 0) {
              this.isNegative = true;
            }

            this.decimalSep = this.decimalSeparator !== undefined ? this.decimalSeparator : this.getDecimalSeparatorForBrowser();
          }
        }, {
          key: "getDecimalSeparatorForBrowser",
          value: function getDecimalSeparatorForBrowser() {
            return 1.1.toLocaleString().substring(1, 2);
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }, {
          key: "done",
          value: function done() {
            this.modalController.dismiss({
              ok: true,
              value: this.numberVal
            });
          }
        }, {
          key: "toggleNegative",
          value: function toggleNegative() {
            if (this.max !== undefined && this.max <= 0) {
              return;
            }

            this.isNegative = !this.isNegative;
          }
        }, {
          key: "getNumberOfDecimals",
          value: function getNumberOfDecimals() {
            var isDecimal = false;
            var result = 0;

            var _iterator = _createForOfIteratorHelper(this.numbers),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var i = _step.value;

                if (isDecimal) {
                  result++;
                } else {
                  if (i === '.') {
                    isDecimal = true;
                  }
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return result;
          }
        }, {
          key: "pushNumber",
          value: function pushNumber(val) {
            if (this.decimalPlaces > 0 && this.getNumberOfDecimals() >= this.decimalPlaces) {
              return;
            }

            this.numbers.push(val);

            if (this.max !== undefined && this.numberVal > this.max || this.min !== undefined && this.numberVal < this.min) {
              this.numbers.pop();
            }
          }
        }, {
          key: "pushDecimalSeparator",
          value: function pushDecimalSeparator() {
            if (this.numbers.indexOf('.') < 0) {
              this.numbers.push('.');
            }
          }
        }, {
          key: "clear",
          value: function clear() {
            this.numbers.pop();
          }
        }]);

        return _NumericInputModalPage;
      }();

      _NumericInputModalPage.ɵfac = function NumericInputModalPage_Factory(t) {
        return new (t || _NumericInputModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController));
      };

      _NumericInputModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _NumericInputModalPage,
        selectors: [["app-numeric-input-modal"]],
        hostBindings: function NumericInputModalPage_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keyup", function NumericInputModalPage_keyup_HostBindingHandler($event) {
              return ctx.keyEvent($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
          }
        },
        inputs: {
          value: "value",
          suffix: "suffix",
          min: "min",
          max: "max",
          decimalPlaces: "decimalPlaces",
          decimalSeparator: "decimalSeparator",
          title: "title"
        },
        decls: 36,
        vars: 18,
        consts: [["mode", "ios"], ["slot", "start"], [3, "click"], [4, "ngIf"], ["slot", "end"], [1, "number-pad"], [1, "ion-justify-content-center"], ["size", "8", 1, "ion-align-self-center", "text-value", "ion-text-right"], ["size", "4", 1, "ion-align-self-center", "ion-text-right"], ["fill", "clear", 1, "delete-button", 3, "click"], ["class", "ion-text-center", 4, "ngFor", "ngForOf"], [1, "ion-text-center"], [3, "fill", "click", 4, "ngIf"], ["fill", "clear", 3, "click"], ["fill", "clear", 3, "click", 4, "ngIf"], [3, "fill", "click"]],
        template: function NumericInputModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, NumericInputModalPage_ion_title_6_Template, 3, 3, "ion-title", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ion-buttons", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_Template_ion_button_click_8_listener() {
              return ctx.done();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "ion-grid", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "ion-row", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "ion-col", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, NumericInputModalPage_ion_text_15_Template, 2, 0, "ion-text", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, NumericInputModalPage_ion_text_18_Template, 2, 1, "ion-text", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "ion-col", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "ion-button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_Template_ion_button_click_20_listener() {
              return ctx.clear();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "\u2190");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, NumericInputModalPage_ion_col_23_Template, 3, 1, "ion-col", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, NumericInputModalPage_ion_col_25_Template, 3, 1, "ion-col", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, NumericInputModalPage_ion_col_27_Template, 3, 1, "ion-col", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "ion-col", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, NumericInputModalPage_ion_button_30_Template, 2, 1, "ion-button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "ion-col", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "ion-button", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_Template_ion_button_click_32_listener() {
              return ctx.pushNumber("0");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "0");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "ion-col", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, NumericInputModalPage_ion_button_35_Template, 2, 1, "ion-button", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 11, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.title);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](10, 13, "DIALOGS.OK"));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isNegative);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.localeString);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.localeString && ctx.suffix);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](15, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](16, _c1));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](17, _c2));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.min < 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.decimalPlaces > 0);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButton, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonTitle],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
        styles: ["ion-content[_ngcontent-%COMP%] {\n  --background: #D4E4EF;\n  --overflow: hidden;\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  display: flex;\n  flex-grow: 1;\n  font-size: 22px;\n  height: 2.8em;\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]:not(.button-solid) {\n  --background: var(--ion-background-color);\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%]   ion-button.delete-button[_ngcontent-%COMP%] {\n  height: 2.8em;\n  width: 2.8em;\n  display: inline-flex;\n  --border-radius: 50%;\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%]   .text-value[_ngcontent-%COMP%] {\n  padding-right: 16px;\n  font-size: 26px;\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --ion-safe-area-top: 0;\n}\nion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  min-width: 44px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWVyaWMtaW5wdXQtbW9kYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kscUJBQUE7RUFDQSxrQkFBQTtBQUNKO0FBQUk7RUFDSSxlQUFBO0FBRVI7QUFEUTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUFHWjtBQUZZO0VBQ0kseUNBQUE7QUFJaEI7QUFEWTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtBQUdoQjtBQUNRO0VBQ0ksbUJBQUE7RUFDQSxlQUFBO0FBQ1o7QUFJQTtFQUNJLHNCQUFBO0FBREo7QUFFSTtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtBQUFSIiwiZmlsZSI6Im51bWVyaWMtaW5wdXQtbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRDRFNEVGO1xyXG4gICAgLS1vdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgLm51bWJlci1wYWQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBpb24tYnV0dG9uIHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMi44ZW07XHJcbiAgICAgICAgICAgICY6bm90KC5idXR0b24tc29saWQpIHtcclxuICAgICAgICAgICAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAmLmRlbGV0ZS1idXR0b24ge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyLjhlbTtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyLjhlbTtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgICAgICAgICAgLS1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC50ZXh0LXZhbHVlIHtcclxuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMTZweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyNnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW9uLXRvb2xiYXIge1xyXG4gICAgLS1pb24tc2FmZS1hcmVhLXRvcDogMDtcclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAgIG1pbi1oZWlnaHQ6IDQ0cHg7XHJcbiAgICAgICAgbWluLXdpZHRoOiA0NHB4O1xyXG4gICAgfVxyXG59Il19 */"]
      });
      /***/
    },

    /***/
    38714: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UtmSource": function UtmSource() {
          return (
            /* binding */
            _UtmSource
          );
        }
        /* harmony export */

      });

      var _UtmSource;

      (function (UtmSource) {
        UtmSource[UtmSource["SelectedInMap"] = 35] = "SelectedInMap";
        UtmSource[UtmSource["GPS"] = 40] = "GPS";
      })(_UtmSource || (_UtmSource = {}));
      /***/

    },

    /***/
    46862: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "KdvDescriptionPipe": function KdvDescriptionPipe() {
          return (
            /* binding */
            _KdvDescriptionPipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../core/services/kdv/kdv.service */
      88430);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _KdvDescriptionPipe = /*#__PURE__*/function () {
        function _KdvDescriptionPipe(kdvService) {
          _classCallCheck(this, _KdvDescriptionPipe);

          this.kdvService = kdvService;
        }

        _createClass(_KdvDescriptionPipe, [{
          key: "transform",
          value: function transform(value, kdvKey) {
            var returnDescription = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
              var kdvelements, kdvelement, result;
              return regeneratorRuntime.wrap(function _callee23$(_context23) {
                while (1) {
                  switch (_context23.prev = _context23.next) {
                    case 0:
                      _context23.next = 2;
                      return this.kdvService.getKdvRepositoryByKeyObservable(kdvKey).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1)).toPromise();

                    case 2:
                      kdvelements = _context23.sent;
                      kdvelement = kdvelements.find(function (x) {
                        return x.Id === value;
                      });
                      result = kdvelement ? returnDescription ? kdvelement.Description : kdvelement.Name : '';
                      return _context23.abrupt("return", result.trim());

                    case 6:
                    case "end":
                      return _context23.stop();
                  }
                }
              }, _callee23, this);
            }));
          }
        }]);

        return _KdvDescriptionPipe;
      }();

      _KdvDescriptionPipe.ɵfac = function KdvDescriptionPipe_Factory(t) {
        return new (t || _KdvDescriptionPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__.KdvService, 16));
      };

      _KdvDescriptionPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefinePipe"]({
        name: "kdvDescription",
        type: _KdvDescriptionPipe,
        pure: true
      });
      /***/
    },

    /***/
    50795: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MetersToCmPipe": function MetersToCmPipe() {
          return (
            /* binding */
            _MetersToCmPipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../core/helpers/number-helper */
      27714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _MetersToCmPipe = /*#__PURE__*/function () {
        function _MetersToCmPipe() {
          _classCallCheck(this, _MetersToCmPipe);
        }

        _createClass(_MetersToCmPipe, [{
          key: "transform",
          value: function transform(value) {
            var decimalPlaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

            if (value === undefined || value === null) {
              return value;
            }

            return _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.setDecimalPlaces(value * 100.0, decimalPlaces);
          }
        }]);

        return _MetersToCmPipe;
      }();

      _MetersToCmPipe.ɵfac = function MetersToCmPipe_Factory(t) {
        return new (t || _MetersToCmPipe)();
      };

      _MetersToCmPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
        name: "metersToCm",
        type: _MetersToCmPipe,
        pure: true
      });
      /***/
    },

    /***/
    13741: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SummaryItemService": function SummaryItemService() {
          return (
            /* binding */
            _SummaryItemService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _shared_services_date_helper_date_helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../shared/services/date-helper/date-helper.service */
      62077);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var src_app_modules_common_registration_services_registration_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/modules/common-registration/services/registration/registration.service */
      36695);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../core/services/user-group/user-group.service */
      3942);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);

      var _SummaryItemService = /*#__PURE__*/function () {
        function _SummaryItemService(registrationService, dateHelperService, userGroupService, navController) {
          _classCallCheck(this, _SummaryItemService);

          this.registrationService = registrationService;
          this.dateHelperService = dateHelperService;
          this.userGroupService = userGroupService;
          this.navController = navController;
        }

        _createClass(_SummaryItemService, [{
          key: "getSummaryItems",
          value: function getSummaryItems(registration, userGroups) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
              var userGroupsToUse, summaryItems;
              return regeneratorRuntime.wrap(function _callee24$(_context24) {
                while (1) {
                  switch (_context24.prev = _context24.next) {
                    case 0:
                      if (registration) {
                        _context24.next = 2;
                        break;
                      }

                      return _context24.abrupt("return", []);

                    case 2:
                      if (!userGroups) {
                        _context24.next = 6;
                        break;
                      }

                      _context24.t0 = userGroups;
                      _context24.next = 9;
                      break;

                    case 6:
                      _context24.next = 8;
                      return this.userGroupService.getUserGroups();

                    case 8:
                      _context24.t0 = _context24.sent;

                    case 9:
                      userGroupsToUse = _context24.t0;
                      _context24.t1 = {
                        id: registration.id,
                        href: '/registration/obs-location',
                        queryParams: {
                          geoHazard: registration.geoHazard
                        },
                        title: 'REGISTRATION.OBS_LOCATION.TITLE',
                        subTitle: registration.request.ObsLocation ? registration.request.ObsLocation.LocationName || registration.request.ObsLocation.LocationDescription : '',
                        hasData: !(0, _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_5__.isEmpty)(registration.request.ObsLocation)
                      };
                      _context24.t2 = registration.id;

                      if (!registration.request.DtObsTime) {
                        _context24.next = 18;
                        break;
                      }

                      _context24.next = 15;
                      return this.dateHelperService.formatDateString(registration.request.DtObsTime);

                    case 15:
                      _context24.t3 = _context24.sent;
                      _context24.next = 19;
                      break;

                    case 18:
                      _context24.t3 = '';

                    case 19:
                      _context24.t4 = _context24.t3;
                      _context24.t5 = !!registration.request.DtObsTime;
                      _context24.t6 = {
                        id: _context24.t2,
                        href: '/registration/set-time',
                        title: 'REGISTRATION.OVERVIEW.DATE_AND_TIME',
                        subTitle: _context24.t4,
                        hasData: _context24.t5
                      };
                      summaryItems = [_context24.t1, _context24.t6];

                      if (userGroupsToUse.length > 0) {
                        summaryItems.push({
                          id: registration.id,
                          href: '/registration/group',
                          title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
                          subTitle: this.getObservationGroupName(registration, userGroupsToUse),
                          hasData: !!registration.request.ObserverGroupID
                        });
                      }

                      _context24.t7 = summaryItems.push;
                      _context24.t8 = summaryItems;
                      _context24.t9 = _toConsumableArray;
                      _context24.next = 29;
                      return this.getGeoHazardItems(registration);

                    case 29:
                      _context24.t10 = _context24.sent;
                      _context24.t11 = (0, _context24.t9)(_context24.t10);

                      _context24.t7.apply.call(_context24.t7, _context24.t8, _context24.t11);

                      _context24.t12 = summaryItems;
                      _context24.next = 35;
                      return this.getRegItem(registration, '/registration/general-comment', 'REGISTRATION.GENERAL_COMMENT.TITLE', registration.request.GeneralObservation ? registration.request.GeneralObservation.ObsComment : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.GeneralObservation);

                    case 35:
                      _context24.t13 = _context24.sent;

                      _context24.t12.push.call(_context24.t12, _context24.t13);

                      return _context24.abrupt("return", summaryItems);

                    case 38:
                    case "end":
                      return _context24.stop();
                  }
                }
              }, _callee24, this);
            }));
          }
        }, {
          key: "getPreviousAndNext",
          value: function getPreviousAndNext(registration, url) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
              var summaryItems, currentItem, result, index, nextIndex;
              return regeneratorRuntime.wrap(function _callee25$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      _context25.next = 2;
                      return this.getSummaryItems(registration);

                    case 2:
                      summaryItems = _context25.sent;
                      currentItem = summaryItems.find(function (x) {
                        return url.indexOf(x.href) >= 0;
                      });
                      result = {
                        previous: undefined,
                        next: undefined
                      };

                      if (currentItem) {
                        index = summaryItems.indexOf(currentItem);

                        if (index > 0) {
                          result.previous = summaryItems[index - 1];
                        }

                        nextIndex = index + 1;

                        if (nextIndex < summaryItems.length) {
                          result.next = summaryItems[nextIndex];
                        }
                      }

                      return _context25.abrupt("return", result);

                    case 7:
                    case "end":
                      return _context25.stop();
                  }
                }
              }, _callee25, this);
            }));
          }
        }, {
          key: "navigateTo",
          value: function navigateTo(registration, summaryItem) {
            var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'forward';
            var url = "".concat(summaryItem.href, "/").concat(registration.id);
            return direction === 'forward' ? this.navController.navigateForward(url) : this.navController.navigateBack(url);
          }
        }, {
          key: "navigateForward",
          value: function navigateForward(registration, url) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
              var prevAndNext;
              return regeneratorRuntime.wrap(function _callee26$(_context26) {
                while (1) {
                  switch (_context26.prev = _context26.next) {
                    case 0:
                      _context26.next = 2;
                      return this.getPreviousAndNext(registration, url);

                    case 2:
                      prevAndNext = _context26.sent;

                      if (!prevAndNext.next) {
                        _context26.next = 7;
                        break;
                      }

                      return _context26.abrupt("return", this.navigateTo(registration, prevAndNext.next, 'forward'));

                    case 7:
                      return _context26.abrupt("return", this.navController.navigateRoot("/registration/edit/".concat(registration.id)));

                    case 8:
                    case "end":
                      return _context26.stop();
                  }
                }
              }, _callee26, this);
            }));
          }
        }, {
          key: "getObservationGroupName",
          value: function getObservationGroupName(registration, userGroups) {
            if (registration && registration.request.ObserverGroupID && userGroups) {
              var selectedGroup = userGroups.find(function (x) {
                return x.Id === registration.request.ObserverGroupID;
              });

              if (selectedGroup) {
                return selectedGroup.Name;
              }
            }

            return '';
          }
        }, {
          key: "getGeoHazardItems",
          value: function getGeoHazardItems(registration) {
            switch (registration.geoHazard) {
              case _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_5__.GeoHazard.Water:
                return this.getWaterItems(registration);

              case _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_5__.GeoHazard.Ice:
                return this.getIceItems(registration);

              case _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_5__.GeoHazard.Soil:
                return this.getDirtItems(registration);

              case _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_5__.GeoHazard.Snow:
                return this.getSnowItems(registration);
            }
          }
        }, {
          key: "getWaterItems",
          value: function getWaterItems(registration) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
              return regeneratorRuntime.wrap(function _callee27$(_context27) {
                while (1) {
                  switch (_context27.prev = _context27.next) {
                    case 0:
                      _context27.next = 2;
                      return this.getRegItem(registration, '/registration/water/water-level', 'REGISTRATION.WATER.WATER_LEVEL.TITLE', registration.request.WaterLevel2 ? registration.request.WaterLevel2.Comment : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.WaterLevel2);

                    case 2:
                      _context27.t0 = _context27.sent;
                      _context27.next = 5;
                      return this.getRegItem(registration, '/registration/water/damage', 'REGISTRATION.WATER.DAMAGE.TITLE', '', // this.registration.DamageObs ? this.registration.DamageObs.map((x) => x.Comment).join() : '',
                      src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DamageObs);

                    case 5:
                      _context27.t1 = _context27.sent;
                      return _context27.abrupt("return", [_context27.t0, _context27.t1]);

                    case 7:
                    case "end":
                      return _context27.stop();
                  }
                }
              }, _callee27, this);
            }));
          }
        }, {
          key: "getRegItem",
          value: function getRegItem(registration, href, title, subTitle, registrationTid) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee28() {
              return regeneratorRuntime.wrap(function _callee28$(_context28) {
                while (1) {
                  switch (_context28.prev = _context28.next) {
                    case 0:
                      _context28.t0 = registration.id;
                      _context28.t1 = href;
                      _context28.t2 = title;
                      _context28.t3 = subTitle;
                      _context28.next = 6;
                      return this.registrationService.hasAnyDataToShowInRegistrationTypes(registration, registrationTid).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise();

                    case 6:
                      _context28.t4 = _context28.sent;
                      _context28.next = 9;
                      return this.registrationService.getAllAttachmentsForRegistrationTid$(registration.id, registrationTid).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise();

                    case 9:
                      _context28.t5 = _context28.sent;
                      return _context28.abrupt("return", {
                        id: _context28.t0,
                        href: _context28.t1,
                        title: _context28.t2,
                        subTitle: _context28.t3,
                        hasData: _context28.t4,
                        attachments: _context28.t5
                      });

                    case 11:
                    case "end":
                      return _context28.stop();
                  }
                }
              }, _callee28, this);
            }));
          }
        }, {
          key: "getDirtItems",
          value: function getDirtItems(registration) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
              return regeneratorRuntime.wrap(function _callee29$(_context29) {
                while (1) {
                  switch (_context29.prev = _context29.next) {
                    case 0:
                      _context29.next = 2;
                      return this.getRegItem(registration, '/registration/danger-obs', 'REGISTRATION.DANGER_OBS.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DangerObs);

                    case 2:
                      _context29.t0 = _context29.sent;
                      _context29.next = 5;
                      return this.getRegItem(registration, '/registration/dirt/landslide-obs', 'REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE', registration.request.LandSlideObs ? registration.request.LandSlideObs.Comment : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.LandSlideObs);

                    case 5:
                      _context29.t1 = _context29.sent;
                      return _context29.abrupt("return", [_context29.t0, _context29.t1]);

                    case 7:
                    case "end":
                      return _context29.stop();
                  }
                }
              }, _callee29, this);
            }));
          }
        }, {
          key: "getIceItems",
          value: function getIceItems(registration) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
              return regeneratorRuntime.wrap(function _callee30$(_context30) {
                while (1) {
                  switch (_context30.prev = _context30.next) {
                    case 0:
                      _context30.next = 2;
                      return this.getRegItem(registration, '/registration/ice/ice-cover', 'REGISTRATION.ICE.ICE_COVER.TITLE', registration.request.IceCoverObs ? registration.request.IceCoverObs.Comment : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.IceCoverObs);

                    case 2:
                      _context30.t0 = _context30.sent;
                      _context30.next = 5;
                      return this.getRegItem(registration, '/registration/ice/ice-thickness', 'REGISTRATION.ICE.ICE_THICKNESS.TITLE', registration.request.IceThickness ? registration.request.IceThickness.Comment : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.IceThickness);

                    case 5:
                      _context30.t1 = _context30.sent;
                      _context30.next = 8;
                      return this.getRegItem(registration, '/registration/danger-obs', 'REGISTRATION.DANGER_OBS.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DangerObs);

                    case 8:
                      _context30.t2 = _context30.sent;
                      _context30.next = 11;
                      return this.getRegItem(registration, '/registration/incident', 'REGISTRATION.INCIDENT.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.Incident);

                    case 11:
                      _context30.t3 = _context30.sent;
                      return _context30.abrupt("return", [_context30.t0, _context30.t1, _context30.t2, _context30.t3]);

                    case 13:
                    case "end":
                      return _context30.stop();
                  }
                }
              }, _callee30, this);
            }));
          }
        }, {
          key: "getSnowItems",
          value: function getSnowItems(registration) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
              return regeneratorRuntime.wrap(function _callee31$(_context31) {
                while (1) {
                  switch (_context31.prev = _context31.next) {
                    case 0:
                      _context31.next = 2;
                      return this.getRegItem(registration, '/registration/danger-obs', 'REGISTRATION.DANGER_OBS.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DangerObs);

                    case 2:
                      _context31.t0 = _context31.sent;
                      _context31.next = 5;
                      return this.getRegItem(registration, '/registration/snow/avalanche-obs', 'REGISTRATION.SNOW.AVALANCHE_OBS.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.AvalancheObs);

                    case 5:
                      _context31.t1 = _context31.sent;
                      _context31.next = 8;
                      return this.getRegItem(registration, '/registration/snow/avalanche-activity', 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.AvalancheActivityObs2);

                    case 8:
                      _context31.t2 = _context31.sent;
                      _context31.next = 11;
                      return this.getRegItem(registration, '/registration/snow/weather', 'REGISTRATION.SNOW.WEATHER.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.WeatherObservation);

                    case 11:
                      _context31.t3 = _context31.sent;
                      _context31.next = 14;
                      return this.getRegItem(registration, '/registration/snow/snow-surface', 'REGISTRATION.SNOW.SNOW_SURFACE.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowSurfaceObservation);

                    case 14:
                      _context31.t4 = _context31.sent;
                      _context31.next = 17;
                      return this.getRegItem(registration, '/registration/snow/compression-test', 'REGISTRATION.SNOW.COMPRESSION_TEST.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.CompressionTest);

                    case 17:
                      _context31.t5 = _context31.sent;
                      _context31.t6 = registration.id;
                      _context31.next = 21;
                      return this.registrationService.hasAnyDataToShowInRegistrationTypes(registration, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowProfile2).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise();

                    case 21:
                      _context31.t7 = _context31.sent;

                      if (_context31.t7) {
                        _context31.next = 24;
                        break;
                      }

                      _context31.t7 = registration.request.CompressionTest && registration.request.CompressionTest.some(function (x) {
                        return x.IncludeInSnowProfile === true;
                      });

                    case 24:
                      _context31.t8 = _context31.t7;
                      _context31.next = 27;
                      return this.registrationService.getAllAttachmentsForRegistrationTid$(registration.id, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowProfile2).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise();

                    case 27:
                      _context31.t9 = _context31.sent;
                      _context31.t10 = {
                        id: _context31.t6,
                        href: '/registration/snow/snow-profile',
                        title: 'REGISTRATION.SNOW.SNOW_PROFILE.TITLE',
                        subTitle: '',
                        hasData: _context31.t8,
                        attachments: _context31.t9
                      };
                      _context31.next = 31;
                      return this.getRegItem(registration, '/registration/snow/avalanche-problem', 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.AvalancheEvalProblem2);

                    case 31:
                      _context31.t11 = _context31.sent;
                      _context31.next = 34;
                      return this.getRegItem(registration, '/registration/snow/avalanche-evaluation', 'REGISTRATION.SNOW.AVALANCHE_EVALUATION.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.AvalancheEvaluation3);

                    case 34:
                      _context31.t12 = _context31.sent;
                      return _context31.abrupt("return", [_context31.t0, _context31.t1, _context31.t2, _context31.t3, _context31.t4, _context31.t5, _context31.t10, _context31.t11, _context31.t12]);

                    case 36:
                    case "end":
                      return _context31.stop();
                  }
                }
              }, _callee31, this);
            }));
          }
        }]);

        return _SummaryItemService;
      }();

      _SummaryItemService.ɵfac = function SummaryItemService_Factory(t) {
        return new (t || _SummaryItemService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_modules_common_registration_services_registration_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_date_helper_date_helper_service__WEBPACK_IMPORTED_MODULE_0__.DateHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_3__.UserGroupService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.NavController));
      };

      _SummaryItemService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
        token: _SummaryItemService,
        factory: _SummaryItemService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    22623: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SharedComponentsModule": function SharedComponentsModule() {
          return (
            /* binding */
            _SharedComponentsModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../shared/shared.module */
      72271);
      /* harmony import */


      var _components_save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/save-and-go-back-button/save-and-go-back-button.component */
      80403);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./components/kdv-radiobutton-list/kdv-radiobutton-list.component */
      31610);
      /* harmony import */


      var _components_navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./components/navigation-buttons/navigation-buttons.component */
      25023);
      /* harmony import */


      var _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./components/set-location-in-map/set-location-in-map.component */
      5717);
      /* harmony import */


      var _map_map_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../map/map.module */
      14522);
      /* harmony import */


      var _components_base64_image_base64_image_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./components/base64-image/base64-image.component */
      30922);
      /* harmony import */


      var _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./pipes/kdv-description.pipe */
      46862);
      /* harmony import */


      var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./components/add-web-url-item/add-web-url-item.component */
      15248);
      /* harmony import */


      var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */
      14984);
      /* harmony import */


      var _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./components/snow/exposed-height/exposed-height.component */
      55935);
      /* harmony import */


      var _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ./components/snow/valid-exposition/valid-exposition.component */
      70133);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_help_text_help_text_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./components/help-text/help-text.component */
      40241);
      /* harmony import */


      var _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./pages/modal-pages/help-modal/help-modal.module */
      56587);
      /* harmony import */


      var _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ./components/yes-no-select/yes-no-select.component */
      99736);
      /* harmony import */


      var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! ./components/numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! ./pages/modal-pages/numeric-input-modal/numeric-input-modal.module */
      24783);
      /* harmony import */


      var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! ./pipes/meters-to-cm.pipe */
      50795);
      /* harmony import */


      var _components_snow_compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! ./components/snow/compression-test-list/compression-test-list.component */
      52386);
      /* harmony import */


      var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! ./components/kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _components_blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! ./components/blob-image/blob-image.component */
      44037);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _SharedComponentsModule = function _SharedComponentsModule() {
        _classCallCheck(this, _SharedComponentsModule);
      };

      _SharedComponentsModule.ɵfac = function SharedComponentsModule_Factory(t) {
        return new (t || _SharedComponentsModule)();
      };

      _SharedComponentsModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineNgModule"]({
        type: _SharedComponentsModule
      });
      _SharedComponentsModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjector"]({
        imports: [[_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _map_map_module__WEBPACK_IMPORTED_MODULE_7__.MapModule, _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__.HelpModalPageModule, _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__.NumericInputModalPageModule], _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _map_map_module__WEBPACK_IMPORTED_MODULE_7__.MapModule, _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__.HelpModalPageModule, _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__.NumericInputModalPageModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsetNgModuleScope"](_SharedComponentsModule, {
          declarations: [_components_save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_1__.SaveAndGoBackButtonComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_3__.AddPictureItemComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__.TextCommentComponent, _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_4__.KdvRadiobuttonListComponent, _components_navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_5__.NavigationButtonsComponent, _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_6__.SetLocationInMapComponent, _components_base64_image_base64_image_component__WEBPACK_IMPORTED_MODULE_8__.Base64ImageComponent, _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__.KdvDescriptionPipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_20__.MetersToCmPipe, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_10__.AddWebUrlItemComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_11__.ModalSaveOrDeleteButtonsComponent, _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_12__.ExposedHeightComponent, _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_13__.ValidExpositionComponent, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_14__.RegistrationContentWrapperComponent, _components_help_text_help_text_component__WEBPACK_IMPORTED_MODULE_15__.HelpTextComponent, _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_17__.YesNoSelectComponent, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_18__.NumericInputComponent, _components_snow_compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_21__.CompressionTestListComponent, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_22__.KdvSelectComponent, _components_blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_23__.BlobImageComponent],
          imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _map_map_module__WEBPACK_IMPORTED_MODULE_7__.MapModule, _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__.HelpModalPageModule, _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__.NumericInputModalPageModule],
          exports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _map_map_module__WEBPACK_IMPORTED_MODULE_7__.MapModule, _components_save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_1__.SaveAndGoBackButtonComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_3__.AddPictureItemComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__.TextCommentComponent, _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_4__.KdvRadiobuttonListComponent, _components_navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_5__.NavigationButtonsComponent, _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_6__.SetLocationInMapComponent, _components_base64_image_base64_image_component__WEBPACK_IMPORTED_MODULE_8__.Base64ImageComponent, _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__.KdvDescriptionPipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_20__.MetersToCmPipe, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_10__.AddWebUrlItemComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_11__.ModalSaveOrDeleteButtonsComponent, _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_12__.ExposedHeightComponent, _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_13__.ValidExpositionComponent, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_14__.RegistrationContentWrapperComponent, _components_help_text_help_text_component__WEBPACK_IMPORTED_MODULE_15__.HelpTextComponent, _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__.HelpModalPageModule, _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_17__.YesNoSelectComponent, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_18__.NumericInputComponent, _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__.NumericInputModalPageModule, _components_snow_compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_21__.CompressionTestListComponent, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_22__.KdvSelectComponent, _components_blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_23__.BlobImageComponent]
        });
      })();
      /***/

    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRTVCUDhCOztBQUNFQTs7QUFDRUE7O0FBQTBDQTtBQUFBQTs7QUFBQTs7QUFBQSx3Q0FBdUIsQ0FBdkI7QUFBd0IsV0FBeEI7O0FBRXhDQTs7OztBQUNGQTs7QUFDQUE7O0FBQTBDQTtBQUFBQTs7QUFBQTs7QUFBQSx3Q0FBdUIsQ0FBdkI7QUFBd0IsV0FBeEI7O0FBRXhDQTs7OztBQUNGQTs7QUFDQUE7O0FBQTBDQTtBQUFBQTs7QUFBQTs7QUFBQSx3Q0FBdUIsQ0FBdkI7QUFBd0IsV0FBeEI7O0FBRXhDQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFBMENBO0FBQUFBOztBQUFBOztBQUFBLHdDQUF1QixDQUF2QjtBQUF3QixXQUF4Qjs7QUFFeENBOzs7O0FBQ0ZBOztBQUNBQTs7QUFBMENBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBRXhDQTs7OztBQUNGQTs7QUFDQUE7O0FBQTBDQTtBQUFBQTs7QUFBQTs7QUFBQSx3Q0FBdUIsQ0FBdkI7QUFBd0IsV0FBeEI7O0FBRXhDQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFBMENBO0FBQUFBOztBQUFBOztBQUFBLHdDQUF1QixDQUF2QjtBQUF3QixXQUF4Qjs7QUFFeENBOzs7O0FBQ0ZBOztBQUNBQTs7QUFBMENBO0FBQUFBOztBQUFBOztBQUFBLHdDQUF1QixDQUF2QjtBQUF3QixXQUF4Qjs7QUFFeENBOzs7O0FBQ0ZBOztBQUNBQTs7QUFBMENBO0FBQUFBOztBQUFBOztBQUFBLHlDQUF1QixDQUF2QjtBQUF3QixXQUF4Qjs7QUFFeENBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7Ozs7OztBQXhDTUE7O0FBQUFBOztBQUNBQTs7QUFBQUE7O0FBR0FBOztBQUFBQTs7QUFDQUE7O0FBQUFBOztBQUdBQTs7QUFBQUE7O0FBQ0FBOztBQUFBQTs7QUFLQUE7O0FBQUFBOztBQUNBQTs7QUFBQUE7O0FBR0FBOztBQUFBQTs7QUFDQUE7O0FBQUFBOztB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ZjJCLEVBZ0IzQkMsNkdBaEIyQixFQWlCM0JDLG1IQWpCMkIsRUFrQjNCQyxpSkFsQjJCLEVBbUIzQkMseUZBbkIyQixFQW9CM0JoQixpR0FwQjJCLEVBcUIzQmlCLG9HQXJCMkIsRUFzQjNCQyxxR0F0QjJCLEVBdUIzQmpCLDJIQXZCMkIsRUF3QjNCa0IsaUlBeEIyQixFQXlCM0JDLDRGQXpCMkIsRUEwQjNCQyw0RkExQjJCO0FBbURJO0FBekJiOzs7OyIsIm5hbWVzIjpbInN0cmluZ2lmeSIsIl9fd2VicGFja19yZXF1aXJlX18iLCJJc0VtcHR5SGVscGVyIiwib2JqIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwiQXJyYXkiLCJhcnIiLCJzb21lIiwieCIsImlzRW1wdHkiLCJwcm9wcyIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJMb2NhdGlvblNlcnZpY2UiLCJyZWdvYnNBdXRoU2VydmljZSIsImFwaUxvY2F0aW9uU2VydmljZSIsImdlb0hhemFyZCIsImxhdCIsImxuZyIsInJhZGl1cyIsImxvZ2dlZEluVXNlciQiLCJwaXBlIiwibG9nZ2VkSW5Vc2VyIiwiTG9jYXRpb25XaXRoaW5SYWRpdXMiLCJnZW9IYXphcmRUeXBlSWRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJvYnNlcnZlckd1aWQiLCJyZXR1cm5Db3VudCIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsImZhY3RvcnkiLCJwcm92aWRlZEluIiwiVXNlckdyb3VwU2VydmljZSIsInVzZXJTZXR0aW5nU2VydmljZSIsImFjY291bnRBcGlTZXJ2aWNlIiwiZGF0YUxvYWRTZXJ2aWNlIiwiZ2V0TG9nZ2VkSW5Vc2VyQXNQcm9taXNlIiwiaXNMb2dnZWRJbiIsImFwcE1vZGUkIiwiYXBwTW9kZSIsImNoZWNrTGFzdFVwZGF0ZWRBbmRVcGRhdGVEYXRhSWZOZWVkZWQiLCJlbWFpbCIsImRhdGFMb2FkSWQiLCJnZXREYXRhTG9hZElkIiwiZ2V0U3RhdGUiLCJkYXRhTG9hZCIsImxhc3RVcGRhdGVMaW1pdCIsIm1vbWVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fX2RlZmF1bHQiLCJzdWJ0cmFjdCIsImxhc3RVcGRhdGVkIiwiaXNCZWZvcmUiLCJ1cGRhdGVVc2VyR3JvdXBzRm9yVXNlciIsInN0YXJ0TG9hZGluZyIsIkFjY291bnRHZXRPYnNlcnZlckdyb3VwcyIsInJlc3VsdCIsInNhdmVVc2VyR3JvdXBzIiwibG9hZGluZ0NvbXBsZXRlZCIsIm9ic2VydmVyR3JvdXBzIiwidXNlckdyb3VwcyIsIm1hcCIsInZhbCIsImtleSIsIklkIiwidXNlcklkIiwiTmFtZSIsImluc3RhbmNlTmFtZSIsIl9uYW5vc3FsX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJsb2FkSlMiLCJkZWxldGVVc2VyR3JvdXBzTm9Mb25nZXJJblJlc3VsdCIsInVnIiwiaWRzIiwicXVlcnkiLCJ3aGVyZSIsImRiR3JvdXAiLCJpbmRleE9mIiwiZXhlYyIsImdldFVzZXJHcm91cHNGcm9tRGIiLCJQcm9taXNlIiwicmVzb2x2ZSIsImdldFVzZXJHcm91cHNBc09ic2VydmFibGUiLCJ0b1Byb21pc2UiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xM19fIiwiTGVhZmxldENsdXN0ZXJIZWxwZXIiLCJvcHRpb25zIiwiZGVmYXVsdE9wdGlvbnMiLCJzcGlkZXJmeU9uTWF4Wm9vbSIsInNob3dDb3ZlcmFnZU9uSG92ZXIiLCJ6b29tVG9Cb3VuZHNPbkNsaWNrIiwibWF4Q2x1c3RlclJhZGl1cyIsIl9zZXR0aW5nc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiaWNvbkNyZWF0ZUZ1bmN0aW9uIiwiY3JlYXRlQ2x1c3Rlckljb24iLCJsZWFmbGV0X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJjbHVzdGVyIiwiZ2V0QWxsQ2hpbGRNYXJrZXJzIiwic2l6ZSIsImh0bWwiLCJpY29uU2l6ZSIsImljb25BbmNob3IiLCJjbGFzc05hbWUiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMl9fIiwiREVCVUdfVEFHIiwiTUlNRV9UWVBFIiwiQWRkUGljdHVyZUl0ZW1Db21wb25lbnQiLCJ0cmFuc2xhdGVTZXJ2aWNlIiwiY2FtZXJhIiwicGxhdGZvcm0iLCJmaWxlIiwibG9nZ2VyIiwid2ViVmlldyIsInRvYXN0Q29udHJvbGxlciIsImRvbVNhbml0aXplciIsImFjdGlvblNoZWV0Q29udHJvbGxlciIsIm5ld0F0dGFjaG1lbnRTZXJ2aWNlIiwiY2RyIiwiZ2V0QXR0YWNobWVudHMiLCJyZWdpc3RyYXRpb25JZCIsImF0dGFjaG1lbnRzIiwiZmlsdGVyIiwiYSIsIlJlZ2lzdHJhdGlvblRJRCIsInJlZ2lzdHJhdGlvblRpZCIsInR5cGUiLCJhdHRhY2htZW50VHlwZSIsInJlZiIsImdldEJsb2IiLCJpZCIsImJsb2IiLCJlcnIiLCJlcnJvciIsIm5nRGVzdHJveSQiLCJzdWJzY3JpYmUiLCJkZXRlY3RDaGFuZ2VzIiwib25CZWZvcmVBZGQiLCJnZXQiLCJ0cmFuc2xhdGlvbnMiLCJjcmVhdGUiLCJoZWFkZXIiLCJidXR0b25zIiwidGV4dCIsImhhbmRsZXIiLCJnZXRQaWN0dXJlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJQSE9UT0xJQlJBUlkiLCJyb2xlIiwiYWN0aW9uU2hlZXQiLCJwcmVzZW50Iiwic291cmNlVHlwZSIsImlzIiwiYWRkRHVtbXlJbWFnZSIsInF1YWxpdHkiLCJkZXN0aW5hdGlvblR5cGUiLCJEZXN0aW5hdGlvblR5cGUiLCJGSUxFX1VSSSIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJtZWRpYVR5cGUiLCJNZWRpYVR5cGUiLCJQSUNUVVJFIiwidGFyZ2V0SGVpZ2h0IiwidGFyZ2V0V2lkdGgiLCJjb3JyZWN0T3JpZW50YXRpb24iLCJzYXZlVG9QaG90b0FsYnVtIiwiX2lvbmljX25hdGl2ZV9jYW1lcmFfbmd4X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJpbWFnZVVybCIsInZhbGlkYXRlSW1hZ2UiLCJzaG93RXJyb3JUb2FzdCIsImRlYnVnIiwiZ2V0QXJyYXlCdWZmZXIiLCJhcnJheUJ1ZmZlciIsImFkZEltYWdlIiwiQmxvYiIsImxvZyIsIl9zaGFyZWRfc2VydmljZXNfbG9nZ2luZ19sb2dfbGV2ZWxfbW9kZWxfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyIsImZpbGVVcmwiLCJyZXNvbHZlTG9jYWxGaWxlc3lzdGVtVXJsIiwiZW50cnkiLCJpc0ZpbGUiLCJFcnJvciIsInBhdGhTcGxpdHRlZCIsIm5hdGl2ZVVSTCIsInNwbGl0IiwiZmlsZW5hbWUiLCJwb3AiLCJkaXJlY3RvcnkiLCJqb2luIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJzcmMiLCJuYW1lIiwiZW5kc1dpdGgiLCJtZXNzYWdlS2V5IiwidHJhbnNsYXRpb24iLCJtZXNzYWdlIiwibW9kZSIsImR1cmF0aW9uIiwidG9hc3QiLCJfY29yZV9oZWxwZXJzX2RhdGFfdXJsX2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiZHVtbXlJbWFnZSIsImRhdGEiLCJtaW1lVHlwZSIsImFkZEF0dGFjaG1lbnQiLCJpbWFnZSIsInJlbW92ZUF0dGFjaG1lbnQiLCJzcmNfYXBwX2NvcmVfaGVscGVyc19vYnNlcnZhYmxlX2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOV9fIiwic2VsZWN0b3JzIiwiaW5wdXRzIiwidGl0bGUiLCJwaWN0dXJlQ29tbWVudFRleHQiLCJwaWN0dXJlQ29tbWVudFBsYWNlaG9sZGVyIiwiaWNvbiIsInNob3dJY29uIiwiaWNvbkNvbG9yIiwiZmVhdHVyZXMiLCJkZWNscyIsInZhcnMiLCJjb25zdHMiLCJ0ZW1wbGF0ZSIsImN0eCIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIkFkZFdlYlVybEl0ZW1Db21wb25lbnQiLCJtb2RhbENvbnRyb2xsZXIiLCJ6b25lIiwiaW5kZXgiLCJ3ZWJ1cmwiLCJ3ZWJ1cmxzIiwiY29tcG9uZW50IiwiX3BhZ2VzX2FkZF93ZWJfdXJsX21vZGFsX2FkZF93ZWJfdXJsX21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImNvbXBvbmVudFByb3BzIiwibW9kYWwiLCJvbkRpZERpc21pc3MiLCJyZW1vdmVBdEluZGV4Iiwic2V0V2ViVXJsIiwiYWRkV2ViVXJsIiwidXJsIiwicnVuIiwid2VidXJsc0NoYW5nZSIsImVtaXQiLCJwdXNoIiwic3BsaWNlIiwib3V0cHV0cyIsIkJhc2U2NEltYWdlQ29tcG9uZW50Iiwic2FuaXRpemVyIiwiYXBwbHlJbWFnZVVybFRhZyIsImJhc2U2NGVuY29kZWRJbWFnZSIsInN0YXJ0c1dpdGgiLCJpbWdTcmMiLCJieXBhc3NTZWN1cml0eVRydXN0VXJsIiwiZGF0YVVybFRhZyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIkJsb2JJbWFnZUNvbXBvbmVudCIsImJsb2JVcmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJpbWdCbG9iIiwicmV2b2tlT2JqZWN0VVJMIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiSGVscFRleHRDb21wb25lbnQiLCJoZWxwVGV4dFNlcnZpY2UiLCJuZ1pvbmUiLCJ1c2VyU2V0dGluZyQiLCJ1c2VyU2V0dGluZyIsImdldEhlbHBUZXh0QnlLZXkiLCJsYW5ndWFnZSIsImhlbHBUZXh0IiwiaXNWaXNpYmxlIiwiX3BhZ2VzX21vZGFsX3BhZ2VzX2hlbHBfbW9kYWxfaGVscF9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJUZXh0IiwiS2R2UmFkaW9idXR0b25MaXN0Q29tcG9uZW50Iiwia2R2U2VydmljZSIsImtkdmVsZW1lbnRzJCIsImdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUiLCJrZHZLZXkiLCJ2YWx1ZSIsInZhbHVlQ2hhbmdlIiwiaXRlbSIsInNob3daZXJvVmFsdWVzIiwidXNlRGVzY3JpcHRpb24iLCJuZ0NvbnRlbnRTZWxlY3RvcnMiLCJLZHZTZWxlY3RDb21wb25lbnQiLCJrZHZlbGVtZW50cyIsImVsIiwiRGVzY3JpcHRpb24iLCJkaXNhYmxlZCIsImdldEljb25GdW5jIiwic3Vic2NyaXB0aW9uIiwidW5zdWJzY3JpYmUiLCJsYWJlbENvbG9yIiwic2hvd1Jlc2V0QnV0dG9uIiwiTW9kYWxTYXZlT3JEZWxldGVCdXR0b25zQ29tcG9uZW50IiwiYWxlcnRDb250cm9sbGVyIiwic2F2ZUNsaWNrZWQiLCJ0b1RyYW5zbGF0ZSIsImFsZXJ0VGl0bGUiLCJhbGVydE1lc3NhZ2UiLCJkZWxldGVDbGlja2VkIiwiYWxlcnQiLCJzYXZlVGV4dCIsInNhdmVEaXNhYmxlZCIsInNob3dEZWxldGUiLCJOYXZpZ2F0aW9uQnV0dG9uc0NvbXBvbmVudCIsInN1bW1hcnlJdGVtU2VydmljZSIsInJvdXRlciIsImN1cnJlbnRVcmwiLCJnZXRQcmV2aW91c0FuZE5leHQiLCJyZWdpc3RyYXRpb24iLCJwcmV2QW5kTmV4dCIsIm5leHQiLCJwcmV2aW91cyIsIm5hdmlnYXRlVG8iLCJOdW1lcmljSW5wdXRDb21wb25lbnQiLCJjb252ZXJ0ZWQiLCJjb252ZXJ0IiwidG9Mb2NhbGVTdHJpbmciLCJpc09wZW4iLCJyZWFkb25seSIsIl9wYWdlc19tb2RhbF9wYWdlc19udW1lcmljX2lucHV0X21vZGFsX251bWVyaWNfaW5wdXRfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiY3NzQ2xhc3MiLCJkZWNpbWFsUGxhY2VzIiwibWluIiwibWF4Iiwic3VmZml4IiwiZGVjaW1hbFNlcGFyYXRvciIsIm9rIiwiZGlyZWN0aW9uIiwiY29udmVydFJhdGlvIiwicGxhY2Vob2xkZXIiLCJfcjIiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJjdHhfcjAiLCJSZWdpc3RyYXRpb25Db250ZW50V3JhcHBlckNvbXBvbmVudCIsInJlc2V0IiwiU2F2ZUFuZEdvQmFja0J1dHRvbkNvbXBvbmVudCIsIm5hdkNvbnRvbGxlciIsImNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UiLCJjaGFuZ2VzIiwiaXNGaXJzdENoYW5nZSIsInNldEhhc0RhdGEiLCJoYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyIsImhhc0RhdGEiLCJtYXJrRm9yQ2hlY2siLCJuYXZpZ2F0ZUJhY2siLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJfcjYiLCJfcjQiLCJjdHhfcjUiLCJkZWZhdWx0SWNvbiIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJwb3B1cEFuY2hvciIsInRvb2x0aXBBbmNob3IiLCJzaGFkb3dTaXplIiwicHJldmlvdXNVc2VkUGxhY2VJY29uIiwiU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCIsIm1hcFNlcnZpY2UiLCJoZWxwZXJTZXJ2aWNlIiwibWFwU2VhcmNoU2VydmljZSIsImdlb1Bvc2l0aW9uU2VydmljZSIsImxvY2F0aW9uU2VydmljZSIsInJ4anNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzEwX18iLCJfbWFwX2hlbHBlcnNfbGVhZmxldF9jbHVzZXJfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJhbGxvd0VkaXRMb2NhdGlvbk5hbWUiLCJzZWxlY3RlZExvY2F0aW9uIiwibG9jYXRpb25NYXJrZXJJY29uIiwibG9jYXRpb25NYXJrZXJJY29uVXJsIiwiZm9sbG93TW9kZSIsImxvY2F0aW9uTWFya2VyIiwiZnJvbU1hcmtlciIsImdldExhdExuZyIsIm1hcFZpZXckIiwibGFzdFZpZXciLCJjZW50ZXIiLCJ1cGRhdGVNYXBWaWV3SW5mbyIsImNvbXBsZXRlIiwibWFwVmlldyIsImJvdW5kcyIsImdldExvY2F0aW9uV2l0aGluUmFkaXVzT2JzZXJ2YWJsZSIsIk1hdGgiLCJyb3VuZCIsImdldE5vcnRoV2VzdCIsImRpc3RhbmNlVG8iLCJnZXRTb3V0aEVhc3QiLCJsb2MiLCJleGlzdGluZyIsImxvY2F0aW9ucyIsImxvY2F0aW9uIiwibWFya2VyIiwiTGF0TG5nT2JqZWN0IiwiTGF0aXR1ZGUiLCJMb25naXR1ZGUiLCJhZGRUbyIsImxvY2F0aW9uR3JvdXAiLCJvbiIsInNldFRvUHJldm91c2x5VXNlZExvY2F0aW9uIiwibSIsInNldFpJbmRleE9mZnNldCIsImlzTG9hZGluZyIsIm1vdmVMb2NhdGlvbk1hcmtlclRvQ2VudGVyIiwic2hvd1ByZXZpb3VzVXNlZExvY2F0aW9ucyIsImdldExvY2F0aW9uc09ic2VydmFibGUiLCJmb3JFYWNoIiwiYWRkTG9jYXRpb25JZk5vdEV4aXN0cyIsImZvbGxvd01vZGUkIiwidXNlcnBvc2l0aW9uIiwic2V0TG9jYXRpb25NYXJrZXJMYXRMbmciLCJjb29yZHMiLCJtYXBTZWFyY2hDbGljayQiLCJsYXRMbmciLCJsYXRsbmciLCJjdXJyZW50UG9zaXRpb24kIiwicG9zIiwicG9zaXRpb25DaGFuZ2UiLCJzZXRWaWV3IiwibWFwUmVhZHkiLCJ1cGRhdGVQYXRoQW5kRGlzdGFuY2UiLCJzZXRMYXRMbmciLCJwYW5UbyIsInNob3dEZXRhaWxzIiwiZ2V0Q2VudGVyIiwiZ2V0Vmlld0luZm8iLCJ6b29tIiwidmlld0luZm8iLCJfIiwicG9zaXRpb24iLCJmcm9tIiwibG9jYXRpb25NYXJrZXJMYXRMbmciLCJwYXRoIiwicGF0aExpbmUiLCJjb2xvciIsIndlaWdodCIsIm9wYWNpdHkiLCJkYXNoQXJyYXkiLCJzaG93UG9seWxpbmUiLCJzZXRMYXRMbmdzIiwiZXF1YWxzIiwic2V0T3BhY2l0eSIsInNldFN0eWxlIiwiZGlzdGFuY2VUb09ic2VydmF0aW9uVGV4dCIsImdldERpc3RhbmNlVGV4dCIsImFkbWluTmFtZSIsIm9ic0xvY2F0aW9uIiwiZ2V0TG9jYXRpb24iLCJsb2NhdGlvblNldCIsIlVuY2VydGFpbnR5IiwiVVRNU291cmNlVElEIiwiX3BhZ2VzX29ic19sb2NhdGlvbl91dG1fc291cmNlX2VudW1fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsImVkaXRMb2NhdGlvbk5hbWUiLCJsb2NhdGlvbk5hbWUiLCJPYnNMb2NhdGlvbklEIiwiTG9jYXRpb25OYW1lIiwic3Vic3RyaW5nIiwiTG9jYXRpb25EZXNjcmlwdGlvbiIsImdldExvY2F0aW9uTmFtZSIsImFjY3VyYWN5IiwiY2FuRWRpdExvY2F0aW9uTmFtZSIsInNldFRpbWVvdXQiLCJlZGl0TG9jYXRpb25OYW1lSW5wdXQiLCJzZXRGb2N1cyIsIl9hIiwidG9TdHJpbmciLCJ2aWV3UXVlcnkiLCJDb21wcmVzc2lvblRlc3RMaXN0Q29tcG9uZW50IiwiYWRkIiwiX2NvbXByZXNzaW9uX3Rlc3RfbW9kYWxfY29tcHJlc3Npb25fdGVzdF9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJjb21wcmVzc2lvblRlc3QiLCJ0ZXN0cyIsImluY2x1ZGVJblNub3dQcm9maWxlQXNEZWZhdWx0IiwicmVtb3ZlVGVzdCIsInRlc3RzQ2hhbmdlIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fIiwiQ29tcHJlc3Npb25UZXN0TW9kYWxQYWdlIiwiY2xvbmUiLCJJbmNsdWRlSW5Tbm93UHJvZmlsZSIsIl9jb3JlX2hlbHBlcnNfaXNfZW1wdHlfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJpIiwidGFwc0FycmF5IiwiY2hlY2tJZkluY2x1ZGVJblNub3dQcm9maWxlU2hvdWxkQmVEaXNhYmxlZCIsImlzTEJUIiwiaW5jbHVkZUluU25vd1Byb2ZpbGVEaXNhYmxlZCIsImlzQ1ROb3JFQ1RYIiwiaXNDVFZvckVDVFYiLCJQcm9wYWdhdGlvblRJRCIsImRpc21pc3MiLCJjdHhfcjEiLCJFeHBvc2VkSGVpZ2h0Q29tcG9uZW50IiwiaGVpZ2h0QXJyYXkiLCJleHBvc2VkSGlnaHQxIiwic2V0RXhwb3NlZEhlaWdodHMiLCJleHBvc2VkSGVpZ2h0Q29tYm9USUQiLCJleHBvc2VkSGVpZ2h0VG9wIiwiZXhwb3NlZEhlaWdodE1pZGRsZSIsImV4cG9zZWRIZWlnaHRCb3R0b20iLCJhcHBseUNoYW5nZXMiLCJ0b3AiLCJtaWRkbGUiLCJib3R0b20iLCJ1cGRhdGVFeHBvc2VkSGVpZ2h0Q29tYm9USUQiLCJzaG9sZFVzZUV4cG9zZWRIaWdodDIiLCJleHBvc2VkSGlnaHQyIiwiZXhwb3NlZEhlaWdodENvbWJvVElEQ2hhbmdlIiwiZXhwb3NlZEhpZ2h0MUNoYW5nZSIsImV4cG9zZWRIaWdodDJDaGFuZ2UiLCJFTVBUWV9FWFBPU0lUSU9OIiwiQUxMX0VYUE9TSVRJT04iLCJWYWxpZEV4cG9zaXRpb25Db21wb25lbnQiLCJ2YWxpZEV4cG9zaXRpb24iLCJ2YWxpZEV4cG9zaXRpb25Db3B5IiwiZXhpc3RpbmdWYWx1ZSIsInN1YnN0ciIsIm5ld1ZhbHVlIiwidmFsaWRFeHBvc2l0aW9uQ2hhbmdlIiwiVGV4dENvbW1lbnRDb21wb25lbnQiLCJ0cmltIiwicm93cyIsIlllc05vU2VsZWN0Q29tcG9uZW50IiwiQWRkV2ViVXJsTW9kYWxQYWdlIiwidXJsVG9TYXZlIiwiaXNOZXciLCJIZWxwTW9kYWxQYWdlTW9kdWxlIiwiX3NoYXJlZF9zaGFyZWRfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJuZ3hfbWFya2Rvd25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsImRlY2xhcmF0aW9ucyIsIl9oZWxwX21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImltcG9ydHMiLCJIZWxwTW9kYWxQYWdlIiwiTnVtZXJpY0lucHV0TW9kYWxQYWdlTW9kdWxlIiwiX21vZHVsZXNfc2hhcmVkX3NoYXJlZF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9udW1lcmljX2lucHV0X21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIk51bWVyaWNJbnB1dE1vZGFsUGFnZSIsIm51bWJlcnMiLCJ0ZXh0VmFsIiwicmVwbGFjZSIsImRlY2ltYWxTZXAiLCJudW0iLCJwYXJzZUZsb2F0IiwiaXNOYU4iLCJpc05lZ2F0aXZlIiwiZXZlbnQiLCJtYXRjaCIsInB1c2hOdW1iZXIiLCJwdXNoRGVjaW1hbFNlcGFyYXRvciIsImtleUNvZGUiLCJkb25lIiwiY2xlYXIiLCJwb3NpdGl2ZVZhbHVlIiwiX2NvcmVfaGVscGVyc19udW1iZXJfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJnZXREZWNpbWFsU2VwYXJhdG9yRm9yQnJvd3NlciIsIm51bWJlclZhbCIsImlzRGVjaW1hbCIsImdldE51bWJlck9mRGVjaW1hbHMiLCJob3N0QmluZGluZ3MiLCJVdG1Tb3VyY2UiLCJLZHZEZXNjcmlwdGlvblBpcGUiLCJyZXR1cm5EZXNjcmlwdGlvbiIsImtkdmVsZW1lbnQiLCJmaW5kIiwicHVyZSIsIk1ldGVyc1RvQ21QaXBlIiwiU3VtbWFyeUl0ZW1TZXJ2aWNlIiwicmVnaXN0cmF0aW9uU2VydmljZSIsImRhdGVIZWxwZXJTZXJ2aWNlIiwidXNlckdyb3VwU2VydmljZSIsIm5hdkNvbnRyb2xsZXIiLCJnZXRVc2VyR3JvdXBzIiwidXNlckdyb3Vwc1RvVXNlIiwiaHJlZiIsInF1ZXJ5UGFyYW1zIiwic3ViVGl0bGUiLCJyZXF1ZXN0IiwiT2JzTG9jYXRpb24iLCJEdE9ic1RpbWUiLCJmb3JtYXREYXRlU3RyaW5nIiwic3VtbWFyeUl0ZW1zIiwiZ2V0T2JzZXJ2YXRpb25Hcm91cE5hbWUiLCJPYnNlcnZlckdyb3VwSUQiLCJnZXRHZW9IYXphcmRJdGVtcyIsImdldFJlZ0l0ZW0iLCJHZW5lcmFsT2JzZXJ2YXRpb24iLCJPYnNDb21tZW50Iiwic3JjX2FwcF9tb2R1bGVzX2NvbW1vbl9yZWdpc3RyYXRpb25fcmVnaXN0cmF0aW9uX21vZGVsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiZ2V0U3VtbWFyeUl0ZW1zIiwiY3VycmVudEl0ZW0iLCJuZXh0SW5kZXgiLCJzdW1tYXJ5SXRlbSIsIm5hdmlnYXRlRm9yd2FyZCIsIm5hdmlnYXRlUm9vdCIsInNlbGVjdGVkR3JvdXAiLCJfdmFyc29tX3JlZ29ic19jb21tb25fY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fIiwiZ2V0V2F0ZXJJdGVtcyIsImdldEljZUl0ZW1zIiwiZ2V0RGlydEl0ZW1zIiwiZ2V0U25vd0l0ZW1zIiwiV2F0ZXJMZXZlbDIiLCJDb21tZW50IiwiZ2V0QWxsQXR0YWNobWVudHNGb3JSZWdpc3RyYXRpb25UaWQkIiwiTGFuZFNsaWRlT2JzIiwiSWNlQ292ZXJPYnMiLCJJY2VUaGlja25lc3MiLCJDb21wcmVzc2lvblRlc3QiLCJTaGFyZWRDb21wb25lbnRzTW9kdWxlIiwiX3NoYXJlZF9zaGFyZWRfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJfbWFwX21hcF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsIl9wYWdlc19tb2RhbF9wYWdlc19oZWxwX21vZGFsX2hlbHBfbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xNl9fIiwiX3BhZ2VzX21vZGFsX3BhZ2VzX251bWVyaWNfaW5wdXRfbW9kYWxfbnVtZXJpY19pbnB1dF9tb2RhbF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzE5X18iLCJfY29tcG9uZW50c19zYXZlX2FuZF9nb19iYWNrX2J1dHRvbl9zYXZlX2FuZF9nb19iYWNrX2J1dHRvbl9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9jb21wb25lbnRzX2FkZF9waWN0dXJlX2l0ZW1fYWRkX3BpY3R1cmVfaXRlbV9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIl9jb21wb25lbnRzX3RleHRfY29tbWVudF90ZXh0X2NvbW1lbnRfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfY29tcG9uZW50c19rZHZfcmFkaW9idXR0b25fbGlzdF9rZHZfcmFkaW9idXR0b25fbGlzdF9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsIl9jb21wb25lbnRzX25hdmlnYXRpb25fYnV0dG9uc19uYXZpZ2F0aW9uX2J1dHRvbnNfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJfY29tcG9uZW50c19zZXRfbG9jYXRpb25faW5fbWFwX3NldF9sb2NhdGlvbl9pbl9tYXBfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJfY29tcG9uZW50c19iYXNlNjRfaW1hZ2VfYmFzZTY0X2ltYWdlX2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOF9fIiwiX3BpcGVzX2tkdl9kZXNjcmlwdGlvbl9waXBlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJfcGlwZXNfbWV0ZXJzX3RvX2NtX3BpcGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzIwX18iLCJfY29tcG9uZW50c19hZGRfd2ViX3VybF9pdGVtX2FkZF93ZWJfdXJsX2l0ZW1fY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMF9fIiwiX2NvbXBvbmVudHNfbW9kYWxfc2F2ZV9vcl9kZWxldGVfYnV0dG9uc19tb2RhbF9zYXZlX29yX2RlbGV0ZV9idXR0b25zX2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTFfXyIsIl9jb21wb25lbnRzX3Nub3dfZXhwb3NlZF9oZWlnaHRfZXhwb3NlZF9oZWlnaHRfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMl9fIiwiX2NvbXBvbmVudHNfc25vd192YWxpZF9leHBvc2l0aW9uX3ZhbGlkX2V4cG9zaXRpb25fY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xM19fIiwiX2NvbXBvbmVudHNfcmVnaXN0cmF0aW9uX2NvbnRlbnRfd3JhcHBlcl9yZWdpc3RyYXRpb25fY29udGVudF93cmFwcGVyX2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTRfXyIsIl9jb21wb25lbnRzX2hlbHBfdGV4dF9oZWxwX3RleHRfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xNV9fIiwiX2NvbXBvbmVudHNfeWVzX25vX3NlbGVjdF95ZXNfbm9fc2VsZWN0X2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTdfXyIsIl9jb21wb25lbnRzX251bWVyaWNfaW5wdXRfbnVtZXJpY19pbnB1dF9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzE4X18iLCJfY29tcG9uZW50c19zbm93X2NvbXByZXNzaW9uX3Rlc3RfbGlzdF9jb21wcmVzc2lvbl90ZXN0X2xpc3RfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yMV9fIiwiX2NvbXBvbmVudHNfa2R2X3NlbGVjdF9rZHZfc2VsZWN0X2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMjJfXyIsIl9jb21wb25lbnRzX2Jsb2JfaW1hZ2VfYmxvYl9pbWFnZV9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzIzX18iLCJleHBvcnRzIl0sInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvY29yZS9zZXJ2aWNlcy9sb2NhdGlvbi9sb2NhdGlvbi5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL2NvcmUvc2VydmljZXMvdXNlci1ncm91cC91c2VyLWdyb3VwLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9tYXAvaGVscGVycy9sZWFmbGV0LWNsdXNlci5oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9hZGQtcGljdHVyZS1pdGVtL2FkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9hZGQtcGljdHVyZS1pdGVtL2FkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvYWRkLXdlYi11cmwtaXRlbS9hZGQtd2ViLXVybC1pdGVtLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvYWRkLXdlYi11cmwtaXRlbS9hZGQtd2ViLXVybC1pdGVtLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2Jhc2U2NC1pbWFnZS9iYXNlNjQtaW1hZ2UuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvYmFzZTY0LWltYWdlL2Jhc2U2NC1pbWFnZS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2Jsb2ItaW1hZ2UvYmxvYi1pbWFnZS5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9ibG9iLWltYWdlL2Jsb2ItaW1hZ2UuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9oZWxwLXRleHQvaGVscC10ZXh0LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvaGVscC10ZXh0L2hlbHAtdGV4dC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9rZHYtcmFkaW9idXR0b24tbGlzdC9rZHYtcmFkaW9idXR0b24tbGlzdC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2tkdi1yYWRpb2J1dHRvbi1saXN0L2tkdi1yYWRpb2J1dHRvbi1saXN0LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2tkdi1zZWxlY3Qva2R2LXNlbGVjdC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9rZHYtc2VsZWN0L2tkdi1zZWxlY3QuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zL21vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zL21vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvbmF2aWdhdGlvbi1idXR0b25zL25hdmlnYXRpb24tYnV0dG9ucy5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL25hdmlnYXRpb24tYnV0dG9ucy9uYXZpZ2F0aW9uLWJ1dHRvbnMuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvbnVtZXJpYy1pbnB1dC9udW1lcmljLWlucHV0LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvbnVtZXJpYy1pbnB1dC9udW1lcmljLWlucHV0LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIvcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlci5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIvcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlci5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi9zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3NhdmUtYW5kLWdvLWJhY2stYnV0dG9uL3NhdmUtYW5kLWdvLWJhY2stYnV0dG9uLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3NldC1sb2NhdGlvbi1pbi1tYXAvc2V0LWxvY2F0aW9uLWluLW1hcC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3NldC1sb2NhdGlvbi1pbi1tYXAvc2V0LWxvY2F0aW9uLWluLW1hcC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L2NvbXByZXNzaW9uLXRlc3QtbGlzdC9jb21wcmVzc2lvbi10ZXN0LWxpc3QuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L2NvbXByZXNzaW9uLXRlc3QtbGlzdC9jb21wcmVzc2lvbi10ZXN0LWxpc3QuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9jb21wcmVzc2lvbi10ZXN0LWxpc3QvY29tcHJlc3Npb24tdGVzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LW1vZGFsLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvY29tcHJlc3Npb24tdGVzdC1saXN0L2NvbXByZXNzaW9uLXRlc3QtbW9kYWwvY29tcHJlc3Npb24tdGVzdC1tb2RhbC5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9leHBvc2VkLWhlaWdodC9leHBvc2VkLWhlaWdodC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvZXhwb3NlZC1oZWlnaHQvZXhwb3NlZC1oZWlnaHQuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy92YWxpZC1leHBvc2l0aW9uL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3ZhbGlkLWV4cG9zaXRpb24vdmFsaWQtZXhwb3NpdGlvbi5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy90ZXh0LWNvbW1lbnQvdGV4dC1jb21tZW50LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3RleHQtY29tbWVudC90ZXh0LWNvbW1lbnQuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy95ZXMtbm8tc2VsZWN0L3llcy1uby1zZWxlY3QuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMveWVzLW5vLXNlbGVjdC95ZXMtbm8tc2VsZWN0LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2FkZC13ZWItdXJsLW1vZGFsL2FkZC13ZWItdXJsLW1vZGFsLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYWRkLXdlYi11cmwtbW9kYWwvYWRkLXdlYi11cmwtbW9kYWwucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL21vZGFsLXBhZ2VzL2hlbHAtbW9kYWwvaGVscC1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvbW9kYWwtcGFnZXMvaGVscC1tb2RhbC9oZWxwLW1vZGFsLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvbW9kYWwtcGFnZXMvaGVscC1tb2RhbC9oZWxwLW1vZGFsLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9tb2RhbC1wYWdlcy9udW1lcmljLWlucHV0LW1vZGFsL251bWVyaWMtaW5wdXQtbW9kYWwubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL21vZGFsLXBhZ2VzL251bWVyaWMtaW5wdXQtbW9kYWwvbnVtZXJpYy1pbnB1dC1tb2RhbC5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvbW9kYWwtcGFnZXMvbnVtZXJpYy1pbnB1dC1tb2RhbC9udW1lcmljLWlucHV0LW1vZGFsLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvb2JzLWxvY2F0aW9uL3V0bS1zb3VyY2UuZW51bS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9waXBlcy9rZHYtZGVzY3JpcHRpb24ucGlwZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9waXBlcy9tZXRlcnMtdG8tY20ucGlwZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9zZXJ2aWNlcy9zdW1tYXJ5LWl0ZW0uc2VydmljZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xyXG5leHBvcnQgY2xhc3MgSXNFbXB0eUhlbHBlciB7XHJcbiAgc3RhdGljIGlzRW1wdHkob2JqOiBPYmplY3QgfCBBcnJheTxPYmplY3QgfCBBcnJheTxPYmplY3Q+Pikge1xyXG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGNvbnN0IGFyciA9IDxBcnJheTxPYmplY3QgfCBBcnJheTxPYmplY3Q+Pj5vYmo7XHJcbiAgICAgIHJldHVybiBhcnIubGVuZ3RoID09PSAwIHx8ICFhcnIuc29tZSgoeCkgPT4gIUlzRW1wdHlIZWxwZXIuaXNFbXB0eSh4KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICAgIGlmIChwcm9wcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5naWZ5KG9iaikgPT09ICd7fSc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICFwcm9wcy5zb21lKCh4KSA9PiAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KG9ialt4XSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTG9jYXRpb25TZXJ2aWNlIGFzIFJlZ29ic0FwaUxvY2F0aW9uU2VydmljZSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFJlZ29ic0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9jYXRpb25TZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnb2JzQXV0aFNlcnZpY2U6IFJlZ29ic0F1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhcGlMb2NhdGlvblNlcnZpY2U6IFJlZ29ic0FwaUxvY2F0aW9uU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgZ2V0TG9jYXRpb25XaXRoaW5SYWRpdXNPYnNlcnZhYmxlKFxyXG4gICAgZ2VvSGF6YXJkOiBHZW9IYXphcmQsXHJcbiAgICBsYXQ6IG51bWJlcixcclxuICAgIGxuZzogbnVtYmVyLFxyXG4gICAgcmFkaXVzOiBudW1iZXJcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ2dlZEluVXNlciQucGlwZShcclxuICAgICAgc3dpdGNoTWFwKChsb2dnZWRJblVzZXIpID0+XHJcbiAgICAgICAgdGhpcy5hcGlMb2NhdGlvblNlcnZpY2UuTG9jYXRpb25XaXRoaW5SYWRpdXMoe1xyXG4gICAgICAgICAgZ2VvSGF6YXJkVHlwZUlkczogW2dlb0hhemFyZF0sXHJcbiAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICBsYXRpdHVkZTogbGF0LFxyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsbmcsXHJcbiAgICAgICAgICBvYnNlcnZlckd1aWQ6IG51bGwsIC8vIGxvZ2dlZEluVXNlci5pc0xvZ2dlZEluID8gbG9nZ2VkSW5Vc2VyLnVzZXIuR3VpZCA6IG51bGwsIC8vIFRPRE86IEZpeCBhcGkgdG8gdXNlIGFjY2VzcyB0b2tlbiBpZiBwcm92aWRlZFxyXG4gICAgICAgICAgcmV0dXJuQ291bnQ6IDEwMFxyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmFub1NxbCB9IGZyb20gJy4uLy4uLy4uLy4uL25hbm9zcWwnO1xyXG5pbXBvcnQgeyBBcHBNb2RlIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRhTG9hZFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2RhdGEtbG9hZC9zZXJ2aWNlcy9kYXRhLWxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgT2JzZXJ2ZXJHcm91cER0byxcclxuICBBY2NvdW50U2VydmljZSBhcyBSZWdvYnNBcGlBY2NvdW50U2VydmljZVxyXG59IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgeyBmcm9tLCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBsYXN0VmFsdWVGcm9tLCBmaXJzdFZhbHVlRnJvbSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFJlZ29ic0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBuU1FMIH0gZnJvbSAnQG5hbm8tc3FsL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckdyb3VwU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ29ic0F1dGhTZXJ2aWNlOiBSZWdvYnNBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFjY291bnRBcGlTZXJ2aWNlOiBSZWdvYnNBcGlBY2NvdW50U2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YUxvYWRTZXJ2aWNlOiBEYXRhTG9hZFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZVVzZXJHcm91cHMoKSB7XHJcbiAgICBjb25zdCBsb2dnZWRJblVzZXIgPSBhd2FpdCB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmdldExvZ2dlZEluVXNlckFzUHJvbWlzZSgpO1xyXG4gICAgaWYgKGxvZ2dlZEluVXNlci5pc0xvZ2dlZEluKSB7XHJcbiAgICAgIGNvbnN0IGFwcE1vZGUgPSBhd2FpdCBmaXJzdFZhbHVlRnJvbSh0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5hcHBNb2RlJCk7XHJcbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tMYXN0VXBkYXRlZEFuZFVwZGF0ZURhdGFJZk5lZWRlZChcclxuICAgICAgICBhcHBNb2RlLFxyXG4gICAgICAgIGxvZ2dlZEluVXNlci5lbWFpbFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBjaGVja0xhc3RVcGRhdGVkQW5kVXBkYXRlRGF0YUlmTmVlZGVkKFxyXG4gICAgYXBwTW9kZTogQXBwTW9kZSxcclxuICAgIGVtYWlsOiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IGRhdGFMb2FkSWQgPSB0aGlzLmdldERhdGFMb2FkSWQoYXBwTW9kZSwgZW1haWwpO1xyXG4gICAgY29uc3QgZGF0YUxvYWQgPSBhd2FpdCB0aGlzLmRhdGFMb2FkU2VydmljZS5nZXRTdGF0ZShkYXRhTG9hZElkKTtcclxuICAgIGNvbnN0IGxhc3RVcGRhdGVMaW1pdCA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdob3VyJyk7XHJcbiAgICBpZiAoXHJcbiAgICAgICFkYXRhTG9hZC5sYXN0VXBkYXRlZCB8fFxyXG4gICAgICBtb21lbnQoZGF0YUxvYWQubGFzdFVwZGF0ZWQpLmlzQmVmb3JlKGxhc3RVcGRhdGVMaW1pdClcclxuICAgICkge1xyXG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZVVzZXJHcm91cHNGb3JVc2VyKGFwcE1vZGUsIGVtYWlsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZVVzZXJHcm91cHNGb3JVc2VyKGFwcE1vZGU6IEFwcE1vZGUsIGVtYWlsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGRhdGFMb2FkSWQgPSB0aGlzLmdldERhdGFMb2FkSWQoYXBwTW9kZSwgZW1haWwpO1xyXG4gICAgYXdhaXQgdGhpcy5kYXRhTG9hZFNlcnZpY2Uuc3RhcnRMb2FkaW5nKGRhdGFMb2FkSWQpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbGFzdFZhbHVlRnJvbSh0aGlzLmFjY291bnRBcGlTZXJ2aWNlXHJcbiAgICAgIC5BY2NvdW50R2V0T2JzZXJ2ZXJHcm91cHMoKSk7XHJcbiAgICB0aGlzLnNhdmVVc2VyR3JvdXBzKGFwcE1vZGUsIGVtYWlsLCByZXN1bHQpO1xyXG4gICAgYXdhaXQgdGhpcy5kYXRhTG9hZFNlcnZpY2UubG9hZGluZ0NvbXBsZXRlZChkYXRhTG9hZElkLCByZXN1bHQubGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVVc2VyR3JvdXBzKFxyXG4gICAgYXBwTW9kZTogQXBwTW9kZSxcclxuICAgIGVtYWlsOiBzdHJpbmcsXHJcbiAgICBvYnNlcnZlckdyb3VwczogT2JzZXJ2ZXJHcm91cER0b1tdXHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCB1c2VyR3JvdXBzID0gKG9ic2VydmVyR3JvdXBzIHx8IFtdKS5tYXAoKHZhbCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGtleTogYCR7ZW1haWx9XyR7dmFsLklkfWAsXHJcbiAgICAgICAgdXNlcklkOiBlbWFpbCxcclxuICAgICAgICBJZDogdmFsLklkLFxyXG4gICAgICAgIE5hbWU6IHZhbC5OYW1lXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGluc3RhbmNlTmFtZSA9IE5hbm9TcWwuZ2V0SW5zdGFuY2VOYW1lKFxyXG4gICAgICBOYW5vU3FsLlRBQkxFUy5PQlNFUlZFUl9HUk9VUFMubmFtZSxcclxuICAgICAgYXBwTW9kZVxyXG4gICAgKTtcclxuICAgIGF3YWl0IG5TUUwoaW5zdGFuY2VOYW1lKS5sb2FkSlModXNlckdyb3Vwcyk7XHJcbiAgICBhd2FpdCB0aGlzLmRlbGV0ZVVzZXJHcm91cHNOb0xvbmdlckluUmVzdWx0KFxyXG4gICAgICBhcHBNb2RlLFxyXG4gICAgICB1c2VyR3JvdXBzLm1hcCgodWcpID0+IHVnLmtleSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGRlbGV0ZVVzZXJHcm91cHNOb0xvbmdlckluUmVzdWx0KFxyXG4gICAgYXBwTW9kZTogQXBwTW9kZSxcclxuICAgIGlkczogc3RyaW5nW11cclxuICApIHtcclxuICAgIGF3YWl0IE5hbm9TcWwuZ2V0SW5zdGFuY2UoTmFub1NxbC5UQUJMRVMuT0JTRVJWRVJfR1JPVVBTLm5hbWUsIGFwcE1vZGUpXHJcbiAgICAgIC5xdWVyeSgnZGVsZXRlJylcclxuICAgICAgLndoZXJlKFxyXG4gICAgICAgIChkYkdyb3VwOiB7IGtleTogc3RyaW5nOyB1c2VySWQ6IHN0cmluZzsgSWQ6IG51bWJlcjsgTmFtZTogc3RyaW5nIH0pID0+XHJcbiAgICAgICAgICBpZHMuaW5kZXhPZihkYkdyb3VwLmtleSkgPCAwXHJcbiAgICAgIClcclxuICAgICAgLmV4ZWMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RGF0YUxvYWRJZChhcHBNb2RlOiBBcHBNb2RlLCBlbWFpbDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYCR7TmFub1NxbC5UQUJMRVMuT0JTRVJWRVJfR1JPVVBTLm5hbWV9XyR7YXBwTW9kZX1fJHtlbWFpbH1gO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckdyb3Vwc0FzT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPE9ic2VydmVyR3JvdXBEdG9bXT4ge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ2dlZEluVXNlciQsXHJcbiAgICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmFwcE1vZGUkXHJcbiAgICBdKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKFtsb2dnZWRJblVzZXIsIGFwcE1vZGVdKSA9PlxyXG4gICAgICAgIGxvZ2dlZEluVXNlci5pc0xvZ2dlZEluXHJcbiAgICAgICAgICA/IGZyb20odGhpcy5nZXRVc2VyR3JvdXBzRnJvbURiKGFwcE1vZGUsIGxvZ2dlZEluVXNlci5lbWFpbCkpXHJcbiAgICAgICAgICA6IGZyb20oUHJvbWlzZS5yZXNvbHZlKFtdKSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJHcm91cHMoKTogUHJvbWlzZTxPYnNlcnZlckdyb3VwRHRvW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldFVzZXJHcm91cHNBc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRVc2VyR3JvdXBzRnJvbURiKFxyXG4gICAgYXBwTW9kZTogQXBwTW9kZSxcclxuICAgIGVtYWlsOiBzdHJpbmdcclxuICApOiBQcm9taXNlPE9ic2VydmVyR3JvdXBEdG9bXT4ge1xyXG4gICAgcmV0dXJuIE5hbm9TcWwuZ2V0SW5zdGFuY2UoTmFub1NxbC5UQUJMRVMuT0JTRVJWRVJfR1JPVVBTLm5hbWUsIGFwcE1vZGUpXHJcbiAgICAgIC5xdWVyeSgnc2VsZWN0JylcclxuICAgICAgLndoZXJlKCh4KSA9PiB4LnVzZXJJZCA9PT0gZW1haWwpXHJcbiAgICAgIC5leGVjKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2V0dGluZ3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExlYWZsZXRDbHVzdGVySGVscGVyIHtcclxuICBzdGF0aWMgY3JlYXRlTWFya2VyQ2x1c3Rlckdyb3VwKG9wdGlvbnM/OiBMLk1hcmtlckNsdXN0ZXJHcm91cE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICBzcGlkZXJmeU9uTWF4Wm9vbTogdHJ1ZSxcclxuICAgICAgc2hvd0NvdmVyYWdlT25Ib3ZlcjogZmFsc2UsXHJcbiAgICAgIHpvb21Ub0JvdW5kc09uQ2xpY2s6IHRydWUsXHJcbiAgICAgIG1heENsdXN0ZXJSYWRpdXM6IHNldHRpbmdzLm1hcC5tYXhDbHVzdGVyUmFkaXVzLFxyXG4gICAgICBpY29uQ3JlYXRlRnVuY3Rpb246IExlYWZsZXRDbHVzdGVySGVscGVyLmNyZWF0ZUNsdXN0ZXJJY29uXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEwubWFya2VyQ2x1c3Rlckdyb3VwKHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLihvcHRpb25zIHx8IHt9KSB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVDbHVzdGVySWNvbihjbHVzdGVyOiBMLk1hcmtlckNsdXN0ZXIpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IGNsdXN0ZXIuZ2V0QWxsQ2hpbGRNYXJrZXJzKCkubGVuZ3RoO1xyXG4gICAgY29uc3Qgc2l6ZSA9IGxlbmd0aCA8IDEwMCA/IDM1IDogbGVuZ3RoIDwgMTAwMCA/IDUwIDogNzA7XHJcbiAgICByZXR1cm4gTC5kaXZJY29uKHtcclxuICAgICAgaHRtbDogJzxkaXY+JyArIGxlbmd0aCArICc8L2Rpdj4nLFxyXG4gICAgICBpY29uU2l6ZTogW3NpemUsIHNpemVdLFxyXG4gICAgICBpY29uQW5jaG9yOiBbc2l6ZSAvIDIuMCwgc2l6ZSAvIDIuMF0sXHJcbiAgICAgIGNsYXNzTmFtZTogJ2NpcmNsZS1tYXJrZXItY2x1c3RlcidcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiaW1hZ2VzXCI+XHJcbiAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIiAqbmdGb3I9XCJsZXQgYXR0YWNobWVudCBvZiBhdHRhY2htZW50czsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgPCEtLSA8aW1nIFtzcmNdPVwiY29udmVydEZpbGVTcmMoaW1hZ2UuUGljdHVyZUltYWdlQmFzZTY0KVwiIC8+IC0tPlxyXG4gICAgPHJvLWJsb2ItaW1hZ2UgW2ltZ0Jsb2JdPVwiYXR0YWNobWVudC5ibG9iXCI+PC9yby1ibG9iLWltYWdlPlxyXG4gICAgPGlvbi1mYWIgY2xhc3M9XCJpb24tbm8tbWFyZ2luXCIgc2xvdD1cImZpeGVkXCIgdmVydGljYWw9XCJ0b3BcIiBob3Jpem9udGFsPVwiZW5kXCI+XHJcbiAgICAgIDxpb24tZmFiLWJ1dHRvbiBzaXplPVwic21hbGxcIiBjb2xvcj1cImRhcmtcIiBjbGFzcz1cIm1hcC1jb250cm9sLWZhYlwiIChjbGljayk9XCJyZW1vdmVJbWFnZShhdHRhY2htZW50KVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2xvc2VcIj48L2lvbi1pY29uPlxyXG4gICAgICA8L2lvbi1mYWItYnV0dG9uPlxyXG4gICAgPC9pb24tZmFiPlxyXG4gICAgPGFwcC10ZXh0LWNvbW1lbnQgWyh2YWx1ZSldPVwiYXR0YWNobWVudC5Db21tZW50XCIgdGl0bGU9XCJ7eyBwaWN0dXJlQ29tbWVudFRleHQgfCB0cmFuc2xhdGV9fVwiIHJvd3M9XCIyXCJcclxuICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBwaWN0dXJlQ29tbWVudFBsYWNlaG9sZGVyIHwgdHJhbnNsYXRlIH19XCI+PC9hcHAtdGV4dC1jb21tZW50PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGlvbi1pdGVtIChjbGljayk9XCJhZGRDbGljaygpXCI+XHJcbiAgPGlvbi1pY29uIFtjb2xvcl09XCJpY29uQ29sb3JcIiBbbmFtZV09XCJpY29uXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICA8aW9uLWxhYmVsPnt7IHRpdGxlIHwgdHJhbnNsYXRlIH19PC9pb24tbGFiZWw+XHJcbjwvaW9uLWl0ZW0+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3Rpb25TaGVldENvbnRyb2xsZXIsIFBsYXRmb3JtLCBUb2FzdENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IENhbWVyYSwgQ2FtZXJhT3B0aW9ucywgUGljdHVyZVNvdXJjZVR5cGUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NhbWVyYS9uZ3gnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NldHRpbmdzJztcclxuaW1wb3J0IHsgQXR0YWNobWVudFR5cGUsIEF0dGFjaG1lbnRVcGxvYWRFZGl0TW9kZWwsIFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBOZXdBdHRhY2htZW50U2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IERhdGFVcmxIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvZGF0YS11cmwuaGVscGVyJztcclxuaW1wb3J0IHsgV2ViVmlldyB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvaW9uaWMtd2Vidmlldy9uZ3gnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRmlsZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS9uZ3gnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nLWxldmVsLm1vZGVsJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJ3NyYy9hcHAvY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdBZGRQaWN0dXJlSXRlbUNvbXBvbmVudCc7XHJcbmNvbnN0IE1JTUVfVFlQRSA9ICdpbWFnZS9qcGVnJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXR0YWNobWVudFVwbG9hZEVkaXRNb2RlbFdpdGhCbG9iIGV4dGVuZHMgQXR0YWNobWVudFVwbG9hZEVkaXRNb2RlbCB7XHJcbiAgYmxvYjogQmxvYjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYWRkLXBpY3R1cmUtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkUGljdHVyZUl0ZW1Db21wb25lbnQgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSByZWdpc3RyYXRpb25JZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIEBJbnB1dCgpIGdlb0hhemFyZDogR2VvSGF6YXJkO1xyXG4gIEBJbnB1dCgpIHRpdGxlID0gJ1JFR0lTVFJBVElPTi5BRERfSU1BR0VTJztcclxuICBASW5wdXQoKSBwaWN0dXJlQ29tbWVudFRleHQgPSAnUkVHSVNUUkFUSU9OLklNQUdFX0RFU0NSSVBUSU9OJztcclxuICBASW5wdXQoKSBwaWN0dXJlQ29tbWVudFBsYWNlaG9sZGVyID0gJ1JFR0lTVFJBVElPTi5JTUFHRV9ERVNDUklQVElPTl9QTEFDRUhPTERFUic7XHJcbiAgQElucHV0KCkgaWNvbiA9ICdjYW1lcmEnO1xyXG4gIEBJbnB1dCgpIHNob3dJY29uID0gdHJ1ZTtcclxuICBASW5wdXQoKSBpY29uQ29sb3IgPSAnZGFyayc7XHJcbiAgQElucHV0KCkgb25CZWZvcmVBZGQ6ICgpID0+IFByb21pc2U8dm9pZD4gfCB2b2lkO1xyXG4gIEBJbnB1dCgpIGF0dGFjaG1lbnRUeXBlOiBBdHRhY2htZW50VHlwZSA9ICdBdHRhY2htZW50JztcclxuICBASW5wdXQoKSByZWY/OiBzdHJpbmc7XHJcblxyXG4gIGF0dGFjaG1lbnRzOiBBdHRhY2htZW50VXBsb2FkRWRpdE1vZGVsV2l0aEJsb2JbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhbWVyYTogQ2FtZXJhLFxyXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICBwcml2YXRlIGZpbGU6IEZpbGUsXHJcbiAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHdlYlZpZXc6IFdlYlZpZXcsXHJcbiAgICBwcml2YXRlIHRvYXN0Q29udHJvbGxlcjogVG9hc3RDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcclxuICAgIHByaXZhdGUgYWN0aW9uU2hlZXRDb250cm9sbGVyOiBBY3Rpb25TaGVldENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIG5ld0F0dGFjaG1lbnRTZXJ2aWNlOiBOZXdBdHRhY2htZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZVxyXG4gICAgICAuZ2V0QXR0YWNobWVudHModGhpcy5yZWdpc3RyYXRpb25JZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChhdHRhY2htZW50cykgPT5cclxuICAgICAgICAgIGF0dGFjaG1lbnRzLmZpbHRlcigoYSkgPT4gYS5SZWdpc3RyYXRpb25USUQgPT09IHRoaXMucmVnaXN0cmF0aW9uVGlkICYmIGEudHlwZSA9PT0gdGhpcy5hdHRhY2htZW50VHlwZSAmJiBhLnJlZiA9PT0gdGhpcy5yZWYpXHJcbiAgICAgICAgKSxcclxuICAgICAgICBzd2l0Y2hNYXAoKGF0dGFjaG1lbnRzKSA9PlxyXG4gICAgICAgICAgYXR0YWNobWVudHMubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgID8gb2YoW10pXHJcbiAgICAgICAgICAgIDogZm9ya0pvaW4oW1xyXG4gICAgICAgICAgICAgIC4uLmF0dGFjaG1lbnRzLm1hcCgoYSkgPT5cclxuICAgICAgICAgICAgICAgIHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2UuZ2V0QmxvYih0aGlzLnJlZ2lzdHJhdGlvbklkLCBhLmlkKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICAgICAgICAgICBtYXAoKGJsb2IpID0+ICh7IC4uLmEsIGJsb2IgfSkpLFxyXG4gICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnIsIERFQlVHX1RBRywgJ0NvdWxkIG5vdCBnZXQgYmxvYiBmcm9tIGF0dGFjaG1lbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoeyAuLi5hLCBibG9iOiB1bmRlZmluZWQgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICB0aGlzLmF0dGFjaG1lbnRzID0gcmVzdWx0O1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRDbGljaygpIHtcclxuICAgIGlmICh0aGlzLm9uQmVmb3JlQWRkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMub25CZWZvcmVBZGQoKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgLmdldChbXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuQUREX1BJQ1RVUkUnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULlRBS0VfTkVXX1BIT1RPJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5DSE9PU0VfRlJPTV9MSUJSQVJZJyxcclxuICAgICAgICAnRElBTE9HUy5DQU5DRUwnXHJcbiAgICAgIF0pXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFjdGlvblNoZWV0ID0gYXdhaXQgdGhpcy5hY3Rpb25TaGVldENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgaGVhZGVyOiB0cmFuc2xhdGlvbnNbJ1JFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuQUREX1BJQ1RVUkUnXSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5UQUtFX05FV19QSE9UTyddLFxyXG4gICAgICAgICAgaGFuZGxlcjogKCkgPT4gdGhpcy5nZXRQaWN0dXJlKHRoaXMuY2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5DSE9PU0VfRlJPTV9MSUJSQVJZJ10sXHJcbiAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB0aGlzLmdldFBpY3R1cmUodGhpcy5jYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuUEhPVE9MSUJSQVJZKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLkNBTkNFTCddLFxyXG4gICAgICAgICAgcm9sZTogJ2NhbmNlbCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYWN0aW9uU2hlZXQucHJlc2VudCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UGljdHVyZShzb3VyY2VUeXBlOiBQaWN0dXJlU291cmNlVHlwZSkge1xyXG4gICAgaWYgKCF0aGlzLnBsYXRmb3JtLmlzKCdoeWJyaWQnKSkge1xyXG4gICAgICBhd2FpdCB0aGlzLmFkZER1bW15SW1hZ2UoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBvcHRpb25zOiBDYW1lcmFPcHRpb25zID0ge1xyXG4gICAgICAgIHF1YWxpdHk6IHNldHRpbmdzLmltYWdlcy5xdWFsaXR5LFxyXG4gICAgICAgIGRlc3RpbmF0aW9uVHlwZTogdGhpcy5jYW1lcmEuRGVzdGluYXRpb25UeXBlLkZJTEVfVVJJLFxyXG4gICAgICAgIHNvdXJjZVR5cGU6IHNvdXJjZVR5cGUsXHJcbiAgICAgICAgZW5jb2RpbmdUeXBlOiB0aGlzLmNhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcclxuICAgICAgICBtZWRpYVR5cGU6IHRoaXMuY2FtZXJhLk1lZGlhVHlwZS5QSUNUVVJFLFxyXG4gICAgICAgIHRhcmdldEhlaWdodDogc2V0dGluZ3MuaW1hZ2VzLnNpemUsXHJcbiAgICAgICAgdGFyZ2V0V2lkdGg6IHNldHRpbmdzLmltYWdlcy5zaXplLFxyXG4gICAgICAgIGNvcnJlY3RPcmllbnRhdGlvbjogdHJ1ZSxcclxuICAgICAgICBzYXZlVG9QaG90b0FsYnVtOiBzb3VyY2VUeXBlID09PSBQaWN0dXJlU291cmNlVHlwZS5DQU1FUkFcclxuICAgICAgICAvLyBOT1RFOiBzYXZlVG9QaG90b0FsYnVtPXRydWUgY2F1c2VzIGEgYnVnIGluIGxhdGVzdCBjb3Jkb3ZhIGNhbWVyYXBsdWdpblxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBpbWFnZVVybCA9IGF3YWl0IHRoaXMuY2FtZXJhLmdldFBpY3R1cmUob3B0aW9ucyk7XHJcbiAgICAgIGlmICghKGF3YWl0IHRoaXMudmFsaWRhdGVJbWFnZShpbWFnZVVybCkpKSB7XHJcbiAgICAgICAgdGhpcy5zaG93RXJyb3JUb2FzdCgnUkVHSVNUUkFUSU9OLklOVkFMSURfSU1BR0UnKTsgLy9UT0RPOiBWaXMgYmVkcmUgZmVpbG1lbGRpbmdcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYEdvdCBpbWFnZSB1cmwgZnJvbSBjYW1lcmEgcGx1Z2luOiAke2ltYWdlVXJsfWAsIERFQlVHX1RBRyk7XHJcbiAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgdGhpcy5nZXRBcnJheUJ1ZmZlcihpbWFnZVVybCk7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRkSW1hZ2UobmV3IEJsb2IoW2FycmF5QnVmZmVyXSksIE1JTUVfVFlQRSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhpcy5sb2dnZXIubG9nKCdVc2VyIGNvdWxkIG5vdCBhZGQgaW1hZ2UsIG1vc3QgbGlrZWx5IG5vIGFjY2VzcyBvciBpbnZhbGlkIGltYWdlJywgZXJyLCBMb2dMZXZlbC5XYXJuaW5nLCBERUJVR19UQUcpO1xyXG4gICAgICB0aGlzLnNob3dFcnJvclRvYXN0KCdDb3VsZCBub3Qgc2F2ZSBpbWFnZS4gRG8geW91IGhhdmUgZW5vdWdoIHNwYWNlPycpOyAvL1RPRE86IFZpcyBiZWRyZSBmZWlsbWVsZGluZyBvZyBww6UgZmxlcmUgc3Byw6VrXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZ2V0QXJyYXlCdWZmZXIoZmlsZVVybDogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xyXG4gICAgY29uc3QgZW50cnkgPSBhd2FpdCB0aGlzLmZpbGUucmVzb2x2ZUxvY2FsRmlsZXN5c3RlbVVybChmaWxlVXJsKTtcclxuICAgIGlmICghZW50cnkuaXNGaWxlKSB7XHJcbiAgICAgIHRocm93IEVycm9yKGAke2ZpbGVVcmx9IGlzIG5vdCBhIGZpbGUhYCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoU3BsaXR0ZWQgPSBlbnRyeS5uYXRpdmVVUkwuc3BsaXQoJy8nKTtcclxuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aFNwbGl0dGVkLnBvcCgpO1xyXG4gICAgY29uc3QgZGlyZWN0b3J5ID0gcGF0aFNwbGl0dGVkLmpvaW4oJy8nKTtcclxuICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgdGhpcy5maWxlLnJlYWRBc0FycmF5QnVmZmVyKGRpcmVjdG9yeSwgZmlsZW5hbWUpO1xyXG4gICAgcmV0dXJuIGFycmF5QnVmZmVyO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyB2YWxpZGF0ZUltYWdlKHNyYzogc3RyaW5nKSB7XHJcbiAgICBpZiAoc3JjKSB7XHJcbiAgICAgIGNvbnN0IGVudHJ5ID0gYXdhaXQgdGhpcy5maWxlLnJlc29sdmVMb2NhbEZpbGVzeXN0ZW1Vcmwoc3JjKTtcclxuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUuZW5kc1dpdGgoJ2pwZycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc2hvd0Vycm9yVG9hc3QobWVzc2FnZUtleTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KG1lc3NhZ2VLZXkpLnN1YnNjcmliZShhc3luYyAodHJhbnNsYXRpb24pID0+IHtcclxuICAgICAgY29uc3QgdG9hc3QgPSBhd2FpdCB0aGlzLnRvYXN0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIG1lc3NhZ2U6IHRyYW5zbGF0aW9uLFxyXG4gICAgICAgIG1vZGU6ICdtZCcsXHJcbiAgICAgICAgZHVyYXRpb246IDQwMDBcclxuICAgICAgfSk7XHJcbiAgICAgIHRvYXN0LnByZXNlbnQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhZGREdW1teUltYWdlKCkge1xyXG4gICAgY29uc3QgZHVtbXlJbWFnZSA9IGF3YWl0IERhdGFVcmxIZWxwZXIuZ2V0RGF0YVVybEZyb21TcmNVcmwoJy9hc3NldHMvaW1hZ2VzL2R1bW15cmVnb2JzaW1hZ2UuanBlZycpO1xyXG4gICAgY29uc3QgYmxvYiA9IERhdGFVcmxIZWxwZXIuY29udmVydERhdGFVUklUb0JpbmFyeShkdW1teUltYWdlKTtcclxuICAgIGF3YWl0IHRoaXMuYWRkSW1hZ2UobmV3IEJsb2IoW2Jsb2JdKSwgJ2ltYWdlL2pwZWcnKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZEltYWdlKGRhdGE6IEJsb2IsIG1pbWVUeXBlOiBzdHJpbmcpIHtcclxuICAgIGF3YWl0IHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2UuYWRkQXR0YWNobWVudChcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb25JZCxcclxuICAgICAgZGF0YSxcclxuICAgICAgbWltZVR5cGUsXHJcbiAgICAgIHRoaXMuZ2VvSGF6YXJkLFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZCxcclxuICAgICAgdGhpcy5hdHRhY2htZW50VHlwZSxcclxuICAgICAgdGhpcy5yZWZcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVJbWFnZShpbWFnZTogQXR0YWNobWVudFVwbG9hZEVkaXRNb2RlbCkge1xyXG4gICAgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHRoaXMucmVnaXN0cmF0aW9uSWQsIGltYWdlLmlkKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtIChjbGljayk9XCJhZGRPckVkaXQoaSlcIiAqbmdGb3I9XCJsZXQgdXJsIG9mIHdlYnVybHM7IGxldCBpID0gaW5kZXhcIj5cclxuICA8aW9uLWxhYmVsPjxzcGFuICpuZ0lmPVwidXJsLlVybERlc2NyaXB0aW9uXCI+e3sgdXJsLlVybERlc2NyaXB0aW9uIH19IC0gPC9zcGFuPnt7IHVybC5VcmxMaW5lIH19PC9pb24tbGFiZWw+XHJcbjwvaW9uLWl0ZW0+XHJcbjxpb24taXRlbSAoY2xpY2spPVwiYWRkT3JFZGl0KClcIj5cclxuICA8aW9uLWljb24gW2NvbG9yXT1cImljb25Db2xvclwiIFtuYW1lXT1cImljb25cIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gIDxpb24tbGFiZWw+e3sgdGl0bGUgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuPC9pb24taXRlbT4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBBZGRXZWJVcmxNb2RhbFBhZ2UgfSBmcm9tICcuLi8uLi9wYWdlcy9hZGQtd2ViLXVybC1tb2RhbC9hZGQtd2ViLXVybC1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgVXJsVmlld01vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYWRkLXdlYi11cmwtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FkZC13ZWItdXJsLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FkZC13ZWItdXJsLWl0ZW0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkV2ViVXJsSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdGl0bGUgPSAnUkVHSVNUUkFUSU9OLkFERF9XRUJfVVJMLlRJVExFJztcclxuICBASW5wdXQoKSB3ZWJ1cmxzOiBVcmxWaWV3TW9kZWxbXTtcclxuICBAT3V0cHV0KCkgd2VidXJsc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBASW5wdXQoKSBpY29uID0gJ2FkZC1jaXJjbGUtb3V0bGluZSc7XHJcbiAgQElucHV0KCkgaWNvbkNvbG9yID0gJ2RhcmsnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBhc3luYyBhZGRPckVkaXQoaW5kZXg/OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHdlYnVybCA9IGluZGV4ICE9PSB1bmRlZmluZWQgPyB0aGlzLndlYnVybHNbaW5kZXhdIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IEFkZFdlYlVybE1vZGFsUGFnZSxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHsgd2VidXJsIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhLmRlbGV0ZSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQXRJbmRleChpbmRleCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2V0V2ViVXJsKGluZGV4LCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWRkV2ViVXJsKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFdlYlVybChpbmRleDogbnVtYmVyLCB1cmw6IFVybFZpZXdNb2RlbCkge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMud2VidXJsc1tpbmRleF0gPSB1cmw7XHJcbiAgICAgIHRoaXMud2VidXJsc0NoYW5nZS5lbWl0KHRoaXMud2VidXJscyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZFdlYlVybCh1cmw6IFVybFZpZXdNb2RlbCkge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy53ZWJ1cmxzKSB7XHJcbiAgICAgICAgdGhpcy53ZWJ1cmxzID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy53ZWJ1cmxzLnB1c2godXJsKTtcclxuICAgICAgdGhpcy53ZWJ1cmxzQ2hhbmdlLmVtaXQodGhpcy53ZWJ1cmxzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQXRJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMud2VidXJscyAmJiB0aGlzLndlYnVybHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMud2VidXJscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMud2VidXJsc0NoYW5nZS5lbWl0KHRoaXMud2VidXJscyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWJhc2U2NC1pbWFnZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Jhc2U2NC1pbWFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYmFzZTY0LWltYWdlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2U2NEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBiYXNlNjRlbmNvZGVkSW1hZ2U6IHN0cmluZztcclxuICBASW5wdXQoKSBkYXRhVXJsVGFnID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJztcclxuICBpbWdTcmM6IFNhZmVVcmw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgYXBwbHlJbWFnZVVybFRhZyA9ICF0aGlzLmJhc2U2NGVuY29kZWRJbWFnZS5zdGFydHNXaXRoKCdkYXRhOmltYWdlJyk7XHJcbiAgICB0aGlzLmltZ1NyYyA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwoXHJcbiAgICAgIChhcHBseUltYWdlVXJsVGFnID8gdGhpcy5kYXRhVXJsVGFnIDogJycpICsgdGhpcy5iYXNlNjRlbmNvZGVkSW1hZ2VcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIjxpbWcgW3NyY109XCJpbWdTcmNcIiAvPiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3JvLWJsb2ItaW1hZ2UnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ibG9iLWltYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ibG9iLWltYWdlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEJsb2JJbWFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBpbWdCbG9iOiBCbG9iO1xyXG5cclxuICBpbWdTcmM6IFNhZmVVcmw7XHJcbiAgcHJpdmF0ZSBibG9iVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5ibG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLmltZ0Jsb2IpO1xyXG4gICAgdGhpcy5pbWdTcmMgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKHRoaXMuYmxvYlVybCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmJsb2JVcmwpIHtcclxuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLmJsb2JVcmwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW1nIFtzcmNdPVwidGhpcy5pbWdTcmNcIj5cclxuIiwiPGlvbi1ncmlkICpuZ0lmPVwiaXNWaXNpYmxlXCI+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwic2hvd0hlbHAoKVwiIGZpbGw9XCJjbGVhclwiPnt7J0hFTFAuVElUTEUnIHwgdHJhbnNsYXRlfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgPC9pb24tcm93PlxyXG48L2lvbi1ncmlkPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIZWxwVGV4dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9oZWxwLXRleHQvaGVscC10ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIZWxwdGV4dER0byB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBIZWxwTW9kYWxQYWdlIH0gZnJvbSAnLi4vLi4vcGFnZXMvbW9kYWwtcGFnZXMvaGVscC1tb2RhbC9oZWxwLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtaGVscC10ZXh0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaGVscC10ZXh0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9oZWxwLXRleHQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGVscFRleHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvblRpZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGdlb0hhemFyZDogR2VvSGF6YXJkO1xyXG5cclxuICBpc1Zpc2libGUgPSBmYWxzZTtcclxuICBoZWxwVGV4dDogSGVscHRleHREdG87XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBoZWxwVGV4dFNlcnZpY2U6IEhlbHBUZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCB1c2VyU2V0dGluZyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICB0aGlzLmhlbHBUZXh0ID0gYXdhaXQgdGhpcy5oZWxwVGV4dFNlcnZpY2UuZ2V0SGVscFRleHRCeUtleShcclxuICAgICAgdXNlclNldHRpbmcubGFuZ3VhZ2UsXHJcbiAgICAgIHVzZXJTZXR0aW5nLmFwcE1vZGUsXHJcbiAgICAgIHRoaXMuZ2VvSGF6YXJkLFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZFxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLmhlbHBUZXh0KSB7XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNob3dIZWxwKCkge1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IEhlbHBNb2RhbFBhZ2UsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgaGVscFRleHQ6IHRoaXMuaGVscFRleHQuVGV4dFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIG1vZGFsLnByZXNlbnQoKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiICpuZ0lmPVwidGl0bGVcIj5cclxuICA8aW9uLWxhYmVsPlxyXG4gICAge3sgdGl0bGUgfCB0cmFuc2xhdGV9fVxyXG4gIDwvaW9uLWxhYmVsPlxyXG48L2lvbi1saXN0LWhlYWRlcj5cclxuPGlvbi1yYWRpby1ncm91cCAobmdNb2RlbENoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiICpuZ0lmPVwia2R2ZWxlbWVudHMkIHwgYXN5bmMgYXMga2R2ZWxlbWVudHNcIj5cclxuICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGtkdmVsZW1lbnRzXCI+XHJcbiAgICA8aW9uLWl0ZW0gW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGl0ZW0uSWQgPT09IHZhbHVlfVwiIFtoaWRkZW5dPVwiIWlzVmlzaWJsZShpdGVtKVwiPlxyXG4gICAgICA8aW9uLWxhYmVsPnt7IHVzZURlc2NyaXB0aW9uID8gaXRlbS5EZXNjcmlwdGlvbiA6IGl0ZW0uTmFtZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXJhZGlvIG1vZGU9XCJtZFwiIHNsb3Q9XCJzdGFydFwiIFt2YWx1ZV09XCJpdGVtLklkXCI+PC9pb24tcmFkaW8+XHJcbiAgICA8L2lvbi1pdGVtPlxyXG4gICAgPGRpdiAqbmdJZj1cIml0ZW0uSWQgPT09IHZhbHVlXCI+XHJcbiAgICAgIDxuZy1jb250ZW50PlxyXG4gICAgICA8L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9pb24tcmFkaW8tZ3JvdXA+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEtkdlNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2tkdi9rZHYuc2VydmljZSc7XHJcbmltcG9ydCB7IEtkdkVsZW1lbnQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBlbnRlclpvbmUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAta2R2LXJhZGlvYnV0dG9uLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9rZHYtcmFkaW9idXR0b24tbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4va2R2LXJhZGlvYnV0dG9uLWxpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgS2R2UmFkaW9idXR0b25MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGtkdktleTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHZhbHVlOiBudW1iZXI7XHJcbiAgQElucHV0KCkgdXNlRGVzY3JpcHRpb246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2hvd1plcm9WYWx1ZXMgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGtkdmVsZW1lbnRzJDogT2JzZXJ2YWJsZTxLZHZFbGVtZW50W10+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtkdlNlcnZpY2U6IEtkdlNlcnZpY2UsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5rZHZlbGVtZW50cyQgPSB0aGlzLmtkdlNlcnZpY2VcclxuICAgICAgLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUodGhpcy5rZHZLZXkpXHJcbiAgICAgIC5waXBlKGVudGVyWm9uZSh0aGlzLm5nWm9uZSkpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGlzVmlzaWJsZShpdGVtOiBLZHZFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5zaG93WmVyb1ZhbHVlcykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBpdGVtLklkICUgMTAwICE9PSAwO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEtkdkVsZW1lbnQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBLZHZTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9rZHYva2R2LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9pbnB1dC9zZWxlY3Qvc2VsZWN0LW9wdGlvbi5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1rZHYtc2VsZWN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4va2R2LXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4va2R2LXNlbGVjdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBLZHZTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKSBrZHZLZXk6IHN0cmluZztcclxuICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBASW5wdXQoKSBzaG93WmVyb1ZhbHVlcyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbGFiZWxDb2xvciA9ICdtZWRpdW0nO1xyXG4gIEBJbnB1dCgpIHNob3dSZXNldEJ1dHRvbiA9IHRydWU7XHJcbiAgQElucHV0KCkgdXNlRGVzY3JpcHRpb246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZmlsdGVyOiAobnVtYmVyKSA9PiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGdldEljb25GdW5jOiAoa2R2RWxlbWVudDogS2R2RWxlbWVudCkgPT4gc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGtkdmVsZW1lbnRzOiBLZHZFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IHNlbGVjdE9wdGlvbnMoKTogU2VsZWN0T3B0aW9uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMua2R2ZWxlbWVudHMubWFwKChlbCkgPT4gKHtcclxuICAgICAgaWQ6IGVsLklkLFxyXG4gICAgICB0ZXh0OiB0aGlzLnVzZURlc2NyaXB0aW9uID8gZWwuRGVzY3JpcHRpb24gOiBlbC5OYW1lLFxyXG4gICAgICBkaXNhYmxlZDogIXRoaXMuaXNWaXNpYmxlKGVsKSxcclxuICAgICAgaWNvbjogdGhpcy5nZXRJY29uRnVuYyA/IHRoaXMuZ2V0SWNvbkZ1bmMoZWwpIDogdW5kZWZpbmVkXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtkdlNlcnZpY2U6IEtkdlNlcnZpY2UsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmtkdlNlcnZpY2VcclxuICAgICAgLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUodGhpcy5rZHZLZXkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGtkdmVsZW1lbnRzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMua2R2ZWxlbWVudHMgPSBrZHZlbGVtZW50cztcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWaXNpYmxlKGl0ZW06IEtkdkVsZW1lbnQpIHtcclxuICAgIGlmICh0aGlzLmZpbHRlciAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmZpbHRlcihpdGVtLklkKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuc2hvd1plcm9WYWx1ZXMpIHtcclxuICAgICAgcmV0dXJuIGl0ZW0uSWQgJSAxMDAgIT09IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtPlxyXG4gIDxpb24tbGFiZWwgW2NvbG9yXT1cImxhYmVsQ29sb3JcIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7IHRpdGxlIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cInZhbHVlXCIgW29wdGlvbnNdPVwic2VsZWN0T3B0aW9uc1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFt0aXRsZV09XCJ0aXRsZVwiXHJcbiAgICBbc2hvd1Jlc2V0XT1cInNob3dSZXNldEJ1dHRvblwiIChzZWxlY3RlZFZhbHVlQ2hhbmdlKT1cInZhbHVlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiPlxyXG4gIDwvYXBwLXNlbGVjdD5cclxuPC9pb24taXRlbT4iLCI8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgc2l6ZT1cIjZcIiBvZmZzZXQ9XCIzXCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIFtkaXNhYmxlZF09XCJzYXZlRGlzYWJsZWRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJzb2xpZFwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJvaygpXCI+XHJcbiAgICAgICAge3sgc2F2ZVRleHQgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuICA8aW9uLXJvdyAqbmdJZj1cInNob3dEZWxldGVcIj5cclxuICAgIDxpb24tY29sIHNpemU9XCI2XCIgb2Zmc2V0PVwiM1wiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiZGVsZXRlKClcIiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiBleHBhbmQ9XCJibG9ja1wiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidHJhc2hcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIHt7ICdESUFMT0dTLkRFTEVURScgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuPC9pb24tZ3JpZD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQWxlcnRDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kYWxTYXZlT3JEZWxldGVCdXR0b25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBzYXZlVGV4dCA9ICdESUFMT0dTLk9LJztcclxuICBASW5wdXQoKSBzYXZlRGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgc2F2ZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlbGV0ZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgc2hvd0RlbGV0ZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGFsZXJ0VGl0bGUgPSAnRElBTE9HUy5BUkVfWU9VX1NVUkUnO1xyXG4gIEBJbnB1dCgpIGFsZXJ0TWVzc2FnZSA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgb2soKSB7XHJcbiAgICB0aGlzLnNhdmVDbGlja2VkLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGRlbGV0ZSgpIHtcclxuICAgIGNvbnN0IHRvVHJhbnNsYXRlID0gW3RoaXMuYWxlcnRUaXRsZSwgJ0RJQUxPR1MuQ0FOQ0VMJywgJ0RJQUxPR1MuT0snXTtcclxuICAgIGlmICh0aGlzLmFsZXJ0TWVzc2FnZSkge1xyXG4gICAgICB0b1RyYW5zbGF0ZS5wdXNoKHRoaXMuYWxlcnRNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KHRvVHJhbnNsYXRlKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBhbGVydCA9IGF3YWl0IHRoaXMuYWxlcnRDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGhlYWRlcjogdHJhbnNsYXRpb25zW3RoaXMuYWxlcnRUaXRsZV0sXHJcbiAgICAgIG1lc3NhZ2U6IHRoaXMuYWxlcnRNZXNzYWdlID8gdHJhbnNsYXRpb25zW3RoaXMuYWxlcnRNZXNzYWdlXSA6IHVuZGVmaW5lZCxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuT0snXSxcclxuICAgICAgICAgIGhhbmRsZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVDbGlja2VkLmVtaXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYWxlcnQucHJlc2VudCgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWdyaWQ+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aW9uLWNvbCBzaXplPVwiNlwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cImxlZnQtYnV0dG9uXCIgKm5nSWY9XCJwcmV2aW91c1wiIChjbGljayk9XCJnb0JhY2soKVwiIGNvbG9yPVwicHJpbWFyeVwiIGZpbGw9XCJvdXRsaW5lXCIgZXhwYW5kPVwiYmxvY2tcIj5cclxuICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cImFycm93LWJhY2tcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDxpb24tdGV4dD57eyBwcmV2aW91cy50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRleHQ+XHJcbiAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWNvbD5cclxuICAgIDxpb24tY29sIHNpemU9XCI2XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIGNsYXNzPVwicmlnaHQtYnV0dG9uXCIgKm5nSWY9XCJuZXh0XCIgKGNsaWNrKT1cImdvRm9yd2FyZCgpXCIgY29sb3I9XCJwcmltYXJ5XCIgZmlsbD1cIm91dGxpbmVcIiBleHBhbmQ9XCJibG9ja1wiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwiZW5kXCIgbmFtZT1cImFycm93LWZvcndhcmRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDxpb24tdGV4dD57eyBuZXh0LnRpdGxlIHwgdHJhbnNsYXRlIH19PC9pb24tdGV4dD5cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuPC9pb24tZ3JpZD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdW1tYXJ5SXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zdW1tYXJ5LWl0ZW0uc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24gfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSVN1bW1hcnlJdGVtIH0gZnJvbSAnLi4vc3VtbWFyeS1pdGVtL3N1bW1hcnktaXRlbS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1uYXZpZ2F0aW9uLWJ1dHRvbnMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLWJ1dHRvbnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25hdmlnYXRpb24tYnV0dG9ucy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uQnV0dG9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIG5leHQ6IElTdW1tYXJ5SXRlbTtcclxuICBwcmV2aW91czogSVN1bW1hcnlJdGVtO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3VtbWFyeUl0ZW1TZXJ2aWNlOiBTdW1tYXJ5SXRlbVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VXJsID0gdGhpcy5yb3V0ZXIudXJsO1xyXG4gICAgY29uc3QgcHJldkFuZE5leHQgPSBhd2FpdCB0aGlzLnN1bW1hcnlJdGVtU2VydmljZS5nZXRQcmV2aW91c0FuZE5leHQoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICBjdXJyZW50VXJsXHJcbiAgICApO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHByZXZBbmROZXh0Lm5leHQpIHtcclxuICAgICAgICB0aGlzLm5leHQgPSBwcmV2QW5kTmV4dC5uZXh0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwcmV2QW5kTmV4dC5wcmV2aW91cykge1xyXG4gICAgICAgIHRoaXMucHJldmlvdXMgPSBwcmV2QW5kTmV4dC5wcmV2aW91cztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB0aGlzLnN1bW1hcnlJdGVtU2VydmljZS5uYXZpZ2F0ZVRvKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgdGhpcy5wcmV2aW91cyxcclxuICAgICAgJ2JhY2snXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29Gb3J3YXJkKCkge1xyXG4gICAgdGhpcy5zdW1tYXJ5SXRlbVNlcnZpY2UubmF2aWdhdGVUbyh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5uZXh0LCAnZm9yd2FyZCcpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cIm9wZW5QaWNrZXIoKVwiIChrZXl1cC5lbnRlcik9XCJvcGVuUGlja2VyKClcIj5cclxuICA8aW9uLWxhYmVsICpuZ0lmPVwidGl0bGVcIiBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgdGl0bGUgfCB0cmFuc2xhdGV9fVxyXG4gIDwvaW9uLWxhYmVsPlxyXG4gIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0XCIgKm5nSWY9XCJkaXNwbGF5VmFsdWUgZWxzZSBwaFwiPnt7IGRpc3BsYXlWYWx1ZSB9fTwvaW9uLXRleHQ+XHJcbjwvaW9uLWl0ZW0+XHJcbjxuZy10ZW1wbGF0ZSAjcGg+XHJcbiAgPGlvbi10ZXh0IGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtc3RhcnRcIiBjb2xvcj1cIm1lZGl1bVwiPnt7IHBsYWNlaG9sZGVyIHwgdHJhbnNsYXRlIH19PC9pb24tdGV4dD5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnVtZXJpY0lucHV0TW9kYWxQYWdlIH0gZnJvbSAnLi4vLi4vcGFnZXMvbW9kYWwtcGFnZXMvbnVtZXJpYy1pbnB1dC1tb2RhbC9udW1lcmljLWlucHV0LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1udW1lcmljLWlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbnVtZXJpYy1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbnVtZXJpYy1pbnB1dC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOdW1lcmljSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRlY2ltYWxQbGFjZXMgPSAwO1xyXG4gIEBJbnB1dCgpIG1pbiA9IC0xMDAwMDA7XHJcbiAgQElucHV0KCkgbWF4ID0gMTAwMDAwO1xyXG4gIEBJbnB1dCgpIHN1ZmZpeDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRlY2ltYWxTZXBhcmF0b3I7XHJcbiAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNvbnZlcnRSYXRpbzogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XHJcbiAgICBjb25zdCBjb252ZXJ0ZWQgPSB0aGlzLmNvbnZlcnQodGhpcy52YWx1ZSwgJ2Zyb20nKTtcclxuICAgIGlmIChjb252ZXJ0ZWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gY29udmVydGVkLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBhc3luYyBvcGVuUGlja2VyKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzT3BlbiAmJiAhdGhpcy5yZWFkb25seSkge1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgICBjb21wb25lbnQ6IE51bWVyaWNJbnB1dE1vZGFsUGFnZSxcclxuICAgICAgICBjc3NDbGFzczogJ251bWVyaWMtaW5wdXQtbW9kYWwnLFxyXG4gICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy5jb252ZXJ0KHRoaXMudmFsdWUsICdmcm9tJyksXHJcbiAgICAgICAgICBkZWNpbWFsUGxhY2VzOiB0aGlzLmRlY2ltYWxQbGFjZXMsXHJcbiAgICAgICAgICBtaW46IHRoaXMubWluLFxyXG4gICAgICAgICAgbWF4OiB0aGlzLm1heCxcclxuICAgICAgICAgIHN1ZmZpeDogdGhpcy5zdWZmaXgsXHJcbiAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiB0aGlzLmRlY2ltYWxTZXBhcmF0b3IsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy50aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG1vZGFsLnByZXNlbnQoKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIGlmIChyZXN1bHQuZGF0YSAmJiByZXN1bHQuZGF0YS5vaykge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNvbnZlcnQocmVzdWx0LmRhdGEudmFsdWUsICd0bycpO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb252ZXJ0KHZhbDogbnVtYmVyLCBkaXJlY3Rpb246ICdmcm9tJyB8ICd0bycpIHtcclxuICAgIGlmIChcclxuICAgICAgdmFsID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgdmFsID09PSBudWxsIHx8XHJcbiAgICAgIHZhbCA9PT0gMCB8fFxyXG4gICAgICB0aGlzLmNvbnZlcnRSYXRpbyA9PT0gdW5kZWZpbmVkXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICAgIHJldHVybiBkaXJlY3Rpb24gPT09ICdmcm9tJ1xyXG4gICAgICA/IHZhbCAqIHRoaXMuY29udmVydFJhdGlvXHJcbiAgICAgIDogdmFsIC8gdGhpcy5jb252ZXJ0UmF0aW87XHJcbiAgfVxyXG59XHJcbiIsIjxpb24tZ3JpZCAqbmdJZj1cInJlZ2lzdHJhdGlvblwiIGNsYXNzPVwicHVsbC1sYXN0LWJvdHRvbSBpb24tbm8tcGFkZGluZyBpb24tbm8tbWFyZ2luXCI+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxhcHAtaGVscC10ZXh0IFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCI+PC9hcHAtaGVscC10ZXh0PlxyXG4gICAgICA8YXBwLW5hdmlnYXRpb24tYnV0dG9ucyBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiPjwvYXBwLW5hdmlnYXRpb24tYnV0dG9ucz5cclxuICAgICAgPGFwcC1zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbiBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCJcclxuICAgICAgICAocmVzZXQpPVwiZW1pdFJlc2V0KClcIj48L2FwcC1zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvaW9uLWdyaWQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJhdGlvbkNvbnRlbnRXcmFwcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgQE91dHB1dCgpIHJlc2V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBJbnB1dCgpIGlzRW1wdHk6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBlbWl0UmVzZXQoKSB7XHJcbiAgICB0aGlzLnJlc2V0LmVtaXQoKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1ncmlkPlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgc2l6ZT1cIjEyXCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIGNsYXNzPVwiYmFjay1idXR0b25cIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJzb2xpZFwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJnb0JhY2soKVwiXHJcbiAgICAgICAgcm91dGVyRGlyZWN0aW9uPVwiYmFja3dhcmRcIj5cclxuICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkJBQ0tfVE9fT0JTRVJWQVRJT04nIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbiAgPGlvbi1yb3cgY2xhc3M9XCJyZXNldC1idXR0b24tcm93XCIgKm5nSWY9XCJoYXNEYXRhXCI+XHJcbiAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cInJlc2V0LWJ1dHRvblwiIChjbGljayk9XCJkb1Jlc2V0KClcIiBjb2xvcj1cImRhcmtcIiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIj5cclxuICAgICAgICA8c3ZnLWljb24gc3JjPVwiL2Fzc2V0cy9pY29uL3Jlc2V0LnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAge3tcIlJFR0lTVFJBVElPTi5SRVNFVFwiIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuPC9pb24tZ3JpZD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJzsgXHJcbmltcG9ydCB7IFNtYXJ0Q2hhbmdlcyB9IGZyb20gJ3NyYy9hcHAvY29yZS9oZWxwZXJzL3NpbXBsZS1jaGFuZ2VzLmhlbHBlcic7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NhdmUtYW5kLWdvLWJhY2stYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTYXZlQW5kR29CYWNrQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBASW5wdXQoKSByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZDtcclxuICBAT3V0cHV0KCkgcmVzZXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGhhc0RhdGEgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5hdkNvbnRvbGxlcjogTmF2Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgJiBTbWFydENoYW5nZXM8dGhpcz4pOiB2b2lkIHtcclxuICAgIGlmKGNoYW5nZXMgJiYgY2hhbmdlcy5yZWdpc3RyYXRpb24gJiYgIWNoYW5nZXMucmVnaXN0cmF0aW9uLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgIHRoaXMuc2V0SGFzRGF0YSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNldEhhc0RhdGEoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0SGFzRGF0YSgpOiB2b2lkIHtcclxuICAgIGlmKHRoaXMucmVnaXN0cmF0aW9uICE9IG51bGwgJiYgdGhpcy5yZWdpc3RyYXRpb25UaWQgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXModGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkKVxyXG4gICAgICAucGlwZSgodGFrZSgxKSkpLnN1YnNjcmliZSgoaGFzRGF0YSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5oYXNEYXRhID0gaGFzRGF0YTtcclxuICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdvQmFjaygpIHtcclxuICAgIHRoaXMubmF2Q29udG9sbGVyLm5hdmlnYXRlQmFjaygncmVnaXN0cmF0aW9uL2VkaXQvJyArIHRoaXMucmVnaXN0cmF0aW9uLmlkKTtcclxuICB9XHJcblxyXG4gIGRvUmVzZXQoKSB7XHJcbiAgICB0aGlzLnJlc2V0LmVtaXQoKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBbbmdDbGFzc109XCJ7J29wZW4nOiBzaG93RGV0YWlscywgJ2RldGFpbHMtc21hbGwnOiFzaG93RnJvbU1hcmtlckluRGV0YWlscyB9XCI+XHJcbiAgPGFwcC1tYXAgKm5nSWY9XCJsb2NhdGlvbk1hcmtlclwiIFtzaG93U3VwcG9ydE1hcHNdPVwiZmFsc2VcIiAobWFwUmVhZHkpPVwib25NYXBSZWFkeSgkZXZlbnQpXCJcclxuICAgIFtjZW50ZXJdPVwibG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKClcIj48L2FwcC1tYXA+XHJcbiAgPGlvbi1ncmlkIGNsYXNzPVwiYm90dG9tLWluZm8gaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImNvbmZpcm0tYnV0dG9uLWNvbFwiPlxyXG4gICAgICAgIDxpb24tYnV0dG9uIFtkaXNhYmxlZF09XCJpc1NhdmVEaXNhYmxlZFwiIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCIgKGNsaWNrKT1cImNvbmZpcm1Mb2NhdGlvbigpXCI+e3sgY29uZmlybUxvY2F0aW9uVGV4dCB8IHRyYW5zbGF0ZVxyXG4gICAgICAgICAgfX08L2lvbi1idXR0b24+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93IGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJzaG93LWRldGFpbHMtY29sIGlvbi1uby1wYWRkaW5nIGlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIDxpb24tYnV0dG9uIGNvbG9yPVwiZGFya1wiIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIChjbGljayk9XCJ0b2dnbGVEZXRhaWxzKClcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2hvd0RldGFpbHNcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJjaGV2cm9uLXVwXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAge3snUkVHSVNUUkFUSU9OLk9CU19MT0NBVElPTi5TSE9XX0RFVEFJTFMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dEZXRhaWxzXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwiY2hldnJvbi1kb3duXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAge3snUkVHSVNUUkFUSU9OLk9CU19MT0NBVElPTi5ISURFX0RFVEFJTFMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3cgY2xhc3M9XCJkZXRhaWxzLXJvd1wiICpuZ0lmPVwic2hvd0RldGFpbHNcIj5cclxuICAgICAgPGlvbi1jb2w+XHJcbiAgICAgICAgPGlvbi1ncmlkIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgICAgIDxpb24tcm93PlxyXG4gICAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1uby1wYWRkaW5nIGlvbi10ZXh0LWNlbnRlclwiIHNpemU9XCIyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwib2JzLWxvY2F0aW9uLW1hcmtlclwiIFtzcmNdPVwibG9jYXRpb25NYXJrZXJJY29uVXJsXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd0Zyb21NYXJrZXJJbkRldGFpbHNcIj5cclxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJkb3R0ZWQtbGluZVwiIHdpZHRoPVwiNHB4XCIgaGVpZ2h0PVwiMTVweFwiIHZpZXdCb3g9XCIwIDAgNCAxNVwiPlxyXG4gICAgICAgICAgICAgICAgICA8bGluZSB4MT1cIjFcIiB4Mj1cIjFcIiB5MT1cIjJcIiB5Mj1cIjE0XCIgc3Ryb2tlPVwiIzAwMFwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHJva2UtZGFzaGFycmF5PVwiMSw0XCI+PC9saW5lPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIGNsYXNzPVwiZGlzdGFuY2UtbGFiZWwgc21hbGwtdGV4dCBpb24tbm8tbWFyZ2luXCI+e3tcclxuICAgICAgICAgICAgICAgICAgZGlzdGFuY2VUb09ic2VydmF0aW9uVGV4dCB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImRvdHRlZC1saW5lXCIgd2lkdGg9XCI0cHhcIiBoZWlnaHQ9XCIxNXB4XCIgdmlld0JveD1cIjAgMCA0IDE1XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPVwiMVwiIHgyPVwiMVwiIHkxPVwiMlwiIHkyPVwiMTRcIiBzdHJva2U9XCIjMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9XCIxLDRcIj48L2xpbmU+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWFmbGV0LXVzZXJtYXJrZXJcIiAqbmdJZj1cIiFmcm9tTWFya2VyXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c3ZnLWljb24gKm5nSWY9XCJmcm9tTWFya2VyXCIgW3NyY109XCJmcm9tTWFya2VySWNvblVybFwiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICAgICAgICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8aW9uLXJvdyBjbGFzcz1cInBhZGRpbmctYm90dG9tXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpb24tY29sIHNpemU9XCIxMlwiIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmcgcGFkZGluZy1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpb24tZ3JpZCBjbGFzcz1cImFycm93LWJveFwiIChjbGljayk9XCJlZGl0TG9jYXRpb24oKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIGNsYXNzPVwiZWRpdC1pY29uXCIgbmFtZT1cImNyZWF0ZVwiICpuZ0lmPVwiY2FuRWRpdExvY2F0aW9uTmFtZVwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW9uLXJvdz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJkZXRhaWwtaGVhZGVyIGlvbi10ZXh0LXVwcGVyY2FzZSBpb24tbm8tbWFyZ2luXCI+e3sgbG9jYXRpb25UaXRsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVkaXRMb2NhdGlvbk5hbWUgZWxzZSBlZGl0TG9jYXRpb25UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLXJvdyAqbmdJZj1cInNlbGVjdGVkTG9jYXRpb24gZWxzZSB2aWV3SW5mb1RlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImRldGFpbC1vYnMtaW5mbyBpb24tbm8tbWFyZ2luIGlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgc2VsZWN0ZWRMb2NhdGlvbi5OYW1lIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIGNsYXNzPVwic21hbGwtdGV4dCBpb24tbm8tbWFyZ2luXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBsb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKS5sYXQgfCBudW1iZXI6JzAuMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5OT1JUSF9TSE9SVCd8dHJhbnNsYXRlfX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxvY2F0aW9uTWFya2VyLmdldExhdExuZygpLmxuZyB8IG51bWJlcjonMC4zJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSZkZWc7e3snTUFQX0NFTlRFUl9JTkZPLkVBU1RfU0hPUlQnfHRyYW5zbGF0ZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXNMb2FkaW5nICYmIHZpZXdJbmZvICYmIHZpZXdJbmZvLmVsZXZhdGlvbiAhPT0gbnVsbFwiPiwge3sgdmlld0luZm8uZWxldmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7J01BUF9DRU5URVJfSU5GTy5BQk9WRV9TRUFfTEVWRUwnIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvaW9uLWdyaWQ+XHJcbiAgICAgICAgICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICAgICAgICAgIDxpb24tcm93ICpuZ0lmPVwic2hvd0Zyb21NYXJrZXJJbkRldGFpbHNcIj5cclxuICAgICAgICAgICAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjEyXCIgY2xhc3M9XCJpb24tbm8tcGFkZGluZyBwYWRkaW5nLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi1uby1tYXJnaW4gYXJyb3ctYm94IGRldGFpbC1oZWFkZXIgYmxvY2sgaW9uLXRleHQtdXBwZXJjYXNlXCI+e3tmcm9tTG9jYXRpb25UZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICAgICAgICA8L2lvbi1ncmlkPlxyXG4gICAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgPC9pb24tZ3JpZD5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvZGl2PlxyXG48bmctdGVtcGxhdGUgI2VkaXRMb2NhdGlvblRlbXBsYXRlPlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICA8aW9uLWlucHV0ICNlZGl0TG9jYXRpb25OYW1lSW5wdXQgdHlwZT1cInRleHRcIiBbbWF4XT1cIjYwXCIgWyhuZ01vZGVsKV09XCJsb2NhdGlvbk5hbWVcIlxyXG4gICAgICAgIChpb25CbHVyKT1cIm9uTG9jYXRpb25FZGl0Q29tcGxldGUoKVwiPjwvaW9uLWlucHV0PlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuPC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICN2aWV3SW5mb1RlbXBsYXRlPlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzTG9hZGluZ1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWV3SW5mbyAmJiB2aWV3SW5mby5sb2NhdGlvblwiPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImRldGFpbC1vYnMtaW5mbyBpb24tbm8tbWFyZ2luIGlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIodmlld0luZm8ubG9jYXRpb24ubmFtZSAhPT0gdmlld0luZm8ubG9jYXRpb24uYWRtaW5OYW1lKVwiPnt7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2aWV3SW5mby5sb2NhdGlvbi5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fSwmbmJzcDs8L3NwYW4+e3t2aWV3SW5mby5sb2NhdGlvbi5hZG1pbk5hbWV9fSZuYnNwO1xyXG4gICAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNMb2FkaW5nXCI+XHJcbiAgICAgICAgPGlvbi1zcGlubmVyIGNvbG9yPVwiZGFya1wiIG5hbWU9XCJkb3RzXCI+PC9pb24tc3Bpbm5lcj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgPC9pb24tcm93PlxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBOZ1pvbmUsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tYXAvc2VydmljZXMvbWFwL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvaGVscGVycy9oZWxwZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tYXAvc2VydmljZXMvbWFwLXNlYXJjaC9tYXAtc2VhcmNoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YWtlLCBzd2l0Y2hNYXAsIGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gJ0BjYXBhY2l0b3IvZ2VvbG9jYXRpb24nO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvY2F0aW9uTmFtZSB9IGZyb20gJy4uLy4uLy4uL21hcC9zZXJ2aWNlcy9tYXAtc2VhcmNoL2xvY2F0aW9uLW5hbWUubW9kZWwnO1xyXG5pbXBvcnQge1xyXG4gIE9ic0xvY2F0aW9uc1Jlc3BvbnNlRHRvVjIsXHJcbiAgT2JzTG9jYXRpb25FZGl0TW9kZWxcclxufSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IExvY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvbG9jYXRpb24vbG9jYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFV0bVNvdXJjZSB9IGZyb20gJy4uLy4uL3BhZ2VzL29icy1sb2NhdGlvbi91dG0tc291cmNlLmVudW0nO1xyXG5pbXBvcnQgeyBWaWV3SW5mbyB9IGZyb20gJy4uLy4uLy4uL21hcC9zZXJ2aWNlcy9tYXAtc2VhcmNoL3ZpZXctaW5mby5tb2RlbCc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgSW9uSW5wdXQgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IExlYWZsZXRDbHVzdGVySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vbWFwL2hlbHBlcnMvbGVhZmxldC1jbHVzZXIuaGVscGVyJztcclxuaW1wb3J0IHsgR2VvUG9zaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9nZW8tcG9zaXRpb24vZ2VvLXBvc2l0aW9uLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgZGVmYXVsdEljb24gPSBMLmljb24oe1xyXG4gIGljb25Vcmw6ICdsZWFmbGV0L21hcmtlci1pY29uLnBuZycsXHJcbiAgc2hhZG93VXJsOiAnbGVhZmxldC9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgaWNvblNpemU6IFsyNSwgNDFdLFxyXG4gIGljb25BbmNob3I6IFsxMiwgNDFdLFxyXG4gIHBvcHVwQW5jaG9yOiBbMSwgLTM0XSxcclxuICB0b29sdGlwQW5jaG9yOiBbMTYsIC0yOF0sXHJcbiAgc2hhZG93U2l6ZTogWzQxLCA0MV1cclxufSk7XHJcblxyXG5jb25zdCBwcmV2aW91c1VzZWRQbGFjZUljb24gPSBMLmljb24oe1xyXG4gIGljb25Vcmw6ICcvYXNzZXRzL2ljb24vbWFwL3ByZXYtdXNlZC1wbGFjZS5zdmcnLFxyXG4gIGljb25TaXplOiBbMjUsIDQxXSxcclxuICBpY29uQW5jaG9yOiBbMTIsIDQxXSxcclxuICBzaGFkb3dVcmw6ICdsZWFmbGV0L21hcmtlci1zaGFkb3cucG5nJyxcclxuICBzaGFkb3dTaXplOiBbNDEsIDQxXVxyXG59KTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNldC1sb2NhdGlvbi1pbi1tYXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZXQtbG9jYXRpb24taW4tbWFwLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZXQtbG9jYXRpb24taW4tbWFwLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldExvY2F0aW9uSW5NYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZ2VvSGF6YXJkOiBHZW9IYXphcmQ7XHJcbiAgQElucHV0KCkgZnJvbU1hcmtlcjogTC5NYXJrZXI7XHJcbiAgQElucHV0KCkgZnJvbU1hcmtlckljb25VcmwgPSAnL2Fzc2V0cy9pY29uL21hcC9vYnMtbG9jYXRpb24uc3ZnJztcclxuICBASW5wdXQoKSBsb2NhdGlvbk1hcmtlcjogTC5NYXJrZXI7XHJcbiAgQElucHV0KCkgbG9jYXRpb25NYXJrZXJJY29uVXJsID0gJy9hc3NldHMvaWNvbi9tYXAvb2JzLWxvY2F0aW9uLnN2Zyc7XHJcbiAgQE91dHB1dCgpIGxvY2F0aW9uU2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxPYnNMb2NhdGlvbkVkaXRNb2RlbD4oKTtcclxuICBASW5wdXQoKSBzaG93UHJldmlvdXNVc2VkTG9jYXRpb25zID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzaG93VXNlclBvc2l0aW9uID0gdHJ1ZTtcclxuICBASW5wdXQoKSBjb25maXJtTG9jYXRpb25UZXh0ID0gJ1JFR0lTVFJBVElPTi5PQlNfTE9DQVRJT04uQ09ORklSTV9URVhUJztcclxuICBASW5wdXQoKSBmcm9tTG9jYXRpb25UZXh0ID0gJ1JFR0lTVFJBVElPTi5PQlNfTE9DQVRJT04uQ1VSUkVOVF9MT0NBVElPTic7XHJcbiAgQElucHV0KCkgbG9jYXRpb25UaXRsZSA9ICdSRUdJU1RSQVRJT04uT0JTX0xPQ0FUSU9OLlRJVExFJztcclxuICBASW5wdXQoKSBzZWxlY3RlZExvY2F0aW9uOiBPYnNMb2NhdGlvbnNSZXNwb25zZUR0b1YyO1xyXG4gIEBPdXRwdXQoKSBtYXBSZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8TC5NYXA+KCk7XHJcbiAgQElucHV0KCkgc2hvd1BvbHlsaW5lID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzaG93RnJvbU1hcmtlckluRGV0YWlscyA9IHRydWU7XHJcbiAgQElucHV0KCkgYWxsb3dFZGl0TG9jYXRpb25OYW1lID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaXNTYXZlRGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBtYXA6IEwuTWFwO1xyXG4gIGZvbGxvd01vZGUgPSBmYWxzZTtcclxuICBwcml2YXRlIHVzZXJwb3NpdGlvbjogUG9zaXRpb247XHJcbiAgcHJpdmF0ZSBwYXRoTGluZTogTC5Qb2x5bGluZTtcclxuICBzaG93RGV0YWlscyA9IGZhbHNlO1xyXG4gIGRpc3RhbmNlVG9PYnNlcnZhdGlvblRleHQgPSAnJztcclxuICB2aWV3SW5mbzogVmlld0luZm87XHJcbiAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBsb2NhdGlvbnM6IE9ic0xvY2F0aW9uc1Jlc3BvbnNlRHRvVjJbXSA9IFtdO1xyXG4gIHByaXZhdGUgbmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIHByaXZhdGUgbG9jYXRpb25Hcm91cCA9IExlYWZsZXRDbHVzdGVySGVscGVyLmNyZWF0ZU1hcmtlckNsdXN0ZXJHcm91cCgpO1xyXG4gIGVkaXRMb2NhdGlvbk5hbWUgPSBmYWxzZTtcclxuICBsb2NhdGlvbk5hbWU6IHN0cmluZztcclxuXHJcbiAgQFZpZXdDaGlsZCgnZWRpdExvY2F0aW9uTmFtZUlucHV0JykgZWRpdExvY2F0aW9uTmFtZUlucHV0OiBJb25JbnB1dDtcclxuXHJcbiAgZ2V0IGNhbkVkaXRMb2NhdGlvbk5hbWUoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLmFsbG93RWRpdExvY2F0aW9uTmFtZSAmJlxyXG4gICAgICAhKHRoaXMuc2VsZWN0ZWRMb2NhdGlvbiAmJiB0aGlzLnNlbGVjdGVkTG9jYXRpb24uSWQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGhlbHBlclNlcnZpY2U6IEhlbHBlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBtYXBTZWFyY2hTZXJ2aWNlOiBNYXBTZWFyY2hTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnZW9Qb3NpdGlvblNlcnZpY2U6IEdlb1Bvc2l0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9jYXRpb25TZXJ2aWNlOiBMb2NhdGlvblNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIG5nT25Jbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgTC5NYXJrZXIucHJvdG90eXBlLm9wdGlvbnMuaWNvbiA9IGRlZmF1bHRJY29uO1xyXG5cclxuICAgIGNvbnN0IGxvY2F0aW9uTWFya2VySWNvbiA9IEwuaWNvbih7XHJcbiAgICAgIGljb25Vcmw6IHRoaXMubG9jYXRpb25NYXJrZXJJY29uVXJsLFxyXG4gICAgICBpY29uU2l6ZTogWzI1LCA0MV0sXHJcbiAgICAgIGljb25BbmNob3I6IFsxMiwgNDFdLFxyXG4gICAgICBzaGFkb3dVcmw6ICdsZWFmbGV0L21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgICAgc2hhZG93U2l6ZTogWzQxLCA0MV1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5mb2xsb3dNb2RlID0gIXRoaXMubG9jYXRpb25NYXJrZXIgJiYgIXRoaXMuZnJvbU1hcmtlcjtcclxuICAgIHRoaXMubWFwU2VydmljZS5mb2xsb3dNb2RlID0gdGhpcy5mb2xsb3dNb2RlO1xyXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uTWFya2VyKSB7XHJcbiAgICAgIGlmICh0aGlzLmZyb21NYXJrZXIpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uTWFya2VyID0gTC5tYXJrZXIodGhpcy5mcm9tTWFya2VyLmdldExhdExuZygpLCB7XHJcbiAgICAgICAgICBpY29uOiBsb2NhdGlvbk1hcmtlckljb25cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBsYXN0VmlldyA9IGF3YWl0IHRoaXMubWFwU2VydmljZS5tYXBWaWV3JFxyXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgIC50b1Byb21pc2UoKTtcclxuICAgICAgICBpZiAobGFzdFZpZXcpIHtcclxuICAgICAgICAgIHRoaXMubG9jYXRpb25NYXJrZXIgPSBMLm1hcmtlcihsYXN0Vmlldy5jZW50ZXIsIHtcclxuICAgICAgICAgICAgaWNvbjogbG9jYXRpb25NYXJrZXJJY29uXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlciA9IEwubWFya2VyKEwubGF0TG5nKDU5LjEsIDEwLjMpLCB7XHJcbiAgICAgICAgICAgIGljb246IGxvY2F0aW9uTWFya2VySWNvblxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZU1hcFZpZXdJbmZvKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdEZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TG9jYXRpb25zT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPE9ic0xvY2F0aW9uc1Jlc3BvbnNlRHRvVjJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU2VydmljZS5tYXBWaWV3JC5waXBlKFxyXG4gICAgICBmaWx0ZXIoXHJcbiAgICAgICAgKG1hcFZpZXcpID0+XHJcbiAgICAgICAgICBtYXBWaWV3ICYmXHJcbiAgICAgICAgICBtYXBWaWV3LmNlbnRlciAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICBtYXBWaWV3LmJvdW5kcyAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICksXHJcbiAgICAgIHN3aXRjaE1hcCgobWFwVmlldykgPT5cclxuICAgICAgICB0aGlzLmxvY2F0aW9uU2VydmljZS5nZXRMb2NhdGlvbldpdGhpblJhZGl1c09ic2VydmFibGUoXHJcbiAgICAgICAgICB0aGlzLmdlb0hhemFyZCxcclxuICAgICAgICAgIG1hcFZpZXcuY2VudGVyLmxhdCxcclxuICAgICAgICAgIG1hcFZpZXcuY2VudGVyLmxuZyxcclxuICAgICAgICAgIE1hdGgucm91bmQoXHJcbiAgICAgICAgICAgIG1hcFZpZXcuYm91bmRzXHJcbiAgICAgICAgICAgICAgLmdldE5vcnRoV2VzdCgpXHJcbiAgICAgICAgICAgICAgLmRpc3RhbmNlVG8obWFwVmlldy5ib3VuZHMuZ2V0U291dGhFYXN0KCkpIC8gMlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkTG9jYXRpb25JZk5vdEV4aXN0cyhsb2M6IE9ic0xvY2F0aW9uc1Jlc3BvbnNlRHRvVjIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5sb2NhdGlvbnMuc29tZSgobG9jYXRpb24pID0+IGxvYy5JZCA9PT0gbG9jYXRpb24uSWQpO1xyXG4gICAgaWYgKCFleGlzdGluZykge1xyXG4gICAgICB0aGlzLmxvY2F0aW9ucy5wdXNoKGxvYyk7XHJcbiAgICAgIGNvbnN0IG1hcmtlciA9IEwubWFya2VyKFxyXG4gICAgICAgIEwubGF0TG5nKGxvYy5MYXRMbmdPYmplY3QuTGF0aXR1ZGUsIGxvYy5MYXRMbmdPYmplY3QuTG9uZ2l0dWRlKSxcclxuICAgICAgICB7IGljb246IHByZXZpb3VzVXNlZFBsYWNlSWNvbiB9XHJcbiAgICAgICkuYWRkVG8odGhpcy5sb2NhdGlvbkdyb3VwKTtcclxuICAgICAgbWFya2VyLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0VG9QcmV2b3VzbHlVc2VkTG9jYXRpb24obG9jKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1hcFJlYWR5KG06IEwuTWFwKTogdm9pZCB7XHJcbiAgICB0aGlzLm1hcCA9IG07XHJcbiAgICB0aGlzLmxvY2F0aW9uTWFya2VyLnNldFpJbmRleE9mZnNldCgxMDApLmFkZFRvKHRoaXMubWFwKTtcclxuICAgIGlmICh0aGlzLmZyb21NYXJrZXIpIHtcclxuICAgICAgdGhpcy5mcm9tTWFya2VyLmFkZFRvKHRoaXMubWFwKTtcclxuICAgIH1cclxuICAgIHRoaXMubG9jYXRpb25Hcm91cC5hZGRUbyh0aGlzLm1hcCk7XHJcbiAgICB0aGlzLm1hcC5vbignZHJhZ3N0YXJ0JywgKCkgPT4ge1xyXG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFwLm9uKCdkcmFnZW5kJywgKCkgPT4gdGhpcy51cGRhdGVNYXBWaWV3SW5mbygpKTtcclxuICAgIHRoaXMubWFwLm9uKCdkcmFnJywgKCkgPT4gdGhpcy5tb3ZlTG9jYXRpb25NYXJrZXJUb0NlbnRlcigpKTtcclxuXHJcbiAgICBpZiAodGhpcy5zaG93UHJldmlvdXNVc2VkTG9jYXRpb25zKSB7XHJcbiAgICAgIHRoaXMuZ2V0TG9jYXRpb25zT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgICAgLnN1YnNjcmliZSgobG9jYXRpb25zKSA9PiB7XHJcbiAgICAgICAgICBsb2NhdGlvbnMuZm9yRWFjaCgobG9jKSA9PiB0aGlzLmFkZExvY2F0aW9uSWZOb3RFeGlzdHMobG9jKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLmZvbGxvd01vZGUkXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICB0aGlzLmZvbGxvd01vZGUgPSB2YWw7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9sbG93TW9kZSAmJiB0aGlzLnVzZXJwb3NpdGlvbikge1xyXG4gICAgICAgICAgdGhpcy5zZXRMb2NhdGlvbk1hcmtlckxhdExuZyh7XHJcbiAgICAgICAgICAgIGxhdDogdGhpcy51c2VycG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICBsbmc6IHRoaXMudXNlcnBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXBTZWFyY2hTZXJ2aWNlLm1hcFNlYXJjaENsaWNrJFxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSlcclxuICAgICAgLnN1YnNjcmliZSgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxhdExuZyA9IGl0ZW0gaW5zdGFuY2VvZiBMLkxhdExuZyA/IGl0ZW0gOiBpdGVtLmxhdGxuZztcclxuICAgICAgICB0aGlzLnNldExvY2F0aW9uTWFya2VyTGF0TG5nKGxhdExuZyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZ2VvUG9zaXRpb25TZXJ2aWNlLmN1cnJlbnRQb3NpdGlvbiRcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHBvcykgPT4gdGhpcy5wb3NpdGlvbkNoYW5nZShwb3MpKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZm9sbG93TW9kZSkge1xyXG4gICAgICB0aGlzLm1hcC5zZXRWaWV3KHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCksIDE1KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1hcFJlYWR5LmVtaXQodGhpcy5tYXApO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoQW5kRGlzdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0TG9jYXRpb25NYXJrZXJMYXRMbmcobGF0TG5nOiBMLkxhdExuZ0V4cHJlc3Npb24pOiB2b2lkIHtcclxuICAgIHRoaXMubG9jYXRpb25NYXJrZXIuc2V0TGF0TG5nKGxhdExuZyk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGhBbmREaXN0YW5jZSgpO1xyXG4gICAgdGhpcy51cGRhdGVNYXBWaWV3SW5mbygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRUb1ByZXZvdXNseVVzZWRMb2NhdGlvbihsb2NhdGlvbjogT2JzTG9jYXRpb25zUmVzcG9uc2VEdG9WMik6IHZvaWQge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmZvbGxvd01vZGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgIHRoaXMuc2V0TG9jYXRpb25NYXJrZXJMYXRMbmcoXHJcbiAgICAgICAgTC5sYXRMbmcoXHJcbiAgICAgICAgICBsb2NhdGlvbi5MYXRMbmdPYmplY3QuTGF0aXR1ZGUsXHJcbiAgICAgICAgICBsb2NhdGlvbi5MYXRMbmdPYmplY3QuTG9uZ2l0dWRlXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLm1hcC5wYW5Ubyh0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpKTtcclxuICAgICAgdGhpcy5zaG93RGV0YWlscyA9IHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbW92ZUxvY2F0aW9uTWFya2VyVG9DZW50ZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1hcFNlcnZpY2UuZm9sbG93TW9kZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RlZExvY2F0aW9uID0gbnVsbDtcclxuICAgIGNvbnN0IGNlbnRlciA9IHRoaXMubWFwLmdldENlbnRlcigpO1xyXG4gICAgdGhpcy5sb2NhdGlvbk1hcmtlci5zZXRMYXRMbmcoY2VudGVyKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aEFuZERpc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZU1hcFZpZXdJbmZvKCk6IHZvaWQge1xyXG4gICAgY29uc3QgbGF0TG5nID0gdGhpcy5sb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKTtcclxuICAgIHRoaXMubWFwU2VhcmNoU2VydmljZVxyXG4gICAgICAuZ2V0Vmlld0luZm8oeyBjZW50ZXI6IGxhdExuZywgYm91bmRzOiBudWxsLCB6b29tOiAwIH0sIHRoaXMuZ2VvSGF6YXJkKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICh2YWwpID0+IHtcclxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0luZm8gPSB2YWw7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChfKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdJbmZvID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcG9zaXRpb25DaGFuZ2UocG9zaXRpb246IFBvc2l0aW9uKSB7XHJcbiAgICB0aGlzLnVzZXJwb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgaWYgKHRoaXMuZm9sbG93TW9kZSkge1xyXG4gICAgICB0aGlzLnNldExvY2F0aW9uTWFya2VyTGF0TG5nKHtcclxuICAgICAgICBsYXQ6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICBsbmc6IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGhBbmREaXN0YW5jZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGF0aEFuZERpc3RhbmNlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZnJvbSA9IHRoaXMuZnJvbU1hcmtlclxyXG4gICAgICA/IHRoaXMuZnJvbU1hcmtlci5nZXRMYXRMbmcoKVxyXG4gICAgICA6IHRoaXMudXNlcnBvc2l0aW9uXHJcbiAgICAgICAgPyBMLmxhdExuZyhcclxuICAgICAgICAgIHRoaXMudXNlcnBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICAgIHRoaXMudXNlcnBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcclxuICAgICAgICApXHJcbiAgICAgICAgOiB0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpO1xyXG4gICAgY29uc3QgbG9jYXRpb25NYXJrZXJMYXRMbmcgPSB0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpO1xyXG4gICAgY29uc3QgcGF0aCA9IFtsb2NhdGlvbk1hcmtlckxhdExuZywgZnJvbV07XHJcbiAgICBpZiAodGhpcy5tYXApIHtcclxuICAgICAgaWYgKCF0aGlzLnBhdGhMaW5lKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoTGluZSA9IEwucG9seWxpbmUocGF0aCwge1xyXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICB3ZWlnaHQ6IDYsXHJcbiAgICAgICAgICBvcGFjaXR5OiAwLjksXHJcbiAgICAgICAgICBkYXNoQXJyYXk6ICcxLDEyJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnNob3dQb2x5bGluZSkge1xyXG4gICAgICAgICAgdGhpcy5wYXRoTGluZS5hZGRUbyh0aGlzLm1hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGF0aExpbmUuc2V0TGF0TG5ncyhwYXRoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5mcm9tTWFya2VyKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5mcm9tTWFya2VyLmdldExhdExuZygpLmVxdWFscyh0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5mcm9tTWFya2VyLnNldE9wYWNpdHkoMCk7XHJcbiAgICAgICAgICB0aGlzLnBhdGhMaW5lLnNldFN0eWxlKHsgb3BhY2l0eTogMCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5mcm9tTWFya2VyLnNldE9wYWNpdHkoMSk7XHJcbiAgICAgICAgICB0aGlzLnBhdGhMaW5lLnNldFN0eWxlKHsgb3BhY2l0eTogMC45IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5kaXN0YW5jZVRvT2JzZXJ2YXRpb25UZXh0ID0gdGhpcy5oZWxwZXJTZXJ2aWNlLmdldERpc3RhbmNlVGV4dChcclxuICAgICAgICBsb2NhdGlvbk1hcmtlckxhdExuZy5kaXN0YW5jZVRvKGZyb20pXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZURldGFpbHMoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnNob3dEZXRhaWxzID0gIXRoaXMuc2hvd0RldGFpbHM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExvY2F0aW9uTmFtZShsb2NhdGlvbjogTG9jYXRpb25OYW1lKTogc3RyaW5nIHtcclxuICAgIGlmIChsb2NhdGlvbikge1xyXG4gICAgICByZXR1cm4gbG9jYXRpb24uYWRtaW5OYW1lICE9PSBsb2NhdGlvbi5uYW1lXHJcbiAgICAgICAgPyBgJHtsb2NhdGlvbi5uYW1lfSAvICR7bG9jYXRpb24uYWRtaW5OYW1lfWBcclxuICAgICAgICA6IGxvY2F0aW9uLm5hbWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBjb25maXJtTG9jYXRpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBvYnNMb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oKTtcclxuICAgIHRoaXMubG9jYXRpb25TZXQuZW1pdChvYnNMb2NhdGlvbik7XHJcbiAgfVxyXG5cclxuICBnZXRMb2NhdGlvbigpOiBPYnNMb2NhdGlvbkVkaXRNb2RlbCB7XHJcbiAgICBjb25zdCBvYnNMb2NhdGlvbjogT2JzTG9jYXRpb25FZGl0TW9kZWwgPSB7XHJcbiAgICAgIExhdGl0dWRlOiB0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpLmxhdCxcclxuICAgICAgTG9uZ2l0dWRlOiB0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpLmxuZyxcclxuICAgICAgVW5jZXJ0YWludHk6IDAsXHJcbiAgICAgIFVUTVNvdXJjZVRJRDogVXRtU291cmNlLlNlbGVjdGVkSW5NYXBcclxuICAgIH07XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZWRpdExvY2F0aW9uTmFtZSAmJlxyXG4gICAgICB0aGlzLmxvY2F0aW9uTmFtZSAmJlxyXG4gICAgICB0aGlzLmxvY2F0aW9uTmFtZS5sZW5ndGggPiAwXHJcbiAgICApIHtcclxuICAgICAgb2JzTG9jYXRpb24uT2JzTG9jYXRpb25JRCA9IHVuZGVmaW5lZDtcclxuICAgICAgb2JzTG9jYXRpb24uTG9jYXRpb25OYW1lID0gdGhpcy5sb2NhdGlvbk5hbWUuc3Vic3RyaW5nKDAsIDYwKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZExvY2F0aW9uKSB7XHJcbiAgICAgIG9ic0xvY2F0aW9uLk9ic0xvY2F0aW9uSUQgPSB0aGlzLnNlbGVjdGVkTG9jYXRpb24uSWQ7XHJcbiAgICAgIG9ic0xvY2F0aW9uLkxvY2F0aW9uTmFtZSA9IHRoaXMuc2VsZWN0ZWRMb2NhdGlvbi5OYW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudmlld0luZm8gJiYgdGhpcy52aWV3SW5mby5sb2NhdGlvbikge1xyXG4gICAgICBvYnNMb2NhdGlvbi5Mb2NhdGlvbkRlc2NyaXB0aW9uID0gdGhpcy5nZXRMb2NhdGlvbk5hbWUoXHJcbiAgICAgICAgdGhpcy52aWV3SW5mby5sb2NhdGlvblxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZm9sbG93TW9kZSAmJiB0aGlzLnVzZXJwb3NpdGlvbikge1xyXG4gICAgICBvYnNMb2NhdGlvbi5VVE1Tb3VyY2VUSUQgPSBVdG1Tb3VyY2UuR1BTO1xyXG4gICAgICBvYnNMb2NhdGlvbi5VbmNlcnRhaW50eSA9IE1hdGgucm91bmQodGhpcy51c2VycG9zaXRpb24uY29vcmRzLmFjY3VyYWN5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBvYnNMb2NhdGlvbjtcclxuICB9XHJcblxyXG4gIGVkaXRMb2NhdGlvbigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNhbkVkaXRMb2NhdGlvbk5hbWUpIHtcclxuICAgICAgdGhpcy5lZGl0TG9jYXRpb25OYW1lID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWRpdExvY2F0aW9uTmFtZUlucHV0KSB7XHJcbiAgICAgICAgICB0aGlzLmVkaXRMb2NhdGlvbk5hbWVJbnB1dC5zZXRGb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgNTApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Mb2NhdGlvbkVkaXRDb21wbGV0ZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmVkaXRMb2NhdGlvbk5hbWVJbnB1dC52YWx1ZT8udG9TdHJpbmcoKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgLy8gVXNlciBoYXMgZGVsZXRlZCBhbGwgdGV4dFxyXG4gICAgICB0aGlzLmVkaXRMb2NhdGlvbk5hbWUgPSBmYWxzZTtcclxuICAgICAgdGhpcy51cGRhdGVNYXBWaWV3SW5mbygpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgPGlvbi1sYWJlbD5cclxuICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLkNPTVBSRVNTSU9OX1RFU1QuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiBkZXRhaWw9XCJ0cnVlXCIgKGNsaWNrKT1cImFkZE9yRWRpdENvbXByZXNzaW9uVGVzdChpKVwiIChrZXl1cC5lbnRlcik9XCJhZGRPckVkaXRDb21wcmVzc2lvblRlc3QoaSlcIlxyXG4gICAgKm5nRm9yPVwibGV0IGNvbXByZXNzaW9uVGVzdCBvZiB0ZXN0czsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgPGlvbi1sYWJlbD5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbXByZXNzaW9uVGVzdC5Qcm9wYWdhdGlvblRJRFwiPnt7Y29tcHJlc3Npb25UZXN0LlByb3BhZ2F0aW9uVElEIHwga2R2RGVzY3JpcHRpb246ICdTbm93X1Byb3BhZ2F0aW9uS0RWJyB8IGFzeW5jfX08L25nLWNvbnRhaW5lcj48bmctY29udGFpbmVyICpuZ0lmPVwiY29tcHJlc3Npb25UZXN0LlRhcHNGcmFjdHVyZSA+IDBcIj57e2NvbXByZXNzaW9uVGVzdC5UYXBzRnJhY3R1cmV9fTwvbmctY29udGFpbmVyPjxuZy1jb250YWluZXIgKm5nSWY9XCJjb21wcmVzc2lvblRlc3QuRnJhY3R1cmVEZXB0aCA+IDBcIj5Ae3tjb21wcmVzc2lvblRlc3QuRnJhY3R1cmVEZXB0aCB8IG1ldGVyc1RvQ206IDB9fWNtPC9uZy1jb250YWluZXI+PG5nLWNvbnRhaW5lcj57eyBjb21wcmVzc2lvblRlc3QuQ29tcHJUZXN0RnJhY3R1cmVUSUQgfCBrZHZEZXNjcmlwdGlvbjogJ1Nub3dfQ29tcHJUZXN0RnJhY3R1cmVLRFYnIHwgYXN5bmMgfX08L25nLWNvbnRhaW5lcj5cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiBuYW1lPVwibGlua1wiICpuZ0lmPVwiY29tcHJlc3Npb25UZXN0LkluY2x1ZGVJblNub3dQcm9maWxlXCI+PC9pb24taWNvbj5cclxuICA8L2lvbi1pdGVtPlxyXG4gIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWRkT3JFZGl0Q29tcHJlc3Npb25UZXN0KClcIiAoa2V5dXAuZW50ZXIpPVwiYWRkT3JFZGl0Q29tcHJlc3Npb25UZXN0KClcIj5cclxuICAgIDxpb24taWNvbiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuQ09NUFJFU1NJT05fVEVTVC5BRERfTkVXJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuPC9pb24tbGlzdD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2UgfSBmcm9tICcuL2NvbXByZXNzaW9uLXRlc3QtbW9kYWwvY29tcHJlc3Npb24tdGVzdC1tb2RhbC5wYWdlJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtY29tcHJlc3Npb24tdGVzdC1saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29tcHJlc3Npb24tdGVzdC1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb21wcmVzc2lvbi10ZXN0LWxpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29tcHJlc3Npb25UZXN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdGVzdHM6IEFycmF5PENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbD47XHJcbiAgQElucHV0KCkgaW5jbHVkZUluU25vd1Byb2ZpbGVBc0RlZmF1bHQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgdGVzdHNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHJpdmF0ZSBpc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBhc3luYyBhZGRPckVkaXRDb21wcmVzc2lvblRlc3QoaW5kZXg/OiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICBjb25zdCBhZGQgPSBpbmRleCA9PT0gdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgY29tcG9uZW50OiBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2UsXHJcbiAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICAgIGNvbXByZXNzaW9uVGVzdDogYWRkID8gdW5kZWZpbmVkIDogKHRoaXMudGVzdHMgfHwgW10pW2luZGV4XSxcclxuICAgICAgICAgIGluY2x1ZGVJblNub3dQcm9maWxlQXNEZWZhdWx0OiB0aGlzLmluY2x1ZGVJblNub3dQcm9maWxlQXNEZWZhdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgbW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmRlbGV0ZSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVUZXN0KGluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgY29tcHJlc3Npb25UZXN0OiBDb21wcmVzc2lvblRlc3RFZGl0TW9kZWwgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgIGlmICh0aGlzLnRlc3RzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50ZXN0cyA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGFkZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RzLnB1c2goY29tcHJlc3Npb25UZXN0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVzdHNbaW5kZXhdID0gY29tcHJlc3Npb25UZXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnRlc3RzQ2hhbmdlLmVtaXQodGhpcy50ZXN0cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZVRlc3QoaW5kZXgpIHtcclxuICAgIGlmICh0aGlzLnRlc3RzICE9PSB1bmRlZmluZWQgJiYgdGhpcy50ZXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMudGVzdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPnt7J1JFR0lTVFJBVElPTi5TTk9XLkNPTVBSRVNTSU9OX1RFU1QuVElUTEUnIHwgdHJhbnNsYXRlfX08L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcblxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5DT01QUkVTU0lPTl9URVNULklOQ0xVREVfSU5fU05PV19QUk9GSUxFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXRvZ2dsZSBbZGlzYWJsZWRdPVwiaW5jbHVkZUluU25vd1Byb2ZpbGVEaXNhYmxlZFwiIHNsb3Q9XCJlbmRcIlxyXG4gICAgICAgIFsobmdNb2RlbCldPVwiY29tcHJlc3Npb25UZXN0LkluY2x1ZGVJblNub3dQcm9maWxlXCIgbmFtZT1cIkluY2x1ZGVJblNub3dQcm9maWxlXCI+XHJcbiAgICAgIDwvaW9uLXRvZ2dsZT5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5DT01QUkVTU0lPTl9URVNULlRFU1RfVFlQRVwiIGtkdktleT1cIlNub3dfUHJvcGFnYXRpb25LRFZcIlxyXG4gICAgICBbKHZhbHVlKV09XCJjb21wcmVzc2lvblRlc3QuUHJvcGFnYXRpb25USURcIiAodmFsdWVDaGFuZ2UpPVwiY2hlY2tJZkluY2x1ZGVJblNub3dQcm9maWxlU2hvdWxkQmVEaXNhYmxlZCgpXCI+XHJcbiAgICA8L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGlvbi1pdGVtICpuZ0lmPVwidGFwc0ZyYWN0dXJlVmlzaWJsZSgpXCI+XHJcbiAgICAgIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J1JFR0lTVFJBVElPTi5TTk9XLkNPTVBSRVNTSU9OX1RFU1QuVEFQU19GUkFDVFVSRSdcclxuICAgICAgICB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxhcHAtc2VsZWN0IFsoc2VsZWN0ZWRWYWx1ZSldPVwiY29tcHJlc3Npb25UZXN0LlRhcHNGcmFjdHVyZVwiIFtvcHRpb25zXT1cInRhcHNBcnJheVwiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5DT01QUkVTU0lPTl9URVNULlRBUFNfRlJBQ1RVUkVcIj48L2FwcC1zZWxlY3Q+XHJcbiAgICA8L2lvbi1pdGVtPlxyXG4gICAgPGFwcC1udW1lcmljLWlucHV0ICpuZ0lmPVwiIWlzQ1ROb3JFQ1RYKClcIiBbKHZhbHVlKV09XCJjb21wcmVzc2lvblRlc3QuRnJhY3R1cmVEZXB0aFwiXHJcbiAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQ09NUFJFU1NJT05fVEVTVC5ESVNUQU5DRV9GUk9NX1RPUFwiIFttaW5dPVwiMFwiIFttYXhdPVwiOTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMFwiXHJcbiAgICAgIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCIgc3VmZml4PVwiY21cIj48L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgPGFwcC1rZHYtc2VsZWN0ICpuZ0lmPVwiIWlzQ1ROb3JFQ1RYKClcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkNPTVBSRVNTSU9OX1RFU1QuRlJBQ1RVUkVfVFlQRVwiXHJcbiAgICAgIGtkdktleT1cIlNub3dfQ29tcHJUZXN0RnJhY3R1cmVLRFZcIiBbKHZhbHVlKV09XCJjb21wcmVzc2lvblRlc3QuQ29tcHJUZXN0RnJhY3R1cmVUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGFwcC1rZHYtc2VsZWN0ICpuZ0lmPVwiIWlzTEJUKClcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkNPTVBSRVNTSU9OX1RFU1QuU1RBQklMSVRZX0VWQUxcIlxyXG4gICAgICBrZHZLZXk9XCJTbm93X1N0YWJpbGl0eUV2YWxLRFZcIiBbKHZhbHVlKV09XCJjb21wcmVzc2lvblRlc3QuU3RhYmlsaXR5RXZhbFRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIlJFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkNPTU1FTlRcIiBbKHZhbHVlKV09XCJjb21wcmVzc2lvblRlc3QuQ29tbWVudFwiPlxyXG4gICAgPC9hcHAtdGV4dC1jb21tZW50PlxyXG4gIDwvaW9uLWxpc3Q+XHJcbiAgPGFwcC1tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zIFtzYXZlRGlzYWJsZWRdPVwiIWlzVmFsaWRcIiAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCJcclxuICAgIFtzaG93RGVsZXRlXT1cInNob3dEZWxldGVcIj5cclxuICA8L2FwcC1tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgSXNFbXB0eUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXInO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9pbnB1dC9zZWxlY3Qvc2VsZWN0LW9wdGlvbi5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jb21wcmVzc2lvbi10ZXN0LW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29tcHJlc3Npb24tdGVzdC1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbXByZXNzaW9uLXRlc3QtbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXByZXNzaW9uVGVzdE1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgY29tcHJlc3Npb25UZXN0OiBDb21wcmVzc2lvblRlc3RFZGl0TW9kZWw7XHJcbiAgQElucHV0KCkgaW5jbHVkZUluU25vd1Byb2ZpbGVBc0RlZmF1bHQgPSBmYWxzZTtcclxuXHJcbiAgc2hvd0RlbGV0ZSA9IGZhbHNlO1xyXG4gIHRhcHNBcnJheTogU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICBpbmNsdWRlSW5Tbm93UHJvZmlsZURpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIGdldCBpc1ZhbGlkKCkge1xyXG4gICAgY29uc3QgY2xvbmUgPSB7IC4uLnRoaXMuY29tcHJlc3Npb25UZXN0IH07XHJcbiAgICBjbG9uZS5JbmNsdWRlSW5Tbm93UHJvZmlsZSA9IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KGNsb25lKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzA7IGkrKykge1xyXG4gICAgICB0aGlzLnRhcHNBcnJheS5wdXNoKHtcclxuICAgICAgICBpZDogaSxcclxuICAgICAgICB0ZXh0OiBpLnRvU3RyaW5nKClcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuY29tcHJlc3Npb25UZXN0KSB7XHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0ID0ge307XHJcbiAgICAgIGlmICh0aGlzLmluY2x1ZGVJblNub3dQcm9maWxlQXNEZWZhdWx0KSB7XHJcbiAgICAgICAgdGhpcy5jb21wcmVzc2lvblRlc3QuSW5jbHVkZUluU25vd1Byb2ZpbGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dEZWxldGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGVja0lmSW5jbHVkZUluU25vd1Byb2ZpbGVTaG91bGRCZURpc2FibGVkKCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0lmSW5jbHVkZUluU25vd1Byb2ZpbGVTaG91bGRCZURpc2FibGVkKCkge1xyXG4gICAgaWYgKHRoaXMuaXNMQlQoKSkge1xyXG4gICAgICB0aGlzLmNvbXByZXNzaW9uVGVzdC5JbmNsdWRlSW5Tbm93UHJvZmlsZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmluY2x1ZGVJblNub3dQcm9maWxlRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmluY2x1ZGVJblNub3dQcm9maWxlRGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHRhcHNGcmFjdHVyZVZpc2libGUoKSB7XHJcbiAgICByZXR1cm4gISh0aGlzLmlzQ1ROb3JFQ1RYKCkgfHwgdGhpcy5pc0NUVm9yRUNUVigpIHx8IHRoaXMuaXNMQlQoKSk7XHJcbiAgfVxyXG5cclxuICBpc0NUTm9yRUNUWCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0LlByb3BhZ2F0aW9uVElEID09PSAxNSB8fFxyXG4gICAgICB0aGlzLmNvbXByZXNzaW9uVGVzdC5Qcm9wYWdhdGlvblRJRCA9PT0gMjRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpc0NUVm9yRUNUVigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0LlByb3BhZ2F0aW9uVElEID09PSAxMSB8fFxyXG4gICAgICB0aGlzLmNvbXByZXNzaW9uVGVzdC5Qcm9wYWdhdGlvblRJRCA9PT0gMjFcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpc0xCVCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXByZXNzaW9uVGVzdC5Qcm9wYWdhdGlvblRJRCA9PT0gNTtcclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh0aGlzLmNvbXByZXNzaW9uVGVzdCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHsgZGVsZXRlOiB0cnVlIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0+XHJcbiAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uRVhQT1NFRF9IRUlHSFRfQ09NQk8nXHJcbiAgICAgICAgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0IGlvbi10ZXh0LXdyYXAgaW9uLW1hcmdpbi1ib3R0b21cIj5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImV4cG9zZWRIaWdodFwiPlxyXG4gICAgICA8aW9uLXJvdyBjbGFzcz1cInRvcCBwYWRkaW5nLWJvdHRvbVwiIChjbGljayk9XCJ0b2dnbGVFeHNwb3NlZEhlaWdodENvbWJvKCd0b3AnKVwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGV4cG9zZWRIZWlnaHRUb3B9XCI+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjEyXCIgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVE9QJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93IGNsYXNzPVwibWlkZGxlIHBhZGRpbmctYm90dG9tXCIgKGNsaWNrKT1cInRvZ2dsZUV4c3Bvc2VkSGVpZ2h0Q29tYm8oJ21pZGRsZScpXCJcclxuICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogZXhwb3NlZEhlaWdodE1pZGRsZX1cIj5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiMTJcIiBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5NSURETEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPGlvbi1yb3cgKGNsaWNrKT1cInRvZ2dsZUV4c3Bvc2VkSGVpZ2h0Q29tYm8oJ2JvdHRvbScpXCIgY2xhc3M9XCJib3R0b21cIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBleHBvc2VkSGVpZ2h0Qm90dG9tfVwiPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCIxMlwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyIGlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkJPVFRPTScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgPC9pb24tZ3JpZD5cclxuICA8L2lvbi10ZXh0PlxyXG48L2lvbi1pdGVtPlxyXG48aW9uLWl0ZW0gKm5nSWY9XCJleHBvc2VkSGVpZ2h0VG9wIHx8IGV4cG9zZWRIZWlnaHRNaWRkbGUgfHwgZXhwb3NlZEhlaWdodEJvdHRvbVwiPlxyXG4gIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkVYUE9TRURfSEVJR0hUMSdcclxuICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cImV4cG9zZWRIaWdodDFcIiAoc2VsZWN0ZWRWYWx1ZUNoYW5nZSk9XCJhcHBseUNoYW5nZXMoKVwiIFtvcHRpb25zXT1cImhlaWdodEFycmF5XCJcclxuICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uRVhQT1NFRF9IRUlHSFQxXCI+PC9hcHAtc2VsZWN0PlxyXG48L2lvbi1pdGVtPlxyXG48aW9uLWl0ZW0gKm5nSWY9XCJzaG9sZFVzZUV4cG9zZWRIaWdodDIoKVwiPlxyXG4gIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkVYUE9TRURfSEVJR0hUMidcclxuICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cImV4cG9zZWRIaWdodDJcIiAoc2VsZWN0ZWRWYWx1ZUNoYW5nZSk9XCJhcHBseUNoYW5nZXMoKVwiIFtvcHRpb25zXT1cImxvd2VySGVpZ2h0QXJyYXlcIlxyXG4gICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5FWFBPU0VEX0hFSUdIVDJcIj48L2FwcC1zZWxlY3Q+XHJcbjwvaW9uLWl0ZW0+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBOZ1pvbmUsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWV4cG9zZWQtaGVpZ2h0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZXhwb3NlZC1oZWlnaHQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2V4cG9zZWQtaGVpZ2h0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEV4cG9zZWRIZWlnaHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGV4cG9zZWRIZWlnaHRDb21ib1RJRDogbnVtYmVyO1xyXG4gIEBPdXRwdXQoKSBleHBvc2VkSGVpZ2h0Q29tYm9USURDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgZXhwb3NlZEhpZ2h0MTogbnVtYmVyO1xyXG4gIEBPdXRwdXQoKSBleHBvc2VkSGlnaHQxQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBJbnB1dCgpIGV4cG9zZWRIaWdodDI6IG51bWJlcjtcclxuICBAT3V0cHV0KCkgZXhwb3NlZEhpZ2h0MkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZXhwb3NlZEhlaWdodFRvcDogYm9vbGVhbjtcclxuICBleHBvc2VkSGVpZ2h0TWlkZGxlOiBib29sZWFuO1xyXG4gIGV4cG9zZWRIZWlnaHRCb3R0b206IGJvb2xlYW47XHJcblxyXG4gIGdldCBoZWlnaHRBcnJheSgpOiBTZWxlY3RPcHRpb25bXSB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8PSA4MDAwOyBpZCArPSAxMDApIHtcclxuICAgICAgb3B0aW9ucy5wdXNoKHsgaWQsIHRleHQ6IGAke2lkfSBtYCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvd2VySGVpZ2h0QXJyYXkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oZWlnaHRBcnJheS5maWx0ZXIoXHJcbiAgICAgICh4KSA9PiB0aGlzLmV4cG9zZWRIaWdodDEgPT09IHVuZGVmaW5lZCB8fCB4LmlkIDwgdGhpcy5leHBvc2VkSGlnaHQxXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNldEV4cG9zZWRIZWlnaHRzKHRoaXMuZXhwb3NlZEhlaWdodENvbWJvVElEKTtcclxuICB9XHJcblxyXG4gIHNldEV4cG9zZWRIZWlnaHRzKGV4cG9zZWRIZWlnaHRDb21ib1RJRDogbnVtYmVyKSB7XHJcbiAgICBpZiAoZXhwb3NlZEhlaWdodENvbWJvVElEID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodFRvcCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodE1pZGRsZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodEJvdHRvbSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKGV4cG9zZWRIZWlnaHRDb21ib1RJRCA9PT0gMSkge1xyXG4gICAgICAvLyBIdml0IG5lZGVyc3RcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0VG9wID0gdHJ1ZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tID0gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGV4cG9zZWRIZWlnaHRDb21ib1RJRCA9PT0gMikge1xyXG4gICAgICAvLyBTdmFydCBuZWRlcnN0XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodFRvcCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoZXhwb3NlZEhlaWdodENvbWJvVElEID09PSAzKSB7XHJcbiAgICAgIC8vIEh2aXQgaSBtaWR0ZW5cclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0VG9wID0gdHJ1ZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodEJvdHRvbSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKGV4cG9zZWRIZWlnaHRDb21ib1RJRCA9PT0gNCkge1xyXG4gICAgICAvLyBTdmFydCBpIG1pZHRlblxyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRUb3AgPSBmYWxzZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRUb3AgPSBmYWxzZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodEJvdHRvbSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRXhzcG9zZWRIZWlnaHRDb21ibyhwb3NpdGlvbjogJ3RvcCcgfCAnbWlkZGxlJyB8ICdib3R0b20nKSB7XHJcbiAgICBpZiAocG9zaXRpb24gPT09ICd0b3AnKSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodFRvcCA9ICF0aGlzLmV4cG9zZWRIZWlnaHRUb3A7XHJcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSAnbWlkZGxlJykge1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGUgPSAhdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tID0gIXRoaXMuZXhwb3NlZEhlaWdodEJvdHRvbTtcclxuICAgIH1cclxuICAgIHRoaXMuYXBwbHlDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBzaG9sZFVzZUV4cG9zZWRIaWdodDIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAodGhpcy5leHBvc2VkSGVpZ2h0VG9wICYmXHJcbiAgICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tICYmXHJcbiAgICAgICAgIXRoaXMuZXhwb3NlZEhlaWdodE1pZGRsZSkgfHxcclxuICAgICAgKCF0aGlzLmV4cG9zZWRIZWlnaHRUb3AgJiZcclxuICAgICAgICAhdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tICYmXHJcbiAgICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRXhwb3NlZEhlaWdodENvbWJvVElEKFxyXG4gICAgdG9wOiBib29sZWFuLFxyXG4gICAgbWlkZGxlOiBib29sZWFuLFxyXG4gICAgYm90dG9tOiBib29sZWFuXHJcbiAgKSB7XHJcbiAgICBpZiAodG9wICYmIG1pZGRsZSAmJiBib3R0b20pIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Q29tYm9USUQgPSAwO1xyXG4gICAgfSBlbHNlIGlmICghdG9wICYmIG1pZGRsZSAmJiAhYm90dG9tKSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodENvbWJvVElEID0gNDtcclxuICAgIH0gZWxzZSBpZiAodG9wICYmICFtaWRkbGUgJiYgYm90dG9tKSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodENvbWJvVElEID0gMztcclxuICAgIH0gZWxzZSBpZiAoYm90dG9tKSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodENvbWJvVElEID0gMjtcclxuICAgIH0gZWxzZSBpZiAodG9wKSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodENvbWJvVElEID0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodENvbWJvVElEID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXBwbHlDaGFuZ2VzKCkge1xyXG4gICAgdGhpcy51cGRhdGVFeHBvc2VkSGVpZ2h0Q29tYm9USUQoXHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodFRvcCxcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlLFxyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRCb3R0b21cclxuICAgICk7XHJcbiAgICBpZiAoIXRoaXMuc2hvbGRVc2VFeHBvc2VkSGlnaHQyKCkpIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGlnaHQyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5leHBvc2VkSGVpZ2h0Q29tYm9USURDaGFuZ2UuZW1pdCh0aGlzLmV4cG9zZWRIZWlnaHRDb21ib1RJRCk7XHJcbiAgICB0aGlzLmV4cG9zZWRIaWdodDFDaGFuZ2UuZW1pdCh0aGlzLmV4cG9zZWRIaWdodDEpO1xyXG4gICAgdGhpcy5leHBvc2VkSGlnaHQyQ2hhbmdlLmVtaXQodGhpcy5leHBvc2VkSGlnaHQyKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtPlxyXG4gIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLlZBTElEX0VYUE9TSVRJT04nXHJcbiAgICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8aW9uLXRleHQgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1zdGFydCBpb24tdGV4dC13cmFwIGlvbi1tYXJnaW4tYm90dG9tXCI+XHJcbiAgICA8aW9uLWdyaWQgKm5nSWY9XCJ2YWxpZEV4cG9zaXRpb25Db3B5XCIgY2xhc3M9XCJleHBvc2l0aW9uIGlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI0XCIgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIiAoY2xpY2spPVwic2V0RXhwb3NpdGlvbig3KVwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogdmFsaWRFeHBvc2l0aW9uQ29weVs3XSA9PT0gJzEnfVwiPlxyXG4gICAgICAgICAge3sgJ0RJUkVDVElPTi5OVycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKGNsaWNrKT1cInNldEV4cG9zaXRpb24oMClcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHZhbGlkRXhwb3NpdGlvbkNvcHlbMF0gPT09ICcxJ31cIj5cclxuICAgICAgICAgIHt7ICdESVJFQ1RJT04uTicgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKGNsaWNrKT1cInNldEV4cG9zaXRpb24oMSlcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHZhbGlkRXhwb3NpdGlvbkNvcHlbMV0gPT09ICcxJ31cIj5cclxuICAgICAgICAgIHt7ICdESVJFQ1RJT04uTkUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjRcIiBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiIChjbGljayk9XCJzZXRFeHBvc2l0aW9uKDYpXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiB2YWxpZEV4cG9zaXRpb25Db3B5WzZdID09PSAnMSd9XCI+XHJcbiAgICAgICAgICB7eyAnRElSRUNUSU9OLlcnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjRcIiBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiIChjbGljayk9XCJ0b2dnbGVBbGxFeHBvc2l0aW9ucygpXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiB2YWxpZEV4cG9zaXRpb25Db3B5ID09PSAnMTExMTExMTEnfVwiPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkFMTCcgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKGNsaWNrKT1cInNldEV4cG9zaXRpb24oMilcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHZhbGlkRXhwb3NpdGlvbkNvcHlbMl0gPT09ICcxJ31cIj5cclxuICAgICAgICAgIHt7ICdESVJFQ1RJT04uRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKGNsaWNrKT1cInNldEV4cG9zaXRpb24oNSlcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHZhbGlkRXhwb3NpdGlvbkNvcHlbNV0gPT09ICcxJ31cIj5cclxuICAgICAgICAgIHt7ICdESVJFQ1RJT04uU1cnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjRcIiBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiIChjbGljayk9XCJzZXRFeHBvc2l0aW9uKDQpXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiB2YWxpZEV4cG9zaXRpb25Db3B5WzRdID09PSAnMSd9XCI+XHJcbiAgICAgICAgICB7eyAnRElSRUNUSU9OLlMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjRcIiBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiIChjbGljayk9XCJzZXRFeHBvc2l0aW9uKDMpXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiB2YWxpZEV4cG9zaXRpb25Db3B5WzNdID09PSAnMSd9XCI+XHJcbiAgICAgICAgICB7eyAnRElSRUNUSU9OLlNFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvaW9uLXRleHQ+XHJcbjwvaW9uLWl0ZW0+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5jb25zdCBFTVBUWV9FWFBPU0lUSU9OID0gJzAwMDAwMDAwJztcclxuY29uc3QgQUxMX0VYUE9TSVRJT04gPSAnMTExMTExMTEnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtdmFsaWQtZXhwb3NpdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmFsaWRFeHBvc2l0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB2YWxpZEV4cG9zaXRpb246IHN0cmluZztcclxuICBAT3V0cHV0KCkgdmFsaWRFeHBvc2l0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB2YWxpZEV4cG9zaXRpb25Db3B5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkRXhwb3NpdGlvbikge1xyXG4gICAgICB0aGlzLnZhbGlkRXhwb3NpdGlvbkNvcHkgPSBFTVBUWV9FWFBPU0lUSU9OO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEV4cG9zaXRpb25Db3B5ID0gdGhpcy52YWxpZEV4cG9zaXRpb247XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRFeHBvc2l0aW9uKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nVmFsdWUgPSB0aGlzLnZhbGlkRXhwb3NpdGlvbkNvcHkuc3Vic3RyKGluZGV4LCAxKTtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gZXhpc3RpbmdWYWx1ZSA9PT0gJzEnID8gJzAnIDogJzEnO1xyXG4gICAgdGhpcy52YWxpZEV4cG9zaXRpb25Db3B5ID1cclxuICAgICAgdGhpcy52YWxpZEV4cG9zaXRpb25Db3B5LnN1YnN0cigwLCBpbmRleCkgK1xyXG4gICAgICBuZXdWYWx1ZSArXHJcbiAgICAgIHRoaXMudmFsaWRFeHBvc2l0aW9uQ29weS5zdWJzdHIoaW5kZXggKyAxKTtcclxuICAgIHRoaXMuYXBwbHlDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxFeHBvc2l0aW9ucygpIHtcclxuICAgIHRoaXMudmFsaWRFeHBvc2l0aW9uQ29weSA9XHJcbiAgICAgIHRoaXMudmFsaWRFeHBvc2l0aW9uQ29weSA9PT0gQUxMX0VYUE9TSVRJT05cclxuICAgICAgICA/IEVNUFRZX0VYUE9TSVRJT05cclxuICAgICAgICA6IEFMTF9FWFBPU0lUSU9OO1xyXG4gICAgdGhpcy5hcHBseUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIGFwcGx5Q2hhbmdlcygpIHtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkRXhwb3NpdGlvbkNvcHkgPT09IEVNUFRZX0VYUE9TSVRJT04pIHtcclxuICAgICAgICB0aGlzLnZhbGlkRXhwb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnZhbGlkRXhwb3NpdGlvbiA9IHRoaXMudmFsaWRFeHBvc2l0aW9uQ29weTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnZhbGlkRXhwb3NpdGlvbkNoYW5nZS5lbWl0KHRoaXMudmFsaWRFeHBvc2l0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBOZ1pvbmVcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXRleHQtY29tbWVudCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHQtY29tbWVudC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dC1jb21tZW50LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRleHRDb21tZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgcm93cyA9IDQ7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBtYXggPSAxMDI0O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0+XHJcbiAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgdGl0bGUgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICA8aW9uLXRleHRhcmVhIGF1dG9jYXBpdGFsaXplPVwic2VudGVuY2VzXCIgW21heGxlbmd0aF09XCJtYXhcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiB0eXBlPVwidGV4dGFyZWFcIiAoaW9uQmx1cik9XCJvbkJsdXIoKVwiXHJcbiAgICBbcm93c109XCJyb3dzXCIgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiIFthdXRvR3Jvd109XCJ0cnVlXCIgKG5nTW9kZWxDaGFuZ2UpPVwidmFsdWVDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcclxuICAgIHBsYWNlaG9sZGVyPVwie3sgcGxhY2Vob2xkZXIgfCB0cmFuc2xhdGV9fVwiPjwvaW9uLXRleHRhcmVhPlxyXG48L2lvbi1pdGVtPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VsZWN0SW50ZXJmYWNlIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXllcy1uby1zZWxlY3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi95ZXMtbm8tc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi95ZXMtbm8tc2VsZWN0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFllc05vU2VsZWN0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSB2YWx1ZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBsYWJlbENvbG9yID0gJ21lZGl1bSc7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW1xyXG4gICAgeyBpZDogdHJ1ZSwgdGV4dDogJ0RJQUxPR1MuWUVTJyB9LFxyXG4gICAgeyBpZDogZmFsc2UsIHRleHQ6ICdESUFMT0dTLk5PJyB9XHJcbiAgXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsIjxpb24taXRlbT5cclxuICA8aW9uLWxhYmVsIFtjb2xvcl09XCJsYWJlbENvbG9yXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyB0aXRsZSB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgPGFwcC1zZWxlY3QgWyhzZWxlY3RlZFZhbHVlKV09XCJ2YWx1ZVwiIChzZWxlY3RlZFZhbHVlQ2hhbmdlKT1cInZhbHVlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiIFt0aXRsZV09XCJ0aXRsZVwiXHJcbiAgICBbb3B0aW9uc109XCJvcHRpb25zXCI+PC9hcHAtc2VsZWN0PlxyXG48L2lvbi1pdGVtPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFVybEVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWFkZC13ZWItdXJsLW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYWRkLXdlYi11cmwtbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hZGQtd2ViLXVybC1tb2RhbC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkV2ViVXJsTW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB3ZWJ1cmw6IFVybEVkaXRNb2RlbDtcclxuICB1cmxUb1NhdmU6IFVybEVkaXRNb2RlbDtcclxuICBpc05ldyA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy53ZWJ1cmwpIHtcclxuICAgICAgdGhpcy51cmxUb1NhdmUgPSB7IC4uLnRoaXMud2VidXJsIH07XHJcbiAgICAgIHRoaXMuaXNOZXcgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXJsVG9TYXZlID0ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBvaygpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModGhpcy51cmxUb1NhdmUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh7IGRlbGV0ZTogdHJ1ZSB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9XRUJfVVJMLlRJVExFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICB7e1wiUkVHSVNUUkFUSU9OLkFERF9XRUJfVVJMLlRJVExFXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgPGFwcC10ZXh0LWNvbW1lbnQgWyh2YWx1ZSldPVwidXJsVG9TYXZlLlVybERlc2NyaXB0aW9uXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNPTU1FTlRfVElUTEVcIiByb3dzPVwiMlwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgJ1JFR0lTVFJBVElPTi5BRERfV0VCX1VSTC5VUkwnIHwgdHJhbnNsYXRlIH19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24taW5wdXQgdHlwZT1cInVybFwiIFsobmdNb2RlbCldPVwidXJsVG9TYXZlLlVybExpbmVcIj48L2lvbi1pbnB1dD5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgPC9pb24tbGlzdD5cclxuICA8YXBwLW1vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMgW3NhdmVEaXNhYmxlZF09XCIhdXJsVG9TYXZlLlVybExpbmVcIiAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCJcclxuICAgIFtzaG93RGVsZXRlXT1cIiFpc05ld1wiPlxyXG4gIDwvYXBwLW1vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnM+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGVscE1vZGFsUGFnZSB9IGZyb20gJy4vaGVscC1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgTWFya2Rvd25Nb2R1bGUgfSBmcm9tICduZ3gtbWFya2Rvd24nO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGUsIE1hcmtkb3duTW9kdWxlLmZvckNoaWxkKCldLFxyXG4gIGRlY2xhcmF0aW9uczogW0hlbHBNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0hlbHBNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWxwTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1oZWxwLW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaGVscC1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2hlbHAtbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEhlbHBNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGhlbHBUZXh0OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cImVuZFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2xvc2UoKVwiPnt7ICdESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnSEVMUC5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50IGNsYXNzPVwiaW9uLXBhZGRpbmdcIiAoY2xpY2spPVwiY2xvc2UoKVwiPlxyXG4gIDxtYXJrZG93biBbZGF0YV09XCJoZWxwVGV4dFwiPjwvbWFya2Rvd24+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnVtZXJpY0lucHV0TW9kYWxQYWdlIH0gZnJvbSAnLi9udW1lcmljLWlucHV0LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTnVtZXJpY0lucHV0TW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOdW1lcmljSW5wdXRNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOdW1lcmljSW5wdXRNb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlICpuZ0lmPVwidGl0bGVcIj5cclxuICAgICAge3sgdGl0bGUgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJlbmRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImRvbmUoKVwiPnt7ICdESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGlvbi1ncmlkIGNsYXNzPVwibnVtYmVyLXBhZFwiPlxyXG4gICAgPGlvbi1yb3cgY2xhc3M9XCJpb24tanVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxyXG4gICAgICA8aW9uLWNvbCBzaXplPVwiOFwiIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyIHRleHQtdmFsdWUgaW9uLXRleHQtcmlnaHRcIj5cclxuICAgICAgICA8aW9uLXRleHQgKm5nSWY9XCJpc05lZ2F0aXZlXCI+JiM4NzIyOzwvaW9uLXRleHQ+XHJcbiAgICAgICAgPGlvbi10ZXh0Pnt7bG9jYWxlU3RyaW5nfX08L2lvbi10ZXh0PlxyXG4gICAgICAgIDxpb24tdGV4dCAqbmdJZj1cImxvY2FsZVN0cmluZyAmJiBzdWZmaXhcIj4mbmJzcDt7e3N1ZmZpeH19PC9pb24tdGV4dD5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyIGlvbi10ZXh0LXJpZ2h0XCI+XHJcbiAgICAgICAgPGlvbi1idXR0b24gY2xhc3M9XCIgZGVsZXRlLWJ1dHRvblwiIGZpbGw9XCJjbGVhclwiIChjbGljayk9XCJjbGVhcigpXCI+JmxhcnI7PC9pb24tYnV0dG9uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdz5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIiAqbmdGb3I9XCJsZXQgaSBvZiBbJzEnLCcyJywnMyddXCI+XHJcbiAgICAgICAgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCIgKGNsaWNrKT1cInB1c2hOdW1iZXIoaSlcIj57e2l9fTwvaW9uLWJ1dHRvbj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3c+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKm5nRm9yPVwibGV0IGkgb2YgWyc0JywnNScsJzYnXVwiPlxyXG4gICAgICAgIDxpb24tYnV0dG9uIGZpbGw9XCJjbGVhclwiIChjbGljayk9XCJwdXNoTnVtYmVyKGkpXCI+e3tpfX08L2lvbi1idXR0b24+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiICpuZ0Zvcj1cImxldCBpIG9mIFsnNycsJzgnLCc5J11cIj5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiAoY2xpY2spPVwicHVzaE51bWJlcihpKVwiPnt7aX19PC9pb24tYnV0dG9uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdz5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBbZmlsbF09XCJpc05lZ2F0aXZlID8gJ3NvbGlkJyA6ICdjbGVhcidcIiAqbmdJZj1cIm1pbiA8IDBcIiAoY2xpY2spPVwidG9nZ2xlTmVnYXRpdmUoKVwiPisgLyAtXHJcbiAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCIgKGNsaWNrKT1cInB1c2hOdW1iZXIoJzAnKVwiPjA8L2lvbi1idXR0b24+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8aW9uLWJ1dHRvbiAqbmdJZj1cImRlY2ltYWxQbGFjZXMgPiAwXCIgZmlsbD1cImNsZWFyXCIgKGNsaWNrKT1cInB1c2hEZWNpbWFsU2VwYXJhdG9yKClcIj57e2RlY2ltYWxTZXB9fTwvaW9uLWJ1dHRvbj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBOdW1iZXJIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvbnVtYmVyLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1udW1lcmljLWlucHV0LW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbnVtZXJpYy1pbnB1dC1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL251bWVyaWMtaW5wdXQtbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE51bWVyaWNJbnB1dE1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcclxuICBASW5wdXQoKSBzdWZmaXg6IHN0cmluZztcclxuICBASW5wdXQoKSBtaW4gPSAtMTAwMDAwO1xyXG4gIEBJbnB1dCgpIG1heCA9IDEwMDAwMDtcclxuICBASW5wdXQoKSBkZWNpbWFsUGxhY2VzID0gMDtcclxuICBASW5wdXQoKSBkZWNpbWFsU2VwYXJhdG9yO1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gIGRlY2ltYWxTZXAgPSAnLic7XHJcbiAgaXNOZWdhdGl2ZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgbnVtYmVyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICBnZXQgdGV4dFZhbCgpIHtcclxuICAgIHJldHVybiB0aGlzLm51bWJlcnMuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICBnZXQgbG9jYWxlU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dFZhbC5yZXBsYWNlKCcuJywgdGhpcy5kZWNpbWFsU2VwKTtcclxuICB9XHJcblxyXG4gIGdldCBudW1iZXJWYWwoKSB7XHJcbiAgICBjb25zdCBudW0gPSBwYXJzZUZsb2F0KHRoaXMudGV4dFZhbCk7XHJcbiAgICBpZiAoaXNOYU4obnVtKSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy50ZXh0VmFsKSAqICh0aGlzLmlzTmVnYXRpdmUgPyAtMSA6IDEpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleXVwJywgWyckZXZlbnQnXSkga2V5RXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5rZXkubWF0Y2goJ1swLTldJykpIHtcclxuICAgICAgdGhpcy5wdXNoTnVtYmVyKGV2ZW50LmtleSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQua2V5Lm1hdGNoKCdbLC5dJykpIHtcclxuICAgICAgdGhpcy5wdXNoRGVjaW1hbFNlcGFyYXRvcigpO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgIC8vIEVudGVyIGNsaWNrXHJcbiAgICAgIHRoaXMuZG9uZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgpIHtcclxuICAgICAgLy8gQmFja3NwYWNlXHJcbiAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmlzTmVnYXRpdmUgPSB0aGlzLnZhbHVlIDwgMDtcclxuICAgICAgY29uc3QgcG9zaXRpdmVWYWx1ZSA9IHRoaXMudmFsdWUgKiAodGhpcy5pc05lZ2F0aXZlID8gLTEgOiAxKTtcclxuICAgICAgdGhpcy5udW1iZXJzID0gTnVtYmVySGVscGVyLnNldERlY2ltYWxQbGFjZXMoXHJcbiAgICAgICAgcG9zaXRpdmVWYWx1ZSxcclxuICAgICAgICB0aGlzLmRlY2ltYWxQbGFjZXNcclxuICAgICAgKVxyXG4gICAgICAgIC50b1N0cmluZygxMClcclxuICAgICAgICAuc3BsaXQoJycpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubWF4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5tYXggPD0gMCkge1xyXG4gICAgICB0aGlzLmlzTmVnYXRpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kZWNpbWFsU2VwID1cclxuICAgICAgdGhpcy5kZWNpbWFsU2VwYXJhdG9yICE9PSB1bmRlZmluZWRcclxuICAgICAgICA/IHRoaXMuZGVjaW1hbFNlcGFyYXRvclxyXG4gICAgICAgIDogdGhpcy5nZXREZWNpbWFsU2VwYXJhdG9yRm9yQnJvd3NlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXREZWNpbWFsU2VwYXJhdG9yRm9yQnJvd3NlcigpIHtcclxuICAgIHJldHVybiAoMS4xKS50b0xvY2FsZVN0cmluZygpLnN1YnN0cmluZygxLCAyKTtcclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIGRvbmUoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHtcclxuICAgICAgb2s6IHRydWUsXHJcbiAgICAgIHZhbHVlOiB0aGlzLm51bWJlclZhbFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVOZWdhdGl2ZSgpIHtcclxuICAgIGlmICh0aGlzLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMubWF4IDw9IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc05lZ2F0aXZlID0gIXRoaXMuaXNOZWdhdGl2ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TnVtYmVyT2ZEZWNpbWFscygpIHtcclxuICAgIGxldCBpc0RlY2ltYWwgPSBmYWxzZTtcclxuICAgIGxldCByZXN1bHQgPSAwO1xyXG4gICAgZm9yIChjb25zdCBpIG9mIHRoaXMubnVtYmVycykge1xyXG4gICAgICBpZiAoaXNEZWNpbWFsKSB7XHJcbiAgICAgICAgcmVzdWx0Kys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGkgPT09ICcuJykge1xyXG4gICAgICAgICAgaXNEZWNpbWFsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdXNoTnVtYmVyKHZhbDogc3RyaW5nKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZGVjaW1hbFBsYWNlcyA+IDAgJiZcclxuICAgICAgdGhpcy5nZXROdW1iZXJPZkRlY2ltYWxzKCkgPj0gdGhpcy5kZWNpbWFsUGxhY2VzXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubnVtYmVycy5wdXNoKHZhbCk7XHJcbiAgICBpZiAoXHJcbiAgICAgICh0aGlzLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMubnVtYmVyVmFsID4gdGhpcy5tYXgpIHx8XHJcbiAgICAgICh0aGlzLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMubnVtYmVyVmFsIDwgdGhpcy5taW4pXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5udW1iZXJzLnBvcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVzaERlY2ltYWxTZXBhcmF0b3IoKSB7XHJcbiAgICBpZiAodGhpcy5udW1iZXJzLmluZGV4T2YoJy4nKSA8IDApIHtcclxuICAgICAgdGhpcy5udW1iZXJzLnB1c2goJy4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5udW1iZXJzLnBvcCgpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSBVdG1Tb3VyY2Uge1xyXG4gIFNlbGVjdGVkSW5NYXAgPSAzNSxcclxuICBHUFMgPSA0MFxyXG59XHJcbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBLZHZTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9rZHYva2R2LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdrZHZEZXNjcmlwdGlvbidcclxufSlcclxuZXhwb3J0IGNsYXNzIEtkdkRlc2NyaXB0aW9uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUga2R2U2VydmljZTogS2R2U2VydmljZSkge31cclxuXHJcbiAgYXN5bmMgdHJhbnNmb3JtKFxyXG4gICAgdmFsdWU6IG51bWJlcixcclxuICAgIGtkdktleTogc3RyaW5nLFxyXG4gICAgcmV0dXJuRGVzY3JpcHRpb24gPSBmYWxzZVxyXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBrZHZlbGVtZW50cyA9IGF3YWl0IHRoaXMua2R2U2VydmljZVxyXG4gICAgICAuZ2V0S2R2UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZShrZHZLZXkpXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGtkdmVsZW1lbnQgPSBrZHZlbGVtZW50cy5maW5kKCh4KSA9PiB4LklkID09PSB2YWx1ZSk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBrZHZlbGVtZW50XHJcbiAgICAgID8gcmV0dXJuRGVzY3JpcHRpb25cclxuICAgICAgICA/IGtkdmVsZW1lbnQuRGVzY3JpcHRpb25cclxuICAgICAgICA6IGtkdmVsZW1lbnQuTmFtZVxyXG4gICAgICA6ICcnO1xyXG4gICAgcmV0dXJuIHJlc3VsdC50cmltKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnVtYmVySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9oZWxwZXJzL251bWJlci1oZWxwZXInO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdtZXRlcnNUb0NtJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWV0ZXJzVG9DbVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGVjaW1hbFBsYWNlcyA9IDIpOiBhbnkge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE51bWJlckhlbHBlci5zZXREZWNpbWFsUGxhY2VzKHZhbHVlICogMTAwLjAsIGRlY2ltYWxQbGFjZXMpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2RhdGUtaGVscGVyL2RhdGUtaGVscGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgSVN1bW1hcnlJdGVtIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdW1tYXJ5LWl0ZW0vc3VtbWFyeS1pdGVtLm1vZGVsJztcclxuaW1wb3J0IHsgVXNlckdyb3VwU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1ncm91cC91c2VyLWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZlckdyb3VwRHRvIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBSb3V0ZXJEaXJlY3Rpb24gfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdW1tYXJ5SXRlbVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkYXRlSGVscGVyU2VydmljZTogRGF0ZUhlbHBlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJHcm91cFNlcnZpY2U6IFVzZXJHcm91cFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdkNvbnRyb2xsZXI6IE5hdkNvbnRyb2xsZXJcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIGdldFN1bW1hcnlJdGVtcyhcclxuICAgIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbixcclxuICAgIHVzZXJHcm91cHM/OiBPYnNlcnZlckdyb3VwRHRvW11cclxuICApIHtcclxuICAgIGlmICghcmVnaXN0cmF0aW9uKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGNvbnN0IHVzZXJHcm91cHNUb1VzZSA9IHVzZXJHcm91cHNcclxuICAgICAgPyB1c2VyR3JvdXBzXHJcbiAgICAgIDogYXdhaXQgdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmdldFVzZXJHcm91cHMoKTtcclxuICAgIGNvbnN0IHN1bW1hcnlJdGVtczogSVN1bW1hcnlJdGVtW10gPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogcmVnaXN0cmF0aW9uLmlkLFxyXG4gICAgICAgIGhyZWY6ICcvcmVnaXN0cmF0aW9uL29icy1sb2NhdGlvbicsXHJcbiAgICAgICAgcXVlcnlQYXJhbXM6IHsgZ2VvSGF6YXJkOiByZWdpc3RyYXRpb24uZ2VvSGF6YXJkIH0sXHJcbiAgICAgICAgdGl0bGU6ICdSRUdJU1RSQVRJT04uT0JTX0xPQ0FUSU9OLlRJVExFJyxcclxuICAgICAgICBzdWJUaXRsZTogcmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb25cclxuICAgICAgICAgID8gcmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24uTG9jYXRpb25OYW1lIHx8XHJcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvY2F0aW9uRGVzY3JpcHRpb25cclxuICAgICAgICAgIDogJycsXHJcbiAgICAgICAgaGFzRGF0YTogIWlzRW1wdHkocmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24pXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogcmVnaXN0cmF0aW9uLmlkLFxyXG4gICAgICAgIGhyZWY6ICcvcmVnaXN0cmF0aW9uL3NldC10aW1lJyxcclxuICAgICAgICB0aXRsZTogJ1JFR0lTVFJBVElPTi5PVkVSVklFVy5EQVRFX0FORF9USU1FJyxcclxuICAgICAgICBzdWJUaXRsZTogcmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lXHJcbiAgICAgICAgICA/IGF3YWl0IHRoaXMuZGF0ZUhlbHBlclNlcnZpY2UuZm9ybWF0RGF0ZVN0cmluZyhcclxuICAgICAgICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICA6ICcnLFxyXG4gICAgICAgIGhhc0RhdGE6ICEhcmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lXHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgICBpZiAodXNlckdyb3Vwc1RvVXNlLmxlbmd0aCA+IDApIHtcclxuICAgICAgc3VtbWFyeUl0ZW1zLnB1c2goe1xyXG4gICAgICAgIGlkOiByZWdpc3RyYXRpb24uaWQsXHJcbiAgICAgICAgaHJlZjogJy9yZWdpc3RyYXRpb24vZ3JvdXAnLFxyXG4gICAgICAgIHRpdGxlOiAnUkVHSVNUUkFUSU9OLk9WRVJWSUVXLlNIQVJFX1dJVEhfR1JPVVAnLFxyXG4gICAgICAgIHN1YlRpdGxlOiB0aGlzLmdldE9ic2VydmF0aW9uR3JvdXBOYW1lKHJlZ2lzdHJhdGlvbiwgdXNlckdyb3Vwc1RvVXNlKSxcclxuICAgICAgICBoYXNEYXRhOiAhIXJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic2VydmVyR3JvdXBJRFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdW1tYXJ5SXRlbXMucHVzaCguLi4gYXdhaXQgdGhpcy5nZXRHZW9IYXphcmRJdGVtcyhyZWdpc3RyYXRpb24pKTtcclxuXHJcbiAgICBzdW1tYXJ5SXRlbXMucHVzaChcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9nZW5lcmFsLWNvbW1lbnQnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5HZW5lcmFsT2JzZXJ2YXRpb25cclxuICAgICAgICAgID8gcmVnaXN0cmF0aW9uLnJlcXVlc3QuR2VuZXJhbE9ic2VydmF0aW9uLk9ic0NvbW1lbnRcclxuICAgICAgICAgIDogJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkdlbmVyYWxPYnNlcnZhdGlvblxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBzdW1tYXJ5SXRlbXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcmV2aW91c0FuZE5leHQoXHJcbiAgICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sXHJcbiAgICB1cmw6IHN0cmluZ1xyXG4gICk6IFByb21pc2U8eyBwcmV2aW91czogSVN1bW1hcnlJdGVtOyBuZXh0OiBJU3VtbWFyeUl0ZW0gfT4ge1xyXG4gICAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gYXdhaXQgdGhpcy5nZXRTdW1tYXJ5SXRlbXMocmVnaXN0cmF0aW9uKTtcclxuICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gc3VtbWFyeUl0ZW1zLmZpbmQoKHgpID0+IHVybC5pbmRleE9mKHguaHJlZikgPj0gMCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7IHByZXZpb3VzOiB1bmRlZmluZWQsIG5leHQ6IHVuZGVmaW5lZCB9O1xyXG4gICAgaWYgKGN1cnJlbnRJdGVtKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gc3VtbWFyeUl0ZW1zLmluZGV4T2YoY3VycmVudEl0ZW0pO1xyXG4gICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgcmVzdWx0LnByZXZpb3VzID0gc3VtbWFyeUl0ZW1zW2luZGV4IC0gMV07XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV4dEluZGV4ID0gaW5kZXggKyAxO1xyXG4gICAgICBpZiAobmV4dEluZGV4IDwgc3VtbWFyeUl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgIHJlc3VsdC5uZXh0ID0gc3VtbWFyeUl0ZW1zW25leHRJbmRleF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvKFxyXG4gICAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLFxyXG4gICAgc3VtbWFyeUl0ZW06IElTdW1tYXJ5SXRlbSxcclxuICAgIGRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uID0gJ2ZvcndhcmQnXHJcbiAgKSB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtzdW1tYXJ5SXRlbS5ocmVmfS8ke3JlZ2lzdHJhdGlvbi5pZH1gO1xyXG4gICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnXHJcbiAgICAgID8gdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlRm9yd2FyZCh1cmwpXHJcbiAgICAgIDogdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlQmFjayh1cmwpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmF2aWdhdGVGb3J3YXJkKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgdXJsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHByZXZBbmROZXh0ID0gYXdhaXQgdGhpcy5nZXRQcmV2aW91c0FuZE5leHQocmVnaXN0cmF0aW9uLCB1cmwpO1xyXG4gICAgaWYgKHByZXZBbmROZXh0Lm5leHQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGVUbyhyZWdpc3RyYXRpb24sIHByZXZBbmROZXh0Lm5leHQsICdmb3J3YXJkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlUm9vdChcclxuICAgICAgICBgL3JlZ2lzdHJhdGlvbi9lZGl0LyR7cmVnaXN0cmF0aW9uLmlkfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T2JzZXJ2YXRpb25Hcm91cE5hbWUoXHJcbiAgICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sXHJcbiAgICB1c2VyR3JvdXBzOiBPYnNlcnZlckdyb3VwRHRvW11cclxuICApIHtcclxuICAgIGlmIChyZWdpc3RyYXRpb24gJiYgcmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzZXJ2ZXJHcm91cElEICYmIHVzZXJHcm91cHMpIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRHcm91cCA9IHVzZXJHcm91cHMuZmluZChcclxuICAgICAgICAoeCkgPT4geC5JZCA9PT0gcmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzZXJ2ZXJHcm91cElEXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChzZWxlY3RlZEdyb3VwKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkR3JvdXAuTmFtZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRHZW9IYXphcmRJdGVtcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHN3aXRjaCAocmVnaXN0cmF0aW9uLmdlb0hhemFyZCkge1xyXG4gICAgY2FzZSBHZW9IYXphcmQuV2F0ZXI6XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFdhdGVySXRlbXMocmVnaXN0cmF0aW9uKTtcclxuICAgIGNhc2UgR2VvSGF6YXJkLkljZTpcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0SWNlSXRlbXMocmVnaXN0cmF0aW9uKTtcclxuICAgIGNhc2UgR2VvSGF6YXJkLlNvaWw6XHJcbiAgICAgIHJldHVybiB0aGlzLmdldERpcnRJdGVtcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgY2FzZSBHZW9IYXphcmQuU25vdzpcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U25vd0l0ZW1zKHJlZ2lzdHJhdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGdldFdhdGVySXRlbXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL3dhdGVyL3dhdGVyLWxldmVsJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMlxyXG4gICAgICAgICAgPyByZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5Db21tZW50XHJcbiAgICAgICAgICA6ICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5XYXRlckxldmVsMlxyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL3dhdGVyL2RhbWFnZScsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5XQVRFUi5EQU1BR0UuVElUTEUnLFxyXG4gICAgICAgICcnLCAvLyB0aGlzLnJlZ2lzdHJhdGlvbi5EYW1hZ2VPYnMgPyB0aGlzLnJlZ2lzdHJhdGlvbi5EYW1hZ2VPYnMubWFwKCh4KSA9PiB4LkNvbW1lbnQpLmpvaW4oKSA6ICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5EYW1hZ2VPYnNcclxuICAgICAgKVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZ2V0UmVnSXRlbShcclxuICAgIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbixcclxuICAgIGhyZWY6IHN0cmluZyxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBzdWJUaXRsZTogc3RyaW5nLFxyXG4gICAgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWRcclxuICApOiBQcm9taXNlPElTdW1tYXJ5SXRlbT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IHJlZ2lzdHJhdGlvbi5pZCxcclxuICAgICAgaHJlZixcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIHN1YlRpdGxlLFxyXG4gICAgICBoYXNEYXRhOiBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UuaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMocmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQpLnBpcGUodGFrZSgxKSkudG9Qcm9taXNlKCksXHJcbiAgICAgIGF0dGFjaG1lbnRzOiBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UuZ2V0QWxsQXR0YWNobWVudHNGb3JSZWdpc3RyYXRpb25UaWQkKHJlZ2lzdHJhdGlvbi5pZCwgcmVnaXN0cmF0aW9uVGlkKS5waXBlKHRha2UoMSkpLnRvUHJvbWlzZSgpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXREaXJ0SXRlbXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2Rhbmdlci1vYnMnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5USVRMRScsXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkRhbmdlck9ic1xyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2RpcnQvbGFuZHNsaWRlLW9icycsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnNcclxuICAgICAgICAgID8gcmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkNvbW1lbnRcclxuICAgICAgICAgIDogJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkxhbmRTbGlkZU9ic1xyXG4gICAgICApXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRJY2VJdGVtcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UmVnSXRlbShcclxuICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgJy9yZWdpc3RyYXRpb24vaWNlL2ljZS1jb3ZlcicsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5JQ0UuSUNFX0NPVkVSLlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VDb3Zlck9ic1xyXG4gICAgICAgICAgPyByZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VDb3Zlck9icy5Db21tZW50XHJcbiAgICAgICAgICA6ICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5JY2VDb3Zlck9ic1xyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2ljZS9pY2UtdGhpY2tuZXNzJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3NcclxuICAgICAgICAgID8gcmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkNvbW1lbnRcclxuICAgICAgICAgIDogJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkljZVRoaWNrbmVzc1xyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2Rhbmdlci1vYnMnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5USVRMRScsXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkRhbmdlck9ic1xyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2luY2lkZW50JyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLklOQ0lERU5ULlRJVExFJyxcclxuICAgICAgICAnJyxcclxuICAgICAgICBSZWdpc3RyYXRpb25UaWQuSW5jaWRlbnRcclxuICAgICAgKVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZ2V0U25vd0l0ZW1zKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbikge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9kYW5nZXItb2JzJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5EYW5nZXJPYnNcclxuICAgICAgKSxcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9zbm93L2F2YWxhbmNoZS1vYnMnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLlRJVExFJyxcclxuICAgICAgICAnJyxcclxuICAgICAgICBSZWdpc3RyYXRpb25UaWQuQXZhbGFuY2hlT2JzXHJcbiAgICAgICksXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UmVnSXRlbShcclxuICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgJy9yZWdpc3RyYXRpb24vc25vdy9hdmFsYW5jaGUtYWN0aXZpdHknLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5BdmFsYW5jaGVBY3Rpdml0eU9iczJcclxuICAgICAgKSxcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9zbm93L3dlYXRoZXInLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5XRUFUSEVSLlRJVExFJyxcclxuICAgICAgICAnJyxcclxuICAgICAgICBSZWdpc3RyYXRpb25UaWQuV2VhdGhlck9ic2VydmF0aW9uXHJcbiAgICAgICksXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UmVnSXRlbShcclxuICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgJy9yZWdpc3RyYXRpb24vc25vdy9zbm93LXN1cmZhY2UnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1NVUkZBQ0UuVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5Tbm93U3VyZmFjZU9ic2VydmF0aW9uXHJcbiAgICAgICksXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UmVnSXRlbShcclxuICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgJy9yZWdpc3RyYXRpb24vc25vdy9jb21wcmVzc2lvbi10ZXN0JyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLlNOT1cuQ09NUFJFU1NJT05fVEVTVC5USVRMRScsXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkNvbXByZXNzaW9uVGVzdFxyXG4gICAgICApLFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IHJlZ2lzdHJhdGlvbi5pZCxcclxuICAgICAgICBocmVmOiAnL3JlZ2lzdHJhdGlvbi9zbm93L3Nub3ctcHJvZmlsZScsXHJcbiAgICAgICAgdGl0bGU6ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuVElUTEUnLFxyXG4gICAgICAgIHN1YlRpdGxlOiAnJyxcclxuICAgICAgICBoYXNEYXRhOlxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgICAgIFJlZ2lzdHJhdGlvblRpZC5Tbm93UHJvZmlsZTJcclxuICAgICAgICAgICkucGlwZSh0YWtlKDEpKS50b1Byb21pc2UoKSB8fFxyXG4gICAgICAgICAgKHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkNvbXByZXNzaW9uVGVzdCAmJlxyXG4gICAgICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5Db21wcmVzc2lvblRlc3Quc29tZShcclxuICAgICAgICAgICAgICAoeCkgPT4geC5JbmNsdWRlSW5Tbm93UHJvZmlsZSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICApKSxcclxuICAgICAgICBhdHRhY2htZW50czogYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLmdldEFsbEF0dGFjaG1lbnRzRm9yUmVnaXN0cmF0aW9uVGlkJChcclxuICAgICAgICAgIHJlZ2lzdHJhdGlvbi5pZCxcclxuICAgICAgICAgIFJlZ2lzdHJhdGlvblRpZC5Tbm93UHJvZmlsZTJcclxuICAgICAgICApLnBpcGUodGFrZSgxKSkudG9Qcm9taXNlKClcclxuICAgICAgfSxcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9zbm93L2F2YWxhbmNoZS1wcm9ibGVtJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5BdmFsYW5jaGVFdmFsUHJvYmxlbTJcclxuICAgICAgKSxcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9zbm93L2F2YWxhbmNoZS1ldmFsdWF0aW9uJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX0VWQUxVQVRJT04uVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5BdmFsYW5jaGVFdmFsdWF0aW9uM1xyXG4gICAgICApXHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNhdmVBbmRHb0JhY2tCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2F2ZS1hbmQtZ28tYmFjay1idXR0b24vc2F2ZS1hbmQtZ28tYmFjay1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGV4dENvbW1lbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dC1jb21tZW50L3RleHQtY29tbWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBZGRQaWN0dXJlSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hZGQtcGljdHVyZS1pdGVtL2FkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgS2R2UmFkaW9idXR0b25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2tkdi1yYWRpb2J1dHRvbi1saXN0L2tkdi1yYWRpb2J1dHRvbi1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25CdXR0b25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24tYnV0dG9ucy9uYXZpZ2F0aW9uLWJ1dHRvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zZXQtbG9jYXRpb24taW4tbWFwL3NldC1sb2NhdGlvbi1pbi1tYXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwTW9kdWxlIH0gZnJvbSAnLi4vbWFwL21hcC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBCYXNlNjRJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9iYXNlNjQtaW1hZ2UvYmFzZTY0LWltYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEtkdkRlc2NyaXB0aW9uUGlwZSB9IGZyb20gJy4vcGlwZXMva2R2LWRlc2NyaXB0aW9uLnBpcGUnO1xyXG5pbXBvcnQgeyBBZGRXZWJVcmxJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FkZC13ZWItdXJsLWl0ZW0vYWRkLXdlYi11cmwtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb2RhbFNhdmVPckRlbGV0ZUJ1dHRvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucy9tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEV4cG9zZWRIZWlnaHRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc25vdy9leHBvc2VkLWhlaWdodC9leHBvc2VkLWhlaWdodC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWYWxpZEV4cG9zaXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc25vdy92YWxpZC1leHBvc2l0aW9uL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uQ29udGVudFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlci9yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEhlbHBUZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlbHAtdGV4dC9oZWxwLXRleHQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSGVscE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4vcGFnZXMvbW9kYWwtcGFnZXMvaGVscC1tb2RhbC9oZWxwLW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFllc05vU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3llcy1uby1zZWxlY3QveWVzLW5vLXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOdW1lcmljSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbnVtZXJpYy1pbnB1dC9udW1lcmljLWlucHV0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE51bWVyaWNJbnB1dE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4vcGFnZXMvbW9kYWwtcGFnZXMvbnVtZXJpYy1pbnB1dC1tb2RhbC9udW1lcmljLWlucHV0LW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IE1ldGVyc1RvQ21QaXBlIH0gZnJvbSAnLi9waXBlcy9tZXRlcnMtdG8tY20ucGlwZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc25vdy9jb21wcmVzc2lvbi10ZXN0LWxpc3QvY29tcHJlc3Npb24tdGVzdC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEtkdlNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9rZHYtc2VsZWN0L2tkdi1zZWxlY3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQmxvYkltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Jsb2ItaW1hZ2UvYmxvYi1pbWFnZS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICBNYXBNb2R1bGUsXHJcbiAgICBIZWxwTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgTnVtZXJpY0lucHV0TW9kYWxQYWdlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICBNYXBNb2R1bGUsXHJcbiAgICBTYXZlQW5kR29CYWNrQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgQWRkUGljdHVyZUl0ZW1Db21wb25lbnQsXHJcbiAgICBUZXh0Q29tbWVudENvbXBvbmVudCxcclxuICAgIEtkdlJhZGlvYnV0dG9uTGlzdENvbXBvbmVudCxcclxuICAgIE5hdmlnYXRpb25CdXR0b25zQ29tcG9uZW50LFxyXG4gICAgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCxcclxuICAgIEJhc2U2NEltYWdlQ29tcG9uZW50LFxyXG4gICAgS2R2RGVzY3JpcHRpb25QaXBlLFxyXG4gICAgTWV0ZXJzVG9DbVBpcGUsXHJcbiAgICBBZGRXZWJVcmxJdGVtQ29tcG9uZW50LFxyXG4gICAgTW9kYWxTYXZlT3JEZWxldGVCdXR0b25zQ29tcG9uZW50LFxyXG4gICAgRXhwb3NlZEhlaWdodENvbXBvbmVudCxcclxuICAgIFZhbGlkRXhwb3NpdGlvbkNvbXBvbmVudCxcclxuICAgIFJlZ2lzdHJhdGlvbkNvbnRlbnRXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgSGVscFRleHRDb21wb25lbnQsXHJcbiAgICBIZWxwTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgWWVzTm9TZWxlY3RDb21wb25lbnQsXHJcbiAgICBOdW1lcmljSW5wdXRDb21wb25lbnQsXHJcbiAgICBOdW1lcmljSW5wdXRNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBDb21wcmVzc2lvblRlc3RMaXN0Q29tcG9uZW50LFxyXG4gICAgS2R2U2VsZWN0Q29tcG9uZW50LFxyXG4gICAgQmxvYkltYWdlQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTYXZlQW5kR29CYWNrQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgQWRkUGljdHVyZUl0ZW1Db21wb25lbnQsXHJcbiAgICBUZXh0Q29tbWVudENvbXBvbmVudCxcclxuICAgIEtkdlJhZGlvYnV0dG9uTGlzdENvbXBvbmVudCxcclxuICAgIE5hdmlnYXRpb25CdXR0b25zQ29tcG9uZW50LFxyXG4gICAgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCxcclxuICAgIEJhc2U2NEltYWdlQ29tcG9uZW50LFxyXG4gICAgS2R2RGVzY3JpcHRpb25QaXBlLFxyXG4gICAgTWV0ZXJzVG9DbVBpcGUsXHJcbiAgICBBZGRXZWJVcmxJdGVtQ29tcG9uZW50LFxyXG4gICAgTW9kYWxTYXZlT3JEZWxldGVCdXR0b25zQ29tcG9uZW50LFxyXG4gICAgRXhwb3NlZEhlaWdodENvbXBvbmVudCxcclxuICAgIFZhbGlkRXhwb3NpdGlvbkNvbXBvbmVudCxcclxuICAgIFJlZ2lzdHJhdGlvbkNvbnRlbnRXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgSGVscFRleHRDb21wb25lbnQsXHJcbiAgICBZZXNOb1NlbGVjdENvbXBvbmVudCxcclxuICAgIE51bWVyaWNJbnB1dENvbXBvbmVudCxcclxuICAgIENvbXByZXNzaW9uVGVzdExpc3RDb21wb25lbnQsXHJcbiAgICBLZHZTZWxlY3RDb21wb25lbnQsXHJcbiAgICBCbG9iSW1hZ2VDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIHt9XHJcbiJdfQ==