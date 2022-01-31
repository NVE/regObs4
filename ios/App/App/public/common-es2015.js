"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["common"],{

/***/ 80631:
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/button-active-d4bd4f74.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": function() { return /* binding */ createButtonActiveGesture; }
/* harmony export */ });
/* harmony import */ var _index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-7a8b7a1c.js */ 76842);
/* harmony import */ var _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./haptic-27b3f981.js */ 99502);
/* harmony import */ var _index_34cb2743_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-34cb2743.js */ 88910);




const createButtonActiveGesture = (el, isButton) => {
  let currentTouchedButton;
  let initialTouchedButton;
  const activateButtonAtPoint = (x, y, hapticFeedbackFn) => {
    if (typeof document === 'undefined') {
      return;
    }
    const target = document.elementFromPoint(x, y);
    if (!target || !isButton(target)) {
      clearActiveButton();
      return;
    }
    if (target !== currentTouchedButton) {
      clearActiveButton();
      setActiveButton(target, hapticFeedbackFn);
    }
  };
  const setActiveButton = (button, hapticFeedbackFn) => {
    currentTouchedButton = button;
    if (!initialTouchedButton) {
      initialTouchedButton = currentTouchedButton;
    }
    const buttonToModify = currentTouchedButton;
    (0,_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__.c)(() => buttonToModify.classList.add('ion-activated'));
    hapticFeedbackFn();
  };
  const clearActiveButton = (dispatchClick = false) => {
    if (!currentTouchedButton) {
      return;
    }
    const buttonToModify = currentTouchedButton;
    (0,_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__.c)(() => buttonToModify.classList.remove('ion-activated'));
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
  return (0,_index_34cb2743_js__WEBPACK_IMPORTED_MODULE_2__.createGesture)({
    el,
    gestureName: 'buttonActiveDrag',
    threshold: 0,
    onStart: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__.a),
    onMove: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__.b),
    onEnd: () => {
      clearActiveButton(true);
      (0,_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__.h)();
      initialTouchedButton = undefined;
    }
  });
};




/***/ }),

/***/ 85356:
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/framework-delegate-4392cd63.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": function() { return /* binding */ attachComponent; },
/* harmony export */   "d": function() { return /* binding */ detachComponent; }
/* harmony export */ });
/* harmony import */ var C_Repos_regobs_regObs4_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 80151);
/* harmony import */ var _helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers-dd7e4b7b.js */ 40693);



const attachComponent = /*#__PURE__*/function () {
  var _ref = (0,C_Repos_regobs_regObs4_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* (delegate, container, component, cssClasses, componentProps) {
    if (delegate) {
      return delegate.attachViewToDom(container, component, componentProps, cssClasses);
    }

    if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
      throw new Error('framework delegate is missing');
    }

    const el = typeof component === 'string' ? container.ownerDocument && container.ownerDocument.createElement(component) : component;

    if (cssClasses) {
      cssClasses.forEach(c => el.classList.add(c));
    }

    if (componentProps) {
      Object.assign(el, componentProps);
    }

    container.appendChild(el);
    yield new Promise(resolve => (0,_helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_1__.c)(el, resolve));
    return el;
  });

  return function attachComponent(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

const detachComponent = (delegate, element) => {
  if (element) {
    if (delegate) {
      const container = element.parentElement;
      return delegate.removeViewFromDom(container, element);
    }

    element.remove();
  }

  return Promise.resolve();
};



/***/ }),

