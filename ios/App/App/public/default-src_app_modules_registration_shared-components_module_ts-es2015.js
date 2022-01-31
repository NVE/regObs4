"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["default-src_app_modules_registration_shared-components_module_ts"],{

/***/ 69579:
/*!*************************************************!*\
  !*** ./src/app/core/helpers/is-empty.helper.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IsEmptyHelper": function() { return /* binding */ IsEmptyHelper; }
/* harmony export */ });
const stringify = __webpack_require__(/*! json-stringify-safe */ 73050);
class IsEmptyHelper {
    static isEmpty(obj) {
        if (obj === null || obj === undefined) {
            return true;
        }
        else if (typeof obj === 'string') {
            return obj.length === 0;
        }
        else if (typeof obj === 'number' || typeof obj === 'boolean') {
            return false;
        }
        else if (obj instanceof Array) {
            const arr = obj;
            return arr.length === 0 || !arr.some((x) => !IsEmptyHelper.isEmpty(x));
        }
        else {
            const props = Object.getOwnPropertyNames(obj);
            if (props.length === 0) {
                return stringify(obj) === '{}';
            }
            else {
                return !props.some((x) => !IsEmptyHelper.isEmpty(obj[x]));
            }
        }
    }
}


/***/ }),

/***/ 5361:
/*!************************************************************!*\
  !*** ./src/app/core/services/location/location.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocationService": function() { return /* binding */ LocationService; }
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var _modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../modules/auth/services/regobs-auth.service */ 18955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @varsom-regobs-common/regobs-api */ 39778);






class LocationService {
    constructor(regobsAuthService, apiLocationService) {
        this.regobsAuthService = regobsAuthService;
        this.apiLocationService = apiLocationService;
    }
    getLocationWithinRadiusObservable(geoHazard, lat, lng, radius) {
        return this.regobsAuthService.loggedInUser$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.switchMap)((loggedInUser) => this.apiLocationService.LocationWithinRadius({
            geoHazardTypeIds: [geoHazard],
            radius,
            latitude: lat,
            longitude: lng,
            observerGuid: null,
            returnCount: 100
        })));
    }
}
LocationService.ɵfac = function LocationService_Factory(t) { return new (t || LocationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_3__.LocationService)); };
LocationService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: LocationService, factory: LocationService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3942:
/*!****************************************************************!*\
  !*** ./src/app/core/services/user-group/user-group.service.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserGroupService": function() { return /* binding */ UserGroupService; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../user-setting/user-setting.service */ 22276);
/* harmony import */ var _nanosql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../nanosql */ 20580);
/* harmony import */ var _modules_data_load_services_data_load_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../modules/data-load/services/data-load.service */ 97123);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 73794);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 9553);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../modules/auth/services/regobs-auth.service */ 18955);
/* harmony import */ var _nano_sql_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nano-sql/core */ 43268);
/* harmony import */ var _nano_sql_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nano_sql_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @varsom-regobs-common/regobs-api */ 39778);















class UserGroupService {
    constructor(regobsAuthService, userSettingService, accountApiService, dataLoadService) {
        this.regobsAuthService = regobsAuthService;
        this.userSettingService = userSettingService;
        this.accountApiService = accountApiService;
        this.dataLoadService = dataLoadService;
    }
    updateUserGroups() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const loggedInUser = yield this.regobsAuthService.getLoggedInUserAsPromise();
            if (loggedInUser.isLoggedIn) {
                const appMode = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.firstValueFrom)(this.userSettingService.appMode$);
                yield this.checkLastUpdatedAndUpdateDataIfNeeded(appMode, loggedInUser.email);
            }
        });
    }
    checkLastUpdatedAndUpdateDataIfNeeded(appMode, email) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const dataLoadId = this.getDataLoadId(appMode, email);
            const dataLoad = yield this.dataLoadService.getState(dataLoadId);
            const lastUpdateLimit = moment__WEBPACK_IMPORTED_MODULE_3___default()().subtract(1, 'hour');
            if (!dataLoad.lastUpdated ||
                moment__WEBPACK_IMPORTED_MODULE_3___default()(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
                yield this.updateUserGroupsForUser(appMode, email);
            }
        });
    }
    updateUserGroupsForUser(appMode, email) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const dataLoadId = this.getDataLoadId(appMode, email);
            yield this.dataLoadService.startLoading(dataLoadId);
            const result = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.lastValueFrom)(this.accountApiService
                .AccountGetObserverGroups());
            this.saveUserGroups(appMode, email, result);
            yield this.dataLoadService.loadingCompleted(dataLoadId, result.length);
        });
    }
    saveUserGroups(appMode, email, observerGroups) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const userGroups = (observerGroups || []).map((val) => {
                return {
                    key: `${email}_${val.Id}`,
                    userId: email,
                    Id: val.Id,
                    Name: val.Name
                };
            });
            const instanceName = _nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.getInstanceName(_nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.TABLES.OBSERVER_GROUPS.name, appMode);
            yield (0,_nano_sql_core__WEBPACK_IMPORTED_MODULE_5__.nSQL)(instanceName).loadJS(userGroups);
            yield this.deleteUserGroupsNoLongerInResult(appMode, userGroups.map((ug) => ug.key));
        });
    }
    deleteUserGroupsNoLongerInResult(appMode, ids) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            yield _nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.getInstance(_nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
                .query('delete')
                .where((dbGroup) => ids.indexOf(dbGroup.key) < 0)
                .exec();
        });
    }
    getDataLoadId(appMode, email) {
        return `${_nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.TABLES.OBSERVER_GROUPS.name}_${appMode}_${email}`;
    }
    getUserGroupsAsObservable() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([
            this.regobsAuthService.loggedInUser$,
            this.userSettingService.appMode$
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(([loggedInUser, appMode]) => loggedInUser.isLoggedIn
            ? (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.from)(this.getUserGroupsFromDb(appMode, loggedInUser.email))
            : (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.from)(Promise.resolve([]))));
    }
    getUserGroups() {
        return this.getUserGroupsAsObservable().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.take)(1)).toPromise();
    }
    getUserGroupsFromDb(appMode, email) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            return _nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.getInstance(_nanosql__WEBPACK_IMPORTED_MODULE_1__.NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
                .query('select')
                .where((x) => x.userId === email)
                .exec();
        });
    }
}
UserGroupService.ɵfac = function UserGroupService_Factory(t) { return new (t || UserGroupService)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_4__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_14__.AccountService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_modules_data_load_services_data_load_service__WEBPACK_IMPORTED_MODULE_2__.DataLoadService)); };
UserGroupService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({ token: UserGroupService, factory: UserGroupService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 47434:
/*!**************************************************************!*\
  !*** ./src/app/modules/map/helpers/leaflet-cluser.helper.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeafletClusterHelper": function() { return /* binding */ LeafletClusterHelper; }
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../settings */ 30015);


class LeafletClusterHelper {
    static createMarkerClusterGroup(options) {
        const defaultOptions = {
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            maxClusterRadius: _settings__WEBPACK_IMPORTED_MODULE_1__.settings.map.maxClusterRadius,
            iconCreateFunction: LeafletClusterHelper.createClusterIcon
        };
        return leaflet__WEBPACK_IMPORTED_MODULE_0__.markerClusterGroup(Object.assign(Object.assign({}, defaultOptions), (options || {})));
    }
    static createClusterIcon(cluster) {
        const length = cluster.getAllChildMarkers().length;
        const size = length < 100 ? 35 : length < 1000 ? 50 : 70;
        return leaflet__WEBPACK_IMPORTED_MODULE_0__.divIcon({
            html: '<div>' + length + '</div>',
            iconSize: [size, size],
            iconAnchor: [size / 2.0, size / 2.0],
            className: 'circle-marker-cluster'
        });
    }
}


/***/ }),

/***/ 26869:
/*!************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/add-picture-item/add-picture-item.component.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddPictureItemComponent": function() { return /* binding */ AddPictureItemComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/camera/ngx */ 34483);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../settings */ 30015);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/helpers/data-url.helper */ 78872);
/* harmony import */ var _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/ionic-webview/ngx */ 73039);
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/file/ngx */ 18659);
/* harmony import */ var _shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/services/logging/logging.service */ 93042);
/* harmony import */ var _shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/services/logging/log-level.model */ 73465);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 47599);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 32185);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 34864);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../blob-image/blob-image.component */ 44037);
/* harmony import */ var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../text-comment/text-comment.component */ 32032);






























function AddPictureItemComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "ro-blob-image", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-fab", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-fab-button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddPictureItemComponent_div_1_Template_ion_fab_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r4); const attachment_r1 = restoredCtx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r3.removeImage(attachment_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](4, "ion-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "app-text-comment", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function AddPictureItemComponent_div_1_Template_app_text_comment_valueChange_5_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r4); const attachment_r1 = restoredCtx.$implicit; return attachment_r1.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const attachment_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("imgBlob", attachment_r1.blob);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 4, ctx_r0.pictureCommentText));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](7, 6, ctx_r0.pictureCommentPlaceholder));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", attachment_r1.Comment);
} }
const DEBUG_TAG = 'AddPictureItemComponent';
const MIME_TYPE = 'image/jpeg';
class AddPictureItemComponent extends src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_9__.NgDestoryBase {
    constructor(translateService, camera, platform, file, logger, webView, toastController, domSanitizer, actionSheetController, newAttachmentService, cdr) {
        super();
        this.translateService = translateService;
        this.camera = camera;
        this.platform = platform;
        this.file = file;
        this.logger = logger;
        this.webView = webView;
        this.toastController = toastController;
        this.domSanitizer = domSanitizer;
        this.actionSheetController = actionSheetController;
        this.newAttachmentService = newAttachmentService;
        this.cdr = cdr;
        this.title = 'REGISTRATION.ADD_IMAGES';
        this.pictureCommentText = 'REGISTRATION.IMAGE_DESCRIPTION';
        this.pictureCommentPlaceholder = 'REGISTRATION.IMAGE_DESCRIPTION_PLACEHOLDER';
        this.icon = 'camera';
        this.showIcon = true;
        this.iconColor = 'dark';
        this.attachmentType = 'Attachment';
    }
    ngOnInit() {
        this.newAttachmentService
            .getAttachments(this.registrationId)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)((attachments) => attachments.filter((a) => a.RegistrationTID === this.registrationTid && a.type === this.attachmentType && a.ref === this.ref)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)((attachments) => attachments.length === 0
            ? (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.of)([])
            : (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.forkJoin)([
                ...attachments.map((a) => this.newAttachmentService.getBlob(this.registrationId, a.id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)((blob) => (Object.assign(Object.assign({}, a), { blob }))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.catchError)((err) => {
                    this.logger.error(err, DEBUG_TAG, 'Could not get blob from attachment');
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.of)(Object.assign(Object.assign({}, a), { blob: undefined }));
                })))
            ])), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.takeUntil)(this.ngDestroy$))
            .subscribe((result) => {
            this.attachments = result;
            this.cdr.detectChanges();
        });
    }
    addClick() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, function* () {
            if (this.onBeforeAdd !== undefined) {
                yield Promise.resolve(this.onBeforeAdd());
            }
            const translations = yield this.translateService
                .get([
                'REGISTRATION.GENERAL_COMMENT.ADD_PICTURE',
                'REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO',
                'REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY',
                'DIALOGS.CANCEL'
            ])
                .toPromise();
            const actionSheet = yield this.actionSheetController.create({
                header: translations['REGISTRATION.GENERAL_COMMENT.ADD_PICTURE'],
                buttons: [
                    {
                        text: translations['REGISTRATION.GENERAL_COMMENT.TAKE_NEW_PHOTO'],
                        handler: () => this.getPicture(this.camera.PictureSourceType.CAMERA)
                    },
                    {
                        text: translations['REGISTRATION.GENERAL_COMMENT.CHOOSE_FROM_LIBRARY'],
                        handler: () => this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY)
                    },
                    {
                        text: translations['DIALOGS.CANCEL'],
                        role: 'cancel'
                    }
                ]
            });
            actionSheet.present();
        });
    }
    getPicture(sourceType) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.platform.is('hybrid')) {
                yield this.addDummyImage();
                return true;
            }
            try {
                const options = {
                    quality: _settings__WEBPACK_IMPORTED_MODULE_1__.settings.images.quality,
                    destinationType: this.camera.DestinationType.FILE_URI,
                    sourceType: sourceType,
                    encodingType: this.camera.EncodingType.JPEG,
                    mediaType: this.camera.MediaType.PICTURE,
                    targetHeight: _settings__WEBPACK_IMPORTED_MODULE_1__.settings.images.size,
                    targetWidth: _settings__WEBPACK_IMPORTED_MODULE_1__.settings.images.size,
                    correctOrientation: true,
                    saveToPhotoAlbum: sourceType === _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_0__.PictureSourceType.CAMERA
                    // NOTE: saveToPhotoAlbum=true causes a bug in latest cordova cameraplugin
                };
                const imageUrl = yield this.camera.getPicture(options);
                if (!(yield this.validateImage(imageUrl))) {
                    this.showErrorToast('REGISTRATION.INVALID_IMAGE'); //TODO: Vis bedre feilmelding
                    return true;
                }
                this.logger.debug(`Got image url from camera plugin: ${imageUrl}`, DEBUG_TAG);
                const arrayBuffer = yield this.getArrayBuffer(imageUrl);
                yield this.addImage(new Blob([arrayBuffer]), MIME_TYPE);
            }
            catch (err) {
                this.logger.log('User could not add image, most likely no access or invalid image', err, _shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_8__.LogLevel.Warning, DEBUG_TAG);
                this.showErrorToast('Could not save image. Do you have enough space?'); //TODO: Vis bedre feilmelding og på flere språk
            }
            return true;
        });
    }
    getArrayBuffer(fileUrl) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, function* () {
            const entry = yield this.file.resolveLocalFilesystemUrl(fileUrl);
            if (!entry.isFile) {
                throw Error(`${fileUrl} is not a file!`);
            }
            const pathSplitted = entry.nativeURL.split('/');
            const filename = pathSplitted.pop();
            const directory = pathSplitted.join('/');
            const arrayBuffer = yield this.file.readAsArrayBuffer(directory, filename);
            return arrayBuffer;
        });
    }
    validateImage(src) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, function* () {
            if (src) {
                const entry = yield this.file.resolveLocalFilesystemUrl(src);
                return entry.name.endsWith('jpg');
            }
            return false;
        });
    }
    showErrorToast(messageKey) {
        this.translateService.get(messageKey).subscribe((translation) => (0,tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: translation,
                mode: 'md',
                duration: 4000
            });
            toast.present();
        }));
    }
    addDummyImage() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, function* () {
            const dummyImage = yield _core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__.DataUrlHelper.getDataUrlFromSrcUrl('/assets/images/dummyregobsimage.jpeg');
            const blob = _core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__.DataUrlHelper.convertDataURIToBinary(dummyImage);
            yield this.addImage(new Blob([blob]), 'image/jpeg');
        });
    }
    addImage(data, mimeType) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_20__.__awaiter)(this, void 0, void 0, function* () {
            yield this.newAttachmentService.addAttachment(this.registrationId, data, mimeType, this.geoHazard, this.registrationTid, this.attachmentType, this.ref);
        });
    }
    removeImage(image) {
        this.newAttachmentService.removeAttachment(this.registrationId, image.id);
    }
}
AddPictureItemComponent.ɵfac = function AddPictureItemComponent_Factory(t) { return new (t || AddPictureItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_0__.Camera), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_22__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_6__.File), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_7__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_5__.WebView), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_22__.ToastController), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_22__.ActionSheetController), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__.NewAttachmentService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.ChangeDetectorRef)); };
AddPictureItemComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: AddPictureItemComponent, selectors: [["app-add-picture-item"]], inputs: { registrationId: "registrationId", registrationTid: "registrationTid", geoHazard: "geoHazard", title: "title", pictureCommentText: "pictureCommentText", pictureCommentPlaceholder: "pictureCommentPlaceholder", icon: "icon", showIcon: "showIcon", iconColor: "iconColor", onBeforeAdd: "onBeforeAdd", attachmentType: "attachmentType", ref: "ref" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]], decls: 7, vars: 6, consts: [[1, "images"], ["class", "image-wrapper", 4, "ngFor", "ngForOf"], [3, "click"], ["slot", "start", 3, "color", "name"], [1, "image-wrapper"], [3, "imgBlob"], ["slot", "fixed", "vertical", "top", "horizontal", "end", 1, "ion-no-margin"], ["size", "small", "color", "dark", 1, "map-control-fab", 3, "click"], ["name", "close"], ["rows", "2", 3, "value", "title", "placeholder", "valueChange"]], template: function AddPictureItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, AddPictureItemComponent_div_1_Template, 8, 8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-item", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AddPictureItemComponent_Template_ion_item_click_2_listener() { return ctx.addClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "ion-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx.attachments);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", ctx.iconColor)("name", ctx.icon);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 4, ctx.title));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonLabel, _blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_10__.BlobImageComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonFab, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonFabButton, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__.TextCommentComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe], styles: [".images[_ngcontent-%COMP%] {\n  padding-top: 0px;\n  padding-top: var(--images-padding-top, 0px);\n  padding-bottom: 0px;\n  padding-bottom: var(--images-padding-bottom, 0px);\n  background: inherit;\n  background: var(--images-background, inherit);\n}\n.images[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  padding-bottom: 0px;\n  padding-bottom: var(--image-wrapper-padding-bottom, 0px);\n  margin-left: 0px;\n  margin-left: var(--image-wrapper-margin-left, 0px);\n  margin-right: 0px;\n  margin-right: var(--image-wrapper-margin-right, 0px);\n  background: inherit;\n  background: var(--image-wrapper-background, inherit);\n}\n.images[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   app-text-comment[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: -5px;\n  --ion-item-background: var(--image-comment-background, #fff);\n}\n.images[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   ion-fab-button[_ngcontent-%COMP%] {\n  padding: 8px;\n  margin: unset;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtFQUFBLDJDQUFBO0VBQ0EsbUJBQUE7RUFBQSxpREFBQTtFQUNBLG1CQUFBO0VBQUEsNkNBQUE7QUFDSjtBQUFJO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUFBLHdEQUFBO0VBQ0EsZ0JBQUE7RUFBQSxrREFBQTtFQUNBLGlCQUFBO0VBQUEsb0RBQUE7RUFDQSxtQkFBQTtFQUFBLG9EQUFBO0FBRVI7QUFBUTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLDREQUFBO0FBRVo7QUFDUTtFQUNJLFlBQUE7RUFDQSxhQUFBO0FBQ1oiLCJmaWxlIjoiYWRkLXBpY3R1cmUtaXRlbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWFnZXMge1xyXG4gICAgcGFkZGluZy10b3A6IHZhcigtLWltYWdlcy1wYWRkaW5nLXRvcCwgMHB4KTtcclxuICAgIHBhZGRpbmctYm90dG9tOiB2YXIoLS1pbWFnZXMtcGFkZGluZy1ib3R0b20sIDBweCk7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pbWFnZXMtYmFja2dyb3VuZCwgaW5oZXJpdCk7XHJcbiAgICAuaW1hZ2Utd3JhcHBlciB7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiB2YXIoLS1pbWFnZS13cmFwcGVyLXBhZGRpbmctYm90dG9tLCAwcHgpO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1pbWFnZS13cmFwcGVyLW1hcmdpbi1sZWZ0LCAwcHgpO1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogdmFyKC0taW1hZ2Utd3JhcHBlci1tYXJnaW4tcmlnaHQsIDBweCk7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW1hZ2Utd3JhcHBlci1iYWNrZ3JvdW5kLCBpbmhlcml0KTtcclxuXHJcbiAgICAgICAgYXBwLXRleHQtY29tbWVudCB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtNXB4O1xyXG4gICAgICAgICAgICAtLWlvbi1pdGVtLWJhY2tncm91bmQ6ICB2YXIoLS1pbWFnZS1jb21tZW50LWJhY2tncm91bmQsICNmZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW9uLWZhYi1idXR0b24ge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICAgICAgICAgIG1hcmdpbjogdW5zZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19 */"], changeDetection: 0 });


/***/ }),

/***/ 15248:
/*!************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/add-web-url-item/add-web-url-item.component.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddWebUrlItemComponent": function() { return /* binding */ AddWebUrlItemComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _pages_add_web_url_modal_add_web_url_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/add-web-url-modal/add-web-url-modal.page */ 47687);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 70325);








function AddWebUrlItemComponent_ion_item_0_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const url_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", url_r1.UrlDescription, " - ");
} }
function AddWebUrlItemComponent_ion_item_0_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AddWebUrlItemComponent_ion_item_0_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const i_r2 = restoredCtx.index; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r5.addOrEdit(i_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, AddWebUrlItemComponent_ion_item_0_span_2_Template, 2, 1, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const url_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", url_r1.UrlDescription);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](url_r1.UrlLine);
} }
class AddWebUrlItemComponent {
    constructor(modalController, zone) {
        this.modalController = modalController;
        this.zone = zone;
        this.title = 'REGISTRATION.ADD_WEB_URL.TITLE';
        this.weburlsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.icon = 'add-circle-outline';
        this.iconColor = 'dark';
    }
    ngOnInit() { }
    addOrEdit(index) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            const weburl = index !== undefined ? this.weburls[index] : undefined;
            const modal = yield this.modalController.create({
                component: _pages_add_web_url_modal_add_web_url_modal_page__WEBPACK_IMPORTED_MODULE_0__.AddWebUrlModalPage,
                componentProps: { weburl }
            });
            modal.present();
            const result = yield modal.onDidDismiss();
            if (result.data) {
                if (result.data.delete) {
                    this.removeAtIndex(index);
                }
                else {
                    if (index !== undefined) {
                        this.setWebUrl(index, result.data);
                    }
                    else {
                        this.addWebUrl(result.data);
                    }
                }
            }
        });
    }
    setWebUrl(index, url) {
        this.zone.run(() => {
            this.weburls[index] = url;
            this.weburlsChange.emit(this.weburls);
        });
    }
    addWebUrl(url) {
        this.zone.run(() => {
            if (!this.weburls) {
                this.weburls = [];
            }
            this.weburls.push(url);
            this.weburlsChange.emit(this.weburls);
        });
    }
    removeAtIndex(index) {
        this.zone.run(() => {
            if (this.weburls && this.weburls.length > 0) {
                this.weburls.splice(index, 1);
                this.weburlsChange.emit(this.weburls);
            }
        });
    }
}
AddWebUrlItemComponent.ɵfac = function AddWebUrlItemComponent_Factory(t) { return new (t || AddWebUrlItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone)); };
AddWebUrlItemComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AddWebUrlItemComponent, selectors: [["app-add-web-url-item"]], inputs: { title: "title", weburls: "weburls", icon: "icon", iconColor: "iconColor" }, outputs: { weburlsChange: "weburlsChange" }, decls: 6, vars: 6, consts: [[3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["slot", "start", 3, "color", "name"], [4, "ngIf"]], template: function AddWebUrlItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AddWebUrlItemComponent_ion_item_0_Template, 4, 2, "ion-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AddWebUrlItemComponent_Template_ion_item_click_1_listener() { return ctx.addOrEdit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "ion-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.weburls);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", ctx.iconColor)("name", ctx.icon);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 4, ctx.title));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtd2ViLXVybC1pdGVtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 30922:
/*!****************************************************************************************!*\
  !*** ./src/app/modules/registration/components/base64-image/base64-image.component.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base64ImageComponent": function() { return /* binding */ Base64ImageComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 71570);



class Base64ImageComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.dataUrlTag = 'data:image/jpeg;base64,';
    }
    ngOnInit() {
        const applyImageUrlTag = !this.base64encodedImage.startsWith('data:image');
        this.imgSrc = this.sanitizer.bypassSecurityTrustUrl((applyImageUrlTag ? this.dataUrlTag : '') + this.base64encodedImage);
    }
}
Base64ImageComponent.ɵfac = function Base64ImageComponent_Factory(t) { return new (t || Base64ImageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer)); };
Base64ImageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Base64ImageComponent, selectors: [["app-base64-image"]], inputs: { base64encodedImage: "base64encodedImage", dataUrlTag: "dataUrlTag" }, decls: 1, vars: 1, consts: [[3, "src"]], template: function Base64ImageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiYXNlNjQtaW1hZ2UuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 44037:
/*!************************************************************************************!*\
  !*** ./src/app/modules/registration/components/blob-image/blob-image.component.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlobImageComponent": function() { return /* binding */ BlobImageComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 71570);



class BlobImageComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ngOnInit() {
        this.blobUrl = URL.createObjectURL(this.imgBlob);
        this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(this.blobUrl);
    }
    ngOnDestroy() {
        if (this.blobUrl) {
            URL.revokeObjectURL(this.blobUrl);
        }
    }
}
BlobImageComponent.ɵfac = function BlobImageComponent_Factory(t) { return new (t || BlobImageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer)); };
BlobImageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BlobImageComponent, selectors: [["ro-blob-image"]], inputs: { imgBlob: "imgBlob" }, decls: 1, vars: 1, consts: [[3, "src"]], template: function BlobImageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, styles: ["img[_ngcontent-%COMP%] {\n  height: inherit;\n  width: inherit;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ItaW1hZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUFDRiIsImZpbGUiOiJibG9iLWltYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW1ne1xyXG4gIGhlaWdodDogaW5oZXJpdDtcclxuICB3aWR0aDogaW5oZXJpdDtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxufSJdfQ== */"], changeDetection: 0 });


/***/ }),

/***/ 40241:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/registration/components/help-text/help-text.component.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpTextComponent": function() { return /* binding */ HelpTextComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _services_help_text_help_text_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/help-text/help-text.service */ 30325);
/* harmony import */ var _pages_modal_pages_help_modal_help_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/modal-pages/help-modal/help-modal.page */ 94763);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 70325);














function HelpTextComponent_ion_grid_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-grid");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-col", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ion-button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HelpTextComponent_ion_grid_0_Template_ion_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r1.showHelp(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 1, "HELP.TITLE"));
} }
class HelpTextComponent {
    constructor(helpTextService, userSettingService, modalController, ngZone) {
        this.helpTextService = helpTextService;
        this.userSettingService = userSettingService;
        this.modalController = modalController;
        this.ngZone = ngZone;
        this.isVisible = false;
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const userSetting = yield this.userSettingService.userSetting$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1))
                .toPromise();
            this.helpText = yield this.helpTextService.getHelpTextByKey(userSetting.language, userSetting.appMode, this.geoHazard, this.registrationTid);
            if (this.helpText) {
                this.ngZone.run(() => {
                    this.isVisible = true;
                });
            }
        });
    }
    showHelp() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _pages_modal_pages_help_modal_help_modal_page__WEBPACK_IMPORTED_MODULE_2__.HelpModalPage,
                componentProps: {
                    helpText: this.helpText.Text
                }
            });
            modal.present();
        });
    }
}
HelpTextComponent.ɵfac = function HelpTextComponent_Factory(t) { return new (t || HelpTextComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_help_text_help_text_service__WEBPACK_IMPORTED_MODULE_1__.HelpTextService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone)); };
HelpTextComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: HelpTextComponent, selectors: [["app-help-text"]], inputs: { registrationTid: "registrationTid", geoHazard: "geoHazard" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "ion-text-center"], ["fill", "clear", 3, "click"]], template: function HelpTextComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, HelpTextComponent_ion_grid_0_Template, 6, 3, "ion-grid", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isVisible);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButton], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWxwLXRleHQuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 31610:
/*!********************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/kdv-radiobutton-list/kdv-radiobutton-list.component.ts ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KdvRadiobuttonListComponent": function() { return /* binding */ KdvRadiobuttonListComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/services/kdv/kdv.service */ 88430);
/* harmony import */ var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 70325);










function KdvRadiobuttonListComponent_ion_list_header_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-list-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 1, ctx_r0.title), " ");
} }
function KdvRadiobuttonListComponent_ion_radio_group_1_ng_container_1_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return { "selected": a0 }; };
function KdvRadiobuttonListComponent_ion_radio_group_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-item", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "ion-radio", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, KdvRadiobuttonListComponent_ion_radio_group_1_ng_container_1_div_5_Template, 2, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c0, item_r4.Id === ctx_r3.value))("hidden", !ctx_r3.isVisible(item_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.useDescription ? item_r4.Description : item_r4.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", item_r4.Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r4.Id === ctx_r3.value);
} }
function KdvRadiobuttonListComponent_ion_radio_group_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-radio-group", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function KdvRadiobuttonListComponent_ion_radio_group_1_Template_ion_radio_group_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r6.onChange($event); })("ngModelChange", function KdvRadiobuttonListComponent_ion_radio_group_1_Template_ion_radio_group_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r8.value = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, KdvRadiobuttonListComponent_ion_radio_group_1_ng_container_1_Template, 6, 7, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const kdvelements_r2 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r1.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", kdvelements_r2);
} }
const _c1 = ["*"];
class KdvRadiobuttonListComponent {
    constructor(kdvService, ngZone) {
        this.kdvService = kdvService;
        this.ngZone = ngZone;
        this.showZeroValues = false;
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    }
    ngOnInit() {
        this.kdvelements$ = this.kdvService
            .getKdvRepositoryByKeyObservable(this.kdvKey)
            .pipe((0,_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_1__.enterZone)(this.ngZone));
    }
    onChange(value) {
        this.valueChange.emit(value);
    }
    isVisible(item) {
        if (this.showZeroValues) {
            return true;
        }
        else {
            return item.Id % 100 !== 0;
        }
    }
}
KdvRadiobuttonListComponent.ɵfac = function KdvRadiobuttonListComponent_Factory(t) { return new (t || KdvRadiobuttonListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__.KdvService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone)); };
KdvRadiobuttonListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: KdvRadiobuttonListComponent, selectors: [["app-kdv-radiobutton-list"]], inputs: { title: "title", kdvKey: "kdvKey", value: "value", useDescription: "useDescription", showZeroValues: "showZeroValues" }, outputs: { valueChange: "valueChange" }, ngContentSelectors: _c1, decls: 3, vars: 4, consts: [["class", "ion-text-uppercase", 4, "ngIf"], [3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "ion-text-uppercase"], [3, "ngModel", "ngModelChange"], [4, "ngFor", "ngForOf"], [3, "ngClass", "hidden"], ["mode", "md", "slot", "start", 3, "value"], [4, "ngIf"]], template: function KdvRadiobuttonListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, KdvRadiobuttonListComponent_ion_list_header_0_Template, 4, 3, "ion-list-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, KdvRadiobuttonListComponent_ion_radio_group_1_Template, 2, 2, "ion-radio-group", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, ctx.kdvelements$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonRadioGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonRadio, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.RadioValueAccessor], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJrZHYtcmFkaW9idXR0b24tbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 22241:
/*!************************************************************************************!*\
  !*** ./src/app/modules/registration/components/kdv-select/kdv-select.component.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KdvSelectComponent": function() { return /* binding */ KdvSelectComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/services/kdv/kdv.service */ 88430);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/input/select/select.component */ 94990);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 70325);







class KdvSelectComponent {
    constructor(kdvService, ngZone) {
        this.kdvService = kdvService;
        this.ngZone = ngZone;
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        this.showZeroValues = false;
        this.disabled = false;
        this.labelColor = 'medium';
        this.showResetButton = true;
        this.kdvelements = [];
    }
    get selectOptions() {
        return this.kdvelements.map((el) => ({
            id: el.Id,
            text: this.useDescription ? el.Description : el.Name,
            disabled: !this.isVisible(el),
            icon: this.getIconFunc ? this.getIconFunc(el) : undefined
        }));
    }
    ngOnInit() {
        this.subscription = this.kdvService
            .getKdvRepositoryByKeyObservable(this.kdvKey)
            .subscribe((kdvelements) => {
            this.ngZone.run(() => {
                this.kdvelements = kdvelements;
            });
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    isVisible(item) {
        if (this.filter !== undefined && !this.filter(item.Id)) {
            return false;
        }
        if (!this.showZeroValues) {
            return item.Id % 100 !== 0;
        }
        return true;
    }
}
KdvSelectComponent.ɵfac = function KdvSelectComponent_Factory(t) { return new (t || KdvSelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__.KdvService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone)); };
KdvSelectComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: KdvSelectComponent, selectors: [["app-kdv-select"]], inputs: { title: "title", kdvKey: "kdvKey", value: "value", showZeroValues: "showZeroValues", disabled: "disabled", labelColor: "labelColor", showResetButton: "showResetButton", useDescription: "useDescription", filter: "filter", getIconFunc: "getIconFunc" }, outputs: { valueChange: "valueChange" }, decls: 5, vars: 9, consts: [["position", "stacked", 1, "ion-text-uppercase", 3, "color"], [3, "selectedValue", "options", "disabled", "title", "showReset", "selectedValueChange"]], template: function KdvSelectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "app-select", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("selectedValueChange", function KdvSelectComponent_Template_app_select_selectedValueChange_4_listener($event) { return ctx.value = $event; })("selectedValueChange", function KdvSelectComponent_Template_app_select_selectedValueChange_4_listener($event) { return ctx.valueChange.emit($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", ctx.labelColor);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 7, ctx.title));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("selectedValue", ctx.value)("options", ctx.selectOptions)("disabled", ctx.disabled)("title", ctx.title)("showReset", ctx.showResetButton);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_1__.SelectComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJrZHYtc2VsZWN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 14984:
/*!************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component.ts ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalSaveOrDeleteButtonsComponent": function() { return /* binding */ ModalSaveOrDeleteButtonsComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 54364);








function ModalSaveOrDeleteButtonsComponent_ion_row_6_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-col", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ion-button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModalSaveOrDeleteButtonsComponent_ion_row_6_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ion-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 1, "DIALOGS.DELETE"), " ");
} }
class ModalSaveOrDeleteButtonsComponent {
    constructor(translateService, alertController) {
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
    ngOnInit() { }
    ok() {
        this.saveClicked.emit();
    }
    delete() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const toTranslate = [this.alertTitle, 'DIALOGS.CANCEL', 'DIALOGS.OK'];
            if (this.alertMessage) {
                toTranslate.push(this.alertMessage);
            }
            const translations = yield this.translateService
                .get(toTranslate)
                .toPromise();
            const alert = yield this.alertController.create({
                header: translations[this.alertTitle],
                message: this.alertMessage ? translations[this.alertMessage] : undefined,
                buttons: [
                    {
                        text: translations['DIALOGS.CANCEL'],
                        role: 'cancel'
                    },
                    {
                        text: translations['DIALOGS.OK'],
                        handler: () => {
                            this.deleteClicked.emit();
                        }
                    }
                ]
            });
            alert.present();
        });
    }
}
ModalSaveOrDeleteButtonsComponent.ɵfac = function ModalSaveOrDeleteButtonsComponent_Factory(t) { return new (t || ModalSaveOrDeleteButtonsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.AlertController)); };
ModalSaveOrDeleteButtonsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ModalSaveOrDeleteButtonsComponent, selectors: [["app-modal-save-or-delete-buttons"]], inputs: { saveText: "saveText", saveDisabled: "saveDisabled", showDelete: "showDelete", alertTitle: "alertTitle", alertMessage: "alertMessage" }, outputs: { saveClicked: "saveClicked", deleteClicked: "deleteClicked" }, decls: 7, vars: 5, consts: [[1, "ion-no-padding"], ["size", "6", "offset", "3"], ["expand", "block", "fill", "solid", "color", "primary", 3, "disabled", "click"], [4, "ngIf"], ["size", "small", "fill", "clear", "expand", "block", 3, "click"], ["slot", "start", "name", "trash"]], template: function ModalSaveOrDeleteButtonsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ion-col", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModalSaveOrDeleteButtonsComponent_Template_ion_button_click_3_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ModalSaveOrDeleteButtonsComponent_ion_row_6_Template, 6, 3, "ion-row", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.saveDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 3, ctx.saveText), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showDelete);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonButton, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 25023:
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/navigation-buttons/navigation-buttons.component.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigationButtonsComponent": function() { return /* binding */ NavigationButtonsComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _services_summary_item_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/summary-item.service */ 13741);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 70325);










