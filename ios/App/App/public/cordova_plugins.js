
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-camera.Camera",
          "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
          "pluginId": "cordova-plugin-camera",
        "clobbers": [
          "Camera"
        ]
        },
      {
          "id": "cordova-plugin-camera.CameraPopoverHandle",
          "file": "plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js",
          "pluginId": "cordova-plugin-camera",
        "clobbers": [
          "CameraPopoverHandle"
        ]
        },
      {
          "id": "cordova-plugin-camera.CameraPopoverOptions",
          "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
          "pluginId": "cordova-plugin-camera",
        "clobbers": [
          "CameraPopoverOptions"
        ]
        },
      {
          "id": "cordova-plugin-device-orientation.CompassError",
          "file": "plugins/cordova-plugin-device-orientation/www/CompassError.js",
          "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
          "CompassError"
        ]
        },
      {
          "id": "cordova-plugin-device-orientation.CompassHeading",
          "file": "plugins/cordova-plugin-device-orientation/www/CompassHeading.js",
          "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
          "CompassHeading"
        ]
        },
      {
          "id": "cordova-plugin-inappbrowser.inappbrowser",
          "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
          "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
          "cordova.InAppBrowser.open"
        ]
        },
      {
          "id": "cordova-plugin-advanced-http.http",
          "file": "plugins/cordova-plugin-advanced-http/www/advanced-http.js",
          "pluginId": "cordova-plugin-advanced-http",
        "clobbers": [
          "cordova.plugin.http"
        ]
        },
      {
          "id": "cordova-clipboard.Clipboard",
          "file": "plugins/cordova-clipboard/www/clipboard.js",
          "pluginId": "cordova-clipboard",
        "clobbers": [
          "cordova.plugins.clipboard"
        ]
        },
      {
          "id": "cordova-plugin-email-composer.EmailComposer",
          "file": "plugins/cordova-plugin-email-composer/www/email_composer.js",
          "pluginId": "cordova-plugin-email-composer",
        "clobbers": [
          "cordova.plugins.email"
        ]
        },
      {
          "id": "cordova-plugin-android-permissions.Permissions",
          "file": "plugins/cordova-plugin-android-permissions/www/permissions-dummy.js",
          "pluginId": "cordova-plugin-android-permissions",
        "clobbers": [
          "cordova.plugins.permissions"
        ]
        },
      {
          "id": "cordova-plugin-screen-orientation.screenorientation",
          "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
          "pluginId": "cordova-plugin-screen-orientation",
        "clobbers": [
          "cordova.plugins.screenorientation"
        ]
        },
      {
          "id": "cordova-plugin-device.device",
          "file": "plugins/cordova-plugin-device/www/device.js",
          "pluginId": "cordova-plugin-device",
        "clobbers": [
          "device"
        ]
        },
      {
          "id": "sqli-cordova-disk-space-plugin.DiskSpacePlugin",
          "file": "plugins/sqli-cordova-disk-space-plugin/diskSpace.js",
          "pluginId": "sqli-cordova-disk-space-plugin",
        "clobbers": [
          "DiskSpacePlugin"
        ]
        },
      {
          "id": "cordova-plugin-camera.camera",
          "file": "plugins/cordova-plugin-camera/www/Camera.js",
          "pluginId": "cordova-plugin-camera",
        "clobbers": [
          "navigator.camera"
        ]
        },
      {
          "id": "cordova-plugin-device-orientation.compass",
          "file": "plugins/cordova-plugin-device-orientation/www/compass.js",
          "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
          "navigator.compass"
        ]
        },
      {
          "id": "adapter-sqlite-cordova.nSQLadapter",
          "file": "plugins/adapter-sqlite-cordova/dist/sqlite.js",
          "pluginId": "adapter-sqlite-cordova",
        "clobbers": [
          "nSQLadapter"
        ]
        },
      {
          "id": "cordova-plugin-safariviewcontroller.SafariViewController",
          "file": "plugins/cordova-plugin-safariviewcontroller/www/SafariViewController.js",
          "pluginId": "cordova-plugin-safariviewcontroller",
        "clobbers": [
          "SafariViewController"
        ]
        },
      {
          "id": "cordova-plugin-secure-storage-echo.SecureStorage",
          "file": "plugins/cordova-plugin-secure-storage-echo/www/securestorage.js",
          "pluginId": "cordova-plugin-secure-storage-echo",
        "clobbers": [
          "SecureStorage"
        ]
        },
      {
          "id": "cordova-sqlite-storage.SQLitePlugin",
          "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
          "pluginId": "cordova-sqlite-storage",
        "clobbers": [
          "SQLitePlugin"
        ]
        },
      {
          "id": "cordova-plugin-file.DirectoryEntry",
          "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.DirectoryEntry"
        ]
        },
      {
          "id": "cordova-plugin-file.DirectoryReader",
          "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.DirectoryReader"
        ]
        },
      {
          "id": "cordova-plugin-file.Entry",
          "file": "plugins/cordova-plugin-file/www/Entry.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.Entry"
        ]
        },
      {
          "id": "cordova-plugin-file.File",
          "file": "plugins/cordova-plugin-file/www/File.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.File"
        ]
        },
      {
          "id": "cordova-plugin-file.FileEntry",
          "file": "plugins/cordova-plugin-file/www/FileEntry.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileEntry"
        ]
        },
      {
          "id": "cordova-plugin-file.FileError",
          "file": "plugins/cordova-plugin-file/www/FileError.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileError"
        ]
        },
      {
          "id": "cordova-plugin-file.FileReader",
          "file": "plugins/cordova-plugin-file/www/FileReader.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileReader"
        ]
        },
      {
          "id": "cordova-plugin-file.FileSystem",
          "file": "plugins/cordova-plugin-file/www/FileSystem.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileSystem"
        ]
        },
      {
          "id": "cordova-plugin-file.FileUploadOptions",
          "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileUploadOptions"
        ]
        },
      {
          "id": "cordova-plugin-file.FileUploadResult",
          "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileUploadResult"
        ]
        },
      {
          "id": "cordova-plugin-file.FileWriter",
          "file": "plugins/cordova-plugin-file/www/FileWriter.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileWriter"
        ]
        },
      {
          "id": "cordova-plugin-file.Flags",
          "file": "plugins/cordova-plugin-file/www/Flags.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.Flags"
        ]
        },
      {
          "id": "cordova-plugin-file.LocalFileSystem",
          "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.LocalFileSystem"
        ],
        "merges": [
          "window"
        ]
        },
      {
          "id": "cordova-plugin-file.Metadata",
          "file": "plugins/cordova-plugin-file/www/Metadata.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.Metadata"
        ]
        },
      {
          "id": "cordova-plugin-x-socialsharing.SocialSharing",
          "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
          "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
          "window.plugins.socialsharing"
        ]
        },
      {
          "id": "cordova-plugin-file.ProgressEvent",
          "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.ProgressEvent"
        ]
        },
      {
          "id": "cordova-plugin-file.requestFileSystem",
          "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.requestFileSystem"
        ]
        },
      {
          "id": "es6-promise-plugin.Promise",
          "file": "plugins/es6-promise-plugin/www/promise.js",
          "pluginId": "es6-promise-plugin",
        "runs": true
        },
      {
          "id": "cordova-plugin-advanced-http.cookie-handler",
          "file": "plugins/cordova-plugin-advanced-http/www/cookie-handler.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.dependency-validator",
          "file": "plugins/cordova-plugin-advanced-http/www/dependency-validator.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.error-codes",
          "file": "plugins/cordova-plugin-advanced-http/www/error-codes.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.global-configs",
          "file": "plugins/cordova-plugin-advanced-http/www/global-configs.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.helpers",
          "file": "plugins/cordova-plugin-advanced-http/www/helpers.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.js-util",
          "file": "plugins/cordova-plugin-advanced-http/www/js-util.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.local-storage-store",
          "file": "plugins/cordova-plugin-advanced-http/www/local-storage-store.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.lodash",
          "file": "plugins/cordova-plugin-advanced-http/www/lodash.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.messages",
          "file": "plugins/cordova-plugin-advanced-http/www/messages.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.ponyfills",
          "file": "plugins/cordova-plugin-advanced-http/www/ponyfills.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.public-interface",
          "file": "plugins/cordova-plugin-advanced-http/www/public-interface.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.tough-cookie",
          "file": "plugins/cordova-plugin-advanced-http/www/umd-tough-cookie.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.url-util",
          "file": "plugins/cordova-plugin-advanced-http/www/url-util.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-file.fileSystems",
          "file": "plugins/cordova-plugin-file/www/fileSystems.js",
          "pluginId": "cordova-plugin-file"
        },
      {
          "id": "cordova-plugin-file.isChrome",
          "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
          "pluginId": "cordova-plugin-file",
        "runs": true
        },
      {
          "id": "cordova-plugin-file.fileSystems-roots",
          "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
          "pluginId": "cordova-plugin-file",
        "runs": true
        },
      {
          "id": "cordova-plugin-file.fileSystemPaths",
          "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
          "pluginId": "cordova-plugin-file",
        "merges": [
          "cordova"
        ],
        "runs": true
        },
      {
          "id": "cordova-plugin-file.iosFileSystem",
          "file": "plugins/cordova-plugin-file/www/ios/FileSystem.js",
          "pluginId": "cordova-plugin-file",
        "merges": [
          "FileSystem"
        ]
        },
      {
          "id": "cordova-plugin-file.resolveLocalFileSystemURI",
          "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
          "pluginId": "cordova-plugin-file",
        "merges": [
          "window"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "adapter-sqlite-cordova": "2.1.2",
      "cordova-plugin-device": "2.0.3",
      "cordova-sqlite-storage": "6.0.0",
      "es6-promise-plugin": "4.2.2",
      "cordova-clipboard": "1.3.0",
      "cordova-plugin-advanced-http": "3.2.0",
      "cordova-plugin-android-permissions": "1.1.2",
      "cordova-plugin-camera": "6.0.0",
      "cordova-plugin-device-orientation": "2.0.1",
      "cordova-plugin-email-composer": "0.9.2",
      "cordova-plugin-file": "6.0.2",
      "cordova-plugin-inappbrowser": "5.0.0",
      "cordova-plugin-safariviewcontroller": "2.0.0",
      "cordova-plugin-screen-orientation": "3.0.2",
      "cordova-plugin-secure-storage-echo": "5.1.1",
      "cordova-plugin-x-socialsharing": "6.0.3",
      "sqli-cordova-disk-space-plugin": "1.0.2"
    };
    // BOTTOM OF METADATA
    });
    