/***/ 99502:
/*!**************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/haptic-27b3f981.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": function() { return /* binding */ hapticSelectionStart; },
/* harmony export */   "b": function() { return /* binding */ hapticSelectionChanged; },
/* harmony export */   "c": function() { return /* binding */ hapticSelection; },
/* harmony export */   "d": function() { return /* binding */ hapticImpact; },
/* harmony export */   "h": function() { return /* binding */ hapticSelectionEnd; }
/* harmony export */ });
const HapticEngine = {
  getEngine() {
    const win = window;
    return (win.TapticEngine) || (win.Capacitor && win.Capacitor.isPluginAvailable('Haptics') && win.Capacitor.Plugins.Haptics);
  },
  available() {
    return !!this.getEngine();
  },
  isCordova() {
    return !!window.TapticEngine;
  },
  isCapacitor() {
    const win = window;
    return !!win.Capacitor;
  },
  impact(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
    engine.impact({ style });
  },
  notification(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
    engine.notification({ style });
  },
  selection() {
    this.impact({ style: 'light' });
  },
  selectionStart() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionStart();
    }
    else {
      engine.gestureSelectionStart();
    }
  },
  selectionChanged() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionChanged();
    }
    else {
      engine.gestureSelectionChanged();
    }
  },
  selectionEnd() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionEnd();
    }
    else {
      engine.gestureSelectionEnd();
    }
  }
};
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
const hapticSelection = () => {
  HapticEngine.selection();
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
const hapticSelectionStart = () => {
  HapticEngine.selectionStart();
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
const hapticSelectionChanged = () => {
  HapticEngine.selectionChanged();
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
const hapticSelectionEnd = () => {
  HapticEngine.selectionEnd();
};
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
 */
const hapticImpact = (options) => {
  HapticEngine.impact(options);
};




/***/ }),

/***/ 15907:
/*!***********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/spinner-configs-cd7845af.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": function() { return /* binding */ SPINNERS; }
/* harmony export */ });
const spinners = {
  'bubbles': {
    dur: 1000,
    circles: 9,
    fn: (dur, index, total) => {
      const animationDelay = `${(dur * index / total) - dur}ms`;
      const angle = 2 * Math.PI * index / total;
      return {
        r: 5,
        style: {
          'top': `${9 * Math.sin(angle)}px`,
          'left': `${9 * Math.cos(angle)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'circles': {
    dur: 1000,
    circles: 8,
    fn: (dur, index, total) => {
      const step = index / total;
      const animationDelay = `${(dur * step) - dur}ms`;
      const angle = 2 * Math.PI * step;
      return {
        r: 5,
        style: {
          'top': `${9 * Math.sin(angle)}px`,
          'left': `${9 * Math.cos(angle)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'circular': {
    dur: 1400,
    elmDuration: true,
    circles: 1,
    fn: () => {
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
    fn: () => {
      return {
        r: 26,
        style: {}
      };
    }
  },
  'dots': {
    dur: 750,
    circles: 3,
    fn: (_, index) => {
      const animationDelay = -(110 * index) + 'ms';
      return {
        r: 6,
        style: {
          'left': `${9 - (9 * index)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'lines': {
    dur: 1000,
    lines: 12,
    fn: (dur, index, total) => {
      const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
      const animationDelay = `${(dur * index / total) - dur}ms`;
      return {
        y1: 17,
        y2: 29,
        style: {
          'transform': transform,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'lines-small': {
    dur: 1000,
    lines: 12,
    fn: (dur, index, total) => {
      const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
      const animationDelay = `${(dur * index / total) - dur}ms`;
      return {
        y1: 12,
        y2: 20,
        style: {
          'transform': transform,
          'animation-delay': animationDelay,
        }
      };
    }
  }
};
const SPINNERS = spinners;




/***/ }),

/***/ 43784:
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/theme-ff3fc52f.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": function() { return /* binding */ createColorClasses; },
/* harmony export */   "g": function() { return /* binding */ getClassMap; },
/* harmony export */   "h": function() { return /* binding */ hostContext; },
/* harmony export */   "o": function() { return /* binding */ openURL; }
/* harmony export */ });
/* harmony import */ var C_Repos_regobs_regObs4_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 80151);


const hostContext = (selector, el) => {
  return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */


const createColorClasses = (color, cssClassMap) => {
  return typeof color === 'string' && color.length > 0 ? Object.assign({
    'ion-color': true,
    [`ion-color-${color}`]: true
  }, cssClassMap) : cssClassMap;
};

const getClassList = classes => {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ');
    return array.filter(c => c != null).map(c => c.trim()).filter(c => c !== '');
  }

  return [];
};

const getClassMap = classes => {
  const map = {};
  getClassList(classes).forEach(c => map[c] = true);
  return map;
};

const SCHEME = /^[a-z][a-z0-9+\-.]*:/;

const openURL = /*#__PURE__*/function () {
  var _ref = (0,C_Repos_regobs_regObs4_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* (url, ev, direction, animation) {
    if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
      const router = document.querySelector('ion-router');

      if (router) {
        if (ev != null) {
          ev.preventDefault();
        }

        return router.push(url, direction, animation);
      }
    }

    return false;
  });

  return function openURL(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();



/***/ }),

/***/ 99020:
/*!**********************************************!*\
  !*** ./src/app/core/helpers/array-helper.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayHelper": function() { return /* binding */ ArrayHelper; }
/* harmony export */ });
class ArrayHelper {
    static liftToArray(item) {
        if (item instanceof Array) {
            return item;
        }
        else if (item) {
            return [item];
        }
        else {
            return [];
        }
    }
    /**
     * @param array Array
     * @param fromIndex Reorder item from index
     * @param toIndex Reorder item to index
     * @returns New reordered array
     */
    static reorderList(array, fromIndex, toIndex) {
        if (!array || array.length === 0) {
            return array;
        }
        const arrayCopy = [...array];
        arrayCopy.splice(toIndex, 0, arrayCopy.splice(fromIndex, 1)[0]);
        return arrayCopy;
    }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7O0FDekJPLE1BQU0sV0FBVztJQUN0QixNQUFNLENBQUMsV0FBVyxDQUFJLElBQWE7UUFDakMsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUFJLElBQUksRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNmO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FDaEIsS0FBZSxFQUNmLFNBQWlCLEVBQ2pCLE9BQWU7UUFFZixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEUsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGIiwic291cmNlcyI6WyIuL25vZGVfbW9kdWxlcy9AaW9uaWMvY29yZS9kaXN0L2VzbS9idXR0b24tYWN0aXZlLWQ0YmQ0Zjc0LmpzIiwiLi9ub2RlX21vZHVsZXMvQGlvbmljL2NvcmUvZGlzdC9lc20vZnJhbWV3b3JrLWRlbGVnYXRlLTQzOTJjZDYzLmpzIiwiLi9ub2RlX21vZHVsZXMvQGlvbmljL2NvcmUvZGlzdC9lc20vaGFwdGljLTI3YjNmOTgxLmpzIiwiLi9ub2RlX21vZHVsZXMvQGlvbmljL2NvcmUvZGlzdC9lc20vc3Bpbm5lci1jb25maWdzLWNkNzg0NWFmLmpzIiwiLi9ub2RlX21vZHVsZXMvQGlvbmljL2NvcmUvZGlzdC9lc20vdGhlbWUtZmYzZmM1MmYuanMiLCIuL3NyYy9hcHAvY29yZS9oZWxwZXJzL2FycmF5LWhlbHBlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjIGFzIHdyaXRlVGFzayB9IGZyb20gJy4vaW5kZXgtN2E4YjdhMWMuanMnO1xuaW1wb3J0IHsgaCBhcyBoYXB0aWNTZWxlY3Rpb25FbmQsIGEgYXMgaGFwdGljU2VsZWN0aW9uU3RhcnQsIGIgYXMgaGFwdGljU2VsZWN0aW9uQ2hhbmdlZCB9IGZyb20gJy4vaGFwdGljLTI3YjNmOTgxLmpzJztcbmltcG9ydCB7IGNyZWF0ZUdlc3R1cmUgfSBmcm9tICcuL2luZGV4LTM0Y2IyNzQzLmpzJztcblxuY29uc3QgY3JlYXRlQnV0dG9uQWN0aXZlR2VzdHVyZSA9IChlbCwgaXNCdXR0b24pID0+IHtcbiAgbGV0IGN1cnJlbnRUb3VjaGVkQnV0dG9uO1xuICBsZXQgaW5pdGlhbFRvdWNoZWRCdXR0b247XG4gIGNvbnN0IGFjdGl2YXRlQnV0dG9uQXRQb2ludCA9ICh4LCB5LCBoYXB0aWNGZWVkYmFja0ZuKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNCdXR0b24odGFyZ2V0KSkge1xuICAgICAgY2xlYXJBY3RpdmVCdXR0b24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRhcmdldCAhPT0gY3VycmVudFRvdWNoZWRCdXR0b24pIHtcbiAgICAgIGNsZWFyQWN0aXZlQnV0dG9uKCk7XG4gICAgICBzZXRBY3RpdmVCdXR0b24odGFyZ2V0LCBoYXB0aWNGZWVkYmFja0ZuKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHNldEFjdGl2ZUJ1dHRvbiA9IChidXR0b24sIGhhcHRpY0ZlZWRiYWNrRm4pID0+IHtcbiAgICBjdXJyZW50VG91Y2hlZEJ1dHRvbiA9IGJ1dHRvbjtcbiAgICBpZiAoIWluaXRpYWxUb3VjaGVkQnV0dG9uKSB7XG4gICAgICBpbml0aWFsVG91Y2hlZEJ1dHRvbiA9IGN1cnJlbnRUb3VjaGVkQnV0dG9uO1xuICAgIH1cbiAgICBjb25zdCBidXR0b25Ub01vZGlmeSA9IGN1cnJlbnRUb3VjaGVkQnV0dG9uO1xuICAgIHdyaXRlVGFzaygoKSA9PiBidXR0b25Ub01vZGlmeS5jbGFzc0xpc3QuYWRkKCdpb24tYWN0aXZhdGVkJykpO1xuICAgIGhhcHRpY0ZlZWRiYWNrRm4oKTtcbiAgfTtcbiAgY29uc3QgY2xlYXJBY3RpdmVCdXR0b24gPSAoZGlzcGF0Y2hDbGljayA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCFjdXJyZW50VG91Y2hlZEJ1dHRvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBidXR0b25Ub01vZGlmeSA9IGN1cnJlbnRUb3VjaGVkQnV0dG9uO1xuICAgIHdyaXRlVGFzaygoKSA9PiBidXR0b25Ub01vZGlmeS5jbGFzc0xpc3QucmVtb3ZlKCdpb24tYWN0aXZhdGVkJykpO1xuICAgIC8qKlxuICAgICAqIENsaWNraW5nIG9uIG9uZSBidXR0b24sIGJ1dCByZWxlYXNpbmcgb24gYW5vdGhlciBidXR0b25cbiAgICAgKiBkb2VzIG5vdCBkaXNwYXRjaCBhIGNsaWNrIGV2ZW50IGluIGJyb3dzZXJzLCBzbyB3ZVxuICAgICAqIG5lZWQgdG8gZG8gaXQgbWFudWFsbHkgaGVyZS4gU29tZSBicm93c2VycyB3aWxsXG4gICAgICogZGlzcGF0Y2ggYSBjbGljayBpZiBjbGlja2luZyBvbiBvbmUgYnV0dG9uLCBkcmFnZ2luZyBvdmVyXG4gICAgICogYW5vdGhlciBidXR0b24sIGFuZCByZWxlYXNpbmcgb24gdGhlIG9yaWdpbmFsIGJ1dHRvbi4gSW4gdGhhdFxuICAgICAqIGNhc2UsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGRvIG5vdCBjYXVzZSBhIGRvdWJsZSBjbGljayB0aGVyZS5cbiAgICAgKi9cbiAgICBpZiAoZGlzcGF0Y2hDbGljayAmJiBpbml0aWFsVG91Y2hlZEJ1dHRvbiAhPT0gY3VycmVudFRvdWNoZWRCdXR0b24pIHtcbiAgICAgIGN1cnJlbnRUb3VjaGVkQnV0dG9uLmNsaWNrKCk7XG4gICAgfVxuICAgIGN1cnJlbnRUb3VjaGVkQnV0dG9uID0gdW5kZWZpbmVkO1xuICB9O1xuICByZXR1cm4gY3JlYXRlR2VzdHVyZSh7XG4gICAgZWwsXG4gICAgZ2VzdHVyZU5hbWU6ICdidXR0b25BY3RpdmVEcmFnJyxcbiAgICB0aHJlc2hvbGQ6IDAsXG4gICAgb25TdGFydDogZXYgPT4gYWN0aXZhdGVCdXR0b25BdFBvaW50KGV2LmN1cnJlbnRYLCBldi5jdXJyZW50WSwgaGFwdGljU2VsZWN0aW9uU3RhcnQpLFxuICAgIG9uTW92ZTogZXYgPT4gYWN0aXZhdGVCdXR0b25BdFBvaW50KGV2LmN1cnJlbnRYLCBldi5jdXJyZW50WSwgaGFwdGljU2VsZWN0aW9uQ2hhbmdlZCksXG4gICAgb25FbmQ6ICgpID0+IHtcbiAgICAgIGNsZWFyQWN0aXZlQnV0dG9uKHRydWUpO1xuICAgICAgaGFwdGljU2VsZWN0aW9uRW5kKCk7XG4gICAgICBpbml0aWFsVG91Y2hlZEJ1dHRvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlQnV0dG9uQWN0aXZlR2VzdHVyZSBhcyBjIH07XG4iLCJpbXBvcnQgeyBjIGFzIGNvbXBvbmVudE9uUmVhZHkgfSBmcm9tICcuL2hlbHBlcnMtZGQ3ZTRiN2IuanMnO1xuXG5jb25zdCBhdHRhY2hDb21wb25lbnQgPSBhc3luYyAoZGVsZWdhdGUsIGNvbnRhaW5lciwgY29tcG9uZW50LCBjc3NDbGFzc2VzLCBjb21wb25lbnRQcm9wcykgPT4ge1xuICBpZiAoZGVsZWdhdGUpIHtcbiAgICByZXR1cm4gZGVsZWdhdGUuYXR0YWNoVmlld1RvRG9tKGNvbnRhaW5lciwgY29tcG9uZW50LCBjb21wb25lbnRQcm9wcywgY3NzQ2xhc3Nlcyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnICYmICEoY29tcG9uZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmcmFtZXdvcmsgZGVsZWdhdGUgaXMgbWlzc2luZycpO1xuICB9XG4gIGNvbnN0IGVsID0gKHR5cGVvZiBjb21wb25lbnQgPT09ICdzdHJpbmcnKVxuICAgID8gY29udGFpbmVyLm93bmVyRG9jdW1lbnQgJiYgY29udGFpbmVyLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb21wb25lbnQpXG4gICAgOiBjb21wb25lbnQ7XG4gIGlmIChjc3NDbGFzc2VzKSB7XG4gICAgY3NzQ2xhc3Nlcy5mb3JFYWNoKGMgPT4gZWwuY2xhc3NMaXN0LmFkZChjKSk7XG4gIH1cbiAgaWYgKGNvbXBvbmVudFByb3BzKSB7XG4gICAgT2JqZWN0LmFzc2lnbihlbCwgY29tcG9uZW50UHJvcHMpO1xuICB9XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbCk7XG4gIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gY29tcG9uZW50T25SZWFkeShlbCwgcmVzb2x2ZSkpO1xuICByZXR1cm4gZWw7XG59O1xuY29uc3QgZGV0YWNoQ29tcG9uZW50ID0gKGRlbGVnYXRlLCBlbGVtZW50KSA9PiB7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICByZXR1cm4gZGVsZWdhdGUucmVtb3ZlVmlld0Zyb21Eb20oY29udGFpbmVyLCBlbGVtZW50KTtcbiAgICB9XG4gICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5leHBvcnQgeyBhdHRhY2hDb21wb25lbnQgYXMgYSwgZGV0YWNoQ29tcG9uZW50IGFzIGQgfTtcbiIsImNvbnN0IEhhcHRpY0VuZ2luZSA9IHtcbiAgZ2V0RW5naW5lKCkge1xuICAgIGNvbnN0IHdpbiA9IHdpbmRvdztcbiAgICByZXR1cm4gKHdpbi5UYXB0aWNFbmdpbmUpIHx8ICh3aW4uQ2FwYWNpdG9yICYmIHdpbi5DYXBhY2l0b3IuaXNQbHVnaW5BdmFpbGFibGUoJ0hhcHRpY3MnKSAmJiB3aW4uQ2FwYWNpdG9yLlBsdWdpbnMuSGFwdGljcyk7XG4gIH0sXG4gIGF2YWlsYWJsZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmdldEVuZ2luZSgpO1xuICB9LFxuICBpc0NvcmRvdmEoKSB7XG4gICAgcmV0dXJuICEhd2luZG93LlRhcHRpY0VuZ2luZTtcbiAgfSxcbiAgaXNDYXBhY2l0b3IoKSB7XG4gICAgY29uc3Qgd2luID0gd2luZG93O1xuICAgIHJldHVybiAhIXdpbi5DYXBhY2l0b3I7XG4gIH0sXG4gIGltcGFjdChvcHRpb25zKSB7XG4gICAgY29uc3QgZW5naW5lID0gdGhpcy5nZXRFbmdpbmUoKTtcbiAgICBpZiAoIWVuZ2luZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuaXNDYXBhY2l0b3IoKSA/IG9wdGlvbnMuc3R5bGUudG9VcHBlckNhc2UoKSA6IG9wdGlvbnMuc3R5bGU7XG4gICAgZW5naW5lLmltcGFjdCh7IHN0eWxlIH0pO1xuICB9LFxuICBub3RpZmljYXRpb24ob3B0aW9ucykge1xuICAgIGNvbnN0IGVuZ2luZSA9IHRoaXMuZ2V0RW5naW5lKCk7XG4gICAgaWYgKCFlbmdpbmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmlzQ2FwYWNpdG9yKCkgPyBvcHRpb25zLnN0eWxlLnRvVXBwZXJDYXNlKCkgOiBvcHRpb25zLnN0eWxlO1xuICAgIGVuZ2luZS5ub3RpZmljYXRpb24oeyBzdHlsZSB9KTtcbiAgfSxcbiAgc2VsZWN0aW9uKCkge1xuICAgIHRoaXMuaW1wYWN0KHsgc3R5bGU6ICdsaWdodCcgfSk7XG4gIH0sXG4gIHNlbGVjdGlvblN0YXJ0KCkge1xuICAgIGNvbnN0IGVuZ2luZSA9IHRoaXMuZ2V0RW5naW5lKCk7XG4gICAgaWYgKCFlbmdpbmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNDYXBhY2l0b3IoKSkge1xuICAgICAgZW5naW5lLnNlbGVjdGlvblN0YXJ0KCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW5naW5lLmdlc3R1cmVTZWxlY3Rpb25TdGFydCgpO1xuICAgIH1cbiAgfSxcbiAgc2VsZWN0aW9uQ2hhbmdlZCgpIHtcbiAgICBjb25zdCBlbmdpbmUgPSB0aGlzLmdldEVuZ2luZSgpO1xuICAgIGlmICghZW5naW5lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQ2FwYWNpdG9yKCkpIHtcbiAgICAgIGVuZ2luZS5zZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW5naW5lLmdlc3R1cmVTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgfVxuICB9LFxuICBzZWxlY3Rpb25FbmQoKSB7XG4gICAgY29uc3QgZW5naW5lID0gdGhpcy5nZXRFbmdpbmUoKTtcbiAgICBpZiAoIWVuZ2luZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0NhcGFjaXRvcigpKSB7XG4gICAgICBlbmdpbmUuc2VsZWN0aW9uRW5kKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW5naW5lLmdlc3R1cmVTZWxlY3Rpb25FbmQoKTtcbiAgICB9XG4gIH1cbn07XG4vKipcbiAqIFRyaWdnZXIgYSBzZWxlY3Rpb24gY2hhbmdlZCBoYXB0aWMgZXZlbnQuIEdvb2QgZm9yIG9uZS10aW1lIGV2ZW50c1xuICogKG5vdCBmb3IgZ2VzdHVyZXMpXG4gKi9cbmNvbnN0IGhhcHRpY1NlbGVjdGlvbiA9ICgpID0+IHtcbiAgSGFwdGljRW5naW5lLnNlbGVjdGlvbigpO1xufTtcbi8qKlxuICogVGVsbCB0aGUgaGFwdGljIGVuZ2luZSB0aGF0IGEgZ2VzdHVyZSBmb3IgYSBzZWxlY3Rpb24gY2hhbmdlIGlzIHN0YXJ0aW5nLlxuICovXG5jb25zdCBoYXB0aWNTZWxlY3Rpb25TdGFydCA9ICgpID0+IHtcbiAgSGFwdGljRW5naW5lLnNlbGVjdGlvblN0YXJ0KCk7XG59O1xuLyoqXG4gKiBUZWxsIHRoZSBoYXB0aWMgZW5naW5lIHRoYXQgYSBzZWxlY3Rpb24gY2hhbmdlZCBkdXJpbmcgYSBnZXN0dXJlLlxuICovXG5jb25zdCBoYXB0aWNTZWxlY3Rpb25DaGFuZ2VkID0gKCkgPT4ge1xuICBIYXB0aWNFbmdpbmUuc2VsZWN0aW9uQ2hhbmdlZCgpO1xufTtcbi8qKlxuICogVGVsbCB0aGUgaGFwdGljIGVuZ2luZSB3ZSBhcmUgZG9uZSB3aXRoIGEgZ2VzdHVyZS4gVGhpcyBuZWVkcyB0byBiZVxuICogY2FsbGVkIGxlc3QgcmVzb3VyY2VzIGFyZSBub3QgcHJvcGVybHkgcmVjeWNsZWQuXG4gKi9cbmNvbnN0IGhhcHRpY1NlbGVjdGlvbkVuZCA9ICgpID0+IHtcbiAgSGFwdGljRW5naW5lLnNlbGVjdGlvbkVuZCgpO1xufTtcbi8qKlxuICogVXNlIHRoaXMgdG8gaW5kaWNhdGUgc3VjY2Vzcy9mYWlsdXJlL3dhcm5pbmcgdG8gdGhlIHVzZXIuXG4gKiBvcHRpb25zIHNob3VsZCBiZSBvZiB0aGUgdHlwZSBgeyBzdHlsZTogJ2xpZ2h0JyB9YCAob3IgYG1lZGl1bWAvYGhlYXZ5YClcbiAqL1xuY29uc3QgaGFwdGljSW1wYWN0ID0gKG9wdGlvbnMpID0+IHtcbiAgSGFwdGljRW5naW5lLmltcGFjdChvcHRpb25zKTtcbn07XG5cbmV4cG9ydCB7IGhhcHRpY1NlbGVjdGlvblN0YXJ0IGFzIGEsIGhhcHRpY1NlbGVjdGlvbkNoYW5nZWQgYXMgYiwgaGFwdGljU2VsZWN0aW9uIGFzIGMsIGhhcHRpY0ltcGFjdCBhcyBkLCBoYXB0aWNTZWxlY3Rpb25FbmQgYXMgaCB9O1xuIiwiY29uc3Qgc3Bpbm5lcnMgPSB7XG4gICdidWJibGVzJzoge1xuICAgIGR1cjogMTAwMCxcbiAgICBjaXJjbGVzOiA5LFxuICAgIGZuOiAoZHVyLCBpbmRleCwgdG90YWwpID0+IHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbkRlbGF5ID0gYCR7KGR1ciAqIGluZGV4IC8gdG90YWwpIC0gZHVyfW1zYDtcbiAgICAgIGNvbnN0IGFuZ2xlID0gMiAqIE1hdGguUEkgKiBpbmRleCAvIHRvdGFsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogNSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAndG9wJzogYCR7OSAqIE1hdGguc2luKGFuZ2xlKX1weGAsXG4gICAgICAgICAgJ2xlZnQnOiBgJHs5ICogTWF0aC5jb3MoYW5nbGUpfXB4YCxcbiAgICAgICAgICAnYW5pbWF0aW9uLWRlbGF5JzogYW5pbWF0aW9uRGVsYXksXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9LFxuICAnY2lyY2xlcyc6IHtcbiAgICBkdXI6IDEwMDAsXG4gICAgY2lyY2xlczogOCxcbiAgICBmbjogKGR1ciwgaW5kZXgsIHRvdGFsKSA9PiB7XG4gICAgICBjb25zdCBzdGVwID0gaW5kZXggLyB0b3RhbDtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbkRlbGF5ID0gYCR7KGR1ciAqIHN0ZXApIC0gZHVyfW1zYDtcbiAgICAgIGNvbnN0IGFuZ2xlID0gMiAqIE1hdGguUEkgKiBzdGVwO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogNSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAndG9wJzogYCR7OSAqIE1hdGguc2luKGFuZ2xlKX1weGAsXG4gICAgICAgICAgJ2xlZnQnOiBgJHs5ICogTWF0aC5jb3MoYW5nbGUpfXB4YCxcbiAgICAgICAgICAnYW5pbWF0aW9uLWRlbGF5JzogYW5pbWF0aW9uRGVsYXksXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9LFxuICAnY2lyY3VsYXInOiB7XG4gICAgZHVyOiAxNDAwLFxuICAgIGVsbUR1cmF0aW9uOiB0cnVlLFxuICAgIGNpcmNsZXM6IDEsXG4gICAgZm46ICgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IDIwLFxuICAgICAgICBjeDogNDgsXG4gICAgICAgIGN5OiA0OCxcbiAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICB2aWV3Qm94OiAnMjQgMjQgNDggNDgnLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwwKScsXG4gICAgICAgIHN0eWxlOiB7fVxuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gICdjcmVzY2VudCc6IHtcbiAgICBkdXI6IDc1MCxcbiAgICBjaXJjbGVzOiAxLFxuICAgIGZuOiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiAyNixcbiAgICAgICAgc3R5bGU6IHt9XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgJ2RvdHMnOiB7XG4gICAgZHVyOiA3NTAsXG4gICAgY2lyY2xlczogMyxcbiAgICBmbjogKF8sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBhbmltYXRpb25EZWxheSA9IC0oMTEwICogaW5kZXgpICsgJ21zJztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IDYsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgJ2xlZnQnOiBgJHs5IC0gKDkgKiBpbmRleCl9cHhgLFxuICAgICAgICAgICdhbmltYXRpb24tZGVsYXknOiBhbmltYXRpb25EZWxheSxcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gICdsaW5lcyc6IHtcbiAgICBkdXI6IDEwMDAsXG4gICAgbGluZXM6IDEyLFxuICAgIGZuOiAoZHVyLCBpbmRleCwgdG90YWwpID0+IHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGByb3RhdGUoJHszMCAqIGluZGV4ICsgKGluZGV4IDwgNiA/IDE4MCA6IC0xODApfWRlZylgO1xuICAgICAgY29uc3QgYW5pbWF0aW9uRGVsYXkgPSBgJHsoZHVyICogaW5kZXggLyB0b3RhbCkgLSBkdXJ9bXNgO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeTE6IDE3LFxuICAgICAgICB5MjogMjksXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgJ3RyYW5zZm9ybSc6IHRyYW5zZm9ybSxcbiAgICAgICAgICAnYW5pbWF0aW9uLWRlbGF5JzogYW5pbWF0aW9uRGVsYXksXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9LFxuICAnbGluZXMtc21hbGwnOiB7XG4gICAgZHVyOiAxMDAwLFxuICAgIGxpbmVzOiAxMixcbiAgICBmbjogKGR1ciwgaW5kZXgsIHRvdGFsKSA9PiB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm0gPSBgcm90YXRlKCR7MzAgKiBpbmRleCArIChpbmRleCA8IDYgPyAxODAgOiAtMTgwKX1kZWcpYDtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbkRlbGF5ID0gYCR7KGR1ciAqIGluZGV4IC8gdG90YWwpIC0gZHVyfW1zYDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHkxOiAxMixcbiAgICAgICAgeTI6IDIwLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICd0cmFuc2Zvcm0nOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgJ2FuaW1hdGlvbi1kZWxheSc6IGFuaW1hdGlvbkRlbGF5LFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcbmNvbnN0IFNQSU5ORVJTID0gc3Bpbm5lcnM7XG5cbmV4cG9ydCB7IFNQSU5ORVJTIGFzIFMgfTtcbiIsImNvbnN0IGhvc3RDb250ZXh0ID0gKHNlbGVjdG9yLCBlbCkgPT4ge1xuICByZXR1cm4gZWwuY2xvc2VzdChzZWxlY3RvcikgIT09IG51bGw7XG59O1xuLyoqXG4gKiBDcmVhdGUgdGhlIG1vZGUgYW5kIGNvbG9yIGNsYXNzZXMgZm9yIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGNsYXNzZXMgcGFzc2VkIGluXG4gKi9cbmNvbnN0IGNyZWF0ZUNvbG9yQ2xhc3NlcyA9IChjb2xvciwgY3NzQ2xhc3NNYXApID0+IHtcbiAgcmV0dXJuICh0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnICYmIGNvbG9yLmxlbmd0aCA+IDApID8gT2JqZWN0LmFzc2lnbih7ICdpb24tY29sb3InOiB0cnVlLCBbYGlvbi1jb2xvci0ke2NvbG9yfWBdOiB0cnVlIH0sIGNzc0NsYXNzTWFwKSA6IGNzc0NsYXNzTWFwO1xufTtcbmNvbnN0IGdldENsYXNzTGlzdCA9IChjbGFzc2VzKSA9PiB7XG4gIGlmIChjbGFzc2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBhcnJheSA9IEFycmF5LmlzQXJyYXkoY2xhc3NlcykgPyBjbGFzc2VzIDogY2xhc3Nlcy5zcGxpdCgnICcpO1xuICAgIHJldHVybiBhcnJheVxuICAgICAgLmZpbHRlcihjID0+IGMgIT0gbnVsbClcbiAgICAgIC5tYXAoYyA9PiBjLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoYyA9PiBjICE9PSAnJyk7XG4gIH1cbiAgcmV0dXJuIFtdO1xufTtcbmNvbnN0IGdldENsYXNzTWFwID0gKGNsYXNzZXMpID0+IHtcbiAgY29uc3QgbWFwID0ge307XG4gIGdldENsYXNzTGlzdChjbGFzc2VzKS5mb3JFYWNoKGMgPT4gbWFwW2NdID0gdHJ1ZSk7XG4gIHJldHVybiBtYXA7XG59O1xuY29uc3QgU0NIRU1FID0gL15bYS16XVthLXowLTkrXFwtLl0qOi87XG5jb25zdCBvcGVuVVJMID0gYXN5bmMgKHVybCwgZXYsIGRpcmVjdGlvbiwgYW5pbWF0aW9uKSA9PiB7XG4gIGlmICh1cmwgIT0gbnVsbCAmJiB1cmxbMF0gIT09ICcjJyAmJiAhU0NIRU1FLnRlc3QodXJsKSkge1xuICAgIGNvbnN0IHJvdXRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lvbi1yb3V0ZXInKTtcbiAgICBpZiAocm91dGVyKSB7XG4gICAgICBpZiAoZXYgIT0gbnVsbCkge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvdXRlci5wdXNoKHVybCwgZGlyZWN0aW9uLCBhbmltYXRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVDb2xvckNsYXNzZXMgYXMgYywgZ2V0Q2xhc3NNYXAgYXMgZywgaG9zdENvbnRleHQgYXMgaCwgb3BlblVSTCBhcyBvIH07XG4iLCJleHBvcnQgY2xhc3MgQXJyYXlIZWxwZXIge1xyXG4gIHN0YXRpYyBsaWZ0VG9BcnJheTxUPihpdGVtOiBUIHwgVFtdKSB7XHJcbiAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBbaXRlbV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gYXJyYXkgQXJyYXlcclxuICAgKiBAcGFyYW0gZnJvbUluZGV4IFJlb3JkZXIgaXRlbSBmcm9tIGluZGV4XHJcbiAgICogQHBhcmFtIHRvSW5kZXggUmVvcmRlciBpdGVtIHRvIGluZGV4XHJcbiAgICogQHJldHVybnMgTmV3IHJlb3JkZXJlZCBhcnJheVxyXG4gICAqL1xyXG4gIHN0YXRpYyByZW9yZGVyTGlzdDxUPihcclxuICAgIGFycmF5OiBBcnJheTxUPixcclxuICAgIGZyb21JbmRleDogbnVtYmVyLFxyXG4gICAgdG9JbmRleDogbnVtYmVyXHJcbiAgKTogQXJyYXk8VD4ge1xyXG4gICAgaWYgKCFhcnJheSB8fCBhcnJheS5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXJyYXlDb3B5ID0gWy4uLmFycmF5XTtcclxuICAgIGFycmF5Q29weS5zcGxpY2UodG9JbmRleCwgMCwgYXJyYXlDb3B5LnNwbGljZShmcm9tSW5kZXgsIDEpWzBdKTtcclxuICAgIHJldHVybiBhcnJheUNvcHk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJjIiwiY29tcG9uZW50T25SZWFkeSIsImF0dGFjaENvbXBvbmVudCIsImRlbGVnYXRlIiwiY29udGFpbmVyIiwiY29tcG9uZW50IiwiY3NzQ2xhc3NlcyIsImNvbXBvbmVudFByb3BzIiwiYXR0YWNoVmlld1RvRG9tIiwiSFRNTEVsZW1lbnQiLCJFcnJvciIsImVsIiwib3duZXJEb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJmb3JFYWNoIiwiY2xhc3NMaXN0IiwiYWRkIiwiT2JqZWN0IiwiYXNzaWduIiwiYXBwZW5kQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRldGFjaENvbXBvbmVudCIsImVsZW1lbnQiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlVmlld0Zyb21Eb20iLCJyZW1vdmUiLCJhIiwiZCIsImhvc3RDb250ZXh0Iiwic2VsZWN0b3IiLCJjbG9zZXN0IiwiY3JlYXRlQ29sb3JDbGFzc2VzIiwiY29sb3IiLCJjc3NDbGFzc01hcCIsImxlbmd0aCIsImdldENsYXNzTGlzdCIsImNsYXNzZXMiLCJ1bmRlZmluZWQiLCJhcnJheSIsIkFycmF5IiwiaXNBcnJheSIsInNwbGl0IiwiZmlsdGVyIiwibWFwIiwidHJpbSIsImdldENsYXNzTWFwIiwiU0NIRU1FIiwib3BlblVSTCIsInVybCIsImV2IiwiZGlyZWN0aW9uIiwiYW5pbWF0aW9uIiwidGVzdCIsInJvdXRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInByZXZlbnREZWZhdWx0IiwicHVzaCIsImciLCJoIiwibyJdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==