function NavigationButtonsComponent_ion_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavigationButtonsComponent_ion_button_3_Template_ion_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r2.goBack(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "ion-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 1, ctx_r0.previous.title));
} }
function NavigationButtonsComponent_ion_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavigationButtonsComponent_ion_button_5_Template_ion_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r4.goForward(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "ion-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 1, ctx_r1.next.title));
} }
class NavigationButtonsComponent {
    constructor(summaryItemService, router, ngZone) {
        this.summaryItemService = summaryItemService;
        this.router = router;
        this.ngZone = ngZone;
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            const currentUrl = this.router.url;
            const prevAndNext = yield this.summaryItemService.getPreviousAndNext(this.registration, currentUrl);
            this.ngZone.run(() => {
                if (prevAndNext.next) {
                    this.next = prevAndNext.next;
                }
                if (prevAndNext.previous) {
                    this.previous = prevAndNext.previous;
                }
            });
        });
    }
    goBack() {
        this.summaryItemService.navigateTo(this.registration, this.previous, 'back');
    }
    goForward() {
        this.summaryItemService.navigateTo(this.registration, this.next, 'forward');
    }
}
NavigationButtonsComponent.ɵfac = function NavigationButtonsComponent_Factory(t) { return new (t || NavigationButtonsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_summary_item_service__WEBPACK_IMPORTED_MODULE_0__.SummaryItemService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone)); };
NavigationButtonsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NavigationButtonsComponent, selectors: [["app-navigation-buttons"]], inputs: { registration: "registration" }, decls: 6, vars: 2, consts: [["size", "6"], ["class", "left-button", "color", "primary", "fill", "outline", "expand", "block", 3, "click", 4, "ngIf"], ["class", "right-button", "color", "primary", "fill", "outline", "expand", "block", 3, "click", 4, "ngIf"], ["color", "primary", "fill", "outline", "expand", "block", 1, "left-button", 3, "click"], ["slot", "start", "name", "arrow-back"], ["color", "primary", "fill", "outline", "expand", "block", 1, "right-button", 3, "click"], ["slot", "end", "name", "arrow-forward"]], template: function NavigationButtonsComponent_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.previous);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.next);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonText], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe], styles: ["ion-grid[_ngcontent-%COMP%] {\n  --ion-grid-padding: 10px;\n}\n\nion-button[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n\nion-button[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 25px;\n}\n\nion-button.left-button[_ngcontent-%COMP%] {\n  margin-right: 5px;\n}\n\nion-button.right-button[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24tYnV0dG9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQ0FBQTtBQUNGOztBQUFFO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUFFSjs7QUFDRTtFQUNFLGlCQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtBQUFKIiwiZmlsZSI6Im5hdmlnYXRpb24tYnV0dG9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcclxuICAtLWlvbi1ncmlkLXBhZGRpbmc6IDEwcHg7XHJcbn1cclxuXHJcbmlvbi1idXR0b24ge1xyXG4gIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG4gIGlvbi10ZXh0IHtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICBsaW5lLWhlaWdodDogMjVweDtcclxuICB9XHJcblxyXG4gICYubGVmdC1idXR0b24ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgfVxyXG5cclxuICAmLnJpZ2h0LWJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 24857:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/registration/components/numeric-input/numeric-input.component.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumericInputComponent": function() { return /* binding */ NumericInputComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _pages_modal_pages_numeric_input_modal_numeric_input_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/modal-pages/numeric-input-modal/numeric-input-modal.page */ 89043);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 70325);








function NumericInputComponent_ion_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx_r0.title), " ");
} }
function NumericInputComponent_ion_text_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-text", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.displayValue);
} }
function NumericInputComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-text", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx_r3.placeholder));
} }
class NumericInputComponent {
    constructor(modalController) {
        this.modalController = modalController;
        this.decimalPlaces = 0;
        this.min = -100000;
        this.max = 100000;
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.readonly = false;
        this.isOpen = false;
    }
    get displayValue() {
        const converted = this.convert(this.value, 'from');
        if (converted !== undefined) {
            return converted.toLocaleString();
        }
        return undefined;
    }
    ngOnInit() { }
    openPicker() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.isOpen && !this.readonly) {
                this.isOpen = true;
                const modal = yield this.modalController.create({
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
                modal.present();
                const result = yield modal.onDidDismiss();
                if (result.data && result.data.ok) {
                    this.value = this.convert(result.data.value, 'to');
                    this.valueChange.emit(this.value);
                }
                this.isOpen = false;
            }
        });
    }
    convert(val, direction) {
        if (val === undefined ||
            val === null ||
            val === 0 ||
            this.convertRatio === undefined) {
            return val;
        }
        return direction === 'from'
            ? val * this.convertRatio
            : val / this.convertRatio;
    }
}
NumericInputComponent.ɵfac = function NumericInputComponent_Factory(t) { return new (t || NumericInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController)); };
NumericInputComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NumericInputComponent, selectors: [["app-numeric-input"]], inputs: { decimalPlaces: "decimalPlaces", min: "min", max: "max", suffix: "suffix", decimalSeparator: "decimalSeparator", value: "value", title: "title", placeholder: "placeholder", convertRatio: "convertRatio", readonly: "readonly" }, outputs: { valueChange: "valueChange" }, decls: 5, vars: 3, consts: [["tabindex", "0", 3, "click", "keyup.enter"], ["color", "medium", "position", "stacked", "class", "ion-text-uppercase", 4, "ngIf"], ["class", "ion-align-self-start", 4, "ngIf", "ngIfElse"], ["ph", ""], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start"], ["color", "medium", 1, "ion-align-self-start"]], template: function NumericInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputComponent_Template_ion_item_click_0_listener() { return ctx.openPicker(); })("keyup.enter", function NumericInputComponent_Template_ion_item_keyup_enter_0_listener() { return ctx.openPicker(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, NumericInputComponent_ion_label_1_Template, 3, 3, "ion-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, NumericInputComponent_ion_text_2_Template, 2, 1, "ion-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, NumericInputComponent_ng_template_3_Template, 3, 3, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.displayValue)("ngIfElse", _r2);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonText], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJudW1lcmljLWlucHV0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 51535:
/*!************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/registration-content-wrapper/registration-content-wrapper.component.ts ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegistrationContentWrapperComponent": function() { return /* binding */ RegistrationContentWrapperComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _help_text_help_text_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../help-text/help-text.component */ 40241);
/* harmony import */ var _navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../navigation-buttons/navigation-buttons.component */ 25023);
/* harmony import */ var _save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../save-and-go-back-button/save-and-go-back-button.component */ 80403);








function RegistrationContentWrapperComponent_ion_grid_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
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
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("reset", function RegistrationContentWrapperComponent_ion_grid_0_Template_app_save_and_go_back_button_reset_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r1.emitReset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("registrationTid", ctx_r0.registrationTid)("geoHazard", ctx_r0.registration.geoHazard);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("registration", ctx_r0.registration);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
} }
const _c0 = ["*"];
class RegistrationContentWrapperComponent {
    constructor() {
        this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    }
    ngOnInit() { }
    emitReset() {
        this.reset.emit();
    }
}
RegistrationContentWrapperComponent.ɵfac = function RegistrationContentWrapperComponent_Factory(t) { return new (t || RegistrationContentWrapperComponent)(); };
RegistrationContentWrapperComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: RegistrationContentWrapperComponent, selectors: [["app-registration-content-wrapper"]], inputs: { registration: "registration", registrationTid: "registrationTid", isEmpty: "isEmpty" }, outputs: { reset: "reset" }, ngContentSelectors: _c0, decls: 1, vars: 1, consts: [["class", "pull-last-bottom ion-no-padding ion-no-margin", 4, "ngIf"], [1, "pull-last-bottom", "ion-no-padding", "ion-no-margin"], [1, "ion-no-padding"], [3, "registrationTid", "geoHazard"], [3, "registration"], [3, "registration", "registrationTid", "reset"]], template: function RegistrationContentWrapperComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, RegistrationContentWrapperComponent_ion_grid_0_Template, 9, 5, "ion-grid", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol, _help_text_help_text_component__WEBPACK_IMPORTED_MODULE_1__.HelpTextComponent, _navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_2__.NavigationButtonsComponent, _save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_3__.SaveAndGoBackButtonComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 80403:
/*!**************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/save-and-go-back-button/save-and-go-back-button.component.ts ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SaveAndGoBackButtonComponent": function() { return /* binding */ SaveAndGoBackButtonComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-svg-icon */ 70459);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 70325);












function SaveAndGoBackButtonComponent_ion_row_6_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-row", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SaveAndGoBackButtonComponent_ion_row_6_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r1.doReset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "svg-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 1, "REGISTRATION.RESET"), " ");
} }
class SaveAndGoBackButtonComponent {
    constructor(navContoller, commonRegistrationService, cdr) {
        this.navContoller = navContoller;
        this.commonRegistrationService = commonRegistrationService;
        this.cdr = cdr;
        this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        this.hasData = false;
    }
    ngOnChanges(changes) {
        if (changes && changes.registration && !changes.registration.isFirstChange()) {
            this.setHasData();
        }
    }
    ngOnInit() {
        this.setHasData();
    }
    setHasData() {
        if (this.registration != null && this.registrationTid != null) {
            this.commonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid)
                .pipe(((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1))).subscribe((hasData) => {
                this.hasData = hasData;
                this.cdr.markForCheck();
            });
        }
    }
    goBack() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            this.navContoller.navigateBack('registration/edit/' + this.registration.id);
        });
    }
    doReset() {
        this.reset.emit();
    }
}
SaveAndGoBackButtonComponent.ɵfac = function SaveAndGoBackButtonComponent_Factory(t) { return new (t || SaveAndGoBackButtonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef)); };
SaveAndGoBackButtonComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SaveAndGoBackButtonComponent, selectors: [["app-save-and-go-back-button"]], inputs: { registration: "registration", registrationTid: "registrationTid" }, outputs: { reset: "reset" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]], decls: 7, vars: 4, consts: [["size", "12"], ["expand", "block", "fill", "solid", "color", "primary", "routerDirection", "backward", 1, "back-button", 3, "click"], ["class", "reset-button-row", 4, "ngIf"], [1, "reset-button-row"], [1, "ion-text-center"], ["color", "dark", "size", "small", "fill", "clear", 1, "reset-button", 3, "click"], ["src", "/assets/icon/reset.svg"]], template: function SaveAndGoBackButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-grid");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-col", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ion-button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SaveAndGoBackButtonComponent_Template_ion_button_click_3_listener() { return ctx.goBack(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SaveAndGoBackButtonComponent_ion_row_6_Template, 6, 3, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 2, "REGISTRATION.BACK_TO_OBSERVATION"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.hasData);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButton, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, angular_svg_icon__WEBPACK_IMPORTED_MODULE_7__.SvgIconComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe], styles: ["ion-grid[_ngcontent-%COMP%] {\n  background-color: #fff;\n  margin-top: 30px;\n  --ion-grid-padding: 10px;\n}\n\n.back-button[_ngcontent-%COMP%] {\n  background-color: #fff;\n  background-color: var(--ion-background-color, #fff);\n  height: var(--ion-button-height);\n}\n\n.reset-button-row[_ngcontent-%COMP%]   .reset-button[_ngcontent-%COMP%] {\n  margin-bottom: calc(0px + 10px);\n  margin-bottom: calc(var(--ion-safe-area-bottom, 0px) + 10px);\n}\n\n.reset-button-row[_ngcontent-%COMP%]   svg-icon[_ngcontent-%COMP%] {\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhdmUtYW5kLWdvLWJhY2stYnV0dG9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0JBQUE7RUFDQSxnQkFBQTtFQUNBLHdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxzQkFBQTtFQUFBLG1EQUFBO0VBQ0EsZ0NBQUE7QUFDSjs7QUFHSTtFQUNJLCtCQUFBO0VBQUEsNERBQUE7QUFBUjs7QUFHSTtFQUNJLGFBQUE7QUFEUiIsImZpbGUiOiJzYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gICAgLS1pb24tZ3JpZC1wYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4uYmFjay1idXR0b24ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IsI2ZmZik7XHJcbiAgICBoZWlnaHQ6IHZhcigtLWlvbi1idXR0b24taGVpZ2h0KTtcclxufVxyXG5cclxuLnJlc2V0LWJ1dHRvbi1yb3cge1xyXG4gICAgLnJlc2V0LWJ1dHRvbiB7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogY2FsYyh2YXIoLS1pb24tc2FmZS1hcmVhLWJvdHRvbSwgMHB4KSArIDEwcHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN2Zy1pY29uIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgfVxyXG59XHJcbiJdfQ== */"], changeDetection: 0 });


/***/ }),

/***/ 5717:
/*!******************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/set-location-in-map/set-location-in-map.component.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetLocationInMapComponent": function() { return /* binding */ SetLocationInMapComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _map_services_map_map_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../map/services/map/map.service */ 29789);
/* harmony import */ var _core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/services/helpers/helper.service */ 22791);
/* harmony import */ var _map_services_map_search_map_search_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../map/services/map-search/map-search.service */ 39297);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 76477);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var _core_services_location_location_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/services/location/location.service */ 5361);
/* harmony import */ var _pages_obs_location_utm_source_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/obs-location/utm-source.enum */ 38714);
/* harmony import */ var _map_helpers_leaflet_cluser_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../map/helpers/leaflet-cluser.helper */ 47434);
/* harmony import */ var _core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../core/services/geo-position/geo-position.service */ 27494);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _map_components_map_map_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../map/components/map/map.component */ 6781);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! angular-svg-icon */ 70459);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ngx-translate/core */ 70325);


























const _c0 = ["editLocationNameInput"];
function SetLocationInMapComponent_app_map_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-map", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("mapReady", function SetLocationInMapComponent_app_map_1_Template_app_map_mapReady_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r8.onMapReady($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("showSupportMaps", false)("center", ctx_r0.locationMarker.getLatLng());
} }
function SetLocationInMapComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, "REGISTRATION.OBS_LOCATION.SHOW_DETAILS"), " ");
} }
function SetLocationInMapComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, "REGISTRATION.OBS_LOCATION.HIDE_DETAILS"), " ");
} }
function SetLocationInMapComponent_ion_row_13_ng_container_6_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 30);
} }
function SetLocationInMapComponent_ion_row_13_ng_container_6_svg_icon_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "svg-icon", 31);
} if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("src", ctx_r16.fromMarkerIconUrl);
} }
function SetLocationInMapComponent_ion_row_13_ng_container_6_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r10.distanceToObservationText);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r10.fromMarker);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.fromMarker);
} }
function SetLocationInMapComponent_ion_row_13_ion_icon_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "ion-icon", 32);
} }
function SetLocationInMapComponent_ion_row_13_ng_container_18_ion_row_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-label", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r17.selectedLocation.Name, " ");
} }
function SetLocationInMapComponent_ion_row_13_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SetLocationInMapComponent_ion_row_13_ng_container_18_ion_row_1_Template, 4, 1, "ion-row", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r12.selectedLocation)("ngIfElse", _r6);
} }
function SetLocationInMapComponent_ion_row_13_span_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"](", ", ctx_r13.viewInfo.elevation, " ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "MAP_CENTER_INFO.ABOVE_SEA_LEVEL"), " ");
} }
function SetLocationInMapComponent_ion_row_13_ion_row_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-label", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 1, ctx_r14.fromLocationText));
} }
function SetLocationInMapComponent_ion_row_13_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
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
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SetLocationInMapComponent_ion_row_13_Template_ion_grid_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r18.editLocation(); });
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
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](15);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate4"]("", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](24, 14, ctx_r3.locationMarker.getLatLng().lat, "0.3"), "\u00B0", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](25, 17, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](26, 19, ctx_r3.locationMarker.getLatLng().lng, "0.3"), "\u00B0", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](27, 22, "MAP_CENTER_INFO.EAST_SHORT"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r3.isLoading && ctx_r3.viewInfo && ctx_r3.viewInfo.elevation !== null);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.showFromMarkerInDetails);
} }
function SetLocationInMapComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-input", 35, 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function SetLocationInMapComponent_ng_template_14_Template_ion_input_ngModelChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r21.locationName = $event; })("ionBlur", function SetLocationInMapComponent_ng_template_14_Template_ion_input_ionBlur_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r22); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r23.onLocationEditComplete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("max", 60)("ngModel", ctx_r5.locationName);
} }
function SetLocationInMapComponent_ng_template_16_ng_container_2_ng_container_1_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("", ctx_r27.viewInfo.location.name, ",\u00A0");
} }
function SetLocationInMapComponent_ng_template_16_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-label", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, SetLocationInMapComponent_ng_template_16_ng_container_2_ng_container_1_span_2_Template, 2, 1, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r26.viewInfo.location.name !== ctx_r26.viewInfo.location.adminName);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("", ctx_r26.viewInfo.location.adminName, "\u00A0 ");
} }
function SetLocationInMapComponent_ng_template_16_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SetLocationInMapComponent_ng_template_16_ng_container_2_ng_container_1_Template, 4, 2, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r24.viewInfo && ctx_r24.viewInfo.location);
} }
function SetLocationInMapComponent_ng_template_16_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-spinner", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} }
function SetLocationInMapComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, SetLocationInMapComponent_ng_template_16_ng_container_2_Template, 2, 1, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, SetLocationInMapComponent_ng_template_16_ng_container_3_Template, 2, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r7.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r7.isLoading);
} }
const _c1 = function (a0, a1) { return { "open": a0, "details-small": a1 }; };
const defaultIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
    iconUrl: 'leaflet/marker-icon.png',
    shadowUrl: 'leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
const previousUsedPlaceIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
    iconUrl: '/assets/icon/map/prev-used-place.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41]
});
class SetLocationInMapComponent {
    constructor(mapService, helperService, ngZone, mapSearchService, geoPositionService, locationService) {
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
    get canEditLocationName() {
        return (this.allowEditLocationName &&
            !(this.selectedLocation && this.selectedLocation.Id));
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            leaflet__WEBPACK_IMPORTED_MODULE_0__.Marker.prototype.options.icon = defaultIcon;
            const locationMarkerIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
                iconUrl: this.locationMarkerIconUrl,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                shadowUrl: 'leaflet/marker-shadow.png',
                shadowSize: [41, 41]
            });
            this.followMode = !this.locationMarker && !this.fromMarker;
            this.mapService.followMode = this.followMode;
            if (!this.locationMarker) {
                if (this.fromMarker) {
                    this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.fromMarker.getLatLng(), {
                        icon: locationMarkerIcon
                    });
                }
                else {
                    const lastView = yield this.mapService.mapView$
                        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.take)(1))
                        .toPromise();
                    if (lastView) {
                        this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(lastView.center, {
                            icon: locationMarkerIcon
                        });
                    }
                    else {
                        this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(59.1, 10.3), {
                            icon: locationMarkerIcon
                        });
                    }
                }
            }
            this.updateMapViewInfo();
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    getLocationsObservable() {
        return this.mapService.mapView$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)((mapView) => mapView &&
            mapView.center !== undefined &&
            mapView.bounds !== undefined), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)((mapView) => this.locationService.getLocationWithinRadiusObservable(this.geoHazard, mapView.center.lat, mapView.center.lng, Math.round(mapView.bounds
            .getNorthWest()
            .distanceTo(mapView.bounds.getSouthEast()) / 2))));
    }
    addLocationIfNotExists(loc) {
        const existing = this.locations.some((location) => loc.Id === location.Id);
        if (!existing) {
            this.locations.push(loc);
            const marker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(loc.LatLngObject.Latitude, loc.LatLngObject.Longitude), { icon: previousUsedPlaceIcon }).addTo(this.locationGroup);
            marker.on('click', () => this.setToPrevouslyUsedLocation(loc));
        }
    }
    onMapReady(m) {
        this.map = m;
        this.locationMarker.setZIndexOffset(100).addTo(this.map);
        if (this.fromMarker) {
            this.fromMarker.addTo(this.map);
        }
        this.locationGroup.addTo(this.map);
        this.map.on('dragstart', () => {
            this.ngZone.run(() => {
                this.isLoading = true;
            });
        });
        this.map.on('dragend', () => this.updateMapViewInfo());
        this.map.on('drag', () => this.moveLocationMarkerToCenter());
        if (this.showPreviousUsedLocations) {
            this.getLocationsObservable()
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$))
                .subscribe((locations) => {
                locations.forEach((loc) => this.addLocationIfNotExists(loc));
            });
        }
        this.mapService.followMode$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$))
            .subscribe((val) => {
            this.followMode = val;
            if (this.followMode && this.userposition) {
                this.setLocationMarkerLatLng({
                    lat: this.userposition.coords.latitude,
                    lng: this.userposition.coords.longitude
                });
            }
        });
        this.mapSearchService.mapSearchClick$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$))
            .subscribe((item) => {
            const latLng = item instanceof leaflet__WEBPACK_IMPORTED_MODULE_0__.LatLng ? item : item.latlng;
            this.setLocationMarkerLatLng(latLng);
        });
        this.geoPositionService.currentPosition$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$))
            .subscribe((pos) => this.positionChange(pos));
        if (!this.followMode) {
            this.map.setView(this.locationMarker.getLatLng(), 15);
        }
        this.mapReady.emit(this.map);
        this.updatePathAndDistance();
    }
    setLocationMarkerLatLng(latLng) {
        this.locationMarker.setLatLng(latLng);
        this.updatePathAndDistance();
        this.updateMapViewInfo();
    }
    setToPrevouslyUsedLocation(location) {
        this.ngZone.run(() => {
            this.mapService.followMode = false;
            this.selectedLocation = location;
            this.setLocationMarkerLatLng(leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(location.LatLngObject.Latitude, location.LatLngObject.Longitude));
            this.map.panTo(this.locationMarker.getLatLng());
            this.showDetails = true;
        });
    }
    moveLocationMarkerToCenter() {
        this.mapService.followMode = false;
        this.selectedLocation = null;
        const center = this.map.getCenter();
        this.locationMarker.setLatLng(center);
        this.updatePathAndDistance();
    }
    updateMapViewInfo() {
        const latLng = this.locationMarker.getLatLng();
        this.mapSearchService
            .getViewInfo({ center: latLng, bounds: null, zoom: 0 }, this.geoHazard)
            .subscribe((val) => {
            this.ngZone.run(() => {
                this.viewInfo = val;
                this.isLoading = false;
            });
        }, (_) => {
            this.ngZone.run(() => {
                this.viewInfo = null;
                this.isLoading = false;
            });
        });
    }
    positionChange(position) {
        this.userposition = position;
        if (this.followMode) {
            this.setLocationMarkerLatLng({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        }
        else {
            this.updatePathAndDistance();
        }
    }
    updatePathAndDistance() {
        const from = this.fromMarker
            ? this.fromMarker.getLatLng()
            : this.userposition
                ? leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(this.userposition.coords.latitude, this.userposition.coords.longitude)
                : this.locationMarker.getLatLng();
        const locationMarkerLatLng = this.locationMarker.getLatLng();
        const path = [locationMarkerLatLng, from];
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
            }
            else {
                this.pathLine.setLatLngs(path);
            }
            if (this.fromMarker) {
                if (this.fromMarker.getLatLng().equals(this.locationMarker.getLatLng())) {
                    this.fromMarker.setOpacity(0);
                    this.pathLine.setStyle({ opacity: 0 });
                }
                else {
                    this.fromMarker.setOpacity(1);
                    this.pathLine.setStyle({ opacity: 0.9 });
                }
            }
        }
        this.ngZone.run(() => {
            this.distanceToObservationText = this.helperService.getDistanceText(locationMarkerLatLng.distanceTo(from));
        });
    }
    toggleDetails() {
        this.ngZone.run(() => {
            this.showDetails = !this.showDetails;
        });
    }
    getLocationName(location) {
        if (location) {
            return location.adminName !== location.name
                ? `${location.name} / ${location.adminName}`
                : location.name;
        }
        return '';
    }
    confirmLocation() {
        const obsLocation = this.getLocation();
        this.locationSet.emit(obsLocation);
    }
    getLocation() {
        const obsLocation = {
            Latitude: this.locationMarker.getLatLng().lat,
            Longitude: this.locationMarker.getLatLng().lng,
            Uncertainty: 0,
            UTMSourceTID: _pages_obs_location_utm_source_enum__WEBPACK_IMPORTED_MODULE_5__.UtmSource.SelectedInMap
        };
        if (this.editLocationName &&
            this.locationName &&
            this.locationName.length > 0) {
            obsLocation.ObsLocationID = undefined;
            obsLocation.LocationName = this.locationName.substring(0, 60);
        }
        else if (this.selectedLocation) {
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
    editLocation() {
        if (this.canEditLocationName) {
            this.editLocationName = true;
            setTimeout(() => {
                if (this.editLocationNameInput) {
                    this.editLocationNameInput.setFocus();
                }
            }, 50);
        }
    }
    onLocationEditComplete() {
        var _a;
        if (((_a = this.editLocationNameInput.value) === null || _a === void 0 ? void 0 : _a.toString().length) === 0) {
            // User has deleted all text
            this.editLocationName = false;
            this.updateMapViewInfo();
        }
    }
}
SetLocationInMapComponent.ɵfac = function SetLocationInMapComponent_Factory(t) { return new (t || SetLocationInMapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_map_services_map_map_service__WEBPACK_IMPORTED_MODULE_1__.MapService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_2__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_map_services_map_search_map_search_service__WEBPACK_IMPORTED_MODULE_3__.MapSearchService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_7__.GeoPositionService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_location_location_service__WEBPACK_IMPORTED_MODULE_4__.LocationService)); };
SetLocationInMapComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: SetLocationInMapComponent, selectors: [["app-set-location-in-map"]], viewQuery: function SetLocationInMapComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editLocationNameInput = _t.first);
    } }, inputs: { geoHazard: "geoHazard", fromMarker: "fromMarker", fromMarkerIconUrl: "fromMarkerIconUrl", locationMarker: "locationMarker", locationMarkerIconUrl: "locationMarkerIconUrl", showPreviousUsedLocations: "showPreviousUsedLocations", showUserPosition: "showUserPosition", confirmLocationText: "confirmLocationText", fromLocationText: "fromLocationText", locationTitle: "locationTitle", selectedLocation: "selectedLocation", showPolyline: "showPolyline", showFromMarkerInDetails: "showFromMarkerInDetails", allowEditLocationName: "allowEditLocationName", isSaveDisabled: "isSaveDisabled" }, outputs: { locationSet: "locationSet", mapReady: "mapReady" }, decls: 18, vars: 12, consts: [[3, "ngClass"], [3, "showSupportMaps", "center", "mapReady", 4, "ngIf"], [1, "bottom-info", "ion-no-padding"], [1, "confirm-button-col"], ["expand", "block", "color", "varsom-orange", 3, "disabled", "click"], [1, "ion-no-padding"], [1, "show-details-col", "ion-no-padding", "ion-text-center"], ["color", "dark", "size", "small", "fill", "clear", 3, "click"], [4, "ngIf"], ["class", "details-row", 4, "ngIf"], ["editLocationTemplate", ""], ["viewInfoTemplate", ""], [3, "showSupportMaps", "center", "mapReady"], ["slot", "start", "name", "chevron-up"], ["slot", "start", "name", "chevron-down"], [1, "details-row"], ["size", "2", 1, "ion-no-padding", "ion-text-center"], [1, "obs-location-marker", 3, "src"], [1, "padding-bottom"], ["size", "12", 1, "ion-no-padding", "padding-right"], [1, "arrow-box", 3, "click"], ["class", "edit-icon", "name", "create", 4, "ngIf"], [1, "detail-header", "ion-text-uppercase", "ion-no-margin"], [4, "ngIf", "ngIfElse"], [1, "small-text", "ion-no-margin"], ["width", "4px", "height", "15px", "viewBox", "0 0 4 15", 1, "dotted-line"], ["x1", "1", "x2", "1", "y1", "2", "y2", "14", "stroke", "#000", "stroke-width", "2", "stroke-linecap", "round", "stroke-dasharray", "1,4"], [1, "distance-label", "small-text", "ion-no-margin"], ["class", "leaflet-usermarker", 4, "ngIf"], [3, "src", 4, "ngIf"], [1, "leaflet-usermarker"], [3, "src"], ["name", "create", 1, "edit-icon"], [1, "detail-obs-info", "ion-no-margin", "ion-text-wrap"], [1, "ion-no-margin", "arrow-box", "detail-header", "block", "ion-text-uppercase"], ["type", "text", 3, "max", "ngModel", "ngModelChange", "ionBlur"], ["editLocationNameInput", ""], ["color", "dark", "name", "dots"]], template: function SetLocationInMapComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SetLocationInMapComponent_app_map_1_Template, 1, 2, "app-map", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-grid", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "ion-button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SetLocationInMapComponent_Template_ion_button_click_5_listener() { return ctx.confirmLocation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "ion-row", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "ion-col", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SetLocationInMapComponent_Template_ion_button_click_10_listener() { return ctx.toggleDetails(); });
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
    } if (rf & 2) {
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
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonButton, _map_components_map_map_component__WEBPACK_IMPORTED_MODULE_8__.MapComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonIcon, angular_svg_icon__WEBPACK_IMPORTED_MODULE_18__.SvgIconComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonInput, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonSpinner], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DecimalPipe], styles: ["[_nghost-%COMP%] {\n  --bottom-content-height: 94px;\n  --map-center-info-height: 0px;\n}\n\napp-map[_ngcontent-%COMP%] {\n  position: absolute;\n  display: block;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: var(--bottom-content-height);\n}\n\n.bottom-info[_ngcontent-%COMP%] {\n  background-color: #fff;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9999;\n  height: var(--bottom-content-height);\n  transition-property: all;\n  transition-duration: 0.5s;\n  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);\n}\n\n.bottom-info[_ngcontent-%COMP%]   .confirm-button-col[_ngcontent-%COMP%] {\n  padding-bottom: 0px;\n  padding-left: 14px;\n  padding-right: 14px;\n  padding-top: 6px;\n}\n\n.bottom-info[_ngcontent-%COMP%]   .confirm-button-col[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n\n.open[_ngcontent-%COMP%]   .bottom-info[_ngcontent-%COMP%] {\n  height: 252px;\n}\n\n.open.details-small[_ngcontent-%COMP%]   .bottom-info[_ngcontent-%COMP%] {\n  height: 200px;\n}\n\n.open.details-small[_ngcontent-%COMP%]   .obs-location-marker[_ngcontent-%COMP%] {\n  margin-top: 28px;\n}\n\n.details-row[_ngcontent-%COMP%]   .dotted-line[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.details-row[_ngcontent-%COMP%]   .obs-location-marker[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  display: inline-block;\n}\n\n.details-row[_ngcontent-%COMP%]   .distance-label[_ngcontent-%COMP%] {\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\n\n.details-row[_ngcontent-%COMP%]   .detail-obs-info[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 14px;\n  line-height: 30px;\n}\n\n.details-row[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  height: 20px;\n}\n\n.details-row[_ngcontent-%COMP%]   .edit-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 20px;\n  top: 10px;\n}\n\n.padding-right[_ngcontent-%COMP%] {\n  padding-right: 10px;\n}\n\n.padding-bottom[_ngcontent-%COMP%] {\n  padding-bottom: 10px;\n}\n\n.fill-parent[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.block[_ngcontent-%COMP%] {\n  display: block !important;\n}\n\n.detail-header[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n\n.small-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n\n.leaflet-usermarker[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  background-color: #fff;\n  background-size: 100%;\n  border-radius: 50%;\n  box-shadow: 1px 1px 5px 0px black;\n  display: inline-block;\n  transform: translateY(-9px) translateX(-2px);\n  margin-top: 10px;\n}\n\n.leaflet-usermarker[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  background-color: #4286f4;\n  border-radius: 50%;\n  left: 2px;\n  top: 2px;\n}\n\n.arrow-box[_ngcontent-%COMP%] {\n  border: 2px solid #d7d6d6;\n  z-index: 20;\n  padding: 10px;\n  padding-left: 15px;\n}\n\n.arrow-box[_ngcontent-%COMP%]:before {\n  content: \"\";\n  display: block;\n  width: 10px;\n  height: 10px;\n  border: 2px solid #d7d6d6;\n  transform: translateY(-7px) rotate(45deg);\n  position: absolute;\n  top: 50%;\n  left: -6px;\n  z-index: 10;\n}\n\n.arrow-box[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  top: 50%;\n  left: -3px;\n  width: 10px;\n  height: 10px;\n  border: 2px solid transparent;\n  position: absolute;\n  background: white;\n  z-index: 11;\n  transform: translateY(-7px) rotate(45deg);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldC1sb2NhdGlvbi1pbi1tYXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw2QkFBQTtFQUNBLDZCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxvQ0FBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxvQ0FBQTtFQUNBLHdCQUFBO0VBQ0EseUJBQUE7RUFDQSxzREFBQTtBQUNGOztBQUNFO0VBQ0UsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFDSTtFQUNFLGdDQUFBO0FBQ047O0FBTUU7RUFDRSxhQUFBO0FBSEo7O0FBT0k7RUFDRSxhQUFBO0FBTE47O0FBUUk7RUFDRSxnQkFBQTtBQU5OOztBQVlFO0VBQ0UsV0FBQTtBQVRKOztBQVlFO0VBQ0UsZ0JBQUE7RUFDQSxxQkFBQTtBQVZKOztBQWFFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtBQVhKOztBQWNFO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFaSjs7QUFlRTtFQUNFLFlBQUE7QUFiSjs7QUFnQkU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FBZEo7O0FBa0JBO0VBQ0UsbUJBQUE7QUFmRjs7QUFrQkE7RUFDRSxvQkFBQTtBQWZGOztBQWtCQTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtBQWZGOztBQWtCQTtFQUNFLHlCQUFBO0FBZkY7O0FBa0JBO0VBQ0UsZUFBQTtBQWZGOztBQWtCQTtFQUNFLGVBQUE7QUFmRjs7QUFrQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUdBLGlDQUFBO0VBQ0EscUJBQUE7RUFDQSw0Q0FBQTtFQUNBLGdCQUFBO0FBZkY7O0FBa0JBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7QUFmRjs7QUFrQkE7RUFDRSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUFmRjs7QUFrQkE7RUFDRSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFLQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FBZkY7O0FBa0JBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUtBLHlDQUFBO0FBZkYiLCJmaWxlIjoic2V0LWxvY2F0aW9uLWluLW1hcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICAtLWJvdHRvbS1jb250ZW50LWhlaWdodDogOTRweDtcclxuICAtLW1hcC1jZW50ZXItaW5mby1oZWlnaHQ6IDBweDtcclxufVxyXG5cclxuYXBwLW1hcCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJvdHRvbTogdmFyKC0tYm90dG9tLWNvbnRlbnQtaGVpZ2h0KTtcclxufVxyXG5cclxuLmJvdHRvbS1pbmZvIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICB6LWluZGV4OiA5OTk5O1xyXG4gIGhlaWdodDogdmFyKC0tYm90dG9tLWNvbnRlbnQtaGVpZ2h0KTtcclxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBhbGw7XHJcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC41cztcclxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAsIDEsIDAuNSwgMSk7XHJcblxyXG4gIC5jb25maXJtLWJ1dHRvbi1jb2wge1xyXG4gICAgcGFkZGluZy1ib3R0b206IDBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTRweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDE0cHg7XHJcbiAgICBwYWRkaW5nLXRvcDogNnB4O1xyXG5cclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICBoZWlnaHQ6IHZhcigtLWlvbi1idXR0b24taGVpZ2h0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5vcGVuIHtcclxuICAvLyAtLWJvdHRvbS1jb250ZW50LWhlaWdodDogMjUycHg7XHJcbiAgLmJvdHRvbS1pbmZvIHtcclxuICAgIGhlaWdodDogMjUycHg7XHJcbiAgfVxyXG5cclxuICAmLmRldGFpbHMtc21hbGwge1xyXG4gICAgLmJvdHRvbS1pbmZvIHtcclxuICAgICAgaGVpZ2h0OiAyMDBweDtcclxuICAgIH1cclxuXHJcbiAgICAub2JzLWxvY2F0aW9uLW1hcmtlciB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDI4cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uZGV0YWlscy1yb3cge1xyXG4gIC5kb3R0ZWQtbGluZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG4gIC5vYnMtbG9jYXRpb24tbWFya2VyIHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgfVxyXG5cclxuICAuZGlzdGFuY2UtbGFiZWwge1xyXG4gICAgcGFkZGluZy10b3A6IDNweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzcHg7XHJcbiAgfVxyXG5cclxuICAuZGV0YWlsLW9icy1pbmZvIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XHJcbiAgfVxyXG5cclxuICBpb24tc3Bpbm5lciB7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuZWRpdC1pY29uIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAyMHB4O1xyXG4gICAgdG9wOiAxMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLnBhZGRpbmctcmlnaHQge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5wYWRkaW5nLWJvdHRvbSB7XHJcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5maWxsLXBhcmVudCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxufVxyXG5cclxuLmJsb2NrIHtcclxuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZGV0YWlsLWhlYWRlciB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG4uc21hbGwtdGV4dCB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG4ubGVhZmxldC11c2VybWFya2VyIHtcclxuICB3aWR0aDogMThweDtcclxuICBoZWlnaHQ6IDE4cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMXB4IDFweCA1cHggMHB4IGJsYWNrO1xyXG4gIC1tb3otYm94LXNoYWRvdzogMXB4IDFweCA1cHggMHB4IGJsYWNrO1xyXG4gIGJveC1zaGFkb3c6IDFweCAxcHggNXB4IDBweCBibGFjaztcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC05cHgpIHRyYW5zbGF0ZVgoLTJweCk7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLmxlYWZsZXQtdXNlcm1hcmtlcjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXCI7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiAxNHB4O1xyXG4gIGhlaWdodDogMTRweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI4NmY0O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBsZWZ0OiAycHg7XHJcbiAgdG9wOiAycHg7XHJcbn1cclxuXHJcbi5hcnJvdy1ib3gge1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICNkN2Q2ZDY7XHJcbiAgei1pbmRleDogMjA7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbn1cclxuXHJcbi5hcnJvdy1ib3g6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlwiO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiAxMHB4O1xyXG4gIGhlaWdodDogMTBweDtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjZDdkNmQ2O1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTdweCkgcm90YXRlKDQ1ZGVnKTtcclxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTdweCkgcm90YXRlKDQ1ZGVnKTtcclxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNTAlO1xyXG4gIGxlZnQ6IC02cHg7XHJcbiAgei1pbmRleDogMTA7XHJcbn1cclxuXHJcbi5hcnJvdy1ib3g6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6IFwiXCI7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgdG9wOiA1MCU7XHJcbiAgbGVmdDogLTNweDtcclxuICB3aWR0aDogMTBweDtcclxuICBoZWlnaHQ6IDEwcHg7XHJcbiAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIHotaW5kZXg6IDExO1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTdweCkgcm90YXRlKDQ1ZGVnKTtcclxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTdweCkgcm90YXRlKDQ1ZGVnKTtcclxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03cHgpIHJvdGF0ZSg0NWRlZyk7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 52386:
/*!***************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/compression-test-list/compression-test-list.component.ts ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompressionTestListComponent": function() { return /* binding */ CompressionTestListComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _compression_test_modal_compression_test_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compression-test-modal/compression-test-modal.page */ 32677);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../pipes/kdv-description.pipe */ 46862);
/* harmony import */ var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../pipes/meters-to-cm.pipe */ 50795);










