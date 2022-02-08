(function () {
  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["polyfills-css-shim"], {
    /***/
    76065: function _() {
      /*
       Stencil Client Patch Esm v2.5.0 | MIT Licensed | https://stenciljs.com
       */
      var _assign = function __assign() {
        return (_assign = Object.assign || function (e) {
          for (var t, r = 1, n = arguments.length; r < n; r++) {
            for (var s in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
            }
          }

          return e;
        }).apply(this, arguments);
      },
          StyleNode = function StyleNode() {
        this.start = 0, this.end = 0, this.previous = null, this.parent = null, this.rules = null, this.parsedCssText = "", this.cssText = "", this.atRule = !1, this.type = 0, this.keyframesName = "", this.selector = "", this.parsedSelector = "";
      };

      function parse(e) {
        return parseCss(lex(e = clean(e)), e);
      }

      function clean(e) {
        return e.replace(RX.comments, "").replace(RX.port, "");
      }

      function lex(e) {
        var t = new StyleNode();
        t.start = 0, t.end = e.length;

        for (var r = t, n = 0, s = e.length; n < s; n++) {
          if (e[n] === OPEN_BRACE) {
            r.rules || (r.rules = []);
            var o = r,
                a = o.rules[o.rules.length - 1] || null;
            (r = new StyleNode()).start = n + 1, r.parent = o, r.previous = a, o.rules.push(r);
          } else e[n] === CLOSE_BRACE && (r.end = n + 1, r = r.parent || t);
        }

        return t;
      }

      function parseCss(e, t) {
        var r = t.substring(e.start, e.end - 1);

        if (e.parsedCssText = e.cssText = r.trim(), e.parent) {
          var n = e.previous ? e.previous.end : e.parent.start;
          r = (r = (r = _expandUnicodeEscapes(r = t.substring(n, e.start - 1))).replace(RX.multipleSpaces, " ")).substring(r.lastIndexOf(";") + 1);
          var s = e.parsedSelector = e.selector = r.trim();
          e.atRule = 0 === s.indexOf(AT_START), e.atRule ? 0 === s.indexOf(MEDIA_START) ? e.type = types.MEDIA_RULE : s.match(RX.keyframesRule) && (e.type = types.KEYFRAMES_RULE, e.keyframesName = e.selector.split(RX.multipleSpaces).pop()) : 0 === s.indexOf(VAR_START) ? e.type = types.MIXIN_RULE : e.type = types.STYLE_RULE;
        }

        var o = e.rules;
        if (o) for (var a = 0, i = o.length, l = void 0; a < i && (l = o[a]); a++) {
          parseCss(l, t);
        }
        return e;
      }

      function _expandUnicodeEscapes(e) {
        return e.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
          for (var e = arguments[1], t = 6 - e.length; t--;) {
            e = "0" + e;
          }

          return "\\" + e;
        });
      }

      var types = {
        STYLE_RULE: 1,
        KEYFRAMES_RULE: 7,
        MEDIA_RULE: 4,
        MIXIN_RULE: 1e3
      },
          OPEN_BRACE = "{",
          CLOSE_BRACE = "}",
          RX = {
        comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
        port: /@import[^;]*;/gim,
        customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
        varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        keyframesRule: /^@[^\s]*keyframes/,
        multipleSpaces: /\s+/g
      },
          VAR_START = "--",
          MEDIA_START = "@media",
          AT_START = "@";

      function findRegex(e, t, r) {
        e.lastIndex = 0;
        var n = t.substring(r).match(e);

        if (n) {
          var s = r + n.index;
          return {
            start: s,
            end: s + n[0].length
          };
        }

        return null;
      }

      var VAR_USAGE_START = /\bvar\(/,
          VAR_ASSIGN_START = /\B--[\w-]+\s*:/,
          COMMENTS = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
          TRAILING_LINES = /^[\t ]+\n/gm;

      function resolveVar(e, t, r) {
        return e[t] ? e[t] : r ? executeTemplate(r, e) : "";
      }

      function findVarEndIndex(e, t) {
        for (var r = 0, n = t; n < e.length; n++) {
          var s = e[n];
          if ("(" === s) r++;else if (")" === s && --r <= 0) return n + 1;
        }

        return n;
      }

      function parseVar(e, t) {
        var r = findRegex(VAR_USAGE_START, e, t);
        if (!r) return null;
        var n = findVarEndIndex(e, r.start),
            s = e.substring(r.end, n - 1).split(","),
            o = s[0],
            a = s.slice(1);
        return {
          start: r.start,
          end: n,
          propName: o.trim(),
          fallback: a.length > 0 ? a.join(",").trim() : void 0
        };
      }

      function compileVar(e, t, r) {
        var n = parseVar(e, r);
        if (!n) return t.push(e.substring(r, e.length)), e.length;
        var s = n.propName,
            o = null != n.fallback ? compileTemplate(n.fallback) : void 0;
        return t.push(e.substring(r, n.start), function (e) {
          return resolveVar(e, s, o);
        }), n.end;
      }

      function executeTemplate(e, t) {
        for (var r = "", n = 0; n < e.length; n++) {
          var s = e[n];
          r += "string" == typeof s ? s : s(t);
        }

        return r;
      }

      function findEndValue(e, t) {
        for (var r = !1, n = !1, s = t; s < e.length; s++) {
          var o = e[s];
          if (r) n && '"' === o && (r = !1), n || "'" !== o || (r = !1);else if ('"' === o) r = !0, n = !0;else if ("'" === o) r = !0, n = !1;else {
            if (";" === o) return s + 1;
            if ("}" === o) return s;
          }
        }

        return s;
      }

      function removeCustomAssigns(e) {
        for (var t = "", r = 0;;) {
          var n = findRegex(VAR_ASSIGN_START, e, r),
              s = n ? n.start : e.length;
          if (t += e.substring(r, s), !n) break;
          r = findEndValue(e, s);
        }

        return t;
      }

      function compileTemplate(e) {
        var t = 0;
        e = removeCustomAssigns(e = e.replace(COMMENTS, "")).replace(TRAILING_LINES, "");

        for (var r = []; t < e.length;) {
          t = compileVar(e, r, t);
        }

        return r;
      }

      function resolveValues(e) {
        var t = {};
        e.forEach(function (e) {
          e.declarations.forEach(function (e) {
            t[e.prop] = e.value;
          });
        });

        for (var r = {}, n = Object.entries(t), s = function s(e) {
          var t = !1;
          if (n.forEach(function (e) {
            var n = e[0],
                s = executeTemplate(e[1], r);
            s !== r[n] && (r[n] = s, t = !0);
          }), !t) return "break";
        }, o = 0; o < 10; o++) {
          if ("break" === s()) break;
        }

        return r;
      }

      function getSelectors(e, t) {
        if (void 0 === t && (t = 0), !e.rules) return [];
        var r = [];
        return e.rules.filter(function (e) {
          return e.type === types.STYLE_RULE;
        }).forEach(function (e) {
          var n = getDeclarations(e.cssText);
          n.length > 0 && e.parsedSelector.split(",").forEach(function (e) {
            e = e.trim(), r.push({
              selector: e,
              declarations: n,
              specificity: computeSpecificity(),
              nu: t
            });
          }), t++;
        }), r;
      }

      function computeSpecificity(e) {
        return 1;
      }

      var IMPORTANT = "!important",
          FIND_DECLARATIONS = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gm;

      function getDeclarations(e) {
        for (var t, r = []; t = FIND_DECLARATIONS.exec(e.trim());) {
          var n = normalizeValue(t[2]),
              s = n.value,
              o = n.important;
          r.push({
            prop: t[1].trim(),
            value: compileTemplate(s),
            important: o
          });
        }

        return r;
      }

      function normalizeValue(e) {
        var t = (e = e.replace(/\s+/gim, " ").trim()).endsWith(IMPORTANT);
        return t && (e = e.substr(0, e.length - IMPORTANT.length).trim()), {
          value: e,
          important: t
        };
      }

      function getActiveSelectors(e, t, r) {
        var n = [],
            s = getScopesForElement(t, e);
        return r.forEach(function (e) {
          return n.push(e);
        }), s.forEach(function (e) {
          return n.push(e);
        }), sortSelectors(getSelectorsForScopes(n).filter(function (t) {
          return matches(e, t.selector);
        }));
      }

      function getScopesForElement(e, t) {
        for (var r = []; t;) {
          var n = e.get(t);
          n && r.push(n), t = t.parentElement;
        }

        return r;
      }

      function getSelectorsForScopes(e) {
        var t = [];
        return e.forEach(function (e) {
          t.push.apply(t, e.selectors);
        }), t;
      }

      function sortSelectors(e) {
        return e.sort(function (e, t) {
          return e.specificity === t.specificity ? e.nu - t.nu : e.specificity - t.specificity;
        }), e;
      }

      function matches(e, t) {
        return ":root" === t || "html" === t || e.matches(t);
      }

      function parseCSS(e) {
        var t = parse(e),
            r = compileTemplate(e);
        return {
          original: e,
          template: r,
          selectors: getSelectors(t),
          usesCssVars: r.length > 1
        };
      }

      function addGlobalStyle(e, t) {
        if (e.some(function (e) {
          return e.styleEl === t;
        })) return !1;
        var r = parseCSS(t.textContent);
        return r.styleEl = t, e.push(r), !0;
      }

      function updateGlobalScopes(e) {
        var t = resolveValues(getSelectorsForScopes(e));
        e.forEach(function (e) {
          e.usesCssVars && (e.styleEl.textContent = executeTemplate(e.template, t));
        });
      }

      function reScope(e, t) {
        var r = e.template.map(function (r) {
          return "string" == typeof r ? replaceScope(r, e.scopeId, t) : r;
        }),
            n = e.selectors.map(function (r) {
          return _assign(_assign({}, r), {
            selector: replaceScope(r.selector, e.scopeId, t)
          });
        });
        return _assign(_assign({}, e), {
          template: r,
          selectors: n,
          scopeId: t
        });
      }

      function replaceScope(e, t, r) {
        return e = replaceAll(e, "\\." + t, "." + r);
      }

      function replaceAll(e, t, r) {
        return e.replace(new RegExp(t, "g"), r);
      }

      function loadDocument(e, t) {
        return loadDocumentStyles(e, t), loadDocumentLinks(e, t).then(function () {
          updateGlobalScopes(t);
        });
      }

      function startWatcher(e, t) {
        "undefined" != typeof MutationObserver && new MutationObserver(function () {
          loadDocumentStyles(e, t) && updateGlobalScopes(t);
        }).observe(document.head, {
          childList: !0
        });
      }

      function loadDocumentLinks(e, t) {
        for (var r = [], n = e.querySelectorAll('link[rel="stylesheet"][href]:not([data-no-shim])'), s = 0; s < n.length; s++) {
          r.push(addGlobalLink(e, t, n[s]));
        }

        return Promise.all(r);
      }

      function loadDocumentStyles(e, t) {
        return Array.from(e.querySelectorAll("style:not([data-styles]):not([data-no-shim])")).map(function (e) {
          return addGlobalStyle(t, e);
        }).some(Boolean);
      }

      function addGlobalLink(e, t, r) {
        var n = r.href;
        return fetch(n).then(function (e) {
          return e.text();
        }).then(function (s) {
          if (hasCssVariables(s) && r.parentNode) {
            hasRelativeUrls(s) && (s = fixRelativeUrls(s, n));
            var o = e.createElement("style");
            o.setAttribute("data-styles", ""), o.textContent = s, addGlobalStyle(t, o), r.parentNode.insertBefore(o, r), r.remove();
          }
        })["catch"](function (e) {
          console.error(e);
        });
      }

      var CSS_VARIABLE_REGEXP = /[\s;{]--[-a-zA-Z0-9]+\s*:/m;

      function hasCssVariables(e) {
        return e.indexOf("var(") > -1 || CSS_VARIABLE_REGEXP.test(e);
      }

      var CSS_URL_REGEXP = /url[\s]*\([\s]*['"]?(?!(?:https?|data)\:|\/)([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim;

      function hasRelativeUrls(e) {
        return CSS_URL_REGEXP.lastIndex = 0, CSS_URL_REGEXP.test(e);
      }

      function fixRelativeUrls(e, t) {
        var r = t.replace(/[^/]*$/, "");
        return e.replace(CSS_URL_REGEXP, function (e, t) {
          var n = r + t;
          return e.replace(t, n);
        });
      }

      var CustomStyle = function () {
        function e(e, t) {
          this.win = e, this.doc = t, this.count = 0, this.hostStyleMap = new WeakMap(), this.hostScopeMap = new WeakMap(), this.globalScopes = [], this.scopesMap = new Map(), this.didInit = !1;
        }

        return e.prototype.i = function () {
          var e = this;
          return this.didInit || !this.win.requestAnimationFrame ? Promise.resolve() : (this.didInit = !0, new Promise(function (t) {
            e.win.requestAnimationFrame(function () {
              startWatcher(e.doc, e.globalScopes), loadDocument(e.doc, e.globalScopes).then(function () {
                return t();
              });
            });
          }));
        }, e.prototype.addLink = function (e) {
          var t = this;
          return addGlobalLink(this.doc, this.globalScopes, e).then(function () {
            t.updateGlobal();
          });
        }, e.prototype.addGlobalStyle = function (e) {
          addGlobalStyle(this.globalScopes, e) && this.updateGlobal();
        }, e.prototype.createHostStyle = function (e, t, r, n) {
          if (this.hostScopeMap.has(e)) throw new Error("host style already created");
          var s = this.registerHostTemplate(r, t, n),
              o = this.doc.createElement("style");
          return o.setAttribute("data-no-shim", ""), s.usesCssVars ? n ? (o["s-sc"] = t = s.scopeId + "-" + this.count, o.textContent = "/*needs update*/", this.hostStyleMap.set(e, o), this.hostScopeMap.set(e, reScope(s, t)), this.count++) : (s.styleEl = o, s.usesCssVars || (o.textContent = executeTemplate(s.template, {})), this.globalScopes.push(s), this.updateGlobal(), this.hostScopeMap.set(e, s)) : o.textContent = r, o;
        }, e.prototype.removeHost = function (e) {
          var t = this.hostStyleMap.get(e);
          t && t.remove(), this.hostStyleMap["delete"](e), this.hostScopeMap["delete"](e);
        }, e.prototype.updateHost = function (e) {
          var t = this.hostScopeMap.get(e);

          if (t && t.usesCssVars && t.isScoped) {
            var r = this.hostStyleMap.get(e);

            if (r) {
              var n = resolveValues(getActiveSelectors(e, this.hostScopeMap, this.globalScopes));
              r.textContent = executeTemplate(t.template, n);
            }
          }
        }, e.prototype.updateGlobal = function () {
          updateGlobalScopes(this.globalScopes);
        }, e.prototype.registerHostTemplate = function (e, t, r) {
          var n = this.scopesMap.get(t);
          return n || ((n = parseCSS(e)).scopeId = t, n.isScoped = r, this.scopesMap.set(t, n)), n;
        }, e;
      }();

      !function (e) {
        !e || e.__cssshim || e.CSS && e.CSS.supports && e.CSS.supports("color", "var(--c)") || (e.__cssshim = new CustomStyle(e, e.document));
      }("undefined" != typeof window && window);
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBc1gsU0FBamxDLEVBQWlsQzFCO0FBQW9DO0FBQStCRjtBQUF1RSxTQUEzdEMsRUFBMnRDRTtBQUFvQzs7QUFBK0I7QUFBaUM7O0FBQStCO0FBQU07QUFBK0VQO0FBQUE7QUFBQTtBQUErQyxTQUFsK0MsRUFBaytDTztBQUFxQ3lDO0FBQXVDLFNBQTlpRCxFQUE4aUR6QztBQUFrRDtBQUE0QjtBQUE2RSxTQUF6c0QsRUFBeXNEQSxDQUF6c0Q7QUFBNHNELE9BQW41RDs7QUFBczVEO0FBQWE7QUFBeUgsT0FBdEksQ0FBc0ksc0NBQXRJOzs7IiwibmFtZXMiOlsiciIsIk9iamVjdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiU3R5bGVOb2RlIiwidCIsIm4iLCJlIiwiYSIsInBhcnNlQ3NzIiwiU1RZTEVfUlVMRSIsIktFWUZSQU1FU19SVUxFIiwiTUVESUFfUlVMRSIsIk1JWElOX1JVTEUiLCJPUEVOX0JSQUNFIiwiQ0xPU0VfQlJBQ0UiLCJSWCIsImNvbW1lbnRzIiwicG9ydCIsImN1c3RvbVByb3AiLCJtaXhpblByb3AiLCJtaXhpbkFwcGx5IiwidmFyQXBwbHkiLCJrZXlmcmFtZXNSdWxlIiwibXVsdGlwbGVTcGFjZXMiLCJWQVJfU1RBUlQiLCJNRURJQV9TVEFSVCIsIkFUX1NUQVJUIiwic3RhcnQiLCJlbmQiLCJwcm9wTmFtZSIsImZhbGxiYWNrIiwicyIsIm8iLCJmb3JFYWNoIiwic2VsZWN0b3IiLCJkZWNsYXJhdGlvbnMiLCJzcGVjaWZpY2l0eSIsIm51IiwicHJvcCIsInZhbHVlIiwiaW1wb3J0YW50Iiwic29ydFNlbGVjdG9ycyIsIm9yaWdpbmFsIiwidGVtcGxhdGUiLCJzZWxlY3RvcnMiLCJ1c2VzQ3NzVmFycyIsInNjb3BlSWQiLCJ1cGRhdGVHbG9iYWxTY29wZXMiLCJsb2FkRG9jdW1lbnRTdHlsZXMiLCJvYnNlcnZlIiwiZG9jdW1lbnQiLCJjaGlsZExpc3QiLCJzb21lIiwiQm9vbGVhbiIsInRoZW4iLCJoYXNSZWxhdGl2ZVVybHMiLCJjb25zb2xlIiwic3RhcnRXYXRjaGVyIiwiYWRkR2xvYmFsU3R5bGUiXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AaW9uaWMvY29yZS9kaXN0L2VzbS9jc3Mtc2hpbS0yY2NmNGRlYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFN0ZW5jaWwgQ2xpZW50IFBhdGNoIEVzbSB2Mi41LjAgfCBNSVQgTGljZW5zZWQgfCBodHRwczovL3N0ZW5jaWxqcy5jb21cbiAqL1xudmFyIF9fYXNzaWduPWZ1bmN0aW9uKCl7cmV0dXJuIChfX2Fzc2lnbj1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihlKXtmb3IodmFyIHQscj0xLG49YXJndW1lbnRzLmxlbmd0aDtyPG47cisrKWZvcih2YXIgcyBpbiB0PWFyZ3VtZW50c1tyXSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxzKSYmKGVbc109dFtzXSk7cmV0dXJuIGV9KS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9LFN0eWxlTm9kZT1mdW5jdGlvbigpe3RoaXMuc3RhcnQ9MCx0aGlzLmVuZD0wLHRoaXMucHJldmlvdXM9bnVsbCx0aGlzLnBhcmVudD1udWxsLHRoaXMucnVsZXM9bnVsbCx0aGlzLnBhcnNlZENzc1RleHQ9XCJcIix0aGlzLmNzc1RleHQ9XCJcIix0aGlzLmF0UnVsZT0hMSx0aGlzLnR5cGU9MCx0aGlzLmtleWZyYW1lc05hbWU9XCJcIix0aGlzLnNlbGVjdG9yPVwiXCIsdGhpcy5wYXJzZWRTZWxlY3Rvcj1cIlwiO307ZnVuY3Rpb24gcGFyc2UoZSl7cmV0dXJuIHBhcnNlQ3NzKGxleChlPWNsZWFuKGUpKSxlKX1mdW5jdGlvbiBjbGVhbihlKXtyZXR1cm4gZS5yZXBsYWNlKFJYLmNvbW1lbnRzLFwiXCIpLnJlcGxhY2UoUlgucG9ydCxcIlwiKX1mdW5jdGlvbiBsZXgoZSl7dmFyIHQ9bmV3IFN0eWxlTm9kZTt0LnN0YXJ0PTAsdC5lbmQ9ZS5sZW5ndGg7Zm9yKHZhciByPXQsbj0wLHM9ZS5sZW5ndGg7bjxzO24rKylpZihlW25dPT09T1BFTl9CUkFDRSl7ci5ydWxlc3x8KHIucnVsZXM9W10pO3ZhciBvPXIsYT1vLnJ1bGVzW28ucnVsZXMubGVuZ3RoLTFdfHxudWxsOyhyPW5ldyBTdHlsZU5vZGUpLnN0YXJ0PW4rMSxyLnBhcmVudD1vLHIucHJldmlvdXM9YSxvLnJ1bGVzLnB1c2gocik7fWVsc2UgZVtuXT09PUNMT1NFX0JSQUNFJiYoci5lbmQ9bisxLHI9ci5wYXJlbnR8fHQpO3JldHVybiB0fWZ1bmN0aW9uIHBhcnNlQ3NzKGUsdCl7dmFyIHI9dC5zdWJzdHJpbmcoZS5zdGFydCxlLmVuZC0xKTtpZihlLnBhcnNlZENzc1RleHQ9ZS5jc3NUZXh0PXIudHJpbSgpLGUucGFyZW50KXt2YXIgbj1lLnByZXZpb3VzP2UucHJldmlvdXMuZW5kOmUucGFyZW50LnN0YXJ0O3I9KHI9KHI9X2V4cGFuZFVuaWNvZGVFc2NhcGVzKHI9dC5zdWJzdHJpbmcobixlLnN0YXJ0LTEpKSkucmVwbGFjZShSWC5tdWx0aXBsZVNwYWNlcyxcIiBcIikpLnN1YnN0cmluZyhyLmxhc3RJbmRleE9mKFwiO1wiKSsxKTt2YXIgcz1lLnBhcnNlZFNlbGVjdG9yPWUuc2VsZWN0b3I9ci50cmltKCk7ZS5hdFJ1bGU9MD09PXMuaW5kZXhPZihBVF9TVEFSVCksZS5hdFJ1bGU/MD09PXMuaW5kZXhPZihNRURJQV9TVEFSVCk/ZS50eXBlPXR5cGVzLk1FRElBX1JVTEU6cy5tYXRjaChSWC5rZXlmcmFtZXNSdWxlKSYmKGUudHlwZT10eXBlcy5LRVlGUkFNRVNfUlVMRSxlLmtleWZyYW1lc05hbWU9ZS5zZWxlY3Rvci5zcGxpdChSWC5tdWx0aXBsZVNwYWNlcykucG9wKCkpOjA9PT1zLmluZGV4T2YoVkFSX1NUQVJUKT9lLnR5cGU9dHlwZXMuTUlYSU5fUlVMRTplLnR5cGU9dHlwZXMuU1RZTEVfUlVMRTt9dmFyIG89ZS5ydWxlcztpZihvKWZvcih2YXIgYT0wLGk9by5sZW5ndGgsbD12b2lkIDA7YTxpJiYobD1vW2FdKTthKyspcGFyc2VDc3MobCx0KTtyZXR1cm4gZX1mdW5jdGlvbiBfZXhwYW5kVW5pY29kZUVzY2FwZXMoZSl7cmV0dXJuIGUucmVwbGFjZSgvXFxcXChbMC05YS1mXXsxLDZ9KVxccy9naSwoZnVuY3Rpb24oKXtmb3IodmFyIGU9YXJndW1lbnRzWzFdLHQ9Ni1lLmxlbmd0aDt0LS07KWU9XCIwXCIrZTtyZXR1cm4gXCJcXFxcXCIrZX0pKX12YXIgdHlwZXM9e1NUWUxFX1JVTEU6MSxLRVlGUkFNRVNfUlVMRTo3LE1FRElBX1JVTEU6NCxNSVhJTl9SVUxFOjFlM30sT1BFTl9CUkFDRT1cIntcIixDTE9TRV9CUkFDRT1cIn1cIixSWD17Y29tbWVudHM6L1xcL1xcKlteKl0qXFwqKyhbXi8qXVteKl0qXFwqKykqXFwvL2dpbSxwb3J0Oi9AaW1wb3J0W147XSo7L2dpbSxjdXN0b21Qcm9wOi8oPzpeW147XFwtXFxzfV0rKT8tLVteO3t9XSo/Oltee307XSo/KD86WztcXG5dfCQpL2dpbSxtaXhpblByb3A6Lyg/Ol5bXjtcXC1cXHN9XSspPy0tW147e31dKj86W157fTtdKj97W159XSo/fSg/Ols7XFxuXXwkKT8vZ2ltLG1peGluQXBwbHk6L0BhcHBseVxccypcXCg/W14pO10qXFwpP1xccyooPzpbO1xcbl18JCk/L2dpbSx2YXJBcHBseTovW147Ol0qPzpbXjtdKj92YXJcXChbXjtdKlxcKSg/Ols7XFxuXXwkKT8vZ2ltLGtleWZyYW1lc1J1bGU6L15AW15cXHNdKmtleWZyYW1lcy8sbXVsdGlwbGVTcGFjZXM6L1xccysvZ30sVkFSX1NUQVJUPVwiLS1cIixNRURJQV9TVEFSVD1cIkBtZWRpYVwiLEFUX1NUQVJUPVwiQFwiO2Z1bmN0aW9uIGZpbmRSZWdleChlLHQscil7ZS5sYXN0SW5kZXg9MDt2YXIgbj10LnN1YnN0cmluZyhyKS5tYXRjaChlKTtpZihuKXt2YXIgcz1yK24uaW5kZXg7cmV0dXJuIHtzdGFydDpzLGVuZDpzK25bMF0ubGVuZ3RofX1yZXR1cm4gbnVsbH12YXIgVkFSX1VTQUdFX1NUQVJUPS9cXGJ2YXJcXCgvLFZBUl9BU1NJR05fU1RBUlQ9L1xcQi0tW1xcdy1dK1xccyo6LyxDT01NRU5UUz0vXFwvXFwqW14qXSpcXCorKFteLypdW14qXSpcXCorKSpcXC8vZ2ltLFRSQUlMSU5HX0xJTkVTPS9eW1xcdCBdK1xcbi9nbTtmdW5jdGlvbiByZXNvbHZlVmFyKGUsdCxyKXtyZXR1cm4gZVt0XT9lW3RdOnI/ZXhlY3V0ZVRlbXBsYXRlKHIsZSk6XCJcIn1mdW5jdGlvbiBmaW5kVmFyRW5kSW5kZXgoZSx0KXtmb3IodmFyIHI9MCxuPXQ7bjxlLmxlbmd0aDtuKyspe3ZhciBzPWVbbl07aWYoXCIoXCI9PT1zKXIrKztlbHNlIGlmKFwiKVwiPT09cyYmLS1yPD0wKXJldHVybiBuKzF9cmV0dXJuIG59ZnVuY3Rpb24gcGFyc2VWYXIoZSx0KXt2YXIgcj1maW5kUmVnZXgoVkFSX1VTQUdFX1NUQVJULGUsdCk7aWYoIXIpcmV0dXJuIG51bGw7dmFyIG49ZmluZFZhckVuZEluZGV4KGUsci5zdGFydCkscz1lLnN1YnN0cmluZyhyLmVuZCxuLTEpLnNwbGl0KFwiLFwiKSxvPXNbMF0sYT1zLnNsaWNlKDEpO3JldHVybiB7c3RhcnQ6ci5zdGFydCxlbmQ6bixwcm9wTmFtZTpvLnRyaW0oKSxmYWxsYmFjazphLmxlbmd0aD4wP2Euam9pbihcIixcIikudHJpbSgpOnZvaWQgMH19ZnVuY3Rpb24gY29tcGlsZVZhcihlLHQscil7dmFyIG49cGFyc2VWYXIoZSxyKTtpZighbilyZXR1cm4gdC5wdXNoKGUuc3Vic3RyaW5nKHIsZS5sZW5ndGgpKSxlLmxlbmd0aDt2YXIgcz1uLnByb3BOYW1lLG89bnVsbCE9bi5mYWxsYmFjaz9jb21waWxlVGVtcGxhdGUobi5mYWxsYmFjayk6dm9pZCAwO3JldHVybiB0LnB1c2goZS5zdWJzdHJpbmcocixuLnN0YXJ0KSwoZnVuY3Rpb24oZSl7cmV0dXJuIHJlc29sdmVWYXIoZSxzLG8pfSkpLG4uZW5kfWZ1bmN0aW9uIGV4ZWN1dGVUZW1wbGF0ZShlLHQpe2Zvcih2YXIgcj1cIlwiLG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHM9ZVtuXTtyKz1cInN0cmluZ1wiPT10eXBlb2Ygcz9zOnModCk7fXJldHVybiByfWZ1bmN0aW9uIGZpbmRFbmRWYWx1ZShlLHQpe2Zvcih2YXIgcj0hMSxuPSExLHM9dDtzPGUubGVuZ3RoO3MrKyl7dmFyIG89ZVtzXTtpZihyKW4mJidcIic9PT1vJiYocj0hMSksbnx8XCInXCIhPT1vfHwocj0hMSk7ZWxzZSBpZignXCInPT09bylyPSEwLG49ITA7ZWxzZSBpZihcIidcIj09PW8pcj0hMCxuPSExO2Vsc2Uge2lmKFwiO1wiPT09bylyZXR1cm4gcysxO2lmKFwifVwiPT09bylyZXR1cm4gc319cmV0dXJuIHN9ZnVuY3Rpb24gcmVtb3ZlQ3VzdG9tQXNzaWducyhlKXtmb3IodmFyIHQ9XCJcIixyPTA7Oyl7dmFyIG49ZmluZFJlZ2V4KFZBUl9BU1NJR05fU1RBUlQsZSxyKSxzPW4/bi5zdGFydDplLmxlbmd0aDtpZih0Kz1lLnN1YnN0cmluZyhyLHMpLCFuKWJyZWFrO3I9ZmluZEVuZFZhbHVlKGUscyk7fXJldHVybiB0fWZ1bmN0aW9uIGNvbXBpbGVUZW1wbGF0ZShlKXt2YXIgdD0wO2U9cmVtb3ZlQ3VzdG9tQXNzaWducyhlPWUucmVwbGFjZShDT01NRU5UUyxcIlwiKSkucmVwbGFjZShUUkFJTElOR19MSU5FUyxcIlwiKTtmb3IodmFyIHI9W107dDxlLmxlbmd0aDspdD1jb21waWxlVmFyKGUscix0KTtyZXR1cm4gcn1mdW5jdGlvbiByZXNvbHZlVmFsdWVzKGUpe3ZhciB0PXt9O2UuZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5kZWNsYXJhdGlvbnMuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dFtlLnByb3BdPWUudmFsdWU7fSkpO30pKTtmb3IodmFyIHI9e30sbj1PYmplY3QuZW50cmllcyh0KSxzPWZ1bmN0aW9uKGUpe3ZhciB0PSExO2lmKG4uZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIG49ZVswXSxzPWV4ZWN1dGVUZW1wbGF0ZShlWzFdLHIpO3MhPT1yW25dJiYocltuXT1zLHQ9ITApO30pKSwhdClyZXR1cm4gXCJicmVha1wifSxvPTA7bzwxMDtvKyspe2lmKFwiYnJlYWtcIj09PXMoKSlicmVha31yZXR1cm4gcn1mdW5jdGlvbiBnZXRTZWxlY3RvcnMoZSx0KXtpZih2b2lkIDA9PT10JiYodD0wKSwhZS5ydWxlcylyZXR1cm4gW107dmFyIHI9W107cmV0dXJuIGUucnVsZXMuZmlsdGVyKChmdW5jdGlvbihlKXtyZXR1cm4gZS50eXBlPT09dHlwZXMuU1RZTEVfUlVMRX0pKS5mb3JFYWNoKChmdW5jdGlvbihlKXt2YXIgbj1nZXREZWNsYXJhdGlvbnMoZS5jc3NUZXh0KTtuLmxlbmd0aD4wJiZlLnBhcnNlZFNlbGVjdG9yLnNwbGl0KFwiLFwiKS5mb3JFYWNoKChmdW5jdGlvbihlKXtlPWUudHJpbSgpLHIucHVzaCh7c2VsZWN0b3I6ZSxkZWNsYXJhdGlvbnM6bixzcGVjaWZpY2l0eTpjb21wdXRlU3BlY2lmaWNpdHkoKSxudTp0fSk7fSkpLHQrKzt9KSkscn1mdW5jdGlvbiBjb21wdXRlU3BlY2lmaWNpdHkoZSl7cmV0dXJuIDF9dmFyIElNUE9SVEFOVD1cIiFpbXBvcnRhbnRcIixGSU5EX0RFQ0xBUkFUSU9OUz0vKD86XnxbO1xcc3tdXFxzKikoLS1bXFx3LV0qPylcXHMqOlxccyooPzooKD86Jyg/OlxcXFwnfC4pKj8nfFwiKD86XFxcXFwifC4pKj9cInxcXChbXildKj9cXCl8W159O3tdKSspfFxceyhbXn1dKilcXH0oPzooPz1bO1xcc31dKXwkKSkvZ207ZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25zKGUpe2Zvcih2YXIgdCxyPVtdO3Q9RklORF9ERUNMQVJBVElPTlMuZXhlYyhlLnRyaW0oKSk7KXt2YXIgbj1ub3JtYWxpemVWYWx1ZSh0WzJdKSxzPW4udmFsdWUsbz1uLmltcG9ydGFudDtyLnB1c2goe3Byb3A6dFsxXS50cmltKCksdmFsdWU6Y29tcGlsZVRlbXBsYXRlKHMpLGltcG9ydGFudDpvfSk7fXJldHVybiByfWZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKGUpe3ZhciB0PShlPWUucmVwbGFjZSgvXFxzKy9naW0sXCIgXCIpLnRyaW0oKSkuZW5kc1dpdGgoSU1QT1JUQU5UKTtyZXR1cm4gdCYmKGU9ZS5zdWJzdHIoMCxlLmxlbmd0aC1JTVBPUlRBTlQubGVuZ3RoKS50cmltKCkpLHt2YWx1ZTplLGltcG9ydGFudDp0fX1mdW5jdGlvbiBnZXRBY3RpdmVTZWxlY3RvcnMoZSx0LHIpe3ZhciBuPVtdLHM9Z2V0U2NvcGVzRm9yRWxlbWVudCh0LGUpO3JldHVybiByLmZvckVhY2goKGZ1bmN0aW9uKGUpe3JldHVybiBuLnB1c2goZSl9KSkscy5mb3JFYWNoKChmdW5jdGlvbihlKXtyZXR1cm4gbi5wdXNoKGUpfSkpLHNvcnRTZWxlY3RvcnMoZ2V0U2VsZWN0b3JzRm9yU2NvcGVzKG4pLmZpbHRlcigoZnVuY3Rpb24odCl7cmV0dXJuIG1hdGNoZXMoZSx0LnNlbGVjdG9yKX0pKSl9ZnVuY3Rpb24gZ2V0U2NvcGVzRm9yRWxlbWVudChlLHQpe2Zvcih2YXIgcj1bXTt0Oyl7dmFyIG49ZS5nZXQodCk7biYmci5wdXNoKG4pLHQ9dC5wYXJlbnRFbGVtZW50O31yZXR1cm4gcn1mdW5jdGlvbiBnZXRTZWxlY3RvcnNGb3JTY29wZXMoZSl7dmFyIHQ9W107cmV0dXJuIGUuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dC5wdXNoLmFwcGx5KHQsZS5zZWxlY3RvcnMpO30pKSx0fWZ1bmN0aW9uIHNvcnRTZWxlY3RvcnMoZSl7cmV0dXJuIGUuc29ydCgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5zcGVjaWZpY2l0eT09PXQuc3BlY2lmaWNpdHk/ZS5udS10Lm51OmUuc3BlY2lmaWNpdHktdC5zcGVjaWZpY2l0eX0pKSxlfWZ1bmN0aW9uIG1hdGNoZXMoZSx0KXtyZXR1cm4gXCI6cm9vdFwiPT09dHx8XCJodG1sXCI9PT10fHxlLm1hdGNoZXModCl9ZnVuY3Rpb24gcGFyc2VDU1MoZSl7dmFyIHQ9cGFyc2UoZSkscj1jb21waWxlVGVtcGxhdGUoZSk7cmV0dXJuIHtvcmlnaW5hbDplLHRlbXBsYXRlOnIsc2VsZWN0b3JzOmdldFNlbGVjdG9ycyh0KSx1c2VzQ3NzVmFyczpyLmxlbmd0aD4xfX1mdW5jdGlvbiBhZGRHbG9iYWxTdHlsZShlLHQpe2lmKGUuc29tZSgoZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3R5bGVFbD09PXR9KSkpcmV0dXJuICExO3ZhciByPXBhcnNlQ1NTKHQudGV4dENvbnRlbnQpO3JldHVybiByLnN0eWxlRWw9dCxlLnB1c2gociksITB9ZnVuY3Rpb24gdXBkYXRlR2xvYmFsU2NvcGVzKGUpe3ZhciB0PXJlc29sdmVWYWx1ZXMoZ2V0U2VsZWN0b3JzRm9yU2NvcGVzKGUpKTtlLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UudXNlc0Nzc1ZhcnMmJihlLnN0eWxlRWwudGV4dENvbnRlbnQ9ZXhlY3V0ZVRlbXBsYXRlKGUudGVtcGxhdGUsdCkpO30pKTt9ZnVuY3Rpb24gcmVTY29wZShlLHQpe3ZhciByPWUudGVtcGxhdGUubWFwKChmdW5jdGlvbihyKXtyZXR1cm4gXCJzdHJpbmdcIj09dHlwZW9mIHI/cmVwbGFjZVNjb3BlKHIsZS5zY29wZUlkLHQpOnJ9KSksbj1lLnNlbGVjdG9ycy5tYXAoKGZ1bmN0aW9uKHIpe3JldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSxyKSx7c2VsZWN0b3I6cmVwbGFjZVNjb3BlKHIuc2VsZWN0b3IsZS5zY29wZUlkLHQpfSl9KSk7cmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LGUpLHt0ZW1wbGF0ZTpyLHNlbGVjdG9yczpuLHNjb3BlSWQ6dH0pfWZ1bmN0aW9uIHJlcGxhY2VTY29wZShlLHQscil7cmV0dXJuIGU9cmVwbGFjZUFsbChlLFwiXFxcXC5cIit0LFwiLlwiK3IpfWZ1bmN0aW9uIHJlcGxhY2VBbGwoZSx0LHIpe3JldHVybiBlLnJlcGxhY2UobmV3IFJlZ0V4cCh0LFwiZ1wiKSxyKX1mdW5jdGlvbiBsb2FkRG9jdW1lbnQoZSx0KXtyZXR1cm4gbG9hZERvY3VtZW50U3R5bGVzKGUsdCksbG9hZERvY3VtZW50TGlua3MoZSx0KS50aGVuKChmdW5jdGlvbigpe3VwZGF0ZUdsb2JhbFNjb3Blcyh0KTt9KSl9ZnVuY3Rpb24gc3RhcnRXYXRjaGVyKGUsdCl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXImJm5ldyBNdXRhdGlvbk9ic2VydmVyKChmdW5jdGlvbigpe2xvYWREb2N1bWVudFN0eWxlcyhlLHQpJiZ1cGRhdGVHbG9iYWxTY29wZXModCk7fSkpLm9ic2VydmUoZG9jdW1lbnQuaGVhZCx7Y2hpbGRMaXN0OiEwfSk7fWZ1bmN0aW9uIGxvYWREb2N1bWVudExpbmtzKGUsdCl7Zm9yKHZhciByPVtdLG49ZS5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl1baHJlZl06bm90KFtkYXRhLW5vLXNoaW1dKScpLHM9MDtzPG4ubGVuZ3RoO3MrKylyLnB1c2goYWRkR2xvYmFsTGluayhlLHQsbltzXSkpO3JldHVybiBQcm9taXNlLmFsbChyKX1mdW5jdGlvbiBsb2FkRG9jdW1lbnRTdHlsZXMoZSx0KXtyZXR1cm4gQXJyYXkuZnJvbShlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdHlsZTpub3QoW2RhdGEtc3R5bGVzXSk6bm90KFtkYXRhLW5vLXNoaW1dKVwiKSkubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gYWRkR2xvYmFsU3R5bGUodCxlKX0pKS5zb21lKEJvb2xlYW4pfWZ1bmN0aW9uIGFkZEdsb2JhbExpbmsoZSx0LHIpe3ZhciBuPXIuaHJlZjtyZXR1cm4gZmV0Y2gobikudGhlbigoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGV4dCgpfSkpLnRoZW4oKGZ1bmN0aW9uKHMpe2lmKGhhc0Nzc1ZhcmlhYmxlcyhzKSYmci5wYXJlbnROb2RlKXtoYXNSZWxhdGl2ZVVybHMocykmJihzPWZpeFJlbGF0aXZlVXJscyhzLG4pKTt2YXIgbz1lLmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtvLnNldEF0dHJpYnV0ZShcImRhdGEtc3R5bGVzXCIsXCJcIiksby50ZXh0Q29udGVudD1zLGFkZEdsb2JhbFN0eWxlKHQsbyksci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShvLHIpLHIucmVtb3ZlKCk7fX0pKS5jYXRjaCgoZnVuY3Rpb24oZSl7Y29uc29sZS5lcnJvcihlKTt9KSl9dmFyIENTU19WQVJJQUJMRV9SRUdFWFA9L1tcXHM7e10tLVstYS16QS1aMC05XStcXHMqOi9tO2Z1bmN0aW9uIGhhc0Nzc1ZhcmlhYmxlcyhlKXtyZXR1cm4gZS5pbmRleE9mKFwidmFyKFwiKT4tMXx8Q1NTX1ZBUklBQkxFX1JFR0VYUC50ZXN0KGUpfXZhciBDU1NfVVJMX1JFR0VYUD0vdXJsW1xcc10qXFwoW1xcc10qWydcIl0/KD8hKD86aHR0cHM/fGRhdGEpXFw6fFxcLykoW15cXCdcXFwiXFwpXSopW1xcc10qWydcIl0/XFwpW1xcc10qL2dpbTtmdW5jdGlvbiBoYXNSZWxhdGl2ZVVybHMoZSl7cmV0dXJuIENTU19VUkxfUkVHRVhQLmxhc3RJbmRleD0wLENTU19VUkxfUkVHRVhQLnRlc3QoZSl9ZnVuY3Rpb24gZml4UmVsYXRpdmVVcmxzKGUsdCl7dmFyIHI9dC5yZXBsYWNlKC9bXi9dKiQvLFwiXCIpO3JldHVybiBlLnJlcGxhY2UoQ1NTX1VSTF9SRUdFWFAsKGZ1bmN0aW9uKGUsdCl7dmFyIG49cit0O3JldHVybiBlLnJlcGxhY2UodCxuKX0pKX12YXIgQ3VzdG9tU3R5bGU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7dGhpcy53aW49ZSx0aGlzLmRvYz10LHRoaXMuY291bnQ9MCx0aGlzLmhvc3RTdHlsZU1hcD1uZXcgV2Vha01hcCx0aGlzLmhvc3RTY29wZU1hcD1uZXcgV2Vha01hcCx0aGlzLmdsb2JhbFNjb3Blcz1bXSx0aGlzLnNjb3Blc01hcD1uZXcgTWFwLHRoaXMuZGlkSW5pdD0hMTt9cmV0dXJuIGUucHJvdG90eXBlLmk9ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3JldHVybiB0aGlzLmRpZEluaXR8fCF0aGlzLndpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU/UHJvbWlzZS5yZXNvbHZlKCk6KHRoaXMuZGlkSW5pdD0hMCxuZXcgUHJvbWlzZSgoZnVuY3Rpb24odCl7ZS53aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKChmdW5jdGlvbigpe3N0YXJ0V2F0Y2hlcihlLmRvYyxlLmdsb2JhbFNjb3BlcyksbG9hZERvY3VtZW50KGUuZG9jLGUuZ2xvYmFsU2NvcGVzKS50aGVuKChmdW5jdGlvbigpe3JldHVybiB0KCl9KSk7fSkpO30pKSl9LGUucHJvdG90eXBlLmFkZExpbms9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztyZXR1cm4gYWRkR2xvYmFsTGluayh0aGlzLmRvYyx0aGlzLmdsb2JhbFNjb3BlcyxlKS50aGVuKChmdW5jdGlvbigpe3QudXBkYXRlR2xvYmFsKCk7fSkpfSxlLnByb3RvdHlwZS5hZGRHbG9iYWxTdHlsZT1mdW5jdGlvbihlKXthZGRHbG9iYWxTdHlsZSh0aGlzLmdsb2JhbFNjb3BlcyxlKSYmdGhpcy51cGRhdGVHbG9iYWwoKTt9LGUucHJvdG90eXBlLmNyZWF0ZUhvc3RTdHlsZT1mdW5jdGlvbihlLHQscixuKXtpZih0aGlzLmhvc3RTY29wZU1hcC5oYXMoZSkpdGhyb3cgbmV3IEVycm9yKFwiaG9zdCBzdHlsZSBhbHJlYWR5IGNyZWF0ZWRcIik7dmFyIHM9dGhpcy5yZWdpc3Rlckhvc3RUZW1wbGF0ZShyLHQsbiksbz10aGlzLmRvYy5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7cmV0dXJuIG8uc2V0QXR0cmlidXRlKFwiZGF0YS1uby1zaGltXCIsXCJcIikscy51c2VzQ3NzVmFycz9uPyhvW1wicy1zY1wiXT10PXMuc2NvcGVJZCtcIi1cIit0aGlzLmNvdW50LG8udGV4dENvbnRlbnQ9XCIvKm5lZWRzIHVwZGF0ZSovXCIsdGhpcy5ob3N0U3R5bGVNYXAuc2V0KGUsbyksdGhpcy5ob3N0U2NvcGVNYXAuc2V0KGUscmVTY29wZShzLHQpKSx0aGlzLmNvdW50KyspOihzLnN0eWxlRWw9byxzLnVzZXNDc3NWYXJzfHwoby50ZXh0Q29udGVudD1leGVjdXRlVGVtcGxhdGUocy50ZW1wbGF0ZSx7fSkpLHRoaXMuZ2xvYmFsU2NvcGVzLnB1c2gocyksdGhpcy51cGRhdGVHbG9iYWwoKSx0aGlzLmhvc3RTY29wZU1hcC5zZXQoZSxzKSk6by50ZXh0Q29udGVudD1yLG99LGUucHJvdG90eXBlLnJlbW92ZUhvc3Q9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5ob3N0U3R5bGVNYXAuZ2V0KGUpO3QmJnQucmVtb3ZlKCksdGhpcy5ob3N0U3R5bGVNYXAuZGVsZXRlKGUpLHRoaXMuaG9zdFNjb3BlTWFwLmRlbGV0ZShlKTt9LGUucHJvdG90eXBlLnVwZGF0ZUhvc3Q9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5ob3N0U2NvcGVNYXAuZ2V0KGUpO2lmKHQmJnQudXNlc0Nzc1ZhcnMmJnQuaXNTY29wZWQpe3ZhciByPXRoaXMuaG9zdFN0eWxlTWFwLmdldChlKTtpZihyKXt2YXIgbj1yZXNvbHZlVmFsdWVzKGdldEFjdGl2ZVNlbGVjdG9ycyhlLHRoaXMuaG9zdFNjb3BlTWFwLHRoaXMuZ2xvYmFsU2NvcGVzKSk7ci50ZXh0Q29udGVudD1leGVjdXRlVGVtcGxhdGUodC50ZW1wbGF0ZSxuKTt9fX0sZS5wcm90b3R5cGUudXBkYXRlR2xvYmFsPWZ1bmN0aW9uKCl7dXBkYXRlR2xvYmFsU2NvcGVzKHRoaXMuZ2xvYmFsU2NvcGVzKTt9LGUucHJvdG90eXBlLnJlZ2lzdGVySG9zdFRlbXBsYXRlPWZ1bmN0aW9uKGUsdCxyKXt2YXIgbj10aGlzLnNjb3Blc01hcC5nZXQodCk7cmV0dXJuIG58fCgobj1wYXJzZUNTUyhlKSkuc2NvcGVJZD10LG4uaXNTY29wZWQ9cix0aGlzLnNjb3Blc01hcC5zZXQodCxuKSksbn0sZX0oKTshZnVuY3Rpb24oZSl7IWV8fGUuX19jc3NzaGltfHxlLkNTUyYmZS5DU1Muc3VwcG9ydHMmJmUuQ1NTLnN1cHBvcnRzKFwiY29sb3JcIixcInZhcigtLWMpXCIpfHwoZS5fX2Nzc3NoaW09bmV3IEN1c3RvbVN0eWxlKGUsZS5kb2N1bWVudCkpO30oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93KTtcbiJdfQ==