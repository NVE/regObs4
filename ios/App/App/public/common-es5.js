(function () {
  "use strict";

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["common"], {
    /***/
    80631: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "c": function c() {
          return (
            /* binding */
            createButtonActiveGesture
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./index-7a8b7a1c.js */
      76842);
      /* harmony import */


      var _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./haptic-27b3f981.js */
      99502);
      /* harmony import */


      var _index_34cb2743_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./index-34cb2743.js */
      88910);

      var createButtonActiveGesture = function createButtonActiveGesture(el, isButton) {
        var currentTouchedButton;
        var initialTouchedButton;

        var activateButtonAtPoint = function activateButtonAtPoint(x, y, hapticFeedbackFn) {
          if (typeof document === 'undefined') {
            return;
          }

          var target = document.elementFromPoint(x, y);

          if (!target || !isButton(target)) {
            clearActiveButton();
            return;
          }

          if (target !== currentTouchedButton) {
            clearActiveButton();
            setActiveButton(target, hapticFeedbackFn);
          }
        };

        var setActiveButton = function setActiveButton(button, hapticFeedbackFn) {
          currentTouchedButton = button;

          if (!initialTouchedButton) {
            initialTouchedButton = currentTouchedButton;
          }

          var buttonToModify = currentTouchedButton;
          (0, _index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__.c)(function () {
            return buttonToModify.classList.add('ion-activated');
          });
          hapticFeedbackFn();
        };

        var clearActiveButton = function clearActiveButton() {
          var dispatchClick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          if (!currentTouchedButton) {
            return;
          }

          var buttonToModify = currentTouchedButton;
          (0, _index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__.c)(function () {
            return buttonToModify.classList.remove('ion-activated');
          });
          /**
           * Clicking on one button, but releasing on another button
           * does not dispatch a click event in browsers, so we
           * need to do it manually here. Some browsers will
           * dispatch a click if clicking on one button, dragging over
           * another button, and releasing on the original button. In that
           * case, we need to make sure we do not cause a double click there.
           */

          if (dispatchClick && initialTouchedButton !== currentTouchedButton) {
            currentTouchedButton.click();
          }

          currentTouchedButton = undefined;
        };

        return (0, _index_34cb2743_js__WEBPACK_IMPORTED_MODULE_2__.createGesture)({
          el: el,
          gestureName: 'buttonActiveDrag',
          threshold: 0,
          onStart: function onStart(ev) {
            return activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__.a);
          },
          onMove: function onMove(ev) {
            return activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__.b);
          },
          onEnd: function onEnd() {
            clearActiveButton(true);
            (0, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__.h)();
            initialTouchedButton = undefined;
          }
        });
      };
      /***/

    },

    /***/
    85356: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "a": function a() {
          return (
            /* binding */
            attachComponent
          );
        },

        /* harmony export */
        "d": function d() {
          return (
            /* binding */
            detachComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var C_Repos_regobs_regObs4_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */
      80151);
      /* harmony import */


      var _helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./helpers-dd7e4b7b.js */
      40693);

      var attachComponent = /*#__PURE__*/function () {
        var _ref = (0, C_Repos_regobs_regObs4_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(delegate, container, component, cssClasses, componentProps) {
          var el;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!delegate) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return", delegate.attachViewToDom(container, component, componentProps, cssClasses));

                case 2:
                  if (!(typeof component !== 'string' && !(component instanceof HTMLElement))) {
                    _context.next = 4;
                    break;
                  }

                  throw new Error('framework delegate is missing');

                case 4:
                  el = typeof component === 'string' ? container.ownerDocument && container.ownerDocument.createElement(component) : component;

                  if (cssClasses) {
                    cssClasses.forEach(function (c) {
                      return el.classList.add(c);
                    });
                  }

                  if (componentProps) {
                    Object.assign(el, componentProps);
                  }

                  container.appendChild(el);
                  _context.next = 10;
                  return new Promise(function (resolve) {
                    return (0, _helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_1__.c)(el, resolve);
                  });

                case 10:
                  return _context.abrupt("return", el);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function attachComponent(_x, _x2, _x3, _x4, _x5) {
          return _ref.apply(this, arguments);
        };
      }();

      var detachComponent = function detachComponent(delegate, element) {
        if (element) {
          if (delegate) {
            var container = element.parentElement;
            return delegate.removeViewFromDom(container, element);
          }

          element.remove();
        }

        return Promise.resolve();
      };
      /***/

    },

    /***/
    99502: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "a": function a() {
          return (
            /* binding */
            hapticSelectionStart
          );
        },

        /* harmony export */
        "b": function b() {
          return (
            /* binding */
            hapticSelectionChanged
          );
        },

        /* harmony export */
        "c": function c() {
          return (
            /* binding */
            hapticSelection
          );
        },

        /* harmony export */
        "d": function d() {
          return (
            /* binding */
            hapticImpact
          );
        },

        /* harmony export */
        "h": function h() {
          return (
            /* binding */
            hapticSelectionEnd
          );
        }
        /* harmony export */

      });

      var HapticEngine = {
        getEngine: function getEngine() {
          var win = window;
          return win.TapticEngine || win.Capacitor && win.Capacitor.isPluginAvailable('Haptics') && win.Capacitor.Plugins.Haptics;
        },
        available: function available() {
          return !!this.getEngine();
        },
        isCordova: function isCordova() {
          return !!window.TapticEngine;
        },
        isCapacitor: function isCapacitor() {
          var win = window;
          return !!win.Capacitor;
        },
        impact: function impact(options) {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          var style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
          engine.impact({
            style: style
          });
        },
        notification: function notification(options) {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          var style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
          engine.notification({
            style: style
          });
        },
        selection: function selection() {
          this.impact({
            style: 'light'
          });
        },
        selectionStart: function selectionStart() {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          if (this.isCapacitor()) {
            engine.selectionStart();
          } else {
            engine.gestureSelectionStart();
          }
        },
        selectionChanged: function selectionChanged() {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          if (this.isCapacitor()) {
            engine.selectionChanged();
          } else {
            engine.gestureSelectionChanged();
          }
        },
        selectionEnd: function selectionEnd() {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          if (this.isCapacitor()) {
            engine.selectionEnd();
          } else {
            engine.gestureSelectionEnd();
          }
        }
      };
      /**
       * Trigger a selection changed haptic event. Good for one-time events
       * (not for gestures)
       */

      var hapticSelection = function hapticSelection() {
        HapticEngine.selection();
      };
      /**
       * Tell the haptic engine that a gesture for a selection change is starting.
       */


      var hapticSelectionStart = function hapticSelectionStart() {
        HapticEngine.selectionStart();
      };
      /**
       * Tell the haptic engine that a selection changed during a gesture.
       */


      var hapticSelectionChanged = function hapticSelectionChanged() {
        HapticEngine.selectionChanged();
      };
      /**
       * Tell the haptic engine we are done with a gesture. This needs to be
       * called lest resources are not properly recycled.
       */


      var hapticSelectionEnd = function hapticSelectionEnd() {
        HapticEngine.selectionEnd();
      };
      /**
       * Use this to indicate success/failure/warning to the user.
       * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
       */


      var hapticImpact = function hapticImpact(options) {
        HapticEngine.impact(options);
      };
      /***/

    },

    /***/
    15907: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "S": function S() {
          return (
            /* binding */
            SPINNERS
          );
        }
        /* harmony export */

      });

      var spinners = {
        'bubbles': {
          dur: 1000,
          circles: 9,
          fn: function fn(dur, index, total) {
            var animationDelay = "".concat(dur * index / total - dur, "ms");
            var angle = 2 * Math.PI * index / total;
            return {
              r: 5,
              style: {
                'top': "".concat(9 * Math.sin(angle), "px"),
                'left': "".concat(9 * Math.cos(angle), "px"),
                'animation-delay': animationDelay
              }
            };
          }
        },
        'circles': {
          dur: 1000,
          circles: 8,
          fn: function fn(dur, index, total) {
            var step = index / total;
            var animationDelay = "".concat(dur * step - dur, "ms");
            var angle = 2 * Math.PI * step;
            return {
              r: 5,
              style: {
                'top': "".concat(9 * Math.sin(angle), "px"),
                'left': "".concat(9 * Math.cos(angle), "px"),
                'animation-delay': animationDelay
              }
            };
          }
        },
        'circular': {
          dur: 1400,
          elmDuration: true,
          circles: 1,
          fn: function fn() {
            return {
              r: 20,
              cx: 48,
              cy: 48,
              fill: 'none',
              viewBox: '24 24 48 48',
              transform: 'translate(0,0)',
              style: {}
            };
          }
        },
        'crescent': {
          dur: 750,
          circles: 1,
          fn: function fn() {
            return {
              r: 26,
              style: {}
            };
          }
        },
        'dots': {
          dur: 750,
          circles: 3,
          fn: function fn(_, index) {
            var animationDelay = -(110 * index) + 'ms';
            return {
              r: 6,
              style: {
                'left': "".concat(9 - 9 * index, "px"),
                'animation-delay': animationDelay
              }
            };
          }
        },
        'lines': {
          dur: 1000,
          lines: 12,
          fn: function fn(dur, index, total) {
            var transform = "rotate(".concat(30 * index + (index < 6 ? 180 : -180), "deg)");
            var animationDelay = "".concat(dur * index / total - dur, "ms");
            return {
              y1: 17,
              y2: 29,
              style: {
                'transform': transform,
                'animation-delay': animationDelay
              }
            };
          }
        },
        'lines-small': {
          dur: 1000,
          lines: 12,
          fn: function fn(dur, index, total) {
            var transform = "rotate(".concat(30 * index + (index < 6 ? 180 : -180), "deg)");
            var animationDelay = "".concat(dur * index / total - dur, "ms");
            return {
              y1: 12,
              y2: 20,
              style: {
                'transform': transform,
                'animation-delay': animationDelay
              }
            };
          }
        }
      };
      var SPINNERS = spinners;
      /***/
    },

    /***/
    43784: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "c": function c() {
          return (
            /* binding */
            createColorClasses
          );
        },

        /* harmony export */
        "g": function g() {
          return (
            /* binding */
            getClassMap
          );
        },

        /* harmony export */
        "h": function h() {
          return (
            /* binding */
            hostContext
          );
        },

        /* harmony export */
        "o": function o() {
          return (
            /* binding */
            openURL
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var C_Repos_regobs_regObs4_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */
      80151);

      var hostContext = function hostContext(selector, el) {
        return el.closest(selector) !== null;
      };
      /**
       * Create the mode and color classes for the component based on the classes passed in
       */


      var createColorClasses = function createColorClasses(color, cssClassMap) {
        return typeof color === 'string' && color.length > 0 ? Object.assign(_defineProperty({
          'ion-color': true
        }, "ion-color-".concat(color), true), cssClassMap) : cssClassMap;
      };

      var getClassList = function getClassList(classes) {
        if (classes !== undefined) {
          var array = Array.isArray(classes) ? classes : classes.split(' ');
          return array.filter(function (c) {
            return c != null;
          }).map(function (c) {
            return c.trim();
          }).filter(function (c) {
            return c !== '';
          });
        }

        return [];
      };

      var getClassMap = function getClassMap(classes) {
        var map = {};
        getClassList(classes).forEach(function (c) {
          return map[c] = true;
        });
        return map;
      };

      var SCHEME = /^[a-z][a-z0-9+\-.]*:/;

      var openURL = /*#__PURE__*/function () {
        var _ref = (0, C_Repos_regobs_regObs4_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, ev, direction, animation) {
          var router;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(url != null && url[0] !== '#' && !SCHEME.test(url))) {
                    _context2.next = 5;
                    break;
                  }

                  router = document.querySelector('ion-router');

                  if (!router) {
                    _context2.next = 5;
                    break;
                  }

                  if (ev != null) {
                    ev.preventDefault();
                  }

                  return _context2.abrupt("return", router.push(url, direction, animation));

                case 5:
                  return _context2.abrupt("return", false);

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function openURL(_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }();
      /***/

    },

    /***/
    99020: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ArrayHelper": function ArrayHelper() {
          return (
            /* binding */
            _ArrayHelper
          );
        }
        /* harmony export */

      });

      var _ArrayHelper = /*#__PURE__*/function () {
        function _ArrayHelper() {
          _classCallCheck(this, _ArrayHelper);
        }

        _createClass(_ArrayHelper, null, [{
          key: "liftToArray",
          value: function liftToArray(item) {
            if (item instanceof Array) {
              return item;
            } else if (item) {
              return [item];
            } else {
              return [];
            }
          }
          /**
           * @param array Array
           * @param fromIndex Reorder item from index
           * @param toIndex Reorder item to index
           * @returns New reordered array
           */

        }, {
          key: "reorderList",
          value: function reorderList(array, fromIndex, toIndex) {
            if (!array || array.length === 0) {
              return array;
            }

            var arrayCopy = _toConsumableArray(array);

            arrayCopy.splice(toIndex, 0, arrayCopy.splice(fromIndex, 1)[0]);
            return arrayCopy;
          }
        }]);

        return _ArrayHelper;
      }();
      /***/

    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkYsU0FBNUJFLENBUEc7O0FBQUE7QUFBQSxvREFVUCxLQVZPOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQUg7O0FBQUEsd0JBQVBOLE9BQU87QUFBQTtBQUFBO0FBQUEsU0FBYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN6QmFXOzs7Ozs7O2lCQUNYLHFCQUFzQkMsSUFBdEIsRUFBbUM7QUFDakMsZ0JBQUlBLElBQUksWUFBWXBCLEtBQXBCLEVBQTJCO0FBQ3pCLHFCQUFPb0IsSUFBUDtBQUNELGFBRkQsTUFFTyxJQUFJQSxJQUFKLEVBQVU7QUFDZixxQkFBTyxDQUFDQSxJQUFELENBQVA7QUFDRCxhQUZNLE1BRUE7QUFDTCxxQkFBTyxFQUFQO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Ozs7aUJBTUEscUJBQ0VyQixLQURGLEVBRUVzQixTQUZGLEVBR0VDLE9BSEYsRUFHaUI7QUFFZixnQkFBSSxDQUFDdkIsS0FBRCxJQUFVQSxLQUFLLENBQUNKLE1BQU4sS0FBaUIsQ0FBL0IsRUFBa0M7QUFDaEMscUJBQU9JLEtBQVA7QUFDRDs7QUFDRCxnQkFBTXdCLFNBQVMsc0JBQU94QixLQUFQLENBQWY7O0FBQ0F3QixxQkFBUyxDQUFDQyxNQUFWLENBQWlCRixPQUFqQixFQUEwQixDQUExQixFQUE2QkMsU0FBUyxDQUFDQyxNQUFWLENBQWlCSCxTQUFqQixFQUE0QixDQUE1QixFQUErQixDQUEvQixDQUE3QjtBQUNBLG1CQUFPRSxTQUFQO0FBQ0Q7Ozs7Ozs7OyIsIm5hbWVzIjpbImNsZWFyQWN0aXZlQnV0dG9uIiwic2V0QWN0aXZlQnV0dG9uIiwiY3VycmVudFRvdWNoZWRCdXR0b24iLCJpbml0aWFsVG91Y2hlZEJ1dHRvbiIsImhhcHRpY0ZlZWRiYWNrRm4iLCJlbCIsImdlc3R1cmVOYW1lIiwidGhyZXNob2xkIiwib25TdGFydCIsIl9oYXB0aWNfMjdiM2Y5ODFfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIm9uTW92ZSIsIm9uRW5kIiwiYXR0YWNoQ29tcG9uZW50IiwiZGVsZWdhdGUiLCJjb250YWluZXIiLCJjb21wb25lbnQiLCJjc3NDbGFzc2VzIiwiY29tcG9uZW50UHJvcHMiLCJhdHRhY2hWaWV3VG9Eb20iLCJIVE1MRWxlbWVudCIsIkVycm9yIiwib3duZXJEb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJmb3JFYWNoIiwiYyIsImNsYXNzTGlzdCIsImFkZCIsIk9iamVjdCIsImFzc2lnbiIsImFwcGVuZENoaWxkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb21wb25lbnRPblJlYWR5IiwiZGV0YWNoQ29tcG9uZW50IiwiZWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVWaWV3RnJvbURvbSIsInJlbW92ZSIsImdldEVuZ2luZSIsImF2YWlsYWJsZSIsImlzQ29yZG92YSIsImlzQ2FwYWNpdG9yIiwiaW1wYWN0Iiwib3B0aW9ucyIsImVuZ2luZSIsInN0eWxlIiwibm90aWZpY2F0aW9uIiwic2VsZWN0aW9uIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25DaGFuZ2VkIiwic2VsZWN0aW9uRW5kIiwiSGFwdGljRW5naW5lIiwiZHVyIiwiY2lyY2xlcyIsImZuIiwiciIsImVsbUR1cmF0aW9uIiwiY3giLCJjeSIsImZpbGwiLCJ2aWV3Qm94IiwidHJhbnNmb3JtIiwibGluZXMiLCJ5MSIsInkyIiwiaG9zdENvbnRleHQiLCJzZWxlY3RvciIsImNsb3Nlc3QiLCJjcmVhdGVDb2xvckNsYXNzZXMiLCJjb2xvciIsImNzc0NsYXNzTWFwIiwibGVuZ3RoIiwiZ2V0Q2xhc3NMaXN0IiwiY2xhc3NlcyIsInVuZGVmaW5lZCIsImFycmF5IiwiQXJyYXkiLCJpc0FycmF5Iiwic3BsaXQiLCJmaWx0ZXIiLCJtYXAiLCJ0cmltIiwiZ2V0Q2xhc3NNYXAiLCJTQ0hFTUUiLCJvcGVuVVJMIiwidXJsIiwiZXYiLCJkaXJlY3Rpb24iLCJhbmltYXRpb24iLCJ0ZXN0Iiwicm91dGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicHJldmVudERlZmF1bHQiLCJwdXNoIiwiQXJyYXlIZWxwZXIiLCJpdGVtIiwiZnJvbUluZGV4IiwidG9JbmRleCIsImFycmF5Q29weSIsInNwbGljZSJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0Bpb25pYy9jb3JlL2Rpc3QvZXNtL2J1dHRvbi1hY3RpdmUtZDRiZDRmNzQuanMiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AaW9uaWMvY29yZS9kaXN0L2VzbS9mcmFtZXdvcmstZGVsZWdhdGUtNDM5MmNkNjMuanMiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AaW9uaWMvY29yZS9kaXN0L2VzbS9oYXB0aWMtMjdiM2Y5ODEuanMiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AaW9uaWMvY29yZS9kaXN0L2VzbS9zcGlubmVyLWNvbmZpZ3MtY2Q3ODQ1YWYuanMiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AaW9uaWMvY29yZS9kaXN0L2VzbS90aGVtZS1mZjNmYzUyZi5qcyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb3JlL2hlbHBlcnMvYXJyYXktaGVscGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGMgYXMgd3JpdGVUYXNrIH0gZnJvbSAnLi9pbmRleC03YThiN2ExYy5qcyc7XG5pbXBvcnQgeyBoIGFzIGhhcHRpY1NlbGVjdGlvbkVuZCwgYSBhcyBoYXB0aWNTZWxlY3Rpb25TdGFydCwgYiBhcyBoYXB0aWNTZWxlY3Rpb25DaGFuZ2VkIH0gZnJvbSAnLi9oYXB0aWMtMjdiM2Y5ODEuanMnO1xuaW1wb3J0IHsgY3JlYXRlR2VzdHVyZSB9IGZyb20gJy4vaW5kZXgtMzRjYjI3NDMuanMnO1xuXG5jb25zdCBjcmVhdGVCdXR0b25BY3RpdmVHZXN0dXJlID0gKGVsLCBpc0J1dHRvbikgPT4ge1xuICBsZXQgY3VycmVudFRvdWNoZWRCdXR0b247XG4gIGxldCBpbml0aWFsVG91Y2hlZEJ1dHRvbjtcbiAgY29uc3QgYWN0aXZhdGVCdXR0b25BdFBvaW50ID0gKHgsIHksIGhhcHRpY0ZlZWRiYWNrRm4pID0+IHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpO1xuICAgIGlmICghdGFyZ2V0IHx8ICFpc0J1dHRvbih0YXJnZXQpKSB7XG4gICAgICBjbGVhckFjdGl2ZUJ1dHRvbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ICE9PSBjdXJyZW50VG91Y2hlZEJ1dHRvbikge1xuICAgICAgY2xlYXJBY3RpdmVCdXR0b24oKTtcbiAgICAgIHNldEFjdGl2ZUJ1dHRvbih0YXJnZXQsIGhhcHRpY0ZlZWRiYWNrRm4pO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgc2V0QWN0aXZlQnV0dG9uID0gKGJ1dHRvbiwgaGFwdGljRmVlZGJhY2tGbikgPT4ge1xuICAgIGN1cnJlbnRUb3VjaGVkQnV0dG9uID0gYnV0dG9uO1xuICAgIGlmICghaW5pdGlhbFRvdWNoZWRCdXR0b24pIHtcbiAgICAgIGluaXRpYWxUb3VjaGVkQnV0dG9uID0gY3VycmVudFRvdWNoZWRCdXR0b247XG4gICAgfVxuICAgIGNvbnN0IGJ1dHRvblRvTW9kaWZ5ID0gY3VycmVudFRvdWNoZWRCdXR0b247XG4gICAgd3JpdGVUYXNrKCgpID0+IGJ1dHRvblRvTW9kaWZ5LmNsYXNzTGlzdC5hZGQoJ2lvbi1hY3RpdmF0ZWQnKSk7XG4gICAgaGFwdGljRmVlZGJhY2tGbigpO1xuICB9O1xuICBjb25zdCBjbGVhckFjdGl2ZUJ1dHRvbiA9IChkaXNwYXRjaENsaWNrID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIWN1cnJlbnRUb3VjaGVkQnV0dG9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJ1dHRvblRvTW9kaWZ5ID0gY3VycmVudFRvdWNoZWRCdXR0b247XG4gICAgd3JpdGVUYXNrKCgpID0+IGJ1dHRvblRvTW9kaWZ5LmNsYXNzTGlzdC5yZW1vdmUoJ2lvbi1hY3RpdmF0ZWQnKSk7XG4gICAgLyoqXG4gICAgICogQ2xpY2tpbmcgb24gb25lIGJ1dHRvbiwgYnV0IHJlbGVhc2luZyBvbiBhbm90aGVyIGJ1dHRvblxuICAgICAqIGRvZXMgbm90IGRpc3BhdGNoIGEgY2xpY2sgZXZlbnQgaW4gYnJvd3NlcnMsIHNvIHdlXG4gICAgICogbmVlZCB0byBkbyBpdCBtYW51YWxseSBoZXJlLiBTb21lIGJyb3dzZXJzIHdpbGxcbiAgICAgKiBkaXNwYXRjaCBhIGNsaWNrIGlmIGNsaWNraW5nIG9uIG9uZSBidXR0b24sIGRyYWdnaW5nIG92ZXJcbiAgICAgKiBhbm90aGVyIGJ1dHRvbiwgYW5kIHJlbGVhc2luZyBvbiB0aGUgb3JpZ2luYWwgYnV0dG9uLiBJbiB0aGF0XG4gICAgICogY2FzZSwgd2UgbmVlZCB0byBtYWtlIHN1cmUgd2UgZG8gbm90IGNhdXNlIGEgZG91YmxlIGNsaWNrIHRoZXJlLlxuICAgICAqL1xuICAgIGlmIChkaXNwYXRjaENsaWNrICYmIGluaXRpYWxUb3VjaGVkQnV0dG9uICE9PSBjdXJyZW50VG91Y2hlZEJ1dHRvbikge1xuICAgICAgY3VycmVudFRvdWNoZWRCdXR0b24uY2xpY2soKTtcbiAgICB9XG4gICAgY3VycmVudFRvdWNoZWRCdXR0b24gPSB1bmRlZmluZWQ7XG4gIH07XG4gIHJldHVybiBjcmVhdGVHZXN0dXJlKHtcbiAgICBlbCxcbiAgICBnZXN0dXJlTmFtZTogJ2J1dHRvbkFjdGl2ZURyYWcnLFxuICAgIHRocmVzaG9sZDogMCxcbiAgICBvblN0YXJ0OiBldiA9PiBhY3RpdmF0ZUJ1dHRvbkF0UG9pbnQoZXYuY3VycmVudFgsIGV2LmN1cnJlbnRZLCBoYXB0aWNTZWxlY3Rpb25TdGFydCksXG4gICAgb25Nb3ZlOiBldiA9PiBhY3RpdmF0ZUJ1dHRvbkF0UG9pbnQoZXYuY3VycmVudFgsIGV2LmN1cnJlbnRZLCBoYXB0aWNTZWxlY3Rpb25DaGFuZ2VkKSxcbiAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgY2xlYXJBY3RpdmVCdXR0b24odHJ1ZSk7XG4gICAgICBoYXB0aWNTZWxlY3Rpb25FbmQoKTtcbiAgICAgIGluaXRpYWxUb3VjaGVkQnV0dG9uID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVCdXR0b25BY3RpdmVHZXN0dXJlIGFzIGMgfTtcbiIsImltcG9ydCB7IGMgYXMgY29tcG9uZW50T25SZWFkeSB9IGZyb20gJy4vaGVscGVycy1kZDdlNGI3Yi5qcyc7XG5cbmNvbnN0IGF0dGFjaENvbXBvbmVudCA9IGFzeW5jIChkZWxlZ2F0ZSwgY29udGFpbmVyLCBjb21wb25lbnQsIGNzc0NsYXNzZXMsIGNvbXBvbmVudFByb3BzKSA9PiB7XG4gIGlmIChkZWxlZ2F0ZSkge1xuICAgIHJldHVybiBkZWxlZ2F0ZS5hdHRhY2hWaWV3VG9Eb20oY29udGFpbmVyLCBjb21wb25lbnQsIGNvbXBvbmVudFByb3BzLCBjc3NDbGFzc2VzKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbXBvbmVudCAhPT0gJ3N0cmluZycgJiYgIShjb21wb25lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZyYW1ld29yayBkZWxlZ2F0ZSBpcyBtaXNzaW5nJyk7XG4gIH1cbiAgY29uc3QgZWwgPSAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpXG4gICAgPyBjb250YWluZXIub3duZXJEb2N1bWVudCAmJiBjb250YWluZXIub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudClcbiAgICA6IGNvbXBvbmVudDtcbiAgaWYgKGNzc0NsYXNzZXMpIHtcbiAgICBjc3NDbGFzc2VzLmZvckVhY2goYyA9PiBlbC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgfVxuICBpZiAoY29tcG9uZW50UHJvcHMpIHtcbiAgICBPYmplY3QuYXNzaWduKGVsLCBjb21wb25lbnRQcm9wcyk7XG4gIH1cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVsKTtcbiAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBjb21wb25lbnRPblJlYWR5KGVsLCByZXNvbHZlKSk7XG4gIHJldHVybiBlbDtcbn07XG5jb25zdCBkZXRhY2hDb21wb25lbnQgPSAoZGVsZWdhdGUsIGVsZW1lbnQpID0+IHtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIHJldHVybiBkZWxlZ2F0ZS5yZW1vdmVWaWV3RnJvbURvbShjb250YWluZXIsIGVsZW1lbnQpO1xuICAgIH1cbiAgICBlbGVtZW50LnJlbW92ZSgpO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cbmV4cG9ydCB7IGF0dGFjaENvbXBvbmVudCBhcyBhLCBkZXRhY2hDb21wb25lbnQgYXMgZCB9O1xuIiwiY29uc3QgSGFwdGljRW5naW5lID0ge1xuICBnZXRFbmdpbmUoKSB7XG4gICAgY29uc3Qgd2luID0gd2luZG93O1xuICAgIHJldHVybiAod2luLlRhcHRpY0VuZ2luZSkgfHwgKHdpbi5DYXBhY2l0b3IgJiYgd2luLkNhcGFjaXRvci5pc1BsdWdpbkF2YWlsYWJsZSgnSGFwdGljcycpICYmIHdpbi5DYXBhY2l0b3IuUGx1Z2lucy5IYXB0aWNzKTtcbiAgfSxcbiAgYXZhaWxhYmxlKCkge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0RW5naW5lKCk7XG4gIH0sXG4gIGlzQ29yZG92YSgpIHtcbiAgICByZXR1cm4gISF3aW5kb3cuVGFwdGljRW5naW5lO1xuICB9LFxuICBpc0NhcGFjaXRvcigpIHtcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XG4gICAgcmV0dXJuICEhd2luLkNhcGFjaXRvcjtcbiAgfSxcbiAgaW1wYWN0KG9wdGlvbnMpIHtcbiAgICBjb25zdCBlbmdpbmUgPSB0aGlzLmdldEVuZ2luZSgpO1xuICAgIGlmICghZW5naW5lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5pc0NhcGFjaXRvcigpID8gb3B0aW9ucy5zdHlsZS50b1VwcGVyQ2FzZSgpIDogb3B0aW9ucy5zdHlsZTtcbiAgICBlbmdpbmUuaW1wYWN0KHsgc3R5bGUgfSk7XG4gIH0sXG4gIG5vdGlmaWNhdGlvbihvcHRpb25zKSB7XG4gICAgY29uc3QgZW5naW5lID0gdGhpcy5nZXRFbmdpbmUoKTtcbiAgICBpZiAoIWVuZ2luZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuaXNDYXBhY2l0b3IoKSA/IG9wdGlvbnMuc3R5bGUudG9VcHBlckNhc2UoKSA6IG9wdGlvbnMuc3R5bGU7XG4gICAgZW5naW5lLm5vdGlmaWNhdGlvbih7IHN0eWxlIH0pO1xuICB9LFxuICBzZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5pbXBhY3QoeyBzdHlsZTogJ2xpZ2h0JyB9KTtcbiAgfSxcbiAgc2VsZWN0aW9uU3RhcnQoKSB7XG4gICAgY29uc3QgZW5naW5lID0gdGhpcy5nZXRFbmdpbmUoKTtcbiAgICBpZiAoIWVuZ2luZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0NhcGFjaXRvcigpKSB7XG4gICAgICBlbmdpbmUuc2VsZWN0aW9uU3RhcnQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbmdpbmUuZ2VzdHVyZVNlbGVjdGlvblN0YXJ0KCk7XG4gICAgfVxuICB9LFxuICBzZWxlY3Rpb25DaGFuZ2VkKCkge1xuICAgIGNvbnN0IGVuZ2luZSA9IHRoaXMuZ2V0RW5naW5lKCk7XG4gICAgaWYgKCFlbmdpbmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNDYXBhY2l0b3IoKSkge1xuICAgICAgZW5naW5lLnNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbmdpbmUuZ2VzdHVyZVNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICB9XG4gIH0sXG4gIHNlbGVjdGlvbkVuZCgpIHtcbiAgICBjb25zdCBlbmdpbmUgPSB0aGlzLmdldEVuZ2luZSgpO1xuICAgIGlmICghZW5naW5lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQ2FwYWNpdG9yKCkpIHtcbiAgICAgIGVuZ2luZS5zZWxlY3Rpb25FbmQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbmdpbmUuZ2VzdHVyZVNlbGVjdGlvbkVuZCgpO1xuICAgIH1cbiAgfVxufTtcbi8qKlxuICogVHJpZ2dlciBhIHNlbGVjdGlvbiBjaGFuZ2VkIGhhcHRpYyBldmVudC4gR29vZCBmb3Igb25lLXRpbWUgZXZlbnRzXG4gKiAobm90IGZvciBnZXN0dXJlcylcbiAqL1xuY29uc3QgaGFwdGljU2VsZWN0aW9uID0gKCkgPT4ge1xuICBIYXB0aWNFbmdpbmUuc2VsZWN0aW9uKCk7XG59O1xuLyoqXG4gKiBUZWxsIHRoZSBoYXB0aWMgZW5naW5lIHRoYXQgYSBnZXN0dXJlIGZvciBhIHNlbGVjdGlvbiBjaGFuZ2UgaXMgc3RhcnRpbmcuXG4gKi9cbmNvbnN0IGhhcHRpY1NlbGVjdGlvblN0YXJ0ID0gKCkgPT4ge1xuICBIYXB0aWNFbmdpbmUuc2VsZWN0aW9uU3RhcnQoKTtcbn07XG4vKipcbiAqIFRlbGwgdGhlIGhhcHRpYyBlbmdpbmUgdGhhdCBhIHNlbGVjdGlvbiBjaGFuZ2VkIGR1cmluZyBhIGdlc3R1cmUuXG4gKi9cbmNvbnN0IGhhcHRpY1NlbGVjdGlvbkNoYW5nZWQgPSAoKSA9PiB7XG4gIEhhcHRpY0VuZ2luZS5zZWxlY3Rpb25DaGFuZ2VkKCk7XG59O1xuLyoqXG4gKiBUZWxsIHRoZSBoYXB0aWMgZW5naW5lIHdlIGFyZSBkb25lIHdpdGggYSBnZXN0dXJlLiBUaGlzIG5lZWRzIHRvIGJlXG4gKiBjYWxsZWQgbGVzdCByZXNvdXJjZXMgYXJlIG5vdCBwcm9wZXJseSByZWN5Y2xlZC5cbiAqL1xuY29uc3QgaGFwdGljU2VsZWN0aW9uRW5kID0gKCkgPT4ge1xuICBIYXB0aWNFbmdpbmUuc2VsZWN0aW9uRW5kKCk7XG59O1xuLyoqXG4gKiBVc2UgdGhpcyB0byBpbmRpY2F0ZSBzdWNjZXNzL2ZhaWx1cmUvd2FybmluZyB0byB0aGUgdXNlci5cbiAqIG9wdGlvbnMgc2hvdWxkIGJlIG9mIHRoZSB0eXBlIGB7IHN0eWxlOiAnbGlnaHQnIH1gIChvciBgbWVkaXVtYC9gaGVhdnlgKVxuICovXG5jb25zdCBoYXB0aWNJbXBhY3QgPSAob3B0aW9ucykgPT4ge1xuICBIYXB0aWNFbmdpbmUuaW1wYWN0KG9wdGlvbnMpO1xufTtcblxuZXhwb3J0IHsgaGFwdGljU2VsZWN0aW9uU3RhcnQgYXMgYSwgaGFwdGljU2VsZWN0aW9uQ2hhbmdlZCBhcyBiLCBoYXB0aWNTZWxlY3Rpb24gYXMgYywgaGFwdGljSW1wYWN0IGFzIGQsIGhhcHRpY1NlbGVjdGlvbkVuZCBhcyBoIH07XG4iLCJjb25zdCBzcGlubmVycyA9IHtcbiAgJ2J1YmJsZXMnOiB7XG4gICAgZHVyOiAxMDAwLFxuICAgIGNpcmNsZXM6IDksXG4gICAgZm46IChkdXIsIGluZGV4LCB0b3RhbCkgPT4ge1xuICAgICAgY29uc3QgYW5pbWF0aW9uRGVsYXkgPSBgJHsoZHVyICogaW5kZXggLyB0b3RhbCkgLSBkdXJ9bXNgO1xuICAgICAgY29uc3QgYW5nbGUgPSAyICogTWF0aC5QSSAqIGluZGV4IC8gdG90YWw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiA1LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICd0b3AnOiBgJHs5ICogTWF0aC5zaW4oYW5nbGUpfXB4YCxcbiAgICAgICAgICAnbGVmdCc6IGAkezkgKiBNYXRoLmNvcyhhbmdsZSl9cHhgLFxuICAgICAgICAgICdhbmltYXRpb24tZGVsYXknOiBhbmltYXRpb25EZWxheSxcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gICdjaXJjbGVzJzoge1xuICAgIGR1cjogMTAwMCxcbiAgICBjaXJjbGVzOiA4LFxuICAgIGZuOiAoZHVyLCBpbmRleCwgdG90YWwpID0+IHtcbiAgICAgIGNvbnN0IHN0ZXAgPSBpbmRleCAvIHRvdGFsO1xuICAgICAgY29uc3QgYW5pbWF0aW9uRGVsYXkgPSBgJHsoZHVyICogc3RlcCkgLSBkdXJ9bXNgO1xuICAgICAgY29uc3QgYW5nbGUgPSAyICogTWF0aC5QSSAqIHN0ZXA7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiA1LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICd0b3AnOiBgJHs5ICogTWF0aC5zaW4oYW5nbGUpfXB4YCxcbiAgICAgICAgICAnbGVmdCc6IGAkezkgKiBNYXRoLmNvcyhhbmdsZSl9cHhgLFxuICAgICAgICAgICdhbmltYXRpb24tZGVsYXknOiBhbmltYXRpb25EZWxheSxcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gICdjaXJjdWxhcic6IHtcbiAgICBkdXI6IDE0MDAsXG4gICAgZWxtRHVyYXRpb246IHRydWUsXG4gICAgY2lyY2xlczogMSxcbiAgICBmbjogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogMjAsXG4gICAgICAgIGN4OiA0OCxcbiAgICAgICAgY3k6IDQ4LFxuICAgICAgICBmaWxsOiAnbm9uZScsXG4gICAgICAgIHZpZXdCb3g6ICcyNCAyNCA0OCA0OCcsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLDApJyxcbiAgICAgICAgc3R5bGU6IHt9XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgJ2NyZXNjZW50Jzoge1xuICAgIGR1cjogNzUwLFxuICAgIGNpcmNsZXM6IDEsXG4gICAgZm46ICgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IDI2LFxuICAgICAgICBzdHlsZToge31cbiAgICAgIH07XG4gICAgfVxuICB9LFxuICAnZG90cyc6IHtcbiAgICBkdXI6IDc1MCxcbiAgICBjaXJjbGVzOiAzLFxuICAgIGZuOiAoXywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbkRlbGF5ID0gLSgxMTAgKiBpbmRleCkgKyAnbXMnO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogNixcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAnbGVmdCc6IGAkezkgLSAoOSAqIGluZGV4KX1weGAsXG4gICAgICAgICAgJ2FuaW1hdGlvbi1kZWxheSc6IGFuaW1hdGlvbkRlbGF5LFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgJ2xpbmVzJzoge1xuICAgIGR1cjogMTAwMCxcbiAgICBsaW5lczogMTIsXG4gICAgZm46IChkdXIsIGluZGV4LCB0b3RhbCkgPT4ge1xuICAgICAgY29uc3QgdHJhbnNmb3JtID0gYHJvdGF0ZSgkezMwICogaW5kZXggKyAoaW5kZXggPCA2ID8gMTgwIDogLTE4MCl9ZGVnKWA7XG4gICAgICBjb25zdCBhbmltYXRpb25EZWxheSA9IGAkeyhkdXIgKiBpbmRleCAvIHRvdGFsKSAtIGR1cn1tc2A7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB5MTogMTcsXG4gICAgICAgIHkyOiAyOSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAndHJhbnNmb3JtJzogdHJhbnNmb3JtLFxuICAgICAgICAgICdhbmltYXRpb24tZGVsYXknOiBhbmltYXRpb25EZWxheSxcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gICdsaW5lcy1zbWFsbCc6IHtcbiAgICBkdXI6IDEwMDAsXG4gICAgbGluZXM6IDEyLFxuICAgIGZuOiAoZHVyLCBpbmRleCwgdG90YWwpID0+IHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGByb3RhdGUoJHszMCAqIGluZGV4ICsgKGluZGV4IDwgNiA/IDE4MCA6IC0xODApfWRlZylgO1xuICAgICAgY29uc3QgYW5pbWF0aW9uRGVsYXkgPSBgJHsoZHVyICogaW5kZXggLyB0b3RhbCkgLSBkdXJ9bXNgO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeTE6IDEyLFxuICAgICAgICB5MjogMjAsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgJ3RyYW5zZm9ybSc6IHRyYW5zZm9ybSxcbiAgICAgICAgICAnYW5pbWF0aW9uLWRlbGF5JzogYW5pbWF0aW9uRGVsYXksXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9XG59O1xuY29uc3QgU1BJTk5FUlMgPSBzcGlubmVycztcblxuZXhwb3J0IHsgU1BJTk5FUlMgYXMgUyB9O1xuIiwiY29uc3QgaG9zdENvbnRleHQgPSAoc2VsZWN0b3IsIGVsKSA9PiB7XG4gIHJldHVybiBlbC5jbG9zZXN0KHNlbGVjdG9yKSAhPT0gbnVsbDtcbn07XG4vKipcbiAqIENyZWF0ZSB0aGUgbW9kZSBhbmQgY29sb3IgY2xhc3NlcyBmb3IgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgY2xhc3NlcyBwYXNzZWQgaW5cbiAqL1xuY29uc3QgY3JlYXRlQ29sb3JDbGFzc2VzID0gKGNvbG9yLCBjc3NDbGFzc01hcCkgPT4ge1xuICByZXR1cm4gKHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycgJiYgY29sb3IubGVuZ3RoID4gMCkgPyBPYmplY3QuYXNzaWduKHsgJ2lvbi1jb2xvcic6IHRydWUsIFtgaW9uLWNvbG9yLSR7Y29sb3J9YF06IHRydWUgfSwgY3NzQ2xhc3NNYXApIDogY3NzQ2xhc3NNYXA7XG59O1xuY29uc3QgZ2V0Q2xhc3NMaXN0ID0gKGNsYXNzZXMpID0+IHtcbiAgaWYgKGNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGFycmF5ID0gQXJyYXkuaXNBcnJheShjbGFzc2VzKSA/IGNsYXNzZXMgOiBjbGFzc2VzLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIGFycmF5XG4gICAgICAuZmlsdGVyKGMgPT4gYyAhPSBudWxsKVxuICAgICAgLm1hcChjID0+IGMudHJpbSgpKVxuICAgICAgLmZpbHRlcihjID0+IGMgIT09ICcnKTtcbiAgfVxuICByZXR1cm4gW107XG59O1xuY29uc3QgZ2V0Q2xhc3NNYXAgPSAoY2xhc3NlcykgPT4ge1xuICBjb25zdCBtYXAgPSB7fTtcbiAgZ2V0Q2xhc3NMaXN0KGNsYXNzZXMpLmZvckVhY2goYyA9PiBtYXBbY10gPSB0cnVlKTtcbiAgcmV0dXJuIG1hcDtcbn07XG5jb25zdCBTQ0hFTUUgPSAvXlthLXpdW2EtejAtOStcXC0uXSo6LztcbmNvbnN0IG9wZW5VUkwgPSBhc3luYyAodXJsLCBldiwgZGlyZWN0aW9uLCBhbmltYXRpb24pID0+IHtcbiAgaWYgKHVybCAhPSBudWxsICYmIHVybFswXSAhPT0gJyMnICYmICFTQ0hFTUUudGVzdCh1cmwpKSB7XG4gICAgY29uc3Qgcm91dGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW9uLXJvdXRlcicpO1xuICAgIGlmIChyb3V0ZXIpIHtcbiAgICAgIGlmIChldiAhPSBudWxsKSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcm91dGVyLnB1c2godXJsLCBkaXJlY3Rpb24sIGFuaW1hdGlvbik7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZUNvbG9yQ2xhc3NlcyBhcyBjLCBnZXRDbGFzc01hcCBhcyBnLCBob3N0Q29udGV4dCBhcyBoLCBvcGVuVVJMIGFzIG8gfTtcbiIsImV4cG9ydCBjbGFzcyBBcnJheUhlbHBlciB7XHJcbiAgc3RhdGljIGxpZnRUb0FycmF5PFQ+KGl0ZW06IFQgfCBUW10pIHtcclxuICAgIGlmIChpdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9IGVsc2UgaWYgKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIFtpdGVtXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBhcnJheSBBcnJheVxyXG4gICAqIEBwYXJhbSBmcm9tSW5kZXggUmVvcmRlciBpdGVtIGZyb20gaW5kZXhcclxuICAgKiBAcGFyYW0gdG9JbmRleCBSZW9yZGVyIGl0ZW0gdG8gaW5kZXhcclxuICAgKiBAcmV0dXJucyBOZXcgcmVvcmRlcmVkIGFycmF5XHJcbiAgICovXHJcbiAgc3RhdGljIHJlb3JkZXJMaXN0PFQ+KFxyXG4gICAgYXJyYXk6IEFycmF5PFQ+LFxyXG4gICAgZnJvbUluZGV4OiBudW1iZXIsXHJcbiAgICB0b0luZGV4OiBudW1iZXJcclxuICApOiBBcnJheTxUPiB7XHJcbiAgICBpZiAoIWFycmF5IHx8IGFycmF5Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhcnJheUNvcHkgPSBbLi4uYXJyYXldO1xyXG4gICAgYXJyYXlDb3B5LnNwbGljZSh0b0luZGV4LCAwLCBhcnJheUNvcHkuc3BsaWNlKGZyb21JbmRleCwgMSlbMF0pO1xyXG4gICAgcmV0dXJuIGFycmF5Q29weTtcclxuICB9XHJcbn1cclxuIl19