function CompressionTestListComponent_ion_item_5_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "kdvDescription");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const compressionTest_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](3, 3, compressionTest_r1.PropagationTID, "Snow_PropagationKDV")));
} }
function CompressionTestListComponent_ion_item_5_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const compressionTest_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](compressionTest_r1.TapsFracture);
} }
function CompressionTestListComponent_ion_item_5_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "metersToCm");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const compressionTest_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("@", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 1, compressionTest_r1.FractureDepth, 0), "cm");
} }
function CompressionTestListComponent_ion_item_5_ion_icon_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "ion-icon", 8);
} }
function CompressionTestListComponent_ion_item_5_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CompressionTestListComponent_ion_item_5_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11); const i_r2 = restoredCtx.index; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r10.addOrEditCompressionTest(i_r2); })("keyup.enter", function CompressionTestListComponent_ion_item_5_Template_ion_item_keyup_enter_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11); const i_r2 = restoredCtx.index; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r12.addOrEditCompressionTest(i_r2); });
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
} if (rf & 2) {
    const compressionTest_r1 = ctx.$implicit;
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
} }
class CompressionTestListComponent {
    constructor(modalController) {
        this.modalController = modalController;
        this.includeInSnowProfileAsDefault = false;
        this.testsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.isOpen = false;
    }
    ngOnInit() { }
    addOrEditCompressionTest(index) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.isOpen) {
                this.isOpen = true;
                const add = index === undefined;
                const modal = yield this.modalController.create({
                    component: _compression_test_modal_compression_test_modal_page__WEBPACK_IMPORTED_MODULE_0__.CompressionTestModalPage,
                    componentProps: {
                        compressionTest: add ? undefined : (this.tests || [])[index],
                        includeInSnowProfileAsDefault: this.includeInSnowProfileAsDefault
                    }
                });
                modal.present();
                const result = yield modal.onDidDismiss();
                this.isOpen = false;
                if (result.data) {
                    if (result.data.delete) {
                        this.removeTest(index);
                    }
                    else {
                        const compressionTest = result.data;
                        if (this.tests === undefined) {
                            this.tests = [];
                        }
                        if (add) {
                            this.tests.push(compressionTest);
                        }
                        else {
                            this.tests[index] = compressionTest;
                        }
                    }
                }
                this.testsChange.emit(this.tests);
            }
        });
    }
    removeTest(index) {
        if (this.tests !== undefined && this.tests.length > 0) {
            this.tests.splice(index, 1);
        }
    }
}
CompressionTestListComponent.ɵfac = function CompressionTestListComponent_Factory(t) { return new (t || CompressionTestListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController)); };
CompressionTestListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: CompressionTestListComponent, selectors: [["app-compression-test-list"]], inputs: { tests: "tests", includeInSnowProfileAsDefault: "includeInSnowProfileAsDefault" }, outputs: { testsChange: "testsChange" }, decls: 11, vars: 7, consts: [["lines", "full"], [1, "ion-text-uppercase"], ["tabindex", "0", "detail", "true", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "click", "keyup.enter"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], ["tabindex", "0", "detail", "true", 3, "click", "keyup.enter"], [4, "ngIf"], ["slot", "end", "name", "link", 4, "ngIf"], ["slot", "end", "name", "link"]], template: function CompressionTestListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-list", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-list-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, CompressionTestListComponent_ion_item_5_Template, 10, 10, "ion-item", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CompressionTestListComponent_Template_ion_item_click_6_listener() { return ctx.addOrEditCompressionTest(); })("keyup.enter", function CompressionTestListComponent_Template_ion_item_keyup_enter_6_listener() { return ctx.addOrEditCompressionTest(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "ion-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](10, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](4, 3, "REGISTRATION.SNOW.COMPRESSION_TEST.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.tests);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](10, 5, "REGISTRATION.SNOW.COMPRESSION_TEST.ADD_NEW"));
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe, _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_1__.KdvDescriptionPipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_2__.MetersToCmPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 32677:
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/compression-test-list/compression-test-modal/compression-test-modal.page.ts ***!
  \**********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompressionTestModalPage": function() { return /* binding */ CompressionTestModalPage; }
/* harmony export */ });
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../text-comment/text-comment.component */ 32032);
/* harmony import */ var _modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */ 14984);
/* harmony import */ var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../shared/components/input/select/select.component */ 94990);
/* harmony import */ var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);













function CompressionTestModalPage_ion_item_17_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "app-select", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("selectedValueChange", function CompressionTestModalPage_ion_item_17_Template_app_select_selectedValueChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r4.compressionTest.TapsFracture = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 3, "REGISTRATION.SNOW.COMPRESSION_TEST.TAPS_FRACTURE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("selectedValue", ctx_r0.compressionTest.TapsFracture)("options", ctx_r0.tapsArray);
} }
function CompressionTestModalPage_app_numeric_input_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-numeric-input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_app_numeric_input_18_Template_app_numeric_input_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r6.compressionTest.FractureDepth = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx_r1.compressionTest.FractureDepth)("min", 0)("max", 999)("decimalPlaces", 0)("convertRatio", 100);
} }
function CompressionTestModalPage_app_kdv_select_19_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-kdv-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_app_kdv_select_19_Template_app_kdv_select_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r8.compressionTest.ComprTestFractureTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx_r2.compressionTest.ComprTestFractureTID);
} }
function CompressionTestModalPage_app_kdv_select_20_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-kdv-select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_app_kdv_select_20_Template_app_kdv_select_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r10.compressionTest.StabilityEvalTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx_r3.compressionTest.StabilityEvalTID);
} }
class CompressionTestModalPage {
    constructor(modalController) {
        this.modalController = modalController;
        this.includeInSnowProfileAsDefault = false;
        this.showDelete = false;
        this.tapsArray = [];
        this.includeInSnowProfileDisabled = false;
    }
    get isValid() {
        const clone = Object.assign({}, this.compressionTest);
        clone.IncludeInSnowProfile = undefined;
        return !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(clone);
    }
    ngOnInit() {
        for (let i = 1; i <= 30; i++) {
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
        }
        else {
            this.showDelete = true;
        }
        this.checkIfIncludeInSnowProfileShouldBeDisabled();
    }
    checkIfIncludeInSnowProfileShouldBeDisabled() {
        if (this.isLBT()) {
            this.compressionTest.IncludeInSnowProfile = false;
            this.includeInSnowProfileDisabled = true;
            return;
        }
        this.includeInSnowProfileDisabled = false;
    }
    tapsFractureVisible() {
        return !(this.isCTNorECTX() || this.isCTVorECTV() || this.isLBT());
    }
    isCTNorECTX() {
        return (this.compressionTest.PropagationTID === 15 ||
            this.compressionTest.PropagationTID === 24);
    }
    isCTVorECTV() {
        return (this.compressionTest.PropagationTID === 11 ||
            this.compressionTest.PropagationTID === 21);
    }
    isLBT() {
        return this.compressionTest.PropagationTID === 5;
    }
    cancel() {
        this.modalController.dismiss();
    }
    ok() {
        this.modalController.dismiss(this.compressionTest);
    }
    delete() {
        this.modalController.dismiss({ delete: true });
    }
}
CompressionTestModalPage.ɵfac = function CompressionTestModalPage_Factory(t) { return new (t || CompressionTestModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController)); };
CompressionTestModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: CompressionTestModalPage, selectors: [["app-compression-test-modal"]], inputs: { compressionTest: "compressionTest", includeInSnowProfileAsDefault: "includeInSnowProfileAsDefault" }, decls: 23, vars: 19, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["lines", "full"], ["slot", "end", "name", "IncludeInSnowProfile", 3, "disabled", "ngModel", "ngModelChange"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.TEST_TYPE", "kdvKey", "Snow_PropagationKDV", 3, "value", "valueChange"], [4, "ngIf"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.DISTANCE_FROM_TOP", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.FRACTURE_TYPE", "kdvKey", "Snow_ComprTestFractureKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.STABILITY_EVAL", "kdvKey", "Snow_StabilityEvalKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [3, "saveDisabled", "showDelete", "saveClicked", "deleteClicked"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.TAPS_FRACTURE", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.DISTANCE_FROM_TOP", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.FRACTURE_TYPE", "kdvKey", "Snow_ComprTestFractureKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.COMPRESSION_TEST.STABILITY_EVAL", "kdvKey", "Snow_StabilityEvalKDV", 3, "value", "valueChange"]], template: function CompressionTestModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CompressionTestModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CompressionTestModalPage_Template_ion_toggle_ngModelChange_15_listener($event) { return ctx.compressionTest.IncludeInSnowProfile = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "app-kdv-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_Template_app_kdv_select_valueChange_16_listener($event) { return ctx.compressionTest.PropagationTID = $event; })("valueChange", function CompressionTestModalPage_Template_app_kdv_select_valueChange_16_listener() { return ctx.checkIfIncludeInSnowProfileShouldBeDisabled(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, CompressionTestModalPage_ion_item_17_Template, 5, 5, "ion-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](18, CompressionTestModalPage_app_numeric_input_18_Template, 1, 5, "app-numeric-input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](19, CompressionTestModalPage_app_kdv_select_19_Template, 1, 1, "app-kdv-select", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](20, CompressionTestModalPage_app_kdv_select_20_Template, 1, 1, "app-kdv-select", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "app-text-comment", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function CompressionTestModalPage_Template_app_text_comment_valueChange_21_listener($event) { return ctx.compressionTest.Comment = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "app-modal-save-or-delete-buttons", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("saveClicked", function CompressionTestModalPage_Template_app_modal_save_or_delete_buttons_saveClicked_22_listener() { return ctx.ok(); })("deleteClicked", function CompressionTestModalPage_Template_app_modal_save_or_delete_buttons_deleteClicked_22_listener() { return ctx.delete(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
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
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_1__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_2__.KdvSelectComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__.TextCommentComponent, _modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_4__.ModalSaveOrDeleteButtonsComponent, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_5__.SelectComponent, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_6__.NumericInputComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LW1vZGFsLnBhZ2Uuc2NzcyJ9 */"] });


/***/ }),

/***/ 55935:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/exposed-height/exposed-height.component.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExposedHeightComponent": function() { return /* binding */ ExposedHeightComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/components/input/select/select.component */ 94990);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 70325);






function ExposedHeightComponent_ion_item_18_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-select", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedValueChange", function ExposedHeightComponent_ion_item_18_Template_app_select_selectedValueChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r2.exposedHight1 = $event; })("selectedValueChange", function ExposedHeightComponent_ion_item_18_Template_app_select_selectedValueChange_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r4.applyChanges(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 3, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT1"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selectedValue", ctx_r0.exposedHight1)("options", ctx_r0.heightArray);
} }
function ExposedHeightComponent_ion_item_19_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedValueChange", function ExposedHeightComponent_ion_item_19_Template_app_select_selectedValueChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r5.exposedHight2 = $event; })("selectedValueChange", function ExposedHeightComponent_ion_item_19_Template_app_select_selectedValueChange_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r7.applyChanges(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 3, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT2"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selectedValue", ctx_r1.exposedHight2)("options", ctx_r1.lowerHeightArray);
} }
const _c0 = function (a0) { return { "selected": a0 }; };
class ExposedHeightComponent {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.exposedHeightComboTIDChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.exposedHight1Change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.exposedHight2Change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    }
    get heightArray() {
        const options = [];
        for (let id = 0; id <= 8000; id += 100) {
            options.push({ id, text: `${id} m` });
        }
        return options;
    }
    get lowerHeightArray() {
        return this.heightArray.filter((x) => this.exposedHight1 === undefined || x.id < this.exposedHight1);
    }
    ngOnInit() {
        this.setExposedHeights(this.exposedHeightComboTID);
    }
    setExposedHeights(exposedHeightComboTID) {
        if (exposedHeightComboTID === 0) {
            this.exposedHeightTop = true;
            this.exposedHeightMiddle = true;
            this.exposedHeightBottom = true;
        }
        else if (exposedHeightComboTID === 1) {
            // Hvit nederst
            this.exposedHeightTop = true;
            this.exposedHeightMiddle = true;
            this.exposedHeightBottom = false;
        }
        else if (exposedHeightComboTID === 2) {
            // Svart nederst
            this.exposedHeightTop = false;
            this.exposedHeightMiddle = false;
            this.exposedHeightBottom = true;
        }
        else if (exposedHeightComboTID === 3) {
            // Hvit i midten
            this.exposedHeightTop = true;
            this.exposedHeightMiddle = false;
            this.exposedHeightBottom = true;
        }
        else if (exposedHeightComboTID === 4) {
            // Svart i midten
            this.exposedHeightTop = false;
            this.exposedHeightMiddle = true;
            this.exposedHeightBottom = false;
        }
        else {
            this.exposedHeightTop = false;
            this.exposedHeightMiddle = false;
            this.exposedHeightBottom = false;
        }
    }
    toggleExsposedHeightCombo(position) {
        if (position === 'top') {
            this.exposedHeightTop = !this.exposedHeightTop;
        }
        else if (position === 'middle') {
            this.exposedHeightMiddle = !this.exposedHeightMiddle;
        }
        else {
            this.exposedHeightBottom = !this.exposedHeightBottom;
        }
        this.applyChanges();
    }
    sholdUseExposedHight2() {
        return ((this.exposedHeightTop &&
            this.exposedHeightBottom &&
            !this.exposedHeightMiddle) ||
            (!this.exposedHeightTop &&
                !this.exposedHeightBottom &&
                this.exposedHeightMiddle));
    }
    updateExposedHeightComboTID(top, middle, bottom) {
        if (top && middle && bottom) {
            this.exposedHeightComboTID = 0;
        }
        else if (!top && middle && !bottom) {
            this.exposedHeightComboTID = 4;
        }
        else if (top && !middle && bottom) {
            this.exposedHeightComboTID = 3;
        }
        else if (bottom) {
            this.exposedHeightComboTID = 2;
        }
        else if (top) {
            this.exposedHeightComboTID = 1;
        }
        else {
            this.exposedHeightComboTID = undefined;
        }
    }
    applyChanges() {
        this.updateExposedHeightComboTID(this.exposedHeightTop, this.exposedHeightMiddle, this.exposedHeightBottom);
        if (!this.sholdUseExposedHight2()) {
            this.exposedHight2 = undefined;
        }
        this.exposedHeightComboTIDChange.emit(this.exposedHeightComboTID);
        this.exposedHight1Change.emit(this.exposedHight1);
        this.exposedHight2Change.emit(this.exposedHight2);
    }
}
ExposedHeightComponent.ɵfac = function ExposedHeightComponent_Factory(t) { return new (t || ExposedHeightComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone)); };
ExposedHeightComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ExposedHeightComponent, selectors: [["app-exposed-height"]], inputs: { exposedHeightComboTID: "exposedHeightComboTID", exposedHight1: "exposedHight1", exposedHight2: "exposedHight2" }, outputs: { exposedHeightComboTIDChange: "exposedHeightComboTIDChange", exposedHight1Change: "exposedHight1Change", exposedHight2Change: "exposedHight2Change" }, decls: 20, vars: 23, consts: [["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap", "ion-margin-bottom"], [1, "exposedHight"], [1, "top", "padding-bottom", 3, "ngClass", "click"], ["size", "12", 1, "ion-text-center", "ion-align-self-center"], [1, "middle", "padding-bottom", 3, "ngClass", "click"], [1, "bottom", 3, "ngClass", "click"], [4, "ngIf"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT1", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.EXPOSED_HEIGHT2", 3, "selectedValue", "options", "selectedValueChange"]], template: function ExposedHeightComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ion-text", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ion-grid", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ion-row", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExposedHeightComponent_Template_ion_row_click_6_listener() { return ctx.toggleExsposedHeightCombo("top"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ion-col", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "ion-row", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExposedHeightComponent_Template_ion_row_click_10_listener() { return ctx.toggleExsposedHeightCombo("middle"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "ion-col", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](13, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "ion-row", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ExposedHeightComponent_Template_ion_row_click_14_listener() { return ctx.toggleExsposedHeightCombo("bottom"); });
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
    } if (rf & 2) {
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
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonRow, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_0__.SelectComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe], styles: [".exposedHight[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%] {\n  min-height: 60px;\n  margin-bottom: 10px;\n  background-position: center !important;\n  background-size: contain !important;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.selected[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.top[_ngcontent-%COMP%] {\n  background: #fff url(\"/assets/images/mountain-top-grey.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.top.selected[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7) url(\"/assets/images/mountain-top-black.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.middle[_ngcontent-%COMP%] {\n  background: #fff url(\"/assets/images/mountain-middle-grey.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.middle.selected[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7) url(\"/assets/images/mountain-middle-black.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.bottom[_ngcontent-%COMP%] {\n  background: #fff url(\"/assets/images/mountain-bottom-grey.png\") no-repeat;\n}\n.exposedHight[_ngcontent-%COMP%]   ion-row.bottom.selected[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7) url(\"/assets/images/mountain-bottom-black.png\") no-repeat;\n}\nion-text[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cG9zZWQtaGVpZ2h0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNDQUFBO0VBQ0EsbUNBQUE7QUFBUjtBQUdZO0VBQ0ksV0FBQTtBQURoQjtBQUtRO0VBQ0ksc0VBQUE7QUFIWjtBQUlZO0VBQ0kscUZBQUE7QUFGaEI7QUFNUTtFQUNJLHlFQUFBO0FBSlo7QUFLWTtFQUNRLHdGQUFBO0FBSHBCO0FBT1E7RUFDSSx5RUFBQTtBQUxaO0FBTVk7RUFDSSx3RkFBQTtBQUpoQjtBQVVBO0VBQ0ksV0FBQTtBQVBKIiwiZmlsZSI6ImV4cG9zZWQtaGVpZ2h0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4cG9zZWRIaWdodCB7XHJcbiAgICBpb24tcm93IHtcclxuICAgICAgICBtaW4taGVpZ2h0OiA2MHB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluICFpbXBvcnRhbnQ7XHJcblxyXG4gICAgICAgICYuc2VsZWN0ZWQge1xyXG4gICAgICAgICAgICBpb24tY29sIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnRvcCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmYgdXJsKFwiL2Fzc2V0cy9pbWFnZXMvbW91bnRhaW4tdG9wLWdyZXkucG5nXCIpIG5vLXJlcGVhdDtcclxuICAgICAgICAgICAgJi5zZWxlY3RlZCB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNykgdXJsKFwiL2Fzc2V0cy9pbWFnZXMvbW91bnRhaW4tdG9wLWJsYWNrLnBuZ1wiKSBuby1yZXBlYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYubWlkZGxlIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZiB1cmwoXCIvYXNzZXRzL2ltYWdlcy9tb3VudGFpbi1taWRkbGUtZ3JleS5wbmdcIikgbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICAmLnNlbGVjdGVkIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNykgdXJsKFwiL2Fzc2V0cy9pbWFnZXMvbW91bnRhaW4tbWlkZGxlLWJsYWNrLnBuZ1wiKSBuby1yZXBlYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuYm90dG9tIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZiB1cmwoXCIvYXNzZXRzL2ltYWdlcy9tb3VudGFpbi1ib3R0b20tZ3JleS5wbmdcIikgbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICAmLnNlbGVjdGVkIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwwLjcpIHVybChcIi9hc3NldHMvaW1hZ2VzL21vdW50YWluLWJvdHRvbS1ibGFjay5wbmdcIikgbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcbn1cclxuXHJcbmlvbi10ZXh0IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 70133:
/*!*****************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/valid-exposition/valid-exposition.component.ts ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidExpositionComponent": function() { return /* binding */ ValidExpositionComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 70325);





const _c0 = function (a0) { return { "selected": a0 }; };
function ValidExpositionComponent_ion_grid_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-grid", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.setExposition(7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.setExposition(0); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.setExposition(1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.setExposition(6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.toggleAllExpositions(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.setExposition(2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_22_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.setExposition(5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_25_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.setExposition(4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValidExpositionComponent_ion_grid_5_Template_ion_col_click_28_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.setExposition(3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](30, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
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
} }
const EMPTY_EXPOSITION = '00000000';
const ALL_EXPOSITION = '11111111';
class ValidExpositionComponent {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.validExpositionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    ngOnInit() {
        if (!this.validExposition) {
            this.validExpositionCopy = EMPTY_EXPOSITION;
        }
        else {
            this.validExpositionCopy = this.validExposition;
        }
    }
    setExposition(index) {
        const existingValue = this.validExpositionCopy.substr(index, 1);
        const newValue = existingValue === '1' ? '0' : '1';
        this.validExpositionCopy =
            this.validExpositionCopy.substr(0, index) +
                newValue +
                this.validExpositionCopy.substr(index + 1);
        this.applyChanges();
    }
    toggleAllExpositions() {
        this.validExpositionCopy =
            this.validExpositionCopy === ALL_EXPOSITION
                ? EMPTY_EXPOSITION
                : ALL_EXPOSITION;
        this.applyChanges();
    }
    applyChanges() {
        this.ngZone.run(() => {
            if (this.validExpositionCopy === EMPTY_EXPOSITION) {
                this.validExposition = undefined;
            }
            else {
                this.validExposition = this.validExpositionCopy;
            }
            this.validExpositionChange.emit(this.validExposition);
        });
    }
}
ValidExpositionComponent.ɵfac = function ValidExpositionComponent_Factory(t) { return new (t || ValidExpositionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone)); };
ValidExpositionComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ValidExpositionComponent, selectors: [["app-valid-exposition"]], inputs: { validExposition: "validExposition" }, outputs: { validExpositionChange: "validExpositionChange" }, decls: 6, vars: 4, consts: [["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap", "ion-margin-bottom"], ["class", "exposition ion-no-padding", 4, "ngIf"], [1, "exposition", "ion-no-padding"], ["size", "4", 1, "ion-text-center", 3, "ngClass", "click"]], template: function ValidExpositionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ion-text", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ValidExpositionComponent_ion_grid_5_Template, 31, 54, "ion-grid", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.VALID_EXPOSITION"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.validExpositionCopy);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe], styles: [".exposition[_ngcontent-%COMP%] {\n  border: 2px solid lightgrey;\n}\n.exposition[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {\n  padding: 18px;\n  background: lightgrey;\n  border: 2px solid lightgrey;\n}\n.exposition[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col.selected[_ngcontent-%COMP%] {\n  color: #fff;\n  background: rgba(0, 0, 0, 0.8);\n}\nion-text[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwyQkFBQTtBQUNKO0FBQ1E7RUFDSSxhQUFBO0VBQ0EscUJBQUE7RUFDQSwyQkFBQTtBQUNaO0FBQ1k7RUFDSSxXQUFBO0VBQ0EsOEJBQUE7QUFDaEI7QUFLQTtFQUNJLFdBQUE7QUFGSiIsImZpbGUiOiJ2YWxpZC1leHBvc2l0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4cG9zaXRpb24ge1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgbGlnaHRncmV5O1xyXG4gICAgaW9uLXJvdyB7XHJcbiAgICAgICAgaW9uLWNvbCB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDE4cHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JleTtcclxuICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgbGlnaHRncmV5O1xyXG5cclxuICAgICAgICAgICAgJi5zZWxlY3RlZCB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW9uLXRleHQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 32032:
/*!****************************************************************************************!*\
  !*** ./src/app/modules/registration/components/text-comment/text-comment.component.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextCommentComponent": function() { return /* binding */ TextCommentComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 70325);





class TextCommentComponent {
    constructor() {
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this.rows = 4;
        this.disabled = false;
        this.max = 1024;
    }
    ngOnInit() { }
    onBlur() {
        if (this.value) {
            this.value = this.value.trim();
        }
        this.valueChange.emit(this.value);
    }
}
TextCommentComponent.ɵfac = function TextCommentComponent_Factory(t) { return new (t || TextCommentComponent)(); };
TextCommentComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TextCommentComponent, selectors: [["app-text-comment"]], inputs: { title: "title", placeholder: "placeholder", value: "value", rows: "rows", disabled: "disabled", max: "max" }, outputs: { valueChange: "valueChange" }, decls: 6, vars: 11, consts: [["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["autocapitalize", "sentences", "type", "textarea", 3, "maxlength", "disabled", "rows", "ngModel", "autoGrow", "placeholder", "ionBlur", "ngModelChange"]], template: function TextCommentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ion-textarea", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ionBlur", function TextCommentComponent_Template_ion_textarea_ionBlur_4_listener() { return ctx.onBlur(); })("ngModelChange", function TextCommentComponent_Template_ion_textarea_ngModelChange_4_listener($event) { return ctx.value = $event; })("ngModelChange", function TextCommentComponent_Template_ion_textarea_ngModelChange_4_listener($event) { return ctx.valueChange.emit($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 7, ctx.title));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 9, ctx.placeholder));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("maxlength", ctx.max)("disabled", ctx.disabled)("rows", ctx.rows)("ngModel", ctx.value)("autoGrow", true);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonTextarea, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgModel], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe], styles: ["ion-textarea[_ngcontent-%COMP%] {\n  min-height: 55px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQtY29tbWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0YiLCJmaWxlIjoidGV4dC1jb21tZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXRleHRhcmVhIHtcclxuICBtaW4taGVpZ2h0OiA1NXB4O1xyXG59Il19 */"] });


/***/ }),

/***/ 99736:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/registration/components/yes-no-select/yes-no-select.component.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YesNoSelectComponent": function() { return /* binding */ YesNoSelectComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/components/input/select/select.component */ 94990);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 70325);





class YesNoSelectComponent {
    constructor() {
        this.labelColor = 'medium';
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.options = [
            { id: true, text: 'DIALOGS.YES' },
            { id: false, text: 'DIALOGS.NO' }
        ];
    }
}
YesNoSelectComponent.ɵfac = function YesNoSelectComponent_Factory(t) { return new (t || YesNoSelectComponent)(); };
YesNoSelectComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: YesNoSelectComponent, selectors: [["app-yes-no-select"]], inputs: { value: "value", labelColor: "labelColor", title: "title" }, outputs: { valueChange: "valueChange" }, decls: 5, vars: 7, consts: [["position", "stacked", 1, "ion-text-uppercase", 3, "color"], [3, "selectedValue", "title", "options", "selectedValueChange"]], template: function YesNoSelectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "app-select", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedValueChange", function YesNoSelectComponent_Template_app_select_selectedValueChange_4_listener($event) { return ctx.value = $event; })("selectedValueChange", function YesNoSelectComponent_Template_app_select_selectedValueChange_4_listener($event) { return ctx.valueChange.emit($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", ctx.labelColor);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 5, ctx.title));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selectedValue", ctx.value)("title", ctx.title)("options", ctx.options);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonLabel, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_0__.SelectComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ5ZXMtbm8tc2VsZWN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 47687:
/*!****************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/add-web-url-modal/add-web-url-modal.page.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddWebUrlModalPage": function() { return /* binding */ AddWebUrlModalPage; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */ 14984);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 70325);








class AddWebUrlModalPage {
    constructor(modalController) {
        this.modalController = modalController;
        this.isNew = true;
    }
    ngOnInit() {
        if (this.weburl) {
            this.urlToSave = Object.assign({}, this.weburl);
            this.isNew = false;
        }
        else {
            this.urlToSave = {};
        }
    }
    cancel() {
        this.modalController.dismiss();
    }
    ok() {
        this.modalController.dismiss(this.urlToSave);
    }
    delete() {
        this.modalController.dismiss({ delete: true });
    }
}
AddWebUrlModalPage.ɵfac = function AddWebUrlModalPage_Factory(t) { return new (t || AddWebUrlModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController)); };
AddWebUrlModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: AddWebUrlModalPage, selectors: [["app-add-web-url-modal"]], inputs: { weburl: "weburl" }, decls: 22, vars: 16, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.GENERAL_COMMENT.COMMENT_TITLE", "rows", "2", 3, "value", "valueChange"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["type", "url", 3, "ngModel", "ngModelChange"], [3, "saveDisabled", "showDelete", "saveClicked", "deleteClicked"]], template: function AddWebUrlModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AddWebUrlModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("valueChange", function AddWebUrlModalPage_Template_app_text_comment_valueChange_15_listener($event) { return ctx.urlToSave.UrlDescription = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "ion-label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](19, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "ion-input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function AddWebUrlModalPage_Template_ion_input_ngModelChange_20_listener($event) { return ctx.urlToSave.UrlLine = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "app-modal-save-or-delete-buttons", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("saveClicked", function AddWebUrlModalPage_Template_app_modal_save_or_delete_buttons_saveClicked_21_listener() { return ctx.ok(); })("deleteClicked", function AddWebUrlModalPage_Template_app_modal_save_or_delete_buttons_deleteClicked_21_listener() { return ctx.delete(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
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
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_1__.TextCommentComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonInput, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_2__.ModalSaveOrDeleteButtonsComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtd2ViLXVybC1tb2RhbC5wYWdlLnNjc3MifQ== */"] });


/***/ }),

/***/ 56587:
/*!****************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/modal-pages/help-modal/help-modal.module.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpModalPageModule": function() { return /* binding */ HelpModalPageModule; }
/* harmony export */ });
/* harmony import */ var _help_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./help-modal.page */ 94763);
/* harmony import */ var ngx_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-markdown */ 36731);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/shared.module */ 72271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);





class HelpModalPageModule {
}
HelpModalPageModule.ɵfac = function HelpModalPageModule_Factory(t) { return new (t || HelpModalPageModule)(); };
HelpModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: HelpModalPageModule });
HelpModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, ngx_markdown__WEBPACK_IMPORTED_MODULE_3__.MarkdownModule.forChild()]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](HelpModalPageModule, { declarations: [_help_modal_page__WEBPACK_IMPORTED_MODULE_0__.HelpModalPage], imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, ngx_markdown__WEBPACK_IMPORTED_MODULE_3__.MarkdownModule] }); })();


/***/ }),

/***/ 94763:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/modal-pages/help-modal/help-modal.page.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpModalPage": function() { return /* binding */ HelpModalPage; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var ngx_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-markdown */ 36731);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 70325);






class HelpModalPage {
    constructor(modalController) {
        this.modalController = modalController;
    }
    ngOnInit() { }
    close() {
        this.modalController.dismiss();
    }
}
HelpModalPage.ɵfac = function HelpModalPage_Factory(t) { return new (t || HelpModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController)); };
HelpModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HelpModalPage, selectors: [["app-help-modal"]], inputs: { helpText: "helpText" }, decls: 11, vars: 7, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "end"], [3, "click"], [1, "ion-padding", 3, "click"], [3, "data"]], template: function HelpModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpModalPage_Template_ion_button_click_3_listener() { return ctx.close(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpModalPage_Template_ion_content_click_9_listener() { return ctx.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "markdown", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 3, "DIALOGS.OK"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 5, "HELP.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("data", ctx.helpText);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonContent, ngx_markdown__WEBPACK_IMPORTED_MODULE_3__.MarkdownComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWxwLW1vZGFsLnBhZ2Uuc2NzcyJ9 */"] });


/***/ }),

/***/ 24783:
/*!**********************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/modal-pages/numeric-input-modal/numeric-input-modal.module.ts ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumericInputModalPageModule": function() { return /* binding */ NumericInputModalPageModule; }
/* harmony export */ });
/* harmony import */ var _numeric_input_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./numeric-input-modal.page */ 89043);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../modules/shared/shared.module */ 72271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class NumericInputModalPageModule {
}
NumericInputModalPageModule.ɵfac = function NumericInputModalPageModule_Factory(t) { return new (t || NumericInputModalPageModule)(); };
NumericInputModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: NumericInputModalPageModule });
NumericInputModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](NumericInputModalPageModule, { declarations: [_numeric_input_modal_page__WEBPACK_IMPORTED_MODULE_0__.NumericInputModalPage], imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule] }); })();


/***/ }),

/***/ 89043:
/*!********************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/modal-pages/numeric-input-modal/numeric-input-modal.page.ts ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumericInputModalPage": function() { return /* binding */ NumericInputModalPage; }
/* harmony export */ });
/* harmony import */ var _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../core/helpers/number-helper */ 27714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 70325);






function NumericInputModalPage_ion_title_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx_r0.title), " ");
} }
function NumericInputModalPage_ion_text_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2212");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function NumericInputModalPage_ion_text_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u00A0", ctx_r2.suffix, "");
} }
function NumericInputModalPage_ion_col_23_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_col_23_Template_ion_button_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10); const i_r8 = restoredCtx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r9.pushNumber(i_r8); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r8);
} }
function NumericInputModalPage_ion_col_25_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_col_25_Template_ion_button_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r13); const i_r11 = restoredCtx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r12.pushNumber(i_r11); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r11);
} }
function NumericInputModalPage_ion_col_27_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_col_27_Template_ion_button_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r16); const i_r14 = restoredCtx.$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r15.pushNumber(i_r14); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r14);
} }
function NumericInputModalPage_ion_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_button_30_Template_ion_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r17.toggleNegative(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "+ / - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("fill", ctx_r6.isNegative ? "solid" : "clear");
} }
function NumericInputModalPage_ion_button_35_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_ion_button_35_Template_ion_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r19.pushDecimalSeparator(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r7.decimalSep);
} }
const _c0 = function () { return ["1", "2", "3"]; };
const _c1 = function () { return ["4", "5", "6"]; };
const _c2 = function () { return ["7", "8", "9"]; };
class NumericInputModalPage {
    constructor(modalController) {
        this.modalController = modalController;
        this.min = -100000;
        this.max = 100000;
        this.decimalPlaces = 0;
        this.decimalSep = '.';
        this.isNegative = false;
        this.numbers = [];
    }
    get textVal() {
        return this.numbers.join('');
    }
    get localeString() {
        return this.textVal.replace('.', this.decimalSep);
    }
    get numberVal() {
        const num = parseFloat(this.textVal);
        if (isNaN(num)) {
            return undefined;
        }
        return parseFloat(this.textVal) * (this.isNegative ? -1 : 1);
    }
    keyEvent(event) {
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
    ngOnInit() {
        if (this.value !== undefined) {
            this.isNegative = this.value < 0;
            const positiveValue = this.value * (this.isNegative ? -1 : 1);
            this.numbers = _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.setDecimalPlaces(positiveValue, this.decimalPlaces)
                .toString(10)
                .split('');
        }
        if (this.max !== undefined && this.max <= 0) {
            this.isNegative = true;
        }
        this.decimalSep =
            this.decimalSeparator !== undefined
                ? this.decimalSeparator
                : this.getDecimalSeparatorForBrowser();
    }
    getDecimalSeparatorForBrowser() {
        return (1.1).toLocaleString().substring(1, 2);
    }
    cancel() {
        this.modalController.dismiss();
    }
    done() {
        this.modalController.dismiss({
            ok: true,
            value: this.numberVal
        });
    }
    toggleNegative() {
        if (this.max !== undefined && this.max <= 0) {
            return;
        }
        this.isNegative = !this.isNegative;
    }
    getNumberOfDecimals() {
        let isDecimal = false;
        let result = 0;
        for (const i of this.numbers) {
            if (isDecimal) {
                result++;
            }
            else {
                if (i === '.') {
                    isDecimal = true;
                }
            }
        }
        return result;
    }
    pushNumber(val) {
        if (this.decimalPlaces > 0 &&
            this.getNumberOfDecimals() >= this.decimalPlaces) {
            return;
        }
        this.numbers.push(val);
        if ((this.max !== undefined && this.numberVal > this.max) ||
            (this.min !== undefined && this.numberVal < this.min)) {
            this.numbers.pop();
        }
    }
    pushDecimalSeparator() {
        if (this.numbers.indexOf('.') < 0) {
            this.numbers.push('.');
        }
    }
    clear() {
        this.numbers.pop();
    }
}
NumericInputModalPage.ɵfac = function NumericInputModalPage_Factory(t) { return new (t || NumericInputModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController)); };
NumericInputModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NumericInputModalPage, selectors: [["app-numeric-input-modal"]], hostBindings: function NumericInputModalPage_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keyup", function NumericInputModalPage_keyup_HostBindingHandler($event) { return ctx.keyEvent($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
    } }, inputs: { value: "value", suffix: "suffix", min: "min", max: "max", decimalPlaces: "decimalPlaces", decimalSeparator: "decimalSeparator", title: "title" }, decls: 36, vars: 18, consts: [["mode", "ios"], ["slot", "start"], [3, "click"], [4, "ngIf"], ["slot", "end"], [1, "number-pad"], [1, "ion-justify-content-center"], ["size", "8", 1, "ion-align-self-center", "text-value", "ion-text-right"], ["size", "4", 1, "ion-align-self-center", "ion-text-right"], ["fill", "clear", 1, "delete-button", 3, "click"], ["class", "ion-text-center", 4, "ngFor", "ngForOf"], [1, "ion-text-center"], [3, "fill", "click", 4, "ngIf"], ["fill", "clear", 3, "click"], ["fill", "clear", 3, "click", 4, "ngIf"], [3, "fill", "click"]], template: function NumericInputModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, NumericInputModalPage_ion_title_6_Template, 3, 3, "ion-title", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ion-buttons", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_Template_ion_button_click_8_listener() { return ctx.done(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_Template_ion_button_click_20_listener() { return ctx.clear(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NumericInputModalPage_Template_ion_button_click_32_listener() { return ctx.pushNumber("0"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "ion-col", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, NumericInputModalPage_ion_button_35_Template, 2, 1, "ion-button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
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
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButton, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonTitle], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe], styles: ["ion-content[_ngcontent-%COMP%] {\n  --background: #D4E4EF;\n  --overflow: hidden;\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  display: flex;\n  flex-grow: 1;\n  font-size: 22px;\n  height: 2.8em;\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]:not(.button-solid) {\n  --background: var(--ion-background-color);\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%]   ion-button.delete-button[_ngcontent-%COMP%] {\n  height: 2.8em;\n  width: 2.8em;\n  display: inline-flex;\n  --border-radius: 50%;\n}\nion-content[_ngcontent-%COMP%]   .number-pad[_ngcontent-%COMP%]   .text-value[_ngcontent-%COMP%] {\n  padding-right: 16px;\n  font-size: 26px;\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --ion-safe-area-top: 0;\n}\nion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  min-width: 44px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWVyaWMtaW5wdXQtbW9kYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kscUJBQUE7RUFDQSxrQkFBQTtBQUNKO0FBQUk7RUFDSSxlQUFBO0FBRVI7QUFEUTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUFHWjtBQUZZO0VBQ0kseUNBQUE7QUFJaEI7QUFEWTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtBQUdoQjtBQUNRO0VBQ0ksbUJBQUE7RUFDQSxlQUFBO0FBQ1o7QUFJQTtFQUNJLHNCQUFBO0FBREo7QUFFSTtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtBQUFSIiwiZmlsZSI6Im51bWVyaWMtaW5wdXQtbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRDRFNEVGO1xyXG4gICAgLS1vdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgLm51bWJlci1wYWQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBpb24tYnV0dG9uIHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMi44ZW07XHJcbiAgICAgICAgICAgICY6bm90KC5idXR0b24tc29saWQpIHtcclxuICAgICAgICAgICAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAmLmRlbGV0ZS1idXR0b24ge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyLjhlbTtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyLjhlbTtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgICAgICAgICAgLS1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC50ZXh0LXZhbHVlIHtcclxuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMTZweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyNnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW9uLXRvb2xiYXIge1xyXG4gICAgLS1pb24tc2FmZS1hcmVhLXRvcDogMDtcclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAgIG1pbi1oZWlnaHQ6IDQ0cHg7XHJcbiAgICAgICAgbWluLXdpZHRoOiA0NHB4O1xyXG4gICAgfVxyXG59Il19 */"] });


/***/ }),

/***/ 38714:
/*!****************************************************************************!*\
  !*** ./src/app/modules/registration/pages/obs-location/utm-source.enum.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UtmSource": function() { return /* binding */ UtmSource; }
/* harmony export */ });
var UtmSource;
(function (UtmSource) {
    UtmSource[UtmSource["SelectedInMap"] = 35] = "SelectedInMap";
    UtmSource[UtmSource["GPS"] = 40] = "GPS";
})(UtmSource || (UtmSource = {}));


/***/ }),

/***/ 46862:
/*!********************************************************************!*\
  !*** ./src/app/modules/registration/pipes/kdv-description.pipe.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KdvDescriptionPipe": function() { return /* binding */ KdvDescriptionPipe; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/kdv/kdv.service */ 88430);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);





class KdvDescriptionPipe {
    constructor(kdvService) {
        this.kdvService = kdvService;
    }
    transform(value, kdvKey, returnDescription = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const kdvelements = yield this.kdvService
                .getKdvRepositoryByKeyObservable(kdvKey)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1))
                .toPromise();
            const kdvelement = kdvelements.find((x) => x.Id === value);
            const result = kdvelement
                ? returnDescription
                    ? kdvelement.Description
                    : kdvelement.Name
                : '';
            return result.trim();
        });
    }
}
KdvDescriptionPipe.ɵfac = function KdvDescriptionPipe_Factory(t) { return new (t || KdvDescriptionPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_0__.KdvService, 16)); };
KdvDescriptionPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefinePipe"]({ name: "kdvDescription", type: KdvDescriptionPipe, pure: true });


/***/ }),

/***/ 50795:
/*!*****************************************************************!*\
  !*** ./src/app/modules/registration/pipes/meters-to-cm.pipe.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MetersToCmPipe": function() { return /* binding */ MetersToCmPipe; }
/* harmony export */ });
/* harmony import */ var _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/helpers/number-helper */ 27714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);


class MetersToCmPipe {
    transform(value, decimalPlaces = 2) {
        if (value === undefined || value === null) {
            return value;
        }
        return _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.setDecimalPlaces(value * 100.0, decimalPlaces);
    }
}
MetersToCmPipe.ɵfac = function MetersToCmPipe_Factory(t) { return new (t || MetersToCmPipe)(); };
MetersToCmPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "metersToCm", type: MetersToCmPipe, pure: true });


/***/ }),

/***/ 13741:
/*!***********************************************************************!*\
  !*** ./src/app/modules/registration/services/summary-item.service.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SummaryItemService": function() { return /* binding */ SummaryItemService; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _shared_services_date_helper_date_helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/services/date-helper/date-helper.service */ 62077);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var src_app_modules_common_registration_services_registration_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/common-registration/services/registration/registration.service */ 36695);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/services/user-group/user-group.service */ 3942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);














class SummaryItemService {
    constructor(registrationService, dateHelperService, userGroupService, navController) {
        this.registrationService = registrationService;
        this.dateHelperService = dateHelperService;
        this.userGroupService = userGroupService;
        this.navController = navController;
    }
    getSummaryItems(registration, userGroups) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            if (!registration) {
                return [];
            }
            const userGroupsToUse = userGroups
                ? userGroups
                : yield this.userGroupService.getUserGroups();
            const summaryItems = [
                {
                    id: registration.id,
                    href: '/registration/obs-location',
                    queryParams: { geoHazard: registration.geoHazard },
                    title: 'REGISTRATION.OBS_LOCATION.TITLE',
                    subTitle: registration.request.ObsLocation
                        ? registration.request.ObsLocation.LocationName ||
                            registration.request.ObsLocation.LocationDescription
                        : '',
                    hasData: !(0,_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_5__.isEmpty)(registration.request.ObsLocation)
                },
                {
                    id: registration.id,
                    href: '/registration/set-time',
                    title: 'REGISTRATION.OVERVIEW.DATE_AND_TIME',
                    subTitle: registration.request.DtObsTime
                        ? yield this.dateHelperService.formatDateString(registration.request.DtObsTime)
                        : '',
                    hasData: !!registration.request.DtObsTime
                }
            ];
            if (userGroupsToUse.length > 0) {
                summaryItems.push({
                    id: registration.id,
                    href: '/registration/group',
                    title: 'REGISTRATION.OVERVIEW.SHARE_WITH_GROUP',
                    subTitle: this.getObservationGroupName(registration, userGroupsToUse),
                    hasData: !!registration.request.ObserverGroupID
                });
            }
            summaryItems.push(...yield this.getGeoHazardItems(registration));
            summaryItems.push(yield this.getRegItem(registration, '/registration/general-comment', 'REGISTRATION.GENERAL_COMMENT.TITLE', registration.request.GeneralObservation
                ? registration.request.GeneralObservation.ObsComment
                : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.GeneralObservation));
            return summaryItems;
        });
    }
    getPreviousAndNext(registration, url) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const summaryItems = yield this.getSummaryItems(registration);
            const currentItem = summaryItems.find((x) => url.indexOf(x.href) >= 0);
            const result = { previous: undefined, next: undefined };
            if (currentItem) {
                const index = summaryItems.indexOf(currentItem);
                if (index > 0) {
                    result.previous = summaryItems[index - 1];
                }
                const nextIndex = index + 1;
                if (nextIndex < summaryItems.length) {
                    result.next = summaryItems[nextIndex];
                }
            }
            return result;
        });
    }
    navigateTo(registration, summaryItem, direction = 'forward') {
        const url = `${summaryItem.href}/${registration.id}`;
        return direction === 'forward'
            ? this.navController.navigateForward(url)
            : this.navController.navigateBack(url);
    }
    navigateForward(registration, url) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const prevAndNext = yield this.getPreviousAndNext(registration, url);
            if (prevAndNext.next) {
                return this.navigateTo(registration, prevAndNext.next, 'forward');
            }
            else {
                return this.navController.navigateRoot(`/registration/edit/${registration.id}`);
            }
        });
    }
    getObservationGroupName(registration, userGroups) {
        if (registration && registration.request.ObserverGroupID && userGroups) {
            const selectedGroup = userGroups.find((x) => x.Id === registration.request.ObserverGroupID);
            if (selectedGroup) {
                return selectedGroup.Name;
            }
        }
        return '';
    }
    getGeoHazardItems(registration) {
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
    getWaterItems(registration) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            return [
                yield this.getRegItem(registration, '/registration/water/water-level', 'REGISTRATION.WATER.WATER_LEVEL.TITLE', registration.request.WaterLevel2
                    ? registration.request.WaterLevel2.Comment
                    : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.WaterLevel2),
                yield this.getRegItem(registration, '/registration/water/damage', 'REGISTRATION.WATER.DAMAGE.TITLE', '', // this.registration.DamageObs ? this.registration.DamageObs.map((x) => x.Comment).join() : '',
                src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DamageObs)
            ];
        });
    }
    getRegItem(registration, href, title, subTitle, registrationTid) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            return {
                id: registration.id,
                href,
                title,
                subTitle,
                hasData: yield this.registrationService.hasAnyDataToShowInRegistrationTypes(registration, registrationTid).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise(),
                attachments: yield this.registrationService.getAllAttachmentsForRegistrationTid$(registration.id, registrationTid).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise()
            };
        });
    }
    getDirtItems(registration) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            return [
                yield this.getRegItem(registration, '/registration/danger-obs', 'REGISTRATION.DANGER_OBS.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DangerObs),
                yield this.getRegItem(registration, '/registration/dirt/landslide-obs', 'REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE', registration.request.LandSlideObs
                    ? registration.request.LandSlideObs.Comment
                    : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.LandSlideObs)
            ];
        });
    }
    getIceItems(registration) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            return [
                yield this.getRegItem(registration, '/registration/ice/ice-cover', 'REGISTRATION.ICE.ICE_COVER.TITLE', registration.request.IceCoverObs
                    ? registration.request.IceCoverObs.Comment
                    : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.IceCoverObs),
                yield this.getRegItem(registration, '/registration/ice/ice-thickness', 'REGISTRATION.ICE.ICE_THICKNESS.TITLE', registration.request.IceThickness
                    ? registration.request.IceThickness.Comment
                    : '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.IceThickness),
                yield this.getRegItem(registration, '/registration/danger-obs', 'REGISTRATION.DANGER_OBS.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DangerObs),
                yield this.getRegItem(registration, '/registration/incident', 'REGISTRATION.INCIDENT.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.Incident)
            ];
        });
    }
    getSnowItems(registration) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            return [
                yield this.getRegItem(registration, '/registration/danger-obs', 'REGISTRATION.DANGER_OBS.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DangerObs),
                yield this.getRegItem(registration, '/registration/snow/avalanche-obs', 'REGISTRATION.SNOW.AVALANCHE_OBS.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.AvalancheObs),
                yield this.getRegItem(registration, '/registration/snow/avalanche-activity', 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.AvalancheActivityObs2),
                yield this.getRegItem(registration, '/registration/snow/weather', 'REGISTRATION.SNOW.WEATHER.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.WeatherObservation),
                yield this.getRegItem(registration, '/registration/snow/snow-surface', 'REGISTRATION.SNOW.SNOW_SURFACE.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowSurfaceObservation),
                yield this.getRegItem(registration, '/registration/snow/compression-test', 'REGISTRATION.SNOW.COMPRESSION_TEST.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.CompressionTest),
                {
                    id: registration.id,
                    href: '/registration/snow/snow-profile',
                    title: 'REGISTRATION.SNOW.SNOW_PROFILE.TITLE',
                    subTitle: '',
                    hasData: (yield this.registrationService.hasAnyDataToShowInRegistrationTypes(registration, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowProfile2).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise()) ||
                        (registration.request.CompressionTest &&
                            registration.request.CompressionTest.some((x) => x.IncludeInSnowProfile === true)),
                    attachments: yield this.registrationService.getAllAttachmentsForRegistrationTid$(registration.id, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowProfile2).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise()
                },
                yield this.getRegItem(registration, '/registration/snow/avalanche-problem', 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.AvalancheEvalProblem2),
                yield this.getRegItem(registration, '/registration/snow/avalanche-evaluation', 'REGISTRATION.SNOW.AVALANCHE_EVALUATION.TITLE', '', src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.AvalancheEvaluation3)
            ];
        });
    }
}
SummaryItemService.ɵfac = function SummaryItemService_Factory(t) { return new (t || SummaryItemService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_modules_common_registration_services_registration_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_date_helper_date_helper_service__WEBPACK_IMPORTED_MODULE_0__.DateHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_3__.UserGroupService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.NavController)); };
SummaryItemService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({ token: SummaryItemService, factory: SummaryItemService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 22623:
/*!******************************************************************!*\
  !*** ./src/app/modules/registration/shared-components.module.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedComponentsModule": function() { return /* binding */ SharedComponentsModule; }
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/shared.module */ 72271);
/* harmony import */ var _components_save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/save-and-go-back-button/save-and-go-back-button.component */ 80403);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/kdv-radiobutton-list/kdv-radiobutton-list.component */ 31610);
/* harmony import */ var _components_navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/navigation-buttons/navigation-buttons.component */ 25023);
/* harmony import */ var _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/set-location-in-map/set-location-in-map.component */ 5717);
/* harmony import */ var _map_map_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../map/map.module */ 14522);
/* harmony import */ var _components_base64_image_base64_image_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/base64-image/base64-image.component */ 30922);
/* harmony import */ var _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pipes/kdv-description.pipe */ 46862);
/* harmony import */ var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/add-web-url-item/add-web-url-item.component */ 15248);
/* harmony import */ var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */ 14984);
/* harmony import */ var _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/snow/exposed-height/exposed-height.component */ 55935);
/* harmony import */ var _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/snow/valid-exposition/valid-exposition.component */ 70133);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_help_text_help_text_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/help-text/help-text.component */ 40241);
/* harmony import */ var _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/modal-pages/help-modal/help-modal.module */ 56587);
/* harmony import */ var _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/yes-no-select/yes-no-select.component */ 99736);
/* harmony import */ var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pages/modal-pages/numeric-input-modal/numeric-input-modal.module */ 24783);
/* harmony import */ var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pipes/meters-to-cm.pipe */ 50795);
/* harmony import */ var _components_snow_compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/snow/compression-test-list/compression-test-list.component */ 52386);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/blob-image/blob-image.component */ 44037);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 2316);

























class SharedComponentsModule {
}
SharedComponentsModule.ɵfac = function SharedComponentsModule_Factory(t) { return new (t || SharedComponentsModule)(); };
SharedComponentsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineNgModule"]({ type: SharedComponentsModule });
SharedComponentsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjector"]({ imports: [[
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
            _map_map_module__WEBPACK_IMPORTED_MODULE_7__.MapModule,
            _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__.HelpModalPageModule,
            _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__.NumericInputModalPageModule
        ], _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        _map_map_module__WEBPACK_IMPORTED_MODULE_7__.MapModule,
        _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__.HelpModalPageModule,
        _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__.NumericInputModalPageModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsetNgModuleScope"](SharedComponentsModule, { declarations: [_components_save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_1__.SaveAndGoBackButtonComponent,
        _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_3__.AddPictureItemComponent,
        _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__.TextCommentComponent,
        _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_4__.KdvRadiobuttonListComponent,
        _components_navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_5__.NavigationButtonsComponent,
        _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_6__.SetLocationInMapComponent,
        _components_base64_image_base64_image_component__WEBPACK_IMPORTED_MODULE_8__.Base64ImageComponent,
        _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__.KdvDescriptionPipe,
        _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_20__.MetersToCmPipe,
        _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_10__.AddWebUrlItemComponent,
        _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_11__.ModalSaveOrDeleteButtonsComponent,
        _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_12__.ExposedHeightComponent,
        _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_13__.ValidExpositionComponent,
        _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_14__.RegistrationContentWrapperComponent,
        _components_help_text_help_text_component__WEBPACK_IMPORTED_MODULE_15__.HelpTextComponent,
        _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_17__.YesNoSelectComponent,
        _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_18__.NumericInputComponent,
        _components_snow_compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_21__.CompressionTestListComponent,
        _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_22__.KdvSelectComponent,
        _components_blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_23__.BlobImageComponent], imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        _map_map_module__WEBPACK_IMPORTED_MODULE_7__.MapModule,
        _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__.HelpModalPageModule,
        _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__.NumericInputModalPageModule], exports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        _map_map_module__WEBPACK_IMPORTED_MODULE_7__.MapModule,
        _components_save_and_go_back_button_save_and_go_back_button_component__WEBPACK_IMPORTED_MODULE_1__.SaveAndGoBackButtonComponent,
        _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_3__.AddPictureItemComponent,
        _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__.TextCommentComponent,
        _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_4__.KdvRadiobuttonListComponent,
        _components_navigation_buttons_navigation_buttons_component__WEBPACK_IMPORTED_MODULE_5__.NavigationButtonsComponent,
        _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_6__.SetLocationInMapComponent,
        _components_base64_image_base64_image_component__WEBPACK_IMPORTED_MODULE_8__.Base64ImageComponent,
        _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__.KdvDescriptionPipe,
        _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_20__.MetersToCmPipe,
        _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_10__.AddWebUrlItemComponent,
        _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_11__.ModalSaveOrDeleteButtonsComponent,
        _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_12__.ExposedHeightComponent,
        _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_13__.ValidExpositionComponent,
        _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_14__.RegistrationContentWrapperComponent,
        _components_help_text_help_text_component__WEBPACK_IMPORTED_MODULE_15__.HelpTextComponent,
        _pages_modal_pages_help_modal_help_modal_module__WEBPACK_IMPORTED_MODULE_16__.HelpModalPageModule,
        _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_17__.YesNoSelectComponent,
        _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_18__.NumericInputComponent,
        _pages_modal_pages_numeric_input_modal_numeric_input_modal_module__WEBPACK_IMPORTED_MODULE_19__.NumericInputModalPageModule,
        _components_snow_compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_21__.CompressionTestListComponent,
        _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_22__.KdvSelectComponent,
        _components_blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_23__.BlobImageComponent] }); })();


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1zcmNfYXBwX21vZHVsZXNfcmVnaXN0cmF0aW9uX3NoYXJlZC1jb21wb25lbnRzX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU0sU0FBUyxHQUFHLG1CQUFPLENBQUMsZ0NBQXFCLENBQUMsQ0FBQztBQUMxQyxNQUFNLGFBQWE7SUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUEyQztRQUN4RCxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDbEMsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztTQUN6QjthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUM5RCxPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU0sSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO1lBQy9CLE1BQU0sR0FBRyxHQUFrQyxHQUFHLENBQUM7WUFDL0MsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO2FBQU07WUFDTCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDdEIsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEs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LHNCQUFzQjs7NEZBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCO3dIQXZEeEI7WUFDUCwrREFBWTtZQUNaLHNEQUFTO1lBQ1QsaUdBQW1CO1lBQ25CLDJIQUEyQjtTQUM1QixFQUVDLCtEQUFZO1FBQ1osc0RBQVM7UUFnQlQsaUdBQW1CO1FBR25CLDJIQUEyQjtvSUE0QmxCLHNCQUFzQixtQkF0Qi9CLCtIQUE0QjtRQUM1Qiw0R0FBdUI7UUFDdkIsaUdBQW9CO1FBQ3BCLHdIQUEyQjtRQUMzQixtSEFBMEI7UUFDMUIsb0hBQXlCO1FBQ3pCLGlHQUFvQjtRQUNwQiwyRUFBa0I7UUFDbEIscUVBQWM7UUFDZCw0R0FBc0I7UUFDdEIsK0lBQWlDO1FBQ2pDLDZHQUFzQjtRQUN0QixtSEFBd0I7UUFDeEIsaUpBQW1DO1FBQ25DLHlGQUFpQjtRQUNqQixvR0FBb0I7UUFDcEIscUdBQXFCO1FBQ3JCLGlJQUE0QjtRQUM1Qiw0RkFBa0I7UUFDbEIsNEZBQWtCLGFBbkRsQiwrREFBWTtRQUNaLHNEQUFTO1FBQ1QsaUdBQW1CO1FBQ25CLDJIQUEyQixhQUczQiwrREFBWTtRQUNaLHNEQUFTO1FBQ1QsK0hBQTRCO1FBQzVCLDRHQUF1QjtRQUN2QixpR0FBb0I7UUFDcEIsd0hBQTJCO1FBQzNCLG1IQUEwQjtRQUMxQixvSEFBeUI7UUFDekIsaUdBQW9CO1FBQ3BCLDJFQUFrQjtRQUNsQixxRUFBYztRQUNkLDRHQUFzQjtRQUN0QiwrSUFBaUM7UUFDakMsNkdBQXNCO1FBQ3RCLG1IQUF3QjtRQUN4QixpSkFBbUM7UUFDbkMseUZBQWlCO1FBQ2pCLGlHQUFtQjtRQUNuQixvR0FBb0I7UUFDcEIscUdBQXFCO1FBQ3JCLDJIQUEyQjtRQUMzQixpSUFBNEI7UUFDNUIsNEZBQWtCO1FBQ2xCLDRGQUFrQiIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXIudHMiLCIuL3NyYy9hcHAvY29yZS9zZXJ2aWNlcy9sb2NhdGlvbi9sb2NhdGlvbi5zZXJ2aWNlLnRzIiwiLi9zcmMvYXBwL2NvcmUvc2VydmljZXMvdXNlci1ncm91cC91c2VyLWdyb3VwLnNlcnZpY2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9tYXAvaGVscGVycy9sZWFmbGV0LWNsdXNlci5oZWxwZXIudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9hZGQtcGljdHVyZS1pdGVtL2FkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvYWRkLXBpY3R1cmUtaXRlbS9hZGQtcGljdHVyZS1pdGVtLmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvYWRkLXdlYi11cmwtaXRlbS9hZGQtd2ViLXVybC1pdGVtLmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2FkZC13ZWItdXJsLWl0ZW0vYWRkLXdlYi11cmwtaXRlbS5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2Jhc2U2NC1pbWFnZS9iYXNlNjQtaW1hZ2UuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvYmFzZTY0LWltYWdlL2Jhc2U2NC1pbWFnZS5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2Jsb2ItaW1hZ2UvYmxvYi1pbWFnZS5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9ibG9iLWltYWdlL2Jsb2ItaW1hZ2UuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9oZWxwLXRleHQvaGVscC10ZXh0LmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2hlbHAtdGV4dC9oZWxwLXRleHQuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9rZHYtcmFkaW9idXR0b24tbGlzdC9rZHYtcmFkaW9idXR0b24tbGlzdC5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9rZHYtcmFkaW9idXR0b24tbGlzdC9rZHYtcmFkaW9idXR0b24tbGlzdC5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2tkdi1zZWxlY3Qva2R2LXNlbGVjdC5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9rZHYtc2VsZWN0L2tkdi1zZWxlY3QuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zL21vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucy9tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zLmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvbmF2aWdhdGlvbi1idXR0b25zL25hdmlnYXRpb24tYnV0dG9ucy5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9uYXZpZ2F0aW9uLWJ1dHRvbnMvbmF2aWdhdGlvbi1idXR0b25zLmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvbnVtZXJpYy1pbnB1dC9udW1lcmljLWlucHV0LmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL251bWVyaWMtaW5wdXQvbnVtZXJpYy1pbnB1dC5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIvcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlci5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyL3JlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi9zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi9zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3NldC1sb2NhdGlvbi1pbi1tYXAvc2V0LWxvY2F0aW9uLWluLW1hcC5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zZXQtbG9jYXRpb24taW4tbWFwL3NldC1sb2NhdGlvbi1pbi1tYXAuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L2NvbXByZXNzaW9uLXRlc3QtbGlzdC9jb21wcmVzc2lvbi10ZXN0LWxpc3QuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9jb21wcmVzc2lvbi10ZXN0LWxpc3QvY29tcHJlc3Npb24tdGVzdC1saXN0LmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9jb21wcmVzc2lvbi10ZXN0LWxpc3QvY29tcHJlc3Npb24tdGVzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L2NvbXByZXNzaW9uLXRlc3QtbGlzdC9jb21wcmVzc2lvbi10ZXN0LW1vZGFsL2NvbXByZXNzaW9uLXRlc3QtbW9kYWwucGFnZS5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9leHBvc2VkLWhlaWdodC9leHBvc2VkLWhlaWdodC5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L2V4cG9zZWQtaGVpZ2h0L2V4cG9zZWQtaGVpZ2h0LmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy92YWxpZC1leHBvc2l0aW9uL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy92YWxpZC1leHBvc2l0aW9uL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy90ZXh0LWNvbW1lbnQvdGV4dC1jb21tZW50LmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3RleHQtY29tbWVudC90ZXh0LWNvbW1lbnQuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy95ZXMtbm8tc2VsZWN0L3llcy1uby1zZWxlY3QuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMveWVzLW5vLXNlbGVjdC95ZXMtbm8tc2VsZWN0LmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2FkZC13ZWItdXJsLW1vZGFsL2FkZC13ZWItdXJsLW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYWRkLXdlYi11cmwtbW9kYWwvYWRkLXdlYi11cmwtbW9kYWwucGFnZS5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL21vZGFsLXBhZ2VzL2hlbHAtbW9kYWwvaGVscC1tb2RhbC5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvbW9kYWwtcGFnZXMvaGVscC1tb2RhbC9oZWxwLW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvbW9kYWwtcGFnZXMvaGVscC1tb2RhbC9oZWxwLW1vZGFsLnBhZ2UuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9tb2RhbC1wYWdlcy9udW1lcmljLWlucHV0LW1vZGFsL251bWVyaWMtaW5wdXQtbW9kYWwubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL21vZGFsLXBhZ2VzL251bWVyaWMtaW5wdXQtbW9kYWwvbnVtZXJpYy1pbnB1dC1tb2RhbC5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL21vZGFsLXBhZ2VzL251bWVyaWMtaW5wdXQtbW9kYWwvbnVtZXJpYy1pbnB1dC1tb2RhbC5wYWdlLmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvb2JzLWxvY2F0aW9uL3V0bS1zb3VyY2UuZW51bS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9waXBlcy9rZHYtZGVzY3JpcHRpb24ucGlwZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9waXBlcy9tZXRlcnMtdG8tY20ucGlwZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9zZXJ2aWNlcy9zdW1tYXJ5LWl0ZW0uc2VydmljZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xyXG5leHBvcnQgY2xhc3MgSXNFbXB0eUhlbHBlciB7XHJcbiAgc3RhdGljIGlzRW1wdHkob2JqOiBPYmplY3QgfCBBcnJheTxPYmplY3QgfCBBcnJheTxPYmplY3Q+Pikge1xyXG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGNvbnN0IGFyciA9IDxBcnJheTxPYmplY3QgfCBBcnJheTxPYmplY3Q+Pj5vYmo7XHJcbiAgICAgIHJldHVybiBhcnIubGVuZ3RoID09PSAwIHx8ICFhcnIuc29tZSgoeCkgPT4gIUlzRW1wdHlIZWxwZXIuaXNFbXB0eSh4KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICAgIGlmIChwcm9wcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5naWZ5KG9iaikgPT09ICd7fSc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICFwcm9wcy5zb21lKCh4KSA9PiAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KG9ialt4XSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTG9jYXRpb25TZXJ2aWNlIGFzIFJlZ29ic0FwaUxvY2F0aW9uU2VydmljZSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFJlZ29ic0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9jYXRpb25TZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnb2JzQXV0aFNlcnZpY2U6IFJlZ29ic0F1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhcGlMb2NhdGlvblNlcnZpY2U6IFJlZ29ic0FwaUxvY2F0aW9uU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgZ2V0TG9jYXRpb25XaXRoaW5SYWRpdXNPYnNlcnZhYmxlKFxyXG4gICAgZ2VvSGF6YXJkOiBHZW9IYXphcmQsXHJcbiAgICBsYXQ6IG51bWJlcixcclxuICAgIGxuZzogbnVtYmVyLFxyXG4gICAgcmFkaXVzOiBudW1iZXJcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ2dlZEluVXNlciQucGlwZShcclxuICAgICAgc3dpdGNoTWFwKChsb2dnZWRJblVzZXIpID0+XHJcbiAgICAgICAgdGhpcy5hcGlMb2NhdGlvblNlcnZpY2UuTG9jYXRpb25XaXRoaW5SYWRpdXMoe1xyXG4gICAgICAgICAgZ2VvSGF6YXJkVHlwZUlkczogW2dlb0hhemFyZF0sXHJcbiAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICBsYXRpdHVkZTogbGF0LFxyXG4gICAgICAgICAgbG9uZ2l0dWRlOiBsbmcsXHJcbiAgICAgICAgICBvYnNlcnZlckd1aWQ6IG51bGwsIC8vIGxvZ2dlZEluVXNlci5pc0xvZ2dlZEluID8gbG9nZ2VkSW5Vc2VyLnVzZXIuR3VpZCA6IG51bGwsIC8vIFRPRE86IEZpeCBhcGkgdG8gdXNlIGFjY2VzcyB0b2tlbiBpZiBwcm92aWRlZFxyXG4gICAgICAgICAgcmV0dXJuQ291bnQ6IDEwMFxyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmFub1NxbCB9IGZyb20gJy4uLy4uLy4uLy4uL25hbm9zcWwnO1xyXG5pbXBvcnQgeyBBcHBNb2RlIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRhTG9hZFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2RhdGEtbG9hZC9zZXJ2aWNlcy9kYXRhLWxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgT2JzZXJ2ZXJHcm91cER0byxcclxuICBBY2NvdW50U2VydmljZSBhcyBSZWdvYnNBcGlBY2NvdW50U2VydmljZVxyXG59IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgeyBmcm9tLCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBsYXN0VmFsdWVGcm9tLCBmaXJzdFZhbHVlRnJvbSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFJlZ29ic0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBuU1FMIH0gZnJvbSAnQG5hbm8tc3FsL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckdyb3VwU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ29ic0F1dGhTZXJ2aWNlOiBSZWdvYnNBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFjY291bnRBcGlTZXJ2aWNlOiBSZWdvYnNBcGlBY2NvdW50U2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YUxvYWRTZXJ2aWNlOiBEYXRhTG9hZFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZVVzZXJHcm91cHMoKSB7XHJcbiAgICBjb25zdCBsb2dnZWRJblVzZXIgPSBhd2FpdCB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmdldExvZ2dlZEluVXNlckFzUHJvbWlzZSgpO1xyXG4gICAgaWYgKGxvZ2dlZEluVXNlci5pc0xvZ2dlZEluKSB7XHJcbiAgICAgIGNvbnN0IGFwcE1vZGUgPSBhd2FpdCBmaXJzdFZhbHVlRnJvbSh0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5hcHBNb2RlJCk7XHJcbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tMYXN0VXBkYXRlZEFuZFVwZGF0ZURhdGFJZk5lZWRlZChcclxuICAgICAgICBhcHBNb2RlLFxyXG4gICAgICAgIGxvZ2dlZEluVXNlci5lbWFpbFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBjaGVja0xhc3RVcGRhdGVkQW5kVXBkYXRlRGF0YUlmTmVlZGVkKFxyXG4gICAgYXBwTW9kZTogQXBwTW9kZSxcclxuICAgIGVtYWlsOiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IGRhdGFMb2FkSWQgPSB0aGlzLmdldERhdGFMb2FkSWQoYXBwTW9kZSwgZW1haWwpO1xyXG4gICAgY29uc3QgZGF0YUxvYWQgPSBhd2FpdCB0aGlzLmRhdGFMb2FkU2VydmljZS5nZXRTdGF0ZShkYXRhTG9hZElkKTtcclxuICAgIGNvbnN0IGxhc3RVcGRhdGVMaW1pdCA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdob3VyJyk7XHJcbiAgICBpZiAoXHJcbiAgICAgICFkYXRhTG9hZC5sYXN0VXBkYXRlZCB8fFxyXG4gICAgICBtb21lbnQoZGF0YUxvYWQubGFzdFVwZGF0ZWQpLmlzQmVmb3JlKGxhc3RVcGRhdGVMaW1pdClcclxuICAgICkge1xyXG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZVVzZXJHcm91cHNGb3JVc2VyKGFwcE1vZGUsIGVtYWlsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZVVzZXJHcm91cHNGb3JVc2VyKGFwcE1vZGU6IEFwcE1vZGUsIGVtYWlsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGRhdGFMb2FkSWQgPSB0aGlzLmdldERhdGFMb2FkSWQoYXBwTW9kZSwgZW1haWwpO1xyXG4gICAgYXdhaXQgdGhpcy5kYXRhTG9hZFNlcnZpY2Uuc3RhcnRMb2FkaW5nKGRhdGFMb2FkSWQpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbGFzdFZhbHVlRnJvbSh0aGlzLmFjY291bnRBcGlTZXJ2aWNlXHJcbiAgICAgIC5BY2NvdW50R2V0T2JzZXJ2ZXJHcm91cHMoKSk7XHJcbiAgICB0aGlzLnNhdmVVc2VyR3JvdXBzKGFwcE1vZGUsIGVtYWlsLCByZXN1bHQpO1xyXG4gICAgYXdhaXQgdGhpcy5kYXRhTG9hZFNlcnZpY2UubG9hZGluZ0NvbXBsZXRlZChkYXRhTG9hZElkLCByZXN1bHQubGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVVc2VyR3JvdXBzKFxyXG4gICAgYXBwTW9kZTogQXBwTW9kZSxcclxuICAgIGVtYWlsOiBzdHJpbmcsXHJcbiAgICBvYnNlcnZlckdyb3VwczogT2JzZXJ2ZXJHcm91cER0b1tdXHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCB1c2VyR3JvdXBzID0gKG9ic2VydmVyR3JvdXBzIHx8IFtdKS5tYXAoKHZhbCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGtleTogYCR7ZW1haWx9XyR7dmFsLklkfWAsXHJcbiAgICAgICAgdXNlcklkOiBlbWFpbCxcclxuICAgICAgICBJZDogdmFsLklkLFxyXG4gICAgICAgIE5hbWU6IHZhbC5OYW1lXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGluc3RhbmNlTmFtZSA9IE5hbm9TcWwuZ2V0SW5zdGFuY2VOYW1lKFxyXG4gICAgICBOYW5vU3FsLlRBQkxFUy5PQlNFUlZFUl9HUk9VUFMubmFtZSxcclxuICAgICAgYXBwTW9kZVxyXG4gICAgKTtcclxuICAgIGF3YWl0IG5TUUwoaW5zdGFuY2VOYW1lKS5sb2FkSlModXNlckdyb3Vwcyk7XHJcbiAgICBhd2FpdCB0aGlzLmRlbGV0ZVVzZXJHcm91cHNOb0xvbmdlckluUmVzdWx0KFxyXG4gICAgICBhcHBNb2RlLFxyXG4gICAgICB1c2VyR3JvdXBzLm1hcCgodWcpID0+IHVnLmtleSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGRlbGV0ZVVzZXJHcm91cHNOb0xvbmdlckluUmVzdWx0KFxyXG4gICAgYXBwTW9kZTogQXBwTW9kZSxcclxuICAgIGlkczogc3RyaW5nW11cclxuICApIHtcclxuICAgIGF3YWl0IE5hbm9TcWwuZ2V0SW5zdGFuY2UoTmFub1NxbC5UQUJMRVMuT0JTRVJWRVJfR1JPVVBTLm5hbWUsIGFwcE1vZGUpXHJcbiAgICAgIC5xdWVyeSgnZGVsZXRlJylcclxuICAgICAgLndoZXJlKFxyXG4gICAgICAgIChkYkdyb3VwOiB7IGtleTogc3RyaW5nOyB1c2VySWQ6IHN0cmluZzsgSWQ6IG51bWJlcjsgTmFtZTogc3RyaW5nIH0pID0+XHJcbiAgICAgICAgICBpZHMuaW5kZXhPZihkYkdyb3VwLmtleSkgPCAwXHJcbiAgICAgIClcclxuICAgICAgLmV4ZWMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RGF0YUxvYWRJZChhcHBNb2RlOiBBcHBNb2RlLCBlbWFpbDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYCR7TmFub1NxbC5UQUJMRVMuT0JTRVJWRVJfR1JPVVBTLm5hbWV9XyR7YXBwTW9kZX1fJHtlbWFpbH1gO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckdyb3Vwc0FzT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPE9ic2VydmVyR3JvdXBEdG9bXT4ge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ2dlZEluVXNlciQsXHJcbiAgICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmFwcE1vZGUkXHJcbiAgICBdKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKFtsb2dnZWRJblVzZXIsIGFwcE1vZGVdKSA9PlxyXG4gICAgICAgIGxvZ2dlZEluVXNlci5pc0xvZ2dlZEluXHJcbiAgICAgICAgICA/IGZyb20odGhpcy5nZXRVc2VyR3JvdXBzRnJvbURiKGFwcE1vZGUsIGxvZ2dlZEluVXNlci5lbWFpbCkpXHJcbiAgICAgICAgICA6IGZyb20oUHJvbWlzZS5yZXNvbHZlKFtdKSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJHcm91cHMoKTogUHJvbWlzZTxPYnNlcnZlckdyb3VwRHRvW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldFVzZXJHcm91cHNBc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRVc2VyR3JvdXBzRnJvbURiKFxyXG4gICAgYXBwTW9kZTogQXBwTW9kZSxcclxuICAgIGVtYWlsOiBzdHJpbmdcclxuICApOiBQcm9taXNlPE9ic2VydmVyR3JvdXBEdG9bXT4ge1xyXG4gICAgcmV0dXJuIE5hbm9TcWwuZ2V0SW5zdGFuY2UoTmFub1NxbC5UQUJMRVMuT0JTRVJWRVJfR1JPVVBTLm5hbWUsIGFwcE1vZGUpXHJcbiAgICAgIC5xdWVyeSgnc2VsZWN0JylcclxuICAgICAgLndoZXJlKCh4KSA9PiB4LnVzZXJJZCA9PT0gZW1haWwpXHJcbiAgICAgIC5leGVjKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2V0dGluZ3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExlYWZsZXRDbHVzdGVySGVscGVyIHtcclxuICBzdGF0aWMgY3JlYXRlTWFya2VyQ2x1c3Rlckdyb3VwKG9wdGlvbnM/OiBMLk1hcmtlckNsdXN0ZXJHcm91cE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICBzcGlkZXJmeU9uTWF4Wm9vbTogdHJ1ZSxcclxuICAgICAgc2hvd0NvdmVyYWdlT25Ib3ZlcjogZmFsc2UsXHJcbiAgICAgIHpvb21Ub0JvdW5kc09uQ2xpY2s6IHRydWUsXHJcbiAgICAgIG1heENsdXN0ZXJSYWRpdXM6IHNldHRpbmdzLm1hcC5tYXhDbHVzdGVyUmFkaXVzLFxyXG4gICAgICBpY29uQ3JlYXRlRnVuY3Rpb246IExlYWZsZXRDbHVzdGVySGVscGVyLmNyZWF0ZUNsdXN0ZXJJY29uXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEwubWFya2VyQ2x1c3Rlckdyb3VwKHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLihvcHRpb25zIHx8IHt9KSB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVDbHVzdGVySWNvbihjbHVzdGVyOiBMLk1hcmtlckNsdXN0ZXIpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IGNsdXN0ZXIuZ2V0QWxsQ2hpbGRNYXJrZXJzKCkubGVuZ3RoO1xyXG4gICAgY29uc3Qgc2l6ZSA9IGxlbmd0aCA8IDEwMCA/IDM1IDogbGVuZ3RoIDwgMTAwMCA/IDUwIDogNzA7XHJcbiAgICByZXR1cm4gTC5kaXZJY29uKHtcclxuICAgICAgaHRtbDogJzxkaXY+JyArIGxlbmd0aCArICc8L2Rpdj4nLFxyXG4gICAgICBpY29uU2l6ZTogW3NpemUsIHNpemVdLFxyXG4gICAgICBpY29uQW5jaG9yOiBbc2l6ZSAvIDIuMCwgc2l6ZSAvIDIuMF0sXHJcbiAgICAgIGNsYXNzTmFtZTogJ2NpcmNsZS1tYXJrZXItY2x1c3RlcidcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IEFjdGlvblNoZWV0Q29udHJvbGxlciwgUGxhdGZvcm0sIFRvYXN0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgQ2FtZXJhLCBDYW1lcmFPcHRpb25zLCBQaWN0dXJlU291cmNlVHlwZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY2FtZXJhL25neCc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBBdHRhY2htZW50VHlwZSwgQXR0YWNobWVudFVwbG9hZEVkaXRNb2RlbCwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgRGF0YVVybEhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9kYXRhLXVybC5oZWxwZXInO1xyXG5pbXBvcnQgeyBXZWJWaWV3IH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9pb25pYy13ZWJ2aWV3L25neCc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBGaWxlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlL25neCc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2ctbGV2ZWwubW9kZWwnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IGZvcmtKb2luLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnc3JjL2FwcC9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ0FkZFBpY3R1cmVJdGVtQ29tcG9uZW50JztcclxuY29uc3QgTUlNRV9UWVBFID0gJ2ltYWdlL2pwZWcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBdHRhY2htZW50VXBsb2FkRWRpdE1vZGVsV2l0aEJsb2IgZXh0ZW5kcyBBdHRhY2htZW50VXBsb2FkRWRpdE1vZGVsIHtcclxuICBibG9iOiBCbG9iO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hZGQtcGljdHVyZS1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYWRkLXBpY3R1cmUtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYWRkLXBpY3R1cmUtaXRlbS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGRQaWN0dXJlSXRlbUNvbXBvbmVudCBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvbklkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgQElucHV0KCkgZ2VvSGF6YXJkOiBHZW9IYXphcmQ7XHJcbiAgQElucHV0KCkgdGl0bGUgPSAnUkVHSVNUUkFUSU9OLkFERF9JTUFHRVMnO1xyXG4gIEBJbnB1dCgpIHBpY3R1cmVDb21tZW50VGV4dCA9ICdSRUdJU1RSQVRJT04uSU1BR0VfREVTQ1JJUFRJT04nO1xyXG4gIEBJbnB1dCgpIHBpY3R1cmVDb21tZW50UGxhY2Vob2xkZXIgPSAnUkVHSVNUUkFUSU9OLklNQUdFX0RFU0NSSVBUSU9OX1BMQUNFSE9MREVSJztcclxuICBASW5wdXQoKSBpY29uID0gJ2NhbWVyYSc7XHJcbiAgQElucHV0KCkgc2hvd0ljb24gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGljb25Db2xvciA9ICdkYXJrJztcclxuICBASW5wdXQoKSBvbkJlZm9yZUFkZDogKCkgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQ7XHJcbiAgQElucHV0KCkgYXR0YWNobWVudFR5cGU6IEF0dGFjaG1lbnRUeXBlID0gJ0F0dGFjaG1lbnQnO1xyXG4gIEBJbnB1dCgpIHJlZj86IHN0cmluZztcclxuXHJcbiAgYXR0YWNobWVudHM6IEF0dGFjaG1lbnRVcGxvYWRFZGl0TW9kZWxXaXRoQmxvYltdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY2FtZXJhOiBDYW1lcmEsXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgIHByaXZhdGUgZmlsZTogRmlsZSxcclxuICAgIHByaXZhdGUgbG9nZ2VyOiBMb2dnaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgd2ViVmlldzogV2ViVmlldyxcclxuICAgIHByaXZhdGUgdG9hc3RDb250cm9sbGVyOiBUb2FzdENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBhY3Rpb25TaGVldENvbnRyb2xsZXI6IEFjdGlvblNoZWV0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyh0aGlzLnJlZ2lzdHJhdGlvbklkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGF0dGFjaG1lbnRzKSA9PlxyXG4gICAgICAgICAgYXR0YWNobWVudHMuZmlsdGVyKChhKSA9PiBhLlJlZ2lzdHJhdGlvblRJRCA9PT0gdGhpcy5yZWdpc3RyYXRpb25UaWQgJiYgYS50eXBlID09PSB0aGlzLmF0dGFjaG1lbnRUeXBlICYmIGEucmVmID09PSB0aGlzLnJlZilcclxuICAgICAgICApLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+XHJcbiAgICAgICAgICBhdHRhY2htZW50cy5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgPyBvZihbXSlcclxuICAgICAgICAgICAgOiBmb3JrSm9pbihbXHJcbiAgICAgICAgICAgICAgLi4uYXR0YWNobWVudHMubWFwKChhKSA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5nZXRCbG9iKHRoaXMucmVnaXN0cmF0aW9uSWQsIGEuaWQpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgICAgICAgICAgIG1hcCgoYmxvYikgPT4gKHsgLi4uYSwgYmxvYiB9KSksXHJcbiAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVyciwgREVCVUdfVEFHLCAnQ291bGQgbm90IGdldCBibG9iIGZyb20gYXR0YWNobWVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih7IC4uLmEsIGJsb2I6IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXR0YWNobWVudHMgPSByZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZENsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVBZGQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUFkZCgpKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KFtcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5BRERfUElDVFVSRScsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuVEFLRV9ORVdfUEhPVE8nLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNIT09TRV9GUk9NX0xJQlJBUlknLFxyXG4gICAgICAgICdESUFMT0dTLkNBTkNFTCdcclxuICAgICAgXSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWN0aW9uU2hlZXQgPSBhd2FpdCB0aGlzLmFjdGlvblNoZWV0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBoZWFkZXI6IHRyYW5zbGF0aW9uc1snUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5BRERfUElDVFVSRSddLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULlRBS0VfTkVXX1BIT1RPJ10sXHJcbiAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB0aGlzLmdldFBpY3R1cmUodGhpcy5jYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNIT09TRV9GUk9NX0xJQlJBUlknXSxcclxuICAgICAgICAgIGhhbmRsZXI6ICgpID0+IHRoaXMuZ2V0UGljdHVyZSh0aGlzLmNhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5QSE9UT0xJQlJBUlkpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuQ0FOQ0VMJ10sXHJcbiAgICAgICAgICByb2xlOiAnY2FuY2VsJ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBhY3Rpb25TaGVldC5wcmVzZW50KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQaWN0dXJlKHNvdXJjZVR5cGU6IFBpY3R1cmVTb3VyY2VUeXBlKSB7XHJcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXMoJ2h5YnJpZCcpKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRkRHVtbXlJbWFnZSgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnM6IENhbWVyYU9wdGlvbnMgPSB7XHJcbiAgICAgICAgcXVhbGl0eTogc2V0dGluZ3MuaW1hZ2VzLnF1YWxpdHksXHJcbiAgICAgICAgZGVzdGluYXRpb25UeXBlOiB0aGlzLmNhbWVyYS5EZXN0aW5hdGlvblR5cGUuRklMRV9VUkksXHJcbiAgICAgICAgc291cmNlVHlwZTogc291cmNlVHlwZSxcclxuICAgICAgICBlbmNvZGluZ1R5cGU6IHRoaXMuY2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxyXG4gICAgICAgIG1lZGlhVHlwZTogdGhpcy5jYW1lcmEuTWVkaWFUeXBlLlBJQ1RVUkUsXHJcbiAgICAgICAgdGFyZ2V0SGVpZ2h0OiBzZXR0aW5ncy5pbWFnZXMuc2l6ZSxcclxuICAgICAgICB0YXJnZXRXaWR0aDogc2V0dGluZ3MuaW1hZ2VzLnNpemUsXHJcbiAgICAgICAgY29ycmVjdE9yaWVudGF0aW9uOiB0cnVlLFxyXG4gICAgICAgIHNhdmVUb1Bob3RvQWxidW06IHNvdXJjZVR5cGUgPT09IFBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQVxyXG4gICAgICAgIC8vIE5PVEU6IHNhdmVUb1Bob3RvQWxidW09dHJ1ZSBjYXVzZXMgYSBidWcgaW4gbGF0ZXN0IGNvcmRvdmEgY2FtZXJhcGx1Z2luXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IGltYWdlVXJsID0gYXdhaXQgdGhpcy5jYW1lcmEuZ2V0UGljdHVyZShvcHRpb25zKTtcclxuICAgICAgaWYgKCEoYXdhaXQgdGhpcy52YWxpZGF0ZUltYWdlKGltYWdlVXJsKSkpIHtcclxuICAgICAgICB0aGlzLnNob3dFcnJvclRvYXN0KCdSRUdJU1RSQVRJT04uSU5WQUxJRF9JTUFHRScpOyAvL1RPRE86IFZpcyBiZWRyZSBmZWlsbWVsZGluZ1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgR290IGltYWdlIHVybCBmcm9tIGNhbWVyYSBwbHVnaW46ICR7aW1hZ2VVcmx9YCwgREVCVUdfVEFHKTtcclxuICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCB0aGlzLmdldEFycmF5QnVmZmVyKGltYWdlVXJsKTtcclxuICAgICAgYXdhaXQgdGhpcy5hZGRJbWFnZShuZXcgQmxvYihbYXJyYXlCdWZmZXJdKSwgTUlNRV9UWVBFKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aGlzLmxvZ2dlci5sb2coJ1VzZXIgY291bGQgbm90IGFkZCBpbWFnZSwgbW9zdCBsaWtlbHkgbm8gYWNjZXNzIG9yIGludmFsaWQgaW1hZ2UnLCBlcnIsIExvZ0xldmVsLldhcm5pbmcsIERFQlVHX1RBRyk7XHJcbiAgICAgIHRoaXMuc2hvd0Vycm9yVG9hc3QoJ0NvdWxkIG5vdCBzYXZlIGltYWdlLiBEbyB5b3UgaGF2ZSBlbm91Z2ggc3BhY2U/Jyk7IC8vVE9ETzogVmlzIGJlZHJlIGZlaWxtZWxkaW5nIG9nIHDDpSBmbGVyZSBzcHLDpWtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRBcnJheUJ1ZmZlcihmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XHJcbiAgICBjb25zdCBlbnRyeSA9IGF3YWl0IHRoaXMuZmlsZS5yZXNvbHZlTG9jYWxGaWxlc3lzdGVtVXJsKGZpbGVVcmwpO1xyXG4gICAgaWYgKCFlbnRyeS5pc0ZpbGUpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYCR7ZmlsZVVybH0gaXMgbm90IGEgZmlsZSFgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhdGhTcGxpdHRlZCA9IGVudHJ5Lm5hdGl2ZVVSTC5zcGxpdCgnLycpO1xyXG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoU3BsaXR0ZWQucG9wKCk7XHJcbiAgICBjb25zdCBkaXJlY3RvcnkgPSBwYXRoU3BsaXR0ZWQuam9pbignLycpO1xyXG4gICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCB0aGlzLmZpbGUucmVhZEFzQXJyYXlCdWZmZXIoZGlyZWN0b3J5LCBmaWxlbmFtZSk7XHJcbiAgICByZXR1cm4gYXJyYXlCdWZmZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHZhbGlkYXRlSW1hZ2Uoc3JjOiBzdHJpbmcpIHtcclxuICAgIGlmIChzcmMpIHtcclxuICAgICAgY29uc3QgZW50cnkgPSBhd2FpdCB0aGlzLmZpbGUucmVzb2x2ZUxvY2FsRmlsZXN5c3RlbVVybChzcmMpO1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZS5lbmRzV2l0aCgnanBnJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzaG93RXJyb3JUb2FzdChtZXNzYWdlS2V5OiBzdHJpbmcpIHtcclxuICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQobWVzc2FnZUtleSkuc3Vic2NyaWJlKGFzeW5jICh0cmFuc2xhdGlvbikgPT4ge1xyXG4gICAgICBjb25zdCB0b2FzdCA9IGF3YWl0IHRoaXMudG9hc3RDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgbWVzc2FnZTogdHJhbnNsYXRpb24sXHJcbiAgICAgICAgbW9kZTogJ21kJyxcclxuICAgICAgICBkdXJhdGlvbjogNDAwMFxyXG4gICAgICB9KTtcclxuICAgICAgdG9hc3QucHJlc2VudCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGFkZER1bW15SW1hZ2UoKSB7XHJcbiAgICBjb25zdCBkdW1teUltYWdlID0gYXdhaXQgRGF0YVVybEhlbHBlci5nZXREYXRhVXJsRnJvbVNyY1VybCgnL2Fzc2V0cy9pbWFnZXMvZHVtbXlyZWdvYnNpbWFnZS5qcGVnJyk7XHJcbiAgICBjb25zdCBibG9iID0gRGF0YVVybEhlbHBlci5jb252ZXJ0RGF0YVVSSVRvQmluYXJ5KGR1bW15SW1hZ2UpO1xyXG4gICAgYXdhaXQgdGhpcy5hZGRJbWFnZShuZXcgQmxvYihbYmxvYl0pLCAnaW1hZ2UvanBlZycpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkSW1hZ2UoZGF0YTogQmxvYiwgbWltZVR5cGU6IHN0cmluZykge1xyXG4gICAgYXdhaXQgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5hZGRBdHRhY2htZW50KFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbklkLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBtaW1lVHlwZSxcclxuICAgICAgdGhpcy5nZW9IYXphcmQsXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkLFxyXG4gICAgICB0aGlzLmF0dGFjaG1lbnRUeXBlLFxyXG4gICAgICB0aGlzLnJlZlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUltYWdlKGltYWdlOiBBdHRhY2htZW50VXBsb2FkRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlLnJlbW92ZUF0dGFjaG1lbnQodGhpcy5yZWdpc3RyYXRpb25JZCwgaW1hZ2UuaWQpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiaW1hZ2VzXCI+XHJcbiAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIiAqbmdGb3I9XCJsZXQgYXR0YWNobWVudCBvZiBhdHRhY2htZW50czsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgPCEtLSA8aW1nIFtzcmNdPVwiY29udmVydEZpbGVTcmMoaW1hZ2UuUGljdHVyZUltYWdlQmFzZTY0KVwiIC8+IC0tPlxyXG4gICAgPHJvLWJsb2ItaW1hZ2UgW2ltZ0Jsb2JdPVwiYXR0YWNobWVudC5ibG9iXCI+PC9yby1ibG9iLWltYWdlPlxyXG4gICAgPGlvbi1mYWIgY2xhc3M9XCJpb24tbm8tbWFyZ2luXCIgc2xvdD1cImZpeGVkXCIgdmVydGljYWw9XCJ0b3BcIiBob3Jpem9udGFsPVwiZW5kXCI+XHJcbiAgICAgIDxpb24tZmFiLWJ1dHRvbiBzaXplPVwic21hbGxcIiBjb2xvcj1cImRhcmtcIiBjbGFzcz1cIm1hcC1jb250cm9sLWZhYlwiIChjbGljayk9XCJyZW1vdmVJbWFnZShhdHRhY2htZW50KVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2xvc2VcIj48L2lvbi1pY29uPlxyXG4gICAgICA8L2lvbi1mYWItYnV0dG9uPlxyXG4gICAgPC9pb24tZmFiPlxyXG4gICAgPGFwcC10ZXh0LWNvbW1lbnQgWyh2YWx1ZSldPVwiYXR0YWNobWVudC5Db21tZW50XCIgdGl0bGU9XCJ7eyBwaWN0dXJlQ29tbWVudFRleHQgfCB0cmFuc2xhdGV9fVwiIHJvd3M9XCIyXCJcclxuICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBwaWN0dXJlQ29tbWVudFBsYWNlaG9sZGVyIHwgdHJhbnNsYXRlIH19XCI+PC9hcHAtdGV4dC1jb21tZW50PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGlvbi1pdGVtIChjbGljayk9XCJhZGRDbGljaygpXCI+XHJcbiAgPGlvbi1pY29uIFtjb2xvcl09XCJpY29uQ29sb3JcIiBbbmFtZV09XCJpY29uXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICA8aW9uLWxhYmVsPnt7IHRpdGxlIHwgdHJhbnNsYXRlIH19PC9pb24tbGFiZWw+XHJcbjwvaW9uLWl0ZW0+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgQWRkV2ViVXJsTW9kYWxQYWdlIH0gZnJvbSAnLi4vLi4vcGFnZXMvYWRkLXdlYi11cmwtbW9kYWwvYWRkLXdlYi11cmwtbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IFVybFZpZXdNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWFkZC13ZWItdXJsLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hZGQtd2ViLXVybC1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hZGQtd2ViLXVybC1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEFkZFdlYlVybEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHRpdGxlID0gJ1JFR0lTVFJBVElPTi5BRERfV0VCX1VSTC5USVRMRSc7XHJcbiAgQElucHV0KCkgd2VidXJsczogVXJsVmlld01vZGVsW107XHJcbiAgQE91dHB1dCgpIHdlYnVybHNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgaWNvbiA9ICdhZGQtY2lyY2xlLW91dGxpbmUnO1xyXG4gIEBJbnB1dCgpIGljb25Db2xvciA9ICdkYXJrJztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgYXN5bmMgYWRkT3JFZGl0KGluZGV4PzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB3ZWJ1cmwgPSBpbmRleCAhPT0gdW5kZWZpbmVkID8gdGhpcy53ZWJ1cmxzW2luZGV4XSA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgY29tcG9uZW50OiBBZGRXZWJVcmxNb2RhbFBhZ2UsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7IHdlYnVybCB9XHJcbiAgICB9KTtcclxuICAgIG1vZGFsLnByZXNlbnQoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1vZGFsLm9uRGlkRGlzbWlzcygpO1xyXG4gICAgaWYgKHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgIGlmIChyZXN1bHQuZGF0YS5kZWxldGUpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUF0SW5kZXgoaW5kZXgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnNldFdlYlVybChpbmRleCwgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFkZFdlYlVybChyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRXZWJVcmwoaW5kZXg6IG51bWJlciwgdXJsOiBVcmxWaWV3TW9kZWwpIHtcclxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLndlYnVybHNbaW5kZXhdID0gdXJsO1xyXG4gICAgICB0aGlzLndlYnVybHNDaGFuZ2UuZW1pdCh0aGlzLndlYnVybHMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRXZWJVcmwodXJsOiBVcmxWaWV3TW9kZWwpIHtcclxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMud2VidXJscykge1xyXG4gICAgICAgIHRoaXMud2VidXJscyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMud2VidXJscy5wdXNoKHVybCk7XHJcbiAgICAgIHRoaXMud2VidXJsc0NoYW5nZS5lbWl0KHRoaXMud2VidXJscyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUF0SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLndlYnVybHMgJiYgdGhpcy53ZWJ1cmxzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLndlYnVybHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLndlYnVybHNDaGFuZ2UuZW1pdCh0aGlzLndlYnVybHMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtIChjbGljayk9XCJhZGRPckVkaXQoaSlcIiAqbmdGb3I9XCJsZXQgdXJsIG9mIHdlYnVybHM7IGxldCBpID0gaW5kZXhcIj5cclxuICA8aW9uLWxhYmVsPjxzcGFuICpuZ0lmPVwidXJsLlVybERlc2NyaXB0aW9uXCI+e3sgdXJsLlVybERlc2NyaXB0aW9uIH19IC0gPC9zcGFuPnt7IHVybC5VcmxMaW5lIH19PC9pb24tbGFiZWw+XHJcbjwvaW9uLWl0ZW0+XHJcbjxpb24taXRlbSAoY2xpY2spPVwiYWRkT3JFZGl0KClcIj5cclxuICA8aW9uLWljb24gW2NvbG9yXT1cImljb25Db2xvclwiIFtuYW1lXT1cImljb25cIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gIDxpb24tbGFiZWw+e3sgdGl0bGUgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuPC9pb24taXRlbT4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWJhc2U2NC1pbWFnZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Jhc2U2NC1pbWFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYmFzZTY0LWltYWdlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2U2NEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBiYXNlNjRlbmNvZGVkSW1hZ2U6IHN0cmluZztcclxuICBASW5wdXQoKSBkYXRhVXJsVGFnID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJztcclxuICBpbWdTcmM6IFNhZmVVcmw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgYXBwbHlJbWFnZVVybFRhZyA9ICF0aGlzLmJhc2U2NGVuY29kZWRJbWFnZS5zdGFydHNXaXRoKCdkYXRhOmltYWdlJyk7XHJcbiAgICB0aGlzLmltZ1NyYyA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwoXHJcbiAgICAgIChhcHBseUltYWdlVXJsVGFnID8gdGhpcy5kYXRhVXJsVGFnIDogJycpICsgdGhpcy5iYXNlNjRlbmNvZGVkSW1hZ2VcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIjxpbWcgW3NyY109XCJpbWdTcmNcIiAvPiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3JvLWJsb2ItaW1hZ2UnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ibG9iLWltYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ibG9iLWltYWdlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEJsb2JJbWFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBpbWdCbG9iOiBCbG9iO1xyXG5cclxuICBpbWdTcmM6IFNhZmVVcmw7XHJcbiAgcHJpdmF0ZSBibG9iVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5ibG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLmltZ0Jsb2IpO1xyXG4gICAgdGhpcy5pbWdTcmMgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKHRoaXMuYmxvYlVybCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmJsb2JVcmwpIHtcclxuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLmJsb2JVcmwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW1nIFtzcmNdPVwidGhpcy5pbWdTcmNcIj5cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IEhlbHBUZXh0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2hlbHAtdGV4dC9oZWxwLXRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEhlbHB0ZXh0RHRvIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEhlbHBNb2RhbFBhZ2UgfSBmcm9tICcuLi8uLi9wYWdlcy9tb2RhbC1wYWdlcy9oZWxwLW1vZGFsL2hlbHAtbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1oZWxwLXRleHQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWxwLXRleHQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2hlbHAtdGV4dC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWxwVGV4dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uVGlkOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZ2VvSGF6YXJkOiBHZW9IYXphcmQ7XHJcblxyXG4gIGlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIGhlbHBUZXh0OiBIZWxwdGV4dER0bztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGhlbHBUZXh0U2VydmljZTogSGVscFRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IHVzZXJTZXR0aW5nID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIHRoaXMuaGVscFRleHQgPSBhd2FpdCB0aGlzLmhlbHBUZXh0U2VydmljZS5nZXRIZWxwVGV4dEJ5S2V5KFxyXG4gICAgICB1c2VyU2V0dGluZy5sYW5ndWFnZSxcclxuICAgICAgdXNlclNldHRpbmcuYXBwTW9kZSxcclxuICAgICAgdGhpcy5nZW9IYXphcmQsXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuaGVscFRleHQpIHtcclxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2hvd0hlbHAoKSB7XHJcbiAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGNvbXBvbmVudDogSGVscE1vZGFsUGFnZSxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICBoZWxwVGV4dDogdGhpcy5oZWxwVGV4dC5UZXh0XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWdyaWQgKm5nSWY9XCJpc1Zpc2libGVcIj5cclxuICA8aW9uLXJvdz5cclxuICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJzaG93SGVscCgpXCIgZmlsbD1cImNsZWFyXCI+e3snSEVMUC5USVRMRScgfCB0cmFuc2xhdGV9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvaW9uLWdyaWQ+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEtkdlNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2tkdi9rZHYuc2VydmljZSc7XHJcbmltcG9ydCB7IEtkdkVsZW1lbnQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBlbnRlclpvbmUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAta2R2LXJhZGlvYnV0dG9uLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9rZHYtcmFkaW9idXR0b24tbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4va2R2LXJhZGlvYnV0dG9uLWxpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgS2R2UmFkaW9idXR0b25MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGtkdktleTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHZhbHVlOiBudW1iZXI7XHJcbiAgQElucHV0KCkgdXNlRGVzY3JpcHRpb246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2hvd1plcm9WYWx1ZXMgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGtkdmVsZW1lbnRzJDogT2JzZXJ2YWJsZTxLZHZFbGVtZW50W10+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtkdlNlcnZpY2U6IEtkdlNlcnZpY2UsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5rZHZlbGVtZW50cyQgPSB0aGlzLmtkdlNlcnZpY2VcclxuICAgICAgLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUodGhpcy5rZHZLZXkpXHJcbiAgICAgIC5waXBlKGVudGVyWm9uZSh0aGlzLm5nWm9uZSkpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGlzVmlzaWJsZShpdGVtOiBLZHZFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5zaG93WmVyb1ZhbHVlcykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBpdGVtLklkICUgMTAwICE9PSAwO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCIgKm5nSWY9XCJ0aXRsZVwiPlxyXG4gIDxpb24tbGFiZWw+XHJcbiAgICB7eyB0aXRsZSB8IHRyYW5zbGF0ZX19XHJcbiAgPC9pb24tbGFiZWw+XHJcbjwvaW9uLWxpc3QtaGVhZGVyPlxyXG48aW9uLXJhZGlvLWdyb3VwIChuZ01vZGVsQ2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBbKG5nTW9kZWwpXT1cInZhbHVlXCIgKm5nSWY9XCJrZHZlbGVtZW50cyQgfCBhc3luYyBhcyBrZHZlbGVtZW50c1wiPlxyXG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2Yga2R2ZWxlbWVudHNcIj5cclxuICAgIDxpb24taXRlbSBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogaXRlbS5JZCA9PT0gdmFsdWV9XCIgW2hpZGRlbl09XCIhaXNWaXNpYmxlKGl0ZW0pXCI+XHJcbiAgICAgIDxpb24tbGFiZWw+e3sgdXNlRGVzY3JpcHRpb24gPyBpdGVtLkRlc2NyaXB0aW9uIDogaXRlbS5OYW1lIH19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tcmFkaW8gbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgW3ZhbHVlXT1cIml0ZW0uSWRcIj48L2lvbi1yYWRpbz5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiaXRlbS5JZCA9PT0gdmFsdWVcIj5cclxuICAgICAgPG5nLWNvbnRlbnQ+XHJcbiAgICAgIDwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L2lvbi1yYWRpby1ncm91cD4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEtkdkVsZW1lbnQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBLZHZTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9rZHYva2R2LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9pbnB1dC9zZWxlY3Qvc2VsZWN0LW9wdGlvbi5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1rZHYtc2VsZWN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4va2R2LXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4va2R2LXNlbGVjdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBLZHZTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKSBrZHZLZXk6IHN0cmluZztcclxuICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBASW5wdXQoKSBzaG93WmVyb1ZhbHVlcyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbGFiZWxDb2xvciA9ICdtZWRpdW0nO1xyXG4gIEBJbnB1dCgpIHNob3dSZXNldEJ1dHRvbiA9IHRydWU7XHJcbiAgQElucHV0KCkgdXNlRGVzY3JpcHRpb246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZmlsdGVyOiAobnVtYmVyKSA9PiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGdldEljb25GdW5jOiAoa2R2RWxlbWVudDogS2R2RWxlbWVudCkgPT4gc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGtkdmVsZW1lbnRzOiBLZHZFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IHNlbGVjdE9wdGlvbnMoKTogU2VsZWN0T3B0aW9uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMua2R2ZWxlbWVudHMubWFwKChlbCkgPT4gKHtcclxuICAgICAgaWQ6IGVsLklkLFxyXG4gICAgICB0ZXh0OiB0aGlzLnVzZURlc2NyaXB0aW9uID8gZWwuRGVzY3JpcHRpb24gOiBlbC5OYW1lLFxyXG4gICAgICBkaXNhYmxlZDogIXRoaXMuaXNWaXNpYmxlKGVsKSxcclxuICAgICAgaWNvbjogdGhpcy5nZXRJY29uRnVuYyA/IHRoaXMuZ2V0SWNvbkZ1bmMoZWwpIDogdW5kZWZpbmVkXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtkdlNlcnZpY2U6IEtkdlNlcnZpY2UsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmtkdlNlcnZpY2VcclxuICAgICAgLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUodGhpcy5rZHZLZXkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGtkdmVsZW1lbnRzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMua2R2ZWxlbWVudHMgPSBrZHZlbGVtZW50cztcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWaXNpYmxlKGl0ZW06IEtkdkVsZW1lbnQpIHtcclxuICAgIGlmICh0aGlzLmZpbHRlciAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmZpbHRlcihpdGVtLklkKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuc2hvd1plcm9WYWx1ZXMpIHtcclxuICAgICAgcmV0dXJuIGl0ZW0uSWQgJSAxMDAgIT09IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtPlxyXG4gIDxpb24tbGFiZWwgW2NvbG9yXT1cImxhYmVsQ29sb3JcIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7IHRpdGxlIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cInZhbHVlXCIgW29wdGlvbnNdPVwic2VsZWN0T3B0aW9uc1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFt0aXRsZV09XCJ0aXRsZVwiXHJcbiAgICBbc2hvd1Jlc2V0XT1cInNob3dSZXNldEJ1dHRvblwiIChzZWxlY3RlZFZhbHVlQ2hhbmdlKT1cInZhbHVlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiPlxyXG4gIDwvYXBwLXNlbGVjdD5cclxuPC9pb24taXRlbT4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQWxlcnRDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kYWxTYXZlT3JEZWxldGVCdXR0b25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBzYXZlVGV4dCA9ICdESUFMT0dTLk9LJztcclxuICBASW5wdXQoKSBzYXZlRGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgc2F2ZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlbGV0ZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgc2hvd0RlbGV0ZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGFsZXJ0VGl0bGUgPSAnRElBTE9HUy5BUkVfWU9VX1NVUkUnO1xyXG4gIEBJbnB1dCgpIGFsZXJ0TWVzc2FnZSA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgb2soKSB7XHJcbiAgICB0aGlzLnNhdmVDbGlja2VkLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGRlbGV0ZSgpIHtcclxuICAgIGNvbnN0IHRvVHJhbnNsYXRlID0gW3RoaXMuYWxlcnRUaXRsZSwgJ0RJQUxPR1MuQ0FOQ0VMJywgJ0RJQUxPR1MuT0snXTtcclxuICAgIGlmICh0aGlzLmFsZXJ0TWVzc2FnZSkge1xyXG4gICAgICB0b1RyYW5zbGF0ZS5wdXNoKHRoaXMuYWxlcnRNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KHRvVHJhbnNsYXRlKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBhbGVydCA9IGF3YWl0IHRoaXMuYWxlcnRDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGhlYWRlcjogdHJhbnNsYXRpb25zW3RoaXMuYWxlcnRUaXRsZV0sXHJcbiAgICAgIG1lc3NhZ2U6IHRoaXMuYWxlcnRNZXNzYWdlID8gdHJhbnNsYXRpb25zW3RoaXMuYWxlcnRNZXNzYWdlXSA6IHVuZGVmaW5lZCxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuT0snXSxcclxuICAgICAgICAgIGhhbmRsZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVDbGlja2VkLmVtaXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYWxlcnQucHJlc2VudCgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgc2l6ZT1cIjZcIiBvZmZzZXQ9XCIzXCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIFtkaXNhYmxlZF09XCJzYXZlRGlzYWJsZWRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJzb2xpZFwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJvaygpXCI+XHJcbiAgICAgICAge3sgc2F2ZVRleHQgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuICA8aW9uLXJvdyAqbmdJZj1cInNob3dEZWxldGVcIj5cclxuICAgIDxpb24tY29sIHNpemU9XCI2XCIgb2Zmc2V0PVwiM1wiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiZGVsZXRlKClcIiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiBleHBhbmQ9XCJibG9ja1wiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidHJhc2hcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIHt7ICdESUFMT0dTLkRFTEVURScgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuPC9pb24tZ3JpZD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdW1tYXJ5SXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zdW1tYXJ5LWl0ZW0uc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24gfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSVN1bW1hcnlJdGVtIH0gZnJvbSAnLi4vc3VtbWFyeS1pdGVtL3N1bW1hcnktaXRlbS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1uYXZpZ2F0aW9uLWJ1dHRvbnMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLWJ1dHRvbnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25hdmlnYXRpb24tYnV0dG9ucy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uQnV0dG9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIG5leHQ6IElTdW1tYXJ5SXRlbTtcclxuICBwcmV2aW91czogSVN1bW1hcnlJdGVtO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3VtbWFyeUl0ZW1TZXJ2aWNlOiBTdW1tYXJ5SXRlbVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VXJsID0gdGhpcy5yb3V0ZXIudXJsO1xyXG4gICAgY29uc3QgcHJldkFuZE5leHQgPSBhd2FpdCB0aGlzLnN1bW1hcnlJdGVtU2VydmljZS5nZXRQcmV2aW91c0FuZE5leHQoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICBjdXJyZW50VXJsXHJcbiAgICApO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHByZXZBbmROZXh0Lm5leHQpIHtcclxuICAgICAgICB0aGlzLm5leHQgPSBwcmV2QW5kTmV4dC5uZXh0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwcmV2QW5kTmV4dC5wcmV2aW91cykge1xyXG4gICAgICAgIHRoaXMucHJldmlvdXMgPSBwcmV2QW5kTmV4dC5wcmV2aW91cztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB0aGlzLnN1bW1hcnlJdGVtU2VydmljZS5uYXZpZ2F0ZVRvKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgdGhpcy5wcmV2aW91cyxcclxuICAgICAgJ2JhY2snXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29Gb3J3YXJkKCkge1xyXG4gICAgdGhpcy5zdW1tYXJ5SXRlbVNlcnZpY2UubmF2aWdhdGVUbyh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5uZXh0LCAnZm9yd2FyZCcpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWdyaWQ+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aW9uLWNvbCBzaXplPVwiNlwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cImxlZnQtYnV0dG9uXCIgKm5nSWY9XCJwcmV2aW91c1wiIChjbGljayk9XCJnb0JhY2soKVwiIGNvbG9yPVwicHJpbWFyeVwiIGZpbGw9XCJvdXRsaW5lXCIgZXhwYW5kPVwiYmxvY2tcIj5cclxuICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cImFycm93LWJhY2tcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDxpb24tdGV4dD57eyBwcmV2aW91cy50aXRsZSB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRleHQ+XHJcbiAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWNvbD5cclxuICAgIDxpb24tY29sIHNpemU9XCI2XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIGNsYXNzPVwicmlnaHQtYnV0dG9uXCIgKm5nSWY9XCJuZXh0XCIgKGNsaWNrKT1cImdvRm9yd2FyZCgpXCIgY29sb3I9XCJwcmltYXJ5XCIgZmlsbD1cIm91dGxpbmVcIiBleHBhbmQ9XCJibG9ja1wiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwiZW5kXCIgbmFtZT1cImFycm93LWZvcndhcmRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDxpb24tdGV4dD57eyBuZXh0LnRpdGxlIHwgdHJhbnNsYXRlIH19PC9pb24tdGV4dD5cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuPC9pb24tZ3JpZD4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnVtZXJpY0lucHV0TW9kYWxQYWdlIH0gZnJvbSAnLi4vLi4vcGFnZXMvbW9kYWwtcGFnZXMvbnVtZXJpYy1pbnB1dC1tb2RhbC9udW1lcmljLWlucHV0LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1udW1lcmljLWlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbnVtZXJpYy1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbnVtZXJpYy1pbnB1dC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOdW1lcmljSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRlY2ltYWxQbGFjZXMgPSAwO1xyXG4gIEBJbnB1dCgpIG1pbiA9IC0xMDAwMDA7XHJcbiAgQElucHV0KCkgbWF4ID0gMTAwMDAwO1xyXG4gIEBJbnB1dCgpIHN1ZmZpeDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRlY2ltYWxTZXBhcmF0b3I7XHJcbiAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNvbnZlcnRSYXRpbzogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XHJcbiAgICBjb25zdCBjb252ZXJ0ZWQgPSB0aGlzLmNvbnZlcnQodGhpcy52YWx1ZSwgJ2Zyb20nKTtcclxuICAgIGlmIChjb252ZXJ0ZWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gY29udmVydGVkLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBhc3luYyBvcGVuUGlja2VyKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzT3BlbiAmJiAhdGhpcy5yZWFkb25seSkge1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgICBjb21wb25lbnQ6IE51bWVyaWNJbnB1dE1vZGFsUGFnZSxcclxuICAgICAgICBjc3NDbGFzczogJ251bWVyaWMtaW5wdXQtbW9kYWwnLFxyXG4gICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy5jb252ZXJ0KHRoaXMudmFsdWUsICdmcm9tJyksXHJcbiAgICAgICAgICBkZWNpbWFsUGxhY2VzOiB0aGlzLmRlY2ltYWxQbGFjZXMsXHJcbiAgICAgICAgICBtaW46IHRoaXMubWluLFxyXG4gICAgICAgICAgbWF4OiB0aGlzLm1heCxcclxuICAgICAgICAgIHN1ZmZpeDogdGhpcy5zdWZmaXgsXHJcbiAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiB0aGlzLmRlY2ltYWxTZXBhcmF0b3IsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy50aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG1vZGFsLnByZXNlbnQoKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIGlmIChyZXN1bHQuZGF0YSAmJiByZXN1bHQuZGF0YS5vaykge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNvbnZlcnQocmVzdWx0LmRhdGEudmFsdWUsICd0bycpO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb252ZXJ0KHZhbDogbnVtYmVyLCBkaXJlY3Rpb246ICdmcm9tJyB8ICd0bycpIHtcclxuICAgIGlmIChcclxuICAgICAgdmFsID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgdmFsID09PSBudWxsIHx8XHJcbiAgICAgIHZhbCA9PT0gMCB8fFxyXG4gICAgICB0aGlzLmNvbnZlcnRSYXRpbyA9PT0gdW5kZWZpbmVkXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICAgIHJldHVybiBkaXJlY3Rpb24gPT09ICdmcm9tJ1xyXG4gICAgICA/IHZhbCAqIHRoaXMuY29udmVydFJhdGlvXHJcbiAgICAgIDogdmFsIC8gdGhpcy5jb252ZXJ0UmF0aW87XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwib3BlblBpY2tlcigpXCIgKGtleXVwLmVudGVyKT1cIm9wZW5QaWNrZXIoKVwiPlxyXG4gIDxpb24tbGFiZWwgKm5nSWY9XCJ0aXRsZVwiIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyB0aXRsZSB8IHRyYW5zbGF0ZX19XHJcbiAgPC9pb24tbGFiZWw+XHJcbiAgPGlvbi10ZXh0IGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtc3RhcnRcIiAqbmdJZj1cImRpc3BsYXlWYWx1ZSBlbHNlIHBoXCI+e3sgZGlzcGxheVZhbHVlIH19PC9pb24tdGV4dD5cclxuPC9pb24taXRlbT5cclxuPG5nLXRlbXBsYXRlICNwaD5cclxuICA8aW9uLXRleHQgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1zdGFydFwiIGNvbG9yPVwibWVkaXVtXCI+e3sgcGxhY2Vob2xkZXIgfCB0cmFuc2xhdGUgfX08L2lvbi10ZXh0PlxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RyYXRpb25Db250ZW50V3JhcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIEBPdXRwdXQoKSByZXNldCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBASW5wdXQoKSBpc0VtcHR5OiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgZW1pdFJlc2V0KCkge1xyXG4gICAgdGhpcy5yZXNldC5lbWl0KCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24tZ3JpZCAqbmdJZj1cInJlZ2lzdHJhdGlvblwiIGNsYXNzPVwicHVsbC1sYXN0LWJvdHRvbSBpb24tbm8tcGFkZGluZyBpb24tbm8tbWFyZ2luXCI+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxhcHAtaGVscC10ZXh0IFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCI+PC9hcHAtaGVscC10ZXh0PlxyXG4gICAgICA8YXBwLW5hdmlnYXRpb24tYnV0dG9ucyBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiPjwvYXBwLW5hdmlnYXRpb24tYnV0dG9ucz5cclxuICAgICAgPGFwcC1zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbiBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCJcclxuICAgICAgICAocmVzZXQpPVwiZW1pdFJlc2V0KClcIj48L2FwcC1zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvaW9uLWdyaWQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF2Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7IFxyXG5pbXBvcnQgeyBTbWFydENoYW5nZXMgfSBmcm9tICdzcmMvYXBwL2NvcmUvaGVscGVycy9zaW1wbGUtY2hhbmdlcy5oZWxwZXInO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2F2ZS1hbmQtZ28tYmFjay1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zYXZlLWFuZC1nby1iYWNrLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2F2ZS1hbmQtZ28tYmFjay1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2F2ZUFuZEdvQmFja0J1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgQE91dHB1dCgpIHJlc2V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBoYXNEYXRhID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuYXZDb250b2xsZXI6IE5hdkNvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICYgU21hcnRDaGFuZ2VzPHRoaXM+KTogdm9pZCB7XHJcbiAgICBpZihjaGFuZ2VzICYmIGNoYW5nZXMucmVnaXN0cmF0aW9uICYmICFjaGFuZ2VzLnJlZ2lzdHJhdGlvbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICB0aGlzLnNldEhhc0RhdGEoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zZXRIYXNEYXRhKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEhhc0RhdGEoKTogdm9pZCB7XHJcbiAgICBpZih0aGlzLnJlZ2lzdHJhdGlvbiAhPSBudWxsICYmIHRoaXMucmVnaXN0cmF0aW9uVGlkICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZClcclxuICAgICAgLnBpcGUoKHRha2UoMSkpKS5zdWJzY3JpYmUoKGhhc0RhdGEpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGFzRGF0YSA9IGhhc0RhdGE7XHJcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnb0JhY2soKSB7XHJcbiAgICB0aGlzLm5hdkNvbnRvbGxlci5uYXZpZ2F0ZUJhY2soJ3JlZ2lzdHJhdGlvbi9lZGl0LycgKyB0aGlzLnJlZ2lzdHJhdGlvbi5pZCk7XHJcbiAgfVxyXG5cclxuICBkb1Jlc2V0KCkge1xyXG4gICAgdGhpcy5yZXNldC5lbWl0KCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24tZ3JpZD5cclxuICA8aW9uLXJvdz5cclxuICAgIDxpb24tY29sIHNpemU9XCIxMlwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cImJhY2stYnV0dG9uXCIgZXhwYW5kPVwiYmxvY2tcIiBmaWxsPVwic29saWRcIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiZ29CYWNrKClcIlxyXG4gICAgICAgIHJvdXRlckRpcmVjdGlvbj1cImJhY2t3YXJkXCI+XHJcbiAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5CQUNLX1RPX09CU0VSVkFUSU9OJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICA8L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgPC9pb24tcm93PlxyXG4gIDxpb24tcm93IGNsYXNzPVwicmVzZXQtYnV0dG9uLXJvd1wiICpuZ0lmPVwiaGFzRGF0YVwiPlxyXG4gICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgPGlvbi1idXR0b24gY2xhc3M9XCJyZXNldC1idXR0b25cIiAoY2xpY2spPVwiZG9SZXNldCgpXCIgY29sb3I9XCJkYXJrXCIgc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCI+XHJcbiAgICAgICAgPHN2Zy1pY29uIHNyYz1cIi9hc3NldHMvaWNvbi9yZXNldC5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgIHt7XCJSRUdJU1RSQVRJT04uUkVTRVRcIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvaW9uLWdyaWQ+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE5nWm9uZSxcclxuICBWaWV3Q2hpbGRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL21hcC9zZXJ2aWNlcy9tYXAvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9oZWxwZXJzL2hlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFwU2VhcmNoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL21hcC9zZXJ2aWNlcy9tYXAtc2VhcmNoL21hcC1zZWFyY2guc2VydmljZSc7XHJcbmltcG9ydCB7IHRha2UsIHN3aXRjaE1hcCwgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci9nZW9sb2NhdGlvbic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9jYXRpb25OYW1lIH0gZnJvbSAnLi4vLi4vLi4vbWFwL3NlcnZpY2VzL21hcC1zZWFyY2gvbG9jYXRpb24tbmFtZS5tb2RlbCc7XHJcbmltcG9ydCB7XHJcbiAgT2JzTG9jYXRpb25zUmVzcG9uc2VEdG9WMixcclxuICBPYnNMb2NhdGlvbkVkaXRNb2RlbFxyXG59IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9sb2NhdGlvbi9sb2NhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXRtU291cmNlIH0gZnJvbSAnLi4vLi4vcGFnZXMvb2JzLWxvY2F0aW9uL3V0bS1zb3VyY2UuZW51bSc7XHJcbmltcG9ydCB7IFZpZXdJbmZvIH0gZnJvbSAnLi4vLi4vLi4vbWFwL3NlcnZpY2VzL21hcC1zZWFyY2gvdmlldy1pbmZvLm1vZGVsJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBJb25JbnB1dCB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgTGVhZmxldENsdXN0ZXJIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi9tYXAvaGVscGVycy9sZWFmbGV0LWNsdXNlci5oZWxwZXInO1xyXG5pbXBvcnQgeyBHZW9Qb3NpdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2dlby1wb3NpdGlvbi9nZW8tcG9zaXRpb24uc2VydmljZSc7XHJcblxyXG5jb25zdCBkZWZhdWx0SWNvbiA9IEwuaWNvbih7XHJcbiAgaWNvblVybDogJ2xlYWZsZXQvbWFya2VyLWljb24ucG5nJyxcclxuICBzaGFkb3dVcmw6ICdsZWFmbGV0L21hcmtlci1zaGFkb3cucG5nJyxcclxuICBpY29uU2l6ZTogWzI1LCA0MV0sXHJcbiAgaWNvbkFuY2hvcjogWzEyLCA0MV0sXHJcbiAgcG9wdXBBbmNob3I6IFsxLCAtMzRdLFxyXG4gIHRvb2x0aXBBbmNob3I6IFsxNiwgLTI4XSxcclxuICBzaGFkb3dTaXplOiBbNDEsIDQxXVxyXG59KTtcclxuXHJcbmNvbnN0IHByZXZpb3VzVXNlZFBsYWNlSWNvbiA9IEwuaWNvbih7XHJcbiAgaWNvblVybDogJy9hc3NldHMvaWNvbi9tYXAvcHJldi11c2VkLXBsYWNlLnN2ZycsXHJcbiAgaWNvblNpemU6IFsyNSwgNDFdLFxyXG4gIGljb25BbmNob3I6IFsxMiwgNDFdLFxyXG4gIHNoYWRvd1VybDogJ2xlYWZsZXQvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gIHNoYWRvd1NpemU6IFs0MSwgNDFdXHJcbn0pO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2V0LWxvY2F0aW9uLWluLW1hcCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NldC1sb2NhdGlvbi1pbi1tYXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NldC1sb2NhdGlvbi1pbi1tYXAuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBnZW9IYXphcmQ6IEdlb0hhemFyZDtcclxuICBASW5wdXQoKSBmcm9tTWFya2VyOiBMLk1hcmtlcjtcclxuICBASW5wdXQoKSBmcm9tTWFya2VySWNvblVybCA9ICcvYXNzZXRzL2ljb24vbWFwL29icy1sb2NhdGlvbi5zdmcnO1xyXG4gIEBJbnB1dCgpIGxvY2F0aW9uTWFya2VyOiBMLk1hcmtlcjtcclxuICBASW5wdXQoKSBsb2NhdGlvbk1hcmtlckljb25VcmwgPSAnL2Fzc2V0cy9pY29uL21hcC9vYnMtbG9jYXRpb24uc3ZnJztcclxuICBAT3V0cHV0KCkgbG9jYXRpb25TZXQgPSBuZXcgRXZlbnRFbWl0dGVyPE9ic0xvY2F0aW9uRWRpdE1vZGVsPigpO1xyXG4gIEBJbnB1dCgpIHNob3dQcmV2aW91c1VzZWRMb2NhdGlvbnMgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNob3dVc2VyUG9zaXRpb24gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGNvbmZpcm1Mb2NhdGlvblRleHQgPSAnUkVHSVNUUkFUSU9OLk9CU19MT0NBVElPTi5DT05GSVJNX1RFWFQnO1xyXG4gIEBJbnB1dCgpIGZyb21Mb2NhdGlvblRleHQgPSAnUkVHSVNUUkFUSU9OLk9CU19MT0NBVElPTi5DVVJSRU5UX0xPQ0FUSU9OJztcclxuICBASW5wdXQoKSBsb2NhdGlvblRpdGxlID0gJ1JFR0lTVFJBVElPTi5PQlNfTE9DQVRJT04uVElUTEUnO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkTG9jYXRpb246IE9ic0xvY2F0aW9uc1Jlc3BvbnNlRHRvVjI7XHJcbiAgQE91dHB1dCgpIG1hcFJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxMLk1hcD4oKTtcclxuICBASW5wdXQoKSBzaG93UG9seWxpbmUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNob3dGcm9tTWFya2VySW5EZXRhaWxzID0gdHJ1ZTtcclxuICBASW5wdXQoKSBhbGxvd0VkaXRMb2NhdGlvbk5hbWUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBpc1NhdmVEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIG1hcDogTC5NYXA7XHJcbiAgZm9sbG93TW9kZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgdXNlcnBvc2l0aW9uOiBQb3NpdGlvbjtcclxuICBwcml2YXRlIHBhdGhMaW5lOiBMLlBvbHlsaW5lO1xyXG4gIHNob3dEZXRhaWxzID0gZmFsc2U7XHJcbiAgZGlzdGFuY2VUb09ic2VydmF0aW9uVGV4dCA9ICcnO1xyXG4gIHZpZXdJbmZvOiBWaWV3SW5mbztcclxuICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICBwcml2YXRlIGxvY2F0aW9uczogT2JzTG9jYXRpb25zUmVzcG9uc2VEdG9WMltdID0gW107XHJcbiAgcHJpdmF0ZSBuZ0Rlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBsb2NhdGlvbkdyb3VwID0gTGVhZmxldENsdXN0ZXJIZWxwZXIuY3JlYXRlTWFya2VyQ2x1c3Rlckdyb3VwKCk7XHJcbiAgZWRpdExvY2F0aW9uTmFtZSA9IGZhbHNlO1xyXG4gIGxvY2F0aW9uTmFtZTogc3RyaW5nO1xyXG5cclxuICBAVmlld0NoaWxkKCdlZGl0TG9jYXRpb25OYW1lSW5wdXQnKSBlZGl0TG9jYXRpb25OYW1lSW5wdXQ6IElvbklucHV0O1xyXG5cclxuICBnZXQgY2FuRWRpdExvY2F0aW9uTmFtZSgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuYWxsb3dFZGl0TG9jYXRpb25OYW1lICYmXHJcbiAgICAgICEodGhpcy5zZWxlY3RlZExvY2F0aW9uICYmIHRoaXMuc2VsZWN0ZWRMb2NhdGlvbi5JZClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgaGVscGVyU2VydmljZTogSGVscGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIG1hcFNlYXJjaFNlcnZpY2U6IE1hcFNlYXJjaFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdlb1Bvc2l0aW9uU2VydmljZTogR2VvUG9zaXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2NhdGlvblNlcnZpY2U6IExvY2F0aW9uU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBMLk1hcmtlci5wcm90b3R5cGUub3B0aW9ucy5pY29uID0gZGVmYXVsdEljb247XHJcblxyXG4gICAgY29uc3QgbG9jYXRpb25NYXJrZXJJY29uID0gTC5pY29uKHtcclxuICAgICAgaWNvblVybDogdGhpcy5sb2NhdGlvbk1hcmtlckljb25VcmwsXHJcbiAgICAgIGljb25TaXplOiBbMjUsIDQxXSxcclxuICAgICAgaWNvbkFuY2hvcjogWzEyLCA0MV0sXHJcbiAgICAgIHNoYWRvd1VybDogJ2xlYWZsZXQvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgICBzaGFkb3dTaXplOiBbNDEsIDQxXVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmZvbGxvd01vZGUgPSAhdGhpcy5sb2NhdGlvbk1hcmtlciAmJiAhdGhpcy5mcm9tTWFya2VyO1xyXG4gICAgdGhpcy5tYXBTZXJ2aWNlLmZvbGxvd01vZGUgPSB0aGlzLmZvbGxvd01vZGU7XHJcbiAgICBpZiAoIXRoaXMubG9jYXRpb25NYXJrZXIpIHtcclxuICAgICAgaWYgKHRoaXMuZnJvbU1hcmtlcikge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25NYXJrZXIgPSBMLm1hcmtlcih0aGlzLmZyb21NYXJrZXIuZ2V0TGF0TG5nKCksIHtcclxuICAgICAgICAgIGljb246IGxvY2F0aW9uTWFya2VySWNvblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGxhc3RWaWV3ID0gYXdhaXQgdGhpcy5tYXBTZXJ2aWNlLm1hcFZpZXckXHJcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICAgIGlmIChsYXN0Vmlldykge1xyXG4gICAgICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlciA9IEwubWFya2VyKGxhc3RWaWV3LmNlbnRlciwge1xyXG4gICAgICAgICAgICBpY29uOiBsb2NhdGlvbk1hcmtlckljb25cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmxvY2F0aW9uTWFya2VyID0gTC5tYXJrZXIoTC5sYXRMbmcoNTkuMSwgMTAuMyksIHtcclxuICAgICAgICAgICAgaWNvbjogbG9jYXRpb25NYXJrZXJJY29uXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMudXBkYXRlTWFwVmlld0luZm8oKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLm5leHQoKTtcclxuICAgIHRoaXMubmdEZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRMb2NhdGlvbnNPYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8T2JzTG9jYXRpb25zUmVzcG9uc2VEdG9WMltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBTZXJ2aWNlLm1hcFZpZXckLnBpcGUoXHJcbiAgICAgIGZpbHRlcihcclxuICAgICAgICAobWFwVmlldykgPT5cclxuICAgICAgICAgIG1hcFZpZXcgJiZcclxuICAgICAgICAgIG1hcFZpZXcuY2VudGVyICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgIG1hcFZpZXcuYm91bmRzICE9PSB1bmRlZmluZWRcclxuICAgICAgKSxcclxuICAgICAgc3dpdGNoTWFwKChtYXBWaWV3KSA9PlxyXG4gICAgICAgIHRoaXMubG9jYXRpb25TZXJ2aWNlLmdldExvY2F0aW9uV2l0aGluUmFkaXVzT2JzZXJ2YWJsZShcclxuICAgICAgICAgIHRoaXMuZ2VvSGF6YXJkLFxyXG4gICAgICAgICAgbWFwVmlldy5jZW50ZXIubGF0LFxyXG4gICAgICAgICAgbWFwVmlldy5jZW50ZXIubG5nLFxyXG4gICAgICAgICAgTWF0aC5yb3VuZChcclxuICAgICAgICAgICAgbWFwVmlldy5ib3VuZHNcclxuICAgICAgICAgICAgICAuZ2V0Tm9ydGhXZXN0KClcclxuICAgICAgICAgICAgICAuZGlzdGFuY2VUbyhtYXBWaWV3LmJvdW5kcy5nZXRTb3V0aEVhc3QoKSkgLyAyXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRMb2NhdGlvbklmTm90RXhpc3RzKGxvYzogT2JzTG9jYXRpb25zUmVzcG9uc2VEdG9WMik6IHZvaWQge1xyXG4gICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLmxvY2F0aW9ucy5zb21lKChsb2NhdGlvbikgPT4gbG9jLklkID09PSBsb2NhdGlvbi5JZCk7XHJcbiAgICBpZiAoIWV4aXN0aW5nKSB7XHJcbiAgICAgIHRoaXMubG9jYXRpb25zLnB1c2gobG9jKTtcclxuICAgICAgY29uc3QgbWFya2VyID0gTC5tYXJrZXIoXHJcbiAgICAgICAgTC5sYXRMbmcobG9jLkxhdExuZ09iamVjdC5MYXRpdHVkZSwgbG9jLkxhdExuZ09iamVjdC5Mb25naXR1ZGUpLFxyXG4gICAgICAgIHsgaWNvbjogcHJldmlvdXNVc2VkUGxhY2VJY29uIH1cclxuICAgICAgKS5hZGRUbyh0aGlzLmxvY2F0aW9uR3JvdXApO1xyXG4gICAgICBtYXJrZXIub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRUb1ByZXZvdXNseVVzZWRMb2NhdGlvbihsb2MpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTWFwUmVhZHkobTogTC5NYXApOiB2b2lkIHtcclxuICAgIHRoaXMubWFwID0gbTtcclxuICAgIHRoaXMubG9jYXRpb25NYXJrZXIuc2V0WkluZGV4T2Zmc2V0KDEwMCkuYWRkVG8odGhpcy5tYXApO1xyXG4gICAgaWYgKHRoaXMuZnJvbU1hcmtlcikge1xyXG4gICAgICB0aGlzLmZyb21NYXJrZXIuYWRkVG8odGhpcy5tYXApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2NhdGlvbkdyb3VwLmFkZFRvKHRoaXMubWFwKTtcclxuICAgIHRoaXMubWFwLm9uKCdkcmFnc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5tYXAub24oJ2RyYWdlbmQnLCAoKSA9PiB0aGlzLnVwZGF0ZU1hcFZpZXdJbmZvKCkpO1xyXG4gICAgdGhpcy5tYXAub24oJ2RyYWcnLCAoKSA9PiB0aGlzLm1vdmVMb2NhdGlvbk1hcmtlclRvQ2VudGVyKCkpO1xyXG5cclxuICAgIGlmICh0aGlzLnNob3dQcmV2aW91c1VzZWRMb2NhdGlvbnMpIHtcclxuICAgICAgdGhpcy5nZXRMb2NhdGlvbnNPYnNlcnZhYmxlKClcclxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSlcclxuICAgICAgICAuc3Vic2NyaWJlKChsb2NhdGlvbnMpID0+IHtcclxuICAgICAgICAgIGxvY2F0aW9ucy5mb3JFYWNoKChsb2MpID0+IHRoaXMuYWRkTG9jYXRpb25JZk5vdEV4aXN0cyhsb2MpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1hcFNlcnZpY2UuZm9sbG93TW9kZSRcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZm9sbG93TW9kZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5mb2xsb3dNb2RlICYmIHRoaXMudXNlcnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLnNldExvY2F0aW9uTWFya2VyTGF0TG5nKHtcclxuICAgICAgICAgICAgbGF0OiB0aGlzLnVzZXJwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsXHJcbiAgICAgICAgICAgIGxuZzogdGhpcy51c2VycG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hcFNlYXJjaFNlcnZpY2UubWFwU2VhcmNoQ2xpY2skXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGF0TG5nID0gaXRlbSBpbnN0YW5jZW9mIEwuTGF0TG5nID8gaXRlbSA6IGl0ZW0ubGF0bG5nO1xyXG4gICAgICAgIHRoaXMuc2V0TG9jYXRpb25NYXJrZXJMYXRMbmcobGF0TG5nKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5nZW9Qb3NpdGlvblNlcnZpY2UuY3VycmVudFBvc2l0aW9uJFxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSlcclxuICAgICAgLnN1YnNjcmliZSgocG9zKSA9PiB0aGlzLnBvc2l0aW9uQ2hhbmdlKHBvcykpO1xyXG5cclxuICAgIGlmICghdGhpcy5mb2xsb3dNb2RlKSB7XHJcbiAgICAgIHRoaXMubWFwLnNldFZpZXcodGhpcy5sb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKSwgMTUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWFwUmVhZHkuZW1pdCh0aGlzLm1hcCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGhBbmREaXN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRMb2NhdGlvbk1hcmtlckxhdExuZyhsYXRMbmc6IEwuTGF0TG5nRXhwcmVzc2lvbik6IHZvaWQge1xyXG4gICAgdGhpcy5sb2NhdGlvbk1hcmtlci5zZXRMYXRMbmcobGF0TG5nKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aEFuZERpc3RhbmNlKCk7XHJcbiAgICB0aGlzLnVwZGF0ZU1hcFZpZXdJbmZvKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFRvUHJldm91c2x5VXNlZExvY2F0aW9uKGxvY2F0aW9uOiBPYnNMb2NhdGlvbnNSZXNwb25zZUR0b1YyKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZm9sbG93TW9kZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgdGhpcy5zZXRMb2NhdGlvbk1hcmtlckxhdExuZyhcclxuICAgICAgICBMLmxhdExuZyhcclxuICAgICAgICAgIGxvY2F0aW9uLkxhdExuZ09iamVjdC5MYXRpdHVkZSxcclxuICAgICAgICAgIGxvY2F0aW9uLkxhdExuZ09iamVjdC5Mb25naXR1ZGVcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWFwLnBhblRvKHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCkpO1xyXG4gICAgICB0aGlzLnNob3dEZXRhaWxzID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtb3ZlTG9jYXRpb25NYXJrZXJUb0NlbnRlcigpOiB2b2lkIHtcclxuICAgIHRoaXMubWFwU2VydmljZS5mb2xsb3dNb2RlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdGVkTG9jYXRpb24gPSBudWxsO1xyXG4gICAgY29uc3QgY2VudGVyID0gdGhpcy5tYXAuZ2V0Q2VudGVyKCk7XHJcbiAgICB0aGlzLmxvY2F0aW9uTWFya2VyLnNldExhdExuZyhjZW50ZXIpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoQW5kRGlzdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlTWFwVmlld0luZm8oKTogdm9pZCB7XHJcbiAgICBjb25zdCBsYXRMbmcgPSB0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpO1xyXG4gICAgdGhpcy5tYXBTZWFyY2hTZXJ2aWNlXHJcbiAgICAgIC5nZXRWaWV3SW5mbyh7IGNlbnRlcjogbGF0TG5nLCBib3VuZHM6IG51bGwsIHpvb206IDAgfSwgdGhpcy5nZW9IYXphcmQpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKHZhbCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aWV3SW5mbyA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKF8pID0+IHtcclxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0luZm8gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogUG9zaXRpb24pIHtcclxuICAgIHRoaXMudXNlcnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICBpZiAodGhpcy5mb2xsb3dNb2RlKSB7XHJcbiAgICAgIHRoaXMuc2V0TG9jYXRpb25NYXJrZXJMYXRMbmcoe1xyXG4gICAgICAgIGxhdDogcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxyXG4gICAgICAgIGxuZzogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aEFuZERpc3RhbmNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQYXRoQW5kRGlzdGFuY2UoKTogdm9pZCB7XHJcbiAgICBjb25zdCBmcm9tID0gdGhpcy5mcm9tTWFya2VyXHJcbiAgICAgID8gdGhpcy5mcm9tTWFya2VyLmdldExhdExuZygpXHJcbiAgICAgIDogdGhpcy51c2VycG9zaXRpb25cclxuICAgICAgICA/IEwubGF0TG5nKFxyXG4gICAgICAgICAgdGhpcy51c2VycG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgdGhpcy51c2VycG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxyXG4gICAgICAgIClcclxuICAgICAgICA6IHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCk7XHJcbiAgICBjb25zdCBsb2NhdGlvbk1hcmtlckxhdExuZyA9IHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCk7XHJcbiAgICBjb25zdCBwYXRoID0gW2xvY2F0aW9uTWFya2VyTGF0TG5nLCBmcm9tXTtcclxuICAgIGlmICh0aGlzLm1hcCkge1xyXG4gICAgICBpZiAoIXRoaXMucGF0aExpbmUpIHtcclxuICAgICAgICB0aGlzLnBhdGhMaW5lID0gTC5wb2x5bGluZShwYXRoLCB7XHJcbiAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgICAgICAgIHdlaWdodDogNixcclxuICAgICAgICAgIG9wYWNpdHk6IDAuOSxcclxuICAgICAgICAgIGRhc2hBcnJheTogJzEsMTInXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1BvbHlsaW5lKSB7XHJcbiAgICAgICAgICB0aGlzLnBhdGhMaW5lLmFkZFRvKHRoaXMubWFwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYXRoTGluZS5zZXRMYXRMbmdzKHBhdGgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmZyb21NYXJrZXIpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLmZyb21NYXJrZXIuZ2V0TGF0TG5nKCkuZXF1YWxzKHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCkpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLmZyb21NYXJrZXIuc2V0T3BhY2l0eSgwKTtcclxuICAgICAgICAgIHRoaXMucGF0aExpbmUuc2V0U3R5bGUoeyBvcGFjaXR5OiAwIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmZyb21NYXJrZXIuc2V0T3BhY2l0eSgxKTtcclxuICAgICAgICAgIHRoaXMucGF0aExpbmUuc2V0U3R5bGUoeyBvcGFjaXR5OiAwLjkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmRpc3RhbmNlVG9PYnNlcnZhdGlvblRleHQgPSB0aGlzLmhlbHBlclNlcnZpY2UuZ2V0RGlzdGFuY2VUZXh0KFxyXG4gICAgICAgIGxvY2F0aW9uTWFya2VyTGF0TG5nLmRpc3RhbmNlVG8oZnJvbSlcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRGV0YWlscygpOiB2b2lkIHtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2hvd0RldGFpbHMgPSAhdGhpcy5zaG93RGV0YWlscztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG9jYXRpb25OYW1lKGxvY2F0aW9uOiBMb2NhdGlvbk5hbWUpOiBzdHJpbmcge1xyXG4gICAgaWYgKGxvY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiBsb2NhdGlvbi5hZG1pbk5hbWUgIT09IGxvY2F0aW9uLm5hbWVcclxuICAgICAgICA/IGAke2xvY2F0aW9uLm5hbWV9IC8gJHtsb2NhdGlvbi5hZG1pbk5hbWV9YFxyXG4gICAgICAgIDogbG9jYXRpb24ubmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIGNvbmZpcm1Mb2NhdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IG9ic0xvY2F0aW9uID0gdGhpcy5nZXRMb2NhdGlvbigpO1xyXG4gICAgdGhpcy5sb2NhdGlvblNldC5lbWl0KG9ic0xvY2F0aW9uKTtcclxuICB9XHJcblxyXG4gIGdldExvY2F0aW9uKCk6IE9ic0xvY2F0aW9uRWRpdE1vZGVsIHtcclxuICAgIGNvbnN0IG9ic0xvY2F0aW9uOiBPYnNMb2NhdGlvbkVkaXRNb2RlbCA9IHtcclxuICAgICAgTGF0aXR1ZGU6IHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCkubGF0LFxyXG4gICAgICBMb25naXR1ZGU6IHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCkubG5nLFxyXG4gICAgICBVbmNlcnRhaW50eTogMCxcclxuICAgICAgVVRNU291cmNlVElEOiBVdG1Tb3VyY2UuU2VsZWN0ZWRJbk1hcFxyXG4gICAgfTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5lZGl0TG9jYXRpb25OYW1lICYmXHJcbiAgICAgIHRoaXMubG9jYXRpb25OYW1lICYmXHJcbiAgICAgIHRoaXMubG9jYXRpb25OYW1lLmxlbmd0aCA+IDBcclxuICAgICkge1xyXG4gICAgICBvYnNMb2NhdGlvbi5PYnNMb2NhdGlvbklEID0gdW5kZWZpbmVkO1xyXG4gICAgICBvYnNMb2NhdGlvbi5Mb2NhdGlvbk5hbWUgPSB0aGlzLmxvY2F0aW9uTmFtZS5zdWJzdHJpbmcoMCwgNjApO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkTG9jYXRpb24pIHtcclxuICAgICAgb2JzTG9jYXRpb24uT2JzTG9jYXRpb25JRCA9IHRoaXMuc2VsZWN0ZWRMb2NhdGlvbi5JZDtcclxuICAgICAgb2JzTG9jYXRpb24uTG9jYXRpb25OYW1lID0gdGhpcy5zZWxlY3RlZExvY2F0aW9uLk5hbWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy52aWV3SW5mbyAmJiB0aGlzLnZpZXdJbmZvLmxvY2F0aW9uKSB7XHJcbiAgICAgIG9ic0xvY2F0aW9uLkxvY2F0aW9uRGVzY3JpcHRpb24gPSB0aGlzLmdldExvY2F0aW9uTmFtZShcclxuICAgICAgICB0aGlzLnZpZXdJbmZvLmxvY2F0aW9uXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5mb2xsb3dNb2RlICYmIHRoaXMudXNlcnBvc2l0aW9uKSB7XHJcbiAgICAgIG9ic0xvY2F0aW9uLlVUTVNvdXJjZVRJRCA9IFV0bVNvdXJjZS5HUFM7XHJcbiAgICAgIG9ic0xvY2F0aW9uLlVuY2VydGFpbnR5ID0gTWF0aC5yb3VuZCh0aGlzLnVzZXJwb3NpdGlvbi5jb29yZHMuYWNjdXJhY3kpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9ic0xvY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgZWRpdExvY2F0aW9uKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY2FuRWRpdExvY2F0aW9uTmFtZSkge1xyXG4gICAgICB0aGlzLmVkaXRMb2NhdGlvbk5hbWUgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5lZGl0TG9jYXRpb25OYW1lSW5wdXQpIHtcclxuICAgICAgICAgIHRoaXMuZWRpdExvY2F0aW9uTmFtZUlucHV0LnNldEZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCA1MCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkxvY2F0aW9uRWRpdENvbXBsZXRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZWRpdExvY2F0aW9uTmFtZUlucHV0LnZhbHVlPy50b1N0cmluZygpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAvLyBVc2VyIGhhcyBkZWxldGVkIGFsbCB0ZXh0XHJcbiAgICAgIHRoaXMuZWRpdExvY2F0aW9uTmFtZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1hcFZpZXdJbmZvKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgW25nQ2xhc3NdPVwieydvcGVuJzogc2hvd0RldGFpbHMsICdkZXRhaWxzLXNtYWxsJzohc2hvd0Zyb21NYXJrZXJJbkRldGFpbHMgfVwiPlxyXG4gIDxhcHAtbWFwICpuZ0lmPVwibG9jYXRpb25NYXJrZXJcIiBbc2hvd1N1cHBvcnRNYXBzXT1cImZhbHNlXCIgKG1hcFJlYWR5KT1cIm9uTWFwUmVhZHkoJGV2ZW50KVwiXHJcbiAgICBbY2VudGVyXT1cImxvY2F0aW9uTWFya2VyLmdldExhdExuZygpXCI+PC9hcHAtbWFwPlxyXG4gIDxpb24tZ3JpZCBjbGFzcz1cImJvdHRvbS1pbmZvIGlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICA8aW9uLXJvdz5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJjb25maXJtLWJ1dHRvbi1jb2xcIj5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiaXNTYXZlRGlzYWJsZWRcIiBleHBhbmQ9XCJibG9ja1wiIGNvbG9yPVwidmFyc29tLW9yYW5nZVwiIChjbGljayk9XCJjb25maXJtTG9jYXRpb24oKVwiPnt7IGNvbmZpcm1Mb2NhdGlvblRleHQgfCB0cmFuc2xhdGVcclxuICAgICAgICAgIH19PC9pb24tYnV0dG9uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwic2hvdy1kZXRhaWxzLWNvbCBpb24tbm8tcGFkZGluZyBpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBjb2xvcj1cImRhcmtcIiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiAoY2xpY2spPVwidG9nZ2xlRGV0YWlscygpXCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNob3dEZXRhaWxzXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwiY2hldnJvbi11cFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIHt7J1JFR0lTVFJBVElPTi5PQlNfTE9DQVRJT04uU0hPV19ERVRBSUxTJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG93RGV0YWlsc1wiPlxyXG4gICAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cImNoZXZyb24tZG93blwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIHt7J1JFR0lTVFJBVElPTi5PQlNfTE9DQVRJT04uSElERV9ERVRBSUxTJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93IGNsYXNzPVwiZGV0YWlscy1yb3dcIiAqbmdJZj1cInNob3dEZXRhaWxzXCI+XHJcbiAgICAgIDxpb24tY29sPlxyXG4gICAgICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgICAgICA8aW9uLXJvdz5cclxuICAgICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tbm8tcGFkZGluZyBpb24tdGV4dC1jZW50ZXJcIiBzaXplPVwiMlwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cIm9icy1sb2NhdGlvbi1tYXJrZXJcIiBbc3JjXT1cImxvY2F0aW9uTWFya2VySWNvblVybFwiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dGcm9tTWFya2VySW5EZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiZG90dGVkLWxpbmVcIiB3aWR0aD1cIjRweFwiIGhlaWdodD1cIjE1cHhcIiB2aWV3Qm94PVwiMCAwIDQgMTVcIj5cclxuICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9XCIxXCIgeDI9XCIxXCIgeTE9XCIyXCIgeTI9XCIxNFwiIHN0cm9rZT1cIiMwMDBcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlLWRhc2hhcnJheT1cIjEsNFwiPjwvbGluZT5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImRpc3RhbmNlLWxhYmVsIHNtYWxsLXRleHQgaW9uLW5vLW1hcmdpblwiPnt7XHJcbiAgICAgICAgICAgICAgICAgIGRpc3RhbmNlVG9PYnNlcnZhdGlvblRleHQgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJkb3R0ZWQtbGluZVwiIHdpZHRoPVwiNHB4XCIgaGVpZ2h0PVwiMTVweFwiIHZpZXdCb3g9XCIwIDAgNCAxNVwiPlxyXG4gICAgICAgICAgICAgICAgICA8bGluZSB4MT1cIjFcIiB4Mj1cIjFcIiB5MT1cIjJcIiB5Mj1cIjE0XCIgc3Ryb2tlPVwiIzAwMFwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHJva2UtZGFzaGFycmF5PVwiMSw0XCI+PC9saW5lPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVhZmxldC11c2VybWFya2VyXCIgKm5nSWY9XCIhZnJvbU1hcmtlclwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHN2Zy1pY29uICpuZ0lmPVwiZnJvbU1hcmtlclwiIFtzcmNdPVwiZnJvbU1hcmtlckljb25VcmxcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICA8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJwYWRkaW5nLWJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgICA8aW9uLWNvbCBzaXplPVwiMTJcIiBjbGFzcz1cImlvbi1uby1wYWRkaW5nIHBhZGRpbmctcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW9uLWdyaWQgY2xhc3M9XCJhcnJvdy1ib3hcIiAoY2xpY2spPVwiZWRpdExvY2F0aW9uKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpb24taWNvbiBjbGFzcz1cImVkaXQtaWNvblwiIG5hbWU9XCJjcmVhdGVcIiAqbmdJZj1cImNhbkVkaXRMb2NhdGlvbk5hbWVcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIGNsYXNzPVwiZGV0YWlsLWhlYWRlciBpb24tdGV4dC11cHBlcmNhc2UgaW9uLW5vLW1hcmdpblwiPnt7IGxvY2F0aW9uVGl0bGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlZGl0TG9jYXRpb25OYW1lIGVsc2UgZWRpdExvY2F0aW9uVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1yb3cgKm5nSWY9XCJzZWxlY3RlZExvY2F0aW9uIGVsc2Ugdmlld0luZm9UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJkZXRhaWwtb2JzLWluZm8gaW9uLW5vLW1hcmdpbiBpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHNlbGVjdGVkTG9jYXRpb24uTmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpb24tcm93PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cInNtYWxsLXRleHQgaW9uLW5vLW1hcmdpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCkubGF0IHwgbnVtYmVyOicwLjMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19JmRlZzt7eydNQVBfQ0VOVEVSX0lORk8uTk9SVEhfU0hPUlQnfHRyYW5zbGF0ZX19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKS5sbmcgfCBudW1iZXI6JzAuMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5FQVNUX1NIT1JUJ3x0cmFuc2xhdGV9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWlzTG9hZGluZyAmJiB2aWV3SW5mbyAmJiB2aWV3SW5mby5lbGV2YXRpb24gIT09IG51bGxcIj4sIHt7IHZpZXdJbmZvLmVsZXZhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eydNQVBfQ0VOVEVSX0lORk8uQUJPVkVfU0VBX0xFVkVMJyB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICAgICAgICAgICAgICA8L2lvbi1ncmlkPlxyXG4gICAgICAgICAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgICAgICAgICA8aW9uLXJvdyAqbmdJZj1cInNob3dGcm9tTWFya2VySW5EZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpb24tY29sIHNpemU9XCIxMlwiIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmcgcGFkZGluZy1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tbm8tbWFyZ2luIGFycm93LWJveCBkZXRhaWwtaGVhZGVyIGJsb2NrIGlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7ZnJvbUxvY2F0aW9uVGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgICAgICAgPC9pb24tZ3JpZD5cclxuICAgICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICAgIDwvaW9uLWdyaWQ+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICA8L2lvbi1ncmlkPlxyXG48L2Rpdj5cclxuPG5nLXRlbXBsYXRlICNlZGl0TG9jYXRpb25UZW1wbGF0ZT5cclxuICA8aW9uLXJvdz5cclxuICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgPGlvbi1pbnB1dCAjZWRpdExvY2F0aW9uTmFtZUlucHV0IHR5cGU9XCJ0ZXh0XCIgW21heF09XCI2MFwiIFsobmdNb2RlbCldPVwibG9jYXRpb25OYW1lXCJcclxuICAgICAgICAoaW9uQmx1cik9XCJvbkxvY2F0aW9uRWRpdENvbXBsZXRlKClcIj48L2lvbi1pbnB1dD5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvbmctdGVtcGxhdGU+XHJcbjxuZy10ZW1wbGF0ZSAjdmlld0luZm9UZW1wbGF0ZT5cclxuICA8aW9uLXJvdz5cclxuICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0xvYWRpbmdcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidmlld0luZm8gJiYgdmlld0luZm8ubG9jYXRpb25cIj5cclxuICAgICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJkZXRhaWwtb2JzLWluZm8gaW9uLW5vLW1hcmdpbiBpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiKHZpZXdJbmZvLmxvY2F0aW9uLm5hbWUgIT09IHZpZXdJbmZvLmxvY2F0aW9uLmFkbWluTmFtZSlcIj57e1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmlld0luZm8ubG9jYXRpb24ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgfX0sJm5ic3A7PC9zcGFuPnt7dmlld0luZm8ubG9jYXRpb24uYWRtaW5OYW1lfX0mbmJzcDtcclxuICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzTG9hZGluZ1wiPlxyXG4gICAgICAgIDxpb24tc3Bpbm5lciBjb2xvcj1cImRhcmtcIiBuYW1lPVwiZG90c1wiPjwvaW9uLXNwaW5uZXI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2UgfSBmcm9tICcuL2NvbXByZXNzaW9uLXRlc3QtbW9kYWwvY29tcHJlc3Npb24tdGVzdC1tb2RhbC5wYWdlJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtY29tcHJlc3Npb24tdGVzdC1saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29tcHJlc3Npb24tdGVzdC1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb21wcmVzc2lvbi10ZXN0LWxpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29tcHJlc3Npb25UZXN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdGVzdHM6IEFycmF5PENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbD47XHJcbiAgQElucHV0KCkgaW5jbHVkZUluU25vd1Byb2ZpbGVBc0RlZmF1bHQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgdGVzdHNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHJpdmF0ZSBpc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBhc3luYyBhZGRPckVkaXRDb21wcmVzc2lvblRlc3QoaW5kZXg/OiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICBjb25zdCBhZGQgPSBpbmRleCA9PT0gdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgY29tcG9uZW50OiBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2UsXHJcbiAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICAgIGNvbXByZXNzaW9uVGVzdDogYWRkID8gdW5kZWZpbmVkIDogKHRoaXMudGVzdHMgfHwgW10pW2luZGV4XSxcclxuICAgICAgICAgIGluY2x1ZGVJblNub3dQcm9maWxlQXNEZWZhdWx0OiB0aGlzLmluY2x1ZGVJblNub3dQcm9maWxlQXNEZWZhdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgbW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmRlbGV0ZSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVUZXN0KGluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgY29tcHJlc3Npb25UZXN0OiBDb21wcmVzc2lvblRlc3RFZGl0TW9kZWwgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgIGlmICh0aGlzLnRlc3RzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50ZXN0cyA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGFkZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RzLnB1c2goY29tcHJlc3Npb25UZXN0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVzdHNbaW5kZXhdID0gY29tcHJlc3Npb25UZXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnRlc3RzQ2hhbmdlLmVtaXQodGhpcy50ZXN0cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZVRlc3QoaW5kZXgpIHtcclxuICAgIGlmICh0aGlzLnRlc3RzICE9PSB1bmRlZmluZWQgJiYgdGhpcy50ZXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMudGVzdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgIDxpb24tbGFiZWw+XHJcbiAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5DT01QUkVTU0lPTl9URVNULlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICA8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgZGV0YWlsPVwidHJ1ZVwiIChjbGljayk9XCJhZGRPckVkaXRDb21wcmVzc2lvblRlc3QoaSlcIiAoa2V5dXAuZW50ZXIpPVwiYWRkT3JFZGl0Q29tcHJlc3Npb25UZXN0KGkpXCJcclxuICAgICpuZ0Zvcj1cImxldCBjb21wcmVzc2lvblRlc3Qgb2YgdGVzdHM7IGxldCBpID0gaW5kZXhcIj5cclxuICAgIDxpb24tbGFiZWw+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb21wcmVzc2lvblRlc3QuUHJvcGFnYXRpb25USURcIj57e2NvbXByZXNzaW9uVGVzdC5Qcm9wYWdhdGlvblRJRCB8IGtkdkRlc2NyaXB0aW9uOiAnU25vd19Qcm9wYWdhdGlvbktEVicgfCBhc3luY319PC9uZy1jb250YWluZXI+PG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbXByZXNzaW9uVGVzdC5UYXBzRnJhY3R1cmUgPiAwXCI+e3tjb21wcmVzc2lvblRlc3QuVGFwc0ZyYWN0dXJlfX08L25nLWNvbnRhaW5lcj48bmctY29udGFpbmVyICpuZ0lmPVwiY29tcHJlc3Npb25UZXN0LkZyYWN0dXJlRGVwdGggPiAwXCI+QHt7Y29tcHJlc3Npb25UZXN0LkZyYWN0dXJlRGVwdGggfCBtZXRlcnNUb0NtOiAwfX1jbTwvbmctY29udGFpbmVyPjxuZy1jb250YWluZXI+e3sgY29tcHJlc3Npb25UZXN0LkNvbXByVGVzdEZyYWN0dXJlVElEIHwga2R2RGVzY3JpcHRpb246ICdTbm93X0NvbXByVGVzdEZyYWN0dXJlS0RWJyB8IGFzeW5jIH19PC9uZy1jb250YWluZXI+XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICAgIDxpb24taWNvbiBzbG90PVwiZW5kXCIgbmFtZT1cImxpbmtcIiAqbmdJZj1cImNvbXByZXNzaW9uVGVzdC5JbmNsdWRlSW5Tbm93UHJvZmlsZVwiPjwvaW9uLWljb24+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFkZE9yRWRpdENvbXByZXNzaW9uVGVzdCgpXCIgKGtleXVwLmVudGVyKT1cImFkZE9yRWRpdENvbXByZXNzaW9uVGVzdCgpXCI+XHJcbiAgICA8aW9uLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLkNPTVBSRVNTSU9OX1RFU1QuQUREX05FVycgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWl0ZW0+XHJcbjwvaW9uLWxpc3Q+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgQ29tcHJlc3Npb25UZXN0RWRpdE1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBJc0VtcHR5SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2lzLWVtcHR5LmhlbHBlcic7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWNvbXByZXNzaW9uLXRlc3QtbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wcmVzc2lvbi10ZXN0LW1vZGFsLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29tcHJlc3Npb24tdGVzdC1tb2RhbC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29tcHJlc3Npb25UZXN0TW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBjb21wcmVzc2lvblRlc3Q6IENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbDtcclxuICBASW5wdXQoKSBpbmNsdWRlSW5Tbm93UHJvZmlsZUFzRGVmYXVsdCA9IGZhbHNlO1xyXG5cclxuICBzaG93RGVsZXRlID0gZmFsc2U7XHJcbiAgdGFwc0FycmF5OiBTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIGluY2x1ZGVJblNub3dQcm9maWxlRGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgZ2V0IGlzVmFsaWQoKSB7XHJcbiAgICBjb25zdCBjbG9uZSA9IHsgLi4udGhpcy5jb21wcmVzc2lvblRlc3QgfTtcclxuICAgIGNsb25lLkluY2x1ZGVJblNub3dQcm9maWxlID0gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuICFJc0VtcHR5SGVscGVyLmlzRW1wdHkoY2xvbmUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAzMDsgaSsrKSB7XHJcbiAgICAgIHRoaXMudGFwc0FycmF5LnB1c2goe1xyXG4gICAgICAgIGlkOiBpLFxyXG4gICAgICAgIHRleHQ6IGkudG9TdHJpbmcoKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5jb21wcmVzc2lvblRlc3QpIHtcclxuICAgICAgdGhpcy5jb21wcmVzc2lvblRlc3QgPSB7fTtcclxuICAgICAgaWYgKHRoaXMuaW5jbHVkZUluU25vd1Byb2ZpbGVBc0RlZmF1bHQpIHtcclxuICAgICAgICB0aGlzLmNvbXByZXNzaW9uVGVzdC5JbmNsdWRlSW5Tbm93UHJvZmlsZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd0RlbGV0ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoZWNrSWZJbmNsdWRlSW5Tbm93UHJvZmlsZVNob3VsZEJlRGlzYWJsZWQoKTtcclxuICB9XHJcblxyXG4gIGNoZWNrSWZJbmNsdWRlSW5Tbm93UHJvZmlsZVNob3VsZEJlRGlzYWJsZWQoKSB7XHJcbiAgICBpZiAodGhpcy5pc0xCVCgpKSB7XHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0LkluY2x1ZGVJblNub3dQcm9maWxlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaW5jbHVkZUluU25vd1Byb2ZpbGVEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuaW5jbHVkZUluU25vd1Byb2ZpbGVEaXNhYmxlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdGFwc0ZyYWN0dXJlVmlzaWJsZSgpIHtcclxuICAgIHJldHVybiAhKHRoaXMuaXNDVE5vckVDVFgoKSB8fCB0aGlzLmlzQ1RWb3JFQ1RWKCkgfHwgdGhpcy5pc0xCVCgpKTtcclxuICB9XHJcblxyXG4gIGlzQ1ROb3JFQ1RYKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5jb21wcmVzc2lvblRlc3QuUHJvcGFnYXRpb25USUQgPT09IDE1IHx8XHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0LlByb3BhZ2F0aW9uVElEID09PSAyNFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlzQ1RWb3JFQ1RWKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5jb21wcmVzc2lvblRlc3QuUHJvcGFnYXRpb25USUQgPT09IDExIHx8XHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0LlByb3BhZ2F0aW9uVElEID09PSAyMVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlzTEJUKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcHJlc3Npb25UZXN0LlByb3BhZ2F0aW9uVElEID09PSA1O1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgb2soKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHRoaXMuY29tcHJlc3Npb25UZXN0KTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZSgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoeyBkZWxldGU6IHRydWUgfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT57eydSRUdJU1RSQVRJT04uU05PVy5DT01QUkVTU0lPTl9URVNULlRJVExFJyB8IHRyYW5zbGF0ZX19PC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuQ09NUFJFU1NJT05fVEVTVC5JTkNMVURFX0lOX1NOT1dfUFJPRklMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi10b2dnbGUgW2Rpc2FibGVkXT1cImluY2x1ZGVJblNub3dQcm9maWxlRGlzYWJsZWRcIiBzbG90PVwiZW5kXCJcclxuICAgICAgICBbKG5nTW9kZWwpXT1cImNvbXByZXNzaW9uVGVzdC5JbmNsdWRlSW5Tbm93UHJvZmlsZVwiIG5hbWU9XCJJbmNsdWRlSW5Tbm93UHJvZmlsZVwiPlxyXG4gICAgICA8L2lvbi10b2dnbGU+XHJcbiAgICA8L2lvbi1pdGVtPlxyXG4gICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQ09NUFJFU1NJT05fVEVTVC5URVNUX1RZUEVcIiBrZHZLZXk9XCJTbm93X1Byb3BhZ2F0aW9uS0RWXCJcclxuICAgICAgWyh2YWx1ZSldPVwiY29tcHJlc3Npb25UZXN0LlByb3BhZ2F0aW9uVElEXCIgKHZhbHVlQ2hhbmdlKT1cImNoZWNrSWZJbmNsdWRlSW5Tbm93UHJvZmlsZVNob3VsZEJlRGlzYWJsZWQoKVwiPlxyXG4gICAgPC9hcHAta2R2LXNlbGVjdD5cclxuICAgIDxpb24taXRlbSAqbmdJZj1cInRhcHNGcmFjdHVyZVZpc2libGUoKVwiPlxyXG4gICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydSRUdJU1RSQVRJT04uU05PVy5DT01QUkVTU0lPTl9URVNULlRBUFNfRlJBQ1RVUkUnXHJcbiAgICAgICAgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cImNvbXByZXNzaW9uVGVzdC5UYXBzRnJhY3R1cmVcIiBbb3B0aW9uc109XCJ0YXBzQXJyYXlcIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQ09NUFJFU1NJT05fVEVTVC5UQVBTX0ZSQUNUVVJFXCI+PC9hcHAtc2VsZWN0PlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxhcHAtbnVtZXJpYy1pbnB1dCAqbmdJZj1cIiFpc0NUTm9yRUNUWCgpXCIgWyh2YWx1ZSldPVwiY29tcHJlc3Npb25UZXN0LkZyYWN0dXJlRGVwdGhcIlxyXG4gICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkNPTVBSRVNTSU9OX1RFU1QuRElTVEFOQ0VfRlJPTV9UT1BcIiBbbWluXT1cIjBcIiBbbWF4XT1cIjk5OVwiIFtkZWNpbWFsUGxhY2VzXT1cIjBcIlxyXG4gICAgICBbY29udmVydFJhdGlvXT1cIjEwMFwiIHN1ZmZpeD1cImNtXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgIDxhcHAta2R2LXNlbGVjdCAqbmdJZj1cIiFpc0NUTm9yRUNUWCgpXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5DT01QUkVTU0lPTl9URVNULkZSQUNUVVJFX1RZUEVcIlxyXG4gICAgICBrZHZLZXk9XCJTbm93X0NvbXByVGVzdEZyYWN0dXJlS0RWXCIgWyh2YWx1ZSldPVwiY29tcHJlc3Npb25UZXN0LkNvbXByVGVzdEZyYWN0dXJlVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgIDxhcHAta2R2LXNlbGVjdCAqbmdJZj1cIiFpc0xCVCgpXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5DT01QUkVTU0lPTl9URVNULlNUQUJJTElUWV9FVkFMXCJcclxuICAgICAga2R2S2V5PVwiU25vd19TdGFiaWxpdHlFdmFsS0RWXCIgWyh2YWx1ZSldPVwiY29tcHJlc3Npb25UZXN0LlN0YWJpbGl0eUV2YWxUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGFwcC10ZXh0LWNvbW1lbnQgdGl0bGU9XCJSRUdJU1RSQVRJT04uREFOR0VSX09CUy5DT01NRU5UXCIgWyh2YWx1ZSldPVwiY29tcHJlc3Npb25UZXN0LkNvbW1lbnRcIj5cclxuICAgIDwvYXBwLXRleHQtY29tbWVudD5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxhcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucyBbc2F2ZURpc2FibGVkXT1cIiFpc1ZhbGlkXCIgKHNhdmVDbGlja2VkKT1cIm9rKClcIiAoZGVsZXRlQ2xpY2tlZCk9XCJkZWxldGUoKVwiXHJcbiAgICBbc2hvd0RlbGV0ZV09XCJzaG93RGVsZXRlXCI+XHJcbiAgPC9hcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucz5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIE5nWm9uZSxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvaW5wdXQvc2VsZWN0L3NlbGVjdC1vcHRpb24ubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZXhwb3NlZC1oZWlnaHQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9leHBvc2VkLWhlaWdodC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZXhwb3NlZC1oZWlnaHQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwb3NlZEhlaWdodENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZXhwb3NlZEhlaWdodENvbWJvVElEOiBudW1iZXI7XHJcbiAgQE91dHB1dCgpIGV4cG9zZWRIZWlnaHRDb21ib1RJRENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBASW5wdXQoKSBleHBvc2VkSGlnaHQxOiBudW1iZXI7XHJcbiAgQE91dHB1dCgpIGV4cG9zZWRIaWdodDFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgZXhwb3NlZEhpZ2h0MjogbnVtYmVyO1xyXG4gIEBPdXRwdXQoKSBleHBvc2VkSGlnaHQyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBleHBvc2VkSGVpZ2h0VG9wOiBib29sZWFuO1xyXG4gIGV4cG9zZWRIZWlnaHRNaWRkbGU6IGJvb2xlYW47XHJcbiAgZXhwb3NlZEhlaWdodEJvdHRvbTogYm9vbGVhbjtcclxuXHJcbiAgZ2V0IGhlaWdodEFycmF5KCk6IFNlbGVjdE9wdGlvbltdIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgICBmb3IgKGxldCBpZCA9IDA7IGlkIDw9IDgwMDA7IGlkICs9IDEwMCkge1xyXG4gICAgICBvcHRpb25zLnB1c2goeyBpZCwgdGV4dDogYCR7aWR9IG1gIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBnZXQgbG93ZXJIZWlnaHRBcnJheSgpIHtcclxuICAgIHJldHVybiB0aGlzLmhlaWdodEFycmF5LmZpbHRlcihcclxuICAgICAgKHgpID0+IHRoaXMuZXhwb3NlZEhpZ2h0MSA9PT0gdW5kZWZpbmVkIHx8IHguaWQgPCB0aGlzLmV4cG9zZWRIaWdodDFcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2V0RXhwb3NlZEhlaWdodHModGhpcy5leHBvc2VkSGVpZ2h0Q29tYm9USUQpO1xyXG4gIH1cclxuXHJcbiAgc2V0RXhwb3NlZEhlaWdodHMoZXhwb3NlZEhlaWdodENvbWJvVElEOiBudW1iZXIpIHtcclxuICAgIGlmIChleHBvc2VkSGVpZ2h0Q29tYm9USUQgPT09IDApIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0VG9wID0gdHJ1ZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoZXhwb3NlZEhlaWdodENvbWJvVElEID09PSAxKSB7XHJcbiAgICAgIC8vIEh2aXQgbmVkZXJzdFxyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRUb3AgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRCb3R0b20gPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoZXhwb3NlZEhlaWdodENvbWJvVElEID09PSAyKSB7XHJcbiAgICAgIC8vIFN2YXJ0IG5lZGVyc3RcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0VG9wID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodE1pZGRsZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRCb3R0b20gPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChleHBvc2VkSGVpZ2h0Q29tYm9USUQgPT09IDMpIHtcclxuICAgICAgLy8gSHZpdCBpIG1pZHRlblxyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRUb3AgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoZXhwb3NlZEhlaWdodENvbWJvVElEID09PSA0KSB7XHJcbiAgICAgIC8vIFN2YXJ0IGkgbWlkdGVuXHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodFRvcCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRCb3R0b20gPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodFRvcCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVFeHNwb3NlZEhlaWdodENvbWJvKHBvc2l0aW9uOiAndG9wJyB8ICdtaWRkbGUnIHwgJ2JvdHRvbScpIHtcclxuICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcpIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0VG9wID0gIXRoaXMuZXhwb3NlZEhlaWdodFRvcDtcclxuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdtaWRkbGUnKSB7XHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodE1pZGRsZSA9ICF0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRCb3R0b20gPSAhdGhpcy5leHBvc2VkSGVpZ2h0Qm90dG9tO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hcHBseUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIHNob2xkVXNlRXhwb3NlZEhpZ2h0MigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICh0aGlzLmV4cG9zZWRIZWlnaHRUb3AgJiZcclxuICAgICAgICB0aGlzLmV4cG9zZWRIZWlnaHRCb3R0b20gJiZcclxuICAgICAgICAhdGhpcy5leHBvc2VkSGVpZ2h0TWlkZGxlKSB8fFxyXG4gICAgICAoIXRoaXMuZXhwb3NlZEhlaWdodFRvcCAmJlxyXG4gICAgICAgICF0aGlzLmV4cG9zZWRIZWlnaHRCb3R0b20gJiZcclxuICAgICAgICB0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGUpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVFeHBvc2VkSGVpZ2h0Q29tYm9USUQoXHJcbiAgICB0b3A6IGJvb2xlYW4sXHJcbiAgICBtaWRkbGU6IGJvb2xlYW4sXHJcbiAgICBib3R0b206IGJvb2xlYW5cclxuICApIHtcclxuICAgIGlmICh0b3AgJiYgbWlkZGxlICYmIGJvdHRvbSkge1xyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRDb21ib1RJRCA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKCF0b3AgJiYgbWlkZGxlICYmICFib3R0b20pIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Q29tYm9USUQgPSA0O1xyXG4gICAgfSBlbHNlIGlmICh0b3AgJiYgIW1pZGRsZSAmJiBib3R0b20pIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Q29tYm9USUQgPSAzO1xyXG4gICAgfSBlbHNlIGlmIChib3R0b20pIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Q29tYm9USUQgPSAyO1xyXG4gICAgfSBlbHNlIGlmICh0b3ApIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Q29tYm9USUQgPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0Q29tYm9USUQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhcHBseUNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUV4cG9zZWRIZWlnaHRDb21ib1RJRChcclxuICAgICAgdGhpcy5leHBvc2VkSGVpZ2h0VG9wLFxyXG4gICAgICB0aGlzLmV4cG9zZWRIZWlnaHRNaWRkbGUsXHJcbiAgICAgIHRoaXMuZXhwb3NlZEhlaWdodEJvdHRvbVxyXG4gICAgKTtcclxuICAgIGlmICghdGhpcy5zaG9sZFVzZUV4cG9zZWRIaWdodDIoKSkge1xyXG4gICAgICB0aGlzLmV4cG9zZWRIaWdodDIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmV4cG9zZWRIZWlnaHRDb21ib1RJRENoYW5nZS5lbWl0KHRoaXMuZXhwb3NlZEhlaWdodENvbWJvVElEKTtcclxuICAgIHRoaXMuZXhwb3NlZEhpZ2h0MUNoYW5nZS5lbWl0KHRoaXMuZXhwb3NlZEhpZ2h0MSk7XHJcbiAgICB0aGlzLmV4cG9zZWRIaWdodDJDaGFuZ2UuZW1pdCh0aGlzLmV4cG9zZWRIaWdodDIpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0+XHJcbiAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uRVhQT1NFRF9IRUlHSFRfQ09NQk8nXHJcbiAgICAgICAgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0IGlvbi10ZXh0LXdyYXAgaW9uLW1hcmdpbi1ib3R0b21cIj5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImV4cG9zZWRIaWdodFwiPlxyXG4gICAgICA8aW9uLXJvdyBjbGFzcz1cInRvcCBwYWRkaW5nLWJvdHRvbVwiIChjbGljayk9XCJ0b2dnbGVFeHNwb3NlZEhlaWdodENvbWJvKCd0b3AnKVwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGV4cG9zZWRIZWlnaHRUb3B9XCI+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjEyXCIgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVE9QJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93IGNsYXNzPVwibWlkZGxlIHBhZGRpbmctYm90dG9tXCIgKGNsaWNrKT1cInRvZ2dsZUV4c3Bvc2VkSGVpZ2h0Q29tYm8oJ21pZGRsZScpXCJcclxuICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogZXhwb3NlZEhlaWdodE1pZGRsZX1cIj5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiMTJcIiBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5NSURETEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPGlvbi1yb3cgKGNsaWNrKT1cInRvZ2dsZUV4c3Bvc2VkSGVpZ2h0Q29tYm8oJ2JvdHRvbScpXCIgY2xhc3M9XCJib3R0b21cIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBleHBvc2VkSGVpZ2h0Qm90dG9tfVwiPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCIxMlwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyIGlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkJPVFRPTScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgPC9pb24tZ3JpZD5cclxuICA8L2lvbi10ZXh0PlxyXG48L2lvbi1pdGVtPlxyXG48aW9uLWl0ZW0gKm5nSWY9XCJleHBvc2VkSGVpZ2h0VG9wIHx8IGV4cG9zZWRIZWlnaHRNaWRkbGUgfHwgZXhwb3NlZEhlaWdodEJvdHRvbVwiPlxyXG4gIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkVYUE9TRURfSEVJR0hUMSdcclxuICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cImV4cG9zZWRIaWdodDFcIiAoc2VsZWN0ZWRWYWx1ZUNoYW5nZSk9XCJhcHBseUNoYW5nZXMoKVwiIFtvcHRpb25zXT1cImhlaWdodEFycmF5XCJcclxuICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uRVhQT1NFRF9IRUlHSFQxXCI+PC9hcHAtc2VsZWN0PlxyXG48L2lvbi1pdGVtPlxyXG48aW9uLWl0ZW0gKm5nSWY9XCJzaG9sZFVzZUV4cG9zZWRIaWdodDIoKVwiPlxyXG4gIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkVYUE9TRURfSEVJR0hUMidcclxuICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cImV4cG9zZWRIaWdodDJcIiAoc2VsZWN0ZWRWYWx1ZUNoYW5nZSk9XCJhcHBseUNoYW5nZXMoKVwiIFtvcHRpb25zXT1cImxvd2VySGVpZ2h0QXJyYXlcIlxyXG4gICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5FWFBPU0VEX0hFSUdIVDJcIj48L2FwcC1zZWxlY3Q+XHJcbjwvaW9uLWl0ZW0+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5jb25zdCBFTVBUWV9FWFBPU0lUSU9OID0gJzAwMDAwMDAwJztcclxuY29uc3QgQUxMX0VYUE9TSVRJT04gPSAnMTExMTExMTEnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtdmFsaWQtZXhwb3NpdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmFsaWRFeHBvc2l0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB2YWxpZEV4cG9zaXRpb246IHN0cmluZztcclxuICBAT3V0cHV0KCkgdmFsaWRFeHBvc2l0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB2YWxpZEV4cG9zaXRpb25Db3B5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkRXhwb3NpdGlvbikge1xyXG4gICAgICB0aGlzLnZhbGlkRXhwb3NpdGlvbkNvcHkgPSBFTVBUWV9FWFBPU0lUSU9OO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZEV4cG9zaXRpb25Db3B5ID0gdGhpcy52YWxpZEV4cG9zaXRpb247XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRFeHBvc2l0aW9uKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nVmFsdWUgPSB0aGlzLnZhbGlkRXhwb3NpdGlvbkNvcHkuc3Vic3RyKGluZGV4LCAxKTtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gZXhpc3RpbmdWYWx1ZSA9PT0gJzEnID8gJzAnIDogJzEnO1xyXG4gICAgdGhpcy52YWxpZEV4cG9zaXRpb25Db3B5ID1cclxuICAgICAgdGhpcy52YWxpZEV4cG9zaXRpb25Db3B5LnN1YnN0cigwLCBpbmRleCkgK1xyXG4gICAgICBuZXdWYWx1ZSArXHJcbiAgICAgIHRoaXMudmFsaWRFeHBvc2l0aW9uQ29weS5zdWJzdHIoaW5kZXggKyAxKTtcclxuICAgIHRoaXMuYXBwbHlDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxFeHBvc2l0aW9ucygpIHtcclxuICAgIHRoaXMudmFsaWRFeHBvc2l0aW9uQ29weSA9XHJcbiAgICAgIHRoaXMudmFsaWRFeHBvc2l0aW9uQ29weSA9PT0gQUxMX0VYUE9TSVRJT05cclxuICAgICAgICA/IEVNUFRZX0VYUE9TSVRJT05cclxuICAgICAgICA6IEFMTF9FWFBPU0lUSU9OO1xyXG4gICAgdGhpcy5hcHBseUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIGFwcGx5Q2hhbmdlcygpIHtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkRXhwb3NpdGlvbkNvcHkgPT09IEVNUFRZX0VYUE9TSVRJT04pIHtcclxuICAgICAgICB0aGlzLnZhbGlkRXhwb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnZhbGlkRXhwb3NpdGlvbiA9IHRoaXMudmFsaWRFeHBvc2l0aW9uQ29weTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnZhbGlkRXhwb3NpdGlvbkNoYW5nZS5lbWl0KHRoaXMudmFsaWRFeHBvc2l0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0+XHJcbiAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVkFMSURfRVhQT1NJVElPTidcclxuICAgICAgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0IGlvbi10ZXh0LXdyYXAgaW9uLW1hcmdpbi1ib3R0b21cIj5cclxuICAgIDxpb24tZ3JpZCAqbmdJZj1cInZhbGlkRXhwb3NpdGlvbkNvcHlcIiBjbGFzcz1cImV4cG9zaXRpb24gaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjRcIiBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiIChjbGljayk9XCJzZXRFeHBvc2l0aW9uKDcpXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiB2YWxpZEV4cG9zaXRpb25Db3B5WzddID09PSAnMSd9XCI+XHJcbiAgICAgICAgICB7eyAnRElSRUNUSU9OLk5XJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI0XCIgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIiAoY2xpY2spPVwic2V0RXhwb3NpdGlvbigwKVwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogdmFsaWRFeHBvc2l0aW9uQ29weVswXSA9PT0gJzEnfVwiPlxyXG4gICAgICAgICAge3sgJ0RJUkVDVElPTi5OJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI0XCIgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIiAoY2xpY2spPVwic2V0RXhwb3NpdGlvbigxKVwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogdmFsaWRFeHBvc2l0aW9uQ29weVsxXSA9PT0gJzEnfVwiPlxyXG4gICAgICAgICAge3sgJ0RJUkVDVElPTi5ORScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKGNsaWNrKT1cInNldEV4cG9zaXRpb24oNilcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHZhbGlkRXhwb3NpdGlvbkNvcHlbNl0gPT09ICcxJ31cIj5cclxuICAgICAgICAgIHt7ICdESVJFQ1RJT04uVycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKGNsaWNrKT1cInRvZ2dsZUFsbEV4cG9zaXRpb25zKClcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHZhbGlkRXhwb3NpdGlvbkNvcHkgPT09ICcxMTExMTExMSd9XCI+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uQUxMJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI0XCIgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIiAoY2xpY2spPVwic2V0RXhwb3NpdGlvbigyKVwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogdmFsaWRFeHBvc2l0aW9uQ29weVsyXSA9PT0gJzEnfVwiPlxyXG4gICAgICAgICAge3sgJ0RJUkVDVElPTi5FJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI0XCIgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIiAoY2xpY2spPVwic2V0RXhwb3NpdGlvbig1KVwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogdmFsaWRFeHBvc2l0aW9uQ29weVs1XSA9PT0gJzEnfVwiPlxyXG4gICAgICAgICAge3sgJ0RJUkVDVElPTi5TVycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKGNsaWNrKT1cInNldEV4cG9zaXRpb24oNClcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHZhbGlkRXhwb3NpdGlvbkNvcHlbNF0gPT09ICcxJ31cIj5cclxuICAgICAgICAgIHt7ICdESVJFQ1RJT04uUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKGNsaWNrKT1cInNldEV4cG9zaXRpb24oMylcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHZhbGlkRXhwb3NpdGlvbkNvcHlbM10gPT09ICcxJ31cIj5cclxuICAgICAgICAgIHt7ICdESVJFQ1RJT04uU0UnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgIDwvaW9uLWdyaWQ+XHJcbiAgPC9pb24tdGV4dD5cclxuPC9pb24taXRlbT4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBOZ1pvbmVcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXRleHQtY29tbWVudCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHQtY29tbWVudC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dC1jb21tZW50LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRleHRDb21tZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgcm93cyA9IDQ7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBtYXggPSAxMDI0O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0+XHJcbiAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgdGl0bGUgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICA8aW9uLXRleHRhcmVhIGF1dG9jYXBpdGFsaXplPVwic2VudGVuY2VzXCIgW21heGxlbmd0aF09XCJtYXhcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiB0eXBlPVwidGV4dGFyZWFcIiAoaW9uQmx1cik9XCJvbkJsdXIoKVwiXHJcbiAgICBbcm93c109XCJyb3dzXCIgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiIFthdXRvR3Jvd109XCJ0cnVlXCIgKG5nTW9kZWxDaGFuZ2UpPVwidmFsdWVDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcclxuICAgIHBsYWNlaG9sZGVyPVwie3sgcGxhY2Vob2xkZXIgfCB0cmFuc2xhdGV9fVwiPjwvaW9uLXRleHRhcmVhPlxyXG48L2lvbi1pdGVtPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VsZWN0SW50ZXJmYWNlIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXllcy1uby1zZWxlY3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi95ZXMtbm8tc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi95ZXMtbm8tc2VsZWN0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFllc05vU2VsZWN0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSB2YWx1ZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBsYWJlbENvbG9yID0gJ21lZGl1bSc7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW1xyXG4gICAgeyBpZDogdHJ1ZSwgdGV4dDogJ0RJQUxPR1MuWUVTJyB9LFxyXG4gICAgeyBpZDogZmFsc2UsIHRleHQ6ICdESUFMT0dTLk5PJyB9XHJcbiAgXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsIjxpb24taXRlbT5cclxuICA8aW9uLWxhYmVsIFtjb2xvcl09XCJsYWJlbENvbG9yXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyB0aXRsZSB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgPGFwcC1zZWxlY3QgWyhzZWxlY3RlZFZhbHVlKV09XCJ2YWx1ZVwiIChzZWxlY3RlZFZhbHVlQ2hhbmdlKT1cInZhbHVlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiIFt0aXRsZV09XCJ0aXRsZVwiXHJcbiAgICBbb3B0aW9uc109XCJvcHRpb25zXCI+PC9hcHAtc2VsZWN0PlxyXG48L2lvbi1pdGVtPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFVybEVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWFkZC13ZWItdXJsLW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYWRkLXdlYi11cmwtbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hZGQtd2ViLXVybC1tb2RhbC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkV2ViVXJsTW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB3ZWJ1cmw6IFVybEVkaXRNb2RlbDtcclxuICB1cmxUb1NhdmU6IFVybEVkaXRNb2RlbDtcclxuICBpc05ldyA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy53ZWJ1cmwpIHtcclxuICAgICAgdGhpcy51cmxUb1NhdmUgPSB7IC4uLnRoaXMud2VidXJsIH07XHJcbiAgICAgIHRoaXMuaXNOZXcgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXJsVG9TYXZlID0ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBvaygpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModGhpcy51cmxUb1NhdmUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh7IGRlbGV0ZTogdHJ1ZSB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9XRUJfVVJMLlRJVExFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICB7e1wiUkVHSVNUUkFUSU9OLkFERF9XRUJfVVJMLlRJVExFXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgPGFwcC10ZXh0LWNvbW1lbnQgWyh2YWx1ZSldPVwidXJsVG9TYXZlLlVybERlc2NyaXB0aW9uXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNPTU1FTlRfVElUTEVcIiByb3dzPVwiMlwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgJ1JFR0lTVFJBVElPTi5BRERfV0VCX1VSTC5VUkwnIHwgdHJhbnNsYXRlIH19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24taW5wdXQgdHlwZT1cInVybFwiIFsobmdNb2RlbCldPVwidXJsVG9TYXZlLlVybExpbmVcIj48L2lvbi1pbnB1dD5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgPC9pb24tbGlzdD5cclxuICA8YXBwLW1vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnMgW3NhdmVEaXNhYmxlZF09XCIhdXJsVG9TYXZlLlVybExpbmVcIiAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCJcclxuICAgIFtzaG93RGVsZXRlXT1cIiFpc05ld1wiPlxyXG4gIDwvYXBwLW1vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnM+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGVscE1vZGFsUGFnZSB9IGZyb20gJy4vaGVscC1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgTWFya2Rvd25Nb2R1bGUgfSBmcm9tICduZ3gtbWFya2Rvd24nO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGUsIE1hcmtkb3duTW9kdWxlLmZvckNoaWxkKCldLFxyXG4gIGRlY2xhcmF0aW9uczogW0hlbHBNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0hlbHBNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWxwTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1oZWxwLW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaGVscC1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2hlbHAtbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEhlbHBNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGhlbHBUZXh0OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cImVuZFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2xvc2UoKVwiPnt7ICdESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnSEVMUC5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50IGNsYXNzPVwiaW9uLXBhZGRpbmdcIiAoY2xpY2spPVwiY2xvc2UoKVwiPlxyXG4gIDxtYXJrZG93biBbZGF0YV09XCJoZWxwVGV4dFwiPjwvbWFya2Rvd24+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnVtZXJpY0lucHV0TW9kYWxQYWdlIH0gZnJvbSAnLi9udW1lcmljLWlucHV0LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTnVtZXJpY0lucHV0TW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOdW1lcmljSW5wdXRNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOdW1lcmljSW5wdXRNb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBOdW1iZXJIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvbnVtYmVyLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1udW1lcmljLWlucHV0LW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbnVtZXJpYy1pbnB1dC1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL251bWVyaWMtaW5wdXQtbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE51bWVyaWNJbnB1dE1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcclxuICBASW5wdXQoKSBzdWZmaXg6IHN0cmluZztcclxuICBASW5wdXQoKSBtaW4gPSAtMTAwMDAwO1xyXG4gIEBJbnB1dCgpIG1heCA9IDEwMDAwMDtcclxuICBASW5wdXQoKSBkZWNpbWFsUGxhY2VzID0gMDtcclxuICBASW5wdXQoKSBkZWNpbWFsU2VwYXJhdG9yO1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gIGRlY2ltYWxTZXAgPSAnLic7XHJcbiAgaXNOZWdhdGl2ZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgbnVtYmVyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICBnZXQgdGV4dFZhbCgpIHtcclxuICAgIHJldHVybiB0aGlzLm51bWJlcnMuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICBnZXQgbG9jYWxlU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dFZhbC5yZXBsYWNlKCcuJywgdGhpcy5kZWNpbWFsU2VwKTtcclxuICB9XHJcblxyXG4gIGdldCBudW1iZXJWYWwoKSB7XHJcbiAgICBjb25zdCBudW0gPSBwYXJzZUZsb2F0KHRoaXMudGV4dFZhbCk7XHJcbiAgICBpZiAoaXNOYU4obnVtKSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy50ZXh0VmFsKSAqICh0aGlzLmlzTmVnYXRpdmUgPyAtMSA6IDEpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleXVwJywgWyckZXZlbnQnXSkga2V5RXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5rZXkubWF0Y2goJ1swLTldJykpIHtcclxuICAgICAgdGhpcy5wdXNoTnVtYmVyKGV2ZW50LmtleSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQua2V5Lm1hdGNoKCdbLC5dJykpIHtcclxuICAgICAgdGhpcy5wdXNoRGVjaW1hbFNlcGFyYXRvcigpO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgIC8vIEVudGVyIGNsaWNrXHJcbiAgICAgIHRoaXMuZG9uZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgpIHtcclxuICAgICAgLy8gQmFja3NwYWNlXHJcbiAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmlzTmVnYXRpdmUgPSB0aGlzLnZhbHVlIDwgMDtcclxuICAgICAgY29uc3QgcG9zaXRpdmVWYWx1ZSA9IHRoaXMudmFsdWUgKiAodGhpcy5pc05lZ2F0aXZlID8gLTEgOiAxKTtcclxuICAgICAgdGhpcy5udW1iZXJzID0gTnVtYmVySGVscGVyLnNldERlY2ltYWxQbGFjZXMoXHJcbiAgICAgICAgcG9zaXRpdmVWYWx1ZSxcclxuICAgICAgICB0aGlzLmRlY2ltYWxQbGFjZXNcclxuICAgICAgKVxyXG4gICAgICAgIC50b1N0cmluZygxMClcclxuICAgICAgICAuc3BsaXQoJycpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubWF4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5tYXggPD0gMCkge1xyXG4gICAgICB0aGlzLmlzTmVnYXRpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kZWNpbWFsU2VwID1cclxuICAgICAgdGhpcy5kZWNpbWFsU2VwYXJhdG9yICE9PSB1bmRlZmluZWRcclxuICAgICAgICA/IHRoaXMuZGVjaW1hbFNlcGFyYXRvclxyXG4gICAgICAgIDogdGhpcy5nZXREZWNpbWFsU2VwYXJhdG9yRm9yQnJvd3NlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXREZWNpbWFsU2VwYXJhdG9yRm9yQnJvd3NlcigpIHtcclxuICAgIHJldHVybiAoMS4xKS50b0xvY2FsZVN0cmluZygpLnN1YnN0cmluZygxLCAyKTtcclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIGRvbmUoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHtcclxuICAgICAgb2s6IHRydWUsXHJcbiAgICAgIHZhbHVlOiB0aGlzLm51bWJlclZhbFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVOZWdhdGl2ZSgpIHtcclxuICAgIGlmICh0aGlzLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMubWF4IDw9IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc05lZ2F0aXZlID0gIXRoaXMuaXNOZWdhdGl2ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TnVtYmVyT2ZEZWNpbWFscygpIHtcclxuICAgIGxldCBpc0RlY2ltYWwgPSBmYWxzZTtcclxuICAgIGxldCByZXN1bHQgPSAwO1xyXG4gICAgZm9yIChjb25zdCBpIG9mIHRoaXMubnVtYmVycykge1xyXG4gICAgICBpZiAoaXNEZWNpbWFsKSB7XHJcbiAgICAgICAgcmVzdWx0Kys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGkgPT09ICcuJykge1xyXG4gICAgICAgICAgaXNEZWNpbWFsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdXNoTnVtYmVyKHZhbDogc3RyaW5nKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZGVjaW1hbFBsYWNlcyA+IDAgJiZcclxuICAgICAgdGhpcy5nZXROdW1iZXJPZkRlY2ltYWxzKCkgPj0gdGhpcy5kZWNpbWFsUGxhY2VzXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubnVtYmVycy5wdXNoKHZhbCk7XHJcbiAgICBpZiAoXHJcbiAgICAgICh0aGlzLm1heCAhPT0gdW5kZWZpbmVkICYmIHRoaXMubnVtYmVyVmFsID4gdGhpcy5tYXgpIHx8XHJcbiAgICAgICh0aGlzLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMubnVtYmVyVmFsIDwgdGhpcy5taW4pXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5udW1iZXJzLnBvcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVzaERlY2ltYWxTZXBhcmF0b3IoKSB7XHJcbiAgICBpZiAodGhpcy5udW1iZXJzLmluZGV4T2YoJy4nKSA8IDApIHtcclxuICAgICAgdGhpcy5udW1iZXJzLnB1c2goJy4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5udW1iZXJzLnBvcCgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGUgKm5nSWY9XCJ0aXRsZVwiPlxyXG4gICAgICB7eyB0aXRsZSB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cImVuZFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiZG9uZSgpXCI+e3sgJ0RJQUxPR1MuT0snIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8aW9uLWdyaWQgY2xhc3M9XCJudW1iZXItcGFkXCI+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImlvbi1qdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XHJcbiAgICAgIDxpb24tY29sIHNpemU9XCI4XCIgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1jZW50ZXIgdGV4dC12YWx1ZSBpb24tdGV4dC1yaWdodFwiPlxyXG4gICAgICAgIDxpb24tdGV4dCAqbmdJZj1cImlzTmVnYXRpdmVcIj4mIzg3MjI7PC9pb24tdGV4dD5cclxuICAgICAgICA8aW9uLXRleHQ+e3tsb2NhbGVTdHJpbmd9fTwvaW9uLXRleHQ+XHJcbiAgICAgICAgPGlvbi10ZXh0ICpuZ0lmPVwibG9jYWxlU3RyaW5nICYmIHN1ZmZpeFwiPiZuYnNwO3t7c3VmZml4fX08L2lvbi10ZXh0PlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDxpb24tY29sIHNpemU9XCI0XCIgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1jZW50ZXIgaW9uLXRleHQtcmlnaHRcIj5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cIiBkZWxldGUtYnV0dG9uXCIgZmlsbD1cImNsZWFyXCIgKGNsaWNrKT1cImNsZWFyKClcIj4mbGFycjs8L2lvbi1idXR0b24+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiICpuZ0Zvcj1cImxldCBpIG9mIFsnMScsJzInLCczJ11cIj5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiAoY2xpY2spPVwicHVzaE51bWJlcihpKVwiPnt7aX19PC9pb24tYnV0dG9uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdz5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIiAqbmdGb3I9XCJsZXQgaSBvZiBbJzQnLCc1JywnNiddXCI+XHJcbiAgICAgICAgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCIgKGNsaWNrKT1cInB1c2hOdW1iZXIoaSlcIj57e2l9fTwvaW9uLWJ1dHRvbj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3c+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCIgKm5nRm9yPVwibGV0IGkgb2YgWyc3JywnOCcsJzknXVwiPlxyXG4gICAgICAgIDxpb24tYnV0dG9uIGZpbGw9XCJjbGVhclwiIChjbGljayk9XCJwdXNoTnVtYmVyKGkpXCI+e3tpfX08L2lvbi1idXR0b24+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIDxpb24tYnV0dG9uIFtmaWxsXT1cImlzTmVnYXRpdmUgPyAnc29saWQnIDogJ2NsZWFyJ1wiICpuZ0lmPVwibWluIDwgMFwiIChjbGljayk9XCJ0b2dnbGVOZWdhdGl2ZSgpXCI+KyAvIC1cclxuICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiAoY2xpY2spPVwicHVzaE51bWJlcignMCcpXCI+MDwvaW9uLWJ1dHRvbj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIDxpb24tYnV0dG9uICpuZ0lmPVwiZGVjaW1hbFBsYWNlcyA+IDBcIiBmaWxsPVwiY2xlYXJcIiAoY2xpY2spPVwicHVzaERlY2ltYWxTZXBhcmF0b3IoKVwiPnt7ZGVjaW1hbFNlcH19PC9pb24tYnV0dG9uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgPC9pb24tZ3JpZD5cclxuPC9pb24tY29udGVudD4iLCJleHBvcnQgZW51bSBVdG1Tb3VyY2Uge1xyXG4gIFNlbGVjdGVkSW5NYXAgPSAzNSxcclxuICBHUFMgPSA0MFxyXG59XHJcbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBLZHZTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9rZHYva2R2LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdrZHZEZXNjcmlwdGlvbidcclxufSlcclxuZXhwb3J0IGNsYXNzIEtkdkRlc2NyaXB0aW9uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUga2R2U2VydmljZTogS2R2U2VydmljZSkge31cclxuXHJcbiAgYXN5bmMgdHJhbnNmb3JtKFxyXG4gICAgdmFsdWU6IG51bWJlcixcclxuICAgIGtkdktleTogc3RyaW5nLFxyXG4gICAgcmV0dXJuRGVzY3JpcHRpb24gPSBmYWxzZVxyXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBrZHZlbGVtZW50cyA9IGF3YWl0IHRoaXMua2R2U2VydmljZVxyXG4gICAgICAuZ2V0S2R2UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZShrZHZLZXkpXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGtkdmVsZW1lbnQgPSBrZHZlbGVtZW50cy5maW5kKCh4KSA9PiB4LklkID09PSB2YWx1ZSk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBrZHZlbGVtZW50XHJcbiAgICAgID8gcmV0dXJuRGVzY3JpcHRpb25cclxuICAgICAgICA/IGtkdmVsZW1lbnQuRGVzY3JpcHRpb25cclxuICAgICAgICA6IGtkdmVsZW1lbnQuTmFtZVxyXG4gICAgICA6ICcnO1xyXG4gICAgcmV0dXJuIHJlc3VsdC50cmltKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnVtYmVySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9oZWxwZXJzL251bWJlci1oZWxwZXInO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdtZXRlcnNUb0NtJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWV0ZXJzVG9DbVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGVjaW1hbFBsYWNlcyA9IDIpOiBhbnkge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE51bWJlckhlbHBlci5zZXREZWNpbWFsUGxhY2VzKHZhbHVlICogMTAwLjAsIGRlY2ltYWxQbGFjZXMpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2RhdGUtaGVscGVyL2RhdGUtaGVscGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgSVN1bW1hcnlJdGVtIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdW1tYXJ5LWl0ZW0vc3VtbWFyeS1pdGVtLm1vZGVsJztcclxuaW1wb3J0IHsgVXNlckdyb3VwU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1ncm91cC91c2VyLWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZlckdyb3VwRHRvIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBSb3V0ZXJEaXJlY3Rpb24gfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdW1tYXJ5SXRlbVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkYXRlSGVscGVyU2VydmljZTogRGF0ZUhlbHBlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJHcm91cFNlcnZpY2U6IFVzZXJHcm91cFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdkNvbnRyb2xsZXI6IE5hdkNvbnRyb2xsZXJcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIGdldFN1bW1hcnlJdGVtcyhcclxuICAgIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbixcclxuICAgIHVzZXJHcm91cHM/OiBPYnNlcnZlckdyb3VwRHRvW11cclxuICApIHtcclxuICAgIGlmICghcmVnaXN0cmF0aW9uKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGNvbnN0IHVzZXJHcm91cHNUb1VzZSA9IHVzZXJHcm91cHNcclxuICAgICAgPyB1c2VyR3JvdXBzXHJcbiAgICAgIDogYXdhaXQgdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmdldFVzZXJHcm91cHMoKTtcclxuICAgIGNvbnN0IHN1bW1hcnlJdGVtczogSVN1bW1hcnlJdGVtW10gPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogcmVnaXN0cmF0aW9uLmlkLFxyXG4gICAgICAgIGhyZWY6ICcvcmVnaXN0cmF0aW9uL29icy1sb2NhdGlvbicsXHJcbiAgICAgICAgcXVlcnlQYXJhbXM6IHsgZ2VvSGF6YXJkOiByZWdpc3RyYXRpb24uZ2VvSGF6YXJkIH0sXHJcbiAgICAgICAgdGl0bGU6ICdSRUdJU1RSQVRJT04uT0JTX0xPQ0FUSU9OLlRJVExFJyxcclxuICAgICAgICBzdWJUaXRsZTogcmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb25cclxuICAgICAgICAgID8gcmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24uTG9jYXRpb25OYW1lIHx8XHJcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvY2F0aW9uRGVzY3JpcHRpb25cclxuICAgICAgICAgIDogJycsXHJcbiAgICAgICAgaGFzRGF0YTogIWlzRW1wdHkocmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24pXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogcmVnaXN0cmF0aW9uLmlkLFxyXG4gICAgICAgIGhyZWY6ICcvcmVnaXN0cmF0aW9uL3NldC10aW1lJyxcclxuICAgICAgICB0aXRsZTogJ1JFR0lTVFJBVElPTi5PVkVSVklFVy5EQVRFX0FORF9USU1FJyxcclxuICAgICAgICBzdWJUaXRsZTogcmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lXHJcbiAgICAgICAgICA/IGF3YWl0IHRoaXMuZGF0ZUhlbHBlclNlcnZpY2UuZm9ybWF0RGF0ZVN0cmluZyhcclxuICAgICAgICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICA6ICcnLFxyXG4gICAgICAgIGhhc0RhdGE6ICEhcmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lXHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgICBpZiAodXNlckdyb3Vwc1RvVXNlLmxlbmd0aCA+IDApIHtcclxuICAgICAgc3VtbWFyeUl0ZW1zLnB1c2goe1xyXG4gICAgICAgIGlkOiByZWdpc3RyYXRpb24uaWQsXHJcbiAgICAgICAgaHJlZjogJy9yZWdpc3RyYXRpb24vZ3JvdXAnLFxyXG4gICAgICAgIHRpdGxlOiAnUkVHSVNUUkFUSU9OLk9WRVJWSUVXLlNIQVJFX1dJVEhfR1JPVVAnLFxyXG4gICAgICAgIHN1YlRpdGxlOiB0aGlzLmdldE9ic2VydmF0aW9uR3JvdXBOYW1lKHJlZ2lzdHJhdGlvbiwgdXNlckdyb3Vwc1RvVXNlKSxcclxuICAgICAgICBoYXNEYXRhOiAhIXJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic2VydmVyR3JvdXBJRFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdW1tYXJ5SXRlbXMucHVzaCguLi4gYXdhaXQgdGhpcy5nZXRHZW9IYXphcmRJdGVtcyhyZWdpc3RyYXRpb24pKTtcclxuXHJcbiAgICBzdW1tYXJ5SXRlbXMucHVzaChcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9nZW5lcmFsLWNvbW1lbnQnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5HZW5lcmFsT2JzZXJ2YXRpb25cclxuICAgICAgICAgID8gcmVnaXN0cmF0aW9uLnJlcXVlc3QuR2VuZXJhbE9ic2VydmF0aW9uLk9ic0NvbW1lbnRcclxuICAgICAgICAgIDogJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkdlbmVyYWxPYnNlcnZhdGlvblxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBzdW1tYXJ5SXRlbXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcmV2aW91c0FuZE5leHQoXHJcbiAgICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sXHJcbiAgICB1cmw6IHN0cmluZ1xyXG4gICk6IFByb21pc2U8eyBwcmV2aW91czogSVN1bW1hcnlJdGVtOyBuZXh0OiBJU3VtbWFyeUl0ZW0gfT4ge1xyXG4gICAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gYXdhaXQgdGhpcy5nZXRTdW1tYXJ5SXRlbXMocmVnaXN0cmF0aW9uKTtcclxuICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gc3VtbWFyeUl0ZW1zLmZpbmQoKHgpID0+IHVybC5pbmRleE9mKHguaHJlZikgPj0gMCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7IHByZXZpb3VzOiB1bmRlZmluZWQsIG5leHQ6IHVuZGVmaW5lZCB9O1xyXG4gICAgaWYgKGN1cnJlbnRJdGVtKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gc3VtbWFyeUl0ZW1zLmluZGV4T2YoY3VycmVudEl0ZW0pO1xyXG4gICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgcmVzdWx0LnByZXZpb3VzID0gc3VtbWFyeUl0ZW1zW2luZGV4IC0gMV07XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV4dEluZGV4ID0gaW5kZXggKyAxO1xyXG4gICAgICBpZiAobmV4dEluZGV4IDwgc3VtbWFyeUl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgIHJlc3VsdC5uZXh0ID0gc3VtbWFyeUl0ZW1zW25leHRJbmRleF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvKFxyXG4gICAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLFxyXG4gICAgc3VtbWFyeUl0ZW06IElTdW1tYXJ5SXRlbSxcclxuICAgIGRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uID0gJ2ZvcndhcmQnXHJcbiAgKSB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtzdW1tYXJ5SXRlbS5ocmVmfS8ke3JlZ2lzdHJhdGlvbi5pZH1gO1xyXG4gICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnXHJcbiAgICAgID8gdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlRm9yd2FyZCh1cmwpXHJcbiAgICAgIDogdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlQmFjayh1cmwpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmF2aWdhdGVGb3J3YXJkKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgdXJsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHByZXZBbmROZXh0ID0gYXdhaXQgdGhpcy5nZXRQcmV2aW91c0FuZE5leHQocmVnaXN0cmF0aW9uLCB1cmwpO1xyXG4gICAgaWYgKHByZXZBbmROZXh0Lm5leHQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGVUbyhyZWdpc3RyYXRpb24sIHByZXZBbmROZXh0Lm5leHQsICdmb3J3YXJkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlUm9vdChcclxuICAgICAgICBgL3JlZ2lzdHJhdGlvbi9lZGl0LyR7cmVnaXN0cmF0aW9uLmlkfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T2JzZXJ2YXRpb25Hcm91cE5hbWUoXHJcbiAgICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sXHJcbiAgICB1c2VyR3JvdXBzOiBPYnNlcnZlckdyb3VwRHRvW11cclxuICApIHtcclxuICAgIGlmIChyZWdpc3RyYXRpb24gJiYgcmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzZXJ2ZXJHcm91cElEICYmIHVzZXJHcm91cHMpIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRHcm91cCA9IHVzZXJHcm91cHMuZmluZChcclxuICAgICAgICAoeCkgPT4geC5JZCA9PT0gcmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzZXJ2ZXJHcm91cElEXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChzZWxlY3RlZEdyb3VwKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkR3JvdXAuTmFtZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRHZW9IYXphcmRJdGVtcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHN3aXRjaCAocmVnaXN0cmF0aW9uLmdlb0hhemFyZCkge1xyXG4gICAgY2FzZSBHZW9IYXphcmQuV2F0ZXI6XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFdhdGVySXRlbXMocmVnaXN0cmF0aW9uKTtcclxuICAgIGNhc2UgR2VvSGF6YXJkLkljZTpcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0SWNlSXRlbXMocmVnaXN0cmF0aW9uKTtcclxuICAgIGNhc2UgR2VvSGF6YXJkLlNvaWw6XHJcbiAgICAgIHJldHVybiB0aGlzLmdldERpcnRJdGVtcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgY2FzZSBHZW9IYXphcmQuU25vdzpcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U25vd0l0ZW1zKHJlZ2lzdHJhdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGdldFdhdGVySXRlbXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL3dhdGVyL3dhdGVyLWxldmVsJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMlxyXG4gICAgICAgICAgPyByZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5Db21tZW50XHJcbiAgICAgICAgICA6ICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5XYXRlckxldmVsMlxyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL3dhdGVyL2RhbWFnZScsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5XQVRFUi5EQU1BR0UuVElUTEUnLFxyXG4gICAgICAgICcnLCAvLyB0aGlzLnJlZ2lzdHJhdGlvbi5EYW1hZ2VPYnMgPyB0aGlzLnJlZ2lzdHJhdGlvbi5EYW1hZ2VPYnMubWFwKCh4KSA9PiB4LkNvbW1lbnQpLmpvaW4oKSA6ICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5EYW1hZ2VPYnNcclxuICAgICAgKVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZ2V0UmVnSXRlbShcclxuICAgIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbixcclxuICAgIGhyZWY6IHN0cmluZyxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBzdWJUaXRsZTogc3RyaW5nLFxyXG4gICAgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWRcclxuICApOiBQcm9taXNlPElTdW1tYXJ5SXRlbT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IHJlZ2lzdHJhdGlvbi5pZCxcclxuICAgICAgaHJlZixcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIHN1YlRpdGxlLFxyXG4gICAgICBoYXNEYXRhOiBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UuaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMocmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQpLnBpcGUodGFrZSgxKSkudG9Qcm9taXNlKCksXHJcbiAgICAgIGF0dGFjaG1lbnRzOiBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UuZ2V0QWxsQXR0YWNobWVudHNGb3JSZWdpc3RyYXRpb25UaWQkKHJlZ2lzdHJhdGlvbi5pZCwgcmVnaXN0cmF0aW9uVGlkKS5waXBlKHRha2UoMSkpLnRvUHJvbWlzZSgpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXREaXJ0SXRlbXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2Rhbmdlci1vYnMnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5USVRMRScsXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkRhbmdlck9ic1xyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2RpcnQvbGFuZHNsaWRlLW9icycsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnNcclxuICAgICAgICAgID8gcmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkNvbW1lbnRcclxuICAgICAgICAgIDogJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkxhbmRTbGlkZU9ic1xyXG4gICAgICApXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRJY2VJdGVtcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UmVnSXRlbShcclxuICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgJy9yZWdpc3RyYXRpb24vaWNlL2ljZS1jb3ZlcicsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5JQ0UuSUNFX0NPVkVSLlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VDb3Zlck9ic1xyXG4gICAgICAgICAgPyByZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VDb3Zlck9icy5Db21tZW50XHJcbiAgICAgICAgICA6ICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5JY2VDb3Zlck9ic1xyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2ljZS9pY2UtdGhpY2tuZXNzJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLlRJVExFJyxcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3NcclxuICAgICAgICAgID8gcmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkNvbW1lbnRcclxuICAgICAgICAgIDogJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkljZVRoaWNrbmVzc1xyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2Rhbmdlci1vYnMnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5USVRMRScsXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkRhbmdlck9ic1xyXG4gICAgICApLFxyXG4gICAgICBhd2FpdCB0aGlzLmdldFJlZ0l0ZW0oXHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLFxyXG4gICAgICAgICcvcmVnaXN0cmF0aW9uL2luY2lkZW50JyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLklOQ0lERU5ULlRJVExFJyxcclxuICAgICAgICAnJyxcclxuICAgICAgICBSZWdpc3RyYXRpb25UaWQuSW5jaWRlbnRcclxuICAgICAgKVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZ2V0U25vd0l0ZW1zKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbikge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9kYW5nZXItb2JzJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5EYW5nZXJPYnNcclxuICAgICAgKSxcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9zbm93L2F2YWxhbmNoZS1vYnMnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLlRJVExFJyxcclxuICAgICAgICAnJyxcclxuICAgICAgICBSZWdpc3RyYXRpb25UaWQuQXZhbGFuY2hlT2JzXHJcbiAgICAgICksXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UmVnSXRlbShcclxuICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgJy9yZWdpc3RyYXRpb24vc25vdy9hdmFsYW5jaGUtYWN0aXZpdHknLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5BdmFsYW5jaGVBY3Rpdml0eU9iczJcclxuICAgICAgKSxcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9zbm93L3dlYXRoZXInLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5XRUFUSEVSLlRJVExFJyxcclxuICAgICAgICAnJyxcclxuICAgICAgICBSZWdpc3RyYXRpb25UaWQuV2VhdGhlck9ic2VydmF0aW9uXHJcbiAgICAgICksXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UmVnSXRlbShcclxuICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgJy9yZWdpc3RyYXRpb24vc25vdy9zbm93LXN1cmZhY2UnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1NVUkZBQ0UuVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5Tbm93U3VyZmFjZU9ic2VydmF0aW9uXHJcbiAgICAgICksXHJcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UmVnSXRlbShcclxuICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgJy9yZWdpc3RyYXRpb24vc25vdy9jb21wcmVzc2lvbi10ZXN0JyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLlNOT1cuQ09NUFJFU1NJT05fVEVTVC5USVRMRScsXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAgUmVnaXN0cmF0aW9uVGlkLkNvbXByZXNzaW9uVGVzdFxyXG4gICAgICApLFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IHJlZ2lzdHJhdGlvbi5pZCxcclxuICAgICAgICBocmVmOiAnL3JlZ2lzdHJhdGlvbi9zbm93L3Nub3ctcHJvZmlsZScsXHJcbiAgICAgICAgdGl0bGU6ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuVElUTEUnLFxyXG4gICAgICAgIHN1YlRpdGxlOiAnJyxcclxuICAgICAgICBoYXNEYXRhOlxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICAgICAgICByZWdpc3RyYXRpb24sXHJcbiAgICAgICAgICAgIFJlZ2lzdHJhdGlvblRpZC5Tbm93UHJvZmlsZTJcclxuICAgICAgICAgICkucGlwZSh0YWtlKDEpKS50b1Byb21pc2UoKSB8fFxyXG4gICAgICAgICAgKHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkNvbXByZXNzaW9uVGVzdCAmJlxyXG4gICAgICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5Db21wcmVzc2lvblRlc3Quc29tZShcclxuICAgICAgICAgICAgICAoeCkgPT4geC5JbmNsdWRlSW5Tbm93UHJvZmlsZSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICApKSxcclxuICAgICAgICBhdHRhY2htZW50czogYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLmdldEFsbEF0dGFjaG1lbnRzRm9yUmVnaXN0cmF0aW9uVGlkJChcclxuICAgICAgICAgIHJlZ2lzdHJhdGlvbi5pZCxcclxuICAgICAgICAgIFJlZ2lzdHJhdGlvblRpZC5Tbm93UHJvZmlsZTJcclxuICAgICAgICApLnBpcGUodGFrZSgxKSkudG9Qcm9taXNlKClcclxuICAgICAgfSxcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9zbm93L2F2YWxhbmNoZS1wcm9ibGVtJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5BdmFsYW5jaGVFdmFsUHJvYmxlbTJcclxuICAgICAgKSxcclxuICAgICAgYXdhaXQgdGhpcy5nZXRSZWdJdGVtKFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvbixcclxuICAgICAgICAnL3JlZ2lzdHJhdGlvbi9zbm93L2F2YWxhbmNoZS1ldmFsdWF0aW9uJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX0VWQUxVQVRJT04uVElUTEUnLFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIFJlZ2lzdHJhdGlvblRpZC5BdmFsYW5jaGVFdmFsdWF0aW9uM1xyXG4gICAgICApXHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNhdmVBbmRHb0JhY2tCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2F2ZS1hbmQtZ28tYmFjay1idXR0b24vc2F2ZS1hbmQtZ28tYmFjay1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGV4dENvbW1lbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dC1jb21tZW50L3RleHQtY29tbWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBZGRQaWN0dXJlSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hZGQtcGljdHVyZS1pdGVtL2FkZC1waWN0dXJlLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgS2R2UmFkaW9idXR0b25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2tkdi1yYWRpb2J1dHRvbi1saXN0L2tkdi1yYWRpb2J1dHRvbi1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25CdXR0b25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24tYnV0dG9ucy9uYXZpZ2F0aW9uLWJ1dHRvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zZXQtbG9jYXRpb24taW4tbWFwL3NldC1sb2NhdGlvbi1pbi1tYXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwTW9kdWxlIH0gZnJvbSAnLi4vbWFwL21hcC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBCYXNlNjRJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9iYXNlNjQtaW1hZ2UvYmFzZTY0LWltYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEtkdkRlc2NyaXB0aW9uUGlwZSB9IGZyb20gJy4vcGlwZXMva2R2LWRlc2NyaXB0aW9uLnBpcGUnO1xyXG5pbXBvcnQgeyBBZGRXZWJVcmxJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FkZC13ZWItdXJsLWl0ZW0vYWRkLXdlYi11cmwtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb2RhbFNhdmVPckRlbGV0ZUJ1dHRvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucy9tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEV4cG9zZWRIZWlnaHRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc25vdy9leHBvc2VkLWhlaWdodC9leHBvc2VkLWhlaWdodC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWYWxpZEV4cG9zaXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc25vdy92YWxpZC1leHBvc2l0aW9uL3ZhbGlkLWV4cG9zaXRpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uQ29udGVudFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlci9yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEhlbHBUZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlbHAtdGV4dC9oZWxwLXRleHQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSGVscE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4vcGFnZXMvbW9kYWwtcGFnZXMvaGVscC1tb2RhbC9oZWxwLW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFllc05vU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3llcy1uby1zZWxlY3QveWVzLW5vLXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOdW1lcmljSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbnVtZXJpYy1pbnB1dC9udW1lcmljLWlucHV0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE51bWVyaWNJbnB1dE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4vcGFnZXMvbW9kYWwtcGFnZXMvbnVtZXJpYy1pbnB1dC1tb2RhbC9udW1lcmljLWlucHV0LW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IE1ldGVyc1RvQ21QaXBlIH0gZnJvbSAnLi9waXBlcy9tZXRlcnMtdG8tY20ucGlwZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc25vdy9jb21wcmVzc2lvbi10ZXN0LWxpc3QvY29tcHJlc3Npb24tdGVzdC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEtkdlNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9rZHYtc2VsZWN0L2tkdi1zZWxlY3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQmxvYkltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Jsb2ItaW1hZ2UvYmxvYi1pbWFnZS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICBNYXBNb2R1bGUsXHJcbiAgICBIZWxwTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgTnVtZXJpY0lucHV0TW9kYWxQYWdlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICBNYXBNb2R1bGUsXHJcbiAgICBTYXZlQW5kR29CYWNrQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgQWRkUGljdHVyZUl0ZW1Db21wb25lbnQsXHJcbiAgICBUZXh0Q29tbWVudENvbXBvbmVudCxcclxuICAgIEtkdlJhZGlvYnV0dG9uTGlzdENvbXBvbmVudCxcclxuICAgIE5hdmlnYXRpb25CdXR0b25zQ29tcG9uZW50LFxyXG4gICAgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCxcclxuICAgIEJhc2U2NEltYWdlQ29tcG9uZW50LFxyXG4gICAgS2R2RGVzY3JpcHRpb25QaXBlLFxyXG4gICAgTWV0ZXJzVG9DbVBpcGUsXHJcbiAgICBBZGRXZWJVcmxJdGVtQ29tcG9uZW50LFxyXG4gICAgTW9kYWxTYXZlT3JEZWxldGVCdXR0b25zQ29tcG9uZW50LFxyXG4gICAgRXhwb3NlZEhlaWdodENvbXBvbmVudCxcclxuICAgIFZhbGlkRXhwb3NpdGlvbkNvbXBvbmVudCxcclxuICAgIFJlZ2lzdHJhdGlvbkNvbnRlbnRXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgSGVscFRleHRDb21wb25lbnQsXHJcbiAgICBIZWxwTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgWWVzTm9TZWxlY3RDb21wb25lbnQsXHJcbiAgICBOdW1lcmljSW5wdXRDb21wb25lbnQsXHJcbiAgICBOdW1lcmljSW5wdXRNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBDb21wcmVzc2lvblRlc3RMaXN0Q29tcG9uZW50LFxyXG4gICAgS2R2U2VsZWN0Q29tcG9uZW50LFxyXG4gICAgQmxvYkltYWdlQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTYXZlQW5kR29CYWNrQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgQWRkUGljdHVyZUl0ZW1Db21wb25lbnQsXHJcbiAgICBUZXh0Q29tbWVudENvbXBvbmVudCxcclxuICAgIEtkdlJhZGlvYnV0dG9uTGlzdENvbXBvbmVudCxcclxuICAgIE5hdmlnYXRpb25CdXR0b25zQ29tcG9uZW50LFxyXG4gICAgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCxcclxuICAgIEJhc2U2NEltYWdlQ29tcG9uZW50LFxyXG4gICAgS2R2RGVzY3JpcHRpb25QaXBlLFxyXG4gICAgTWV0ZXJzVG9DbVBpcGUsXHJcbiAgICBBZGRXZWJVcmxJdGVtQ29tcG9uZW50LFxyXG4gICAgTW9kYWxTYXZlT3JEZWxldGVCdXR0b25zQ29tcG9uZW50LFxyXG4gICAgRXhwb3NlZEhlaWdodENvbXBvbmVudCxcclxuICAgIFZhbGlkRXhwb3NpdGlvbkNvbXBvbmVudCxcclxuICAgIFJlZ2lzdHJhdGlvbkNvbnRlbnRXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgSGVscFRleHRDb21wb25lbnQsXHJcbiAgICBZZXNOb1NlbGVjdENvbXBvbmVudCxcclxuICAgIE51bWVyaWNJbnB1dENvbXBvbmVudCxcclxuICAgIENvbXByZXNzaW9uVGVzdExpc3RDb21wb25lbnQsXHJcbiAgICBLZHZTZWxlY3RDb21wb25lbnQsXHJcbiAgICBCbG9iSW1hZ2VDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9