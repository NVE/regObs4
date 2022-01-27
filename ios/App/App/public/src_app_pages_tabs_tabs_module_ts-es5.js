(function () {
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_tabs_tabs_module_ts"], {
    /***/
    73008: function _(__unused_webpack_module, exports) {
      /*
       * Leaflet.markercluster 1.5.1+master.01e74ec,
       * Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
       * https://github.com/Leaflet/Leaflet.markercluster
       * (c) 2012-2017, Dave Leaver, smartrak
       */
      (function (global, factory) {
        true ? factory(exports) : 0;
      })(this, function (exports) {
        'use strict';
        /*
         * L.MarkerClusterGroup extends L.FeatureGroup by clustering the markers contained within
         */

        var MarkerClusterGroup = L.MarkerClusterGroup = L.FeatureGroup.extend({
          options: {
            maxClusterRadius: 80,
            //A cluster will cover at most this many pixels from its center
            iconCreateFunction: null,
            clusterPane: L.Marker.prototype.options.pane,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: true,
            singleMarkerMode: false,
            disableClusteringAtZoom: null,
            // Setting this to false prevents the removal of any clusters outside of the viewpoint, which
            // is the default behaviour for performance reasons.
            removeOutsideVisibleBounds: true,
            // Set to false to disable all animations (zoom and spiderfy).
            // If false, option animateAddingMarkers below has no effect.
            // If L.DomUtil.TRANSITION is falsy, this option has no effect.
            animate: true,
            //Whether to animate adding markers after adding the MarkerClusterGroup to the map
            // If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
            animateAddingMarkers: false,
            // Make it possible to provide custom function to calculate spiderfy shape positions
            spiderfyShapePositions: null,
            //Increase to increase the distance away that spiderfied markers appear from the center
            spiderfyDistanceMultiplier: 1,
            // Make it possible to specify a polyline options on a spider leg
            spiderLegPolylineOptions: {
              weight: 1.5,
              color: '#222',
              opacity: 0.5
            },
            // When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
            chunkedLoading: false,
            chunkInterval: 200,
            // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
            chunkDelay: 50,
            // at the end of each interval, give n milliseconds back to system/browser
            chunkProgress: null,
            // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)
            //Options to pass to the L.Polygon constructor
            polygonOptions: {}
          },
          initialize: function initialize(options) {
            L.Util.setOptions(this, options);

            if (!this.options.iconCreateFunction) {
              this.options.iconCreateFunction = this._defaultIconCreateFunction;
            }

            this._featureGroup = L.featureGroup();

            this._featureGroup.addEventParent(this);

            this._nonPointGroup = L.featureGroup();

            this._nonPointGroup.addEventParent(this);

            this._inZoomAnimation = 0;
            this._needsClustering = [];
            this._needsRemoving = []; //Markers removed while we aren't on the map need to be kept track of
            //The bounds of the currently shown area (from _getExpandedVisibleBounds) Updated on zoom/move

            this._currentShownBounds = null;
            this._queue = [];
            this._childMarkerEventHandlers = {
              'dragstart': this._childMarkerDragStart,
              'move': this._childMarkerMoved,
              'dragend': this._childMarkerDragEnd
            }; // Hook the appropriate animation methods.

            var animate = L.DomUtil.TRANSITION && this.options.animate;
            L.extend(this, animate ? this._withAnimation : this._noAnimation); // Remember which MarkerCluster class to instantiate (animated or not).

            this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated;
          },
          addLayer: function addLayer(layer) {
            if (layer instanceof L.LayerGroup) {
              return this.addLayers([layer]);
            } //Don't cluster non point data


            if (!layer.getLatLng) {
              this._nonPointGroup.addLayer(layer);

              this.fire('layeradd', {
                layer: layer
              });
              return this;
            }

            if (!this._map) {
              this._needsClustering.push(layer);

              this.fire('layeradd', {
                layer: layer
              });
              return this;
            }

            if (this.hasLayer(layer)) {
              return this;
            } //If we have already clustered we'll need to add this one to a cluster


            if (this._unspiderfy) {
              this._unspiderfy();
            }

            this._addLayer(layer, this._maxZoom);

            this.fire('layeradd', {
              layer: layer
            }); // Refresh bounds and weighted positions.

            this._topClusterLevel._recalculateBounds();

            this._refreshClustersIcons(); //Work out what is visible


            var visibleLayer = layer,
                currentZoom = this._zoom;

            if (layer.__parent) {
              while (visibleLayer.__parent._zoom >= currentZoom) {
                visibleLayer = visibleLayer.__parent;
              }
            }

            if (this._currentShownBounds.contains(visibleLayer.getLatLng())) {
              if (this.options.animateAddingMarkers) {
                this._animationAddLayer(layer, visibleLayer);
              } else {
                this._animationAddLayerNonAnimated(layer, visibleLayer);
              }
            }

            return this;
          },
          removeLayer: function removeLayer(layer) {
            if (layer instanceof L.LayerGroup) {
              return this.removeLayers([layer]);
            } //Non point layers


            if (!layer.getLatLng) {
              this._nonPointGroup.removeLayer(layer);

              this.fire('layerremove', {
                layer: layer
              });
              return this;
            }

            if (!this._map) {
              if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
                this._needsRemoving.push({
                  layer: layer,
                  latlng: layer._latlng
                });
              }

              this.fire('layerremove', {
                layer: layer
              });
              return this;
            }

            if (!layer.__parent) {
              return this;
            }

            if (this._unspiderfy) {
              this._unspiderfy();

              this._unspiderfyLayer(layer);
            } //Remove the marker from clusters


            this._removeLayer(layer, true);

            this.fire('layerremove', {
              layer: layer
            }); // Refresh bounds and weighted positions.

            this._topClusterLevel._recalculateBounds();

            this._refreshClustersIcons();

            layer.off(this._childMarkerEventHandlers, this);

            if (this._featureGroup.hasLayer(layer)) {
              this._featureGroup.removeLayer(layer);

              if (layer.clusterShow) {
                layer.clusterShow();
              }
            }

            return this;
          },
          //Takes an array of markers and adds them in bulk
          addLayers: function addLayers(layersArray, skipLayerAddEvent) {
            if (!L.Util.isArray(layersArray)) {
              return this.addLayer(layersArray);
            }

            var fg = this._featureGroup,
                npg = this._nonPointGroup,
                chunked = this.options.chunkedLoading,
                chunkInterval = this.options.chunkInterval,
                chunkProgress = this.options.chunkProgress,
                l = layersArray.length,
                offset = 0,
                originalArray = true,
                m;

            if (this._map) {
              var started = new Date().getTime();
              var process = L.bind(function () {
                var start = new Date().getTime(); // Make sure to unspiderfy before starting to add some layers

                if (this._map && this._unspiderfy) {
                  this._unspiderfy();
                }

                for (; offset < l; offset++) {
                  if (chunked && offset % 200 === 0) {
                    // every couple hundred markers, instrument the time elapsed since processing started:
                    var elapsed = new Date().getTime() - start;

                    if (elapsed > chunkInterval) {
                      break; // been working too hard, time to take a break :-)
                    }
                  }

                  m = layersArray[offset]; // Group of layers, append children to layersArray and skip.
                  // Side effects:
                  // - Total increases, so chunkProgress ratio jumps backward.
                  // - Groups are not included in this group, only their non-group child layers (hasLayer).
                  // Changing array length while looping does not affect performance in current browsers:
                  // http://jsperf.com/for-loop-changing-length/6

                  if (m instanceof L.LayerGroup) {
                    if (originalArray) {
                      layersArray = layersArray.slice();
                      originalArray = false;
                    }

                    this._extractNonGroupLayers(m, layersArray);

                    l = layersArray.length;
                    continue;
                  } //Not point data, can't be clustered


                  if (!m.getLatLng) {
                    npg.addLayer(m);

                    if (!skipLayerAddEvent) {
                      this.fire('layeradd', {
                        layer: m
                      });
                    }

                    continue;
                  }

                  if (this.hasLayer(m)) {
                    continue;
                  }

                  this._addLayer(m, this._maxZoom);

                  if (!skipLayerAddEvent) {
                    this.fire('layeradd', {
                      layer: m
                    });
                  } //If we just made a cluster of size 2 then we need to remove the other marker from the map (if it is) or we never will


                  if (m.__parent) {
                    if (m.__parent.getChildCount() === 2) {
                      var markers = m.__parent.getAllChildMarkers(),
                          otherMarker = markers[0] === m ? markers[1] : markers[0];

                      fg.removeLayer(otherMarker);
                    }
                  }
                }

                if (chunkProgress) {
                  // report progress and time elapsed:
                  chunkProgress(offset, l, new Date().getTime() - started);
                } // Completed processing all markers.


                if (offset === l) {
                  // Refresh bounds and weighted positions.
                  this._topClusterLevel._recalculateBounds();

                  this._refreshClustersIcons();

                  this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
                } else {
                  setTimeout(process, this.options.chunkDelay);
                }
              }, this);
              process();
            } else {
              var needsClustering = this._needsClustering;

              for (; offset < l; offset++) {
                m = layersArray[offset]; // Group of layers, append children to layersArray and skip.

                if (m instanceof L.LayerGroup) {
                  if (originalArray) {
                    layersArray = layersArray.slice();
                    originalArray = false;
                  }

                  this._extractNonGroupLayers(m, layersArray);

                  l = layersArray.length;
                  continue;
                } //Not point data, can't be clustered


                if (!m.getLatLng) {
                  npg.addLayer(m);
                  continue;
                }

                if (this.hasLayer(m)) {
                  continue;
                }

                needsClustering.push(m);
              }
            }

            return this;
          },
          //Takes an array of markers and removes them in bulk
          removeLayers: function removeLayers(layersArray) {
            var i,
                m,
                l = layersArray.length,
                fg = this._featureGroup,
                npg = this._nonPointGroup,
                originalArray = true;

            if (!this._map) {
              for (i = 0; i < l; i++) {
                m = layersArray[i]; // Group of layers, append children to layersArray and skip.

                if (m instanceof L.LayerGroup) {
                  if (originalArray) {
                    layersArray = layersArray.slice();
                    originalArray = false;
                  }

                  this._extractNonGroupLayers(m, layersArray);

                  l = layersArray.length;
                  continue;
                }

                this._arraySplice(this._needsClustering, m);

                npg.removeLayer(m);

                if (this.hasLayer(m)) {
                  this._needsRemoving.push({
                    layer: m,
                    latlng: m._latlng
                  });
                }

                this.fire('layerremove', {
                  layer: m
                });
              }

              return this;
            }

            if (this._unspiderfy) {
              this._unspiderfy(); // Work on a copy of the array, so that next loop is not affected.


              var layersArray2 = layersArray.slice(),
                  l2 = l;

              for (i = 0; i < l2; i++) {
                m = layersArray2[i]; // Group of layers, append children to layersArray and skip.

                if (m instanceof L.LayerGroup) {
                  this._extractNonGroupLayers(m, layersArray2);

                  l2 = layersArray2.length;
                  continue;
                }

                this._unspiderfyLayer(m);
              }
            }

            for (i = 0; i < l; i++) {
              m = layersArray[i]; // Group of layers, append children to layersArray and skip.

              if (m instanceof L.LayerGroup) {
                if (originalArray) {
                  layersArray = layersArray.slice();
                  originalArray = false;
                }

                this._extractNonGroupLayers(m, layersArray);

                l = layersArray.length;
                continue;
              }

              if (!m.__parent) {
                npg.removeLayer(m);
                this.fire('layerremove', {
                  layer: m
                });
                continue;
              }

              this._removeLayer(m, true, true);

              this.fire('layerremove', {
                layer: m
              });

              if (fg.hasLayer(m)) {
                fg.removeLayer(m);

                if (m.clusterShow) {
                  m.clusterShow();
                }
              }
            } // Refresh bounds and weighted positions.


            this._topClusterLevel._recalculateBounds();

            this._refreshClustersIcons(); //Fix up the clusters and markers on the map


            this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);

            return this;
          },
          //Removes all layers from the MarkerClusterGroup
          clearLayers: function clearLayers() {
            //Need our own special implementation as the LayerGroup one doesn't work for us
            //If we aren't on the map (yet), blow away the markers we know of
            if (!this._map) {
              this._needsClustering = [];
              this._needsRemoving = [];
              delete this._gridClusters;
              delete this._gridUnclustered;
            }

            if (this._noanimationUnspiderfy) {
              this._noanimationUnspiderfy();
            } //Remove all the visible layers


            this._featureGroup.clearLayers();

            this._nonPointGroup.clearLayers();

            this.eachLayer(function (marker) {
              marker.off(this._childMarkerEventHandlers, this);
              delete marker.__parent;
            }, this);

            if (this._map) {
              //Reset _topClusterLevel and the DistanceGrids
              this._generateInitialClusters();
            }

            return this;
          },
          //Override FeatureGroup.getBounds as it doesn't work
          getBounds: function getBounds() {
            var bounds = new L.LatLngBounds();

            if (this._topClusterLevel) {
              bounds.extend(this._topClusterLevel._bounds);
            }

            for (var i = this._needsClustering.length - 1; i >= 0; i--) {
              bounds.extend(this._needsClustering[i].getLatLng());
            }

            bounds.extend(this._nonPointGroup.getBounds());
            return bounds;
          },
          //Overrides LayerGroup.eachLayer
          eachLayer: function eachLayer(method, context) {
            var markers = this._needsClustering.slice(),
                needsRemoving = this._needsRemoving,
                thisNeedsRemoving,
                i,
                j;

            if (this._topClusterLevel) {
              this._topClusterLevel.getAllChildMarkers(markers);
            }

            for (i = markers.length - 1; i >= 0; i--) {
              thisNeedsRemoving = true;

              for (j = needsRemoving.length - 1; j >= 0; j--) {
                if (needsRemoving[j].layer === markers[i]) {
                  thisNeedsRemoving = false;
                  break;
                }
              }

              if (thisNeedsRemoving) {
                method.call(context, markers[i]);
              }
            }

            this._nonPointGroup.eachLayer(method, context);
          },
          //Overrides LayerGroup.getLayers
          getLayers: function getLayers() {
            var layers = [];
            this.eachLayer(function (l) {
              layers.push(l);
            });
            return layers;
          },
          //Overrides LayerGroup.getLayer, WARNING: Really bad performance
          getLayer: function getLayer(id) {
            var result = null;
            id = parseInt(id, 10);
            this.eachLayer(function (l) {
              if (L.stamp(l) === id) {
                result = l;
              }
            });
            return result;
          },
          //Returns true if the given layer is in this MarkerClusterGroup
          hasLayer: function hasLayer(layer) {
            if (!layer) {
              return false;
            }

            var i,
                anArray = this._needsClustering;

            for (i = anArray.length - 1; i >= 0; i--) {
              if (anArray[i] === layer) {
                return true;
              }
            }

            anArray = this._needsRemoving;

            for (i = anArray.length - 1; i >= 0; i--) {
              if (anArray[i].layer === layer) {
                return false;
              }
            }

            return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer);
          },
          //Zoom down to show the given layer (spiderfying if necessary) then calls the callback
          zoomToShowLayer: function zoomToShowLayer(layer, callback) {
            var map = this._map;

            if (typeof callback !== 'function') {
              callback = function callback() {};
            }

            var showMarker = function showMarker() {
              // Assumes that map.hasLayer checks for direct appearance on map, not recursively calling
              // hasLayer on Layer Groups that are on map (typically not calling this MarkerClusterGroup.hasLayer, which would always return true)
              if ((map.hasLayer(layer) || map.hasLayer(layer.__parent)) && !this._inZoomAnimation) {
                this._map.off('moveend', showMarker, this);

                this.off('animationend', showMarker, this);

                if (map.hasLayer(layer)) {
                  callback();
                } else if (layer.__parent._icon) {
                  this.once('spiderfied', callback, this);

                  layer.__parent.spiderfy();
                }
              }
            };

            if (layer._icon && this._map.getBounds().contains(layer.getLatLng())) {
              //Layer is visible ond on screen, immediate return
              callback();
            } else if (layer.__parent._zoom < Math.round(this._map._zoom)) {
              //Layer should be visible at this zoom level. It must not be on screen so just pan over to it
              this._map.on('moveend', showMarker, this);

              this._map.panTo(layer.getLatLng());
            } else {
              this._map.on('moveend', showMarker, this);

              this.on('animationend', showMarker, this);

              layer.__parent.zoomToBounds();
            }
          },
          //Overrides FeatureGroup.onAdd
          onAdd: function onAdd(map) {
            this._map = map;
            var i, l, layer;

            if (!isFinite(this._map.getMaxZoom())) {
              throw "Map has no maxZoom specified";
            }

            this._featureGroup.addTo(map);

            this._nonPointGroup.addTo(map);

            if (!this._gridClusters) {
              this._generateInitialClusters();
            }

            this._maxLat = map.options.crs.projection.MAX_LATITUDE; //Restore all the positions as they are in the MCG before removing them

            for (i = 0, l = this._needsRemoving.length; i < l; i++) {
              layer = this._needsRemoving[i];
              layer.newlatlng = layer.layer._latlng;
              layer.layer._latlng = layer.latlng;
            } //Remove them, then restore their new positions


            for (i = 0, l = this._needsRemoving.length; i < l; i++) {
              layer = this._needsRemoving[i];

              this._removeLayer(layer.layer, true);

              layer.layer._latlng = layer.newlatlng;
            }

            this._needsRemoving = []; //Remember the current zoom level and bounds

            this._zoom = Math.round(this._map._zoom);
            this._currentShownBounds = this._getExpandedVisibleBounds();

            this._map.on('zoomend', this._zoomEnd, this);

            this._map.on('moveend', this._moveEnd, this);

            if (this._spiderfierOnAdd) {
              //TODO FIXME: Not sure how to have spiderfier add something on here nicely
              this._spiderfierOnAdd();
            }

            this._bindEvents(); //Actually add our markers to the map:


            l = this._needsClustering;
            this._needsClustering = [];
            this.addLayers(l, true);
          },
          //Overrides FeatureGroup.onRemove
          onRemove: function onRemove(map) {
            map.off('zoomend', this._zoomEnd, this);
            map.off('moveend', this._moveEnd, this);

            this._unbindEvents(); //In case we are in a cluster animation


            this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');

            if (this._spiderfierOnRemove) {
              //TODO FIXME: Not sure how to have spiderfier add something on here nicely
              this._spiderfierOnRemove();
            }

            delete this._maxLat; //Clean up all the layers we added to the map

            this._hideCoverage();

            this._featureGroup.remove();

            this._nonPointGroup.remove();

            this._featureGroup.clearLayers();

            this._map = null;
          },
          getVisibleParent: function getVisibleParent(marker) {
            var vMarker = marker;

            while (vMarker && !vMarker._icon) {
              vMarker = vMarker.__parent;
            }

            return vMarker || null;
          },
          //Remove the given object from the given array
          _arraySplice: function _arraySplice(anArray, obj) {
            for (var i = anArray.length - 1; i >= 0; i--) {
              if (anArray[i] === obj) {
                anArray.splice(i, 1);
                return true;
              }
            }
          },

          /**
           * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
           * @param marker to be removed from _gridUnclustered.
           * @param z integer bottom start zoom level (included)
           * @private
           */
          _removeFromGridUnclustered: function _removeFromGridUnclustered(marker, z) {
            var map = this._map,
                gridUnclustered = this._gridUnclustered,
                minZoom = Math.floor(this._map.getMinZoom());

            for (; z >= minZoom; z--) {
              if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) {
                break;
              }
            }
          },
          _childMarkerDragStart: function _childMarkerDragStart(e) {
            e.target.__dragStart = e.target._latlng;
          },
          _childMarkerMoved: function _childMarkerMoved(e) {
            if (!this._ignoreMove && !e.target.__dragStart) {
              var isPopupOpen = e.target._popup && e.target._popup.isOpen();

              this._moveChild(e.target, e.oldLatLng, e.latlng);

              if (isPopupOpen) {
                e.target.openPopup();
              }
            }
          },
          _moveChild: function _moveChild(layer, from, to) {
            layer._latlng = from;
            this.removeLayer(layer);
            layer._latlng = to;
            this.addLayer(layer);
          },
          _childMarkerDragEnd: function _childMarkerDragEnd(e) {
            var dragStart = e.target.__dragStart;
            delete e.target.__dragStart;

            if (dragStart) {
              this._moveChild(e.target, dragStart, e.target._latlng);
            }
          },
          //Internal function for removing a marker from everything.
          //dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
          _removeLayer: function _removeLayer(marker, removeFromDistanceGrid, dontUpdateMap) {
            var gridClusters = this._gridClusters,
                gridUnclustered = this._gridUnclustered,
                fg = this._featureGroup,
                map = this._map,
                minZoom = Math.floor(this._map.getMinZoom()); //Remove the marker from distance clusters it might be in

            if (removeFromDistanceGrid) {
              this._removeFromGridUnclustered(marker, this._maxZoom);
            } //Work our way up the clusters removing them as we go if required


            var cluster = marker.__parent,
                markers = cluster._markers,
                otherMarker; //Remove the marker from the immediate parents marker list

            this._arraySplice(markers, marker);

            while (cluster) {
              cluster._childCount--;
              cluster._boundsNeedUpdate = true;

              if (cluster._zoom < minZoom) {
                //Top level, do nothing
                break;
              } else if (removeFromDistanceGrid && cluster._childCount <= 1) {
                //Cluster no longer required
                //We need to push the other marker up to the parent
                otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0]; //Update distance grid

                gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom));

                gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom)); //Move otherMarker up to parent


                this._arraySplice(cluster.__parent._childClusters, cluster);

                cluster.__parent._markers.push(otherMarker);

                otherMarker.__parent = cluster.__parent;

                if (cluster._icon) {
                  //Cluster is currently on the map, need to put the marker on the map instead
                  fg.removeLayer(cluster);

                  if (!dontUpdateMap) {
                    fg.addLayer(otherMarker);
                  }
                }
              } else {
                cluster._iconNeedsUpdate = true;
              }

              cluster = cluster.__parent;
            }

            delete marker.__parent;
          },
          _isOrIsParent: function _isOrIsParent(el, oel) {
            while (oel) {
              if (el === oel) {
                return true;
              }

              oel = oel.parentNode;
            }

            return false;
          },
          //Override L.Evented.fire
          fire: function fire(type, data, propagate) {
            if (data && data.layer instanceof L.MarkerCluster) {
              //Prevent multiple clustermouseover/off events if the icon is made up of stacked divs (Doesn't work in ie <= 8, no relatedTarget)
              if (data.originalEvent && this._isOrIsParent(data.layer._icon, data.originalEvent.relatedTarget)) {
                return;
              }

              type = 'cluster' + type;
            }

            L.FeatureGroup.prototype.fire.call(this, type, data, propagate);
          },
          //Override L.Evented.listens
          listens: function listens(type, propagate) {
            return L.FeatureGroup.prototype.listens.call(this, type, propagate) || L.FeatureGroup.prototype.listens.call(this, 'cluster' + type, propagate);
          },
          //Default functionality
          _defaultIconCreateFunction: function _defaultIconCreateFunction(cluster) {
            var childCount = cluster.getChildCount();
            var c = ' marker-cluster-';

            if (childCount < 10) {
              c += 'small';
            } else if (childCount < 100) {
              c += 'medium';
            } else {
              c += 'large';
            }

            return new L.DivIcon({
              html: '<div><span>' + childCount + '</span></div>',
              className: 'marker-cluster' + c,
              iconSize: new L.Point(40, 40)
            });
          },
          _bindEvents: function _bindEvents() {
            var map = this._map,
                spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
                showCoverageOnHover = this.options.showCoverageOnHover,
                zoomToBoundsOnClick = this.options.zoomToBoundsOnClick; //Zoom on cluster click or spiderfy if we are at the lowest level

            if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
              this.on('clusterclick clusterkeypress', this._zoomOrSpiderfy, this);
            } //Show convex hull (boundary) polygon on mouse over


            if (showCoverageOnHover) {
              this.on('clustermouseover', this._showCoverage, this);
              this.on('clustermouseout', this._hideCoverage, this);
              map.on('zoomend', this._hideCoverage, this);
            }
          },
          _zoomOrSpiderfy: function _zoomOrSpiderfy(e) {
            var cluster = e.layer,
                bottomCluster = cluster;

            if (e.type === 'clusterkeypress' && e.originalEvent && e.originalEvent.keyCode !== 13) {
              return;
            }

            while (bottomCluster._childClusters.length === 1) {
              bottomCluster = bottomCluster._childClusters[0];
            }

            if (bottomCluster._zoom === this._maxZoom && bottomCluster._childCount === cluster._childCount && this.options.spiderfyOnMaxZoom) {
              // All child markers are contained in a single cluster from this._maxZoom to this cluster.
              cluster.spiderfy();
            } else if (this.options.zoomToBoundsOnClick) {
              cluster.zoomToBounds();
            } // Focus the map again for keyboard users.


            if (e.originalEvent && e.originalEvent.keyCode === 13) {
              this._map._container.focus();
            }
          },
          _showCoverage: function _showCoverage(e) {
            var map = this._map;

            if (this._inZoomAnimation) {
              return;
            }

            if (this._shownPolygon) {
              map.removeLayer(this._shownPolygon);
            }

            if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
              this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions);
              map.addLayer(this._shownPolygon);
            }
          },
          _hideCoverage: function _hideCoverage() {
            if (this._shownPolygon) {
              this._map.removeLayer(this._shownPolygon);

              this._shownPolygon = null;
            }
          },
          _unbindEvents: function _unbindEvents() {
            var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
                showCoverageOnHover = this.options.showCoverageOnHover,
                zoomToBoundsOnClick = this.options.zoomToBoundsOnClick,
                map = this._map;

            if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
              this.off('clusterclick clusterkeypress', this._zoomOrSpiderfy, this);
            }

            if (showCoverageOnHover) {
              this.off('clustermouseover', this._showCoverage, this);
              this.off('clustermouseout', this._hideCoverage, this);
              map.off('zoomend', this._hideCoverage, this);
            }
          },
          _zoomEnd: function _zoomEnd() {
            if (!this._map) {
              //May have been removed from the map by a zoomEnd handler
              return;
            }

            this._mergeSplitClusters();

            this._zoom = Math.round(this._map._zoom);
            this._currentShownBounds = this._getExpandedVisibleBounds();
          },
          _moveEnd: function _moveEnd() {
            if (this._inZoomAnimation) {
              return;
            }

            var newBounds = this._getExpandedVisibleBounds();

            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, newBounds);

            this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), newBounds);

            this._currentShownBounds = newBounds;
            return;
          },
          _generateInitialClusters: function _generateInitialClusters() {
            var maxZoom = Math.ceil(this._map.getMaxZoom()),
                minZoom = Math.floor(this._map.getMinZoom()),
                radius = this.options.maxClusterRadius,
                radiusFn = radius; //If we just set maxClusterRadius to a single number, we need to create
            //a simple function to return that number. Otherwise, we just have to
            //use the function we've passed in.

            if (typeof radius !== "function") {
              radiusFn = function radiusFn() {
                return radius;
              };
            }

            if (this.options.disableClusteringAtZoom !== null) {
              maxZoom = this.options.disableClusteringAtZoom - 1;
            }

            this._maxZoom = maxZoom;
            this._gridClusters = {};
            this._gridUnclustered = {}; //Set up DistanceGrids for each zoom

            for (var zoom = maxZoom; zoom >= minZoom; zoom--) {
              this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom));
              this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom));
            } // Instantiate the appropriate L.MarkerCluster class (animated or not).


            this._topClusterLevel = new this._markerCluster(this, minZoom - 1);
          },
          //Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
          _addLayer: function _addLayer(layer, zoom) {
            var gridClusters = this._gridClusters,
                gridUnclustered = this._gridUnclustered,
                minZoom = Math.floor(this._map.getMinZoom()),
                markerPoint,
                z;

            if (this.options.singleMarkerMode) {
              this._overrideMarkerIcon(layer);
            }

            layer.on(this._childMarkerEventHandlers, this); //Find the lowest zoom level to slot this one in

            for (; zoom >= minZoom; zoom--) {
              markerPoint = this._map.project(layer.getLatLng(), zoom); // calculate pixel position
              //Try find a cluster close by

              var closest = gridClusters[zoom].getNearObject(markerPoint);

              if (closest) {
                closest._addChild(layer);

                layer.__parent = closest;
                return;
              } //Try find a marker close by to form a new cluster with


              closest = gridUnclustered[zoom].getNearObject(markerPoint);

              if (closest) {
                var parent = closest.__parent;

                if (parent) {
                  this._removeLayer(closest, false);
                } //Create new cluster with these 2 in it


                var newCluster = new this._markerCluster(this, zoom, closest, layer);
                gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom));
                closest.__parent = newCluster;
                layer.__parent = newCluster; //First create any new intermediate parent clusters that don't exist

                var lastParent = newCluster;

                for (z = zoom - 1; z > parent._zoom; z--) {
                  lastParent = new this._markerCluster(this, z, lastParent);
                  gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z));
                }

                parent._addChild(lastParent); //Remove closest from this zoom level and any above that it is in, replace with newCluster


                this._removeFromGridUnclustered(closest, zoom);

                return;
              } //Didn't manage to cluster in at this zoom, record us as a marker here and continue upwards


              gridUnclustered[zoom].addObject(layer, markerPoint);
            } //Didn't get in anything, add us to the top


            this._topClusterLevel._addChild(layer);

            layer.__parent = this._topClusterLevel;
            return;
          },

          /**
           * Refreshes the icon of all "dirty" visible clusters.
           * Non-visible "dirty" clusters will be updated when they are added to the map.
           * @private
           */
          _refreshClustersIcons: function _refreshClustersIcons() {
            this._featureGroup.eachLayer(function (c) {
              if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
                c._updateIcon();
              }
            });
          },
          //Enqueue code to fire after the marker expand/contract has happened
          _enqueue: function _enqueue(fn) {
            this._queue.push(fn);

            if (!this._queueTimeout) {
              this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300);
            }
          },
          _processQueue: function _processQueue() {
            for (var i = 0; i < this._queue.length; i++) {
              this._queue[i].call(this);
            }

            this._queue.length = 0;
            clearTimeout(this._queueTimeout);
            this._queueTimeout = null;
          },
          //Merge and split any existing clusters that are too big or small
          _mergeSplitClusters: function _mergeSplitClusters() {
            var mapZoom = Math.round(this._map._zoom); //In case we are starting to split before the animation finished

            this._processQueue();

            if (this._zoom < mapZoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) {
              //Zoom in, split
              this._animationStart(); //Remove clusters now off screen


              this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds());

              this._animationZoomIn(this._zoom, mapZoom);
            } else if (this._zoom > mapZoom) {
              //Zoom out, merge
              this._animationStart();

              this._animationZoomOut(this._zoom, mapZoom);
            } else {
              this._moveEnd();
            }
          },
          //Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
          _getExpandedVisibleBounds: function _getExpandedVisibleBounds() {
            if (!this.options.removeOutsideVisibleBounds) {
              return this._mapBoundsInfinite;
            } else if (L.Browser.mobile) {
              return this._checkBoundsMaxLat(this._map.getBounds());
            }

            return this._checkBoundsMaxLat(this._map.getBounds().pad(1)); // Padding expands the bounds by its own dimensions but scaled with the given factor.
          },

          /**
           * Expands the latitude to Infinity (or -Infinity) if the input bounds reach the map projection maximum defined latitude
           * (in the case of Web/Spherical Mercator, it is 85.0511287798 / see https://en.wikipedia.org/wiki/Web_Mercator#Formulas).
           * Otherwise, the removeOutsideVisibleBounds option will remove markers beyond that limit, whereas the same markers without
           * this option (or outside MCG) will have their position floored (ceiled) by the projection and rendered at that limit,
           * making the user think that MCG "eats" them and never displays them again.
           * @param bounds L.LatLngBounds
           * @returns {L.LatLngBounds}
           * @private
           */
          _checkBoundsMaxLat: function _checkBoundsMaxLat(bounds) {
            var maxLat = this._maxLat;

            if (maxLat !== undefined) {
              if (bounds.getNorth() >= maxLat) {
                bounds._northEast.lat = Infinity;
              }

              if (bounds.getSouth() <= -maxLat) {
                bounds._southWest.lat = -Infinity;
              }
            }

            return bounds;
          },
          //Shared animation code
          _animationAddLayerNonAnimated: function _animationAddLayerNonAnimated(layer, newCluster) {
            if (newCluster === layer) {
              this._featureGroup.addLayer(layer);
            } else if (newCluster._childCount === 2) {
              newCluster._addToMap();

              var markers = newCluster.getAllChildMarkers();

              this._featureGroup.removeLayer(markers[0]);

              this._featureGroup.removeLayer(markers[1]);
            } else {
              newCluster._updateIcon();
            }
          },

          /**
           * Extracts individual (i.e. non-group) layers from a Layer Group.
           * @param group to extract layers from.
           * @param output {Array} in which to store the extracted layers.
           * @returns {*|Array}
           * @private
           */
          _extractNonGroupLayers: function _extractNonGroupLayers(group, output) {
            var layers = group.getLayers(),
                i = 0,
                layer;
            output = output || [];

            for (; i < layers.length; i++) {
              layer = layers[i];

              if (layer instanceof L.LayerGroup) {
                this._extractNonGroupLayers(layer, output);

                continue;
              }

              output.push(layer);
            }

            return output;
          },

          /**
           * Implements the singleMarkerMode option.
           * @param layer Marker to re-style using the Clusters iconCreateFunction.
           * @returns {L.Icon} The newly created icon.
           * @private
           */
          _overrideMarkerIcon: function _overrideMarkerIcon(layer) {
            var icon = layer.options.icon = this.options.iconCreateFunction({
              getChildCount: function getChildCount() {
                return 1;
              },
              getAllChildMarkers: function getAllChildMarkers() {
                return [layer];
              }
            });
            return icon;
          }
        }); // Constant bounds used in case option "removeOutsideVisibleBounds" is set to false.

        L.MarkerClusterGroup.include({
          _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity))
        });
        L.MarkerClusterGroup.include({
          _noAnimation: {
            //Non Animated versions of everything
            _animationStart: function _animationStart() {//Do nothing...
            },
            _animationZoomIn: function _animationZoomIn(previousZoomLevel, newZoomLevel) {
              this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);

              this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds()); //We didn't actually animate, but we use this event to mean "clustering animations have finished"


              this.fire('animationend');
            },
            _animationZoomOut: function _animationZoomOut(previousZoomLevel, newZoomLevel) {
              this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);

              this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds()); //We didn't actually animate, but we use this event to mean "clustering animations have finished"


              this.fire('animationend');
            },
            _animationAddLayer: function _animationAddLayer(layer, newCluster) {
              this._animationAddLayerNonAnimated(layer, newCluster);
            }
          },
          _withAnimation: {
            //Animated versions here
            _animationStart: function _animationStart() {
              this._map._mapPane.className += ' leaflet-cluster-anim';
              this._inZoomAnimation++;
            },
            _animationZoomIn: function _animationZoomIn(previousZoomLevel, newZoomLevel) {
              var bounds = this._getExpandedVisibleBounds(),
                  fg = this._featureGroup,
                  minZoom = Math.floor(this._map.getMinZoom()),
                  i;

              this._ignoreMove = true; //Add all children of current clusters to map and remove those clusters from map

              this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function (c) {
                var startPos = c._latlng,
                    markers = c._markers,
                    m;

                if (!bounds.contains(startPos)) {
                  startPos = null;
                }

                if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) {
                  //Immediately add the new child and remove us
                  fg.removeLayer(c);

                  c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
                } else {
                  //Fade out old cluster
                  c.clusterHide();

                  c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
                } //Remove all markers that aren't visible any more
                //TODO: Do we actually need to do this on the higher levels too?


                for (i = markers.length - 1; i >= 0; i--) {
                  m = markers[i];

                  if (!bounds.contains(m._latlng)) {
                    fg.removeLayer(m);
                  }
                }
              });

              this._forceLayout(); //Update opacities


              this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel); //TODO Maybe? Update markers in _recursivelyBecomeVisible


              fg.eachLayer(function (n) {
                if (!(n instanceof L.MarkerCluster) && n._icon) {
                  n.clusterShow();
                }
              }); //update the positions of the just added clusters/markers

              this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function (c) {
                c._recursivelyRestoreChildPositions(newZoomLevel);
              });

              this._ignoreMove = false; //Remove the old clusters and close the zoom animation

              this._enqueue(function () {
                //update the positions of the just added clusters/markers
                this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function (c) {
                  fg.removeLayer(c);
                  c.clusterShow();
                });

                this._animationEnd();
              });
            },
            _animationZoomOut: function _animationZoomOut(previousZoomLevel, newZoomLevel) {
              this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel); //Need to add markers for those that weren't on the map before but are now


              this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds()); //Remove markers that were on the map before but won't be now


              this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel, this._getExpandedVisibleBounds());
            },
            _animationAddLayer: function _animationAddLayer(layer, newCluster) {
              var me = this,
                  fg = this._featureGroup;
              fg.addLayer(layer);

              if (newCluster !== layer) {
                if (newCluster._childCount > 2) {
                  //Was already a cluster
                  newCluster._updateIcon();

                  this._forceLayout();

                  this._animationStart();

                  layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()));

                  layer.clusterHide();

                  this._enqueue(function () {
                    fg.removeLayer(layer);
                    layer.clusterShow();

                    me._animationEnd();
                  });
                } else {
                  //Just became a cluster
                  this._forceLayout();

                  me._animationStart();

                  me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._zoom);
                }
              }
            }
          },
          // Private methods for animated versions.
          _animationZoomOutSingle: function _animationZoomOutSingle(cluster, previousZoomLevel, newZoomLevel) {
            var bounds = this._getExpandedVisibleBounds(),
                minZoom = Math.floor(this._map.getMinZoom()); //Animate all of the markers in the clusters to move to their cluster center point


            cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, minZoom, previousZoomLevel + 1, newZoomLevel);

            var me = this; //Update the opacity (If we immediately set it they won't animate)

            this._forceLayout();

            cluster._recursivelyBecomeVisible(bounds, newZoomLevel); //TODO: Maybe use the transition timing stuff to make this more reliable
            //When the animations are done, tidy up


            this._enqueue(function () {
              //This cluster stopped being a cluster before the timeout fired
              if (cluster._childCount === 1) {
                var m = cluster._markers[0]; //If we were in a cluster animation at the time then the opacity and position of our child could be wrong now, so fix it

                this._ignoreMove = true;
                m.setLatLng(m.getLatLng());
                this._ignoreMove = false;

                if (m.clusterShow) {
                  m.clusterShow();
                }
              } else {
                cluster._recursively(bounds, newZoomLevel, minZoom, function (c) {
                  c._recursivelyRemoveChildrenFromMap(bounds, minZoom, previousZoomLevel + 1);
                });
              }

              me._animationEnd();
            });
          },
          _animationEnd: function _animationEnd() {
            if (this._map) {
              this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');
            }

            this._inZoomAnimation--;
            this.fire('animationend');
          },
          //Force a browser layout of stuff in the map
          // Should apply the current opacity and location to all elements so we can update them again for an animation
          _forceLayout: function _forceLayout() {
            //In my testing this works, infact offsetWidth of any element seems to work.
            //Could loop all this._layers and do this for each _icon if it stops working
            L.Util.falseFn(document.body.offsetWidth);
          }
        });

        L.markerClusterGroup = function (options) {
          return new L.MarkerClusterGroup(options);
        };

        var MarkerCluster = L.MarkerCluster = L.Marker.extend({
          options: L.Icon.prototype.options,
          initialize: function initialize(group, zoom, a, b) {
            L.Marker.prototype.initialize.call(this, a ? a._cLatLng || a.getLatLng() : new L.LatLng(0, 0), {
              icon: this,
              pane: group.options.clusterPane
            });
            this._group = group;
            this._zoom = zoom;
            this._markers = [];
            this._childClusters = [];
            this._childCount = 0;
            this._iconNeedsUpdate = true;
            this._boundsNeedUpdate = true;
            this._bounds = new L.LatLngBounds();

            if (a) {
              this._addChild(a);
            }

            if (b) {
              this._addChild(b);
            }
          },
          //Recursively retrieve all child markers of this cluster
          getAllChildMarkers: function getAllChildMarkers(storageArray, ignoreDraggedMarker) {
            storageArray = storageArray || [];

            for (var i = this._childClusters.length - 1; i >= 0; i--) {
              this._childClusters[i].getAllChildMarkers(storageArray);
            }

            for (var j = this._markers.length - 1; j >= 0; j--) {
              if (ignoreDraggedMarker && this._markers[j].__dragStart) {
                continue;
              }

              storageArray.push(this._markers[j]);
            }

            return storageArray;
          },
          //Returns the count of how many child markers we have
          getChildCount: function getChildCount() {
            return this._childCount;
          },
          //Zoom to the minimum of showing all of the child markers, or the extents of this cluster
          zoomToBounds: function zoomToBounds(fitBoundsOptions) {
            var childClusters = this._childClusters.slice(),
                map = this._group._map,
                boundsZoom = map.getBoundsZoom(this._bounds),
                zoom = this._zoom + 1,
                mapZoom = map.getZoom(),
                i; //calculate how far we need to zoom down to see all of the markers


            while (childClusters.length > 0 && boundsZoom > zoom) {
              zoom++;
              var newClusters = [];

              for (i = 0; i < childClusters.length; i++) {
                newClusters = newClusters.concat(childClusters[i]._childClusters);
              }

              childClusters = newClusters;
            }

            if (boundsZoom > zoom) {
              this._group._map.setView(this._latlng, zoom);
            } else if (boundsZoom <= mapZoom) {
              //If fitBounds wouldn't zoom us down, zoom us down instead
              this._group._map.setView(this._latlng, mapZoom + 1);
            } else {
              this._group._map.fitBounds(this._bounds, fitBoundsOptions);
            }
          },
          getBounds: function getBounds() {
            var bounds = new L.LatLngBounds();
            bounds.extend(this._bounds);
            return bounds;
          },
          _updateIcon: function _updateIcon() {
            this._iconNeedsUpdate = true;

            if (this._icon) {
              this.setIcon(this);
            }
          },
          //Cludge for Icon, we pretend to be an icon for performance
          createIcon: function createIcon() {
            if (this._iconNeedsUpdate) {
              this._iconObj = this._group.options.iconCreateFunction(this);
              this._iconNeedsUpdate = false;
            }

            return this._iconObj.createIcon();
          },
          createShadow: function createShadow() {
            return this._iconObj.createShadow();
          },
          _addChild: function _addChild(new1, isNotificationFromChild) {
            this._iconNeedsUpdate = true;
            this._boundsNeedUpdate = true;

            this._setClusterCenter(new1);

            if (new1 instanceof L.MarkerCluster) {
              if (!isNotificationFromChild) {
                this._childClusters.push(new1);

                new1.__parent = this;
              }

              this._childCount += new1._childCount;
            } else {
              if (!isNotificationFromChild) {
                this._markers.push(new1);
              }

              this._childCount++;
            }

            if (this.__parent) {
              this.__parent._addChild(new1, true);
            }
          },

          /**
           * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
           * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
           * @private
           */
          _setClusterCenter: function _setClusterCenter(child) {
            if (!this._cLatLng) {
              // when clustering, take position of the first point as the cluster center
              this._cLatLng = child._cLatLng || child._latlng;
            }
          },

          /**
           * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
           * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
           * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
           * @private
           */
          _resetBounds: function _resetBounds() {
            var bounds = this._bounds;

            if (bounds._southWest) {
              bounds._southWest.lat = Infinity;
              bounds._southWest.lng = Infinity;
            }

            if (bounds._northEast) {
              bounds._northEast.lat = -Infinity;
              bounds._northEast.lng = -Infinity;
            }
          },
          _recalculateBounds: function _recalculateBounds() {
            var markers = this._markers,
                childClusters = this._childClusters,
                latSum = 0,
                lngSum = 0,
                totalCount = this._childCount,
                i,
                child,
                childLatLng,
                childCount; // Case where all markers are removed from the map and we are left with just an empty _topClusterLevel.

            if (totalCount === 0) {
              return;
            } // Reset rather than creating a new object, for performance.


            this._resetBounds(); // Child markers.


            for (i = 0; i < markers.length; i++) {
              childLatLng = markers[i]._latlng;

              this._bounds.extend(childLatLng);

              latSum += childLatLng.lat;
              lngSum += childLatLng.lng;
            } // Child clusters.


            for (i = 0; i < childClusters.length; i++) {
              child = childClusters[i]; // Re-compute child bounds and weighted position first if necessary.

              if (child._boundsNeedUpdate) {
                child._recalculateBounds();
              }

              this._bounds.extend(child._bounds);

              childLatLng = child._wLatLng;
              childCount = child._childCount;
              latSum += childLatLng.lat * childCount;
              lngSum += childLatLng.lng * childCount;
            }

            this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount); // Reset dirty flag.

            this._boundsNeedUpdate = false;
          },
          //Set our markers position as given and add it to the map
          _addToMap: function _addToMap(startPos) {
            if (startPos) {
              this._backupLatlng = this._latlng;
              this.setLatLng(startPos);
            }

            this._group._featureGroup.addLayer(this);
          },
          _recursivelyAnimateChildrenIn: function _recursivelyAnimateChildrenIn(bounds, center, maxZoom) {
            this._recursively(bounds, this._group._map.getMinZoom(), maxZoom - 1, function (c) {
              var markers = c._markers,
                  i,
                  m;

              for (i = markers.length - 1; i >= 0; i--) {
                m = markers[i]; //Only do it if the icon is still on the map

                if (m._icon) {
                  m._setPos(center);

                  m.clusterHide();
                }
              }
            }, function (c) {
              var childClusters = c._childClusters,
                  j,
                  cm;

              for (j = childClusters.length - 1; j >= 0; j--) {
                cm = childClusters[j];

                if (cm._icon) {
                  cm._setPos(center);

                  cm.clusterHide();
                }
              }
            });
          },
          _recursivelyAnimateChildrenInAndAddSelfToMap: function _recursivelyAnimateChildrenInAndAddSelfToMap(bounds, mapMinZoom, previousZoomLevel, newZoomLevel) {
            this._recursively(bounds, newZoomLevel, mapMinZoom, function (c) {
              c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel); //TODO: depthToAnimateIn affects _isSingleParent, if there is a multizoom we may/may not be.
              //As a hack we only do a animation free zoom on a single level zoom, if someone does multiple levels then we always animate


              if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
                c.clusterShow();

                c._recursivelyRemoveChildrenFromMap(bounds, mapMinZoom, previousZoomLevel); //Immediately remove our children as we are replacing them. TODO previousBounds not bounds

              } else {
                c.clusterHide();
              }

              c._addToMap();
            });
          },
          _recursivelyBecomeVisible: function _recursivelyBecomeVisible(bounds, zoomLevel) {
            this._recursively(bounds, this._group._map.getMinZoom(), zoomLevel, null, function (c) {
              c.clusterShow();
            });
          },
          _recursivelyAddChildrenToMap: function _recursivelyAddChildrenToMap(startPos, zoomLevel, bounds) {
            this._recursively(bounds, this._group._map.getMinZoom() - 1, zoomLevel, function (c) {
              if (zoomLevel === c._zoom) {
                return;
              } //Add our child markers at startPos (so they can be animated out)


              for (var i = c._markers.length - 1; i >= 0; i--) {
                var nm = c._markers[i];

                if (!bounds.contains(nm._latlng)) {
                  continue;
                }

                if (startPos) {
                  nm._backupLatlng = nm.getLatLng();
                  nm.setLatLng(startPos);

                  if (nm.clusterHide) {
                    nm.clusterHide();
                  }
                }

                c._group._featureGroup.addLayer(nm);
              }
            }, function (c) {
              c._addToMap(startPos);
            });
          },
          _recursivelyRestoreChildPositions: function _recursivelyRestoreChildPositions(zoomLevel) {
            //Fix positions of child markers
            for (var i = this._markers.length - 1; i >= 0; i--) {
              var nm = this._markers[i];

              if (nm._backupLatlng) {
                nm.setLatLng(nm._backupLatlng);
                delete nm._backupLatlng;
              }
            }

            if (zoomLevel - 1 === this._zoom) {
              //Reposition child clusters
              for (var j = this._childClusters.length - 1; j >= 0; j--) {
                this._childClusters[j]._restorePosition();
              }
            } else {
              for (var k = this._childClusters.length - 1; k >= 0; k--) {
                this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
              }
            }
          },
          _restorePosition: function _restorePosition() {
            if (this._backupLatlng) {
              this.setLatLng(this._backupLatlng);
              delete this._backupLatlng;
            }
          },
          //exceptBounds: If set, don't remove any markers/clusters in it
          _recursivelyRemoveChildrenFromMap: function _recursivelyRemoveChildrenFromMap(previousBounds, mapMinZoom, zoomLevel, exceptBounds) {
            var m, i;

            this._recursively(previousBounds, mapMinZoom - 1, zoomLevel - 1, function (c) {
              //Remove markers at every level
              for (i = c._markers.length - 1; i >= 0; i--) {
                m = c._markers[i];

                if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
                  c._group._featureGroup.removeLayer(m);

                  if (m.clusterShow) {
                    m.clusterShow();
                  }
                }
              }
            }, function (c) {
              //Remove child clusters at just the bottom level
              for (i = c._childClusters.length - 1; i >= 0; i--) {
                m = c._childClusters[i];

                if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
                  c._group._featureGroup.removeLayer(m);

                  if (m.clusterShow) {
                    m.clusterShow();
                  }
                }
              }
            });
          },
          //Run the given functions recursively to this and child clusters
          // boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
          // zoomLevelToStart: zoom level to start running functions (inclusive)
          // zoomLevelToStop: zoom level to stop running functions (inclusive)
          // runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
          // runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
          _recursively: function _recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
            var childClusters = this._childClusters,
                zoom = this._zoom,
                i,
                c;

            if (zoomLevelToStart <= zoom) {
              if (runAtEveryLevel) {
                runAtEveryLevel(this);
              }

              if (runAtBottomLevel && zoom === zoomLevelToStop) {
                runAtBottomLevel(this);
              }
            }

            if (zoom < zoomLevelToStart || zoom < zoomLevelToStop) {
              for (i = childClusters.length - 1; i >= 0; i--) {
                c = childClusters[i];

                if (c._boundsNeedUpdate) {
                  c._recalculateBounds();
                }

                if (boundsToApplyTo.intersects(c._bounds)) {
                  c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
                }
              }
            }
          },
          //Returns true if we are the parent of only one cluster and that cluster is the same as us
          _isSingleParent: function _isSingleParent() {
            //Don't need to check this._markers as the rest won't work if there are any
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
          }
        });
        /*
        * Extends L.Marker to include two extra methods: clusterHide and clusterShow.
        * 
        * They work as setOpacity(0) and setOpacity(1) respectively, but
        * don't overwrite the options.opacity
        * 
        */

        L.Marker.include({
          clusterHide: function clusterHide() {
            var backup = this.options.opacity;
            this.setOpacity(0);
            this.options.opacity = backup;
            return this;
          },
          clusterShow: function clusterShow() {
            return this.setOpacity(this.options.opacity);
          }
        });

        L.DistanceGrid = function (cellSize) {
          this._cellSize = cellSize;
          this._sqCellSize = cellSize * cellSize;
          this._grid = {};
          this._objectPoint = {};
        };

        L.DistanceGrid.prototype = {
          addObject: function addObject(obj, point) {
            var x = this._getCoord(point.x),
                y = this._getCoord(point.y),
                grid = this._grid,
                row = grid[y] = grid[y] || {},
                cell = row[x] = row[x] || [],
                stamp = L.Util.stamp(obj);

            this._objectPoint[stamp] = point;
            cell.push(obj);
          },
          updateObject: function updateObject(obj, point) {
            this.removeObject(obj);
            this.addObject(obj, point);
          },
          //Returns true if the object was found
          removeObject: function removeObject(obj, point) {
            var x = this._getCoord(point.x),
                y = this._getCoord(point.y),
                grid = this._grid,
                row = grid[y] = grid[y] || {},
                cell = row[x] = row[x] || [],
                i,
                len;

            delete this._objectPoint[L.Util.stamp(obj)];

            for (i = 0, len = cell.length; i < len; i++) {
              if (cell[i] === obj) {
                cell.splice(i, 1);

                if (len === 1) {
                  delete row[x];
                }

                return true;
              }
            }
          },
          eachObject: function eachObject(fn, context) {
            var i,
                j,
                k,
                len,
                row,
                cell,
                removed,
                grid = this._grid;

            for (i in grid) {
              row = grid[i];

              for (j in row) {
                cell = row[j];

                for (k = 0, len = cell.length; k < len; k++) {
                  removed = fn.call(context, cell[k]);

                  if (removed) {
                    k--;
                    len--;
                  }
                }
              }
            }
          },
          getNearObject: function getNearObject(point) {
            var x = this._getCoord(point.x),
                y = this._getCoord(point.y),
                i,
                j,
                k,
                row,
                cell,
                len,
                obj,
                dist,
                objectPoint = this._objectPoint,
                closestDistSq = this._sqCellSize,
                closest = null;

            for (i = y - 1; i <= y + 1; i++) {
              row = this._grid[i];

              if (row) {
                for (j = x - 1; j <= x + 1; j++) {
                  cell = row[j];

                  if (cell) {
                    for (k = 0, len = cell.length; k < len; k++) {
                      obj = cell[k];
                      dist = this._sqDist(objectPoint[L.Util.stamp(obj)], point);

                      if (dist < closestDistSq || dist <= closestDistSq && closest === null) {
                        closestDistSq = dist;
                        closest = obj;
                      }
                    }
                  }
                }
              }
            }

            return closest;
          },
          _getCoord: function _getCoord(x) {
            var coord = Math.floor(x / this._cellSize);
            return isFinite(coord) ? coord : x;
          },
          _sqDist: function _sqDist(p, p2) {
            var dx = p2.x - p.x,
                dy = p2.y - p.y;
            return dx * dx + dy * dy;
          }
        };
        /* Copyright (c) 2012 the authors listed at the following URL, and/or
        the authors of referenced articles or incorporated external code:
        http://en.literateprograms.org/Quickhull_(Javascript)?action=history&offset=20120410175256
        	Permission is hereby granted, free of charge, to any person obtaining
        a copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
        	The above copyright notice and this permission notice shall be
        included in all copies or substantial portions of the Software.
        	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        	Retrieved from: http://en.literateprograms.org/Quickhull_(Javascript)?oldid=18434
        */

        (function () {
          L.QuickHull = {
            /*
             * @param {Object} cpt a point to be measured from the baseline
             * @param {Array} bl the baseline, as represented by a two-element
             *   array of latlng objects.
             * @returns {Number} an approximate distance measure
             */
            getDistant: function getDistant(cpt, bl) {
              var vY = bl[1].lat - bl[0].lat,
                  vX = bl[0].lng - bl[1].lng;
              return vX * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng);
            },

            /*
             * @param {Array} baseLine a two-element array of latlng objects
             *   representing the baseline to project from
             * @param {Array} latLngs an array of latlng objects
             * @returns {Object} the maximum point and all new points to stay
             *   in consideration for the hull.
             */
            findMostDistantPointFromBaseLine: function findMostDistantPointFromBaseLine(baseLine, latLngs) {
              var maxD = 0,
                  maxPt = null,
                  newPoints = [],
                  i,
                  pt,
                  d;

              for (i = latLngs.length - 1; i >= 0; i--) {
                pt = latLngs[i];
                d = this.getDistant(pt, baseLine);

                if (d > 0) {
                  newPoints.push(pt);
                } else {
                  continue;
                }

                if (d > maxD) {
                  maxD = d;
                  maxPt = pt;
                }
              }

              return {
                maxPoint: maxPt,
                newPoints: newPoints
              };
            },

            /*
             * Given a baseline, compute the convex hull of latLngs as an array
             * of latLngs.
             *
             * @param {Array} latLngs
             * @returns {Array}
             */
            buildConvexHull: function buildConvexHull(baseLine, latLngs) {
              var convexHullBaseLines = [],
                  t = this.findMostDistantPointFromBaseLine(baseLine, latLngs);

              if (t.maxPoint) {
                // if there is still a point "outside" the base line
                convexHullBaseLines = convexHullBaseLines.concat(this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints));
                convexHullBaseLines = convexHullBaseLines.concat(this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints));
                return convexHullBaseLines;
              } else {
                // if there is no more point "outside" the base line, the current base line is part of the convex hull
                return [baseLine[0]];
              }
            },

            /*
             * Given an array of latlngs, compute a convex hull as an array
             * of latlngs
             *
             * @param {Array} latLngs
             * @returns {Array}
             */
            getConvexHull: function getConvexHull(latLngs) {
              // find first baseline
              var maxLat = false,
                  minLat = false,
                  maxLng = false,
                  minLng = false,
                  maxLatPt = null,
                  minLatPt = null,
                  maxLngPt = null,
                  minLngPt = null,
                  maxPt = null,
                  minPt = null,
                  i;

              for (i = latLngs.length - 1; i >= 0; i--) {
                var pt = latLngs[i];

                if (maxLat === false || pt.lat > maxLat) {
                  maxLatPt = pt;
                  maxLat = pt.lat;
                }

                if (minLat === false || pt.lat < minLat) {
                  minLatPt = pt;
                  minLat = pt.lat;
                }

                if (maxLng === false || pt.lng > maxLng) {
                  maxLngPt = pt;
                  maxLng = pt.lng;
                }

                if (minLng === false || pt.lng < minLng) {
                  minLngPt = pt;
                  minLng = pt.lng;
                }
              }

              if (minLat !== maxLat) {
                minPt = minLatPt;
                maxPt = maxLatPt;
              } else {
                minPt = minLngPt;
                maxPt = maxLngPt;
              }

              var ch = [].concat(this.buildConvexHull([minPt, maxPt], latLngs), this.buildConvexHull([maxPt, minPt], latLngs));
              return ch;
            }
          };
        })();

        L.MarkerCluster.include({
          getConvexHull: function getConvexHull() {
            var childMarkers = this.getAllChildMarkers(),
                points = [],
                p,
                i;

            for (i = childMarkers.length - 1; i >= 0; i--) {
              p = childMarkers[i].getLatLng();
              points.push(p);
            }

            return L.QuickHull.getConvexHull(points);
          }
        }); //This code is 100% based on https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
        //Huge thanks to jawj for implementing it first to make my job easy :-)

        L.MarkerCluster.include({
          _2PI: Math.PI * 2,
          _circleFootSeparation: 25,
          //related to circumference of circle
          _circleStartAngle: 0,
          _spiralFootSeparation: 28,
          //related to size of spiral (experiment!)
          _spiralLengthStart: 11,
          _spiralLengthFactor: 5,
          _circleSpiralSwitchover: 9,
          //show spiral instead of circle from this marker count upwards.
          // 0 -> always spiral; Infinity -> always circle
          spiderfy: function spiderfy() {
            if (this._group._spiderfied === this || this._group._inZoomAnimation) {
              return;
            }

            var childMarkers = this.getAllChildMarkers(null, true),
                group = this._group,
                map = group._map,
                center = map.latLngToLayerPoint(this._latlng),
                positions;

            this._group._unspiderfy();

            this._group._spiderfied = this; //TODO Maybe: childMarkers order by distance to center

            if (this._group.options.spiderfyShapePositions) {
              positions = this._group.options.spiderfyShapePositions(childMarkers.length, center);
            } else if (childMarkers.length >= this._circleSpiralSwitchover) {
              positions = this._generatePointsSpiral(childMarkers.length, center);
            } else {
              center.y += 10; // Otherwise circles look wrong => hack for standard blue icon, renders differently for other icons.

              positions = this._generatePointsCircle(childMarkers.length, center);
            }

            this._animationSpiderfy(childMarkers, positions);
          },
          unspiderfy: function unspiderfy(zoomDetails) {
            /// <param Name="zoomDetails">Argument from zoomanim if being called in a zoom animation or null otherwise</param>
            if (this._group._inZoomAnimation) {
              return;
            }

            this._animationUnspiderfy(zoomDetails);

            this._group._spiderfied = null;
          },
          _generatePointsCircle: function _generatePointsCircle(count, centerPt) {
            var circumference = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count),
                legLength = circumference / this._2PI,
                //radius from circumference
            angleStep = this._2PI / count,
                res = [],
                i,
                angle;
            legLength = Math.max(legLength, 35); // Minimum distance to get outside the cluster icon.

            res.length = count;

            for (i = 0; i < count; i++) {
              // Clockwise, like spiral.
              angle = this._circleStartAngle + i * angleStep;
              res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
            }

            return res;
          },
          _generatePointsSpiral: function _generatePointsSpiral(count, centerPt) {
            var spiderfyDistanceMultiplier = this._group.options.spiderfyDistanceMultiplier,
                legLength = spiderfyDistanceMultiplier * this._spiralLengthStart,
                separation = spiderfyDistanceMultiplier * this._spiralFootSeparation,
                lengthFactor = spiderfyDistanceMultiplier * this._spiralLengthFactor * this._2PI,
                angle = 0,
                res = [],
                i;
            res.length = count; // Higher index, closer position to cluster center.

            for (i = count; i >= 0; i--) {
              // Skip the first position, so that we are already farther from center and we avoid
              // being under the default cluster icon (especially important for Circle Markers).
              if (i < count) {
                res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
              }

              angle += separation / legLength + i * 0.0005;
              legLength += lengthFactor / angle;
            }

            return res;
          },
          _noanimationUnspiderfy: function _noanimationUnspiderfy() {
            var group = this._group,
                map = group._map,
                fg = group._featureGroup,
                childMarkers = this.getAllChildMarkers(null, true),
                m,
                i;
            group._ignoreMove = true;
            this.setOpacity(1);

            for (i = childMarkers.length - 1; i >= 0; i--) {
              m = childMarkers[i];
              fg.removeLayer(m);

              if (m._preSpiderfyLatlng) {
                m.setLatLng(m._preSpiderfyLatlng);
                delete m._preSpiderfyLatlng;
              }

              if (m.setZIndexOffset) {
                m.setZIndexOffset(0);
              }

              if (m._spiderLeg) {
                map.removeLayer(m._spiderLeg);
                delete m._spiderLeg;
              }
            }

            group.fire('unspiderfied', {
              cluster: this,
              markers: childMarkers
            });
            group._ignoreMove = false;
            group._spiderfied = null;
          }
        }); //Non Animated versions of everything

        L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
          _animationSpiderfy: function _animationSpiderfy(childMarkers, positions) {
            var group = this._group,
                map = group._map,
                fg = group._featureGroup,
                legOptions = this._group.options.spiderLegPolylineOptions,
                i,
                m,
                leg,
                newPos;
            group._ignoreMove = true; // Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
            // The reverse order trick no longer improves performance on modern browsers.

            for (i = 0; i < childMarkers.length; i++) {
              newPos = map.layerPointToLatLng(positions[i]);
              m = childMarkers[i]; // Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.

              leg = new L.Polyline([this._latlng, newPos], legOptions);
              map.addLayer(leg);
              m._spiderLeg = leg; // Now add the marker.

              m._preSpiderfyLatlng = m._latlng;
              m.setLatLng(newPos);

              if (m.setZIndexOffset) {
                m.setZIndexOffset(1000000); //Make these appear on top of EVERYTHING
              }

              fg.addLayer(m);
            }

            this.setOpacity(0.3);
            group._ignoreMove = false;
            group.fire('spiderfied', {
              cluster: this,
              markers: childMarkers
            });
          },
          _animationUnspiderfy: function _animationUnspiderfy() {
            this._noanimationUnspiderfy();
          }
        }); //Animated versions here

        L.MarkerCluster.include({
          _animationSpiderfy: function _animationSpiderfy(childMarkers, positions) {
            var me = this,
                group = this._group,
                map = group._map,
                fg = group._featureGroup,
                thisLayerLatLng = this._latlng,
                thisLayerPos = map.latLngToLayerPoint(thisLayerLatLng),
                svg = L.Path.SVG,
                legOptions = L.extend({}, this._group.options.spiderLegPolylineOptions),
                // Copy the options so that we can modify them for animation.
            finalLegOpacity = legOptions.opacity,
                i,
                m,
                leg,
                legPath,
                legLength,
                newPos;

            if (finalLegOpacity === undefined) {
              finalLegOpacity = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity;
            }

            if (svg) {
              // If the initial opacity of the spider leg is not 0 then it appears before the animation starts.
              legOptions.opacity = 0; // Add the class for CSS transitions.

              legOptions.className = (legOptions.className || '') + ' leaflet-cluster-spider-leg';
            } else {
              // Make sure we have a defined opacity.
              legOptions.opacity = finalLegOpacity;
            }

            group._ignoreMove = true; // Add markers and spider legs to map, hidden at our center point.
            // Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
            // The reverse order trick no longer improves performance on modern browsers.

            for (i = 0; i < childMarkers.length; i++) {
              m = childMarkers[i];
              newPos = map.layerPointToLatLng(positions[i]); // Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.

              leg = new L.Polyline([thisLayerLatLng, newPos], legOptions);
              map.addLayer(leg);
              m._spiderLeg = leg; // Explanations: https://jakearchibald.com/2013/animated-line-drawing-svg/
              // In our case the transition property is declared in the CSS file.

              if (svg) {
                legPath = leg._path;
                legLength = legPath.getTotalLength() + 0.1; // Need a small extra length to avoid remaining dot in Firefox.

                legPath.style.strokeDasharray = legLength; // Just 1 length is enough, it will be duplicated.

                legPath.style.strokeDashoffset = legLength;
              } // If it is a marker, add it now and we'll animate it out


              if (m.setZIndexOffset) {
                m.setZIndexOffset(1000000); // Make normal markers appear on top of EVERYTHING
              }

              if (m.clusterHide) {
                m.clusterHide();
              } // Vectors just get immediately added


              fg.addLayer(m);

              if (m._setPos) {
                m._setPos(thisLayerPos);
              }
            }

            group._forceLayout();

            group._animationStart(); // Reveal markers and spider legs.


            for (i = childMarkers.length - 1; i >= 0; i--) {
              newPos = map.layerPointToLatLng(positions[i]);
              m = childMarkers[i]; //Move marker to new position

              m._preSpiderfyLatlng = m._latlng;
              m.setLatLng(newPos);

              if (m.clusterShow) {
                m.clusterShow();
              } // Animate leg (animation is actually delegated to CSS transition).


              if (svg) {
                leg = m._spiderLeg;
                legPath = leg._path;
                legPath.style.strokeDashoffset = 0; //legPath.style.strokeOpacity = finalLegOpacity;

                leg.setStyle({
                  opacity: finalLegOpacity
                });
              }
            }

            this.setOpacity(0.3);
            group._ignoreMove = false;
            setTimeout(function () {
              group._animationEnd();

              group.fire('spiderfied', {
                cluster: me,
                markers: childMarkers
              });
            }, 200);
          },
          _animationUnspiderfy: function _animationUnspiderfy(zoomDetails) {
            var me = this,
                group = this._group,
                map = group._map,
                fg = group._featureGroup,
                thisLayerPos = zoomDetails ? map._latLngToNewLayerPoint(this._latlng, zoomDetails.zoom, zoomDetails.center) : map.latLngToLayerPoint(this._latlng),
                childMarkers = this.getAllChildMarkers(null, true),
                svg = L.Path.SVG,
                m,
                i,
                leg,
                legPath,
                legLength,
                nonAnimatable;
            group._ignoreMove = true;

            group._animationStart(); //Make us visible and bring the child markers back in


            this.setOpacity(1);

            for (i = childMarkers.length - 1; i >= 0; i--) {
              m = childMarkers[i]; //Marker was added to us after we were spiderfied

              if (!m._preSpiderfyLatlng) {
                continue;
              } //Close any popup on the marker first, otherwise setting the location of the marker will make the map scroll


              m.closePopup(); //Fix up the location to the real one

              m.setLatLng(m._preSpiderfyLatlng);
              delete m._preSpiderfyLatlng; //Hack override the location to be our center

              nonAnimatable = true;

              if (m._setPos) {
                m._setPos(thisLayerPos);

                nonAnimatable = false;
              }

              if (m.clusterHide) {
                m.clusterHide();
                nonAnimatable = false;
              }

              if (nonAnimatable) {
                fg.removeLayer(m);
              } // Animate the spider leg back in (animation is actually delegated to CSS transition).


              if (svg) {
                leg = m._spiderLeg;
                legPath = leg._path;
                legLength = legPath.getTotalLength() + 0.1;
                legPath.style.strokeDashoffset = legLength;
                leg.setStyle({
                  opacity: 0
                });
              }
            }

            group._ignoreMove = false;
            setTimeout(function () {
              //If we have only <= one child left then that marker will be shown on the map so don't remove it!
              var stillThereChildCount = 0;

              for (i = childMarkers.length - 1; i >= 0; i--) {
                m = childMarkers[i];

                if (m._spiderLeg) {
                  stillThereChildCount++;
                }
              }

              for (i = childMarkers.length - 1; i >= 0; i--) {
                m = childMarkers[i];

                if (!m._spiderLeg) {
                  //Has already been unspiderfied
                  continue;
                }

                if (m.clusterShow) {
                  m.clusterShow();
                }

                if (m.setZIndexOffset) {
                  m.setZIndexOffset(0);
                }

                if (stillThereChildCount > 1) {
                  fg.removeLayer(m);
                }

                map.removeLayer(m._spiderLeg);
                delete m._spiderLeg;
              }

              group._animationEnd();

              group.fire('unspiderfied', {
                cluster: me,
                markers: childMarkers
              });
            }, 200);
          }
        });
        L.MarkerClusterGroup.include({
          //The MarkerCluster currently spiderfied (if any)
          _spiderfied: null,
          unspiderfy: function unspiderfy() {
            this._unspiderfy.apply(this, arguments);
          },
          _spiderfierOnAdd: function _spiderfierOnAdd() {
            this._map.on('click', this._unspiderfyWrapper, this);

            if (this._map.options.zoomAnimation) {
              this._map.on('zoomstart', this._unspiderfyZoomStart, this);
            } //Browsers without zoomAnimation or a big zoom don't fire zoomstart


            this._map.on('zoomend', this._noanimationUnspiderfy, this);

            if (!L.Browser.touch) {
              this._map.getRenderer(this); //Needs to happen in the pageload, not after, or animations don't work in webkit
              //  http://stackoverflow.com/questions/8455200/svg-animate-with-dynamically-added-elements
              //Disable on touch browsers as the animation messes up on a touch zoom and isn't very noticable

            }
          },
          _spiderfierOnRemove: function _spiderfierOnRemove() {
            this._map.off('click', this._unspiderfyWrapper, this);

            this._map.off('zoomstart', this._unspiderfyZoomStart, this);

            this._map.off('zoomanim', this._unspiderfyZoomAnim, this);

            this._map.off('zoomend', this._noanimationUnspiderfy, this); //Ensure that markers are back where they should be
            // Use no animation to avoid a sticky leaflet-cluster-anim class on mapPane


            this._noanimationUnspiderfy();
          },
          //On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
          //This means we can define the animation they do rather than Markers doing an animation to their actual location
          _unspiderfyZoomStart: function _unspiderfyZoomStart() {
            if (!this._map) {
              //May have been removed from the map by a zoomEnd handler
              return;
            }

            this._map.on('zoomanim', this._unspiderfyZoomAnim, this);
          },
          _unspiderfyZoomAnim: function _unspiderfyZoomAnim(zoomDetails) {
            //Wait until the first zoomanim after the user has finished touch-zooming before running the animation
            if (L.DomUtil.hasClass(this._map._mapPane, 'leaflet-touching')) {
              return;
            }

            this._map.off('zoomanim', this._unspiderfyZoomAnim, this);

            this._unspiderfy(zoomDetails);
          },
          _unspiderfyWrapper: function _unspiderfyWrapper() {
            /// <summary>_unspiderfy but passes no arguments</summary>
            this._unspiderfy();
          },
          _unspiderfy: function _unspiderfy(zoomDetails) {
            if (this._spiderfied) {
              this._spiderfied.unspiderfy(zoomDetails);
            }
          },
          _noanimationUnspiderfy: function _noanimationUnspiderfy() {
            if (this._spiderfied) {
              this._spiderfied._noanimationUnspiderfy();
            }
          },
          //If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
          _unspiderfyLayer: function _unspiderfyLayer(layer) {
            if (layer._spiderLeg) {
              this._featureGroup.removeLayer(layer);

              if (layer.clusterShow) {
                layer.clusterShow();
              } //Position will be fixed up immediately in _animationUnspiderfy


              if (layer.setZIndexOffset) {
                layer.setZIndexOffset(0);
              }

              this._map.removeLayer(layer._spiderLeg);

              delete layer._spiderLeg;
            }
          }
        });
        /**
         * Adds 1 public method to MCG and 1 to L.Marker to facilitate changing
         * markers' icon options and refreshing their icon and their parent clusters
         * accordingly (case where their iconCreateFunction uses data of childMarkers
         * to make up the cluster icon).
         */

        L.MarkerClusterGroup.include({
          /**
           * Updates the icon of all clusters which are parents of the given marker(s).
           * In singleMarkerMode, also updates the given marker(s) icon.
           * @param layers L.MarkerClusterGroup|L.LayerGroup|Array(L.Marker)|Map(L.Marker)|
           * L.MarkerCluster|L.Marker (optional) list of markers (or single marker) whose parent
           * clusters need to be updated. If not provided, retrieves all child markers of this.
           * @returns {L.MarkerClusterGroup}
           */
          refreshClusters: function refreshClusters(layers) {
            if (!layers) {
              layers = this._topClusterLevel.getAllChildMarkers();
            } else if (layers instanceof L.MarkerClusterGroup) {
              layers = layers._topClusterLevel.getAllChildMarkers();
            } else if (layers instanceof L.LayerGroup) {
              layers = layers._layers;
            } else if (layers instanceof L.MarkerCluster) {
              layers = layers.getAllChildMarkers();
            } else if (layers instanceof L.Marker) {
              layers = [layers];
            } // else: must be an Array(L.Marker)|Map(L.Marker)


            this._flagParentsIconsNeedUpdate(layers);

            this._refreshClustersIcons(); // In case of singleMarkerMode, also re-draw the markers.


            if (this.options.singleMarkerMode) {
              this._refreshSingleMarkerModeMarkers(layers);
            }

            return this;
          },

          /**
           * Simply flags all parent clusters of the given markers as having a "dirty" icon.
           * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
           * @private
           */
          _flagParentsIconsNeedUpdate: function _flagParentsIconsNeedUpdate(layers) {
            var id, parent; // Assumes layers is an Array or an Object whose prototype is non-enumerable.

            for (id in layers) {
              // Flag parent clusters' icon as "dirty", all the way up.
              // Dumb process that flags multiple times upper parents, but still
              // much more efficient than trying to be smart and make short lists,
              // at least in the case of a hierarchy following a power law:
              // http://jsperf.com/flag-nodes-in-power-hierarchy/2
              parent = layers[id].__parent;

              while (parent) {
                parent._iconNeedsUpdate = true;
                parent = parent.__parent;
              }
            }
          },

          /**
           * Re-draws the icon of the supplied markers.
           * To be used in singleMarkerMode only.
           * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
           * @private
           */
          _refreshSingleMarkerModeMarkers: function _refreshSingleMarkerModeMarkers(layers) {
            var id, layer;

            for (id in layers) {
              layer = layers[id]; // Make sure we do not override markers that do not belong to THIS group.

              if (this.hasLayer(layer)) {
                // Need to re-create the icon first, then re-draw the marker.
                layer.setIcon(this._overrideMarkerIcon(layer));
              }
            }
          }
        });
        L.Marker.include({
          /**
           * Updates the given options in the marker's icon and refreshes the marker.
           * @param options map object of icon options.
           * @param directlyRefreshClusters boolean (optional) true to trigger
           * MCG.refreshClustersOf() right away with this single marker.
           * @returns {L.Marker}
           */
          refreshIconOptions: function refreshIconOptions(options, directlyRefreshClusters) {
            var icon = this.options.icon;
            L.setOptions(icon, options);
            this.setIcon(icon); // Shortcut to refresh the associated MCG clusters right away.
            // To be used when refreshing a single marker.
            // Otherwise, better use MCG.refreshClusters() once at the end with
            // the list of modified markers.

            if (directlyRefreshClusters && this.__parent) {
              this.__parent._group.refreshClusters(this);
            }

            return this;
          }
        });
        exports.MarkerClusterGroup = MarkerClusterGroup;
        exports.MarkerCluster = MarkerCluster;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
      /***/

    },

    /***/
    50645: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CoachMarksComponent": function CoachMarksComponent() {
          return (
            /* binding */
            _CoachMarksComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      17159);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs/operators */
      76477);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs/operators */
      56913);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs/operators */
      52249);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _angular_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/animations */
      97175);
      /* harmony import */


      var _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/animations/custom.animation */
      47692);
      /* harmony import */


      var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../core/helpers/observable-helper */
      59364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../modules/shared/components/geo-fab/geo-fab.component */
      49744);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function CoachMarksComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function CoachMarksComponent_div_0_Template_div_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r1.hide();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-geo-fab", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "svg", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "path", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceHTML"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-text", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "svg", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "path", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceHTML"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-text", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](13, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "ion-fab", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-fab-button");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "ion-icon", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "svg", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "path", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceHTML"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "ion-text", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](22, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "ion-tab-bar");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "ion-tab-button", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](25, "ion-icon", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](28, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "ion-tab-button", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](30, "ion-icon", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](33, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "ion-tab-button", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](35, "ion-icon", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](38, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("isOpen", ctx_r0.isOpen)("showLabels", false)("animateOnEnter", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@geo-coachmark-animation", undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 14, "COACH_MARKS.SELECT_GEO_HAZARD"));

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@add-text-animation", undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](13, 16, "COACH_MARKS.ADD_OBSERVATIONS"));

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@add-fab-animation", undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@warning-coachmark-animation", undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](22, 18, "COACH_MARKS.VIEW_WARNINGS"));

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](28, 20, "TABS.MAP"));

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](33, 22, "TABS.LIST"));

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@warning-icon-animation", undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](38, 24, "TABS.WARNINGS"));
        }
      }

      var _CoachMarksComponent = /*#__PURE__*/function () {
        function _CoachMarksComponent(userSettingService, ngZone) {
          _classCallCheck(this, _CoachMarksComponent);

          this.userSettingService = userSettingService;
          this.ngZone = ngZone;
          this.isOpen = false;
          this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
          this.hideSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
        }

        _createClass(_CoachMarksComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.showCoachMarks$ = (0, rxjs__WEBPACK_IMPORTED_MODULE_6__.merge)(this.getShowGeoSelectObservable(), this.hideSubject).pipe((0, _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__.enterZone)(this.ngZone));
            this.getShowGeoSelectObservable().pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.filter)(function (val) {
              return val;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.delay)(2000), (0, _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__.enterZone)(this.ngZone)).subscribe(function () {
              _this.isOpen = true;
            });
          }
        }, {
          key: "getShowGeoSelectObservable",
          value: function getShowGeoSelectObservable() {
            return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(function (us) {
              return us.showGeoSelectInfo;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.distinctUntilChanged)());
          }
        }, {
          key: "hide",
          value: function hide() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var currentSettings;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this.hideSubject.next(false);
                      _context.next = 3;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.take)(1)).toPromise();

                    case 3:
                      currentSettings = _context.sent;
                      this.userSettingService.saveUserSettings(Object.assign(Object.assign({}, currentSettings), {
                        showGeoSelectInfo: false
                      }));

                    case 5:
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
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }]);

        return _CoachMarksComponent;
      }();

      _CoachMarksComponent.ɵfac = function CoachMarksComponent_Factory(t) {
        return new (t || _CoachMarksComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone));
      };

      _CoachMarksComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _CoachMarksComponent,
        selectors: [["app-coach-marks"]],
        decls: 2,
        vars: 3,
        consts: [["class", "coachmark-backdrop", 3, "click", 4, "ngIf"], [1, "coachmark-backdrop", 3, "click"], [3, "isOpen", "showLabels", "animateOnEnter"], [1, "geo-coachmark"], ["width", "65", "height", "76", "viewBox", "0 0 65 76", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M64 62C64 62 51.5 44.5 38.5 35.5C25.5 26.5 3 15.5 3 15.5M3 15.5L18 15.5M3 15.5L12.5 28", "stroke", "white", "stroke-width", "2"], [1, "coachmark-text"], [1, "add-coachmark"], ["width", "40", "height", "46", "viewBox", "0 0 40 46", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M1 1C1 1 1.5 17.5 12 27C22.5 36.5 37.5 42.5 37.5 42.5M37.5 42.5L29 28.5M37.5 42.5L21 44.5", "stroke", "white", "stroke-width", "2"], ["vertical", "bottom", "horizontal", "end", "slot", "fixed", 1, "add-fab"], ["name", "add"], [1, "warning-coachmark"], ["width", "90", "height", "40", "viewBox", "0 0 90 40", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M1 1.5C1 1.5 8 10 25.5 18.5C43 27 86.5 35.5 86.5 35.5M86.5 35.5L73 25.5M86.5 35.5L64.5 38.5", "stroke", "white", "stroke-width", "2"], ["tab", "home"], ["name", "map"], ["tab", "observation-list"], ["name", "list"], ["tab", "warning-list"], ["name", "warning", 1, "warning-icon"]],
        template: function CoachMarksComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, CoachMarksComponent_div_0_Template, 39, 26, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "async");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, ctx.showCoachMarks$));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_3__.GeoFabComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonFab, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonFabButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonTabBar, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonTabButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonLabel],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe],
        styles: ["@font-face {\n  font-family: \"Shadows Into Light\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"/assets/fonts/shadows-into-light-v8-latin-regular.eot\");\n  \n  src: local(\"Shadows Into Light\"), local(\"ShadowsIntoLight\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.woff2\") format(\"woff2\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.woff\") format(\"woff\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.ttf\") format(\"truetype\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.svg#ShadowsIntoLight\") format(\"svg\");\n  \n}\n.coachmark-backdrop[_ngcontent-%COMP%] {\n  background: var(--backdrop-background);\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1000;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   app-geo-fab[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(44px + env(safe-area-inset-top));\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%] {\n  --ion-tab-bar-background: #010f14;\n  --ion-tab-bar-background-focused: #010f14;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: -1;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .coachmark-text[_ngcontent-%COMP%] {\n  color: #fff;\n  font-family: \"Shadows Into Light\", \"Source Sans Pro\";\n  font-size: 32px;\n  line-height: 130%;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .add-fab[_ngcontent-%COMP%] {\n  --ion-color-primary: var(--ion-color-varsom-orange);\n  --background-activated: var(--ion-color-varsom-orange-shade);\n  --color: var(--ion-color-varsom-orange-contrast);\n  --color-activated: var(--ion-color-varsom-orange-contrast);\n  bottom: calc(60px + env(safe-area-inset-bottom));\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .warning-icon[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .geo-coachmark[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(40px + env(safe-area-inset-top));\n  left: 70px;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .geo-coachmark[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 31px;\n  left: 51px;\n  transform: rotate(4.28deg);\n  width: 112px;\n  text-align: center;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .add-coachmark[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: calc(117px + env(safe-area-inset-bottom));\n  right: 70px;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .add-coachmark[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 60px;\n  right: -45px;\n  width: 180px;\n  text-align: center;\n  transform: rotate(-6.98deg);\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .warning-coachmark[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: calc(23px + env(safe-area-inset-bottom));\n  right: calc(50% - 100px);\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .warning-coachmark[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 57px;\n  right: 55px;\n  width: 183px;\n  text-align: center;\n  transform: rotate(-16.77deg);\n  font-size: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvYWNoLW1hcmtzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUVBQUE7RUFBbUUscUJBQUE7RUFDbkUsd2VBQUE7RUFNbUIsZUFBQTtBQUhyQjtBQU1BO0VBQ0Usc0NBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0FBSkY7QUFNRTtFQUNFLGtCQUFBO0VBQ0EsMENBQUE7QUFKSjtBQU9FO0VBQ0UsaUNBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtBQUxKO0FBUUU7RUFDRSxXQUFBO0VBQ0Esb0RBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFOSjtBQVNFO0VBQ0UsbURBQUE7RUFDQSw0REFBQTtFQUNBLGdEQUFBO0VBQ0EsMERBQUE7RUFDQSxnREFBQTtBQVBKO0FBVUU7RUFDRSxXQUFBO0FBUko7QUFXRTtFQUNFLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxVQUFBO0FBVEo7QUFXSTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSwwQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQVROO0FBYUU7RUFDRSxrQkFBQTtFQUNBLGlEQUFBO0VBQ0EsV0FBQTtBQVhKO0FBWUk7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7QUFWTjtBQWNFO0VBQ0Usa0JBQUE7RUFDQSxnREFBQTtFQUNBLHdCQUFBO0FBWko7QUFjSTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7QUFaTiIsImZpbGUiOiJjb2FjaC1tYXJrcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBmb250LWZhY2Uge1xyXG4gIGZvbnQtZmFtaWx5OiBcIlNoYWRvd3MgSW50byBMaWdodFwiO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIHNyYzogdXJsKFwiL2Fzc2V0cy9mb250cy9zaGFkb3dzLWludG8tbGlnaHQtdjgtbGF0aW4tcmVndWxhci5lb3RcIik7IC8qIElFOSBDb21wYXQgTW9kZXMgKi9cclxuICBzcmM6IGxvY2FsKFwiU2hhZG93cyBJbnRvIExpZ2h0XCIpLCBsb2NhbChcIlNoYWRvd3NJbnRvTGlnaHRcIiksXHJcbiAgICB1cmwoXCIvYXNzZXRzL2ZvbnRzL3NoYWRvd3MtaW50by1saWdodC12OC1sYXRpbi1yZWd1bGFyLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksXHJcbiAgICAvKiBJRTYtSUU4ICovIHVybChcIi9hc3NldHMvZm9udHMvc2hhZG93cy1pbnRvLWxpZ2h0LXY4LWxhdGluLXJlZ3VsYXIud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksXHJcbiAgICAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi8gdXJsKFwiL2Fzc2V0cy9mb250cy9zaGFkb3dzLWludG8tbGlnaHQtdjgtbGF0aW4tcmVndWxhci53b2ZmXCIpIGZvcm1hdChcIndvZmZcIiksXHJcbiAgICAvKiBNb2Rlcm4gQnJvd3NlcnMgKi8gdXJsKFwiL2Fzc2V0cy9mb250cy9zaGFkb3dzLWludG8tbGlnaHQtdjgtbGF0aW4tcmVndWxhci50dGZcIikgZm9ybWF0KFwidHJ1ZXR5cGVcIiksXHJcbiAgICAvKiBTYWZhcmksIEFuZHJvaWQsIGlPUyAqLyB1cmwoXCIvYXNzZXRzL2ZvbnRzL3NoYWRvd3MtaW50by1saWdodC12OC1sYXRpbi1yZWd1bGFyLnN2ZyNTaGFkb3dzSW50b0xpZ2h0XCIpXHJcbiAgICAgIGZvcm1hdChcInN2Z1wiKTsgLyogTGVnYWN5IGlPUyAqL1xyXG59XHJcblxyXG4uY29hY2htYXJrLWJhY2tkcm9wIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZHJvcC1iYWNrZ3JvdW5kKTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcblxyXG4gIGFwcC1nZW8tZmFiIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogY2FsYyg0NHB4ICsgZW52KHNhZmUtYXJlYS1pbnNldC10b3ApKTtcclxuICB9XHJcblxyXG4gIGlvbi10YWItYmFyIHtcclxuICAgIC0taW9uLXRhYi1iYXItYmFja2dyb3VuZDogIzAxMGYxNDtcclxuICAgIC0taW9uLXRhYi1iYXItYmFja2dyb3VuZC1mb2N1c2VkOiAjMDEwZjE0O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgei1pbmRleDogLTE7XHJcbiAgfVxyXG5cclxuICAuY29hY2htYXJrLXRleHQge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LWZhbWlseTogXCJTaGFkb3dzIEludG8gTGlnaHRcIiwgXCJTb3VyY2UgU2FucyBQcm9cIjtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxMzAlO1xyXG4gIH1cclxuXHJcbiAgLmFkZC1mYWIge1xyXG4gICAgLS1pb24tY29sb3ItcHJpbWFyeTogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1vcmFuZ2UpO1xyXG4gICAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1vcmFuZ2Utc2hhZGUpO1xyXG4gICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1vcmFuZ2UtY29udHJhc3QpO1xyXG4gICAgLS1jb2xvci1hY3RpdmF0ZWQ6IHZhcigtLWlvbi1jb2xvci12YXJzb20tb3JhbmdlLWNvbnRyYXN0KTtcclxuICAgIGJvdHRvbTogY2FsYyg2MHB4ICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pKTtcclxuICB9XHJcblxyXG4gIC53YXJuaW5nLWljb24ge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgfVxyXG5cclxuICAuZ2VvLWNvYWNobWFyayB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IGNhbGMoNDBweCArIGVudihzYWZlLWFyZWEtaW5zZXQtdG9wKSk7XHJcbiAgICBsZWZ0OiA3MHB4O1xyXG5cclxuICAgIGlvbi10ZXh0IHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDMxcHg7XHJcbiAgICAgIGxlZnQ6IDUxcHg7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQuMjhkZWcpO1xyXG4gICAgICB3aWR0aDogMTEycHg7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5hZGQtY29hY2htYXJrIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogY2FsYygxMTdweCArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKSk7XHJcbiAgICByaWdodDogNzBweDtcclxuICAgIGlvbi10ZXh0IHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBib3R0b206IDYwcHg7XHJcbiAgICAgIHJpZ2h0OiAtNDVweDtcclxuICAgICAgd2lkdGg6IDE4MHB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC02Ljk4ZGVnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC53YXJuaW5nLWNvYWNobWFyayB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IGNhbGMoMjNweCArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKSk7XHJcbiAgICByaWdodDogY2FsYyg1MCUgLSAxMDBweCk7XHJcblxyXG4gICAgaW9uLXRleHQge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGJvdHRvbTogNTdweDtcclxuICAgICAgcmlnaHQ6IDU1cHg7XHJcbiAgICAgIHdpZHRoOiAxODNweDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTYuNzdkZWcpO1xyXG4gICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"],
        data: {
          animation: [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('geo-coachmark-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(1000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT, 0.9)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('add-fab-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(3000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT_BACK)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('add-text-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(4000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT, 0.9)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('warning-icon-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(5000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT_BACK)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('warning-coachmark-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(6000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT, 0.9))]
        }
      });
      /***/
    },

    /***/
    55759: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MapItemBarComponent": function MapItemBarComponent() {
          return (
            /* binding */
            _MapItemBarComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/services/helpers/helper.service */
      22791);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../core/services/geo-position/geo-position.service */
      27494);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _core_helpers_competence_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../core/helpers/competence-helper */
      26643);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);
      /* harmony import */


      var _competence_competence_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../competence/competence.component */
      87913);
      /* harmony import */


      var _img_swiper_img_swiper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../img-swiper/img-swiper.component */
      40855);
      /* harmony import */


      var _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../modules/shared/pipes/format-date/format-date.pipe */
      16531);

      var _c0 = function _c0() {
        return {
          "width.px": 16,
          "height.px": 16
        };
      };

      function MapItemBarComponent_div_0_div_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "svg-icon", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("svgStyle", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](5, _c0));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"]("", ctx_r1.masl, " ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 3, "MAP_CENTER_INFO.ABOVE_SEA_LEVEL"), "");
        }
      }

      var _c1 = function _c1(a0) {
        return {
          "full": a0
        };
      };

      function MapItemBarComponent_div_0_div_23_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "app-img-swiper", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](3, _c1, ctx_r2.imageUrls.length > 1));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("showLabels", false)("imgUrl", ctx_r2.imageUrls);
        }
      }

      function MapItemBarComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MapItemBarComponent_div_0_Template_div_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r3.navigateToItem();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-grid", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "svg-icon", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](8, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](9, "formatDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](10, MapItemBarComponent_div_0_div_10_Template, 5, 6, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "h5", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](18, "svg-icon", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](22, "app-competence", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](23, MapItemBarComponent_div_0_div_23_Template, 2, 5, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("svgStyle", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](12, _c0));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 8, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](9, 10, ctx_r0.topHeader)));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.masl);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r0.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("svgStyle", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](13, _c0));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r0.name);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("competenceLevel", ctx_r0.competenceLevel);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.imageUrls.length > 0);
        }
      }

      var _MapItemBarComponent = /*#__PURE__*/function () {
        // TODO: Rewrite this component to use observable. Maybe put visibleMapItem observable in map service?
        function _MapItemBarComponent(geoPositionService, helper, translateService, router, zone, userSettingService) {
          _classCallCheck(this, _MapItemBarComponent);

          this.geoPositionService = geoPositionService;
          this.helper = helper;
          this.translateService = translateService;
          this.router = router;
          this.zone = zone;
          this.userSettingService = userSettingService;
          this.imageUrls = [];
          this.visible = false;
          this._isVisible = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
        }

        _createClass(_MapItemBarComponent, [{
          key: "isVisible",
          get: function get() {
            return this._isVisible.asObservable();
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this2 = this;

            this.subscription = this.userSettingService.appModeLanguageAndCurrentGeoHazard$.subscribe(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 3),
                  appMode = _ref2[0],
                  _ = _ref2[1],
                  __ = _ref2[2];

              _this2.appMode = appMode;

              _this2.hide();
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
          key: "getTitle",
          value: function getTitle(item) {
            var allRegistrationNames = (item.Summaries || []).map(function (registration) {
              return registration.RegistrationName;
            });
            var uniqueValues = Array.from(new Set(allRegistrationNames));
            return uniqueValues.join(', ');
          }
        }, {
          key: "show",
          value: function show(item) {
            var _this3 = this;

            this.zone.run(function () {
              _this3.id = item.RegId;
              _this3.topHeader = item.DtObsTime;
              _this3.title = _this3.getTitle(item);
              _this3.name = item.Observer.NickName;
              _this3.competenceLevel = (0, _core_helpers_competence_helper__WEBPACK_IMPORTED_MODULE_4__.getStarCount)(item.Observer.CompetenceLevelName);
              _this3.geoHazard = item.GeoHazardTID;
              _this3.masl = item.ObsLocation ? item.ObsLocation.Height : undefined;

              _this3.setDistanceAndType(item);

              _this3.imageUrls = [];

              if (_this3.appMode && item.Attachments && item.Attachments.length > 0) {
                _this3.imageUrls = item.Attachments.map(function (attachment) {
                  return _this3.getImageUrl(attachment, 'Medium');
                });
              }

              _this3.visible = true;

              _this3.publishChange();
            });
          }
        }, {
          key: "hide",
          value: function hide() {
            var _this4 = this;

            this.zone.run(function () {
              _this4.visible = false;

              _this4.publishChange();
            });
          }
        }, {
          key: "getImageUrl",
          value: function getImageUrl(attachment) {
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Medium';
            return attachment.UrlFormats[size];
          }
        }, {
          key: "navigateToItem",
          value: function navigateToItem() {
            this.router.navigateByUrl("view-observation/".concat(this.id));
          }
        }, {
          key: "publishChange",
          value: function publishChange() {
            this._isVisible.next(this.visible);
          }
        }, {
          key: "setDistanceAndType",
          value: function setDistanceAndType(item) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this5 = this;

              var translations, currentPosition, distance;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      this.distanceAndType = ''; // set by promise

                      _context2.next = 3;
                      return this.translateService.get(['MAP_ITEM_BAR.OBSERVATION', 'MAP_ITEM_BAR.AWAY']).toPromise();

                    case 3:
                      translations = _context2.sent;
                      _context2.prev = 4;
                      _context2.next = 7;
                      return this.geoPositionService.currentPosition$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)).toPromise();

                    case 7:
                      currentPosition = _context2.sent;

                      if (currentPosition) {
                        distance = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(item.ObsLocation.Latitude, item.ObsLocation.Longitude).distanceTo(leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
                        this.zone.run(function () {
                          _this5.distanceAndType = "".concat(item.GeoHazardName).concat(translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase(), " ") + "".concat(_this5.helper.getDistanceText(distance), " ").concat(translations['MAP_ITEM_BAR.AWAY'].toLowerCase());
                        });
                      } else {
                        this.zone.run(function () {
                          _this5.distanceAndType = "".concat(item.GeoHazardName).concat(translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase());
                        });
                      }

                      _context2.next = 14;
                      break;

                    case 11:
                      _context2.prev = 11;
                      _context2.t0 = _context2["catch"](4);
                      this.zone.run(function () {
                        _this5.distanceAndType = "".concat(item.GeoHazardName).concat(translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase());
                      });

                    case 14:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this, [[4, 11]]);
            }));
          }
        }]);

        return _MapItemBarComponent;
      }();

      _MapItemBarComponent.ɵfac = function MapItemBarComponent_Factory(t) {
        return new (t || _MapItemBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_3__.GeoPositionService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_1__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__.UserSettingService));
      };

      _MapItemBarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _MapItemBarComponent,
        selectors: [["app-map-item-bar"]],
        decls: 1,
        vars: 1,
        consts: [["class", "map-item-bar", 3, "click", 4, "ngIf"], [1, "map-item-bar", 3, "click"], [1, "ion-text-wrap"], [1, "card-icon-item"], ["src", "/assets/icon/time.svg", 1, "card-icon-item-icon", 3, "svgStyle"], ["class", "card-icon-item", 4, "ngIf"], [1, "ion-no-margin", "ion-text-nowrap"], ["src", "/assets/icon/user.svg", 1, "card-icon-item-icon", 3, "svgStyle"], [3, "competenceLevel"], ["class", "img-wrapper", 3, "ngClass", 4, "ngIf"], ["src", "/assets/icon/moh.svg", 1, "card-icon-item-icon", 3, "svgStyle"], [1, "img-wrapper", 3, "ngClass"], [3, "showLabels", "imgUrl"]],
        template: function MapItemBarComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, MapItemBarComponent_div_0_Template, 24, 14, "div", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.visible);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonCol, angular_svg_icon__WEBPACK_IMPORTED_MODULE_16__.SvgIconComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonLabel, _competence_competence_component__WEBPACK_IMPORTED_MODULE_5__.CompetenceComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgClass, _img_swiper_img_swiper_component__WEBPACK_IMPORTED_MODULE_6__.ImgSwiperComponent],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe, _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_7__.FormatDatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe],
        styles: [".map-item-bar[_ngcontent-%COMP%] {\n  --img-wrapper-height: 22vh;\n  --img-wrapper-width: 30vh;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #fff;\n  z-index: var(--z-index-over-map);\n}\n.map-item-bar[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.map-item-bar[_ngcontent-%COMP%]   .card-icon-item[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding-right: 16px;\n  line-height: normal;\n}\n.map-item-bar[_ngcontent-%COMP%]   .card-icon-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%], .map-item-bar[_ngcontent-%COMP%]   .card-icon-item[_ngcontent-%COMP%]   app-competence[_ngcontent-%COMP%] {\n  position: relative;\n  bottom: 2px;\n}\n.map-item-bar[_ngcontent-%COMP%]   .card-icon-item[_ngcontent-%COMP%]   .card-icon-item-icon[_ngcontent-%COMP%] {\n  margin-right: 5px;\n}\n.map-item-bar[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0px;\n  width: var(--img-wrapper-width);\n  height: var(--img-wrapper-height);\n  top: calc(var(--img-wrapper-height) * -1);\n  display: flex;\n  justify-content: center;\n}\n.map-item-bar[_ngcontent-%COMP%]   .img-wrapper.full[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: none;\n}\n.map-item-bar[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   app-img-swiper[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: row;\n  justify-content: left;\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC1pdGVtLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDBCQUFBO0VBQ0EseUJBQUE7RUFFQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7QUFBRjtBQUVFO0VBQ0UsZ0JBQUE7RUFDQSx1QkFBQTtBQUFKO0FBR0U7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFESjtBQUdJOztFQUVFLGtCQUFBO0VBQ0EsV0FBQTtBQUROO0FBSUk7RUFDRSxpQkFBQTtBQUZOO0FBTUU7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSwrQkFBQTtFQUNBLGlDQUFBO0VBQ0EseUNBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7QUFKSjtBQU1JO0VBQ0UsV0FBQTtFQUNBLGVBQUE7QUFKTjtBQU9JO0VBQ0UsYUFBQTtFQUNBLE9BQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFMTiIsImZpbGUiOiJtYXAtaXRlbS1iYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFwLWl0ZW0tYmFyIHtcclxuICAtLWltZy13cmFwcGVyLWhlaWdodDogMjJ2aDtcclxuICAtLWltZy13cmFwcGVyLXdpZHRoOiAzMHZoO1xyXG5cclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICB6LWluZGV4OiB2YXIoLS16LWluZGV4LW92ZXItbWFwKTtcclxuXHJcbiAgaDUge1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIH1cclxuXHJcbiAgLmNhcmQtaWNvbi1pdGVtIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHBhZGRpbmctcmlnaHQ6IDE2cHg7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG5cclxuICAgIGlvbi1sYWJlbCxcclxuICAgIGFwcC1jb21wZXRlbmNlIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBib3R0b206IDJweDtcclxuICAgIH1cclxuXHJcbiAgICAuY2FyZC1pY29uLWl0ZW0taWNvbiB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmltZy13cmFwcGVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDBweDtcclxuICAgIHdpZHRoOiB2YXIoLS1pbWctd3JhcHBlci13aWR0aCk7XHJcbiAgICBoZWlnaHQ6IHZhcigtLWltZy13cmFwcGVyLWhlaWdodCk7XHJcbiAgICB0b3A6IGNhbGModmFyKC0taW1nLXdyYXBwZXItaGVpZ2h0KSAqIC0xKTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICAmLmZ1bGwge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgbWF4LXdpZHRoOiBub25lO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC1pbWctc3dpcGVyIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleDogMTtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    34299: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WarningGroupFavouriteToggleComponent": function WarningGroupFavouriteToggleComponent() {
          return (
            /* binding */
            _WarningGroupFavouriteToggleComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/warning/warning.service */
      90053);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      54364);

      var _c0 = function _c0(a0) {
        return {
          "favourite": a0
        };
      };

      var _WarningGroupFavouriteToggleComponent = /*#__PURE__*/function () {
        function _WarningGroupFavouriteToggleComponent(warningService, translateService, ngZone, domCtrl, renderer, toastController) {
          _classCallCheck(this, _WarningGroupFavouriteToggleComponent);

          this.warningService = warningService;
          this.translateService = translateService;
          this.ngZone = ngZone;
          this.domCtrl = domCtrl;
          this.renderer = renderer;
          this.toastController = toastController;
        }

        _createClass(_WarningGroupFavouriteToggleComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            var currentKey = changes.key.currentValue;

            if (!this._lastKey || this._lastKey.groupId !== currentKey.groupId) {
              this._lastKey = currentKey;
              this.startSubscription(currentKey);
            }
          }
        }, {
          key: "startSubscription",
          value: function startSubscription(key) {
            var _this6 = this;

            this.warningIsFavouriteSubscription = this.warningService.getIsFavouriteObservable(key.groupId, key.geoHazard).subscribe(function (val) {
              _this6.ngZone.run(function () {
                _this6.isFavourite = val;
              });
            });
          }
        }, {
          key: "setOpen",
          value: function setOpen(openAmount) {
            var _this7 = this;

            var scaleAmount = 1 + openAmount / 2.0;
            var scale = "scale3d(".concat(scaleAmount, ",").concat(scaleAmount, ",1)");
            this.domCtrl.write(function () {
              _this7.renderer.setStyle(_this7.ionIcon.el, 'transform', scale);
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.warningIsFavouriteSubscription) {
              this.warningIsFavouriteSubscription.unsubscribe();
            }
          }
        }, {
          key: "toggle",
          value: function toggle() {
            var _this8 = this;

            if (this.isFavourite) {
              this.warningService.removeFromFavourite(this.key.groupId, this.key.geoHazard).then(function () {
                return _this8.presentToast(false);
              });
            } else {
              this.warningService.addToFavourite(this.key.groupId, this.key.geoHazard).then(function () {
                return _this8.presentToast(true);
              });
            }
          }
        }, {
          key: "presentToast",
          value: function presentToast(added) {
            var _this9 = this;

            this.translateService.get(['WARNING_LIST.ADDED_TO_FAVOURITES', 'WARNING_LIST.REMOVED_FROM_FAVOURITES', 'ALERT.UNDO']).subscribe(function (translation) {
              return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(_this9, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this10 = this;

                var toast;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return this.toastController.create({
                          message: "".concat(this.key.groupName, " ").concat(added ? translation['WARNING_LIST.ADDED_TO_FAVOURITES'] : translation['WARNING_LIST.REMOVED_FROM_FAVOURITES']),
                          mode: 'md',
                          duration: 4000,
                          buttons: [{
                            text: translation['ALERT.UNDO'],
                            role: 'cancel',
                            handler: function handler() {
                              if (added) {
                                _this10.warningService.removeFromFavourite(_this10.key.groupId, _this10.key.geoHazard);
                              } else {
                                _this10.warningService.addToFavourite(_this10.key.groupId, _this10.key.geoHazard);
                              }
                            }
                          }]
                        });

                      case 2:
                        toast = _context3.sent;
                        toast.present();

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));
            });
          }
        }]);

        return _WarningGroupFavouriteToggleComponent;
      }();

      _WarningGroupFavouriteToggleComponent.ɵfac = function WarningGroupFavouriteToggleComponent_Factory(t) {
        return new (t || _WarningGroupFavouriteToggleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__.WarningService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.DomController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ToastController));
      };

      _WarningGroupFavouriteToggleComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _WarningGroupFavouriteToggleComponent,
        selectors: [["app-warning-group-favourite-toggle"]],
        viewQuery: function WarningGroupFavouriteToggleComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.ionIcon = _t.first);
          }
        },
        inputs: {
          key: "key"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]],
        decls: 1,
        vars: 3,
        consts: [["slot", "icon-only", "name", "star", 3, "ngClass"]],
        template: function WarningGroupFavouriteToggleComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](1, _c0, ctx.isFavourite));
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass],
        styles: ["ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\nion-icon.favourite[_ngcontent-%COMP%] {\n  color: yellow;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7QUFDSjtBQUFJO0VBQ0ksYUFBQTtBQUVSIiwiZmlsZSI6Indhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgICYuZmF2b3VyaXRlIHtcclxuICAgICAgICBjb2xvcjogeWVsbG93O1xyXG4gICAgfVxyXG59Il19 */"]
      });
      /***/
    },

    /***/
    68838: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WarningListHeaderComponent": function WarningListHeaderComponent() {
          return (
            /* binding */
            _WarningListHeaderComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
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

      function WarningListHeaderComponent_ion_grid_0_ion_col_6_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div");
        }
      }

      function WarningListHeaderComponent_ion_grid_0_ion_col_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, WarningListHeaderComponent_ion_grid_0_ion_col_6_div_1_Template, 1, 0, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r2);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "ios": a0
        };
      };

      function WarningListHeaderComponent_ion_grid_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-grid", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h3", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, WarningListHeaderComponent_ion_grid_0_ion_col_6_Template, 2, 1, "ion-col", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c0, ctx_r0.ios));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 3, ctx_r0.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.showDayNames);
        }
      }

      function WarningListHeaderComponent_ion_grid_1_ion_col_10_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div");
        }
      }

      function WarningListHeaderComponent_ion_grid_1_ion_col_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, WarningListHeaderComponent_ion_grid_1_ion_col_10_div_1_Template, 1, 0, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r2);
        }
      }

      function WarningListHeaderComponent_ion_grid_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-grid", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ion-label", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, WarningListHeaderComponent_ion_grid_1_ion_col_10_Template, 2, 1, "ion-col", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 3, ctx_r1.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 5, ctx_r1.subTitle), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.showDayNames);
        }
      }

      function WarningListHeaderComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-grid", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-col", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ion-col", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "ion-col", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 3, ctx_r3.getDayName(0)), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 5, ctx_r3.getDayName(1)), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](10, 7, ctx_r3.getDayName(2)), " ");
        }
      }

      var _WarningListHeaderComponent = /*#__PURE__*/function () {
        function _WarningListHeaderComponent(platform) {
          _classCallCheck(this, _WarningListHeaderComponent);

          this.platform = platform;
        }

        _createClass(_WarningListHeaderComponent, [{
          key: "ios",
          get: function get() {
            return this.platform.is('ios');
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "getDayName",
          value: function getDayName(daysToAdd) {
            return "DAYS.SHORT.".concat(moment__WEBPACK_IMPORTED_MODULE_0___default()().add(daysToAdd, 'days').day());
          }
        }]);

        return _WarningListHeaderComponent;
      }();

      _WarningListHeaderComponent.ɵfac = function WarningListHeaderComponent_Factory(t) {
        return new (t || _WarningListHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.Platform));
      };

      _WarningListHeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _WarningListHeaderComponent,
        selectors: [["app-warning-list-header"]],
        inputs: {
          title: "title",
          subTitle: "subTitle",
          showDayNames: "showDayNames"
        },
        decls: 4,
        vars: 2,
        consts: [["class", "header-grid ion-no-padding ion-no-margin", 3, "ngClass", 4, "ngIf"], ["class", "header-grid ion-no-margin ion-no-padding", 4, "ngIf"], ["dayNames", ""], [1, "header-grid", "ion-no-padding", "ion-no-margin", 3, "ngClass"], ["size", "6", 1, "ion-no-padding"], [1, "ion-text-uppercase"], ["size", "6", "class", "ion-no-padding ion-align-self-end", 4, "ngIf"], ["size", "6", 1, "ion-no-padding", "ion-align-self-end"], [4, "ngTemplateOutlet"], [1, "header-grid", "ion-no-margin", "ion-no-padding"], ["color", "medium", 1, "ion-text-wrap"], ["offset", "6", "size", "6", "class", "ion-no-padding ion-align-self-end", 4, "ngIf"], ["offset", "6", "size", "6", 1, "ion-no-padding", "ion-align-self-end"], [1, "dayNames", "ion-no-padding"], [1, "ion-text-center"]],
        template: function WarningListHeaderComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, WarningListHeaderComponent_ion_grid_0_Template, 7, 7, "ion-grid", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, WarningListHeaderComponent_ion_grid_1_Template, 11, 7, "ion-grid", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, WarningListHeaderComponent_ng_template_2_Template, 11, 9, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.subTitle);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.subTitle);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonGrid, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgTemplateOutlet, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonLabel],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
        styles: ["ion-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 3px;\n}\nion-grid.header-grid.ios[_ngcontent-%COMP%] {\n  margin-right: -8px !important;\n}\n.dayNames[_ngcontent-%COMP%] {\n  width: 144px;\n  margin-right: 0px;\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmctbGlzdC1oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0k7RUFDSSxrQkFBQTtBQUFSO0FBR0k7RUFDSSw2QkFBQTtBQURSO0FBS0E7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBRkoiLCJmaWxlIjoid2FybmluZy1saXN0LWhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcclxuICAgIGgzIHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAzcHg7XHJcbiAgICB9XHJcblxyXG4gICAgJi5oZWFkZXItZ3JpZC5pb3Mge1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogLThweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG59XHJcblxyXG4uZGF5TmFtZXMge1xyXG4gICAgd2lkdGg6IDE0NHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn0iXX0= */"]
      });
      /***/
    },

    /***/
    44843: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WarningListItemComponent": function WarningListItemComponent() {
          return (
            /* binding */
            _WarningListItemComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _core_services_warning_warning_group_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/warning/warning-group.model */
      32714);
      /* harmony import */


      var _core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/services/external-link/external-link.service */
      11810);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../settings */
      30015);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../warning-group-favourite-toggle/warning-group-favourite-toggle.component */
      34299);
      /* harmony import */


      var _modules_analytics_services_analytic_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../modules/analytics/services/analytic.service */
      82367);
      /* harmony import */


      var _modules_analytics_enums_app_event_category_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../modules/analytics/enums/app-event-category.enum */
      89220);
      /* harmony import */


      var _modules_analytics_enums_app_event_action_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../modules/analytics/enums/app-event-action.enum */
      11995);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! rxjs */
      14500);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! rxjs */
      47599);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! rxjs */
      24390);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! rxjs/operators */
      34864);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../core/helpers/observable-helper */
      59364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _modules_shared_components_geo_icon_geo_icon_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../modules/shared/components/geo-icon/geo-icon.component */
      12010);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../modules/shared/pipes/format-date/format-date.pipe */
      16531);

      function WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_ion_icon_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "ion-icon", 14);
        }
      }

      function WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-badge", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_Template_ion_badge_click_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r10);

            var day_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);

            return ctx_r9.navigateToWebByDay($event, ctx_r9.warningGroup, day_r5);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_ion_icon_2_Template, 1, 0, "ion-icon", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var warning_r7 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", "warninglevel-" + warning_r7.warningLevel);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", warning_r7.warningLevel > 0 ? warning_r7.warningLevel : "?", " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", warning_r7.emergencyWarning);
        }
      }

      function WarningListItemComponent_ion_item_1_ion_col_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_Template, 3, 3, "ion-badge", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var day_r5 = ctx.$implicit;

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r4.warningGroup.getDayWarning(day_r5))("ngIfElse", _r2);
        }
      }

      var _c0 = function _c0(a0) {
        return [a0];
      };

      var _c1 = function _c1() {
        return [0, 1, 2];
      };

      function WarningListItemComponent_ion_item_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_1_Template_div_click_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r13);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r12.navigateToWeb($event, ctx_r12.warningGroup);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "app-geo-icon", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-label", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_1_Template_ion_label_click_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r13);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r14.navigateToWeb($event, ctx_r14.warningGroup);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "ion-grid");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, WarningListItemComponent_ion_item_1_ion_col_8_Template, 2, 2, "ion-col", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("detail", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("geoHazards", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](4, _c0, ctx_r0.warningGroup.key.geoHazard));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r0.warningGroup.key.groupName);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction0"](6, _c1));
        }
      }

      function WarningListItemComponent_ion_item_2_span_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "formatDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 2, "WARNING_LIST.VALID_FROM"), ": ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind4"](4, 6, ctx_r15.warningGroup.validFrom, true, false, false)), "");
        }
      }

      function WarningListItemComponent_ion_item_2_span_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "formatDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" - ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind4"](3, 3, ctx_r16.warningGroup.validTo, true, false, false)), "");
        }
      }

      function WarningListItemComponent_ion_item_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_2_Template_div_click_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r18);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r17.navigateToWeb($event, ctx_r17.warningGroup);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "app-geo-icon", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-label", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_2_Template_ion_label_click_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r18);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r19.navigateToWeb($event, ctx_r19.warningGroup);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, WarningListItemComponent_ion_item_2_span_7_Template, 5, 11, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, WarningListItemComponent_ion_item_2_span_8_Template, 4, 8, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("detail", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("geoHazards", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](5, _c0, ctx_r1.warningGroup.key.geoHazard));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r1.warningGroup.key.groupName);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.warningGroup.validFrom);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.warningGroup.validTo);
        }
      }

      function WarningListItemComponent_ng_template_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-badge", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "?");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }
      }

      var _WarningListItemComponent = /*#__PURE__*/function (_core_helpers_observa) {
        _inherits(_WarningListItemComponent, _core_helpers_observa);

        var _super = _createSuper(_WarningListItemComponent);

        function _WarningListItemComponent(externalLinkService, userSettingService, domCtrl, analyticService, renderer) {
          var _this11;

          _classCallCheck(this, _WarningListItemComponent);

          _this11 = _super.call(this);
          _this11.externalLinkService = externalLinkService;
          _this11.userSettingService = userSettingService;
          _this11.domCtrl = domCtrl;
          _this11.analyticService = analyticService;
          _this11.renderer = renderer;
          _this11.GeoHazard = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.GeoHazard;
          _this11.dragSubject = new rxjs__WEBPACK_IMPORTED_MODULE_14__.Subject();
          return _this11;
        }

        _createClass(_WarningListItemComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this12 = this;

            this.dragSubject.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.switchMap)(function () {
              return _this12.getOpenAmount();
            })).subscribe(function (openAmount) {
              var opacity = openAmount > 1 ? 1 : openAmount > 0 ? openAmount : 0;
              var color = "rgba(186,196,204,".concat(opacity, ")");

              _this12.favouriteToggle.setOpen(opacity);

              _this12.domCtrl.write(function () {
                _this12.renderer.setStyle(_this12.itemSlide.el, 'background-color', color);
              });
            });
            this.ngDestroy$.subscribe(function () {
              _this12.close();
            });
          }
        }, {
          key: "close",
          value: function close() {
            if (this.itemSlide) {
              this.itemSlide.close();
            }
          }
        }, {
          key: "onDrag",
          value: function onDrag() {
            this.dragSubject.next();
          }
        }, {
          key: "getOpenAmount",
          value: function getOpenAmount() {
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_17__.from)(this.itemSlide.getOpenAmount()).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.catchError)(function () {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_19__.of)(0);
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.map)(function (val) {
              return val > 0 ? val / 100.0 : 0;
            }));
          }
        }, {
          key: "toggleFavourite",
          value: function toggleFavourite() {
            var _this13 = this;

            this.favouriteToggle.toggle();
            (0, rxjs__WEBPACK_IMPORTED_MODULE_21__.timer)(2000).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$)).subscribe(function () {
              if (_this13.itemSlide) {
                _this13.itemSlide.close();
              }
            });
          }
        }, {
          key: "itemSwiped",
          value: function itemSwiped() {
            this.toggleFavourite();
          }
        }, {
          key: "getUrl",
          value: function getUrl(group) {
            var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            return (0, tslib__WEBPACK_IMPORTED_MODULE_22__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var currentLang, supportedLang, url;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!group.url) {
                        _context4.next = 4;
                        break;
                      }

                      return _context4.abrupt("return", group.url);

                    case 4:
                      _context4.next = 6;
                      return this.userSettingService.language$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.take)(1)).toPromise();

                    case 6:
                      currentLang = _context4.sent;
                      supportedLang = this.getSupportedLangOrFallbackToEn(currentLang);
                      url = _settings__WEBPACK_IMPORTED_MODULE_2__.settings.services.warning[_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.GeoHazard[group.key.geoHazard]].webUrl[_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey[supportedLang]];

                      if (!url) {
                        _context4.next = 13;
                        break;
                      }

                      return _context4.abrupt("return", encodeURI(url.replace('{regionName}', group.key.groupName).replace('{regionId}', group.key.groupId).replace('{day}', day)));

                    case 13:
                      return _context4.abrupt("return", null);

                    case 14:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "getSupportedLangOrFallbackToEn",
          value: function getSupportedLangOrFallbackToEn(lang) {
            if (lang === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey.nb || lang === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey.nn) {
              return _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey.nb;
            }

            return _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey.en;
          }
        }, {
          key: "navigateToWeb",
          value: function navigateToWeb(event, group) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_22__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var url;
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      event.preventDefault();
                      _context5.next = 3;
                      return this.getUrl(group);

                    case 3:
                      url = _context5.sent;

                      if (url) {
                        this.analyticService.trackEvent(_modules_analytics_enums_app_event_category_enum__WEBPACK_IMPORTED_MODULE_7__.AppEventCategory.Warnings, _modules_analytics_enums_app_event_action_enum__WEBPACK_IMPORTED_MODULE_8__.AppEventAction.Click, group.getKeyAsString());
                        this.externalLinkService.openExternalLink(url);
                      }

                    case 5:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));
          }
        }, {
          key: "navigateToWebByDay",
          value: function navigateToWebByDay(event, group, day) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_22__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              var dateString, url;
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      event.preventDefault();
                      dateString = moment__WEBPACK_IMPORTED_MODULE_3___default()().startOf('day').add(day, 'days').format(_settings__WEBPACK_IMPORTED_MODULE_2__.settings.services.warning.dateFormat);
                      _context6.next = 4;
                      return this.getUrl(group, dateString);

                    case 4:
                      url = _context6.sent;

                      if (url) {
                        this.analyticService.trackEvent(_modules_analytics_enums_app_event_category_enum__WEBPACK_IMPORTED_MODULE_7__.AppEventCategory.Warnings, _modules_analytics_enums_app_event_action_enum__WEBPACK_IMPORTED_MODULE_8__.AppEventAction.Click, group.getKeyAsString());
                        this.externalLinkService.openExternalLink(url);
                      }

                    case 6:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
          }
        }]);

        return _WarningListItemComponent;
      }(_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_9__.NgDestoryBase);

      _WarningListItemComponent.ɵfac = function WarningListItemComponent_Factory(t) {
        return new (t || _WarningListItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_1__.ExternalLinkService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_4__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_24__.DomController), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_modules_analytics_services_analytic_service__WEBPACK_IMPORTED_MODULE_6__.AnalyticService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Renderer2));
      };

      _WarningListItemComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
        type: _WarningListItemComponent,
        selectors: [["app-warning-list-item"]],
        viewQuery: function WarningListItemComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItemSliding, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_5__.WarningGroupFavouriteToggleComponent, 7);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.itemSlide = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.favouriteToggle = _t.first);
          }
        },
        inputs: {
          warningGroup: "warningGroup"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
        decls: 8,
        vars: 3,
        consts: [[3, "ionDrag"], ["class", "ion-no-padding", "lines", "full", 3, "detail", 4, "ngIf"], ["side", "end", 3, "ionSwipe"], ["expandable", "true", 3, "click"], [3, "key"], ["emptyWarning", ""], ["lines", "full", 1, "ion-no-padding", 3, "detail"], ["slot", "start", 1, "geo-icon-circle", 3, "click"], [3, "geoHazards"], [3, "click"], [4, "ngFor", "ngForOf"], [3, "color", "click", 4, "ngIf", "ngIfElse"], [3, "color", "click"], ["name", "alert", 4, "ngIf"], ["name", "alert"], [4, "ngIf"], ["color", "warninglevel-0"]],
        template: function WarningListItemComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item-sliding", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionDrag", function WarningListItemComponent_Template_ion_item_sliding_ionDrag_0_listener() {
              return ctx.onDrag();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, WarningListItemComponent_ion_item_1_Template, 9, 7, "ion-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, WarningListItemComponent_ion_item_2_Template, 9, 7, "ion-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-item-options", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionSwipe", function WarningListItemComponent_Template_ion_item_options_ionSwipe_3_listener() {
              return ctx.itemSwiped();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "ion-item-option", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_Template_ion_item_option_click_4_listener() {
              return ctx.toggleFavourite();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "app-warning-group-favourite-toggle", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](6, WarningListItemComponent_ng_template_6_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.warningGroup.key.geoHazard !== ctx.GeoHazard.Ice);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.warningGroup.key.geoHazard === ctx.GeoHazard.Ice);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("key", ctx.warningGroup.key);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItemSliding, _angular_common__WEBPACK_IMPORTED_MODULE_25__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItemOptions, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItemOption, _warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_5__.WarningGroupFavouriteToggleComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItem, _modules_shared_components_geo_icon_geo_icon_component__WEBPACK_IMPORTED_MODULE_10__.GeoIconComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonRow, _angular_common__WEBPACK_IMPORTED_MODULE_25__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonBadge, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_26__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_25__.AsyncPipe, _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_11__.FormatDatePipe],
        styles: ["[_ngcontent-%COMP%]:root {\n  --sliding-background: lightgrey;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --inner-padding-end: 0px;\n}\n\nion-item[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%] {\n  display: contents;\n}\n\nion-item-sliding[_ngcontent-%COMP%] {\n  --background: var(--sliding-background);\n}\n\nion-item-option[_ngcontent-%COMP%] {\n  --background: rgba(0,0,0,0);\n}\n\n.geo-icon-circle[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\nion-badge[_ngcontent-%COMP%] {\n  border-radius: 2px;\n  height: 36px;\n  width: 36px;\n  color: #fff;\n  font-size: 17px;\n  font-weight: bold;\n  line-height: 30px;\n  text-align: center;\n  display: block;\n}\n\nion-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  position: relative;\n  top: 3px;\n  left: -5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmctbGlzdC1pdGVtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksK0JBQUE7QUFDSjs7QUFFQTtFQUNJLHdCQUFBO0FBQ0o7O0FBQ0k7RUFDSSxpQkFBQTtBQUNSOztBQUdBO0VBQ0ksdUNBQUE7QUFBSjs7QUFHQTtFQUNJLDJCQUFBO0FBQUo7O0FBR0E7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQUo7O0FBRUk7RUFDSSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0FBQVIiLCJmaWxlIjoid2FybmluZy1saXN0LWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6cm9vdCB7XHJcbiAgICAtLXNsaWRpbmctYmFja2dyb3VuZDogbGlnaHRncmV5O1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwcHg7XHJcblxyXG4gICAgaW9uLWdyaWQge1xyXG4gICAgICAgIGRpc3BsYXk6IGNvbnRlbnRzO1xyXG4gICAgfVxyXG59XHJcblxyXG5pb24taXRlbS1zbGlkaW5nIHtcclxuICAgIC0tYmFja2dyb3VuZDogdmFyKC0tc2xpZGluZy1iYWNrZ3JvdW5kKTtcclxufVxyXG5cclxuaW9uLWl0ZW0tb3B0aW9uIHtcclxuICAgIC0tYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwKTtcclxufVxyXG5cclxuLmdlby1pY29uLWNpcmNsZSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuaW9uLWJhZGdlIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIGhlaWdodDogMzZweDtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcblxyXG4gICAgaW9uLWljb24ge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICB0b3A6IDNweDtcclxuICAgICAgICBsZWZ0OiAtNXB4O1xyXG4gICAgfVxyXG59ICAgIl19 */"]
      });
      /***/
    },

    /***/
    17644: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MapItemMarker": function MapItemMarker() {
          return (
            /* binding */
            _MapItemMarker
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


      var _modules_map_core_classes_regobs_geohazard_marker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../modules/map/core/classes/regobs-geohazard-marker */
      80968);

      var _MapItemMarker = /*#__PURE__*/function (_leaflet__WEBPACK_IMP) {
        _inherits(_MapItemMarker, _leaflet__WEBPACK_IMP);

        var _super2 = _createSuper(_MapItemMarker);

        function _MapItemMarker(item, latlng, options) {
          var _this14;

          _classCallCheck(this, _MapItemMarker);

          _this14 = _super2.call(this, latlng, options);
          _this14._item = item;

          _this14.updateIcon();

          return _this14;
        }

        _createClass(_MapItemMarker, [{
          key: "item",
          get: function get() {
            return Object.assign({}, this._item);
          }
        }, {
          key: "id",
          get: function get() {
            return this._item.RegId;
          }
        }, {
          key: "isSelected",
          get: function get() {
            return this._isSelected;
          }
        }, {
          key: "setSelected",
          value: function setSelected() {
            this._isSelected = true;
            this.updateIcon();
          }
        }, {
          key: "deselect",
          value: function deselect() {
            this._isSelected = false;
            this.updateIcon();
          }
        }, {
          key: "updateIcon",
          value: function updateIcon() {
            this.setIcon(new _modules_map_core_classes_regobs_geohazard_marker__WEBPACK_IMPORTED_MODULE_1__.RegobsGeoHazardMarker(this._item.GeoHazardTID, this._isSelected));
          }
        }]);

        return _MapItemMarker;
      }(leaflet__WEBPACK_IMPORTED_MODULE_0__.Marker);
      /***/

    },

    /***/
    8402: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "RouterPage": function RouterPage() {
          return (
            /* binding */
            _RouterPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      14500);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      76477);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      95051);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _RouterPage = /*#__PURE__*/function () {
        function _RouterPage(router, route) {
          var _this15 = this;

          _classCallCheck(this, _RouterPage);

          this.router = router;
          this.route = route;
          this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
          this.isActive = false;
          router.events.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.takeUntil)(this.ngUnsubscribe), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(function (event) {
            return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd;
          }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.concatMap)(function () {
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.from)(Promise.resolve(_this15.detectEnterOrLeave()));
          })).subscribe();
        }

        _createClass(_RouterPage, [{
          key: "isComponentActive",
          value: function isComponentActive(path, component) {
            var _this16 = this;

            var isActive = false;
            path.forEach(function (ss) {
              if (ss.component === component) {
                isActive = true;
              } else {
                isActive = _this16.isComponentActive(ss.children, component);
              }
            });
            return isActive;
          }
        }, {
          key: "detectEnterOrLeave",
          value: function detectEnterOrLeave() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var isActiveNow;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      isActiveNow = this.isComponentActive(this.router.routerState.snapshot.root.pathFromRoot, this.route.snapshot.component);

                      if (!(!this.isActive && isActiveNow)) {
                        _context7.next = 7;
                        break;
                      }

                      this.isActive = true;
                      _context7.next = 5;
                      return this.onEnter();

                    case 5:
                      _context7.next = 11;
                      break;

                    case 7:
                      if (!(this.isActive && !isActiveNow)) {
                        _context7.next = 11;
                        break;
                      }

                      this.isActive = false;
                      _context7.next = 11;
                      return this.onLeave();

                    case 11:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngUnsubscribe.next();
            this.ngUnsubscribe.complete();
          }
        }]);

        return _RouterPage;
      }();

      _RouterPage.ɵfac = function RouterPage_Factory(t) {
        return new (t || _RouterPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute));
      };

      _RouterPage.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
        token: _RouterPage,
        factory: _RouterPage.ɵfac
      });
      /***/
    },

    /***/
    12031: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UsageAnalyticsConsentService": function UsageAnalyticsConsentService() {
          return (
            /* binding */
            _UsageAnalyticsConsentService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../user-setting/user-setting.service */
      22276);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var ALLOW_ANALYTICS_HEADER = 'SETTINGS.ALLOW_ANALYTICS_HEADER';
      var ALLOW_ANALYTICS_DESCRIPTION = 'SETTINGS.ALLOW_ANALYTICS_DESCRIPTION';
      var ALLOW_ANALYTICS_DESCRIPTION_LINE_2 = 'SETTINGS.ALLOW_ANALYTICS_DESCRIPTION_LINE2';
      var READ_MORE_TEXT = 'SETTINGS.READ_MORE_IN_LICENSE_AGREEMENT';
      var OK = 'ALERT.FINE';
      var NO_THANKS = 'ALERT.NO_THANKS';

      var _UsageAnalyticsConsentService = /*#__PURE__*/function () {
        function _UsageAnalyticsConsentService(userSettingService, alertController, platform, translateService) {
          _classCallCheck(this, _UsageAnalyticsConsentService);

          this.userSettingService = userSettingService;
          this.alertController = alertController;
          this.platform = platform;
          this.translateService = translateService;
        }

        _createClass(_UsageAnalyticsConsentService, [{
          key: "checkUserDataConsentDialog",
          value: function checkUserDataConsentDialog() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var userSettings;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1)).toPromise();

                    case 2:
                      userSettings = _context8.sent;

                      if (userSettings.consentForSendingAnalyticsDialogCompleted) {
                        _context8.next = 6;
                        break;
                      }

                      _context8.next = 6;
                      return this.showConsentForSendingAnalyticsDialog();

                    case 6:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "showConsentForSendingAnalyticsDialog",
          value: function showConsentForSendingAnalyticsDialog() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
              var _this17 = this;

              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      return _context10.abrupt("return", new Promise(function (resolve) {
                        return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(_this17, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                          var _this18 = this;

                          var translations, cssClass, buttonOK, buttonNo, buttons, alert;
                          return regeneratorRuntime.wrap(function _callee9$(_context9) {
                            while (1) {
                              switch (_context9.prev = _context9.next) {
                                case 0:
                                  _context9.next = 2;
                                  return this.translateService.get([ALLOW_ANALYTICS_HEADER, ALLOW_ANALYTICS_DESCRIPTION, ALLOW_ANALYTICS_DESCRIPTION_LINE_2, READ_MORE_TEXT, OK, NO_THANKS]).toPromise();

                                case 2:
                                  translations = _context9.sent;
                                  cssClass = this.platform.is('ios') ? ['normal-weight', 'full-width'] : [];
                                  buttonOK = {
                                    cssClass: cssClass,
                                    text: translations[OK],
                                    handler: function handler() {
                                      return _this18.saveSettings(true).then(function () {
                                        return resolve();
                                      });
                                    }
                                  };
                                  buttonNo = {
                                    cssClass: cssClass,
                                    text: translations[NO_THANKS],
                                    handler: function handler() {
                                      return _this18.saveSettings(false).then(function () {
                                        return resolve();
                                      });
                                    }
                                  };
                                  buttons = this.platform.is('ios') ? [buttonOK, buttonNo] : [buttonNo, buttonOK];
                                  _context9.next = 9;
                                  return this.alertController.create({
                                    header: translations[ALLOW_ANALYTICS_HEADER],
                                    message: "".concat(translations[ALLOW_ANALYTICS_DESCRIPTION], "<br /><br />").concat(translations[ALLOW_ANALYTICS_DESCRIPTION_LINE_2], "<br /><br />").concat(translations[READ_MORE_TEXT]),
                                    buttons: buttons,
                                    backdropDismiss: false // Prevent from closing without choosing

                                  });

                                case 9:
                                  alert = _context9.sent;
                                  _context9.next = 12;
                                  return alert.present();

                                case 12:
                                case "end":
                                  return _context9.stop();
                              }
                            }
                          }, _callee9, this);
                        }));
                      }));

                    case 1:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, _callee10);
            }));
          }
        }, {
          key: "saveSettings",
          value: function saveSettings(accepted) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
              var currentSettings;
              return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1)).toPromise();

                    case 2:
                      currentSettings = _context11.sent;
                      this.userSettingService.saveUserSettings(Object.assign(Object.assign({}, currentSettings), {
                        consentForSendingAnalytics: accepted,
                        consentForSendingAnalyticsDialogCompleted: true
                      }));

                    case 4:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11, this);
            }));
          }
        }]);

        return _UsageAnalyticsConsentService;
      }();

      _UsageAnalyticsConsentService.ɵfac = function UsageAnalyticsConsentService_Factory(t) {
        return new (t || _UsageAnalyticsConsentService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService));
      };

      _UsageAnalyticsConsentService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: _UsageAnalyticsConsentService,
        factory: _UsageAnalyticsConsentService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    37944: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DataLoadComponent": function DataLoadComponent() {
          return (
            /* binding */
            _DataLoadComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      57850);
      /* harmony import */


      var _services_data_load_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/data-load.service */
      97123);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function DataLoadComponent_ion_grid_1_ion_row_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 2, "DATA_LOAD.LOADING"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](5, 4, item_r3.progress * 100, ".1"), " %");
        }
      }

      function DataLoadComponent_ion_grid_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-grid");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DataLoadComponent_ion_grid_1_ion_row_1_Template, 6, 7, "ion-row", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.dataLoad);
        }
      }

      function DataLoadComponent_ion_spinner_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "ion-spinner");
        }
      }

      var _c0 = function _c0(a0, a1) {
        return {
          "fadeIn": a0,
          "fadeOut": a1
        };
      };

      var _DataLoadComponent = /*#__PURE__*/function () {
        function _DataLoadComponent(dataLoadService, ngZone) {
          _classCallCheck(this, _DataLoadComponent);

          this.dataLoadService = dataLoadService;
          this.ngZone = ngZone;
          this.dataLoad = [];
        }

        _createClass(_DataLoadComponent, [{
          key: "isLoading",
          get: function get() {
            return this.dataLoad.length > 0;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            var _this19 = this;

            var ids = changes.ids.currentValue;

            if (ids && ids.length > 0) {
              this.subscription = (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.combineLatest)(ids.map(function (id) {
                return _this19.dataLoadService.getStateAsObservable(id);
              })).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(function (val) {
                return val.filter(function (item) {
                  return item.isLoading;
                });
              })).subscribe(function (val) {
                _this19.ngZone.run(function () {
                  _this19.dataLoad = val;
                });
              });
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
          }
        }]);

        return _DataLoadComponent;
      }();

      _DataLoadComponent.ɵfac = function DataLoadComponent_Factory(t) {
        return new (t || _DataLoadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_data_load_service__WEBPACK_IMPORTED_MODULE_0__.DataLoadService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone));
      };

      _DataLoadComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _DataLoadComponent,
        selectors: [["app-data-load"]],
        inputs: {
          ids: "ids",
          simple: "simple"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
        decls: 3,
        vars: 6,
        consts: [[1, "data-load", "animated", 3, "ngClass"], [4, "ngIf"], [4, "ngFor", "ngForOf"]],
        template: function DataLoadComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DataLoadComponent_ion_grid_1_Template, 2, 1, "ion-grid", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, DataLoadComponent_ion_spinner_2_Template, 1, 0, "ion-spinner", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](3, _c0, ctx.isLoading, !ctx.isLoading));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.simple);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.simple);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonGrid, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonSpinner],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DecimalPipe],
        styles: ["@-webkit-keyframes fadeOutFromCurrent {\n  0% {\n    opacity: 0;\n    opacity: var(--current-opacity, 0);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fadeOutFromCurrent {\n  0% {\n    opacity: 0;\n    opacity: var(--current-opacity, 0);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.data-load[_ngcontent-%COMP%] {\n  position: absolute;\n  color: #fff;\n  top: 20px;\n  left: 50%;\n  transform: translateX(-20px);\n  width: 28px;\n  height: 28px;\n  z-index: calc(var(--z-index-over-map) - 1);\n  opacity: 0;\n  opacity: var(--current-opacity, 0);\n}\n.data-load.fadeIn[_ngcontent-%COMP%] {\n  --current-opacity: 1;\n}\n.data-load.fadeOut[_ngcontent-%COMP%] {\n  --current-opacity: 0;\n  -webkit-animation-name: fadeOutFromCurrent;\n          animation-name: fadeOutFromCurrent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEtbG9hZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJO0lBQ0ksVUFBQTtJQUFBLGtDQUFBO0VBQ047RUFFRTtJQUNJLFVBQUE7RUFBTjtBQUNGO0FBUEE7RUFDSTtJQUNJLFVBQUE7SUFBQSxrQ0FBQTtFQUNOO0VBRUU7SUFDSSxVQUFBO0VBQU47QUFDRjtBQUdBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7RUFDQSw0QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsMENBQUE7RUFHQSxVQUFBO0VBQUEsa0NBQUE7QUFISjtBQUtJO0VBQ0ksb0JBQUE7QUFIUjtBQU1JO0VBQ0ksb0JBQUE7RUFDQSwwQ0FBQTtVQUFBLGtDQUFBO0FBSlIiLCJmaWxlIjoiZGF0YS1sb2FkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGtleWZyYW1lcyBmYWRlT3V0RnJvbUN1cnJlbnQge1xyXG4gICAgMCUge1xyXG4gICAgICAgIG9wYWNpdHk6IHZhcigtLWN1cnJlbnQtb3BhY2l0eSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgIH1cclxufVxyXG5cclxuLmRhdGEtbG9hZCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHRvcDogMjBweDtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XHJcbiAgICB3aWR0aDogMjhweDtcclxuICAgIGhlaWdodDogMjhweDtcclxuICAgIHotaW5kZXg6IGNhbGModmFyKC0tei1pbmRleC1vdmVyLW1hcCkgLSAxKTtcclxuICAgIC8vIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1hcC1mYWRlZC1vdmVybGF5LWJhY2tncm91bmQpO1xyXG4gICAgLy8gYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgb3BhY2l0eTogdmFyKC0tY3VycmVudC1vcGFjaXR5LCAwKTtcclxuXHJcbiAgICAmLmZhZGVJbiB7XHJcbiAgICAgICAgLS1jdXJyZW50LW9wYWNpdHk6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgJi5mYWRlT3V0IHtcclxuICAgICAgICAtLWN1cnJlbnQtb3BhY2l0eTogMDtcclxuICAgICAgICBhbmltYXRpb24tbmFtZTogZmFkZU91dEZyb21DdXJyZW50O1xyXG4gICAgfVxyXG59Il19 */"]
      });
      /***/
    },

    /***/
    35125: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DataLoadModule": function DataLoadModule() {
          return (
            /* binding */
            _DataLoadModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./components/data-load/data-load.component */
      37944);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _DataLoadModule = function _DataLoadModule() {
        _classCallCheck(this, _DataLoadModule);
      };

      _DataLoadModule.ɵfac = function DataLoadModule_Factory(t) {
        return new (t || _DataLoadModule)();
      };

      _DataLoadModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: _DataLoadModule
      });
      _DataLoadModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](_DataLoadModule, {
          declarations: [_components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_0__.DataLoadComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateModule],
          exports: [_components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_0__.DataLoadComponent]
        });
      })();
      /***/

    },

    /***/
    47434: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

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
    57994: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HomePageModule": function HomePageModule() {
          return (
            /* binding */
            _HomePageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./home.page */
      10678);
      /* harmony import */


      var _components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../components/map-item-bar/map-item-bar.component */
      55759);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _modules_data_load_data_load_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../modules/data-load/data-load.module */
      35125);
      /* harmony import */


      var _modules_map_map_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../modules/map/map.module */
      14522);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _HomePageModule = function _HomePageModule() {
        _classCallCheck(this, _HomePageModule);
      };

      _HomePageModule.ɵfac = function HomePageModule_Factory(t) {
        return new (t || _HomePageModule)();
      };

      _HomePageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: _HomePageModule
      });
      _HomePageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild([{
          path: '',
          component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage
        }]), _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _modules_data_load_data_load_module__WEBPACK_IMPORTED_MODULE_3__.DataLoadModule, _modules_map_map_module__WEBPACK_IMPORTED_MODULE_4__.MapModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](_HomePageModule, {
          declarations: [_home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage, _components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_1__.MapItemBarComponent],
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _modules_data_load_data_load_module__WEBPACK_IMPORTED_MODULE_3__.DataLoadModule, _modules_map_map_module__WEBPACK_IMPORTED_MODULE_4__.MapModule]
        });
      })();
      /***/

    },

    /***/
    10678: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HomePage": function HomePage() {
          return (
            /* binding */
            _HomePage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var leaflet_markercluster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! leaflet.markercluster */
      73008);
      /* harmony import */


      var leaflet_markercluster__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_markercluster__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! rxjs */
      87796);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
      /*! rxjs */
      57850);
      /* harmony import */


      var _core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../core/services/observation/observation.service */
      83497);
      /* harmony import */


      var _components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../components/map-item-bar/map-item-bar.component */
      55759);
      /* harmony import */


      var _core_helpers_leaflet_map_item_marker_map_item_marker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../core/helpers/leaflet/map-item-marker/map-item-marker */
      17644);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../modules/map/components/map/map.component */
      6781);
      /* harmony import */


      var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../core/services/fullscreen/fullscreen.service */
      13653);
      /* harmony import */


      var _modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../modules/shared/services/logging/logging.service */
      93042);
      /* harmony import */


      var _modules_map_helpers_leaflet_cluser_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../modules/map/helpers/leaflet-cluser.helper */
      47434);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! rxjs/operators */
      52249);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! rxjs/operators */
      71775);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../../settings */
      30015);
      /* harmony import */


      var _core_services_usage_analytics_consent_usage_analytics_consent_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../core/services/usage-analytics-consent/usage-analytics-consent.service */
      12031);
      /* harmony import */


      var _core_helpers_routed_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ../../core/helpers/routed-page */
      8402);
      /* harmony import */


      var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ../../core/helpers/observable-helper */
      59364);
      /* harmony import */


      var src_app_modules_map_components_map_center_info_map_center_info_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ../../modules/map/components/map-center-info/map-center-info.component */
      80454);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ../../modules/shared/components/header/header.component */
      24201);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ../../modules/shared/components/add-menu/add-menu.component */
      26331);
      /* harmony import */


      var _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ../../modules/shared/components/geo-fab/geo-fab.component */
      49744);
      /* harmony import */


      var _modules_data_load_components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! ../../modules/data-load/components/data-load/data-load.component */
      37944);

      function HomePage_app_map_center_info_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "app-map-center-info");
        }
      }

      function HomePage_app_geo_fab_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "app-geo-fab", 4);
        }
      }

      function HomePage_ng_container_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "app-data-load", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var dataLoadIds_r3 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ids", dataLoadIds_r3);
        }
      }

      var DEBUG_TAG = 'HomePage';

      var _HomePage = /*#__PURE__*/function (_core_helpers_routed_) {
        _inherits(_HomePage, _core_helpers_routed_);

        var _super3 = _createSuper(_HomePage);

        function _HomePage(router, route, observationService, fullscreenService, userSettingService, ngZone, loggingService, usageAnalyticsConsentService, document) {
          var _this20;

          _classCallCheck(this, _HomePage);

          _this20 = _super3.call(this, router, route);
          _this20.observationService = observationService;
          _this20.fullscreenService = fullscreenService;
          _this20.userSettingService = userSettingService;
          _this20.ngZone = ngZone;
          _this20.loggingService = loggingService;
          _this20.usageAnalyticsConsentService = usageAnalyticsConsentService;
          _this20.document = document;
          _this20.markerLayer = _modules_map_helpers_leaflet_cluser_helper__WEBPACK_IMPORTED_MODULE_9__.LeafletClusterHelper.createMarkerClusterGroup({
            spiderfyOnMaxZoom: false,
            zoomToBoundsOnClick: false
          });
          _this20.geoCoachMarksClosedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_20__.Subject();
          _this20.showGeoSelectInfo = false;
          _this20.mapCenterInfoHeight = new rxjs__WEBPACK_IMPORTED_MODULE_20__.Subject(); // Update global css property containing info box height when height changes.
          // This is used to position map scale above map center info box.

          _this20.mapCenterInfoHeight.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.distinctUntilChanged)(), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_22__.debounceTime)(500), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.takeUntil)(_this20.ngUnsubscribe)).subscribe(function (newInfoBoxHeight) {
            _this20.document.documentElement.style.setProperty('--map-center-info-height', "".concat(newInfoBoxHeight, "px"));
          });

          return _this20;
        }

        _createClass(_HomePage, [{
          key: "ngAfterViewChecked",
          value: function ngAfterViewChecked() {
            this.updateInfoBoxHeight();
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.fullscreen$ = this.fullscreenService.isFullscreen$;
            this.dataLoadIds$ = this.observationService.dataLoad$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.map)(function (val) {
              return [val];
            }), (0, _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_13__.enterZone)(this.ngZone));
            this.checkForFirstStartup();
          }
        }, {
          key: "checkForFirstStartup",
          value: function checkForFirstStartup() {
            var _this21 = this;

            this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.map)(function (us) {
              return us.showGeoSelectInfo;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.distinctUntilChanged)(), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.takeUntil)((0, rxjs__WEBPACK_IMPORTED_MODULE_25__.race)(this.ngUnsubscribe, this.geoCoachMarksClosedSubject)), (0, _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_13__.enterZone)(this.ngZone)).subscribe(function (showGeoSelectInfo) {
              _this21.showGeoSelectInfo = showGeoSelectInfo;

              if (!showGeoSelectInfo) {
                _this21.geoCoachMarksClosedSubject.next();

                _this21.geoCoachMarksClosedSubject.complete();

                _this21.showUsageAnalyticsDialog();
              }
            });
          }
        }, {
          key: "showUsageAnalyticsDialog",
          value: function showUsageAnalyticsDialog() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_26__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
              return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      _context12.next = 2;
                      return this.usageAnalyticsConsentService.checkUserDataConsentDialog();

                    case 2:
                      this.mapComponent.componentIsActive(true);

                    case 3:
                    case "end":
                      return _context12.stop();
                  }
                }
              }, _callee12, this);
            }));
          }
        }, {
          key: "onMapReady",
          value: function onMapReady(leafletMap) {
            var _this22 = this;

            this.map = leafletMap;
            this.markerLayer.addTo(this.map);
            this.markerLayer.on('clusterclick', function (a) {
              var groupLatLng = a.latlng;

              var currentZoom = _this22.map.getZoom();

              var newZoom = currentZoom + 2;

              if (newZoom >= _settings__WEBPACK_IMPORTED_MODULE_10__.settings.map.tiles.maxZoom) {
                a.layer.spiderfy();
              } else {
                _this22.map.setView(groupLatLng, Math.min(newZoom, _settings__WEBPACK_IMPORTED_MODULE_10__.settings.map.tiles.maxZoom));
              }
            });
            this.map.on('click', function () {
              if (_this22.selectedMarker) {
                _this22.selectedMarker.deselect();
              }

              _this22.selectedMarker = null;

              _this22.mapItemBar.hide();
            }); // TODO: Move this to custom marker layer?

            var observationObservable = (0, rxjs__WEBPACK_IMPORTED_MODULE_27__.combineLatest)([this.observationService.observations$, this.userSettingService.showObservations$]);
            observationObservable.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.takeUntil)(this.ngUnsubscribe)).subscribe(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  regObservations = _ref4[0],
                  showObservations = _ref4[1];

              _this22.redrawObservationMarkers(showObservations ? regObservations : []);
            });
          }
        }, {
          key: "onEnter",
          value: function onEnter() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_26__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
              var userSettings;
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      this.loggingService.debug('Home page ionViewDidEnter.', DEBUG_TAG);
                      _context13.next = 3;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_28__.take)(1)).toPromise();

                    case 3:
                      userSettings = _context13.sent;

                      if (!userSettings.showGeoSelectInfo) {
                        _context13.next = 7;
                        break;
                      }

                      this.loggingService.debug('Display coachmarks, wait with starting geopostion', DEBUG_TAG);
                      return _context13.abrupt("return");

                    case 7:
                      this.loggingService.debug('Activate map updates and GeoLocation', DEBUG_TAG);
                      this.mapComponent.componentIsActive(true);
                      this.updateInfoBoxHeight();

                    case 10:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, _callee13, this);
            }));
          }
        }, {
          key: "onLeave",
          value: function onLeave() {
            this.loggingService.debug('Home page onLeave. Disable map updates and GeoLocation', DEBUG_TAG);
            this.mapComponent.componentIsActive(false); // As we leave the page, map center info is not visible any more, reset height

            this.mapCenterInfoHeight.next(0);
          } // async ionViewDidEnter() {
          // Use tab page workaround from:
          // https://github.com/ionic-team/ionic/issues/15260
          // }
          // ionViewWillLeave() {
          //   this.loggingService.debug(`Home page ionViewWillLeave. Disable map updates and GeoLocation.`, DEBUG_TAG);
          //   this.mapComponent.stopGeoPositionUpdates();
          // }

        }, {
          key: "redrawObservationMarkers",
          value: function redrawObservationMarkers(regObservations) {
            var _this23 = this;

            this.markerLayer.clearLayers();

            var _iterator = _createForOfIteratorHelper(regObservations),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var regObservation = _step.value;
                var latLng = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(regObservation.ObsLocation.Latitude, regObservation.ObsLocation.Longitude);
                var marker = new _core_helpers_leaflet_map_item_marker_map_item_marker__WEBPACK_IMPORTED_MODULE_4__.MapItemMarker(regObservation, latLng, {});
                marker.on('click', function (event) {
                  var m = event.target;

                  if (_this23.selectedMarker) {
                    _this23.selectedMarker.deselect();
                  }

                  _this23.selectedMarker = m;
                  m.setSelected();

                  _this23.mapItemBar.show(m.item);
                });
                marker.addTo(this.markerLayer);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        }, {
          key: "updateInfoBoxHeight",
          value: function updateInfoBoxHeight() {
            var _a;

            var mapCenterElement = (_a = this.mapCenter) === null || _a === void 0 ? void 0 : _a.nativeElement;

            if (mapCenterElement) {
              var height = mapCenterElement.offsetHeight;
              this.mapCenterInfoHeight.next(height);
            } else {
              this.mapCenterInfoHeight.next(0);
            }
          }
        }]);

        return _HomePage;
      }(_core_helpers_routed_page__WEBPACK_IMPORTED_MODULE_12__.RouterPage);

      _HomePage.ɵfac = function HomePage_Factory(t) {
        return new (t || _HomePage)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_29__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_29__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_2__.ObservationService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_7__.FullscreenService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_8__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_services_usage_analytics_consent_usage_analytics_consent_service__WEBPACK_IMPORTED_MODULE_11__.UsageAnalyticsConsentService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_30__.DOCUMENT));
      };

      _HomePage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
        type: _HomePage,
        selectors: [["app-home"]],
        viewQuery: function HomePage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_3__.MapItemBarComponent, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_6__.MapComponent, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_modules_map_components_map_center_info_map_center_info_component__WEBPACK_IMPORTED_MODULE_14__.MapCenterInfoComponent, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.mapItemBar = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.mapComponent = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.mapCenter = _t.first);
          }
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]],
        decls: 10,
        vars: 10,
        consts: [["title", "Varsom Regobs", 3, "fullscreenSupport"], [3, "autoActivate", "geoTag", "mapReady"], [4, "ngIf"], ["slot", "fixed", 4, "ngIf"], ["slot", "fixed"], ["simple", "true", 3, "ids"]],
        template: function HomePage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "app-header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "app-map", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("mapReady", function HomePage_Template_app_map_mapReady_2_listener($event) {
              return ctx.onMapReady($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, HomePage_app_map_center_info_3_Template, 1, 0, "app-map-center-info", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](5, "app-map-item-bar");

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](6, HomePage_app_geo_fab_6_Template, 1, 0, "app-geo-fab", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](7, "app-add-menu");

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](8, HomePage_ng_container_8_Template, 2, 1, "ng-container", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](9, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("fullscreenSupport", true);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("autoActivate", false)("geoTag", "HomePage");

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 6, ctx.userSettingService.showMapCenter$));

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.showGeoSelectInfo === false);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](9, 8, ctx.dataLoadIds$));
          }
        },
        directives: [_modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_15__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonContent, _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_6__.MapComponent, _angular_common__WEBPACK_IMPORTED_MODULE_30__.NgIf, _components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_3__.MapItemBarComponent, _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_16__.AddMenuComponent, src_app_modules_map_components_map_center_info_map_center_info_component__WEBPACK_IMPORTED_MODULE_14__.MapCenterInfoComponent, _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_17__.GeoFabComponent, _modules_data_load_components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_18__.DataLoadComponent],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_30__.AsyncPipe],
        styles: ["ion-content[_ngcontent-%COMP%] {\n  --overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Esa0JBQUE7QUFDQSIsImZpbGUiOiJob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcclxuLS1vdmVyZmxvdzogaGlkZGVuO1xyXG59Il19 */"]
      });
      /***/
    },

    /***/
    5557: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TabsPageModule": function TabsPageModule() {
          return (
            /* binding */
            _TabsPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _tabs_router_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./tabs.router.module */
      64607);
      /* harmony import */


      var _tabs_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./tabs.page */
      64101);
      /* harmony import */


      var _home_home_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../home/home.module */
      57994);
      /* harmony import */


      var _trip_trip_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../trip/trip.module */
      33736);
      /* harmony import */


      var _warning_list_warning_list_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../warning-list/warning-list.module */
      51547);
      /* harmony import */


      var _observation_list_observation_list_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../observation-list/observation-list.module */
      73442);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _components_coach_marks_coach_marks_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../components/coach-marks/coach-marks.component */
      50645);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _TabsPageModule = function _TabsPageModule() {
        _classCallCheck(this, _TabsPageModule);
      };

      _TabsPageModule.ɵfac = function TabsPageModule_Factory(t) {
        return new (t || _TabsPageModule)();
      };

      _TabsPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
        type: _TabsPageModule
      });
      _TabsPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
        imports: [[_tabs_router_module__WEBPACK_IMPORTED_MODULE_0__.TabsPageRoutingModule, _home_home_module__WEBPACK_IMPORTED_MODULE_2__.HomePageModule, _trip_trip_module__WEBPACK_IMPORTED_MODULE_3__.TripPageModule, _warning_list_warning_list_module__WEBPACK_IMPORTED_MODULE_4__.WarningListPageModule, _observation_list_observation_list_module__WEBPACK_IMPORTED_MODULE_5__.ObservationListPageModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_6__.SharedModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](_TabsPageModule, {
          declarations: [_tabs_page__WEBPACK_IMPORTED_MODULE_1__.TabsPage, _components_coach_marks_coach_marks_component__WEBPACK_IMPORTED_MODULE_7__.CoachMarksComponent],
          imports: [_tabs_router_module__WEBPACK_IMPORTED_MODULE_0__.TabsPageRoutingModule, _home_home_module__WEBPACK_IMPORTED_MODULE_2__.HomePageModule, _trip_trip_module__WEBPACK_IMPORTED_MODULE_3__.TripPageModule, _warning_list_warning_list_module__WEBPACK_IMPORTED_MODULE_4__.WarningListPageModule, _observation_list_observation_list_module__WEBPACK_IMPORTED_MODULE_5__.ObservationListPageModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_6__.SharedModule]
        });
      })();
      /***/

    },

    /***/
    64101: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TabsPage": function TabsPage() {
          return (
            /* binding */
            _TabsPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/warning/warning.service */
      90053);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/services/fullscreen/fullscreen.service */
      13653);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_coach_marks_coach_marks_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../components/coach-marks/coach-marks.component */
      50645);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function TabsPage_ion_badge_18_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-badge", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("color", ctx_r0.badgeColor);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.badgeText);
        }
      }

      var _c0 = function _c0(a0, a1) {
        return {
          "ios": a0,
          "md": a1
        };
      };

      var _TabsPage = /*#__PURE__*/function () {
        function _TabsPage(fullscreenService, platform, warningService, userSettingService, ngZone) {
          _classCallCheck(this, _TabsPage);

          this.fullscreenService = fullscreenService;
          this.platform = platform;
          this.warningService = warningService;
          this.userSettingService = userSettingService;
          this.ngZone = ngZone;
          this.showTrips = false;
          this.isIos = this.platform.is('ios');
          this.isAndroid = this.platform.is('android');
          this.fullscreen$ = this.fullscreenService.isFullscreen$;
        }

        _createClass(_TabsPage, [{
          key: "showBadge",
          get: function get() {
            return this.warningsInView && this.warningsInView.maxWarning > 0;
          }
        }, {
          key: "badgeColor",
          get: function get() {
            return 'warninglevel-' + this.warningsInView.maxWarning;
          }
        }, {
          key: "badgeText",
          get: function get() {
            return "".concat(this.warningsInView.maxWarning).concat(this.warningsInView.hasEmergencyWarning ? '!' : '');
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this24 = this;

            this.warningGroupInMapViewSubscription = this.warningService.warningGroupInMapViewObservable$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(function (warningsInView) {
              var allWarnings = [].concat(_toConsumableArray(warningsInView.center), _toConsumableArray(warningsInView.viewBounds));
              var allMaxWarnings = allWarnings.map(function (g) {
                return g.getMaxWarning(0);
              });
              var maxWarning = Math.max.apply(Math, _toConsumableArray(allMaxWarnings.map(function (x) {
                return x.max;
              })));
              var hasEmergencyWarning = allMaxWarnings.some(function (x) {
                return x.max === maxWarning && x.hasWarning;
              });
              return {
                count: allWarnings.length,
                text: allWarnings.length > 9 ? '9+' : allWarnings.length.toString(),
                maxWarning: maxWarning,
                hasEmergencyWarning: hasEmergencyWarning
              };
            })).subscribe(function (val) {
              _this24.ngZone.run(function () {
                _this24.warningsInView = val;
              });
            });
            this.currentGeoHazardSubscription = this.userSettingService.currentGeoHazard$.subscribe(function (val) {
              _this24.ngZone.run(function () {
                _this24.showTrips = val.indexOf(_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Snow) >= 0;
              });
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.warningGroupInMapViewSubscription.unsubscribe();
            this.currentGeoHazardSubscription.unsubscribe();
          }
        }]);

        return _TabsPage;
      }();

      _TabsPage.ɵfac = function TabsPage_Factory(t) {
        return new (t || _TabsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_1__.FullscreenService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__.WarningService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone));
      };

      _TabsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _TabsPage,
        selectors: [["app-tabs"]],
        decls: 20,
        vars: 17,
        consts: [["tabbar-highlight", "true", 3, "ngClass"], ["slot", "bottom", 3, "hidden"], ["tab", "home"], ["name", "map"], ["tab", "observation-list"], ["name", "list"], ["tab", "warning-list"], ["name", "warning"], [3, "color", 4, "ngIf"], [3, "color"]],
        template: function TabsPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-tabs", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-tab-bar", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "ion-tab-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-tab-button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "ion-icon", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "ion-tab-button", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "ion-icon", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](17, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, TabsPage_ion_badge_18_Template, 2, 2, "ion-badge", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "app-coach-marks");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](14, _c0, ctx.isIos, ctx.isAndroid));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("hidden", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 6, ctx.fullscreen$));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 8, "TABS.MAP"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 10, "TABS.LIST"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](17, 12, "TABS.WARNINGS"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.showBadge);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTabs, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTabBar, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTabButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _components_coach_marks_coach_marks_component__WEBPACK_IMPORTED_MODULE_3__.CoachMarksComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonBadge],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe],
        styles: ["[_nghost-%COMP%] {\n  --ion-tab-bar-background: var(--ion-color-varsom-blue);\n  --ion-tab-bar-background-focused: var(--ion-color-varsom-blue-shade);\n  --ion-tab-bar-color: var(--ion-color-varsom-blue-contrast);\n  --ion-tab-bar-color-activated: var(--ion-color-varsom-blue-contrast);\n  --color-selected: var(--ion-tab-bar-color-selected);\n  --ion-tab-bar-color-selected: var(--ion-color-varsom-blue-contrast);\n}\n\nion-tab-button[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  border-radius: 0px;\n}\n\nion-tabs[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%] {\n  opacity: 0.8;\n}\n\nion-tabs[_ngcontent-%COMP%]   ion-tab-button.tab-selected[_ngcontent-%COMP%] {\n  opacity: 1;\n  background-color: var(--ion-color-varsom-blue-shade);\n  color: var(--ion-tab-bar-color-selected);\n}\n\nion-tabs.md[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  margin-top: -3px;\n}\n\nion-tabs.ios[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  margin-top: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0RBQUE7RUFDQSxvRUFBQTtFQUNBLDBEQUFBO0VBQ0Esb0VBQUE7RUFDQSxtREFBQTtFQUNBLG1FQUFBO0FBQ0Y7O0FBR0U7RUFDRSxrQkFBQTtBQUFKOztBQUtFO0VBQ0UsWUFBQTtBQUZKOztBQUdJO0VBQ0UsVUFBQTtFQUNBLG9EQUFBO0VBQ0Esd0NBQUE7QUFETjs7QUFPTTtFQUNFLGdCQUFBO0FBTFI7O0FBWU07RUFDRSxlQUFBO0FBVlIiLCJmaWxlIjoidGFicy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgLS1pb24tdGFiLWJhci1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItdmFyc29tLWJsdWUpO1xyXG4gIC0taW9uLXRhYi1iYXItYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS1pb24tY29sb3ItdmFyc29tLWJsdWUtc2hhZGUpO1xyXG4gIC0taW9uLXRhYi1iYXItY29sb3I6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS1jb250cmFzdCk7XHJcbiAgLS1pb24tdGFiLWJhci1jb2xvci1hY3RpdmF0ZWQ6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS1jb250cmFzdCk7XHJcbiAgLS1jb2xvci1zZWxlY3RlZDogdmFyKC0taW9uLXRhYi1iYXItY29sb3Itc2VsZWN0ZWQpO1xyXG4gIC0taW9uLXRhYi1iYXItY29sb3Itc2VsZWN0ZWQ6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS1jb250cmFzdCk7XHJcbn1cclxuXHJcbmlvbi10YWItYnV0dG9uIHtcclxuICBpb24tYmFkZ2Uge1xyXG4gICAgYm9yZGVyLXJhZGl1czogMHB4O1xyXG4gIH1cclxufVxyXG5cclxuaW9uLXRhYnMge1xyXG4gIGlvbi10YWItYnV0dG9uIHtcclxuICAgIG9wYWNpdHk6IDAuODtcclxuICAgICYudGFiLXNlbGVjdGVkIHtcclxuICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1ibHVlLXNoYWRlKTtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi10YWItYmFyLWNvbG9yLXNlbGVjdGVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICYubWQge1xyXG4gICAgaW9uLXRhYi1idXR0b24ge1xyXG4gICAgICBpb24tYmFkZ2Uge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IC0zcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gICYuaW9zIHtcclxuICAgIGlvbi10YWItYnV0dG9uIHtcclxuICAgICAgaW9uLWJhZGdlIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiAzcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"]
      });
      /***/
    },

    /***/
    64607: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TabsPageRoutingModule": function TabsPageRoutingModule() {
          return (
            /* binding */
            _TabsPageRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _tabs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./tabs.page */
      64101);
      /* harmony import */


      var _core_guards_start_wizard_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/guards/start-wizard.guard */
      38526);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: 'tabs',
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_0__.TabsPage,
        canActivate: [_core_guards_start_wizard_guard__WEBPACK_IMPORTED_MODULE_1__.StartWizardGuard],
        children: [{
          path: '',
          redirectTo: '/tabs/home',
          pathMatch: 'full'
        }, {
          path: 'home',
          children: [{
            path: '',
            loadChildren: function loadChildren() {
              return Promise.resolve().then(__webpack_require__.bind(__webpack_require__,
              /*! ../home/home.module */
              57994)).then(function (m) {
                return m.HomePageModule;
              });
            }
          }]
        }, {
          path: 'trip',
          children: [{
            path: '',
            loadChildren: function loadChildren() {
              return Promise.resolve().then(__webpack_require__.bind(__webpack_require__,
              /*! ../trip/trip.module */
              33736)).then(function (m) {
                return m.TripPageModule;
              });
            }
          }]
        }, {
          path: 'observation-list',
          children: [{
            path: '',
            loadChildren: function loadChildren() {
              return Promise.resolve().then(__webpack_require__.bind(__webpack_require__,
              /*! ../observation-list/observation-list.module */
              73442)).then(function (m) {
                return m.ObservationListPageModule;
              });
            }
          }]
        }, {
          path: 'warning-list',
          children: [{
            path: '',
            loadChildren: function loadChildren() {
              return Promise.resolve().then(__webpack_require__.bind(__webpack_require__,
              /*! ../warning-list/warning-list.module */
              51547)).then(function (m) {
                return m.WarningListPageModule;
              });
            }
          }]
        }]
      }, {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }];

      var _TabsPageRoutingModule = function _TabsPageRoutingModule() {
        _classCallCheck(this, _TabsPageRoutingModule);
      };

      _TabsPageRoutingModule.ɵfac = function TabsPageRoutingModule_Factory(t) {
        return new (t || _TabsPageRoutingModule)();
      };

      _TabsPageRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _TabsPageRoutingModule
      });
      _TabsPageRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_TabsPageRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    33736: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TripPageModule": function TripPageModule() {
          return (
            /* binding */
            _TripPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _trip_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./trip.page */
      61000);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _trip_page__WEBPACK_IMPORTED_MODULE_0__.TripPage
      }];

      var _TripPageModule = function _TripPageModule() {
        _classCallCheck(this, _TripPageModule);
      };

      _TripPageModule.ɵfac = function TripPageModule_Factory(t) {
        return new (t || _TripPageModule)();
      };

      _TripPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: _TripPageModule
      });
      _TripPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](_TripPageModule, {
          declarations: [_trip_page__WEBPACK_IMPORTED_MODULE_0__.TripPage],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateModule]
        });
      })();
      /***/

    },

    /***/
    61000: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TripPage": function TripPage() {
          return (
            /* binding */
            _TripPage
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


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _TripPage = function _TripPage() {
        _classCallCheck(this, _TripPage);
      };

      _TripPage.ɵfac = function TripPage_Factory(t) {
        return new (t || _TripPage)();
      };

      _TripPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _TripPage,
        selectors: [["app-trip"]],
        decls: 26,
        vars: 3,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "end"], ["slot", "start", "name", "map"], ["slot", "end", "name", "chevron-forward"], ["slot", "start", "name", "walk"]],
        template: function TripPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ion-menu-button");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ion-list");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ion-list-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Planlegg tur ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "ion-icon", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Turforslag ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "ion-icon", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Registrerte turer ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "ion-icon", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Planlegg ny tur ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 1, "TRIP.TITLE"));
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonLabel],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmlwLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    2410: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AbonnerBannerComponent": function AbonnerBannerComponent() {
          return (
            /* binding */
            _AbonnerBannerComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../core/services/external-link/external-link.service */
      11810);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _AbonnerBannerComponent = /*#__PURE__*/function () {
        function _AbonnerBannerComponent(externalLinkService) {
          _classCallCheck(this, _AbonnerBannerComponent);

          this.externalLinkService = externalLinkService;
        }

        _createClass(_AbonnerBannerComponent, [{
          key: "buttonClicked",
          value: function buttonClicked() {
            this.externalLinkService.openExternalLink('https://abonner.varsom.no');
          }
        }]);

        return _AbonnerBannerComponent;
      }();

      _AbonnerBannerComponent.ɵfac = function AbonnerBannerComponent_Factory(t) {
        return new (t || _AbonnerBannerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_0__.ExternalLinkService));
      };

      _AbonnerBannerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _AbonnerBannerComponent,
        selectors: [["app-abonner-banner"]],
        decls: 12,
        vars: 12,
        consts: [[1, "ion-text-uppercase"], ["color", "primary", "fill", "outline", 1, "ion-no-margin", 3, "click"]],
        template: function AbonnerBannerComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h3", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "ion-button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbonnerBannerComponent_Template_ion_button_click_9_listener() {
              return ctx.buttonClicked();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](11, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 4, "ABONNER_BANNER.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 6, "ABONNER_BANNER.BANNER_TEXT_LINE_1"));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 8, "ABONNER_BANNER.BANNER_TEXT_LINE_2"));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](11, 10, "ABONNER_BANNER.LINK_TEXT"), "\n");
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButton],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
        styles: ["p[_ngcontent-%COMP%] {\n  color: var(--ion-text-color-heading);\n  font-size: 14px;\n  line-height: 140%;\n}\n\nion-button[_ngcontent-%COMP%] {\n  --border-radius: 4px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib25uZXItYmFubmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0NBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFDQTtFQUNFLG9CQUFBO0FBRUYiLCJmaWxlIjoiYWJvbm5lci1iYW5uZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJwIHtcclxuICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3ItaGVhZGluZyk7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNDAlO1xyXG59XHJcbmlvbi1idXR0b24ge1xyXG4gIC0tYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    51547: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WarningListPageModule": function WarningListPageModule() {
          return (
            /* binding */
            _WarningListPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _warning_list_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./warning-list.page */
      99662);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _components_warning_list_header_warning_list_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../components/warning-list-header/warning-list-header.component */
      68838);
      /* harmony import */


      var _components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../components/warning-list-item/warning-list-item.component */
      44843);
      /* harmony import */


      var _components_warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../components/warning-group-favourite-toggle/warning-group-favourite-toggle.component */
      34299);
      /* harmony import */


      var _abonner_banner_abonner_banner_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./abonner-banner/abonner-banner.component */
      2410);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      2316); // tslint:disable-next-line:max-line-length


      var routes = [{
        path: '',
        component: _warning_list_page__WEBPACK_IMPORTED_MODULE_0__.WarningListPage
      }];

      var _WarningListPageModule = function _WarningListPageModule() {
        _classCallCheck(this, _WarningListPageModule);
      };

      _WarningListPageModule.ɵfac = function WarningListPageModule_Factory(t) {
        return new (t || _WarningListPageModule)();
      };

      _WarningListPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
        type: _WarningListPageModule
      });
      _WarningListPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule.forChild(routes), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](_WarningListPageModule, {
          declarations: [_warning_list_page__WEBPACK_IMPORTED_MODULE_0__.WarningListPage, _components_warning_list_header_warning_list_header_component__WEBPACK_IMPORTED_MODULE_2__.WarningListHeaderComponent, _components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_3__.WarningListItemComponent, _components_warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_4__.WarningGroupFavouriteToggleComponent, _abonner_banner_abonner_banner_component__WEBPACK_IMPORTED_MODULE_5__.AbonnerBannerComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]
        });
      })();
      /***/

    },

    /***/
    99662: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WarningListPage": function WarningListPage() {
          return (
            /* binding */
            _WarningListPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/warning/warning.service */
      90053);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs */
      69606);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs */
      57850);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! rxjs/operators */
      39349);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../components/warning-list-item/warning-list-item.component */
      44843);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../modules/shared/components/header/header.component */
      24201);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component */
      30164);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../modules/shared/components/add-menu/add-menu.component */
      26331);
      /* harmony import */


      var _modules_shared_components_geo_select_geo_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../modules/shared/components/geo-select/geo-select.component */
      16450);
      /* harmony import */


      var _components_warning_list_header_warning_list_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../components/warning-list-header/warning-list-header.component */
      68838);
      /* harmony import */


      var _abonner_banner_abonner_banner_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./abonner-banner/abonner-banner.component */
      2410);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function WarningListPage_ion_virtual_scroll_16_ion_item_divider_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item-divider");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-warning-list-header", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var header_r11 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", header_r11.header)("subTitle", header_r11.infoText)("showDayNames", header_r11.showDayNames);
        }
      }

      function WarningListPage_ion_virtual_scroll_16_div_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-warning-list-item", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var virtialItem_r12 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("warningGroup", virtialItem_r12.item);
        }
      }

      function WarningListPage_ion_virtual_scroll_16_ion_item_divider_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "ion-item-divider", 18);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "loaded": a0
        };
      };

      function WarningListPage_ion_virtual_scroll_16_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-virtual-scroll", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, WarningListPage_ion_virtual_scroll_16_ion_item_divider_1_Template, 2, 3, "ion-item-divider", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, WarningListPage_ion_virtual_scroll_16_div_2_Template, 2, 1, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, WarningListPage_ion_virtual_scroll_16_ion_item_divider_3_Template, 1, 0, "ion-item-divider", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](7, _c0, ctx_r0.loaded))("items", ctx_r0.warningGroups)("headerFn", ctx_r0.myHeaderFn)("footerFn", ctx_r0.myFooterFn)("approxItemHeight", 49)("approxHeaderHeight", 38)("trackBy", ctx_r0.trackByFunc);
        }
      }

      function WarningListPage_div_17_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-abonner-banner");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](1, _c0, ctx_r1.loaded));
        }
      }

      function WarningListPage_ng_template_20_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainer"](0);
        }
      }

      function WarningListPage_ng_template_20_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, WarningListPage_ng_template_20_ng_container_0_Template, 1, 0, "ng-container", 20);
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](23);

          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](25);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngTemplateOutlet", ctx_r3.showNoFavourites ? _r4 : _r6);
        }
      }

      function WarningListPage_ng_template_22_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-grid", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-row", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-col", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "svg-icon", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-row", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "ion-col", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "h3", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 2, "WARNING_LIST.NO_FAVOURITES"), "");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](11, 4, "WARNING_LIST.NO_FAVOURITES_TEXT"));
        }
      }

      function WarningListPage_ng_template_24_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-grid", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-row", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-col", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "svg-icon", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-row", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "ion-col", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "h3", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 2, "WARNING_LIST.NO_WARNINGS"), "");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](11, 4, "WARNING_LIST.NO_WARNINGS_TEXT"));
        }
      }

      var _WarningListPage = /*#__PURE__*/function () {
        function _WarningListPage(warningService, userSettingService, ngZone) {
          _classCallCheck(this, _WarningListPage);

          this.warningService = warningService;
          this.userSettingService = userSettingService;
          this.ngZone = ngZone;
          this.warningGroups = [];
          this.refreshFunc = this.refresh.bind(this);
          this.title = 'WARNING_LIST.TITLE';
          this.noFavourites = false;
          this.noRelevant = false;
          this.trackByFunc = this.trackByInternal.bind(this);
          this.loaded = false;
          this.myFooterFn = this.footerFn.bind(this);
        }

        _createClass(_WarningListPage, [{
          key: "showNoFavourites",
          get: function get() {
            return this.selectedTab === 'favourites' && this.noFavourites;
          }
        }, {
          key: "showNoRelevantEmptyState",
          get: function get() {
            return this.selectedTab === 'inMapView' && this.noRelevant;
          }
        }, {
          key: "showEmptyState",
          get: function get() {
            return this.showNoFavourites || this.showNoRelevantEmptyState;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.selectedTab = 'inMapView';
            this.segmentPageSubject = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(this.selectedTab);
            this.segmentPageObservable = this.segmentPageSubject.asObservable();
          }
        }, {
          key: "closeAllOpen",
          value: function closeAllOpen() {
            if (this.warningListItems) {
              var _iterator2 = _createForOfIteratorHelper(this.warningListItems.toArray()),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var item = _step2.value;
                  item.close();
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          }
        }, {
          key: "ionViewDidEnter",
          value: function ionViewDidEnter() {
            var _this25 = this;

            this.ngDestroySubject = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
            this.loaded = false;
            (0, rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([this.segmentPageObservable, this.userSettingService.currentGeoHazard$]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.switchMap)(function (_ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                  segment = _ref6[0],
                  currentGeoHazard = _ref6[1];

              return _this25.getWarningGroupObservable(segment, currentGeoHazard);
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroySubject)).subscribe(function (warningGroups) {
              _this25.ngZone.run(function () {
                _this25.closeAllOpen();

                _this25.warningGroups = warningGroups;

                _this25.hackToShowVirtualScrollItemsThatIsNotVisibleAtFirstLoad();
              });
            });
            (0, rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([this.segmentPageObservable, this.userSettingService.currentGeoHazard$]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroySubject)).subscribe(function (_ref7) {
              var _ref8 = _slicedToArray(_ref7, 2),
                  selectedTab = _ref8[0],
                  currentGeoHazard = _ref8[1];

              _this25.ngZone.run(function () {
                _this25.setTitle(selectedTab, currentGeoHazard);
              });
            });
          }
        }, {
          key: "hackToShowVirtualScrollItemsThatIsNotVisibleAtFirstLoad",
          value: function hackToShowVirtualScrollItemsThatIsNotVisibleAtFirstLoad() {
            var _this26 = this;

            if (!this.loaded && this.warningGroups && this.warningGroups.length > 0) {
              var currentItems = _toConsumableArray(this.warningGroups);

              setTimeout(function () {
                _this26.warningGroups = null;
                setTimeout(function () {
                  // Hack to virtual scroll items not showing at first load
                  _this26.warningGroups = currentItems;
                  _this26.loaded = true;
                }, 200);
              }, 200);
            }
          }
        }, {
          key: "setTitle",
          value: function setTitle(selectedTab, currentGeoHazard) {
            if (selectedTab !== 'favourites') {
              this.title = "WARNING_LIST.TITLE_".concat(_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__.GeoHazard[currentGeoHazard[0]].toUpperCase());
            } else {
              this.title = 'WARNING_LIST.TITLE';
            }
          }
        }, {
          key: "refresh",
          value: function refresh(cancelPromise) {
            return this.warningService.updateWarningsForCurrentGeoHazard(cancelPromise);
          }
        }, {
          key: "getWarningGroupObservable",
          value: function getWarningGroupObservable(segment, currentGeoHazard) {
            switch (segment) {
              case 'inMapView':
                return this.getWarningsInMapView();

              case 'all':
                return this.getAllWarnings(currentGeoHazard);

              case 'favourites':
                return this.getFavouritesObservable();
            }
          }
        }, {
          key: "mapToVirtualScrollItem",
          value: function mapToVirtualScrollItem(wg, header, infoText) {
            return wg.map(function (item, index) {
              return {
                header: index === 0 ? header : undefined,
                infoText: index === 0 ? infoText : undefined,
                item: item
              };
            });
          }
        }, {
          key: "getWarningsInMapView",
          value: function getWarningsInMapView() {
            var _this27 = this;

            return (0, rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([this.getWarningsInMapViewCenter(), this.getWarningsInMapViewBounds(), this.getWarningsInMapViewBuffer()]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (_ref9) {
              var _ref10 = _slicedToArray(_ref9, 3),
                  a = _ref10[0],
                  b = _ref10[1],
                  c = _ref10[2];

              return [].concat(_toConsumableArray(a), _toConsumableArray(b), _toConsumableArray(b.length < 3 ? c : []));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.tap)(function (val) {
              _this27.ngZone.run(function () {
                _this27.noRelevant = val.length === 0;
              });
            }));
          }
        }, {
          key: "getWarningsInMapViewCenter",
          value: function getWarningsInMapViewCenter() {
            var _this28 = this;

            return this.warningService.warningGroupInMapViewObservable$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (val) {
              return _this28.mapToVirtualScrollItem(val.center, 'WARNING_LIST.IN_MAP_CENTER');
            }));
          }
        }, {
          key: "getWarningsInMapViewBounds",
          value: function getWarningsInMapViewBounds() {
            var _this29 = this;

            return this.warningService.warningGroupInMapViewObservable$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (val) {
              return _this29.mapToVirtualScrollItem(val.viewBounds, 'WARNING_LIST.IN_MAP_VIEW');
            }));
          }
        }, {
          key: "getWarningsInMapViewBuffer",
          value: function getWarningsInMapViewBuffer() {
            var _this30 = this;

            return this.warningService.warningGroupInMapViewObservable$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (val) {
              return _this30.mapToVirtualScrollItem(val.buffer.filter(function (wg) {
                return wg.hasAnyWarnings();
              }), 'WARNING_LIST.OTHER_RELEVANT');
            }));
          }
        }, {
          key: "getAllWarnings",
          value: function getAllWarnings(currentGeoHazard) {
            var _this31 = this;

            if (currentGeoHazard[0] === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__.GeoHazard.Snow) {
              return this.getSnowRegionWarnings();
            } else {
              return this.warningService.warningsForCurrentGeoHazardObservable$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (wg) {
                return _this31.mapToVirtualScrollItem(wg, 'WARNING_LIST.ALL_WARNINGS');
              }));
            }
          }
        }, {
          key: "getSnowRegionWarnings",
          value: function getSnowRegionWarnings() {
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([this.getARegionWarnings(), this.getBRegionWarnings()]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (_ref11) {
              var _ref12 = _slicedToArray(_ref11, 2),
                  a = _ref12[0],
                  b = _ref12[1];

              return [].concat(_toConsumableArray(a), _toConsumableArray(b));
            }));
          }
        }, {
          key: "getARegionWarnings",
          value: function getARegionWarnings() {
            var _this32 = this;

            return this.warningService.warningsForCurrentGeoHazardObservable$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (wg) {
              return _this32.mapToVirtualScrollItem(wg.filter(function (item) {
                return item.groupType === 'A';
              }), 'WARNING_LIST.A_REGIONS');
            }));
          }
        }, {
          key: "getBRegionWarnings",
          value: function getBRegionWarnings() {
            var _this33 = this;

            return this.warningService.warningsForCurrentGeoHazardObservable$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (wg) {
              return _this33.mapToVirtualScrollItem(wg.filter(function (item) {
                return item.groupType === 'B';
              }), 'WARNING_LIST.B_REGIONS', 'WARNING_LIST.B_REGIONS_SUBTITLE');
            }));
          }
        }, {
          key: "getFavouritesObservable",
          value: function getFavouritesObservable() {
            var _this34 = this;

            return this.warningService.getWarningGroupFavouritesObservable().pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.tap)(function (val) {
              _this34.ngZone.run(function () {
                _this34.noFavourites = val.length === 0;
              });
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (warningGroups) {
              return _this34.mapToVirtualScrollItem(warningGroups, 'WARNING_LIST.FAVOURITES');
            }));
          }
        }, {
          key: "myHeaderFn",
          value: function myHeaderFn(item, index, items) {
            return item.header ? {
              header: item.header,
              infoText: item.infoText,
              showDayNames: items.some(function (x) {
                return x.item.key.geoHazard !== _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__.GeoHazard.Ice;
              })
            } : null;
          }
        }, {
          key: "footerFn",
          value: function footerFn(item, index, items) {
            if (this.selectedTab !== 'inMapView' && index === items.length - 1) {
              return 'footer';
            }
          }
        }, {
          key: "trackByInternal",
          value: function trackByInternal(_, item) {
            return item && item.item ? item.item.getKeyAsString() : undefined;
          }
        }, {
          key: "ionViewWillLeave",
          value: function ionViewWillLeave() {
            this.closeAllOpen();
            this.ngDestroySubject.next();
            this.ngDestroySubject.complete();
          }
        }, {
          key: "onSegmentChange",
          value: function onSegmentChange() {
            this.segmentPageSubject.next(this.selectedTab);
          }
        }]);

        return _WarningListPage;
      }();

      _WarningListPage.ɵfac = function WarningListPage_Factory(t) {
        return new (t || _WarningListPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__.WarningService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone));
      };

      _WarningListPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _WarningListPage,
        selectors: [["app-warning-list"]],
        viewQuery: function WarningListPage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_2__.WarningListItemComponent, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.warningListItems = _t);
          }
        },
        decls: 26,
        vars: 15,
        consts: [[3, "title"], ["mode", "md", "slot", "fixed", 3, "ngModel", "ngModelChange"], ["mode", "md", "value", "inMapView"], ["mode", "md", "value", "all"], ["mode", "md", "value", "favourites"], [3, "refreshFunc"], [3, "ngClass", "items", "headerFn", "footerFn", "approxItemHeight", "approxHeaderHeight", "trackBy", 4, "ngIf", "ngIfElse"], ["id", "abonner-banner", "class", "ion-margin", 3, "ngClass", 4, "ngIf"], ["slot", "fixed"], ["empty", ""], ["emptyFavourites", ""], ["emptyRelevant", ""], [3, "ngClass", "items", "headerFn", "footerFn", "approxItemHeight", "approxHeaderHeight", "trackBy"], [4, "virtualHeader"], [4, "virtualItem"], ["class", "virtual-list-footer", 4, "virtualFooter"], [3, "title", "subTitle", "showDayNames"], [3, "warningGroup"], [1, "virtual-list-footer"], ["id", "abonner-banner", 1, "ion-margin", 3, "ngClass"], [4, "ngTemplateOutlet"], [1, "full-grid"], [1, "full-grid-row"], [1, "ion-text-center", "ion-align-self-center"], ["src", "/assets/images/empty-states/no-favourites.svg"], [1, "ion-text-center", "ion-margin-horizontal"], [1, "ion-text-wrap"], ["src", "/assets/images/empty-states/no-warnings.svg"]],
        template: function WarningListPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-segment", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function WarningListPage_Template_ion_segment_ngModelChange_1_listener($event) {
              return ctx.selectedTab = $event;
            })("ngModelChange", function WarningListPage_Template_ion_segment_ngModelChange_1_listener() {
              return ctx.onSegmentChange();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-segment-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-segment-button", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-segment-button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](12);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](13, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](15, "app-refresh-with-cancel", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](16, WarningListPage_ion_virtual_scroll_16_Template, 4, 9, "ion-virtual-scroll", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](17, WarningListPage_div_17_Template, 2, 3, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](18, "app-add-menu");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](19, "app-geo-select", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](20, WarningListPage_ng_template_20_Template, 1, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](22, WarningListPage_ng_template_22_Template, 12, 6, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](24, WarningListPage_ng_template_24_Template, 12, 6, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](21);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", ctx.title);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx.selectedTab);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 9, "WARNING_LIST.RELEVANT"));

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 11, "WARNING_LIST.ALL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](13, 13, "WARNING_LIST.FAVOURITES"));

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refreshFunc", ctx.refreshFunc);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.showEmptyState)("ngIfElse", _r2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.selectedTab === "inMapView");
          }
        },
        directives: [_modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_3__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonSegment, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonSegmentButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_4__.RefreshWithCancelComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_5__.AddMenuComponent, _modules_shared_components_geo_select_geo_select_component__WEBPACK_IMPORTED_MODULE_6__.GeoSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonVirtualScroll, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.VirtualHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.VirtualItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.VirtualFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonItemDivider, _components_warning_list_header_warning_list_header_component__WEBPACK_IMPORTED_MODULE_7__.WarningListHeaderComponent, _components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_2__.WarningListItemComponent, _abonner_banner_abonner_banner_component__WEBPACK_IMPORTED_MODULE_8__.AbonnerBannerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgTemplateOutlet, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonCol, angular_svg_icon__WEBPACK_IMPORTED_MODULE_21__.SvgIconComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslatePipe],
        styles: ["ion-refresher[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%] {\n  background-color: #fff;\n  background-color: var(--ion-background-color, #fff);\n}\n\nion-virtual-scroll[_ngcontent-%COMP%], #abonner-banner[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 1s linear;\n}\n\nion-virtual-scroll.loaded[_ngcontent-%COMP%], #abonner-banner.loaded[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\nion-item-divider[_ngcontent-%COMP%]   app-warning-list-header[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.virtual-list-footer[_ngcontent-%COMP%] {\n  height: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmctbGlzdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsc0JBQUE7RUFBQSxtREFBQTtBQUNGOztBQUVBOztFQUVFLFVBQUE7RUFDQSw2QkFBQTtBQUNGOztBQUNFOztFQUNFLFVBQUE7QUFFSjs7QUFFRTtFQUNFLFdBQUE7QUFDSjs7QUFHQTtFQUNFLFlBQUE7QUFBRiIsImZpbGUiOiJ3YXJuaW5nLWxpc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXJlZnJlc2hlcixcclxuaW9uLWNvbnRlbnQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yLCAjZmZmKTtcclxufVxyXG5cclxuaW9uLXZpcnR1YWwtc2Nyb2xsLFxyXG4jYWJvbm5lci1iYW5uZXIge1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAxcyBsaW5lYXI7XHJcblxyXG4gICYubG9hZGVkIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG59XHJcbmlvbi1pdGVtLWRpdmlkZXIge1xyXG4gIGFwcC13YXJuaW5nLWxpc3QtaGVhZGVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxufVxyXG5cclxuLnZpcnR1YWwtbGlzdC1mb290ZXIge1xyXG4gIGhlaWdodDogNTBweDtcclxufVxyXG4iXX0= */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0MsZUFBNERBLGdCQUE1RCxHQUNBLENBREE7QUFHQSxPQUpELEVBSUMsSUFKRCxFQUlDO0FBQTRCO0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTtBQUVBQztBQUNBQyxnQ0FEQTtBQUNBO0FBQ0FDLG9DQUZBO0FBR0FDLHdEQUhBO0FBS0FDLG1DQUxBO0FBTUFDLHFDQU5BO0FBT0FDLHFDQVBBO0FBUUFDLG1DQVJBO0FBVUFDLHlDQVZBO0FBWUE7QUFDQTtBQUNBQyw0Q0FkQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQUMseUJBbkJBO0FBcUJBO0FBQ0E7QUFDQUMsdUNBdkJBO0FBeUJBO0FBQ0FDLHdDQTFCQTtBQTRCQTtBQUNBQyx5Q0E3QkE7QUErQkE7QUFDQUM7QUFBK0JDLHlCQUEvQjtBQUErQkMsMkJBQS9CO0FBQStCQztBQUEvQixhQWhDQTtBQWtDQTtBQUNBQyxpQ0FuQ0E7QUFvQ0FDLDhCQXBDQTtBQW9DQTtBQUNBQywwQkFyQ0E7QUFxQ0E7QUFDQUMsK0JBdENBO0FBc0NBO0FBRUE7QUFDQUM7QUF6Q0EsV0FGQTtBQThDQUM7QUFDQUM7O0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FkQSxDQWM2QjtBQUM3Qjs7QUFDQTtBQUVBO0FBRUE7QUFDQSxxREFEQTtBQUVBLDRDQUZBO0FBR0E7QUFIQSxjQXBCQSxDQTBCQTs7QUFDQTtBQUNBQSw4RUE1QkEsQ0E2QkE7O0FBQ0E7QUFDRyxXQTdFSDtBQStFQUM7QUFFQTtBQUNBO0FBQ0EsYUFKQSxDQU1BOzs7QUFDQTtBQUNBOztBQUNBO0FBQTRCQztBQUE1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFDQTtBQUE0QkE7QUFBNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQXJCQSxDQXdCQTs7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUNBO0FBQTJCQTtBQUEzQixlQS9CQSxDQWlDQTs7QUFDQTs7QUFFQSx5Q0FwQ0EsQ0FzQ0E7OztBQUNBO0FBQUEsZ0JBQ0FDLHdCQURBOztBQUVBO0FBQ0E7QUFDQUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBRkEsTUFFTTtBQUNOO0FBQ0E7QUFDQTs7QUFDQTtBQUNHLFdBdElIO0FBd0lBQztBQUVBO0FBQ0E7QUFDQSxhQUpBLENBTUE7OztBQUNBO0FBQ0E7O0FBQ0E7QUFBK0JIO0FBQS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFBZ0NBLDhCQUFoQztBQUFnQ0k7QUFBaEM7QUFDQTs7QUFDQTtBQUErQko7QUFBL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUNBO0FBQ0EsYUE1QkEsQ0E4QkE7OztBQUNBOztBQUNBO0FBQThCQTtBQUE5QixlQWhDQSxDQWtDQTs7QUFDQTs7QUFFQTs7QUFFQUE7O0FBRUE7QUFDQTs7QUFDQTtBQUNBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRyxXQXpMSDtBQTJMQTtBQUNBSztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBLGdCQUNBQyx5QkFEQTtBQUFBLGdCQUVBQyxxQ0FGQTtBQUFBLGdCQUdBZCwwQ0FIQTtBQUFBLGdCQUlBRSwwQ0FKQTtBQUFBLGdCQUtBYSxzQkFMQTtBQUFBLGdCQU1BQyxVQU5BO0FBQUEsZ0JBT0FDLG9CQVBBO0FBQUEsZ0JBUUFDLENBUkE7O0FBVUE7QUFDQTtBQUNBO0FBQ0EsaURBREEsQ0FHQTs7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQVlGLFVBQVosRUFBd0JBLFFBQXhCLEVBQXdCO0FBQ3hCO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLDRCQURBLENBQ2U7QUFDZjtBQUNBOztBQUVBRSwwQ0FUd0IsQ0FXeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQUM7QUFDQUY7QUFDQTs7QUFDQTs7QUFDQUY7QUFDQTtBQUNBLG1CQXpCd0IsQ0EyQnhCOzs7QUFDQTtBQUNBRjs7QUFDQTtBQUNBO0FBQWdDTjtBQUFoQztBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUNBO0FBQ0E7QUFBK0JBO0FBQS9CO0FBQ0EsbUJBM0N3QixDQTZDeEI7OztBQUNBO0FBQ0E7QUFDQTtBQUFBLDBCQUNBYSx3REFEQTs7QUFFQUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBbkI7QUFDQSxpQkFsRUEsQ0FvRUE7OztBQUNBO0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGlCQVJBLE1BUU87QUFDUG9CO0FBQ0E7QUFDSyxlQWhGTCxFQWdGSyxJQWhGTDtBQWtGQUM7QUFDQSxhQXJGQSxNQXFGSztBQUNMOztBQUVBLHFCQUFXUCxVQUFYLEVBQXVCQSxRQUF2QixFQUF1QjtBQUN2QkUsd0NBRHVCLENBR3ZCOztBQUNBO0FBQ0E7QUFDQUM7QUFDQUY7QUFDQTs7QUFDQTs7QUFDQUY7QUFDQTtBQUNBLGlCQVp1QixDQWN2Qjs7O0FBQ0E7QUFDQUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQVc7QUFDQTtBQUNBOztBQUNBO0FBQ0csV0EvVEg7QUFpVUE7QUFDQUM7QUFDQTtBQUFBO0FBQUEsZ0JBQ0FWLHNCQURBO0FBQUEsZ0JBRUFNLHVCQUZBO0FBQUEsZ0JBR0FSLHlCQUhBO0FBQUEsZ0JBSUFJLG9CQUpBOztBQU1BO0FBQ0EsMEJBQWdCUyxLQUFoQixFQUF1QkEsR0FBdkIsRUFBdUI7QUFDdkJSLG1DQUR1QixDQUd2Qjs7QUFDQTtBQUNBO0FBQ0FDO0FBQ0FGO0FBQ0E7O0FBQ0E7O0FBQ0FGO0FBQ0E7QUFDQTs7QUFFQTs7QUFDQUY7O0FBQ0E7QUFDQTtBQUFpQ04sNEJBQWpDO0FBQWlDSTtBQUFqQztBQUNBOztBQUNBO0FBQWdDSjtBQUFoQztBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FEQSxDQUdBOzs7QUFDQTtBQUFBLGtCQUNBb0IsTUFEQTs7QUFFQSwwQkFBZ0JELE1BQWhCLEVBQXdCQSxHQUF4QixFQUF3QjtBQUN4QlIsb0NBRHdCLENBR3hCOztBQUNBO0FBQ0E7O0FBQ0FTO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQWVELEtBQWYsRUFBc0JBLEdBQXRCLEVBQXNCO0FBQ3RCUixpQ0FEc0IsQ0FHdEI7O0FBQ0E7QUFDQTtBQUNBQztBQUNBRjtBQUNBOztBQUNBOztBQUNBRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQUY7QUFDQTtBQUFnQ047QUFBaEM7QUFDQTtBQUNBOztBQUVBOztBQUNBO0FBQStCQTtBQUEvQjs7QUFFQTtBQUNBYzs7QUFDQTtBQUNBSDtBQUNBO0FBQ0E7QUFDQSxhQWpGQSxDQW1GQTs7O0FBQ0E7O0FBRUEseUNBdEZBLENBd0ZBOzs7QUFDQTs7QUFFQTtBQUNHLFdBOVpIO0FBZ2FBO0FBQ0FVO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFiQSxDQWVBOzs7QUFDQTs7QUFDQTs7QUFFQTtBQUNBQztBQUNBO0FBQ0ksYUFISixFQUdJLElBSEo7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRyxXQS9iSDtBQWljQTtBQUNBQztBQUNBOztBQUVBO0FBQ0FDO0FBQ0E7O0FBRUEsMkRBQWtETCxNQUFsRCxFQUEwREEsR0FBMUQsRUFBMEQ7QUFDMURLO0FBQ0E7O0FBRUFBO0FBRUE7QUFDRyxXQWhkSDtBQWtkQTtBQUNBQztBQUNBO0FBQUEsZ0JBQ0FDLG1DQURBO0FBQUEsZ0JBRUFDLGlCQUZBO0FBQUEsZ0JBRUFSLENBRkE7QUFBQSxnQkFFQVMsQ0FGQTs7QUFJQTtBQUNBO0FBQ0E7O0FBRUEseUNBQWdDVCxNQUFoQyxFQUF3Q0EsR0FBeEMsRUFBd0M7QUFDeENROztBQUVBLGlEQUF1Q0MsTUFBdkMsRUFBK0NBLEdBQS9DLEVBQStDO0FBQy9DO0FBQ0FEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0FFO0FBQ0E7QUFDQTs7QUFFQTtBQUNHLFdBNWVIO0FBOGVBO0FBQ0FDO0FBQ0E7QUFDQTtBQUNBQztBQUNJLGFBRko7QUFHQTtBQUNHLFdBcmZIO0FBdWZBO0FBQ0FDO0FBQ0E7QUFFQUM7QUFFQTtBQUNBO0FBQ0FDO0FBQ0E7QUFDSSxhQUpKO0FBTUE7QUFDRyxXQXBnQkg7QUFzZ0JBO0FBQ0FDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7O0FBRUEseUNBQWdDaEIsTUFBaEMsRUFBd0NBLEdBQXhDLEVBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBaUI7O0FBQ0EseUNBQWdDakIsTUFBaEMsRUFBd0NBLEdBQXhDLEVBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0csV0E1aEJIO0FBOGhCQTtBQUNBa0I7QUFFQTs7QUFFQTtBQUNBQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQUE7QUFDQSxpQkFGQSxNQUVPO0FBQ1A7O0FBQ0F0QztBQUNBO0FBQ0E7QUFDQSxhQWRBOztBQWdCQTtBQUNBO0FBQ0FzQztBQUNBLGFBSEEsTUFHSztBQUNMO0FBQ0E7O0FBQ0E7QUFDQSxhQUpLLE1BSUE7QUFDTDs7QUFDQTs7QUFDQXRDO0FBQ0E7QUFDRyxXQW5rQkg7QUFxa0JBO0FBQ0F1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtRUFmQSxDQWlCQTs7QUFDQSx3REFBK0NwQixLQUEvQyxFQUFzREEsR0FBdEQsRUFBc0Q7QUFDdERuQjtBQUNBQTtBQUNBQTtBQUNBLGFBdEJBLENBdUJBOzs7QUFDQSx3REFBK0NtQixLQUEvQyxFQUFzREEsR0FBdEQsRUFBc0Q7QUFDdERuQjs7QUFDQTs7QUFDQUE7QUFDQTs7QUFDQSxxQ0E3QkEsQ0ErQkE7O0FBQ0E7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTtBQUFnQztBQUNoQztBQUNBOztBQUVBLCtCQTFDQSxDQTRDQTs7O0FBQ0FRO0FBQ0E7QUFDQTtBQUNHLFdBdG5CSDtBQXduQkE7QUFDQWdDO0FBQ0FDO0FBQ0FBOztBQUVBLGlDQUpBLENBTUE7OztBQUNBOztBQUVBO0FBQW1DO0FBQ25DO0FBQ0E7O0FBRUEsZ0NBYkEsQ0FlQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTtBQUNHLFdBaHBCSDtBQWtwQkFDO0FBQ0E7O0FBQ0E7QUFDQUM7QUFDQTs7QUFDQTtBQUNHLFdBeHBCSDtBQTBwQkE7QUFDQUM7QUFDQSw2Q0FBb0N6QixNQUFwQyxFQUE0Q0EsR0FBNUMsRUFBNEM7QUFDNUM7QUFDQWlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0csV0FscUJIOztBQW9xQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FTO0FBQ0E7QUFBQSxnQkFDQUMsdUNBREE7QUFBQSxnQkFFQUMsNENBRkE7O0FBSUEsbUJBQVVDLFlBQVYsRUFBd0JBLEdBQXhCLEVBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0csV0FwckJIO0FBc3JCQUM7QUFDQUM7QUFDRyxXQXhyQkg7QUEwckJBQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQUQ7QUFDQTtBQUNBO0FBQ0csV0Fwc0JIO0FBc3NCQUU7QUFDQXBEO0FBQ0E7QUFFQUE7QUFDQTtBQUNHLFdBNXNCSDtBQThzQkFxRDtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0csV0FwdEJIO0FBdXRCQTtBQUNBO0FBQ0FDO0FBQ0E7QUFBQSxnQkFDQVIsdUNBREE7QUFBQSxnQkFFQWhDLHVCQUZBO0FBQUEsZ0JBR0EyQixlQUhBO0FBQUEsZ0JBSUFNLDRDQUpBLENBREEsQ0FPQTs7QUFDQTtBQUNBO0FBQ0EsYUFWQSxDQVlBOzs7QUFDQTtBQUFBLGdCQUNBUSwwQkFEQTtBQUFBLGdCQUVBMUMsV0FGQSxDQWJBLENBaUJBOztBQUNBOztBQUVBO0FBQ0EyQztBQUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUhBLE1BR007QUFBK0Q7QUFDckU7QUFDQTNDLHlHQUZNLENBSU47O0FBQ0E0Qzs7QUFDQVgsMkhBTk0sQ0FRTjs7O0FBQ0E7O0FBQ0FVOztBQUNBM0M7O0FBRUE7QUFDQTtBQUNBQzs7QUFDQTtBQUNBQTtBQUNBO0FBQ0E7QUFDQSxlQXBCTSxNQW9CQTtBQUNOMEM7QUFDQTs7QUFFQUE7QUFDQTs7QUFFQTtBQUNHLFdBaHhCSDtBQWt4QkFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FDO0FBQ0E7O0FBQ0E7QUFDRyxXQTF4Qkg7QUE0eEJBO0FBQ0FDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUM7QUFDQTs7QUFFQS9EO0FBQ0csV0F2eUJIO0FBeXlCQTtBQUNBZ0U7QUFDQTtBQUNHLFdBNXlCSDtBQTh5QkE7QUFDQUM7QUFDQTtBQUVBOztBQUNBO0FBQ0FDO0FBQ0EsYUFGQSxNQUVLO0FBQ0xBO0FBQ0EsYUFGSyxNQUVBO0FBQ0xBO0FBQ0E7O0FBRUE7QUFBMEJDLGdFQUExQjtBQUEwQkMsNkNBQTFCO0FBQTBCQztBQUExQjtBQUNHLFdBNXpCSDtBQTh6QkFDO0FBQ0E7QUFBQSxnQkFDQTFGLGtEQURBO0FBQUEsZ0JBRUFDLHNEQUZBO0FBQUEsZ0JBR0FDLHNEQUhBLENBREEsQ0FNQTs7QUFDQTtBQUNBO0FBQ0EsYUFUQSxDQVdBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTZEO0FBQ0E7QUFDRyxXQS8wQkg7QUFpMUJBNEI7QUFDQTtBQUFBLGdCQUNBQyx1QkFEQTs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQUE7QUFDQTs7QUFFQSx5REFDQUEsaURBREEsSUFFQSw4QkFGQSxFQUVBO0FBRUE7QUFDQWQ7QUFDQSxhQU5BLE1BTUs7QUFDTEE7QUFDQSxhQXBCQSxDQXNCQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0csV0EzMkJIO0FBNjJCQWU7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTlCO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBQTtBQUNBO0FBQ0csV0F6M0JIO0FBMjNCQStCO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0csV0FoNEJIO0FBazRCQUM7QUFDQTtBQUFBLGdCQUNBOUYsc0RBREE7QUFBQSxnQkFFQUMsc0RBRkE7QUFBQSxnQkFHQTZELGVBSEE7O0FBS0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBQTtBQUNBO0FBQ0csV0FoNUJIO0FBazVCQWlDO0FBQ0E7QUFBcUI7QUFDckI7QUFDQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0csV0ExNUJIO0FBNDVCQUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBRUE7QUFDQTtBQUNHLFdBeDZCSDtBQTA2QkFDO0FBQ0E7QUFBQSxnQkFDQTdCLDRDQURBO0FBQUEsZ0JBRUE4QixzQ0FGQTtBQUFBLGdCQUdBQyxpQkFIQSxDQURBLENBTUE7QUFDQTtBQUNBOztBQUNBO0FBQ0FBO0FBQTZCO0FBQUEsZUFBN0I7QUFDQTs7QUFFQTtBQUNBQztBQUNBOztBQUNBO0FBQ0E7QUFDQSx1Q0FsQkEsQ0FvQkE7O0FBQ0EscUNBQTRCQyxlQUE1QixFQUE2Q0EsTUFBN0MsRUFBNkM7QUFDN0M7QUFDQTtBQUNBLGFBeEJBLENBMEJBOzs7QUFDQTtBQUNHLFdBdDhCSDtBQXc4QkE7QUFDQUM7QUFDQTtBQUFBLGdCQUNBbkMsdUNBREE7QUFBQSxnQkFFQUMsNENBRkE7QUFBQSxnQkFHQW1DLFdBSEE7QUFBQSxnQkFHQWxDLENBSEE7O0FBS0E7QUFDQTtBQUNBOztBQUVBaEQsMkRBVkEsQ0FZQTs7QUFDQSxtQkFBVWdGLGVBQVYsRUFBMkJBLE1BQTNCLEVBQTJCO0FBQzNCRSx1RUFEMkIsQ0FDbUM7QUFFOUQ7O0FBQ0E7O0FBQ0E7QUFDQUM7O0FBQ0FuRjtBQUNBO0FBQ0EsZUFUMkIsQ0FXM0I7OztBQUNBbUY7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0EsaUJBSkEsQ0FNQTs7O0FBRUE7QUFDQTFCO0FBQ0EwQjtBQUNBbkYsNENBWEEsQ0FhQTs7QUFDQTs7QUFDQSxtQ0FBd0JnRCxnQkFBeEIsRUFBMENBLEdBQTFDLEVBQTBDO0FBQzFDb0M7QUFDQTNCO0FBQ0E7O0FBQ0E0Qiw2Q0FuQkEsQ0FxQkE7OztBQUNBOztBQUVBO0FBQ0EsZUF0QzJCLENBd0MzQjs7O0FBQ0F2QztBQUNBLGFBdkRBLENBeURBOzs7QUFDQTs7QUFDQTlDO0FBQ0E7QUFDRyxXQXRnQ0g7O0FBd2dDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FzRjtBQUNBO0FBQ0E7QUFDQXRCO0FBQ0E7QUFDSSxhQUpKO0FBS0csV0FuaENIO0FBcWhDQTtBQUNBdUI7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDRyxXQTNoQ0g7QUE0aENBQztBQUNBLDRCQUFtQnJFLHNCQUFuQixFQUEyQ0EsR0FBM0MsRUFBMkM7QUFDM0M7QUFDQTs7QUFDQTtBQUNBc0U7QUFDQTtBQUNHLFdBbmlDSDtBQXFpQ0E7QUFDQUM7QUFDQSxzREFEQSxDQUdBOztBQUNBOztBQUVBO0FBQXdHO0FBQ3hHLHFDQURBLENBRUE7OztBQUNBOztBQUVBO0FBRUEsYUFQQSxNQU9LO0FBQWlDO0FBQ3RDOztBQUVBO0FBQ0EsYUFKSyxNQUlBO0FBQ0w7QUFDQTtBQUNHLFdBMWpDSDtBQTRqQ0E7QUFDQUM7QUFDQTtBQUNBO0FBQ0EsYUFGQSxNQUVLO0FBQ0w7QUFDQTs7QUFFQSx5RUFQQSxDQU9pRTtBQUM5RCxXQXJrQ0g7O0FBdWtDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQztBQUNBOztBQUVBO0FBQ0E7QUFDQXBFO0FBQ0E7O0FBQ0E7QUFDQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0csV0E5bENIO0FBZ21DQTtBQUNBcUU7QUFDQTtBQUNBO0FBQ0EsYUFGQSxNQUVLO0FBQ0xDOztBQUVBOztBQUNBOztBQUNBO0FBQ0EsYUFOSyxNQU1BO0FBQ0xBO0FBQ0E7QUFDRyxXQTdtQ0g7O0FBK21DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQztBQUNBO0FBQUEsZ0JBQ0E1RSxLQURBO0FBQUEsZ0JBRUFuQixLQUZBO0FBSUFnRzs7QUFFQSxtQkFBVTdFLGlCQUFWLEVBQTZCQSxHQUE3QixFQUE2QjtBQUM3Qm5COztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQWdHO0FBQ0E7O0FBRUE7QUFDRyxXQXpvQ0g7O0FBMm9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUM7QUFDQTtBQUNBQztBQUNBO0FBQ0ssZUFITDtBQUlBQztBQUNBO0FBQ0E7QUFOQTtBQVNBO0FBQ0E7QUE1cENBLFdBTkMsQ0FxcUNEOztBQUNBckc7QUFDQXNHO0FBREE7QUFJQXRHO0FBQ0F1RztBQUNBO0FBQ0FDLHlEQUNBO0FBQ0ksYUFKSjtBQUtBQztBQUNBOztBQUNBLHVIQUZBLENBSUE7OztBQUNBO0FBQ0ksYUFYSjtBQVlBQztBQUNBOztBQUNBLHVIQUZBLENBSUE7OztBQUNBO0FBQ0ksYUFsQko7QUFtQkFDO0FBQ0E7QUFDQTtBQXJCQSxXQURBO0FBeUJBQztBQUNBO0FBQ0FKO0FBQ0E7QUFDQTtBQUNJLGFBTEo7QUFPQUM7QUFDQTtBQUFBLGtCQUNBekYsdUJBREE7QUFBQSxrQkFFQWlDLDRDQUZBO0FBQUEsa0JBR0E1QixDQUhBOztBQUtBLHNDQU5BLENBUUE7O0FBQ0E7QUFDQTtBQUFBLG9CQUNBb0Msb0JBREE7QUFBQSxvQkFFQTVDLENBRkE7O0FBSUE7QUFDQWdHO0FBQ0E7O0FBRUE7QUFBMEU7QUFDMUU3Rjs7QUFDQWtEO0FBQ0EsaUJBSEEsTUFHTztBQUNQO0FBQ0FBOztBQUNBQTtBQUNBLGlCQWhCQSxDQWtCQTtBQUNBOzs7QUFDQSw2Q0FBa0M3QyxNQUFsQyxFQUEwQ0EsR0FBMUMsRUFBMEM7QUFDMUNSOztBQUNBO0FBQ0FHO0FBQ0E7QUFDQTtBQUVLLGVBM0JMOztBQTZCQSxrQ0F0Q0EsQ0F3Q0E7OztBQUNBLG9GQXpDQSxDQTBDQTs7O0FBQ0FBO0FBQ0E7QUFDQThGO0FBQ0E7QUFDSyxlQUpMLEVBM0NBLENBaURBOztBQUNBO0FBQ0E1QztBQUNLLGVBRkw7O0FBSUEsdUNBdERBLENBd0RBOztBQUNBO0FBQ0E7QUFDQTtBQUNBbEQ7QUFDQWtEO0FBQ00saUJBSE47O0FBS0E7QUFDSyxlQVJMO0FBU0ksYUF6RUo7QUEyRUF3QztBQUNBLHVHQURBLENBR0E7OztBQUNBLHVIQUpBLENBS0E7OztBQUNBO0FBQ0ksYUFsRko7QUFvRkFDO0FBQ0E7QUFBQSxrQkFDQTNGLHVCQURBO0FBR0FBOztBQUNBO0FBQ0E7QUFBdUM7QUFFdkNnRjs7QUFDQTs7QUFDQTs7QUFFQTlGOztBQUNBQTs7QUFFQTtBQUNBYztBQUNBZDs7QUFFQTZHO0FBQ08sbUJBTFA7QUFPQSxpQkFoQkEsTUFnQk87QUFBTztBQUNkOztBQUVBQTs7QUFDQUE7QUFDQTtBQUNBO0FBQ0E7QUFqSEEsV0F6QkE7QUE2SUE7QUFDQUM7QUFDQTtBQUFBLGdCQUNBL0QsNENBREEsQ0FEQSxDQUlBOzs7QUFDQVM7O0FBRUEsMEJBUEEsQ0FTQTs7QUFDQTs7QUFDQUEsb0VBWEEsQ0FhQTtBQUNBOzs7QUFDQTtBQUVBO0FBQ0E7QUFDQSw0Q0FEQSxDQUVBOztBQUNBO0FBQ0E3QztBQUNBOztBQUNBO0FBQ0FBO0FBQ0E7QUFDQSxlQVRBLE1BU007QUFDTjZDO0FBQ0FRO0FBQ00saUJBRk47QUFHQTs7QUFDQTZDO0FBQ0ksYUFsQko7QUFtQkcsV0FoTEg7QUFrTEFFO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDRyxXQXhMSDtBQTBMQTtBQUNBO0FBQ0FDO0FBQ0E7QUFDQTtBQUVBbEg7QUFDQTtBQWpNQTs7QUFvTUFBO0FBQ0E7QUFDQSxTQUZBOztBQUlBO0FBQ0F4QiwyQ0FEQTtBQUdBdUI7QUFFQUMsMkdBQ0E7QUFBZW1ILHdCQUFmO0FBQWVDO0FBQWYsYUFEQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNHLFdBekJIO0FBMkJBO0FBQ0FmO0FBQ0FnQjs7QUFFQSx5REFBZ0RoRyxNQUFoRCxFQUF3REEsR0FBeEQsRUFBd0Q7QUFDeEQ7QUFDQTs7QUFFQSxtREFBMENTLE1BQTFDLEVBQWtEQSxHQUFsRCxFQUFrRDtBQUNsRDtBQUNBO0FBQ0E7O0FBQ0F1RjtBQUNBOztBQUVBO0FBQ0csV0EzQ0g7QUE2Q0E7QUFDQWpCO0FBQ0E7QUFDRyxXQWhESDtBQWtEQTtBQUNBa0I7QUFDQTtBQUFBLGdCQUNBM0Usc0JBREE7QUFBQSxnQkFFQTRFLDRDQUZBO0FBQUEsZ0JBR0FyQyxxQkFIQTtBQUFBLGdCQUlBc0MsdUJBSkE7QUFBQSxnQkFLQW5HLENBTEEsQ0FEQSxDQVFBOzs7QUFDQTtBQUNBNkQ7QUFDQTs7QUFDQSwwQkFBZ0I3RCx3QkFBaEIsRUFBMENBLEdBQTFDLEVBQTBDO0FBQzFDb0c7QUFDQTs7QUFDQUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFGQSxNQUVLO0FBQWtDO0FBQ3ZDO0FBQ0EsYUFGSyxNQUVBO0FBQ0w7QUFDQTtBQUNHLFdBNUVIO0FBOEVBakc7QUFDQTtBQUNBQztBQUNBO0FBQ0csV0FsRkg7QUFvRkFpRztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNHLFdBekZIO0FBMkZBO0FBQ0FDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDRyxXQWxHSDtBQW1HQUM7QUFDQTtBQUNHLFdBckdIO0FBd0dBQztBQUVBO0FBRUE7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUNBQztBQUNBOztBQUNBO0FBQ0EsYUFOQSxNQU1LO0FBQ0w7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0csV0EvSEg7O0FBaUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNHLFdBM0lIOztBQTZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUM7QUFDQTs7QUFFQTtBQUNBdkc7QUFDQUE7QUFDQTs7QUFDQTtBQUNBQTtBQUNBQTtBQUNBO0FBQ0csV0E5Skg7QUFnS0F3RztBQUNBO0FBQUEsZ0JBQ0FSLG1DQURBO0FBQUEsZ0JBRUFTLFVBRkE7QUFBQSxnQkFHQUMsVUFIQTtBQUFBLGdCQUlBQyw2QkFKQTtBQUFBLGdCQUtBaEgsQ0FMQTtBQUFBLGdCQUtBaUgsS0FMQTtBQUFBLGdCQUtBQyxXQUxBO0FBQUEsZ0JBS0FDLFVBTEEsQ0FEQSxDQVFBOztBQUNBO0FBQ0E7QUFDQSxhQVhBLENBYUE7OztBQUNBLGdDQWRBLENBZ0JBOzs7QUFDQSx3QkFBZW5ILGtCQUFmLEVBQW1DQSxHQUFuQyxFQUFtQztBQUNuQ2tIOztBQUVBOztBQUVBSjtBQUNBQztBQUNBLGFBeEJBLENBMEJBOzs7QUFDQSx3QkFBZS9HLHdCQUFmLEVBQXlDQSxHQUF6QyxFQUF5QztBQUN6Q2lILHVDQUR5QyxDQUd6Qzs7QUFDQTtBQUNBQTtBQUNBOztBQUVBOztBQUVBQztBQUNBQztBQUVBTDtBQUNBQztBQUNBOztBQUVBLGtHQTVDQSxDQThDQTs7QUFDQTtBQUNHLFdBaE5IO0FBa05BO0FBQ0FLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDRyxXQXpOSDtBQTJOQUM7QUFDQSxrRkFDQTtBQUNBO0FBQUEsa0JBQ0FySCxDQURBO0FBQUEsa0JBQ0FSLENBREE7O0FBRUEsMkNBQWtDUSxNQUFsQyxFQUEwQ0EsR0FBMUMsRUFBMEM7QUFDMUNSLCtCQUQwQyxDQUcxQzs7QUFDQTtBQUNBQTs7QUFDQUE7QUFDQTtBQUNBO0FBQ0ssYUFiTCxFQWNBO0FBQ0E7QUFBQSxrQkFDQWlCLENBREE7QUFBQSxrQkFDQTZHLEVBREE7O0FBRUEsaURBQXdDN0csTUFBeEMsRUFBZ0RBLEdBQWhELEVBQWdEO0FBQ2hENkc7O0FBQ0E7QUFDQUE7O0FBQ0FBO0FBQ0E7QUFDQTtBQUNBLGFBeEJBO0FBMEJHLFdBdFBIO0FBd1BBQztBQUNBLGdFQUNBO0FBQ0ExRSxrSUFEQSxDQUdBO0FBQ0E7OztBQUNBO0FBQ0FBOztBQUNBQSwyRkFGQSxDQUVrRjs7QUFDbEYsZUFIQSxNQUdPO0FBQ1BBO0FBQ0E7O0FBRUFBO0FBQ0EsYUFkQTtBQWdCRyxXQXpRSDtBQTJRQTJFO0FBQ0E7QUFDQTNFO0FBQ0ksYUFGSjtBQUdHLFdBL1FIO0FBaVJBNEU7QUFDQSxvRkFDQTtBQUNBO0FBQ0E7QUFDQSxlQUhBLENBS0E7OztBQUNBLGtEQUF5Q3pILE1BQXpDLEVBQWlEQSxHQUFqRCxFQUFpRDtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTBIO0FBRUFBOztBQUNBO0FBQ0FBO0FBQ0E7QUFDQTs7QUFFQTdFO0FBQ0E7QUFDSyxhQXpCTCxFQTBCQTtBQUNBQTtBQUNBLGFBNUJBO0FBOEJHLFdBaFRIO0FBa1RBOEU7QUFDQTtBQUNBLG1EQUEwQzNILE1BQTFDLEVBQWtEQSxHQUFsRCxFQUFrRDtBQUNsRDs7QUFDQTtBQUNBMEg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJEQUFpRGpILE1BQWpELEVBQXlEQSxHQUF6RCxFQUF5RDtBQUN6RDtBQUNBO0FBQ0EsYUFMQSxNQUtLO0FBQ0wsMkRBQWlEbUgsTUFBakQsRUFBeURBLEdBQXpELEVBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNHLFdBdFVIO0FBd1VBQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0csV0E3VUg7QUErVUE7QUFDQUM7QUFDQTs7QUFDQSw2RUFDQTtBQUNBO0FBQ0EsOENBQXFDOUgsTUFBckMsRUFBNkNBLEdBQTdDLEVBQTZDO0FBQzdDUjs7QUFDQTtBQUNBcUQ7O0FBQ0E7QUFDQXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0ssYUFaTCxFQWFBO0FBQ0E7QUFDQSxvREFBMkNRLE1BQTNDLEVBQW1EQSxHQUFuRCxFQUFtRDtBQUNuRFI7O0FBQ0E7QUFDQXFEOztBQUNBO0FBQ0FyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBeEJBO0FBMEJHLFdBNVdIO0FBOFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBdUk7QUFDQTtBQUFBLGdCQUNBbEUsaUJBREE7QUFBQSxnQkFFQTdELENBRkE7QUFBQSxnQkFFQTZDLENBRkE7O0FBSUE7QUFDQTtBQUNBbUY7QUFDQTs7QUFDQTtBQUNBQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBdUNqSSxNQUF2QyxFQUErQ0EsR0FBL0MsRUFBK0M7QUFDL0M2Qzs7QUFDQTtBQUNBQTtBQUNBOztBQUNBO0FBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0csV0E3WUg7QUErWUE7QUFDQXFGO0FBQ0E7QUFDQTtBQUNBO0FBblpBO0FBc1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBdko7QUFDQXdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRyxXQU5IO0FBUUFDO0FBQ0E7QUFDQTtBQVZBOztBQWFBeko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBTEE7O0FBT0FBO0FBRUEwSjtBQUNBO0FBQUEsZ0JBQ0FDLDJCQURBO0FBQUEsZ0JBRUFDLGlCQUZBO0FBQUEsZ0JBR0FDLDZCQUhBO0FBQUEsZ0JBSUFDLDRCQUpBO0FBQUEsZ0JBS0FDLHlCQUxBOztBQU9BO0FBRUFEO0FBQ0csV0FiSDtBQWVBRTtBQUNBO0FBQ0E7QUFDRyxXQWxCSDtBQW9CQTtBQUNBQztBQUNBO0FBQUEsZ0JBQ0FOLDJCQURBO0FBQUEsZ0JBRUFDLGlCQUZBO0FBQUEsZ0JBR0FDLDZCQUhBO0FBQUEsZ0JBSUFDLDRCQUpBO0FBQUEsZ0JBS0F6SSxDQUxBO0FBQUEsZ0JBS0E2SSxHQUxBOztBQU9BOztBQUVBLDJDQUFrQzdJLE9BQWxDLEVBQTJDQSxHQUEzQyxFQUEyQztBQUMzQztBQUVBeUk7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUVHLFdBNUNIO0FBOENBSztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ0FQLGlCQURBOztBQUdBO0FBQ0FDOztBQUVBO0FBQ0FDOztBQUVBLCtDQUFvQ2IsT0FBcEMsRUFBNkNBLEdBQTdDLEVBQTZDO0FBQzdDbUI7O0FBQ0E7QUFDQW5CO0FBQ0FpQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0csV0FqRUg7QUFtRUFHO0FBQ0E7QUFBQSxnQkFDQVYsMkJBREE7QUFBQSxnQkFFQXRJLENBRkE7QUFBQSxnQkFFQVMsQ0FGQTtBQUFBLGdCQUVBbUgsQ0FGQTtBQUFBLGdCQUVBWSxHQUZBO0FBQUEsZ0JBRUFDLElBRkE7QUFBQSxnQkFFQUksR0FGQTtBQUFBLGdCQUVBSSxHQUZBO0FBQUEsZ0JBRUFDLElBRkE7QUFBQSxnQkFHQUMsK0JBSEE7QUFBQSxnQkFJQUMsZ0NBSkE7QUFBQSxnQkFLQXBGLGNBTEE7O0FBT0EsNEJBQW1CaEUsVUFBbkIsRUFBK0JBLEdBQS9CLEVBQStCO0FBQy9Cd0k7O0FBQ0E7QUFFQSxnQ0FBcUIvSCxVQUFyQixFQUFpQ0EsR0FBakMsRUFBaUM7QUFDakNnSTs7QUFDQTtBQUVBLG1EQUFzQ2IsT0FBdEMsRUFBK0NBLEdBQS9DLEVBQStDO0FBQy9DcUI7QUFDQUM7O0FBQ0Esa0RBQ0FBLHlDQURBLEVBQ0E7QUFDQUU7QUFDQXBGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0csV0FqR0g7QUFtR0FxRjtBQUNBO0FBQ0E7QUFDRyxXQXRHSDtBQXdHQUM7QUFDQTtBQUFBLGdCQUNBQyxlQURBO0FBRUE7QUFDQTtBQTVHQTtBQStHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBTUE7QUFDQTVLO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E2SztBQUNBO0FBQUEsa0JBQ0FDLDBCQURBO0FBRUE7QUFDSSxhQVpKOztBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDO0FBQ0E7QUFBQSxrQkFDQUMsWUFEQTtBQUFBLGtCQUVBQyxjQUZBO0FBQUEsa0JBR0E1SixDQUhBO0FBQUEsa0JBR0E2SixFQUhBO0FBQUEsa0JBR0FDLENBSEE7O0FBS0EsMkNBQWlDOUosTUFBakMsRUFBeUNBLEdBQXpDLEVBQXlDO0FBQ3pDNko7QUFDQUM7O0FBRUE7QUFDQUY7QUFDQSxpQkFGQSxNQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBRztBQUNBSjtBQUNBO0FBQ0E7O0FBRUE7QUFBYUssK0JBQWI7QUFBYUo7QUFBYjtBQUNJLGFBNUNKOztBQStDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBSztBQUNBO0FBQUEsa0JBQ0FDLDREQURBOztBQUdBO0FBQXNCO0FBQ3RCQyxzQ0FDQUEsMkJBQ0EsNERBREEsQ0FEQTtBQUlBQSxzQ0FDQUEsMkJBQ0EsNERBREEsQ0FEQTtBQUlBO0FBQ0EsZUFWQSxNQVVNO0FBQVE7QUFDZDtBQUNBO0FBQ0ksYUF2RUo7O0FBeUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDO0FBQ0E7QUFDQTtBQUFBO0FBQUEsa0JBQ0FDLGNBREE7QUFBQSxrQkFDQUMsY0FEQTtBQUFBLGtCQUVBQyxlQUZBO0FBQUEsa0JBRUFDLGVBRkE7QUFBQSxrQkFHQUMsZUFIQTtBQUFBLGtCQUdBQyxlQUhBO0FBQUEsa0JBSUFmLFlBSkE7QUFBQSxrQkFJQWdCLFlBSkE7QUFBQSxrQkFLQTNLLENBTEE7O0FBT0EsMkNBQWlDQSxNQUFqQyxFQUF5Q0EsR0FBekMsRUFBeUM7QUFDekM7O0FBQ0E7QUFDQXVLO0FBQ0FLO0FBQ0E7O0FBQ0E7QUFDQUo7QUFDQUs7QUFDQTs7QUFDQTtBQUNBSjtBQUNBSjtBQUNBOztBQUNBO0FBQ0FLO0FBQ0FKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBSztBQUNBaEI7QUFDQSxlQUhBLE1BR007QUFDTmdCO0FBQ0FoQjtBQUNBOztBQUVBLGdGQUNBLDZDQURBO0FBRUE7QUFDQTtBQXhIQTtBQTBIRSxTQTNIRjs7QUE2SEFoTDtBQUNBeUw7QUFDQTtBQUFBLGdCQUNBVSxXQURBO0FBQUEsZ0JBRUFDLENBRkE7QUFBQSxnQkFFQS9LLENBRkE7O0FBSUEsOENBQXFDQSxNQUFyQyxFQUE2Q0EsR0FBN0MsRUFBNkM7QUFDN0MrSztBQUNBRDtBQUNBOztBQUVBO0FBQ0E7QUFaQSxXQTFpRUMsQ0F5akVEO0FBQ0E7O0FBRUFuTTtBQUVBcU0sMkJBRkE7QUFHQUMsbUNBSEE7QUFHQTtBQUNBQyw4QkFKQTtBQU1BQyxtQ0FOQTtBQU1BO0FBQ0FDLGdDQVBBO0FBUUFDLGdDQVJBO0FBVUFDLG9DQVZBO0FBVUE7QUFDQTtBQUVBQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBLGdCQUNBQyxtQkFEQTtBQUFBLGdCQUVBbEssZ0JBRkE7QUFBQSxnQkFHQW1LLDZDQUhBO0FBQUEsZ0JBSUFDLFNBSkE7O0FBTUE7O0FBQ0EsMkNBWkEsQ0FjQTs7QUFFQTtBQUNBQTtBQUNBLGFBRkEsTUFFSztBQUNMQTtBQUNBLGFBRkssTUFFQTtBQUNMRCw2QkFESyxDQUNlOztBQUNwQkM7QUFDQTs7QUFFQTtBQUNHLFdBdkNIO0FBeUNBQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUVBO0FBQ0csV0FqREg7QUFtREFDO0FBQ0E7QUFBQSxnQkFDQUMscUNBREE7QUFBQSxnQkFDQTtBQUNBQyx5Q0FGQTtBQUFBLGdCQUdBQyxRQUhBO0FBQUEsZ0JBSUEvTCxDQUpBO0FBQUEsZ0JBSUFnTSxLQUpBO0FBTUFILGdEQVBBLENBT3dDOztBQUV4Q0U7O0FBRUEsd0JBQWUvTCxTQUFmLEVBQTBCQSxHQUExQixFQUEwQjtBQUFPO0FBQ2pDZ007QUFDQUQ7QUFDQTs7QUFFQTtBQUNHLFdBcEVIO0FBc0VBRTtBQUNBO0FBQUEsZ0JBQ0FKLGdFQURBO0FBQUEsZ0JBRUFLLG9FQUZBO0FBQUEsZ0JBR0FDLGdGQUhBO0FBQUEsZ0JBSUFILFNBSkE7QUFBQSxnQkFLQUQsUUFMQTtBQUFBLGdCQU1BL0wsQ0FOQTtBQVFBK0wsK0JBVEEsQ0FXQTs7QUFDQSw0QkFBbUIvTCxNQUFuQixFQUEyQkEsR0FBM0IsRUFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0ErTDtBQUNBOztBQUNBQztBQUNBSDtBQUNBOztBQUNBO0FBQ0csV0E1Rkg7QUE4RkFPO0FBQ0E7QUFBQSxnQkFDQTlLLGdCQURBO0FBQUEsZ0JBRUEzQix3QkFGQTtBQUFBLGdCQUdBME0sa0RBSEE7QUFBQSxnQkFJQTdNLENBSkE7QUFBQSxnQkFJQVEsQ0FKQTtBQU1Bd0w7QUFFQTs7QUFDQSw4Q0FBcUN4TCxNQUFyQyxFQUE2Q0EsR0FBN0MsRUFBNkM7QUFDN0NSO0FBRUFHOztBQUVBO0FBQ0FIO0FBQ0E7QUFDQTs7QUFDQTtBQUNBQTtBQUNBOztBQUVBO0FBQ0E4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQWtLO0FBQ0FuSiwyQkFEQTtBQUVBRDtBQUZBO0FBSUFvSjtBQUNBQTtBQUNBO0FBaklBLFdBNWpFQyxDQWdzRUQ7O0FBQ0E3TTtBQUNBMk47QUFDQTtBQUFBLGdCQUNBaEwsZ0JBREE7QUFBQSxnQkFFQTNCLHdCQUZBO0FBQUEsZ0JBR0E0TSx5REFIQTtBQUFBLGdCQUlBdk0sQ0FKQTtBQUFBLGdCQUlBUixDQUpBO0FBQUEsZ0JBSUFnTixHQUpBO0FBQUEsZ0JBSUFDLE1BSkE7QUFNQWpCLHFDQVBBLENBU0E7QUFDQTs7QUFDQSx3QkFBZXhMLHVCQUFmLEVBQXdDQSxHQUF4QyxFQUF3QztBQUN4Q3lNO0FBQ0FqTixrQ0FGd0MsQ0FJeEM7O0FBQ0FnTjtBQUNBbEw7QUFDQTlCLGlDQVB3QyxDQVN4Qzs7QUFDQUE7QUFDQUE7O0FBQ0E7QUFDQUEsMkNBREEsQ0FDaUM7QUFDakM7O0FBRUFHO0FBQ0E7O0FBQ0E7QUFFQTZMO0FBQ0FBO0FBQ0FuSiwyQkFEQTtBQUVBRDtBQUZBO0FBSUcsV0FyQ0g7QUF1Q0FzSztBQUNBO0FBQ0E7QUF6Q0EsV0Fqc0VDLENBNnVFRDs7QUFDQS9OO0FBRUEyTjtBQUNBO0FBQUEsZ0JBQ0FkLG1CQURBO0FBQUEsZ0JBRUFsSyxnQkFGQTtBQUFBLGdCQUdBM0Isd0JBSEE7QUFBQSxnQkFJQWdOLDhCQUpBO0FBQUEsZ0JBS0FDLHNEQUxBO0FBQUEsZ0JBTUFDLGdCQU5BO0FBQUEsZ0JBT0FOLDBCQUE0Qiw0Q0FBNUIsQ0FQQTtBQUFBLGdCQU80QjtBQUM1Qk8sZ0RBUkE7QUFBQSxnQkFTQTlNLENBVEE7QUFBQSxnQkFTQVIsQ0FUQTtBQUFBLGdCQVNBZ04sR0FUQTtBQUFBLGdCQVNBTyxPQVRBO0FBQUEsZ0JBU0FsQixTQVRBO0FBQUEsZ0JBU0FZLE1BVEE7O0FBV0E7QUFDQUs7QUFDQTs7QUFFQTtBQUNBO0FBQ0FQLHFDQUZBLENBSUE7O0FBQ0FBO0FBQ0EsYUFOQSxNQU1LO0FBQ0w7QUFDQUE7QUFDQTs7QUFFQWYscUNBM0JBLENBNkJBO0FBQ0E7QUFDQTs7QUFDQSx3QkFBZXhMLHVCQUFmLEVBQXdDQSxHQUF4QyxFQUF3QztBQUN4Q1I7QUFFQWlOLDREQUh3QyxDQUt4Qzs7QUFDQUQ7QUFDQWxMO0FBQ0E5QixpQ0FSd0MsQ0FVeEM7QUFDQTs7QUFDQTtBQUNBdU47QUFDQWxCLDJEQUZBLENBRWlEOztBQUNqRGtCLDBEQUhBLENBR2dEOztBQUNoREE7QUFDQSxlQWpCd0MsQ0FtQnhDOzs7QUFDQTtBQUNBdk4sMkNBREEsQ0FDaUM7QUFDakM7O0FBQ0E7QUFDQUE7QUFDQSxlQXpCd0MsQ0EyQnhDOzs7QUFDQUc7O0FBRUE7QUFDQUg7QUFDQTtBQUNBOztBQUVBZ007O0FBQ0FBLG9DQXBFQSxDQXNFQTs7O0FBQ0EsOENBQXFDeEwsTUFBckMsRUFBNkNBLEdBQTdDLEVBQTZDO0FBQzdDeU07QUFDQWpOLGtDQUY2QyxDQUk3Qzs7QUFDQUE7QUFDQUE7O0FBRUE7QUFDQUE7QUFDQSxlQVY2QyxDQVk3Qzs7O0FBQ0E7QUFDQWdOO0FBQ0FPO0FBQ0FBLG1EQUhBLENBSUE7O0FBQ0FQO0FBQW1CcE87QUFBbkI7QUFDQTtBQUNBOztBQUNBO0FBRUFvTjtBQUVBNUw7QUFDQTRMOztBQUNBQTtBQUNBbkosMkJBREE7QUFFQUQ7QUFGQTtBQUlJLGFBTkosRUFNSSxHQU5KO0FBT0csV0F6R0g7QUEyR0FzSztBQUNBO0FBQUEsZ0JBQ0FsQixtQkFEQTtBQUFBLGdCQUVBbEssZ0JBRkE7QUFBQSxnQkFHQTNCLHdCQUhBO0FBQUEsZ0JBSUFpTixrSkFKQTtBQUFBLGdCQUtBUCxrREFMQTtBQUFBLGdCQU1BUSxnQkFOQTtBQUFBLGdCQU9Bck4sQ0FQQTtBQUFBLGdCQU9BUSxDQVBBO0FBQUEsZ0JBT0F3TSxHQVBBO0FBQUEsZ0JBT0FPLE9BUEE7QUFBQSxnQkFPQWxCLFNBUEE7QUFBQSxnQkFPQW1CLGFBUEE7QUFTQXhCOztBQUNBQSxvQ0FYQSxDQWFBOzs7QUFDQTs7QUFDQSw4Q0FBcUN4TCxNQUFyQyxFQUE2Q0EsR0FBN0MsRUFBNkM7QUFDN0NSLGtDQUQ2QyxDQUc3Qzs7QUFDQTtBQUNBO0FBQ0EsZUFONkMsQ0FRN0M7OztBQUNBQSw2QkFUNkMsQ0FXN0M7O0FBQ0FBO0FBQ0EsMENBYjZDLENBZTdDOztBQUNBd047O0FBQ0E7QUFDQXhOOztBQUNBd047QUFDQTs7QUFDQTtBQUNBeE47QUFDQXdOO0FBQ0E7O0FBQ0E7QUFDQXJOO0FBQ0EsZUEzQjZDLENBNkI3Qzs7O0FBQ0E7QUFDQTZNO0FBQ0FPO0FBQ0FsQjtBQUNBa0I7QUFDQVA7QUFBbUJwTztBQUFuQjtBQUNBO0FBQ0E7O0FBRUFvTjtBQUVBNUw7QUFDQTtBQUNBOztBQUNBLGdEQUFzQ0ksTUFBdEMsRUFBOENBLEdBQTlDLEVBQThDO0FBQzlDUjs7QUFDQTtBQUNBeU47QUFDQTtBQUNBOztBQUdBLGdEQUFzQ2pOLE1BQXRDLEVBQThDQSxHQUE5QyxFQUE4QztBQUM5Q1I7O0FBRUE7QUFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBQTtBQUNBOztBQUNBO0FBQ0FBO0FBQ0E7O0FBRUE7QUFDQUc7QUFDQTs7QUFFQTJCO0FBQ0E7QUFDQTs7QUFDQWtLOztBQUNBQTtBQUNBbkosMkJBREE7QUFFQUQ7QUFGQTtBQUlJLGFBckNKLEVBcUNJLEdBckNKO0FBc0NBO0FBek1BO0FBNk1BekQ7QUFDQTtBQUNBdU8sMkJBRkE7QUFJQXZCO0FBQ0E7QUFDRyxXQU5IO0FBUUF3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUxBLENBTUE7OztBQUNBOztBQUVBO0FBQ0EsMENBREEsQ0FFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDRyxXQXZCSDtBQXlCQUM7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSx3RUFKQSxDQU1BO0FBQ0E7OztBQUNBO0FBQ0csV0FsQ0g7QUFvQ0E7QUFDQTtBQUNBQztBQUNBO0FBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDRyxXQTVDSDtBQThDQUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFDQTtBQUNHLFdBdERIO0FBd0RBQztBQUNBO0FBQ0E7QUFDRyxXQTNESDtBQTZEQUM7QUFDQTtBQUNBO0FBQ0E7QUFDRyxXQWpFSDtBQW1FQXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0csV0F2RUg7QUF5RUE7QUFDQXFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBNU87QUFDQSxlQUxBLENBTUE7OztBQUNBO0FBQ0FBO0FBQ0E7O0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBekZBO0FBNEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ErTztBQUNBO0FBQ0E5TTtBQUNBLGFBRkEsTUFFSztBQUNMQTtBQUNBLGFBRkssTUFFQTtBQUNMQTtBQUNBLGFBRkssTUFFQTtBQUNMQTtBQUNBLGFBRkssTUFFQTtBQUNMQTtBQUNBLGFBWEEsQ0FXSzs7O0FBQ0w7O0FBQ0EseUNBYkEsQ0FlQTs7O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0csV0E5Qkg7O0FBZ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQStNO0FBQ0EsMkJBREEsQ0FHQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQXpKOztBQUNBO0FBQ0FBO0FBQ0FBO0FBQ0E7QUFDQTtBQUNHLFdBckRIOztBQXVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTBKO0FBQ0E7O0FBRUE7QUFDQS9PLGlDQURBLENBR0E7O0FBQ0E7QUFDQTtBQUNBQTtBQUNBO0FBQ0E7QUFDQTtBQXpFQTtBQTRFQUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBa1A7QUFDQTtBQUVBbFA7QUFFQSwrQkFMQSxDQU9BO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBeEJBO0FBMkJBbVA7QUFDQUE7QUFFQUM7QUFBZ0RDO0FBQWhEO0FBRUMsT0Evb0ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BQzs7QUFBZ0VBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQzlEQTs7QUFDQUE7O0FBQ0VBOztBQUFBQTs7QUFDRUE7O0FBRUZBOztBQUNBQTs7QUFBQUE7O0FBQWlDQTs7OztBQUErQ0E7O0FBQ2xGQTs7QUFDQUE7O0FBQ0VBOztBQUFBQTs7QUFDRUE7O0FBRUZBOztBQUNBQTs7QUFBQUE7O0FBQWlDQTs7OztBQUE4Q0E7O0FBQ2pGQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQUFBOztBQUNFQTs7QUFFRkE7O0FBQ0FBOztBQUFBQTs7QUFBaUNBOzs7O0FBQTZDQTs7QUFDaEZBOztBQUNBQTs7QUFDRUE7O0FBQ0VBOztBQUNBQTs7QUFBV0E7Ozs7QUFBMEJBOztBQUN2Q0E7O0FBQ0FBOztBQUNFQTs7QUFDQUE7O0FBQVdBOzs7O0FBQTJCQTs7QUFDeENBOztBQUNBQTs7QUFDRUE7O0FBQ0FBOztBQUFXQTs7OztBQUErQkE7O0FBQzVDQTs7QUFDRkE7O0FBQ0ZBOzs7Ozs7QUF6Q2VBOztBQUFBQSw0RkFBaUIsWUFBakIsRUFBaUIsS0FBakIsRUFBaUIsZ0JBQWpCLEVBQWlCLElBQWpCOztBQUNjQTs7QUFBQUE7O0FBS1FBOztBQUFBQTs7QUFFUkE7O0FBQUFBOztBQUtRQTs7QUFBQUE7O0FBRTFCQTs7QUFBQUE7O0FBS3NCQTs7QUFBQUE7O0FBS0lBOztBQUFBQTs7QUFLcEJBOztBQUFBQTs7QUFJQUE7O0FBQUFBOztBQUdjQTs7QUFBQUE7O0FBQ2RBOztBQUFBQTs7OztVQ1FKQztBQU1YLHNDQUNVQyxrQkFEVixFQUVVQyxNQUZWLEVBRXdCO0FBQUE7O0FBRGQ7QUFDQTtBQU5WLHdCQUFTLEtBQVQ7QUFDQSw0QkFBYSxJQUFJQyx5Q0FBSixFQUFiO0FBQ0EsNkJBQWMsSUFBSUEseUNBQUosRUFBZDtBQUtJOzs7O2lCQUVKLG9CQUFRO0FBQUE7O0FBQ04saUJBQUtDLGVBQUwsR0FBdUIsNkNBQ3JCLEtBQUtDLDBCQUFMLEVBRHFCLEVBRXJCLEtBQUtDLFdBRmdCLEVBR3JCQyxJQUhxQixDQUdoQiw0RUFBVSxLQUFLTCxNQUFmLENBSGdCLENBQXZCO0FBSUEsaUJBQUtHLDBCQUFMLEdBQ0dFLElBREgsQ0FFSSwyREFBVSxLQUFLQyxVQUFmLENBRkosRUFHSSx3REFBTyxVQUFDQyxHQUFEO0FBQUEscUJBQVNBLEdBQVQ7QUFBQSxhQUFQLENBSEosRUFJSSx1REFBTSxJQUFOLENBSkosRUFLSSw0RUFBVSxLQUFLUCxNQUFmLENBTEosRUFPR1EsU0FQSCxDQU9hLFlBQUs7QUFDZCxtQkFBSSxDQUFDQyxNQUFMLEdBQWMsSUFBZDtBQUNELGFBVEg7QUFVRDs7O2lCQUVPLHNDQUEwQjtBQUNoQyxtQkFBTyxLQUFLVixrQkFBTCxDQUF3QlcsWUFBeEIsQ0FBcUNMLElBQXJDLENBQ0wsc0RBQUksVUFBQ00sRUFBRDtBQUFBLHFCQUFRQSxFQUFFLENBQUNDLGlCQUFYO0FBQUEsYUFBSixDQURLLEVBRUwsd0VBRkssQ0FBUDtBQUlEOzs7aUJBRUssZ0JBQUk7Ozs7Ozs7QUFDUiwyQkFBS1IsV0FBTCxDQUFpQlMsSUFBakIsQ0FBc0IsS0FBdEI7O0FBQ3dCLDZCQUFNLEtBQUtkLGtCQUFMLENBQXdCVyxZQUF4QixDQUMzQkwsSUFEMkIsQ0FDdEIsdURBQUssQ0FBTCxDQURzQixFQUUzQlMsU0FGMkIsRUFBTjs7O0FBQWxCQztBQUdOLDJCQUFLaEIsa0JBQUwsQ0FBd0JpQixnQkFBeEIsQ0FBd0NyQixnQ0FDbkNvQixlQURtQyxHQUNwQjtBQUNsQkgseUNBQWlCLEVBQUU7QUFERCx1QkFEb0IsQ0FBeEM7Ozs7Ozs7OztBQUlEOzs7aUJBRUQsdUJBQVc7QUFDVCxpQkFBS04sVUFBTCxDQUFnQk8sSUFBaEI7QUFDQSxpQkFBS1AsVUFBTCxDQUFnQlcsUUFBaEI7QUFDRDs7Ozs7Ozt5QkFqRFVuQixzQkFBbUJEO0FBQUE7OztjQUFuQkM7QUFBbUJvQjtBQUFBQztBQUFBQztBQUFBQztBQUFBQztBQUFBO0FEL0NoQ3pCOzs7Ozs7QUFBaUNBOzs7Ozs7O3FCQ3dCbkIsQ0FDViwrREFDRSx5QkFERixFQUVFMEIsMkdBQTRDLElBQTVDLEVBQWtELEdBQWxELEVBQXVEQSwwRUFBdkQsRUFBb0UsR0FBcEUsQ0FGRixDQURVLEVBS1YsK0RBQ0UsbUJBREYsRUFFRUEsMkdBQTRDLElBQTVDLEVBQWtELEdBQWxELEVBQXVEQSwrRUFBdkQsQ0FGRixDQUxVLEVBU1YsK0RBQ0Usb0JBREYsRUFFRUEsMkdBQTRDLElBQTVDLEVBQWtELEdBQWxELEVBQXVEQSwwRUFBdkQsRUFBb0UsR0FBcEUsQ0FGRixDQVRVLEVBYVYsK0RBQ0Usd0JBREYsRUFFRUEsMkdBQTRDLElBQTVDLEVBQWtELEdBQWxELEVBQXVEQSwrRUFBdkQsQ0FGRixDQWJVLEVBaUJWLCtEQUNFLDZCQURGLEVBRUVBLDJHQUE0QyxJQUE1QyxFQUFrRCxHQUFsRCxFQUF1REEsMEVBQXZELEVBQW9FLEdBQXBFLENBRkYsQ0FqQlU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZOQzs7QUFDRUE7O0FBRUFBOztBQUFXQTs7OztBQUE0REE7O0FBQ3pFQTs7Ozs7O0FBRklBOztBQUFBQTs7QUFDU0E7O0FBQUFBOzs7Ozs7Ozs7Ozs7QUFzQm5CQTs7QUFDRUE7O0FBQ0ZBOzs7Ozs7QUFGc0RBOztBQUNwQ0E7O0FBQUFBLHdGQUFvQixRQUFwQixFQUFvQkMsZ0JBQXBCOzs7Ozs7OztBQW5DcEJEOztBQUEwQkE7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDeEJBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFFQUE7O0FBQVdBOzs7Ozs7QUFBb0NBOztBQUNqREE7O0FBQ0FBOztBQUtGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFDRUE7O0FBQTBDQTs7QUFBU0E7O0FBQ3JEQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUVBQTs7QUFBV0E7O0FBQVFBOztBQUNyQkE7O0FBQ0FBOztBQUNFQTs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUdGQTs7Ozs7O0FBL0JZQTs7QUFBQUE7O0FBQ1NBOztBQUFBQTs7QUFFZ0JBOztBQUFBQTs7QUFTYUE7O0FBQUFBOztBQU90Q0E7O0FBQUFBOztBQUNTQTs7QUFBQUE7O0FBR0tBOztBQUFBQTs7QUFLRUE7O0FBQUFBOzs7O1VDZmZFO0FBb0JYO0FBRUEsc0NBQ1VDLGtCQURWLEVBRVVDLE1BRlYsRUFHVUMsZ0JBSFYsRUFJVUMsTUFKVixFQUtVQyxJQUxWLEVBTVVoQyxrQkFOVixFQU1nRDtBQUFBOztBQUx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwQlYsMkJBQXNCLEVBQXRCO0FBc0JFLGVBQUtpQyxPQUFMLEdBQWUsS0FBZjtBQUNBLGVBQUtDLFVBQUwsR0FBa0IsSUFBSUMseUNBQUosRUFBbEI7QUFDRDs7OztlQWhCRCxlQUFhO0FBQ1gsbUJBQU8sS0FBS0QsVUFBTCxDQUFnQkUsWUFBaEIsRUFBUDtBQUNEOzs7aUJBZ0JELG9CQUFRO0FBQUE7O0FBQ04saUJBQUtDLFlBQUwsR0FBb0IsS0FBS3JDLGtCQUFMLENBQXdCc0MsbUNBQXhCLENBQTREN0IsU0FBNUQsQ0FDbEIsZ0JBQXFCO0FBQUE7QUFBQSxrQkFBbkI4QixPQUFtQjtBQUFBLGtCQUFWQyxDQUFVO0FBQUEsa0JBQVBDLEVBQU87O0FBQ25CLG9CQUFJLENBQUNGLE9BQUwsR0FBZUEsT0FBZjs7QUFDQSxvQkFBSSxDQUFDRyxJQUFMO0FBQ0QsYUFKaUIsQ0FBcEI7QUFNRDs7O2lCQUVELHVCQUFXO0FBQ1QsZ0JBQUksS0FBS0wsWUFBVCxFQUF1QjtBQUNyQixtQkFBS0EsWUFBTCxDQUFrQk0sV0FBbEI7QUFDRDtBQUNGOzs7aUJBRUQsa0JBQVNDLElBQVQsRUFBb0M7QUFDbEMsZ0JBQU1DLG9CQUFvQixHQUFrQixDQUFDRCxJQUFJLENBQUNFLFNBQUwsSUFBa0IsRUFBbkIsRUFBdUIzUCxHQUF2QixDQUMxQyxVQUFDNFAsWUFBRDtBQUFBLHFCQUFrQkEsWUFBWSxDQUFDQyxnQkFBL0I7QUFBQSxhQUQwQyxDQUE1QztBQUdBLGdCQUFNQyxZQUFZLEdBQUdDLEtBQUssQ0FBQ0MsSUFBTixDQUFXLElBQUlDLEdBQUosQ0FBUVAsb0JBQVIsQ0FBWCxDQUFyQjtBQUNBLG1CQUFPSSxZQUFZLENBQUNJLElBQWIsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNEOzs7aUJBRUQsY0FBS1QsSUFBTCxFQUFrQjtBQUFBOztBQUNoQixpQkFBS1osSUFBTCxDQUFVc0IsR0FBVixDQUFjLFlBQUs7QUFDakIsb0JBQUksQ0FBQzNRLEVBQUwsR0FBVWlRLElBQUksQ0FBQ1csS0FBZjtBQUNBLG9CQUFJLENBQUNDLFNBQUwsR0FBaUJaLElBQUksQ0FBQ2EsU0FBdEI7QUFDQSxvQkFBSSxDQUFDQyxLQUFMLEdBQWEsTUFBSSxDQUFDQyxRQUFMLENBQWNmLElBQWQsQ0FBYjtBQUNBLG9CQUFJLENBQUNnQixJQUFMLEdBQVloQixJQUFJLENBQUNpQixRQUFMLENBQWNDLFFBQTFCO0FBQ0Esb0JBQUksQ0FBQ0MsZUFBTCxHQUF1QiwrRUFBYW5CLElBQUksQ0FBQ2lCLFFBQUwsQ0FBY0csbUJBQTNCLENBQXZCO0FBQ0Esb0JBQUksQ0FBQ0MsU0FBTCxHQUFpQnJCLElBQUksQ0FBQ3NCLFlBQXRCO0FBQ0Esb0JBQUksQ0FBQ0MsSUFBTCxHQUFZdkIsSUFBSSxDQUFDd0IsV0FBTCxHQUFtQnhCLElBQUksQ0FBQ3dCLFdBQUwsQ0FBaUJDLE1BQXBDLEdBQTZDQyxTQUF6RDs7QUFDQSxvQkFBSSxDQUFDQyxrQkFBTCxDQUF3QjNCLElBQXhCOztBQUNBLG9CQUFJLENBQUM0QixTQUFMLEdBQWlCLEVBQWpCOztBQUNBLGtCQUFJLE1BQUksQ0FBQ2pDLE9BQUwsSUFBZ0JLLElBQUksQ0FBQzZCLFdBQXJCLElBQW9DN0IsSUFBSSxDQUFDNkIsV0FBTCxDQUFpQkMsTUFBakIsR0FBMEIsQ0FBbEUsRUFBcUU7QUFDbkUsc0JBQUksQ0FBQ0YsU0FBTCxHQUFpQjVCLElBQUksQ0FBQzZCLFdBQUwsQ0FBaUJ0UixHQUFqQixDQUFxQixVQUFDd1IsVUFBRDtBQUFBLHlCQUNwQyxNQUFJLENBQUNDLFdBQUwsQ0FDRUQsVUFERixFQUVFLFFBRkYsQ0FEb0M7QUFBQSxpQkFBckIsQ0FBakI7QUFNRDs7QUFDRCxvQkFBSSxDQUFDMUMsT0FBTCxHQUFlLElBQWY7O0FBQ0Esb0JBQUksQ0FBQzRDLGFBQUw7QUFDRCxhQXBCRDtBQXFCRDs7O2lCQUVELGdCQUFJO0FBQUE7O0FBQ0YsaUJBQUs3QyxJQUFMLENBQVVzQixHQUFWLENBQWMsWUFBSztBQUNqQixvQkFBSSxDQUFDckIsT0FBTCxHQUFlLEtBQWY7O0FBQ0Esb0JBQUksQ0FBQzRDLGFBQUw7QUFDRCxhQUhEO0FBSUQ7OztpQkFFRCxxQkFDRUYsVUFERixFQUV3RTtBQUFBLGdCQUF0RUcsSUFBc0UsdUVBQVIsUUFBUTtBQUV0RSxtQkFBT0gsVUFBVSxDQUFDSSxVQUFYLENBQXNCRCxJQUF0QixDQUFQO0FBQ0Q7OztpQkFFRCwwQkFBYztBQUNaLGlCQUFLL0MsTUFBTCxDQUFZaUQsYUFBWiw0QkFBOEMsS0FBS3JTLEVBQW5EO0FBQ0Q7OztpQkFFTyx5QkFBYTtBQUNuQixpQkFBS3VQLFVBQUwsQ0FBZ0JwQixJQUFoQixDQUFxQixLQUFLbUIsT0FBMUI7QUFDRDs7O2lCQUVhLDRCQUFtQlcsSUFBbkIsRUFBZ0M7Ozs7Ozs7OztBQUM1QywyQkFBS3FDLGVBQUwsR0FBdUIsRUFBdkIsRUFBMkI7OztBQUNOLDZCQUFNLEtBQUtuRCxnQkFBTCxDQUN4Qm9ELEdBRHdCLENBQ3BCLENBQUMsMEJBQUQsRUFBNkIsbUJBQTdCLENBRG9CLEVBRXhCbkUsU0FGd0IsRUFBTjs7O0FBQWZvRTs7O0FBSW9CLDZCQUFNLEtBQUt2RCxrQkFBTCxDQUF3QndELGdCQUF4QixDQUMzQjlFLElBRDJCLENBQ3RCLHVEQUFLLENBQUwsQ0FEc0IsRUFFM0JTLFNBRjJCLEVBQU47OztBQUFsQnNFOztBQUdOLDBCQUFJQSxlQUFKLEVBQXFCO0FBQ2JDLGdDQURhLEdBQ0ZDLDRDQUNmM0MsSUFBSSxDQUFDd0IsV0FBTCxDQUFpQm9CLFFBREYsRUFFZjVDLElBQUksQ0FBQ3dCLFdBQUwsQ0FBaUJxQixTQUZGLEVBR2ZDLFVBSGUsQ0FJZkgsNENBQ0VGLGVBQWUsQ0FBQ00sTUFBaEIsQ0FBdUJDLFFBRHpCLEVBRUVQLGVBQWUsQ0FBQ00sTUFBaEIsQ0FBdUJFLFNBRnpCLENBSmUsQ0FERTtBQVVuQiw2QkFBSzdELElBQUwsQ0FBVXNCLEdBQVYsQ0FBYyxZQUFLO0FBQ2pCLGdDQUFJLENBQUMyQixlQUFMLEdBQ0UsVUFBR3JDLElBQUksQ0FBQ2tELGFBQVIsU0FBd0JYLFlBQVksQ0FDbEMsMEJBRGtDLENBQVosQ0FFdEJZLFdBRnNCLEVBQXhCLG1CQUdHLE1BQUksQ0FBQ2xFLE1BQUwsQ0FBWW1FLGVBQVosQ0FBNEJWLFFBQTVCLENBSEgsY0FHNENILFlBQVksQ0FDdEQsbUJBRHNELENBQVosQ0FFMUNZLFdBRjBDLEVBSDVDLENBREY7QUFPRCx5QkFSRDtBQVNELHVCQW5CRCxNQW1CTztBQUNMLDZCQUFLL0QsSUFBTCxDQUFVc0IsR0FBVixDQUFjLFlBQUs7QUFDakIsZ0NBQUksQ0FBQzJCLGVBQUwsYUFBMEJyQyxJQUFJLENBQUNrRCxhQUEvQixTQUErQ1gsWUFBWSxDQUN6RCwwQkFEeUQsQ0FBWixDQUU3Q1ksV0FGNkMsRUFBL0M7QUFHRCx5QkFKRDtBQUtEOzs7Ozs7OztBQUVELDJCQUFLL0QsSUFBTCxDQUFVc0IsR0FBVixDQUFjLFlBQUs7QUFDakIsOEJBQUksQ0FBQzJCLGVBQUwsYUFBMEJyQyxJQUFJLENBQUNrRCxhQUEvQixTQUErQ1gsWUFBWSxDQUN6RCwwQkFEeUQsQ0FBWixDQUU3Q1ksV0FGNkMsRUFBL0M7QUFHRCx1QkFKRDs7Ozs7Ozs7O0FBTUg7Ozs7Ozs7eUJBakpVcEUsc0JBQW1CRjtBQUFBOzs7Y0FBbkJFO0FBQW1CUjtBQUFBQztBQUFBQztBQUFBQztBQUFBQztBQUFBO0FEbkJoQ0U7Ozs7QUFBc0RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUVzQnpDd0U7QUFTWCx1REFDVUMsY0FEVixFQUVVcEUsZ0JBRlYsRUFHVTdCLE1BSFYsRUFJVWtHLE9BSlYsRUFLVUMsUUFMVixFQU1VQyxlQU5WLEVBTTBDO0FBQUE7O0FBTGhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNOOzs7O2lCQUVKLG9CQUFRLENBQUs7OztpQkFFYixxQkFBWUMsT0FBWixFQUFrQztBQUNoQyxnQkFBTUMsVUFBVSxHQUFvQkQsT0FBTyxDQUFDRSxHQUFSLENBQVlDLFlBQWhEOztBQUNBLGdCQUFJLENBQUMsS0FBS0MsUUFBTixJQUFrQixLQUFLQSxRQUFMLENBQWNDLE9BQWQsS0FBMEJKLFVBQVUsQ0FBQ0ksT0FBM0QsRUFBb0U7QUFDbEUsbUJBQUtELFFBQUwsR0FBZ0JILFVBQWhCO0FBQ0EsbUJBQUtLLGlCQUFMLENBQXVCTCxVQUF2QjtBQUNEO0FBQ0Y7OztpQkFFRCwyQkFBa0JDLEdBQWxCLEVBQXNDO0FBQUE7O0FBQ3BDLGlCQUFLSyw4QkFBTCxHQUFzQyxLQUFLWCxjQUFMLENBQ25DWSx3QkFEbUMsQ0FDVk4sR0FBRyxDQUFDRyxPQURNLEVBQ0dILEdBQUcsQ0FBQ3ZDLFNBRFAsRUFFbkN4RCxTQUZtQyxDQUV6QixVQUFDRCxHQUFELEVBQVE7QUFDakIsb0JBQUksQ0FBQ1AsTUFBTCxDQUFZcUQsR0FBWixDQUFnQixZQUFLO0FBQ25CLHNCQUFJLENBQUN5RCxXQUFMLEdBQW1CdkcsR0FBbkI7QUFDRCxlQUZEO0FBR0QsYUFObUMsQ0FBdEM7QUFPRDs7O2lCQUVELGlCQUFRd0csVUFBUixFQUEwQjtBQUFBOztBQUN4QixnQkFBTUMsV0FBVyxHQUFHLElBQUlELFVBQVUsR0FBRyxHQUFyQztBQUNBLGdCQUFNRSxLQUFLLHFCQUFjRCxXQUFkLGNBQTZCQSxXQUE3QixRQUFYO0FBQ0EsaUJBQUtkLE9BQUwsQ0FBYWdCLEtBQWIsQ0FBbUIsWUFBSztBQUN0QixvQkFBSSxDQUFDZixRQUFMLENBQWNnQixRQUFkLENBQTZCLE1BQUksQ0FBQ0MsT0FBTCxDQUFjQyxFQUEzQyxFQUErQyxXQUEvQyxFQUE0REosS0FBNUQ7QUFDRCxhQUZEO0FBR0Q7OztpQkFFRCx1QkFBVztBQUNULGdCQUFJLEtBQUtMLDhCQUFULEVBQXlDO0FBQ3ZDLG1CQUFLQSw4QkFBTCxDQUFvQ2xFLFdBQXBDO0FBQ0Q7QUFDRjs7O2lCQUVELGtCQUFNO0FBQUE7O0FBQ0osZ0JBQUksS0FBS29FLFdBQVQsRUFBc0I7QUFDcEIsbUJBQUtiLGNBQUwsQ0FDR3FCLG1CQURILENBQ3VCLEtBQUtmLEdBQUwsQ0FBU0csT0FEaEMsRUFDeUMsS0FBS0gsR0FBTCxDQUFTdkMsU0FEbEQsRUFFR3VELElBRkgsQ0FFUTtBQUFBLHVCQUFNLE1BQUksQ0FBQ0MsWUFBTCxDQUFrQixLQUFsQixDQUFOO0FBQUEsZUFGUjtBQUdELGFBSkQsTUFJTztBQUNMLG1CQUFLdkIsY0FBTCxDQUNHd0IsY0FESCxDQUNrQixLQUFLbEIsR0FBTCxDQUFTRyxPQUQzQixFQUNvQyxLQUFLSCxHQUFMLENBQVN2QyxTQUQ3QyxFQUVHdUQsSUFGSCxDQUVRO0FBQUEsdUJBQU0sTUFBSSxDQUFDQyxZQUFMLENBQWtCLElBQWxCLENBQU47QUFBQSxlQUZSO0FBR0Q7QUFDRjs7O2lCQUVELHNCQUFhRSxLQUFiLEVBQTJCO0FBQUE7O0FBQ3pCLGlCQUFLN0YsZ0JBQUwsQ0FDR29ELEdBREgsQ0FDTyxDQUNILGtDQURHLEVBRUgsc0NBRkcsRUFHSCxZQUhHLENBRFAsRUFNR3pFLFNBTkgsQ0FNYSxVQUFPbUgsV0FBUDtBQUFBLHFCQUF1QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNsQiwrQkFBTSxLQUFLdkIsZUFBTCxDQUFxQndCLE1BQXJCLENBQTRCO0FBQzlDQyxpQ0FBTyxZQUFLLEtBQUt0QixHQUFMLENBQVN1QixTQUFkLGNBQ0xKLEtBQUssR0FDREMsV0FBVyxDQUFDLGtDQUFELENBRFYsR0FFREEsV0FBVyxDQUFDLHNDQUFELENBSFYsQ0FEdUM7QUFNOUNJLDhCQUFJLEVBQUUsSUFOd0M7QUFPOUNDLGtDQUFRLEVBQUUsSUFQb0M7QUFROUNDLGlDQUFPLEVBQUUsQ0FDUDtBQUNFQyxnQ0FBSSxFQUFFUCxXQUFXLENBQUMsWUFBRCxDQURuQjtBQUVFUSxnQ0FBSSxFQUFFLFFBRlI7QUFHRUMsbUNBQU8sRUFBRSxtQkFBSztBQUNaLGtDQUFJVixLQUFKLEVBQVc7QUFDVCx1Q0FBSSxDQUFDekIsY0FBTCxDQUFvQnFCLG1CQUFwQixDQUNFLE9BQUksQ0FBQ2YsR0FBTCxDQUFTRyxPQURYLEVBRUUsT0FBSSxDQUFDSCxHQUFMLENBQVN2QyxTQUZYO0FBSUQsK0JBTEQsTUFLTztBQUNMLHVDQUFJLENBQUNpQyxjQUFMLENBQW9Cd0IsY0FBcEIsQ0FDRSxPQUFJLENBQUNsQixHQUFMLENBQVNHLE9BRFgsRUFFRSxPQUFJLENBQUNILEdBQUwsQ0FBU3ZDLFNBRlg7QUFJRDtBQUNGO0FBZkgsMkJBRE87QUFScUMseUJBQTVCLENBQU47O0FBRGtCO0FBQzFCcUUsNkJBRDBCO0FBNkJoQ0EsNkJBQUssQ0FBQ0MsT0FBTjs7QUE3QmdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF2QjtBQUFBLGFBTmI7QUFxQ0Q7Ozs7Ozs7eUJBdEdVdEMsdUNBQW9DdUM7QUFBQTs7O2NBQXBDdkM7QUFBb0M5RTtBQUFBc0g7QUFBQTtzRUFHcENDLHFEQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QnBCRjs7OztBQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNNSkc7Ozs7OztBQURGQTs7QUFDRUE7O0FBQ0ZBOzs7Ozs7OztBQURRQTs7QUFBQUE7Ozs7Ozs7Ozs7OztBQU5aQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFBK0JBOzs7O0FBQXVCQTs7QUFDeERBOztBQUNBQTs7QUFHRkE7O0FBQ0ZBOzs7Ozs7QUFUMkRBOztBQUd0QkE7O0FBQUFBOztBQUU0QkE7O0FBQUFBOzs7Ozs7QUFnQjNEQTs7Ozs7O0FBREZBOztBQUNFQTs7QUFDRkE7Ozs7Ozs7O0FBRFFBOztBQUFBQTs7Ozs7O0FBWFpBOztBQUNFQTs7QUFDRUE7O0FBQStCQTs7OztBQUF1QkE7O0FBQ3hEQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFHRkE7O0FBQ0ZBOzs7Ozs7QUFabUNBOztBQUFBQTs7QUFJN0JBOztBQUFBQTs7QUFJc0VBOztBQUFBQTs7Ozs7O0FBTTFFQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7OztBQUNGQTs7QUFDQUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7Ozs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7Ozs7O0FBVE1BOztBQUFBQTs7QUFHQUE7O0FBQUFBOztBQUdBQTs7QUFBQUE7Ozs7VUMxQktDO0FBU1gsNkNBQW9CQyxRQUFwQixFQUFzQztBQUFBOztBQUFsQjtBQUFzQjs7OztlQUoxQyxlQUFPO0FBQ0wsbUJBQU8sS0FBS0EsUUFBTCxDQUFjQyxFQUFkLENBQWlCLEtBQWpCLENBQVA7QUFDRDs7O2lCQUlELG9CQUFRLENBQUs7OztpQkFFYixvQkFBV0MsU0FBWCxFQUE0QjtBQUMxQix3Q0FBcUJDLGdEQUFTQyxHQUFULENBQWFGLFNBQWIsRUFBd0IsTUFBeEIsRUFBZ0NHLEdBQWhDLEVBQXJCO0FBQ0Q7Ozs7Ozs7eUJBZlVOLDZCQUEwQkQ7QUFBQTs7O2NBQTFCQztBQUEwQnpIO0FBQUFnSTtBQUFBekY7QUFBQTBGO0FBQUFDO0FBQUE7QUFBQWpJO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QURUdkNvSDs7QUFVQUE7O0FBZUFBOzs7O0FBekJxRkE7O0FBVXpCQTs7QUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRUloRFc7Ozs7Ozs7O0FBSEZBOztBQUNpREE7QUFBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDL0NBOztBQUNBQTs7QUFDRkE7Ozs7OztBQUhFQTs7QUFDQUE7O0FBQUFBOztBQUNXQTs7QUFBQUE7Ozs7OztBQUpmQTs7QUFDRUE7O0FBS0ZBOzs7Ozs7Ozs7O0FBTGNBOztBQUFBQSx1SEFBc0MsVUFBdEMsRUFBc0NDLEdBQXRDOzs7Ozs7Ozs7Ozs7Ozs7O0FBVnBCRDs7QUFDRUE7O0FBQTBDQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUN4Q0E7O0FBQ0ZBOztBQUNBQTs7QUFBV0E7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDVEE7O0FBQUlBOztBQUE4QkE7O0FBQ3BDQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTs7QUFPRkE7O0FBQ0ZBOztBQUNGQTs7Ozs7O0FBbEJzRkE7O0FBRXBFQTs7QUFBQUE7O0FBR1ZBOztBQUFBQTs7QUFJdUJBOztBQUFBQTs7Ozs7O0FBaUJ6QkE7O0FBQXFDQTs7Ozs7Ozs7QUFDR0E7Ozs7OztBQURIQTs7QUFBQUE7Ozs7OztBQUVyQ0E7O0FBQW9DQTs7Ozs7O0FBQWdFQTs7Ozs7O0FBQWhFQTs7QUFBQUE7Ozs7Ozs7O0FBVDFDQTs7QUFDRUE7O0FBQTBDQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUN4Q0E7O0FBQ0ZBOztBQUNBQTs7QUFBV0E7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDVEE7O0FBQUlBOztBQUE4QkE7O0FBQ2xDQTs7QUFDRUE7O0FBRUFBOztBQUNGQTs7QUFDRkE7O0FBQ0ZBOzs7Ozs7QUFac0ZBOztBQUVwRUE7O0FBQUFBOztBQUdWQTs7QUFBQUE7O0FBRUtBOztBQUFBQTs7QUFFQUE7O0FBQUFBOzs7Ozs7QUFZYkE7O0FBQWtDQTs7QUFBQ0E7Ozs7VUNwQnhCRTs7Ozs7QUFTWCwyQ0FDVUMsbUJBRFYsRUFFVXpKLGtCQUZWLEVBR1VtRyxPQUhWLEVBSVV1RCxlQUpWLEVBS1V0RCxRQUxWLEVBSzZCO0FBQUE7O0FBQUE7O0FBRTNCO0FBTlE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVpWLDhCQUFZdUQsa0VBQVo7QUFLUSxnQ0FBYyxJQUFJQywwQ0FBSixFQUFkO0FBT3FCO0FBRzVCOzs7O2lCQUVELG9CQUFRO0FBQUE7O0FBQ04saUJBQUtDLFdBQUwsQ0FDR3ZKLElBREgsQ0FFSSw0REFBVSxLQUFLQyxVQUFmLENBRkosRUFHSSw0REFBVTtBQUFBLHFCQUFNLE9BQUksQ0FBQ3VKLGFBQUwsRUFBTjtBQUFBLGFBQVYsQ0FISixFQUtHckosU0FMSCxDQUthLFVBQUN1RyxVQUFELEVBQWU7QUFDeEIsa0JBQU0vVyxPQUFPLEdBQUcrVyxVQUFVLEdBQUcsQ0FBYixHQUFpQixDQUFqQixHQUFxQkEsVUFBVSxHQUFHLENBQWIsR0FBaUJBLFVBQWpCLEdBQThCLENBQW5FO0FBQ0Esa0JBQU1oWCxLQUFLLDhCQUF1QkMsT0FBdkIsTUFBWDs7QUFDQSxxQkFBSSxDQUFDOFosZUFBTCxDQUFxQkMsT0FBckIsQ0FBNkIvWixPQUE3Qjs7QUFDQSxxQkFBSSxDQUFDa1csT0FBTCxDQUFhZ0IsS0FBYixDQUFtQixZQUFLO0FBQ3RCLHVCQUFJLENBQUNmLFFBQUwsQ0FBY2dCLFFBQWQsQ0FDUSxPQUFJLENBQUM2QyxTQUFMLENBQWdCM0MsRUFEeEIsRUFFRSxrQkFGRixFQUdFdFgsS0FIRjtBQUtELGVBTkQ7QUFPRCxhQWhCSDtBQWlCQSxpQkFBS3VRLFVBQUwsQ0FBZ0JFLFNBQWhCLENBQTBCLFlBQUs7QUFDN0IscUJBQUksQ0FBQ3lKLEtBQUw7QUFDRCxhQUZEO0FBR0Q7OztpQkFFRCxpQkFBSztBQUNILGdCQUFJLEtBQUtELFNBQVQsRUFBb0I7QUFDbEIsbUJBQUtBLFNBQUwsQ0FBZUMsS0FBZjtBQUNEO0FBQ0Y7OztpQkFFRCxrQkFBTTtBQUNKLGlCQUFLTCxXQUFMLENBQWlCL0ksSUFBakI7QUFDRDs7O2lCQUVPLHlCQUFhO0FBQ25CLG1CQUFPLDZDQUFLLEtBQUttSixTQUFMLENBQWVILGFBQWYsRUFBTCxFQUFxQ3hKLElBQXJDLENBQ0wsNkRBQVc7QUFBQSxxQkFBTSwyQ0FBRyxDQUFILENBQU47QUFBQSxhQUFYLENBREssRUFFTCxzREFBSSxVQUFDRSxHQUFEO0FBQUEscUJBQVVBLEdBQUcsR0FBRyxDQUFOLEdBQVVBLEdBQUcsR0FBRyxLQUFoQixHQUF3QixDQUFsQztBQUFBLGFBQUosQ0FGSyxDQUFQO0FBSUQ7OztpQkFFRCwyQkFBZTtBQUFBOztBQUNiLGlCQUFLdUosZUFBTCxDQUFxQkksTUFBckI7QUFDQSwwREFBTSxJQUFOLEVBQ0c3SixJQURILENBQ1EsNERBQVUsS0FBS0MsVUFBZixDQURSLEVBRUdFLFNBRkgsQ0FFYSxZQUFLO0FBQ2Qsa0JBQUksT0FBSSxDQUFDd0osU0FBVCxFQUFvQjtBQUNsQix1QkFBSSxDQUFDQSxTQUFMLENBQWVDLEtBQWY7QUFDRDtBQUNGLGFBTkg7QUFPRDs7O2lCQUVELHNCQUFVO0FBQ1IsaUJBQUtFLGVBQUw7QUFDRDs7O2lCQUVLLGdCQUFPL00sS0FBUCxFQUFvQztBQUFBLGdCQUFSNkwsR0FBUSx1RUFBRixFQUFFOzs7Ozs7OzJCQUNwQzdMLEtBQUssQ0FBQ2dOOzs7Ozt3REFDRGhOLEtBQUssQ0FBQ2dOOzs7O0FBRU8sNkJBQU0sS0FBS3JLLGtCQUFMLENBQXdCc0ssU0FBeEIsQ0FDdkJoSyxJQUR1QixDQUNsQix1REFBSyxDQUFMLENBRGtCLEVBRXZCUyxTQUZ1QixFQUFOOzs7QUFBZHdKO0FBR0FDLHNDQUFnQixLQUFLQyw4QkFBTCxDQUFvQ0YsV0FBcEM7QUFDaEJGLDRCQUNKSyxpRUFBMEJmLG1FQUFVdE0sS0FBSyxDQUFDbUosR0FBTixDQUFVdkMsU0FBcEIsQ0FBMUIsRUFBMEQwRyxNQUExRCxDQUNFaEIsaUVBQVFhLGFBQVIsQ0FERjs7MkJBR0VIOzs7Ozt3REFDS08sU0FBUyxDQUNkUCxHQUFHLENBQ0FRLE9BREgsQ0FDVyxjQURYLEVBQzJCeE4sS0FBSyxDQUFDbUosR0FBTixDQUFVdUIsU0FEckMsRUFFRzhDLE9BRkgsQ0FFVyxZQUZYLEVBRXlCeE4sS0FBSyxDQUFDbUosR0FBTixDQUFVRyxPQUZuQyxFQUdHa0UsT0FISCxDQUdXLE9BSFgsRUFHb0IzQixHQUhwQixDQURjOzs7d0RBT1Q7Ozs7Ozs7OztBQUdaOzs7aUJBRUQsd0NBQStCNEIsSUFBL0IsRUFBNEM7QUFDMUMsZ0JBQUlBLElBQUksS0FBS25CLG1FQUFULElBQXVCbUIsSUFBSSxLQUFLbkIsbUVBQXBDLEVBQWdEO0FBQzlDLHFCQUFPQSxtRUFBUDtBQUNEOztBQUNELG1CQUFPQSxtRUFBUDtBQUNEOzs7aUJBRUssdUJBQWNvQixLQUFkLEVBQTRCMU4sS0FBNUIsRUFBK0M7Ozs7Ozs7QUFDbkQwTiwyQkFBSyxDQUFDQyxjQUFOOztBQUNZLDZCQUFNLEtBQUtDLE1BQUwsQ0FBWTVOLEtBQVosQ0FBTjs7O0FBQU5nTjs7QUFDTiwwQkFBSUEsR0FBSixFQUFTO0FBQ1AsNkJBQUtYLGVBQUwsQ0FBcUJ3QixVQUFyQixDQUNFQyx1R0FERixFQUVFQyxnR0FGRixFQUdFL04sS0FBSyxDQUFDZ08sY0FBTixFQUhGO0FBS0EsNkJBQUs1QixtQkFBTCxDQUF5QjZCLGdCQUF6QixDQUEwQ2pCLEdBQTFDO0FBQ0Q7Ozs7Ozs7OztBQUNGOzs7aUJBRUssNEJBQW1CVSxLQUFuQixFQUFpQzFOLEtBQWpDLEVBQXNENkwsR0FBdEQsRUFBaUU7Ozs7Ozs7QUFDckU2QiwyQkFBSyxDQUFDQyxjQUFOO0FBQ01PLG1DQUFhQyxnREFDaEJDLE9BRGdCLENBQ1IsS0FEUSxFQUVoQnhDLEdBRmdCLENBRVpDLEdBRlksRUFFUCxNQUZPLEVBR2hCd0MsTUFIZ0IsQ0FHVGhCLDJFQUhTOztBQUlQLDZCQUFNLEtBQUtPLE1BQUwsQ0FBWTVOLEtBQVosRUFBbUJrTyxVQUFuQixDQUFOOzs7QUFBTmxCOztBQUNOLDBCQUFJQSxHQUFKLEVBQVM7QUFDUCw2QkFBS1gsZUFBTCxDQUFxQndCLFVBQXJCLENBQ0VDLHVHQURGLEVBRUVDLGdHQUZGLEVBR0UvTixLQUFLLENBQUNnTyxjQUFOLEVBSEY7QUFLQSw2QkFBSzVCLG1CQUFMLENBQXlCNkIsZ0JBQXpCLENBQTBDakIsR0FBMUM7QUFDRDs7Ozs7Ozs7O0FBQ0Y7Ozs7UUF0STJDc0I7Ozt5QkFBakNuQywyQkFBd0JGO0FBQUE7OztjQUF4QkU7QUFBd0JySTtBQUFBc0g7QUFBQTt1RUFJeEJtRCw2REFBYzs7dUVBQ2RDLDRJQUFvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRDFCakR2Qzs7QUFBa0JBO0FBQUEscUJBQVd3QyxZQUFYO0FBQW1CLGFBQW5COztBQUNoQnhDOztBQW1CQUE7O0FBYUFBOztBQUE2QkE7QUFBQSxxQkFBWXdDLGdCQUFaO0FBQXdCLGFBQXhCOztBQUMzQnhDOztBQUFtQ0E7QUFBQSxxQkFBU3dDLHFCQUFUO0FBQTBCLGFBQTFCOztBQUNqQ3hDOztBQUVGQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7OztBQXZDYUE7O0FBQUFBOztBQW1CQUE7O0FBQUFBOztBQWU2QkE7O0FBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VFaEM3QnlDOzs7OztBQWdCWCxnQ0FBWW5KLElBQVosRUFBMkI5UixNQUEzQixFQUE2QzlCLE9BQTdDLEVBQXFFO0FBQUE7O0FBQUE7O0FBQ25FLHVDQUFNOEIsTUFBTixFQUFjOUIsT0FBZDtBQUNBLGtCQUFLZ2QsS0FBTCxHQUFhcEosSUFBYjs7QUFDQSxrQkFBS3FKLFVBQUw7O0FBSG1FO0FBSXBFOzs7O2VBaEJELGVBQVE7QUFDTixxQ0FBWSxLQUFLRCxLQUFqQjtBQUNEOzs7ZUFFRCxlQUFNO0FBQ0osbUJBQU8sS0FBS0EsS0FBTCxDQUFXekksS0FBbEI7QUFDRDs7O2VBRUQsZUFBYztBQUNaLG1CQUFPLEtBQUsySSxXQUFaO0FBQ0Q7OztpQkFRRCx1QkFBVztBQUNULGlCQUFLQSxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsaUJBQUtELFVBQUw7QUFDRDs7O2lCQUVELG9CQUFRO0FBQ04saUJBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxpQkFBS0QsVUFBTDtBQUNEOzs7aUJBRU8sc0JBQVU7QUFDaEIsaUJBQUtFLE9BQUwsQ0FDRSxJQUFJQyxvR0FBSixDQUEwQixLQUFLSixLQUFMLENBQVc5SCxZQUFyQyxFQUFtRCxLQUFLZ0ksV0FBeEQsQ0FERjtBQUdEOzs7O1FBcENnQzNHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDT2I4RztBQUlwQiw2QkFBb0J0SyxNQUFwQixFQUE0Q3VLLEtBQTVDLEVBQWlFO0FBQUE7O0FBQUE7O0FBQTdDO0FBQXdCO0FBSHJDLCtCQUErQixJQUFJQyx5Q0FBSixFQUEvQjtBQUNDLDBCQUFXLEtBQVg7QUFHTnhLLGdCQUFNLENBQUN5SyxNQUFQLENBQ0dsTSxJQURILENBRUksMkRBQVUsS0FBS21NLGFBQWYsQ0FGSixFQUdJLHdEQUFPLFVBQUMxQixLQUFEO0FBQUEsbUJBQVdBLEtBQUssWUFBWTJCLDBEQUE1QjtBQUFBLFdBQVAsQ0FISixFQUlJLDJEQUFVO0FBQUEsbUJBQU0sNENBQUtDLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixPQUFJLENBQUNDLGtCQUFMLEVBQWhCLENBQUwsQ0FBTjtBQUFBLFdBQVYsQ0FKSixFQU1HcE0sU0FOSDtBQU9EOzs7O2lCQUVPLDJCQUNOcU0sSUFETSxFQUVOQyxTQUZNLEVBRVE7QUFBQTs7QUFFZCxnQkFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQUYsZ0JBQUksQ0FBQ0csT0FBTCxDQUFhLFVBQUNDLEVBQUQsRUFBK0I7QUFDMUMsa0JBQUlBLEVBQUUsQ0FBQ0gsU0FBSCxLQUFpQkEsU0FBckIsRUFBZ0M7QUFDOUJDLHdCQUFRLEdBQUcsSUFBWDtBQUNELGVBRkQsTUFFTztBQUNMQSx3QkFBUSxHQUFHLE9BQUksQ0FBQ0csaUJBQUwsQ0FBdUJELEVBQUUsQ0FBQ0UsUUFBMUIsRUFBb0NMLFNBQXBDLENBQVg7QUFDRDtBQUNGLGFBTkQ7QUFPQSxtQkFBT0MsUUFBUDtBQUNEOzs7aUJBRWEsOEJBQWtCOzs7Ozs7O0FBQ3hCSyxvQ0FBYyxLQUFLRixpQkFBTCxDQUNsQixLQUFLcEwsTUFBTCxDQUFZdUwsV0FBWixDQUF3QkMsUUFBeEIsQ0FBaUNDLElBQWpDLENBQXNDQyxZQURwQixFQUVsQixLQUFLbkIsS0FBTCxDQUFXaUIsUUFBWCxDQUFvQlIsU0FGRjs7NEJBSWhCLENBQUMsS0FBS0MsUUFBTixJQUFrQks7Ozs7O0FBQ3BCLDJCQUFLTCxRQUFMLEdBQWdCLElBQWhCOztBQUNBLDZCQUFNLEtBQUtVLE9BQUwsRUFBTjs7Ozs7Ozs0QkFDUyxLQUFLVixRQUFMLElBQWlCLENBQUNLOzs7OztBQUMzQiwyQkFBS0wsUUFBTCxHQUFnQixLQUFoQjs7QUFDQSw2QkFBTSxLQUFLVyxPQUFMLEVBQU47Ozs7Ozs7OztBQUVIOzs7aUJBS00sdUJBQVc7QUFDaEIsaUJBQUtsQixhQUFMLENBQW1CM0wsSUFBbkI7QUFDQSxpQkFBSzJMLGFBQUwsQ0FBbUJ2TCxRQUFuQjtBQUNEOzs7Ozs7O3lCQWpEbUJtTCxhQUFVdUI7QUFBQTs7O2VBQVZ2QjtBQUFVdGQsaUJBQVZzZCxXQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSmhDLFVBQU13QixzQkFBc0IsR0FBRyxpQ0FBL0I7QUFDQSxVQUFNQywyQkFBMkIsR0FBRyxzQ0FBcEM7QUFDQSxVQUFNQyxrQ0FBa0MsR0FDdEMsNENBREY7QUFFQSxVQUFNQyxjQUFjLEdBQUcseUNBQXZCO0FBQ0EsVUFBTUMsRUFBRSxHQUFHLFlBQVg7QUFDQSxVQUFNQyxTQUFTLEdBQUcsaUJBQWxCOztVQUthQztBQUNYLCtDQUNVbk8sa0JBRFYsRUFFVW9PLGVBRlYsRUFHVXZGLFFBSFYsRUFJVS9HLGdCQUpWLEVBSTRDO0FBQUE7O0FBSGxDO0FBQ0E7QUFDQTtBQUNBO0FBQ047Ozs7aUJBRUUsc0NBQTBCOzs7Ozs7OztBQUNULDZCQUFNLEtBQUs5QixrQkFBTCxDQUF3QlcsWUFBeEIsQ0FDeEJMLElBRHdCLENBQ25CLHNEQUFLLENBQUwsQ0FEbUIsRUFFeEJTLFNBRndCLEVBQU47OztBQUFmc047OzBCQUdEQSxZQUFZLENBQUNDOzs7Ozs7QUFDaEIsNkJBQU0sS0FBS0Msb0NBQUwsRUFBTjs7Ozs7Ozs7O0FBRUg7OztpQkFFSyxnREFBb0M7Ozs7Ozs7O3lEQUNqQyxJQUFJNUIsT0FBSixDQUFrQixVQUFPQyxPQUFQO0FBQUEsK0JBQW1CO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3JCLHlDQUFNLEtBQUs5SyxnQkFBTCxDQUN4Qm9ELEdBRHdCLENBQ3BCLENBQ0gySSxzQkFERyxFQUVIQywyQkFGRyxFQUdIQyxrQ0FIRyxFQUlIQyxjQUpHLEVBS0hDLEVBTEcsRUFNSEMsU0FORyxDQURvQixFQVN4Qm5OLFNBVHdCLEVBQU47O0FBRHFCO0FBQ3BDb0UsOENBRG9DO0FBV3BDcUosMENBWG9DLEdBV3pCLEtBQUszRixRQUFMLENBQWNDLEVBQWQsQ0FBaUIsS0FBakIsSUFDYixDQUFDLGVBQUQsRUFBa0IsWUFBbEIsQ0FEYSxHQUViLEVBYnNDO0FBY3BDMkYsMENBZG9DLEdBY3pCO0FBQ2ZELDRDQUFRLEVBQVJBLFFBRGU7QUFFZnJHLHdDQUFJLEVBQUVoRCxZQUFZLENBQUM4SSxFQUFELENBRkg7QUFHZjVGLDJDQUFPLEVBQUU7QUFBQSw2Q0FBTSxPQUFJLENBQUNxRyxZQUFMLENBQWtCLElBQWxCLEVBQXdCbEgsSUFBeEIsQ0FBNkI7QUFBQSwrQ0FBTW9GLE9BQU8sRUFBYjtBQUFBLHVDQUE3QixDQUFOO0FBQUE7QUFITSxtQ0FkeUI7QUFtQnBDK0IsMENBbkJvQyxHQW1CekI7QUFDZkgsNENBQVEsRUFBUkEsUUFEZTtBQUVmckcsd0NBQUksRUFBRWhELFlBQVksQ0FBQytJLFNBQUQsQ0FGSDtBQUdmN0YsMkNBQU8sRUFBRTtBQUFBLDZDQUFNLE9BQUksQ0FBQ3FHLFlBQUwsQ0FBa0IsS0FBbEIsRUFBeUJsSCxJQUF6QixDQUE4QjtBQUFBLCtDQUFNb0YsT0FBTyxFQUFiO0FBQUEsdUNBQTlCLENBQU47QUFBQTtBQUhNLG1DQW5CeUI7QUF3QnBDMUUseUNBeEJvQyxHQXdCMUIsS0FBS1csUUFBTCxDQUFjQyxFQUFkLENBQWlCLEtBQWpCLElBQ1osQ0FBQzJGLFFBQUQsRUFBV0UsUUFBWCxDQURZLEdBRVosQ0FBQ0EsUUFBRCxFQUFXRixRQUFYLENBMUJzQztBQUFBO0FBMkI1Qix5Q0FBTSxLQUFLTCxlQUFMLENBQXFCdkcsTUFBckIsQ0FBNEI7QUFDOUMrRywwQ0FBTSxFQUFFekosWUFBWSxDQUFDMEksc0JBQUQsQ0FEMEI7QUFFOUMvRiwyQ0FBTyxZQUFLM0MsWUFBWSxDQUFDMkksMkJBQUQsQ0FBakIseUJBQTZEM0ksWUFBWSxDQUFDNEksa0NBQUQsQ0FBekUseUJBQTRINUksWUFBWSxDQUFDNkksY0FBRCxDQUF4SSxDQUZ1QztBQUc5QzlGLDJDQUFPLEVBQVBBLE9BSDhDO0FBSTlDMkcsbURBQWUsRUFBRSxLQUo2QixDQUl2Qjs7QUFKdUIsbUNBQTVCLENBQU47O0FBM0I0QjtBQTJCcENDLHVDQTNCb0M7QUFBQTtBQWlDMUMseUNBQU1BLEtBQUssQ0FBQ3ZHLE9BQU4sRUFBTjs7QUFqQzBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUFuQjtBQUFBLHVCQUFsQjs7Ozs7Ozs7O0FBbUNSOzs7aUJBRUssc0JBQWF3RyxRQUFiLEVBQThCOzs7Ozs7OztBQUNWLDZCQUFNLEtBQUsvTyxrQkFBTCxDQUF3QlcsWUFBeEIsQ0FDM0JMLElBRDJCLENBQ3RCLHNEQUFLLENBQUwsQ0FEc0IsRUFFM0JTLFNBRjJCLEVBQU47OztBQUFsQkM7QUFHTiwyQkFBS2hCLGtCQUFMLENBQXdCaUIsZ0JBQXhCLENBQXdDckIsZ0NBQ25Db0IsZUFEbUMsR0FDcEI7QUFDbEJnTyxrREFBMEIsRUFBRUQsUUFEVjtBQUVsQlQsaUVBQXlDLEVBQUU7QUFGekIsdUJBRG9CLENBQXhDOzs7Ozs7Ozs7QUFLRDs7Ozs7Ozt5QkFoRVVILCtCQUE0QmM7QUFBQTs7O2VBQTVCZDtBQUE0QnBmLGlCQUE1Qm9mLDZCQUE0QjtBQUFBZSxvQkFGM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JWdkc7O0FBQ0VBOztBQUNFQTs7QUFBV0E7Ozs7OztBQUFrRkE7O0FBQy9GQTs7QUFDRkE7Ozs7OztBQUZlQTs7QUFBQUE7Ozs7OztBQUhqQkE7O0FBQ0VBOztBQUtGQTs7Ozs7O0FBTDRCQTs7QUFBQUE7Ozs7OztBQU01QkE7Ozs7Ozs7Ozs7O1VDVVd3RztBQVVYLG9DQUNVQyxlQURWLEVBRVVuUCxNQUZWLEVBRXdCO0FBQUE7O0FBRGQ7QUFDQTtBQVhWLDBCQUF3QixFQUF4QjtBQVlJOzs7O2VBVkosZUFBYTtBQUNYLG1CQUFPLEtBQUtvUCxRQUFMLENBQWMzSyxNQUFkLEdBQXVCLENBQTlCO0FBQ0Q7OztpQkFTRCxvQkFBUSxDQUFLOzs7aUJBRWIscUJBQVk0QixPQUFaLEVBQWtDO0FBQUE7O0FBQ2hDLGdCQUFNZ0osR0FBRyxHQUFHaEosT0FBTyxDQUFDZ0osR0FBUixDQUFZN0ksWUFBeEI7O0FBQ0EsZ0JBQUk2SSxHQUFHLElBQUlBLEdBQUcsQ0FBQzVLLE1BQUosR0FBYSxDQUF4QixFQUEyQjtBQUN6QixtQkFBS3JDLFlBQUwsR0FBb0IscURBQ2xCaU4sR0FBRyxDQUFDbmMsR0FBSixDQUFRLFVBQUNSLEVBQUQ7QUFBQSx1QkFBUSxPQUFJLENBQUN5YyxlQUFMLENBQXFCRyxvQkFBckIsQ0FBMEM1YyxFQUExQyxDQUFSO0FBQUEsZUFBUixDQURrQixFQUdqQjJOLElBSGlCLENBR1oscURBQUksVUFBQ0UsR0FBRDtBQUFBLHVCQUFTQSxHQUFHLENBQUNnUCxNQUFKLENBQVcsVUFBQzVNLElBQUQ7QUFBQSx5QkFBVUEsSUFBSSxDQUFDNk0sU0FBZjtBQUFBLGlCQUFYLENBQVQ7QUFBQSxlQUFKLENBSFksRUFJakJoUCxTQUppQixDQUlQLFVBQUNELEdBQUQsRUFBUTtBQUNqQix1QkFBSSxDQUFDUCxNQUFMLENBQVlxRCxHQUFaLENBQWdCLFlBQUs7QUFDbkIseUJBQUksQ0FBQytMLFFBQUwsR0FBZ0I3TyxHQUFoQjtBQUNELGlCQUZEO0FBR0QsZUFSaUIsQ0FBcEI7QUFTRDtBQUNGOzs7aUJBRUQsdUJBQVc7QUFDVCxnQkFBSSxLQUFLNkIsWUFBVCxFQUF1QjtBQUNyQixtQkFBS0EsWUFBTCxDQUFrQk0sV0FBbEI7QUFDRDtBQUNGOzs7Ozs7O3lCQW5DVXdNLG9CQUFpQnhHO0FBQUE7OztjQUFqQndHO0FBQWlCaE87QUFBQWdJO0FBQUFtRztBQUFBSTtBQUFBO0FBQUFDO0FBQUF2TztBQUFBQztBQUFBQztBQUFBQztBQUFBO0FEbEI5Qm9IOztBQUNFQTs7QUFPQUE7O0FBQ0ZBOzs7O0FBVGdDQTs7QUFDbkJBOztBQUFBQTs7QUFPR0E7O0FBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUVHSGlIOzs7Ozt5QkFBQUE7QUFBYzs7O2NBQWRBOzs7a0JBSkYsQ0FBQ0MseURBQUQsRUFBZUMsdURBQWYsRUFBNEJDLGdFQUE1Qjs7Ozs0SEFJRUgsaUJBQWM7QUFBQUkseUJBSFZDLHdGQUdVO0FBSE9DLG9CQUR0QkwseURBQ3NCLEVBRFJDLHVEQUNRLEVBREtDLGdFQUNMLENBR1A7QUFKMkJwUSxvQkFFMUNzUSx3RkFGMEM7QUFJM0I7QUFGRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNOaEJFOzs7Ozs7O2lCQUNYLGtDQUFnQ25oQixPQUFoQyxFQUFxRTtBQUNuRSxnQkFBTW9oQixjQUFjLEdBQUc7QUFDckJoaEIsK0JBQWlCLEVBQUUsSUFERTtBQUVyQkMsaUNBQW1CLEVBQUUsS0FGQTtBQUdyQkMsaUNBQW1CLEVBQUUsSUFIQTtBQUlyQkwsOEJBQWdCLEVBQUVvaEIsb0VBSkc7QUFLckJuaEIsZ0NBQWtCLEVBQUVpaEIscUJBQW9CLENBQUNHO0FBTHBCLGFBQXZCO0FBT0EsbUJBQU8vSyx3REFBb0IzRixnQ0FBTXdRLGNBQU4sR0FBMEJwaEIsT0FBTyxJQUFJLEVBQXJDLENBQXBCLENBQVA7QUFDRDs7O2lCQUVELDJCQUF5QmtGLE9BQXpCLEVBQWlEO0FBQy9DLGdCQUFNd1EsTUFBTSxHQUFHeFEsT0FBTyxDQUFDMkMsa0JBQVIsR0FBNkI2TixNQUE1QztBQUNBLGdCQUFNSSxJQUFJLEdBQUdKLE1BQU0sR0FBRyxHQUFULEdBQWUsRUFBZixHQUFvQkEsTUFBTSxHQUFHLElBQVQsR0FBZ0IsRUFBaEIsR0FBcUIsRUFBdEQ7QUFDQSxtQkFBT2EsNkNBQVU7QUFDZjVRLGtCQUFJLEVBQUUsVUFBVStQLE1BQVYsR0FBbUIsUUFEVjtBQUVmN1Asc0JBQVEsRUFBRSxDQUFDaVEsSUFBRCxFQUFPQSxJQUFQLENBRks7QUFHZnlMLHdCQUFVLEVBQUUsQ0FBQ3pMLElBQUksR0FBRyxHQUFSLEVBQWFBLElBQUksR0FBRyxHQUFwQixDQUhHO0FBSWZsUSx1QkFBUyxFQUFFO0FBSkksYUFBVixDQUFQO0FBTUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDRlU0Yjs7Ozs7eUJBQUFBO0FBQWM7OztjQUFkQTs7O2tCQWJGLENBQ1BDLG1FQUFzQixDQUNwQjtBQUNFM0QsY0FBSSxFQUFFLEVBRFI7QUFFRUMsbUJBQVMsRUFBRTJEO0FBRmIsU0FEb0IsQ0FBdEIsQ0FETyxFQU9QQyx1RUFQTyxFQVFQQywrRUFSTyxFQVNQQyw4REFUTzs7Ozs0SEFhRUwsaUJBQWM7QUFBQVIseUJBRlZVLGdEQUVVLEVBRkFJLGdHQUVBO0FBRm1CWiwrRUFKMUNTLHVFQUkwQyxFQUgxQ0MsK0VBRzBDLEVBRjFDQyw4REFFMEM7QUFFbkI7QUFKZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUWEU7Ozs7OztBQU1BQTs7Ozs7O0FBSUFBOztBQUNFQTs7QUFDRkE7Ozs7OztBQURpQkE7O0FBQUFBOzs7O0FDUW5CLFVBQU1DLFNBQVMsR0FBRyxVQUFsQjs7VUFPYUM7Ozs7O0FBa0JYLDJCQUNFbFAsTUFERixFQUVFdUssS0FGRixFQUdVNEUsa0JBSFYsRUFJVUMsaUJBSlYsRUFLU25SLGtCQUxULEVBTVVDLE1BTlYsRUFPVW1SLGNBUFYsRUFRVUMsNEJBUlYsRUFTNEJDLFFBVDVCLEVBUzhDO0FBQUE7O0FBQUE7O0FBRTVDLHVDQUFNdlAsTUFBTixFQUFjdUssS0FBZDtBQVJRO0FBQ0E7QUFDRDtBQUNDO0FBQ0E7QUFDQTtBQUNrQjtBQXZCcEIsZ0NBQWNpRixzSEFBOEM7QUFDbEVuaUIsNkJBQWlCLEVBQUUsS0FEK0M7QUFFbEVFLCtCQUFtQixFQUFFO0FBRjZDLFdBQTlDLENBQWQ7QUFJQSwrQ0FBNkIsSUFBSWtpQiwwQ0FBSixFQUE3QjtBQUlSLHNDQUFvQixLQUFwQjtBQUlRLHdDQUFzQixJQUFJQSwwQ0FBSixFQUF0QixDQVdzQyxDQUk1QztBQUNBOztBQUNBLGtCQUFLQyxtQkFBTCxDQUF5Qm5SLElBQXpCLENBQ0Usd0VBREYsRUFFRSwrREFBYSxHQUFiLENBRkYsRUFHRSw0REFBVSxRQUFLbU0sYUFBZixDQUhGLEVBSUVoTSxTQUpGLENBSVksVUFBQ2lSLGdCQUFELEVBQXFCO0FBQy9CLG9CQUFLSixRQUFMLENBQWNLLGVBQWQsQ0FBOEJDLEtBQTlCLENBQW9DQyxXQUFwQyxDQUFnRCwwQkFBaEQsWUFBK0VILGdCQUEvRTtBQUNELFdBTkQ7O0FBTjRDO0FBYTdDOzs7O2lCQUVELDhCQUFrQjtBQUNoQixpQkFBS0ksbUJBQUw7QUFDRDs7O2lCQUVELG9CQUFRO0FBQ04saUJBQUtDLFdBQUwsR0FBbUIsS0FBS1osaUJBQUwsQ0FBdUJhLGFBQTFDO0FBQ0EsaUJBQUtDLFlBQUwsR0FBb0IsS0FBS2Ysa0JBQUwsQ0FBd0JnQixTQUF4QixDQUFrQzVSLElBQWxDLENBQ2xCLHNEQUFJLFVBQUNFLEdBQUQ7QUFBQSxxQkFBUyxDQUFDQSxHQUFELENBQVQ7QUFBQSxhQUFKLENBRGtCLEVBRWxCLDZFQUFVLEtBQUtQLE1BQWYsQ0FGa0IsQ0FBcEI7QUFJQSxpQkFBS2tTLG9CQUFMO0FBQ0Q7OztpQkFFRCxnQ0FBb0I7QUFBQTs7QUFDbEIsaUJBQUtuUyxrQkFBTCxDQUF3QlcsWUFBeEIsQ0FDR0wsSUFESCxDQUVJLHNEQUFJLFVBQUNNLEVBQUQ7QUFBQSxxQkFBUUEsRUFBRSxDQUFDQyxpQkFBWDtBQUFBLGFBQUosQ0FGSixFQUdJLHdFQUhKLEVBSUksNERBQVUsNkNBQUssS0FBSzRMLGFBQVYsRUFBeUIsS0FBSzJGLDBCQUE5QixDQUFWLENBSkosRUFLSSw2RUFBVSxLQUFLblMsTUFBZixDQUxKLEVBT0dRLFNBUEgsQ0FPYSxVQUFDSSxpQkFBRCxFQUFzQjtBQUMvQixxQkFBSSxDQUFDQSxpQkFBTCxHQUF5QkEsaUJBQXpCOztBQUNBLGtCQUFJLENBQUNBLGlCQUFMLEVBQXdCO0FBQ3RCLHVCQUFJLENBQUN1UiwwQkFBTCxDQUFnQ3RSLElBQWhDOztBQUNBLHVCQUFJLENBQUNzUiwwQkFBTCxDQUFnQ2xSLFFBQWhDOztBQUNBLHVCQUFJLENBQUNtUix3QkFBTDtBQUNEO0FBQ0YsYUFkSDtBQWVEOzs7aUJBRUssb0NBQXdCOzs7Ozs7O0FBQzVCLDZCQUFNLEtBQUtoQiw0QkFBTCxDQUFrQ2lCLDBCQUFsQyxFQUFOOzs7QUFDQSwyQkFBS0MsWUFBTCxDQUFrQkMsaUJBQWxCLENBQW9DLElBQXBDOzs7Ozs7Ozs7QUFDRDs7O2lCQUVELG9CQUFXQyxVQUFYLEVBQTRCO0FBQUE7O0FBQzFCLGlCQUFLdGYsR0FBTCxHQUFXc2YsVUFBWDtBQUNBLGlCQUFLQyxXQUFMLENBQWlCQyxLQUFqQixDQUF1QixLQUFLeGYsR0FBNUI7QUFDQSxpQkFBS3VmLFdBQUwsQ0FBaUJFLEVBQWpCLENBQW9CLGNBQXBCLEVBQW9DLFVBQUNDLENBQUQsRUFBVztBQUM3QyxrQkFBTUMsV0FBVyxHQUFhRCxDQUFDLENBQUMvaEIsTUFBaEM7O0FBQ0Esa0JBQU1ILFdBQVcsR0FBRyxPQUFJLENBQUN3QyxHQUFMLENBQVM0ZixPQUFULEVBQXBCOztBQUNBLGtCQUFNQyxPQUFPLEdBQUdyaUIsV0FBVyxHQUFHLENBQTlCOztBQUNBLGtCQUFJcWlCLE9BQU8sSUFBSUMsa0VBQWYsRUFBMkM7QUFDekNKLGlCQUFDLENBQUNuaUIsS0FBRixDQUFRME0sUUFBUjtBQUNELGVBRkQsTUFFTztBQUNMLHVCQUFJLENBQUNqSyxHQUFMLENBQVMrZixPQUFULENBQ0VKLFdBREYsRUFFRUssSUFBSSxDQUFDQyxHQUFMLENBQVNKLE9BQVQsRUFBa0JDLGtFQUFsQixDQUZGO0FBSUQ7QUFDRixhQVpEO0FBYUEsaUJBQUs5ZixHQUFMLENBQVN5ZixFQUFULENBQVksT0FBWixFQUFxQixZQUFLO0FBQ3hCLGtCQUFJLE9BQUksQ0FBQ1MsY0FBVCxFQUF5QjtBQUN2Qix1QkFBSSxDQUFDQSxjQUFMLENBQW9CQyxRQUFwQjtBQUNEOztBQUNELHFCQUFJLENBQUNELGNBQUwsR0FBc0IsSUFBdEI7O0FBQ0EscUJBQUksQ0FBQ0UsVUFBTCxDQUFnQjdRLElBQWhCO0FBQ0QsYUFORCxFQWhCMEIsQ0F1QjFCOztBQUNBLGdCQUFNOFEscUJBQXFCLEdBQUcsc0RBQWMsQ0FDMUMsS0FBS3RDLGtCQUFMLENBQXdCdUMsYUFEa0IsRUFFMUMsS0FBS3pULGtCQUFMLENBQXdCMFQsaUJBRmtCLENBQWQsQ0FBOUI7QUFJQUYsaUNBQXFCLENBQ2xCbFQsSUFESCxDQUNRLDREQUFVLEtBQUttTSxhQUFmLENBRFIsRUFFR2hNLFNBRkgsQ0FFYSxpQkFBd0M7QUFBQTtBQUFBLGtCQUF0Q2tULGVBQXNDO0FBQUEsa0JBQXJCQyxnQkFBcUI7O0FBQ2pELHFCQUFJLENBQUNDLHdCQUFMLENBQThCRCxnQkFBZ0IsR0FBR0QsZUFBSCxHQUFxQixFQUFuRTtBQUNELGFBSkg7QUFLRDs7O2lCQUVLLG1CQUFPOzs7Ozs7O0FBQ1gsMkJBQUt2QyxjQUFMLENBQW9CMEMsS0FBcEIsQ0FBMEIsNEJBQTFCLEVBQXdEOUMsU0FBeEQ7O0FBQ3FCLDZCQUFNLEtBQUtoUixrQkFBTCxDQUF3QlcsWUFBeEIsQ0FDeEJMLElBRHdCLENBQ25CLHVEQUFLLENBQUwsQ0FEbUIsRUFFeEJTLFNBRndCLEVBQU47OztBQUFmc047OzJCQUdGQSxZQUFZLENBQUN4Tjs7Ozs7QUFDZiwyQkFBS3VRLGNBQUwsQ0FBb0IwQyxLQUFwQixDQUNFLG1EQURGLEVBRUU5QyxTQUZGOzs7O0FBTUYsMkJBQUtJLGNBQUwsQ0FBb0IwQyxLQUFwQixDQUNFLHNDQURGLEVBRUU5QyxTQUZGO0FBSUEsMkJBQUt1QixZQUFMLENBQWtCQyxpQkFBbEIsQ0FBb0MsSUFBcEM7QUFDQSwyQkFBS1YsbUJBQUw7Ozs7Ozs7OztBQUNEOzs7aUJBRUQsbUJBQU87QUFDTCxpQkFBS1YsY0FBTCxDQUFvQjBDLEtBQXBCLENBQ0Usd0RBREYsRUFFRTlDLFNBRkY7QUFJQSxpQkFBS3VCLFlBQUwsQ0FBa0JDLGlCQUFsQixDQUFvQyxLQUFwQyxFQUxLLENBT0w7O0FBQ0EsaUJBQUtmLG1CQUFMLENBQXlCM1EsSUFBekIsQ0FBOEIsQ0FBOUI7QUFDRCxZQUVEO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7aUJBRVEsa0NBQXlCNlMsZUFBekIsRUFBaUU7QUFBQTs7QUFDdkUsaUJBQUtqQixXQUFMLENBQWlCM2dCLFdBQWpCOztBQUR1RSx1REFFMUM0aEIsZUFGMEM7QUFBQTs7QUFBQTtBQUV2RSxrRUFBOEM7QUFBQSxvQkFBbkNJLGNBQW1DO0FBQzVDLG9CQUFNQyxNQUFNLEdBQUd6Tyw0Q0FDYndPLGNBQWMsQ0FBQzNQLFdBQWYsQ0FBMkJvQixRQURkLEVBRWJ1TyxjQUFjLENBQUMzUCxXQUFmLENBQTJCcUIsU0FGZCxDQUFmO0FBSUEsb0JBQU16VCxNQUFNLEdBQUcsSUFBSWlpQixnR0FBSixDQUFrQkYsY0FBbEIsRUFBa0NDLE1BQWxDLEVBQTBDLEVBQTFDLENBQWY7QUFDQWhpQixzQkFBTSxDQUFDNGdCLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFVBQUM3SCxLQUFELEVBQTBCO0FBQzNDLHNCQUFNMVosQ0FBQyxHQUFrQjBaLEtBQUssQ0FBQ21KLE1BQS9COztBQUNBLHNCQUFJLE9BQUksQ0FBQ2IsY0FBVCxFQUF5QjtBQUN2QiwyQkFBSSxDQUFDQSxjQUFMLENBQW9CQyxRQUFwQjtBQUNEOztBQUVELHlCQUFJLENBQUNELGNBQUwsR0FBc0JoaUIsQ0FBdEI7QUFDQUEsbUJBQUMsQ0FBQzhpQixXQUFGOztBQUNBLHlCQUFJLENBQUNaLFVBQUwsQ0FBZ0JhLElBQWhCLENBQXFCL2lCLENBQUMsQ0FBQ3VSLElBQXZCO0FBQ0QsaUJBVEQ7QUFVQTVRLHNCQUFNLENBQUMyZ0IsS0FBUCxDQUFhLEtBQUtELFdBQWxCO0FBQ0Q7QUFuQnNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQnhFOzs7aUJBRU8sK0JBQW1COzs7QUFDekIsZ0JBQU0yQixnQkFBZ0IsR0FBRyxXQUFLQyxTQUFMLE1BQWMsSUFBZCxJQUFjQyxhQUFkLEdBQWMsTUFBZCxHQUFjQSxHQUFFQyxhQUF6Qzs7QUFDQSxnQkFBSUgsZ0JBQUosRUFBc0I7QUFDcEIsa0JBQU1JLE1BQU0sR0FBR0osZ0JBQWdCLENBQUNLLFlBQWhDO0FBQ0EsbUJBQUtqRCxtQkFBTCxDQUF5QjNRLElBQXpCLENBQThCMlQsTUFBOUI7QUFDRCxhQUhELE1BR087QUFDTCxtQkFBS2hELG1CQUFMLENBQXlCM1EsSUFBekIsQ0FBOEIsQ0FBOUI7QUFDRDtBQUNGOzs7O1FBeEwyQjZUOzs7eUJBQWpCMUQsV0FBUUYseXZDQTJCVDZELHNEQTNCUztBQTJCRDs7O2NBM0JQM0Q7QUFBUTlQO0FBQUFzSDtBQUFBO3VFQUNSb00sa0dBQW1COzt1RUFDbkJDLHFGQUFZOzt1RUFhWkMsK0hBQXNCOzs7Ozs7Ozs7Ozs7Ozs7OztBRGxEbkNoRTs7QUFDQUE7O0FBRUVBOztBQUNFQTtBQUFBLHFCQUFZakYsc0JBQVo7QUFBOEIsYUFBOUI7O0FBR0RpRjs7QUFFREE7Ozs7QUFJQUE7O0FBRUFBOztBQUVBQTs7QUFFQUE7Ozs7QUFHRkE7Ozs7QUF0QmtDQTs7QUFLOUJBOztBQUFBQSw2RkFBc0IsUUFBdEIsRUFBc0IsVUFBdEI7O0FBS0NBOztBQUFBQTs7QUFLd0JBOztBQUFBQTs7QUFJWkE7O0FBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUVFSmlFOzs7Ozt5QkFBQUE7QUFBYzs7O2NBQWRBOzs7a0JBVkYsQ0FDUEMsc0VBRE8sRUFFUEMsNkRBRk8sRUFHUEMsNkRBSE8sRUFJUEMsb0ZBSk8sRUFLUEMsZ0dBTE8sRUFNUEMsdUVBTk87Ozs7NEhBVUVOLGlCQUFjO0FBQUFoRix5QkFGVnVGLGdEQUVVLEVBRkFDLDhGQUVBO0FBRm1CdEYsb0JBUDFDK0Usc0VBTzBDLEVBTjFDQyw2REFNMEMsRUFMMUNDLDZEQUswQyxFQUoxQ0Msb0ZBSTBDLEVBSDFDQyxnR0FHMEMsRUFGMUNDLHVFQUUwQztBQUVuQjtBQUpYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKVnhWOztBQUFrREE7O0FBQWVBOzs7Ozs7QUFBcENBOztBQUFxQkE7O0FBQUFBOzs7Ozs7Ozs7OztVQ0MzQzJWO0FBNkJYLDJCQUNVdEUsaUJBRFYsRUFFVXRJLFFBRlYsRUFHVTNDLGNBSFYsRUFJVWxHLGtCQUpWLEVBS1VDLE1BTFYsRUFLd0I7QUFBQTs7QUFKZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBckJWLDJCQUFZLEtBQVo7QUF1QkUsZUFBS3lWLEtBQUwsR0FBYSxLQUFLN00sUUFBTCxDQUFjQyxFQUFkLENBQWlCLEtBQWpCLENBQWI7QUFDQSxlQUFLNk0sU0FBTCxHQUFpQixLQUFLOU0sUUFBTCxDQUFjQyxFQUFkLENBQWlCLFNBQWpCLENBQWpCO0FBQ0EsZUFBS2lKLFdBQUwsR0FBbUIsS0FBS1osaUJBQUwsQ0FBdUJhLGFBQTFDO0FBQ0Q7Ozs7ZUF4QkQsZUFBYTtBQUNYLG1CQUFPLEtBQUs0RCxjQUFMLElBQXVCLEtBQUtBLGNBQUwsQ0FBb0JDLFVBQXBCLEdBQWlDLENBQS9EO0FBQ0Q7OztlQUVELGVBQWM7QUFDWixtQkFBTyxrQkFBa0IsS0FBS0QsY0FBTCxDQUFvQkMsVUFBN0M7QUFDRDs7O2VBRUQsZUFBYTtBQUNYLDZCQUFVLEtBQUtELGNBQUwsQ0FBb0JDLFVBQTlCLFNBQ0UsS0FBS0QsY0FBTCxDQUFvQkUsbUJBQXBCLEdBQTBDLEdBQTFDLEdBQWdELEVBRGxEO0FBR0Q7OztpQkFjRCxvQkFBUTtBQUFBOztBQUNOLGlCQUFLQyxpQ0FBTCxHQUF5QyxLQUFLN1AsY0FBTCxDQUFvQjhQLGdDQUFwQixDQUN0QzFWLElBRHNDLENBRXJDLHFEQUFJLFVBQUNzVixjQUFELEVBQW1CO0FBQ3JCLGtCQUFNSyxXQUFXLGdDQUNaTCxjQUFjLENBQUN0WSxNQURILHNCQUVac1ksY0FBYyxDQUFDTSxVQUZILEVBQWpCO0FBSUEsa0JBQU1DLGNBQWMsR0FBR0YsV0FBVyxDQUFDOWlCLEdBQVosQ0FBZ0IsVUFBQ2lqQixDQUFEO0FBQUEsdUJBQU9BLENBQUMsQ0FBQ0MsYUFBRixDQUFnQixDQUFoQixDQUFQO0FBQUEsZUFBaEIsQ0FBdkI7QUFDQSxrQkFBTVIsVUFBVSxHQUFHMUMsSUFBSSxDQUFDbUQsR0FBTCxXQUFJLHFCQUFRSCxjQUFjLENBQUNoakIsR0FBZixDQUFtQixVQUFDb2pCLENBQUQ7QUFBQSx1QkFBT0EsQ0FBQyxDQUFDRCxHQUFUO0FBQUEsZUFBbkIsQ0FBUixFQUF2QjtBQUNBLGtCQUFNUixtQkFBbUIsR0FBR0ssY0FBYyxDQUFDSyxJQUFmLENBQzFCLFVBQUNELENBQUQ7QUFBQSx1QkFBT0EsQ0FBQyxDQUFDRCxHQUFGLEtBQVVULFVBQVYsSUFBd0JVLENBQUMsQ0FBQ0UsVUFBakM7QUFBQSxlQUQwQixDQUE1QjtBQUdBLHFCQUFPO0FBQ0xDLHFCQUFLLEVBQUVULFdBQVcsQ0FBQ3ZSLE1BRGQ7QUFFTHlELG9CQUFJLEVBQUU4TixXQUFXLENBQUN2UixNQUFaLEdBQXFCLENBQXJCLEdBQXlCLElBQXpCLEdBQWdDdVIsV0FBVyxDQUFDdlIsTUFBWixDQUFtQmlTLFFBQW5CLEVBRmpDO0FBR0xkLDBCQUFVLEVBQVZBLFVBSEs7QUFJTEMsbUNBQW1CLEVBQW5CQTtBQUpLLGVBQVA7QUFNRCxhQWhCRCxDQUZxQyxFQW9CdENyVixTQXBCc0MsQ0FvQjVCLFVBQUNELEdBQUQsRUFBUTtBQUNqQixxQkFBSSxDQUFDUCxNQUFMLENBQVlxRCxHQUFaLENBQWdCLFlBQUs7QUFDbkIsdUJBQUksQ0FBQ3NTLGNBQUwsR0FBc0JwVixHQUF0QjtBQUNELGVBRkQ7QUFHRCxhQXhCc0MsQ0FBekM7QUEwQkEsaUJBQUtvVyw0QkFBTCxHQUFvQyxLQUFLNVcsa0JBQUwsQ0FBd0I2VyxpQkFBeEIsQ0FBMENwVyxTQUExQyxDQUNsQyxVQUFDRCxHQUFELEVBQVE7QUFDTixxQkFBSSxDQUFDUCxNQUFMLENBQVlxRCxHQUFaLENBQWdCLFlBQUs7QUFDbkIsdUJBQUksQ0FBQ3dULFNBQUwsR0FBaUJ0VyxHQUFHLENBQUN1VyxPQUFKLENBQVlDLHNFQUFaLEtBQStCLENBQWhEO0FBQ0QsZUFGRDtBQUdELGFBTGlDLENBQXBDO0FBT0Q7OztpQkFFRCx1QkFBVztBQUNULGlCQUFLakIsaUNBQUwsQ0FBdUNwVCxXQUF2QztBQUNBLGlCQUFLaVUsNEJBQUwsQ0FBa0NqVSxXQUFsQztBQUNEOzs7Ozs7O3lCQWhGVThTLFdBQVEzVjtBQUFBOzs7Y0FBUjJWO0FBQVF0VTtBQUFBQztBQUFBQztBQUFBQztBQUFBQztBQUFBO0FEZHJCekI7O0FBQ0VBOzs7O0FBQ0VBOztBQUNFQTs7QUFDQUE7O0FBQVdBOzs7O0FBQTBCQTs7QUFDdkNBOztBQUNBQTs7QUFDRUE7O0FBQ0FBOztBQUFXQTs7OztBQUEyQkE7O0FBQ3hDQTs7QUFDQUE7O0FBQ0VBOztBQUNBQTs7QUFBV0E7Ozs7QUFBK0JBOztBQUMxQ0E7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOzs7O0FBakJrQ0E7O0FBQ25CQTs7QUFBQUE7O0FBR0VBOztBQUFBQTs7QUFJQUE7O0FBQUFBOztBQUlBQTs7QUFBQUE7O0FBQ0NBOztBQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFUmxCLFVBQU1tWCxNQUFNLEdBQVcsQ0FDckI7QUFDRW5LLFlBQUksRUFBRSxNQURSO0FBRUVDLGlCQUFTLEVBQUVtSyxnREFGYjtBQUdFQyxtQkFBVyxFQUFFLENBQUNDLDZFQUFELENBSGY7QUFJRWhLLGdCQUFRLEVBQUUsQ0FDUjtBQUNFTixjQUFJLEVBQUUsRUFEUjtBQUVFdUssb0JBQVUsRUFBRSxZQUZkO0FBR0VDLG1CQUFTLEVBQUU7QUFIYixTQURRLEVBTVI7QUFDRXhLLGNBQUksRUFBRSxNQURSO0FBRUVNLGtCQUFRLEVBQUUsQ0FDUjtBQUNFTixnQkFBSSxFQUFFLEVBRFI7QUFFRXlLLHdCQUFZLEVBQUU7QUFBQSxxQkFDWjVLO0FBQUE7QUFBQSxzQkFBOEJuRixJQUE5QixDQUFtQyxVQUFDblcsQ0FBRDtBQUFBLHVCQUFPQSxDQUFDLENBQUNtZixjQUFUO0FBQUEsZUFBbkMsQ0FEWTtBQUFBO0FBRmhCLFdBRFE7QUFGWixTQU5RLEVBZ0JSO0FBQ0UxRCxjQUFJLEVBQUUsTUFEUjtBQUVFTSxrQkFBUSxFQUFFLENBQ1I7QUFDRU4sZ0JBQUksRUFBRSxFQURSO0FBRUV5Syx3QkFBWSxFQUFFO0FBQUEscUJBQ1o1SztBQUFBO0FBQUEsc0JBQThCbkYsSUFBOUIsQ0FBbUMsVUFBQ25XLENBQUQ7QUFBQSx1QkFBT0EsQ0FBQyxDQUFDbW1CLGNBQVQ7QUFBQSxlQUFuQyxDQURZO0FBQUE7QUFGaEIsV0FEUTtBQUZaLFNBaEJRLEVBMEJSO0FBQ0UxSyxjQUFJLEVBQUUsa0JBRFI7QUFFRU0sa0JBQVEsRUFBRSxDQUNSO0FBQ0VOLGdCQUFJLEVBQUUsRUFEUjtBQUVFeUssd0JBQVksRUFBRTtBQUFBLHFCQUNaNUs7QUFBQTtBQUFBLHNCQUFzRG5GLElBQXRELENBQ0UsVUFBQ25XLENBQUQ7QUFBQSx1QkFBT0EsQ0FBQyxDQUFDb21CLHlCQUFUO0FBQUEsZUFERixDQURZO0FBQUE7QUFGaEIsV0FEUTtBQUZaLFNBMUJRLEVBc0NSO0FBQ0UzSyxjQUFJLEVBQUUsY0FEUjtBQUVFTSxrQkFBUSxFQUFFLENBQ1I7QUFDRU4sZ0JBQUksRUFBRSxFQURSO0FBRUV5Syx3QkFBWSxFQUFFO0FBQUEscUJBQ1o1SztBQUFBO0FBQUEsc0JBQThDbkYsSUFBOUMsQ0FDRSxVQUFDblcsQ0FBRDtBQUFBLHVCQUFPQSxDQUFDLENBQUNxbUIscUJBQVQ7QUFBQSxlQURGLENBRFk7QUFBQTtBQUZoQixXQURRO0FBRlosU0F0Q1E7QUFKWixPQURxQixFQXlEckI7QUFDRTVLLFlBQUksRUFBRSxFQURSO0FBRUV1SyxrQkFBVSxFQUFFLFlBRmQ7QUFHRUMsaUJBQVMsRUFBRTtBQUhiLE9BekRxQixDQUF2Qjs7VUFvRWFLOzs7Ozt5QkFBQUE7QUFBcUI7OztjQUFyQkE7OztrQkFIRixDQUFDakwsbUVBQXNCdUssTUFBdEIsQ0FBRCxHQUNDdks7Ozs7NEhBRUNpTCx3QkFBcUI7QUFBQXpIO0FBQUF2USxvQkFGdEIrTSx5REFFc0I7QUFBQTtBQUZWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0R4QixVQUFNdUssTUFBTSxHQUFXLENBQ3JCO0FBQ0VuSyxZQUFJLEVBQUUsRUFEUjtBQUVFQyxpQkFBUyxFQUFFNks7QUFGYixPQURxQixDQUF2Qjs7VUFpQmFKOzs7Ozt5QkFBQUE7QUFBYzs7O2NBQWRBOzs7a0JBVEYsQ0FDUDNILHlEQURPLEVBRVBnSSx1REFGTyxFQUdQblAsdURBSE8sRUFJUG9QLG1FQUFzQmIsTUFBdEIsQ0FKTyxFQUtQYyxnRUFMTzs7Ozs0SEFTRVAsaUJBQWM7QUFBQXhILHlCQUZWNEgsZ0RBRVU7QUFGRjFILG9CQU5yQkwseURBTXFCLEVBTHJCZ0ksdURBS3FCLEVBSnJCblAsdURBSXFCLEVBSlZvUCx5REFJVSxFQUZyQkMsZ0VBRXFCO0FBRUU7QUFKUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2hCTkM7Ozs7O3lCQUFBQTtBQUFROzs7Y0FBUkE7QUFBUTdXO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QUNQckIwVzs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0FBOztBQUFXQTs7OztBQUE4QkE7O0FBQzNDQTs7QUFDRkE7O0FBRUFBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQUNBQTs7QUFDRUE7O0FBQ0ZBOztBQUNBQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFDQUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQ0FBOztBQUNFQTs7QUFDRkE7O0FBQ0FBOztBQUNGQTs7QUFDRkE7O0FBQ0ZBOzs7O0FBL0JlQTs7QUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0dGQztBQUNYLHlDQUFvQnpPLG1CQUFwQixFQUE0RDtBQUFBOztBQUF4QztBQUE0Qzs7OztpQkFFaEUseUJBQWE7QUFDWCxpQkFBS0EsbUJBQUwsQ0FBeUI2QixnQkFBekIsQ0FBMEMsMkJBQTFDO0FBQ0Q7Ozs7Ozs7eUJBTFU0TSx5QkFBc0J2UDtBQUFBOzs7Y0FBdEJ1UDtBQUFzQi9XO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QUNSbkNvSDs7QUFBK0JBOzs7O0FBQXVDQTs7QUFDdEVBOztBQUFHQTs7OztBQUFvREE7O0FBQU1BOzs7O0FBQW9EQTs7QUFDakhBOztBQUFpRUE7QUFBQSxxQkFBU21ELG1CQUFUO0FBQXdCLGFBQXhCOztBQUMvRG5EOzs7O0FBQ0ZBOzs7O0FBSitCQTs7QUFBQUE7O0FBQzVCQTs7QUFBQUE7O0FBQTBEQTs7QUFBQUE7O0FBRTNEQTs7QUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUNPRjs7O0FBSUEsVUFBTXNPLE1BQU0sR0FBVyxDQUNyQjtBQUNFbkssWUFBSSxFQUFFLEVBRFI7QUFFRUMsaUJBQVMsRUFBRW9MO0FBRmIsT0FEcUIsQ0FBdkI7O1VBd0JhVDs7Ozs7eUJBQUFBO0FBQXFCOzs7Y0FBckJBOzs7a0JBaEJGLENBQ1BVLHlEQURPLEVBRVBDLHVEQUZPLEVBR1BDLHVEQUhPLEVBSVBDLG9FQUFzQnRCLE1BQXRCLENBSk8sRUFLUHVCLGlFQUxPLEVBTVBDLHVFQU5POzs7OzRIQWdCRWYsd0JBQXFCO0FBQUExSCx5QkFQOUJtSSwrREFPOEIsRUFOOUJPLHFIQU04QixFQUw5QkMsK0dBSzhCLEVBSjlCQyxxSkFJOEIsRUFIOUJDLDRGQUc4QjtBQUhSM0ksb0JBWnRCa0kseURBWXNCLEVBWHRCQyx1REFXc0IsRUFWdEJDLHVEQVVzQixFQVZYQywwREFVVyxFQVJ0QkMsaUVBUXNCLEVBUHRCQyx1RUFPc0I7QUFHUTtBQVZsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWFpLOztBQUNFQTs7QUFFRkE7Ozs7OztBQUYyQkE7O0FBQUFBLCtGQUF1QixVQUF2QixFQUF1QkMsbUJBQXZCLEVBQXVCLGNBQXZCLEVBQXVCQSx1QkFBdkI7Ozs7OztBQUczQkQ7O0FBQ0VBOztBQUNGQTs7Ozs7O0FBRHlCQTs7QUFBQUE7Ozs7OztBQUV6QkE7Ozs7Ozs7Ozs7OztBQVZGQTs7QUFHRUE7O0FBSUFBOztBQUdBQTs7QUFFRkE7Ozs7OztBQVp1REEsb0tBQThCLE9BQTlCLEVBQThCRSxvQkFBOUIsRUFBOEIsVUFBOUIsRUFBOEJBLGlCQUE5QixFQUE4QixVQUE5QixFQUE4QkEsaUJBQTlCLEVBQThCLGtCQUE5QixFQUE4QixFQUE5QixFQUE4QixvQkFBOUIsRUFBOEIsRUFBOUIsRUFBOEIsU0FBOUIsRUFBOEJBLGtCQUE5Qjs7Ozs7O0FBYXZERjs7QUFDRUE7O0FBQ0ZBOzs7Ozs7QUFGZ0ZBOzs7Ozs7QUFPaEZBOzs7Ozs7QUFBQUE7Ozs7Ozs7Ozs7QUFBZUE7Ozs7OztBQUdmQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQ0VBOztBQUFLQTs7OztBQUE4Q0E7O0FBQ25EQTs7QUFBMEJBOzs7O0FBQStDQTs7QUFDM0VBOztBQUNGQTs7QUFDRkE7Ozs7QUFKV0E7O0FBQUFBOztBQUNxQkE7O0FBQUFBOzs7Ozs7QUFNaENBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFDRUE7O0FBQUtBOzs7O0FBQTRDQTs7QUFDakRBOztBQUEwQkE7Ozs7QUFBNkNBOztBQUN6RUE7O0FBQ0ZBOztBQUNGQTs7OztBQUpXQTs7QUFBQUE7O0FBQ3FCQTs7QUFBQUE7Ozs7VUN0Q3JCRztBQTZCWCxrQ0FDVS9TLGNBRFYsRUFFVWxHLGtCQUZWLEVBR1VDLE1BSFYsRUFHd0I7QUFBQTs7QUFGZDtBQUNBO0FBQ0E7QUE5QlYsK0JBQW9ELEVBQXBEO0FBSUEsNkJBQWMsS0FBS2laLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixDQUFkO0FBQ0EsdUJBQVEsb0JBQVI7QUFDQSw4QkFBZSxLQUFmO0FBQ0EsNEJBQWEsS0FBYjtBQUNBLDZCQUFjLEtBQUtDLGVBQUwsQ0FBcUJELElBQXJCLENBQTBCLElBQTFCLENBQWQ7QUFDQSx3QkFBUyxLQUFUO0FBQ0EsNEJBQWEsS0FBS0UsUUFBTCxDQUFjRixJQUFkLENBQW1CLElBQW5CLENBQWI7QUFxQkk7Ozs7ZUFoQkosZUFBb0I7QUFDbEIsbUJBQU8sS0FBS0csV0FBTCxLQUFxQixZQUFyQixJQUFxQyxLQUFLQyxZQUFqRDtBQUNEOzs7ZUFFRCxlQUE0QjtBQUMxQixtQkFBTyxLQUFLRCxXQUFMLEtBQXFCLFdBQXJCLElBQW9DLEtBQUtFLFVBQWhEO0FBQ0Q7OztlQUVELGVBQWtCO0FBQ2hCLG1CQUFPLEtBQUtDLGdCQUFMLElBQXlCLEtBQUtDLHdCQUFyQztBQUNEOzs7aUJBUUQsb0JBQVE7QUFDTixpQkFBS0osV0FBTCxHQUFtQixXQUFuQjtBQUNBLGlCQUFLSyxrQkFBTCxHQUEwQixJQUFJQyxrREFBSixDQUN4QixLQUFLTixXQURtQixDQUExQjtBQUdBLGlCQUFLTyxxQkFBTCxHQUE2QixLQUFLRixrQkFBTCxDQUF3QnZYLFlBQXhCLEVBQTdCO0FBQ0Q7OztpQkFFRCx3QkFBWTtBQUNWLGdCQUFJLEtBQUswWCxnQkFBVCxFQUEyQjtBQUFBLDBEQUNOLEtBQUtBLGdCQUFMLENBQXNCQyxPQUF0QixFQURNO0FBQUE7O0FBQUE7QUFDekIsdUVBQW9EO0FBQUEsc0JBQXpDblgsSUFBeUM7QUFDbERBLHNCQUFJLENBQUNzSCxLQUFMO0FBQ0Q7QUFId0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUkxQjtBQUNGOzs7aUJBRUQsMkJBQWU7QUFBQTs7QUFDYixpQkFBSzhQLGdCQUFMLEdBQXdCLElBQUlDLDBDQUFKLEVBQXhCO0FBQ0EsaUJBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0Esa0VBQWMsQ0FDWixLQUFLTCxxQkFETyxFQUVaLEtBQUs3WixrQkFBTCxDQUF3QjZXLGlCQUZaLENBQWQsRUFJR3ZXLElBSkgsQ0FLSSw0REFBVTtBQUFBO0FBQUEsa0JBQUU2WixPQUFGO0FBQUEsa0JBQVdDLGdCQUFYOztBQUFBLHFCQUNSLE9BQUksQ0FBQ0MseUJBQUwsQ0FBK0JGLE9BQS9CLEVBQXdDQyxnQkFBeEMsQ0FEUTtBQUFBLGFBQVYsQ0FMSixFQVFJLDREQUFVLEtBQUtKLGdCQUFmLENBUkosRUFVR3ZaLFNBVkgsQ0FVYSxVQUFDNlosYUFBRCxFQUFrQjtBQUMzQixxQkFBSSxDQUFDcmEsTUFBTCxDQUFZcUQsR0FBWixDQUFnQixZQUFLO0FBQ25CLHVCQUFJLENBQUNpWCxZQUFMOztBQUNBLHVCQUFJLENBQUNELGFBQUwsR0FBcUJBLGFBQXJCOztBQUNBLHVCQUFJLENBQUNFLHVEQUFMO0FBQ0QsZUFKRDtBQUtELGFBaEJIO0FBaUJBLGtFQUFjLENBQ1osS0FBS1gscUJBRE8sRUFFWixLQUFLN1osa0JBQUwsQ0FBd0I2VyxpQkFGWixDQUFkLEVBSUd2VyxJQUpILENBSVEsNERBQVUsS0FBSzBaLGdCQUFmLENBSlIsRUFLR3ZaLFNBTEgsQ0FLYSxpQkFBb0M7QUFBQTtBQUFBLGtCQUFsQzZZLFdBQWtDO0FBQUEsa0JBQXJCYyxnQkFBcUI7O0FBQzdDLHFCQUFJLENBQUNuYSxNQUFMLENBQVlxRCxHQUFaLENBQWdCLFlBQUs7QUFDbkIsdUJBQUksQ0FBQ21YLFFBQUwsQ0FBY25CLFdBQWQsRUFBMkJjLGdCQUEzQjtBQUNELGVBRkQ7QUFHRCxhQVRIO0FBVUQ7OztpQkFFTyxtRUFBdUQ7QUFBQTs7QUFDN0QsZ0JBQUksQ0FBQyxLQUFLRixNQUFOLElBQWdCLEtBQUtJLGFBQXJCLElBQXNDLEtBQUtBLGFBQUwsQ0FBbUI1VixNQUFuQixHQUE0QixDQUF0RSxFQUF5RTtBQUN2RSxrQkFBTWdXLFlBQVksc0JBQU8sS0FBS0osYUFBWixDQUFsQjs7QUFDQTdvQix3QkFBVSxDQUFDLFlBQUs7QUFDZCx1QkFBSSxDQUFDNm9CLGFBQUwsR0FBcUIsSUFBckI7QUFDQTdvQiwwQkFBVSxDQUFDLFlBQUs7QUFDZDtBQUNBLHlCQUFJLENBQUM2b0IsYUFBTCxHQUFxQkksWUFBckI7QUFDQSx5QkFBSSxDQUFDUixNQUFMLEdBQWMsSUFBZDtBQUNELGlCQUpTLEVBSVAsR0FKTyxDQUFWO0FBS0QsZUFQUyxFQU9QLEdBUE8sQ0FBVjtBQVFEO0FBQ0Y7OztpQkFFTyxrQkFBU1osV0FBVCxFQUFtQ2MsZ0JBQW5DLEVBQWdFO0FBQ3RFLGdCQUFJZCxXQUFXLEtBQUssWUFBcEIsRUFBa0M7QUFDaEMsbUJBQUs1VixLQUFMLGdDQUFtQ2lYLG1FQUNqQ1AsZ0JBQWdCLENBQUMsQ0FBRCxDQURpQixFQUVqQ1EsV0FGaUMsRUFBbkM7QUFHRCxhQUpELE1BSU87QUFDTCxtQkFBS2xYLEtBQUwsR0FBYSxvQkFBYjtBQUNEO0FBQ0Y7OztpQkFFRCxpQkFBUW1YLGFBQVIsRUFBbUM7QUFDakMsbUJBQU8sS0FBSzNVLGNBQUwsQ0FBb0I0VSxpQ0FBcEIsQ0FBc0RELGFBQXRELENBQVA7QUFDRDs7O2lCQUVPLG1DQUNOVixPQURNLEVBRU5DLGdCQUZNLEVBRXVCO0FBRTdCLG9CQUFRRCxPQUFSO0FBQ0EsbUJBQUssV0FBTDtBQUNFLHVCQUFPLEtBQUtZLG9CQUFMLEVBQVA7O0FBQ0YsbUJBQUssS0FBTDtBQUNFLHVCQUFPLEtBQUtDLGNBQUwsQ0FBb0JaLGdCQUFwQixDQUFQOztBQUNGLG1CQUFLLFlBQUw7QUFDRSx1QkFBTyxLQUFLYSx1QkFBTCxFQUFQO0FBTkY7QUFRRDs7O2lCQUVPLGdDQUNOQyxFQURNLEVBRU50TSxNQUZNLEVBR051TSxRQUhNLEVBR1c7QUFFakIsbUJBQU9ELEVBQUUsQ0FBQy9uQixHQUFILENBQU8sVUFBQ3lQLElBQUQsRUFBT3dZLEtBQVA7QUFBQSxxQkFBa0I7QUFDOUJ4TSxzQkFBTSxFQUFFd00sS0FBSyxLQUFLLENBQVYsR0FBY3hNLE1BQWQsR0FBdUJ0SyxTQUREO0FBRTlCNlcsd0JBQVEsRUFBRUMsS0FBSyxLQUFLLENBQVYsR0FBY0QsUUFBZCxHQUF5QjdXLFNBRkw7QUFHOUIxQixvQkFBSSxFQUFKQTtBQUg4QixlQUFsQjtBQUFBLGFBQVAsQ0FBUDtBQUtEOzs7aUJBRU8sZ0NBQW9CO0FBQUE7O0FBQzFCLG1CQUFPLHNEQUFjLENBQ25CLEtBQUt5WSwwQkFBTCxFQURtQixFQUVuQixLQUFLQywwQkFBTCxFQUZtQixFQUduQixLQUFLQywwQkFBTCxFQUhtQixDQUFkLEVBSUpqYixJQUpJLENBS0wsc0RBQUk7QUFBQTtBQUFBLGtCQUFFdVMsQ0FBRjtBQUFBLGtCQUFLMkksQ0FBTDtBQUFBLGtCQUFROW1CLENBQVI7O0FBQUEsa0RBQW1CbWUsQ0FBbkIsc0JBQXlCMkksQ0FBekIsc0JBQWdDQSxDQUFDLENBQUM5VyxNQUFGLEdBQVcsQ0FBWCxHQUFlaFEsQ0FBZixHQUFtQixFQUFuRDtBQUFBLGFBQUosQ0FMSyxFQU1MLHNEQUFJLFVBQUM4TCxHQUFELEVBQVE7QUFDVixxQkFBSSxDQUFDUCxNQUFMLENBQVlxRCxHQUFaLENBQWdCLFlBQUs7QUFDbkIsdUJBQUksQ0FBQ2tXLFVBQUwsR0FBa0JoWixHQUFHLENBQUNrRSxNQUFKLEtBQWUsQ0FBakM7QUFDRCxlQUZEO0FBR0QsYUFKRCxDQU5LLENBQVA7QUFZRDs7O2lCQUVPLHNDQUEwQjtBQUFBOztBQUdoQyxtQkFBTyxLQUFLd0IsY0FBTCxDQUFvQjhQLGdDQUFwQixDQUFxRDFWLElBQXJELENBQ0wsc0RBQUksVUFBQ0UsR0FBRDtBQUFBLHFCQUNGLE9BQUksQ0FBQ2liLHNCQUFMLENBQTRCamIsR0FBRyxDQUFDbEQsTUFBaEMsRUFBd0MsNEJBQXhDLENBREU7QUFBQSxhQUFKLENBREssQ0FBUDtBQUtEOzs7aUJBRU8sc0NBQTBCO0FBQUE7O0FBR2hDLG1CQUFPLEtBQUs0SSxjQUFMLENBQW9COFAsZ0NBQXBCLENBQXFEMVYsSUFBckQsQ0FDTCxzREFBSSxVQUFDRSxHQUFEO0FBQUEscUJBQ0YsT0FBSSxDQUFDaWIsc0JBQUwsQ0FBNEJqYixHQUFHLENBQUMwVixVQUFoQyxFQUE0QywwQkFBNUMsQ0FERTtBQUFBLGFBQUosQ0FESyxDQUFQO0FBS0Q7OztpQkFFTyxzQ0FBMEI7QUFBQTs7QUFHaEMsbUJBQU8sS0FBS2hRLGNBQUwsQ0FBb0I4UCxnQ0FBcEIsQ0FBcUQxVixJQUFyRCxDQUNMLHNEQUFJLFVBQUNFLEdBQUQ7QUFBQSxxQkFDRixPQUFJLENBQUNpYixzQkFBTCxDQUNFamIsR0FBRyxDQUFDa2IsTUFBSixDQUFXbE0sTUFBWCxDQUFrQixVQUFDMEwsRUFBRDtBQUFBLHVCQUFRQSxFQUFFLENBQUNTLGNBQUgsRUFBUjtBQUFBLGVBQWxCLENBREYsRUFFRSw2QkFGRixDQURFO0FBQUEsYUFBSixDQURLLENBQVA7QUFRRDs7O2lCQUVPLHdCQUNOdkIsZ0JBRE0sRUFDdUI7QUFBQTs7QUFFN0IsZ0JBQUlBLGdCQUFnQixDQUFDLENBQUQsQ0FBaEIsS0FBd0JPLHVFQUE1QixFQUE0QztBQUMxQyxxQkFBTyxLQUFLaUIscUJBQUwsRUFBUDtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLEtBQUsxVixjQUFMLENBQW9CMlYsc0NBQXBCLENBQTJEdmIsSUFBM0QsQ0FDTCxzREFBSSxVQUFDNGEsRUFBRDtBQUFBLHVCQUNGLE9BQUksQ0FBQ08sc0JBQUwsQ0FBNEJQLEVBQTVCLEVBQWdDLDJCQUFoQyxDQURFO0FBQUEsZUFBSixDQURLLENBQVA7QUFLRDtBQUNGOzs7aUJBRU8saUNBQXFCO0FBRzNCLG1CQUFPLHNEQUFjLENBQ25CLEtBQUtZLGtCQUFMLEVBRG1CLEVBRW5CLEtBQUtDLGtCQUFMLEVBRm1CLENBQWQsRUFHSnpiLElBSEksQ0FHQyxzREFBSTtBQUFBO0FBQUEsa0JBQUV1UyxDQUFGO0FBQUEsa0JBQUsySSxDQUFMOztBQUFBLGtEQUFnQjNJLENBQWhCLHNCQUFzQjJJLENBQXRCO0FBQUEsYUFBSixDQUhELENBQVA7QUFJRDs7O2lCQUVPLDhCQUFrQjtBQUFBOztBQUN4QixtQkFBTyxLQUFLdFYsY0FBTCxDQUFvQjJWLHNDQUFwQixDQUEyRHZiLElBQTNELENBQ0wsc0RBQUksVUFBQzRhLEVBQUQ7QUFBQSxxQkFDRixPQUFJLENBQUNPLHNCQUFMLENBQ0VQLEVBQUUsQ0FBQzFMLE1BQUgsQ0FBVSxVQUFDNU0sSUFBRDtBQUFBLHVCQUFVQSxJQUFJLENBQUNvWixTQUFMLEtBQW1CLEdBQTdCO0FBQUEsZUFBVixDQURGLEVBRUUsd0JBRkYsQ0FERTtBQUFBLGFBQUosQ0FESyxDQUFQO0FBUUQ7OztpQkFFTyw4QkFBa0I7QUFBQTs7QUFDeEIsbUJBQU8sS0FBSzlWLGNBQUwsQ0FBb0IyVixzQ0FBcEIsQ0FBMkR2YixJQUEzRCxDQUNMLHNEQUFJLFVBQUM0YSxFQUFEO0FBQUEscUJBQ0YsT0FBSSxDQUFDTyxzQkFBTCxDQUNFUCxFQUFFLENBQUMxTCxNQUFILENBQVUsVUFBQzVNLElBQUQ7QUFBQSx1QkFBVUEsSUFBSSxDQUFDb1osU0FBTCxLQUFtQixHQUE3QjtBQUFBLGVBQVYsQ0FERixFQUVFLHdCQUZGLEVBR0UsaUNBSEYsQ0FERTtBQUFBLGFBQUosQ0FESyxDQUFQO0FBU0Q7OztpQkFFTyxtQ0FBdUI7QUFBQTs7QUFDN0IsbUJBQU8sS0FBSzlWLGNBQUwsQ0FBb0IrVixtQ0FBcEIsR0FBMEQzYixJQUExRCxDQUNMLHNEQUFJLFVBQUNFLEdBQUQsRUFBUTtBQUNWLHFCQUFJLENBQUNQLE1BQUwsQ0FBWXFELEdBQVosQ0FBZ0IsWUFBSztBQUNuQix1QkFBSSxDQUFDaVcsWUFBTCxHQUFvQi9ZLEdBQUcsQ0FBQ2tFLE1BQUosS0FBZSxDQUFuQztBQUNELGVBRkQ7QUFHRCxhQUpELENBREssRUFNTCxzREFBSSxVQUFDNFYsYUFBRDtBQUFBLHFCQUNGLE9BQUksQ0FBQ21CLHNCQUFMLENBQTRCbkIsYUFBNUIsRUFBMkMseUJBQTNDLENBREU7QUFBQSxhQUFKLENBTkssQ0FBUDtBQVVEOzs7aUJBRUQsb0JBQ0UxWCxJQURGLEVBRUV3WSxLQUZGLEVBR0VjLEtBSEYsRUFHMkM7QUFFekMsbUJBQU90WixJQUFJLENBQUNnTSxNQUFMLEdBQ0g7QUFDQUEsb0JBQU0sRUFBRWhNLElBQUksQ0FBQ2dNLE1BRGI7QUFFQXVNLHNCQUFRLEVBQUV2WSxJQUFJLENBQUN1WSxRQUZmO0FBR0E5UiwwQkFBWSxFQUFFNlMsS0FBSyxDQUFDMUYsSUFBTixDQUNaLFVBQUNELENBQUQ7QUFBQSx1QkFBT0EsQ0FBQyxDQUFDM1QsSUFBRixDQUFPNEQsR0FBUCxDQUFXdkMsU0FBWCxLQUF5QjBXLHNFQUFoQztBQUFBLGVBRFk7QUFIZCxhQURHLEdBUUgsSUFSSjtBQVNEOzs7aUJBRU8sa0JBQ04vWCxJQURNLEVBRU53WSxLQUZNLEVBR05jLEtBSE0sRUFHbUM7QUFFekMsZ0JBQUksS0FBSzVDLFdBQUwsS0FBcUIsV0FBckIsSUFBb0M4QixLQUFLLEtBQUtjLEtBQUssQ0FBQ3hYLE1BQU4sR0FBZSxDQUFqRSxFQUFvRTtBQUNsRSxxQkFBTyxRQUFQO0FBQ0Q7QUFDRjs7O2lCQUVELHlCQUFnQmxDLENBQWhCLEVBQW1CSSxJQUFuQixFQUF5RDtBQUN2RCxtQkFBT0EsSUFBSSxJQUFJQSxJQUFJLENBQUNBLElBQWIsR0FBb0JBLElBQUksQ0FBQ0EsSUFBTCxDQUFVeUksY0FBVixFQUFwQixHQUFpRC9HLFNBQXhEO0FBQ0Q7OztpQkFFRCw0QkFBZ0I7QUFDZCxpQkFBS2lXLFlBQUw7QUFDQSxpQkFBS1AsZ0JBQUwsQ0FBc0JsWixJQUF0QjtBQUNBLGlCQUFLa1osZ0JBQUwsQ0FBc0I5WSxRQUF0QjtBQUNEOzs7aUJBRUQsMkJBQWU7QUFDYixpQkFBS3lZLGtCQUFMLENBQXdCN1ksSUFBeEIsQ0FBNkIsS0FBS3dZLFdBQWxDO0FBQ0Q7Ozs7Ozs7eUJBMVJVTCxrQkFBZUg7QUFBQTs7O2NBQWZHO0FBQWU5WDtBQUFBc0g7QUFBQTtzRUFjWjBULGlIQUF3Qjs7Ozs7Ozs7Ozs7Ozs7QURyQ3hDckQ7O0FBQ0FBOztBQUFvQ0E7QUFBQTtBQUFBLGVBQXlCLGVBQXpCLEVBQXlCO0FBQUEscUJBQWtCaE4scUJBQWxCO0FBQW1DLGFBQTVEOztBQUNsQ2dOOztBQUNFQTs7QUFBV0E7Ozs7QUFBcUNBOztBQUNsREE7O0FBQ0FBOztBQUNFQTs7QUFBV0E7Ozs7QUFBZ0NBOztBQUM3Q0E7O0FBQ0FBOztBQUNFQTs7QUFBV0E7Ozs7QUFBdUNBOztBQUNwREE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQ0FBOztBQWFBQTs7QUFHRkE7O0FBQ0FBOztBQUNBQTs7QUFDQUE7O0FBR0FBOztBQWVBQTs7Ozs7O0FBbkRZQTs7QUFDd0JBOztBQUFBQTs7QUFFckJBOztBQUFBQTs7QUFHQUE7O0FBQUFBOztBQUdBQTs7QUFBQUE7O0FBSVlBOztBQUFBQTs7QUFDSkE7O0FBQUFBLGtHQUFzQixVQUF0QixFQUFzQnZQLEdBQXRCOztBQWFLdVA7O0FBQUFBOzs7Ozs7Ozs7IiwibmFtZXMiOlsiZmFjdG9yeSIsIm9wdGlvbnMiLCJtYXhDbHVzdGVyUmFkaXVzIiwiaWNvbkNyZWF0ZUZ1bmN0aW9uIiwiY2x1c3RlclBhbmUiLCJzcGlkZXJmeU9uTWF4Wm9vbSIsInNob3dDb3ZlcmFnZU9uSG92ZXIiLCJ6b29tVG9Cb3VuZHNPbkNsaWNrIiwic2luZ2xlTWFya2VyTW9kZSIsImRpc2FibGVDbHVzdGVyaW5nQXRab29tIiwicmVtb3ZlT3V0c2lkZVZpc2libGVCb3VuZHMiLCJhbmltYXRlIiwiYW5pbWF0ZUFkZGluZ01hcmtlcnMiLCJzcGlkZXJmeVNoYXBlUG9zaXRpb25zIiwic3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIiLCJzcGlkZXJMZWdQb2x5bGluZU9wdGlvbnMiLCJ3ZWlnaHQiLCJjb2xvciIsIm9wYWNpdHkiLCJjaHVua2VkTG9hZGluZyIsImNodW5rSW50ZXJ2YWwiLCJjaHVua0RlbGF5IiwiY2h1bmtQcm9ncmVzcyIsInBvbHlnb25PcHRpb25zIiwiaW5pdGlhbGl6ZSIsIkwiLCJhZGRMYXllciIsImxheWVyIiwiY3VycmVudFpvb20iLCJ2aXNpYmxlTGF5ZXIiLCJyZW1vdmVMYXllciIsImxhdGxuZyIsImFkZExheWVycyIsIm5wZyIsImNodW5rZWQiLCJsIiwib2Zmc2V0Iiwib3JpZ2luYWxBcnJheSIsIm0iLCJsYXllcnNBcnJheSIsIm90aGVyTWFya2VyIiwiZmciLCJzZXRUaW1lb3V0IiwicHJvY2VzcyIsIm5lZWRzQ2x1c3RlcmluZyIsInJlbW92ZUxheWVycyIsImkiLCJsMiIsImNsZWFyTGF5ZXJzIiwibWFya2VyIiwiZ2V0Qm91bmRzIiwiYm91bmRzIiwiZWFjaExheWVyIiwibmVlZHNSZW1vdmluZyIsInRoaXNOZWVkc1JlbW92aW5nIiwiaiIsIm1ldGhvZCIsImdldExheWVycyIsImxheWVycyIsImdldExheWVyIiwiaWQiLCJyZXN1bHQiLCJoYXNMYXllciIsImFuQXJyYXkiLCJ6b29tVG9TaG93TGF5ZXIiLCJjYWxsYmFjayIsIm9uQWRkIiwib25SZW1vdmUiLCJtYXAiLCJnZXRWaXNpYmxlUGFyZW50Iiwidk1hcmtlciIsIl9hcnJheVNwbGljZSIsIl9yZW1vdmVGcm9tR3JpZFVuY2x1c3RlcmVkIiwiZ3JpZFVuY2x1c3RlcmVkIiwibWluWm9vbSIsInoiLCJfY2hpbGRNYXJrZXJEcmFnU3RhcnQiLCJlIiwiX2NoaWxkTWFya2VyTW92ZWQiLCJfbW92ZUNoaWxkIiwiX2NoaWxkTWFya2VyRHJhZ0VuZCIsIl9yZW1vdmVMYXllciIsIm1hcmtlcnMiLCJjbHVzdGVyIiwiZ3JpZENsdXN0ZXJzIiwiX2lzT3JJc1BhcmVudCIsIm9lbCIsImZpcmUiLCJ0eXBlIiwibGlzdGVucyIsIl9kZWZhdWx0SWNvbkNyZWF0ZUZ1bmN0aW9uIiwiYyIsImh0bWwiLCJjbGFzc05hbWUiLCJpY29uU2l6ZSIsIl9iaW5kRXZlbnRzIiwiX3pvb21PclNwaWRlcmZ5IiwiYm90dG9tQ2x1c3RlciIsIl9zaG93Q292ZXJhZ2UiLCJfaGlkZUNvdmVyYWdlIiwiX3VuYmluZEV2ZW50cyIsIl96b29tRW5kIiwiX21vdmVFbmQiLCJfZ2VuZXJhdGVJbml0aWFsQ2x1c3RlcnMiLCJyYWRpdXMiLCJyYWRpdXNGbiIsIm1heFpvb20iLCJ6b29tIiwiX2FkZExheWVyIiwibWFya2VyUG9pbnQiLCJjbG9zZXN0IiwibGFzdFBhcmVudCIsInBhcmVudCIsIl9yZWZyZXNoQ2x1c3RlcnNJY29ucyIsIl9lbnF1ZXVlIiwiX3Byb2Nlc3NRdWV1ZSIsImNsZWFyVGltZW91dCIsIl9tZXJnZVNwbGl0Q2x1c3RlcnMiLCJfZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzIiwiX2NoZWNrQm91bmRzTWF4TGF0IiwiX2FuaW1hdGlvbkFkZExheWVyTm9uQW5pbWF0ZWQiLCJuZXdDbHVzdGVyIiwiX2V4dHJhY3ROb25Hcm91cExheWVycyIsIm91dHB1dCIsIl9vdmVycmlkZU1hcmtlckljb24iLCJnZXRDaGlsZENvdW50IiwiZ2V0QWxsQ2hpbGRNYXJrZXJzIiwiX21hcEJvdW5kc0luZmluaXRlIiwiX25vQW5pbWF0aW9uIiwiX2FuaW1hdGlvblN0YXJ0IiwiX2FuaW1hdGlvblpvb21JbiIsIl9hbmltYXRpb25ab29tT3V0IiwiX2FuaW1hdGlvbkFkZExheWVyIiwiX3dpdGhBbmltYXRpb24iLCJzdGFydFBvcyIsIm4iLCJtZSIsIl9hbmltYXRpb25ab29tT3V0U2luZ2xlIiwiX2FuaW1hdGlvbkVuZCIsIl9mb3JjZUxheW91dCIsImljb24iLCJwYW5lIiwic3RvcmFnZUFycmF5Iiwiem9vbVRvQm91bmRzIiwiYm91bmRzWm9vbSIsIm1hcFpvb20iLCJuZXdDbHVzdGVycyIsImNoaWxkQ2x1c3RlcnMiLCJfdXBkYXRlSWNvbiIsImNyZWF0ZUljb24iLCJjcmVhdGVTaGFkb3ciLCJfYWRkQ2hpbGQiLCJuZXcxIiwiX3NldENsdXN0ZXJDZW50ZXIiLCJfcmVzZXRCb3VuZHMiLCJfcmVjYWxjdWxhdGVCb3VuZHMiLCJsYXRTdW0iLCJsbmdTdW0iLCJ0b3RhbENvdW50IiwiY2hpbGQiLCJjaGlsZExhdExuZyIsImNoaWxkQ291bnQiLCJfYWRkVG9NYXAiLCJfcmVjdXJzaXZlbHlBbmltYXRlQ2hpbGRyZW5JbiIsImNtIiwiX3JlY3Vyc2l2ZWx5QW5pbWF0ZUNoaWxkcmVuSW5BbmRBZGRTZWxmVG9NYXAiLCJfcmVjdXJzaXZlbHlCZWNvbWVWaXNpYmxlIiwiX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcCIsIm5tIiwiX3JlY3Vyc2l2ZWx5UmVzdG9yZUNoaWxkUG9zaXRpb25zIiwiayIsIl9yZXN0b3JlUG9zaXRpb24iLCJfcmVjdXJzaXZlbHlSZW1vdmVDaGlsZHJlbkZyb21NYXAiLCJfcmVjdXJzaXZlbHkiLCJydW5BdEV2ZXJ5TGV2ZWwiLCJydW5BdEJvdHRvbUxldmVsIiwiX2lzU2luZ2xlUGFyZW50IiwiY2x1c3RlckhpZGUiLCJjbHVzdGVyU2hvdyIsImFkZE9iamVjdCIsInkiLCJncmlkIiwicm93IiwiY2VsbCIsInN0YW1wIiwidXBkYXRlT2JqZWN0IiwicmVtb3ZlT2JqZWN0IiwibGVuIiwiZWFjaE9iamVjdCIsInJlbW92ZWQiLCJnZXROZWFyT2JqZWN0Iiwib2JqIiwiZGlzdCIsIm9iamVjdFBvaW50IiwiY2xvc2VzdERpc3RTcSIsIl9nZXRDb29yZCIsIl9zcURpc3QiLCJkeSIsImdldERpc3RhbnQiLCJ2WCIsImZpbmRNb3N0RGlzdGFudFBvaW50RnJvbUJhc2VMaW5lIiwibWF4UHQiLCJuZXdQb2ludHMiLCJwdCIsImQiLCJtYXhEIiwibWF4UG9pbnQiLCJidWlsZENvbnZleEh1bGwiLCJ0IiwiY29udmV4SHVsbEJhc2VMaW5lcyIsImdldENvbnZleEh1bGwiLCJtYXhMbmciLCJtaW5MbmciLCJtYXhMYXRQdCIsIm1pbkxhdFB0IiwibWF4TG5nUHQiLCJtaW5MbmdQdCIsIm1pblB0IiwibWF4TGF0IiwibWluTGF0IiwicG9pbnRzIiwicCIsIl8yUEkiLCJfY2lyY2xlRm9vdFNlcGFyYXRpb24iLCJfY2lyY2xlU3RhcnRBbmdsZSIsIl9zcGlyYWxGb290U2VwYXJhdGlvbiIsIl9zcGlyYWxMZW5ndGhTdGFydCIsIl9zcGlyYWxMZW5ndGhGYWN0b3IiLCJfY2lyY2xlU3BpcmFsU3dpdGNob3ZlciIsInNwaWRlcmZ5IiwiZ3JvdXAiLCJjZW50ZXIiLCJwb3NpdGlvbnMiLCJ1bnNwaWRlcmZ5IiwiX2dlbmVyYXRlUG9pbnRzQ2lyY2xlIiwibGVnTGVuZ3RoIiwiYW5nbGVTdGVwIiwicmVzIiwiYW5nbGUiLCJfZ2VuZXJhdGVQb2ludHNTcGlyYWwiLCJzZXBhcmF0aW9uIiwibGVuZ3RoRmFjdG9yIiwiX25vYW5pbWF0aW9uVW5zcGlkZXJmeSIsImNoaWxkTWFya2VycyIsIl9hbmltYXRpb25TcGlkZXJmeSIsImxlZ09wdGlvbnMiLCJsZWciLCJuZXdQb3MiLCJfYW5pbWF0aW9uVW5zcGlkZXJmeSIsInRoaXNMYXllckxhdExuZyIsInRoaXNMYXllclBvcyIsInN2ZyIsImZpbmFsTGVnT3BhY2l0eSIsImxlZ1BhdGgiLCJub25BbmltYXRhYmxlIiwic3RpbGxUaGVyZUNoaWxkQ291bnQiLCJfc3BpZGVyZmllZCIsIl9zcGlkZXJmaWVyT25BZGQiLCJfc3BpZGVyZmllck9uUmVtb3ZlIiwiX3Vuc3BpZGVyZnlab29tU3RhcnQiLCJfdW5zcGlkZXJmeVpvb21BbmltIiwiX3Vuc3BpZGVyZnlXcmFwcGVyIiwiX3Vuc3BpZGVyZnkiLCJfdW5zcGlkZXJmeUxheWVyIiwicmVmcmVzaENsdXN0ZXJzIiwiX2ZsYWdQYXJlbnRzSWNvbnNOZWVkVXBkYXRlIiwiX3JlZnJlc2hTaW5nbGVNYXJrZXJNb2RlTWFya2VycyIsInJlZnJlc2hJY29uT3B0aW9ucyIsImV4cG9ydHMiLCJPYmplY3QiLCJ2YWx1ZSIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsIkNvYWNoTWFya3NDb21wb25lbnQiLCJ1c2VyU2V0dGluZ1NlcnZpY2UiLCJuZ1pvbmUiLCJyeGpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJzaG93Q29hY2hNYXJrcyQiLCJnZXRTaG93R2VvU2VsZWN0T2JzZXJ2YWJsZSIsImhpZGVTdWJqZWN0IiwicGlwZSIsIm5nRGVzdHJveSQiLCJ2YWwiLCJzdWJzY3JpYmUiLCJpc09wZW4iLCJ1c2VyU2V0dGluZyQiLCJ1cyIsInNob3dHZW9TZWxlY3RJbmZvIiwibmV4dCIsInRvUHJvbWlzZSIsImN1cnJlbnRTZXR0aW5ncyIsInNhdmVVc2VyU2V0dGluZ3MiLCJjb21wbGV0ZSIsInNlbGVjdG9ycyIsImRlY2xzIiwidmFycyIsImNvbnN0cyIsInRlbXBsYXRlIiwiX2NvcmVfYW5pbWF0aW9uc19jdXN0b21fYW5pbWF0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV84X18iLCJjdHhfcjIiLCJNYXBJdGVtQmFyQ29tcG9uZW50IiwiZ2VvUG9zaXRpb25TZXJ2aWNlIiwiaGVscGVyIiwidHJhbnNsYXRlU2VydmljZSIsInJvdXRlciIsInpvbmUiLCJ2aXNpYmxlIiwiX2lzVmlzaWJsZSIsInJ4anNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzlfXyIsImFzT2JzZXJ2YWJsZSIsInN1YnNjcmlwdGlvbiIsImFwcE1vZGVMYW5ndWFnZUFuZEN1cnJlbnRHZW9IYXphcmQkIiwiYXBwTW9kZSIsIl8iLCJfXyIsImhpZGUiLCJ1bnN1YnNjcmliZSIsIml0ZW0iLCJhbGxSZWdpc3RyYXRpb25OYW1lcyIsIlN1bW1hcmllcyIsInJlZ2lzdHJhdGlvbiIsIlJlZ2lzdHJhdGlvbk5hbWUiLCJ1bmlxdWVWYWx1ZXMiLCJBcnJheSIsImZyb20iLCJTZXQiLCJqb2luIiwicnVuIiwiUmVnSWQiLCJ0b3BIZWFkZXIiLCJEdE9ic1RpbWUiLCJ0aXRsZSIsImdldFRpdGxlIiwibmFtZSIsIk9ic2VydmVyIiwiTmlja05hbWUiLCJjb21wZXRlbmNlTGV2ZWwiLCJDb21wZXRlbmNlTGV2ZWxOYW1lIiwiZ2VvSGF6YXJkIiwiR2VvSGF6YXJkVElEIiwibWFzbCIsIk9ic0xvY2F0aW9uIiwiSGVpZ2h0IiwidW5kZWZpbmVkIiwic2V0RGlzdGFuY2VBbmRUeXBlIiwiaW1hZ2VVcmxzIiwiQXR0YWNobWVudHMiLCJsZW5ndGgiLCJhdHRhY2htZW50IiwiZ2V0SW1hZ2VVcmwiLCJwdWJsaXNoQ2hhbmdlIiwic2l6ZSIsIlVybEZvcm1hdHMiLCJuYXZpZ2F0ZUJ5VXJsIiwiZGlzdGFuY2VBbmRUeXBlIiwiZ2V0IiwidHJhbnNsYXRpb25zIiwiY3VycmVudFBvc2l0aW9uJCIsImN1cnJlbnRQb3NpdGlvbiIsImRpc3RhbmNlIiwibGVhZmxldF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiTGF0aXR1ZGUiLCJMb25naXR1ZGUiLCJkaXN0YW5jZVRvIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJHZW9IYXphcmROYW1lIiwidG9Mb3dlckNhc2UiLCJnZXREaXN0YW5jZVRleHQiLCJXYXJuaW5nR3JvdXBGYXZvdXJpdGVUb2dnbGVDb21wb25lbnQiLCJ3YXJuaW5nU2VydmljZSIsImRvbUN0cmwiLCJyZW5kZXJlciIsInRvYXN0Q29udHJvbGxlciIsImNoYW5nZXMiLCJjdXJyZW50S2V5Iiwia2V5IiwiY3VycmVudFZhbHVlIiwiX2xhc3RLZXkiLCJncm91cElkIiwic3RhcnRTdWJzY3JpcHRpb24iLCJ3YXJuaW5nSXNGYXZvdXJpdGVTdWJzY3JpcHRpb24iLCJnZXRJc0Zhdm91cml0ZU9ic2VydmFibGUiLCJpc0Zhdm91cml0ZSIsIm9wZW5BbW91bnQiLCJzY2FsZUFtb3VudCIsInNjYWxlIiwid3JpdGUiLCJzZXRTdHlsZSIsImlvbkljb24iLCJlbCIsInJlbW92ZUZyb21GYXZvdXJpdGUiLCJ0aGVuIiwicHJlc2VudFRvYXN0IiwiYWRkVG9GYXZvdXJpdGUiLCJhZGRlZCIsInRyYW5zbGF0aW9uIiwiY3JlYXRlIiwibWVzc2FnZSIsImdyb3VwTmFtZSIsIm1vZGUiLCJkdXJhdGlvbiIsImJ1dHRvbnMiLCJ0ZXh0Iiwicm9sZSIsImhhbmRsZXIiLCJ0b2FzdCIsInByZXNlbnQiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJ2aWV3UXVlcnkiLCJfaW9uaWNfYW5ndWxhcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiV2FybmluZ0xpc3RIZWFkZXJDb21wb25lbnQiLCJwbGF0Zm9ybSIsImlzIiwiZGF5c1RvQWRkIiwibW9tZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19fZGVmYXVsdCIsImFkZCIsImRheSIsImlucHV0cyIsInN1YlRpdGxlIiwic2hvd0RheU5hbWVzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTJfXyIsIl9yMiIsIldhcm5pbmdMaXN0SXRlbUNvbXBvbmVudCIsImV4dGVybmFsTGlua1NlcnZpY2UiLCJhbmFseXRpY1NlcnZpY2UiLCJfdmFyc29tX3JlZ29ic19jb21tb25fY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTNfXyIsInJ4anNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzE0X18iLCJkcmFnU3ViamVjdCIsImdldE9wZW5BbW91bnQiLCJmYXZvdXJpdGVUb2dnbGUiLCJzZXRPcGVuIiwiaXRlbVNsaWRlIiwiY2xvc2UiLCJ0b2dnbGUiLCJ0b2dnbGVGYXZvdXJpdGUiLCJ1cmwiLCJsYW5ndWFnZSQiLCJjdXJyZW50TGFuZyIsInN1cHBvcnRlZExhbmciLCJnZXRTdXBwb3J0ZWRMYW5nT3JGYWxsYmFja1RvRW4iLCJfc2V0dGluZ3NfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIndlYlVybCIsImVuY29kZVVSSSIsInJlcGxhY2UiLCJsYW5nIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImdldFVybCIsInRyYWNrRXZlbnQiLCJfbW9kdWxlc19hbmFseXRpY3NfZW51bXNfYXBwX2V2ZW50X2NhdGVnb3J5X2VudW1fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsIl9tb2R1bGVzX2FuYWx5dGljc19lbnVtc19hcHBfZXZlbnRfYWN0aW9uX2VudW1fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyIsImdldEtleUFzU3RyaW5nIiwib3BlbkV4dGVybmFsTGluayIsImRhdGVTdHJpbmciLCJtb21lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfX19kZWZhdWx0Iiwic3RhcnRPZiIsImZvcm1hdCIsIl9jb3JlX2hlbHBlcnNfb2JzZXJ2YWJsZV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzlfXyIsIl9pb25pY19hbmd1bGFyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yNF9fIiwiX3dhcm5pbmdfZ3JvdXBfZmF2b3VyaXRlX3RvZ2dsZV93YXJuaW5nX2dyb3VwX2Zhdm91cml0ZV90b2dnbGVfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJjdHgiLCJNYXBJdGVtTWFya2VyIiwiX2l0ZW0iLCJ1cGRhdGVJY29uIiwiX2lzU2VsZWN0ZWQiLCJzZXRJY29uIiwiX21vZHVsZXNfbWFwX2NvcmVfY2xhc3Nlc19yZWdvYnNfZ2VvaGF6YXJkX21hcmtlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiUm91dGVyUGFnZSIsInJvdXRlIiwicnhqc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiZXZlbnRzIiwibmdVbnN1YnNjcmliZSIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXRlY3RFbnRlck9yTGVhdmUiLCJwYXRoIiwiY29tcG9uZW50IiwiaXNBY3RpdmUiLCJmb3JFYWNoIiwic3MiLCJpc0NvbXBvbmVudEFjdGl2ZSIsImNoaWxkcmVuIiwiaXNBY3RpdmVOb3ciLCJyb3V0ZXJTdGF0ZSIsInNuYXBzaG90Iiwicm9vdCIsInBhdGhGcm9tUm9vdCIsIm9uRW50ZXIiLCJvbkxlYXZlIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fIiwiQUxMT1dfQU5BTFlUSUNTX0hFQURFUiIsIkFMTE9XX0FOQUxZVElDU19ERVNDUklQVElPTiIsIkFMTE9XX0FOQUxZVElDU19ERVNDUklQVElPTl9MSU5FXzIiLCJSRUFEX01PUkVfVEVYVCIsIk9LIiwiTk9fVEhBTktTIiwiVXNhZ2VBbmFseXRpY3NDb25zZW50U2VydmljZSIsImFsZXJ0Q29udHJvbGxlciIsInVzZXJTZXR0aW5ncyIsImNvbnNlbnRGb3JTZW5kaW5nQW5hbHl0aWNzRGlhbG9nQ29tcGxldGVkIiwic2hvd0NvbnNlbnRGb3JTZW5kaW5nQW5hbHl0aWNzRGlhbG9nIiwiY3NzQ2xhc3MiLCJidXR0b25PSyIsInNhdmVTZXR0aW5ncyIsImJ1dHRvbk5vIiwiaGVhZGVyIiwiYmFja2Ryb3BEaXNtaXNzIiwiYWxlcnQiLCJhY2NlcHRlZCIsImNvbnNlbnRGb3JTZW5kaW5nQW5hbHl0aWNzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwicHJvdmlkZWRJbiIsIkRhdGFMb2FkQ29tcG9uZW50IiwiZGF0YUxvYWRTZXJ2aWNlIiwiZGF0YUxvYWQiLCJpZHMiLCJnZXRTdGF0ZUFzT2JzZXJ2YWJsZSIsImZpbHRlciIsImlzTG9hZGluZyIsInNpbXBsZSIsImZlYXR1cmVzIiwiRGF0YUxvYWRNb2R1bGUiLCJfYW5ndWxhcl9jb21tb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9pb25pY19hbmd1bGFyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJfbmd4X3RyYW5zbGF0ZV9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJkZWNsYXJhdGlvbnMiLCJfY29tcG9uZW50c19kYXRhX2xvYWRfZGF0YV9sb2FkX2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiaW1wb3J0cyIsIkxlYWZsZXRDbHVzdGVySGVscGVyIiwiZGVmYXVsdE9wdGlvbnMiLCJfc2V0dGluZ3NfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsImNyZWF0ZUNsdXN0ZXJJY29uIiwiaWNvbkFuY2hvciIsIkhvbWVQYWdlTW9kdWxlIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJfaG9tZV9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJfbW9kdWxlc19zaGFyZWRfc2hhcmVkX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX21vZHVsZXNfZGF0YV9sb2FkX2RhdGFfbG9hZF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIl9tb2R1bGVzX21hcF9tYXBfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJfY29tcG9uZW50c19tYXBfaXRlbV9iYXJfbWFwX2l0ZW1fYmFyX2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTlfXyIsIkRFQlVHX1RBRyIsIkhvbWVQYWdlIiwib2JzZXJ2YXRpb25TZXJ2aWNlIiwiZnVsbHNjcmVlblNlcnZpY2UiLCJsb2dnaW5nU2VydmljZSIsInVzYWdlQW5hbHl0aWNzQ29uc2VudFNlcnZpY2UiLCJkb2N1bWVudCIsIl9tb2R1bGVzX21hcF9oZWxwZXJzX2xlYWZsZXRfY2x1c2VyX2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOV9fIiwicnhqc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMjBfXyIsIm1hcENlbnRlckluZm9IZWlnaHQiLCJuZXdJbmZvQm94SGVpZ2h0IiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsInVwZGF0ZUluZm9Cb3hIZWlnaHQiLCJmdWxsc2NyZWVuJCIsImlzRnVsbHNjcmVlbiQiLCJkYXRhTG9hZElkcyQiLCJkYXRhTG9hZCQiLCJjaGVja0ZvckZpcnN0U3RhcnR1cCIsImdlb0NvYWNoTWFya3NDbG9zZWRTdWJqZWN0Iiwic2hvd1VzYWdlQW5hbHl0aWNzRGlhbG9nIiwiY2hlY2tVc2VyRGF0YUNvbnNlbnREaWFsb2ciLCJtYXBDb21wb25lbnQiLCJjb21wb25lbnRJc0FjdGl2ZSIsImxlYWZsZXRNYXAiLCJtYXJrZXJMYXllciIsImFkZFRvIiwib24iLCJhIiwiZ3JvdXBMYXRMbmciLCJnZXRab29tIiwibmV3Wm9vbSIsIl9zZXR0aW5nc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTBfXyIsInNldFZpZXciLCJNYXRoIiwibWluIiwic2VsZWN0ZWRNYXJrZXIiLCJkZXNlbGVjdCIsIm1hcEl0ZW1CYXIiLCJvYnNlcnZhdGlvbk9ic2VydmFibGUiLCJvYnNlcnZhdGlvbnMkIiwic2hvd09ic2VydmF0aW9ucyQiLCJyZWdPYnNlcnZhdGlvbnMiLCJzaG93T2JzZXJ2YXRpb25zIiwicmVkcmF3T2JzZXJ2YXRpb25NYXJrZXJzIiwiZGVidWciLCJyZWdPYnNlcnZhdGlvbiIsImxhdExuZyIsIl9jb3JlX2hlbHBlcnNfbGVhZmxldF9tYXBfaXRlbV9tYXJrZXJfbWFwX2l0ZW1fbWFya2VyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJ0YXJnZXQiLCJzZXRTZWxlY3RlZCIsInNob3ciLCJtYXBDZW50ZXJFbGVtZW50IiwibWFwQ2VudGVyIiwiX2EiLCJuYXRpdmVFbGVtZW50IiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiX2NvcmVfaGVscGVyc19yb3V0ZWRfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTJfXyIsIl9hbmd1bGFyX2NvbW1vbl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMzBfXyIsIl9jb21wb25lbnRzX21hcF9pdGVtX2Jhcl9tYXBfaXRlbV9iYXJfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJfbW9kdWxlc19tYXBfY29tcG9uZW50c19tYXBfbWFwX2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fIiwic3JjX2FwcF9tb2R1bGVzX21hcF9jb21wb25lbnRzX21hcF9jZW50ZXJfaW5mb19tYXBfY2VudGVyX2luZm9fY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xNF9fIiwiVGFic1BhZ2VNb2R1bGUiLCJfdGFic19yb3V0ZXJfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJfaG9tZV9ob21lX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX3RyaXBfdHJpcF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIl93YXJuaW5nX2xpc3Rfd2FybmluZ19saXN0X21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiX29ic2VydmF0aW9uX2xpc3Rfb2JzZXJ2YXRpb25fbGlzdF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsIl9tb2R1bGVzX3NoYXJlZF9zaGFyZWRfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJfdGFic19wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfY29tcG9uZW50c19jb2FjaF9tYXJrc19jb2FjaF9tYXJrc19jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsIlRhYnNQYWdlIiwiaXNJb3MiLCJpc0FuZHJvaWQiLCJ3YXJuaW5nc0luVmlldyIsIm1heFdhcm5pbmciLCJoYXNFbWVyZ2VuY3lXYXJuaW5nIiwid2FybmluZ0dyb3VwSW5NYXBWaWV3U3Vic2NyaXB0aW9uIiwid2FybmluZ0dyb3VwSW5NYXBWaWV3T2JzZXJ2YWJsZSQiLCJhbGxXYXJuaW5ncyIsInZpZXdCb3VuZHMiLCJhbGxNYXhXYXJuaW5ncyIsImciLCJnZXRNYXhXYXJuaW5nIiwibWF4IiwieCIsInNvbWUiLCJoYXNXYXJuaW5nIiwiY291bnQiLCJ0b1N0cmluZyIsImN1cnJlbnRHZW9IYXphcmRTdWJzY3JpcHRpb24iLCJjdXJyZW50R2VvSGF6YXJkJCIsInNob3dUcmlwcyIsImluZGV4T2YiLCJfdmFyc29tX3JlZ29ic19jb21tb25fY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fIiwicm91dGVzIiwiX3RhYnNfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiY2FuQWN0aXZhdGUiLCJfY29yZV9ndWFyZHNfc3RhcnRfd2l6YXJkX2d1YXJkX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJyZWRpcmVjdFRvIiwicGF0aE1hdGNoIiwibG9hZENoaWxkcmVuIiwiVHJpcFBhZ2VNb2R1bGUiLCJPYnNlcnZhdGlvbkxpc3RQYWdlTW9kdWxlIiwiV2FybmluZ0xpc3RQYWdlTW9kdWxlIiwiVGFic1BhZ2VSb3V0aW5nTW9kdWxlIiwiX3RyaXBfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiX2FuZ3VsYXJfZm9ybXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fIiwiX25neF90cmFuc2xhdGVfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fIiwiVHJpcFBhZ2UiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJBYm9ubmVyQmFubmVyQ29tcG9uZW50IiwiX3dhcm5pbmdfbGlzdF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJfYW5ndWxhcl9jb21tb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsIl9hbmd1bGFyX2Zvcm1zX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV84X18iLCJfaW9uaWNfYW5ndWxhcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOV9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMF9fIiwiX25neF90cmFuc2xhdGVfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTFfXyIsIl9tb2R1bGVzX3NoYXJlZF9zaGFyZWRfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfY29tcG9uZW50c193YXJuaW5nX2xpc3RfaGVhZGVyX3dhcm5pbmdfbGlzdF9oZWFkZXJfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfY29tcG9uZW50c193YXJuaW5nX2xpc3RfaXRlbV93YXJuaW5nX2xpc3RfaXRlbV9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIl9jb21wb25lbnRzX3dhcm5pbmdfZ3JvdXBfZmF2b3VyaXRlX3RvZ2dsZV93YXJuaW5nX2dyb3VwX2Zhdm91cml0ZV90b2dnbGVfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJfYWJvbm5lcl9iYW5uZXJfYWJvbm5lcl9iYW5uZXJfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJoZWFkZXJfcjExIiwiY3R4X3IwIiwiV2FybmluZ0xpc3RQYWdlIiwicmVmcmVzaCIsImJpbmQiLCJ0cmFja0J5SW50ZXJuYWwiLCJmb290ZXJGbiIsInNlbGVjdGVkVGFiIiwibm9GYXZvdXJpdGVzIiwibm9SZWxldmFudCIsInNob3dOb0Zhdm91cml0ZXMiLCJzaG93Tm9SZWxldmFudEVtcHR5U3RhdGUiLCJzZWdtZW50UGFnZVN1YmplY3QiLCJyeGpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMF9fIiwic2VnbWVudFBhZ2VPYnNlcnZhYmxlIiwid2FybmluZ0xpc3RJdGVtcyIsInRvQXJyYXkiLCJuZ0Rlc3Ryb3lTdWJqZWN0Iiwicnhqc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTFfXyIsImxvYWRlZCIsInNlZ21lbnQiLCJjdXJyZW50R2VvSGF6YXJkIiwiZ2V0V2FybmluZ0dyb3VwT2JzZXJ2YWJsZSIsIndhcm5pbmdHcm91cHMiLCJjbG9zZUFsbE9wZW4iLCJoYWNrVG9TaG93VmlydHVhbFNjcm9sbEl0ZW1zVGhhdElzTm90VmlzaWJsZUF0Rmlyc3RMb2FkIiwic2V0VGl0bGUiLCJjdXJyZW50SXRlbXMiLCJfdmFyc29tX3JlZ29ic19jb21tb25fY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTVfXyIsInRvVXBwZXJDYXNlIiwiY2FuY2VsUHJvbWlzZSIsInVwZGF0ZVdhcm5pbmdzRm9yQ3VycmVudEdlb0hhemFyZCIsImdldFdhcm5pbmdzSW5NYXBWaWV3IiwiZ2V0QWxsV2FybmluZ3MiLCJnZXRGYXZvdXJpdGVzT2JzZXJ2YWJsZSIsIndnIiwiaW5mb1RleHQiLCJpbmRleCIsImdldFdhcm5pbmdzSW5NYXBWaWV3Q2VudGVyIiwiZ2V0V2FybmluZ3NJbk1hcFZpZXdCb3VuZHMiLCJnZXRXYXJuaW5nc0luTWFwVmlld0J1ZmZlciIsImIiLCJtYXBUb1ZpcnR1YWxTY3JvbGxJdGVtIiwiYnVmZmVyIiwiaGFzQW55V2FybmluZ3MiLCJnZXRTbm93UmVnaW9uV2FybmluZ3MiLCJ3YXJuaW5nc0ZvckN1cnJlbnRHZW9IYXphcmRPYnNlcnZhYmxlJCIsImdldEFSZWdpb25XYXJuaW5ncyIsImdldEJSZWdpb25XYXJuaW5ncyIsImdyb3VwVHlwZSIsImdldFdhcm5pbmdHcm91cEZhdm91cml0ZXNPYnNlcnZhYmxlIiwiaXRlbXMiLCJfY29tcG9uZW50c193YXJuaW5nX2xpc3RfaXRlbV93YXJuaW5nX2xpc3RfaXRlbV9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL2xlYWZsZXQubWFya2VyY2x1c3Rlci9kaXN0L2xlYWZsZXQubWFya2VyY2x1c3Rlci1zcmMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvY29tcG9uZW50cy9jb2FjaC1tYXJrcy9jb2FjaC1tYXJrcy5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb21wb25lbnRzL2NvYWNoLW1hcmtzL2NvYWNoLW1hcmtzLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb21wb25lbnRzL21hcC1pdGVtLWJhci9tYXAtaXRlbS1iYXIuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvY29tcG9uZW50cy9tYXAtaXRlbS1iYXIvbWFwLWl0ZW0tYmFyLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb21wb25lbnRzL3dhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS93YXJuaW5nLWdyb3VwLWZhdm91cml0ZS10b2dnbGUuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL2NvbXBvbmVudHMvd2FybmluZy1ncm91cC1mYXZvdXJpdGUtdG9nZ2xlL3dhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb21wb25lbnRzL3dhcm5pbmctbGlzdC1oZWFkZXIvd2FybmluZy1saXN0LWhlYWRlci5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb21wb25lbnRzL3dhcm5pbmctbGlzdC1oZWFkZXIvd2FybmluZy1saXN0LWhlYWRlci5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvY29tcG9uZW50cy93YXJuaW5nLWxpc3QtaXRlbS93YXJuaW5nLWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb21wb25lbnRzL3dhcm5pbmctbGlzdC1pdGVtL3dhcm5pbmctbGlzdC1pdGVtLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb3JlL2hlbHBlcnMvbGVhZmxldC9tYXAtaXRlbS1tYXJrZXIvbWFwLWl0ZW0tbWFya2VyLnRzIiwid2VicGFjazovLy9zcmMvYXBwL2NvcmUvaGVscGVycy9yb3V0ZWQtcGFnZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9jb3JlL3NlcnZpY2VzL3VzYWdlLWFuYWx5dGljcy1jb25zZW50L3VzYWdlLWFuYWx5dGljcy1jb25zZW50LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9kYXRhLWxvYWQvY29tcG9uZW50cy9kYXRhLWxvYWQvZGF0YS1sb2FkLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvZGF0YS1sb2FkL2NvbXBvbmVudHMvZGF0YS1sb2FkL2RhdGEtbG9hZC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9kYXRhLWxvYWQvZGF0YS1sb2FkLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL21hcC9oZWxwZXJzL2xlYWZsZXQtY2x1c2VyLmhlbHBlci50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9ob21lL2hvbWUubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL2hvbWUvaG9tZS5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvaG9tZS9ob21lLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvdGFicy90YWJzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy90YWJzL3RhYnMucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3RhYnMvdGFicy5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3RhYnMvdGFicy5yb3V0ZXIubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3RyaXAvdHJpcC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvdHJpcC90cmlwLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvdHJpcC90cmlwLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy93YXJuaW5nLWxpc3QvYWJvbm5lci1iYW5uZXIvYWJvbm5lci1iYW5uZXIuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3dhcm5pbmctbGlzdC9hYm9ubmVyLWJhbm5lci9hYm9ubmVyLWJhbm5lci5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy93YXJuaW5nLWxpc3Qvd2FybmluZy1saXN0Lm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy93YXJuaW5nLWxpc3Qvd2FybmluZy1saXN0LnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy93YXJuaW5nLWxpc3Qvd2FybmluZy1saXN0LnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIExlYWZsZXQubWFya2VyY2x1c3RlciAxLjUuMSttYXN0ZXIuMDFlNzRlYyxcbiAqIFByb3ZpZGVzIEJlYXV0aWZ1bCBBbmltYXRlZCBNYXJrZXIgQ2x1c3RlcmluZyBmdW5jdGlvbmFsaXR5IGZvciBMZWFmbGV0LCBhIEpTIGxpYnJhcnkgZm9yIGludGVyYWN0aXZlIG1hcHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0Lm1hcmtlcmNsdXN0ZXJcbiAqIChjKSAyMDEyLTIwMTcsIERhdmUgTGVhdmVyLCBzbWFydHJha1xuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZmFjdG9yeSgoZ2xvYmFsLkxlYWZsZXQgPSBnbG9iYWwuTGVhZmxldCB8fCB7fSwgZ2xvYmFsLkxlYWZsZXQubWFya2VyY2x1c3RlciA9IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cblx0Lypcblx0ICogTC5NYXJrZXJDbHVzdGVyR3JvdXAgZXh0ZW5kcyBMLkZlYXR1cmVHcm91cCBieSBjbHVzdGVyaW5nIHRoZSBtYXJrZXJzIGNvbnRhaW5lZCB3aXRoaW5cblx0ICovXG5cblx0dmFyIE1hcmtlckNsdXN0ZXJHcm91cCA9IEwuTWFya2VyQ2x1c3Rlckdyb3VwID0gTC5GZWF0dXJlR3JvdXAuZXh0ZW5kKHtcblxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdG1heENsdXN0ZXJSYWRpdXM6IDgwLCAvL0EgY2x1c3RlciB3aWxsIGNvdmVyIGF0IG1vc3QgdGhpcyBtYW55IHBpeGVscyBmcm9tIGl0cyBjZW50ZXJcblx0XHRcdGljb25DcmVhdGVGdW5jdGlvbjogbnVsbCxcblx0XHRcdGNsdXN0ZXJQYW5lOiBMLk1hcmtlci5wcm90b3R5cGUub3B0aW9ucy5wYW5lLFxuXG5cdFx0XHRzcGlkZXJmeU9uTWF4Wm9vbTogdHJ1ZSxcblx0XHRcdHNob3dDb3ZlcmFnZU9uSG92ZXI6IHRydWUsXG5cdFx0XHR6b29tVG9Cb3VuZHNPbkNsaWNrOiB0cnVlLFxuXHRcdFx0c2luZ2xlTWFya2VyTW9kZTogZmFsc2UsXG5cblx0XHRcdGRpc2FibGVDbHVzdGVyaW5nQXRab29tOiBudWxsLFxuXG5cdFx0XHQvLyBTZXR0aW5nIHRoaXMgdG8gZmFsc2UgcHJldmVudHMgdGhlIHJlbW92YWwgb2YgYW55IGNsdXN0ZXJzIG91dHNpZGUgb2YgdGhlIHZpZXdwb2ludCwgd2hpY2hcblx0XHRcdC8vIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy5cblx0XHRcdHJlbW92ZU91dHNpZGVWaXNpYmxlQm91bmRzOiB0cnVlLFxuXG5cdFx0XHQvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSBhbGwgYW5pbWF0aW9ucyAoem9vbSBhbmQgc3BpZGVyZnkpLlxuXHRcdFx0Ly8gSWYgZmFsc2UsIG9wdGlvbiBhbmltYXRlQWRkaW5nTWFya2VycyBiZWxvdyBoYXMgbm8gZWZmZWN0LlxuXHRcdFx0Ly8gSWYgTC5Eb21VdGlsLlRSQU5TSVRJT04gaXMgZmFsc3ksIHRoaXMgb3B0aW9uIGhhcyBubyBlZmZlY3QuXG5cdFx0XHRhbmltYXRlOiB0cnVlLFxuXG5cdFx0XHQvL1doZXRoZXIgdG8gYW5pbWF0ZSBhZGRpbmcgbWFya2VycyBhZnRlciBhZGRpbmcgdGhlIE1hcmtlckNsdXN0ZXJHcm91cCB0byB0aGUgbWFwXG5cdFx0XHQvLyBJZiB5b3UgYXJlIGFkZGluZyBpbmRpdmlkdWFsIG1hcmtlcnMgc2V0IHRvIHRydWUsIGlmIGFkZGluZyBidWxrIG1hcmtlcnMgbGVhdmUgZmFsc2UgZm9yIG1hc3NpdmUgcGVyZm9ybWFuY2UgZ2FpbnMuXG5cdFx0XHRhbmltYXRlQWRkaW5nTWFya2VyczogZmFsc2UsXG5cblx0XHRcdC8vIE1ha2UgaXQgcG9zc2libGUgdG8gcHJvdmlkZSBjdXN0b20gZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHNwaWRlcmZ5IHNoYXBlIHBvc2l0aW9uc1xuXHRcdFx0c3BpZGVyZnlTaGFwZVBvc2l0aW9uczogbnVsbCxcblxuXHRcdFx0Ly9JbmNyZWFzZSB0byBpbmNyZWFzZSB0aGUgZGlzdGFuY2UgYXdheSB0aGF0IHNwaWRlcmZpZWQgbWFya2VycyBhcHBlYXIgZnJvbSB0aGUgY2VudGVyXG5cdFx0XHRzcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllcjogMSxcblxuXHRcdFx0Ly8gTWFrZSBpdCBwb3NzaWJsZSB0byBzcGVjaWZ5IGEgcG9seWxpbmUgb3B0aW9ucyBvbiBhIHNwaWRlciBsZWdcblx0XHRcdHNwaWRlckxlZ1BvbHlsaW5lT3B0aW9uczogeyB3ZWlnaHQ6IDEuNSwgY29sb3I6ICcjMjIyJywgb3BhY2l0eTogMC41IH0sXG5cblx0XHRcdC8vIFdoZW4gYnVsayBhZGRpbmcgbGF5ZXJzLCBhZGRzIG1hcmtlcnMgaW4gY2h1bmtzLiBNZWFucyBhZGRMYXllcnMgbWF5IG5vdCBhZGQgYWxsIHRoZSBsYXllcnMgaW4gdGhlIGNhbGwsIG90aGVycyB3aWxsIGJlIGxvYWRlZCBkdXJpbmcgc2V0VGltZW91dHNcblx0XHRcdGNodW5rZWRMb2FkaW5nOiBmYWxzZSxcblx0XHRcdGNodW5rSW50ZXJ2YWw6IDIwMCwgLy8gcHJvY2VzcyBtYXJrZXJzIGZvciBhIG1heGltdW0gb2YgfiBuIG1pbGxpc2Vjb25kcyAodGhlbiB0cmlnZ2VyIHRoZSBjaHVua1Byb2dyZXNzIGNhbGxiYWNrKVxuXHRcdFx0Y2h1bmtEZWxheTogNTAsIC8vIGF0IHRoZSBlbmQgb2YgZWFjaCBpbnRlcnZhbCwgZ2l2ZSBuIG1pbGxpc2Vjb25kcyBiYWNrIHRvIHN5c3RlbS9icm93c2VyXG5cdFx0XHRjaHVua1Byb2dyZXNzOiBudWxsLCAvLyBwcm9ncmVzcyBjYWxsYmFjazogZnVuY3Rpb24ocHJvY2Vzc2VkLCB0b3RhbCwgZWxhcHNlZCkgKGUuZy4gZm9yIGEgcHJvZ3Jlc3MgaW5kaWNhdG9yKVxuXG5cdFx0XHQvL09wdGlvbnMgdG8gcGFzcyB0byB0aGUgTC5Qb2x5Z29uIGNvbnN0cnVjdG9yXG5cdFx0XHRwb2x5Z29uT3B0aW9uczoge31cblx0XHR9LFxuXG5cdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRcdEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMuaWNvbkNyZWF0ZUZ1bmN0aW9uKSB7XG5cdFx0XHRcdHRoaXMub3B0aW9ucy5pY29uQ3JlYXRlRnVuY3Rpb24gPSB0aGlzLl9kZWZhdWx0SWNvbkNyZWF0ZUZ1bmN0aW9uO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9mZWF0dXJlR3JvdXAgPSBMLmZlYXR1cmVHcm91cCgpO1xuXHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG5cdFx0XHR0aGlzLl9ub25Qb2ludEdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcblx0XHRcdHRoaXMuX25vblBvaW50R3JvdXAuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cblx0XHRcdHRoaXMuX2luWm9vbUFuaW1hdGlvbiA9IDA7XG5cdFx0XHR0aGlzLl9uZWVkc0NsdXN0ZXJpbmcgPSBbXTtcblx0XHRcdHRoaXMuX25lZWRzUmVtb3ZpbmcgPSBbXTsgLy9NYXJrZXJzIHJlbW92ZWQgd2hpbGUgd2UgYXJlbid0IG9uIHRoZSBtYXAgbmVlZCB0byBiZSBrZXB0IHRyYWNrIG9mXG5cdFx0XHQvL1RoZSBib3VuZHMgb2YgdGhlIGN1cnJlbnRseSBzaG93biBhcmVhIChmcm9tIF9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMpIFVwZGF0ZWQgb24gem9vbS9tb3ZlXG5cdFx0XHR0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMgPSBudWxsO1xuXG5cdFx0XHR0aGlzLl9xdWV1ZSA9IFtdO1xuXG5cdFx0XHR0aGlzLl9jaGlsZE1hcmtlckV2ZW50SGFuZGxlcnMgPSB7XG5cdFx0XHRcdCdkcmFnc3RhcnQnOiB0aGlzLl9jaGlsZE1hcmtlckRyYWdTdGFydCxcblx0XHRcdFx0J21vdmUnOiB0aGlzLl9jaGlsZE1hcmtlck1vdmVkLFxuXHRcdFx0XHQnZHJhZ2VuZCc6IHRoaXMuX2NoaWxkTWFya2VyRHJhZ0VuZCxcblx0XHRcdH07XG5cblx0XHRcdC8vIEhvb2sgdGhlIGFwcHJvcHJpYXRlIGFuaW1hdGlvbiBtZXRob2RzLlxuXHRcdFx0dmFyIGFuaW1hdGUgPSBMLkRvbVV0aWwuVFJBTlNJVElPTiAmJiB0aGlzLm9wdGlvbnMuYW5pbWF0ZTtcblx0XHRcdEwuZXh0ZW5kKHRoaXMsIGFuaW1hdGUgPyB0aGlzLl93aXRoQW5pbWF0aW9uIDogdGhpcy5fbm9BbmltYXRpb24pO1xuXHRcdFx0Ly8gUmVtZW1iZXIgd2hpY2ggTWFya2VyQ2x1c3RlciBjbGFzcyB0byBpbnN0YW50aWF0ZSAoYW5pbWF0ZWQgb3Igbm90KS5cblx0XHRcdHRoaXMuX21hcmtlckNsdXN0ZXIgPSBhbmltYXRlID8gTC5NYXJrZXJDbHVzdGVyIDogTC5NYXJrZXJDbHVzdGVyTm9uQW5pbWF0ZWQ7XG5cdFx0fSxcblxuXHRcdGFkZExheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcblxuXHRcdFx0aWYgKGxheWVyIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmFkZExheWVycyhbbGF5ZXJdKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9Eb24ndCBjbHVzdGVyIG5vbiBwb2ludCBkYXRhXG5cdFx0XHRpZiAoIWxheWVyLmdldExhdExuZykge1xuXHRcdFx0XHR0aGlzLl9ub25Qb2ludEdyb3VwLmFkZExheWVyKGxheWVyKTtcblx0XHRcdFx0dGhpcy5maXJlKCdsYXllcmFkZCcsIHsgbGF5ZXI6IGxheWVyIH0pO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF0aGlzLl9tYXApIHtcblx0XHRcdFx0dGhpcy5fbmVlZHNDbHVzdGVyaW5nLnB1c2gobGF5ZXIpO1xuXHRcdFx0XHR0aGlzLmZpcmUoJ2xheWVyYWRkJywgeyBsYXllcjogbGF5ZXIgfSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5oYXNMYXllcihsYXllcikpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cblxuXHRcdFx0Ly9JZiB3ZSBoYXZlIGFscmVhZHkgY2x1c3RlcmVkIHdlJ2xsIG5lZWQgdG8gYWRkIHRoaXMgb25lIHRvIGEgY2x1c3RlclxuXG5cdFx0XHRpZiAodGhpcy5fdW5zcGlkZXJmeSkge1xuXHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2FkZExheWVyKGxheWVyLCB0aGlzLl9tYXhab29tKTtcblx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJhZGQnLCB7IGxheWVyOiBsYXllciB9KTtcblxuXHRcdFx0Ly8gUmVmcmVzaCBib3VuZHMgYW5kIHdlaWdodGVkIHBvc2l0aW9ucy5cblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjYWxjdWxhdGVCb3VuZHMoKTtcblxuXHRcdFx0dGhpcy5fcmVmcmVzaENsdXN0ZXJzSWNvbnMoKTtcblxuXHRcdFx0Ly9Xb3JrIG91dCB3aGF0IGlzIHZpc2libGVcblx0XHRcdHZhciB2aXNpYmxlTGF5ZXIgPSBsYXllcixcblx0XHRcdCAgICBjdXJyZW50Wm9vbSA9IHRoaXMuX3pvb207XG5cdFx0XHRpZiAobGF5ZXIuX19wYXJlbnQpIHtcblx0XHRcdFx0d2hpbGUgKHZpc2libGVMYXllci5fX3BhcmVudC5fem9vbSA+PSBjdXJyZW50Wm9vbSkge1xuXHRcdFx0XHRcdHZpc2libGVMYXllciA9IHZpc2libGVMYXllci5fX3BhcmVudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fY3VycmVudFNob3duQm91bmRzLmNvbnRhaW5zKHZpc2libGVMYXllci5nZXRMYXRMbmcoKSkpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5hbmltYXRlQWRkaW5nTWFya2Vycykge1xuXHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvbkFkZExheWVyKGxheWVyLCB2aXNpYmxlTGF5ZXIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvbkFkZExheWVyTm9uQW5pbWF0ZWQobGF5ZXIsIHZpc2libGVMYXllcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRyZW1vdmVMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG5cblx0XHRcdGlmIChsYXllciBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW1vdmVMYXllcnMoW2xheWVyXSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vTm9uIHBvaW50IGxheWVyc1xuXHRcdFx0aWYgKCFsYXllci5nZXRMYXRMbmcpIHtcblx0XHRcdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5yZW1vdmVMYXllcihsYXllcik7XG5cdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBsYXllciB9KTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy5fbWFwKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fYXJyYXlTcGxpY2UodGhpcy5fbmVlZHNDbHVzdGVyaW5nLCBsYXllcikgJiYgdGhpcy5oYXNMYXllcihsYXllcikpIHtcblx0XHRcdFx0XHR0aGlzLl9uZWVkc1JlbW92aW5nLnB1c2goeyBsYXllcjogbGF5ZXIsIGxhdGxuZzogbGF5ZXIuX2xhdGxuZyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmZpcmUoJ2xheWVycmVtb3ZlJywgeyBsYXllcjogbGF5ZXIgfSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWxheWVyLl9fcGFyZW50KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdW5zcGlkZXJmeSkge1xuXHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XG5cdFx0XHRcdHRoaXMuX3Vuc3BpZGVyZnlMYXllcihsYXllcik7XG5cdFx0XHR9XG5cblx0XHRcdC8vUmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSBjbHVzdGVyc1xuXHRcdFx0dGhpcy5fcmVtb3ZlTGF5ZXIobGF5ZXIsIHRydWUpO1xuXHRcdFx0dGhpcy5maXJlKCdsYXllcnJlbW92ZScsIHsgbGF5ZXI6IGxheWVyIH0pO1xuXG5cdFx0XHQvLyBSZWZyZXNoIGJvdW5kcyBhbmQgd2VpZ2h0ZWQgcG9zaXRpb25zLlxuXHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWNhbGN1bGF0ZUJvdW5kcygpO1xuXG5cdFx0XHR0aGlzLl9yZWZyZXNoQ2x1c3RlcnNJY29ucygpO1xuXG5cdFx0XHRsYXllci5vZmYodGhpcy5fY2hpbGRNYXJrZXJFdmVudEhhbmRsZXJzLCB0aGlzKTtcblxuXHRcdFx0aWYgKHRoaXMuX2ZlYXR1cmVHcm91cC5oYXNMYXllcihsYXllcikpIHtcblx0XHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLnJlbW92ZUxheWVyKGxheWVyKTtcblx0XHRcdFx0aWYgKGxheWVyLmNsdXN0ZXJTaG93KSB7XG5cdFx0XHRcdFx0bGF5ZXIuY2x1c3RlclNob3coKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Ly9UYWtlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGFuZCBhZGRzIHRoZW0gaW4gYnVsa1xuXHRcdGFkZExheWVyczogZnVuY3Rpb24gKGxheWVyc0FycmF5LCBza2lwTGF5ZXJBZGRFdmVudCkge1xuXHRcdFx0aWYgKCFMLlV0aWwuaXNBcnJheShsYXllcnNBcnJheSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWRkTGF5ZXIobGF5ZXJzQXJyYXkpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZmcgPSB0aGlzLl9mZWF0dXJlR3JvdXAsXG5cdFx0XHQgICAgbnBnID0gdGhpcy5fbm9uUG9pbnRHcm91cCxcblx0XHRcdCAgICBjaHVua2VkID0gdGhpcy5vcHRpb25zLmNodW5rZWRMb2FkaW5nLFxuXHRcdFx0ICAgIGNodW5rSW50ZXJ2YWwgPSB0aGlzLm9wdGlvbnMuY2h1bmtJbnRlcnZhbCxcblx0XHRcdCAgICBjaHVua1Byb2dyZXNzID0gdGhpcy5vcHRpb25zLmNodW5rUHJvZ3Jlc3MsXG5cdFx0XHQgICAgbCA9IGxheWVyc0FycmF5Lmxlbmd0aCxcblx0XHRcdCAgICBvZmZzZXQgPSAwLFxuXHRcdFx0ICAgIG9yaWdpbmFsQXJyYXkgPSB0cnVlLFxuXHRcdFx0ICAgIG07XG5cblx0XHRcdGlmICh0aGlzLl9tYXApIHtcblx0XHRcdFx0dmFyIHN0YXJ0ZWQgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRcdFx0XHR2YXIgcHJvY2VzcyA9IEwuYmluZChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIHN0YXJ0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0byB1bnNwaWRlcmZ5IGJlZm9yZSBzdGFydGluZyB0byBhZGQgc29tZSBsYXllcnNcblx0XHRcdFx0XHRpZiAodGhpcy5fbWFwICYmIHRoaXMuX3Vuc3BpZGVyZnkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3Vuc3BpZGVyZnkoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKDsgb2Zmc2V0IDwgbDsgb2Zmc2V0KyspIHtcblx0XHRcdFx0XHRcdGlmIChjaHVua2VkICYmIG9mZnNldCAlIDIwMCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHQvLyBldmVyeSBjb3VwbGUgaHVuZHJlZCBtYXJrZXJzLCBpbnN0cnVtZW50IHRoZSB0aW1lIGVsYXBzZWQgc2luY2UgcHJvY2Vzc2luZyBzdGFydGVkOlxuXHRcdFx0XHRcdFx0XHR2YXIgZWxhcHNlZCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSBzdGFydDtcblx0XHRcdFx0XHRcdFx0aWYgKGVsYXBzZWQgPiBjaHVua0ludGVydmFsKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7IC8vIGJlZW4gd29ya2luZyB0b28gaGFyZCwgdGltZSB0byB0YWtlIGEgYnJlYWsgOi0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bSA9IGxheWVyc0FycmF5W29mZnNldF07XG5cblx0XHRcdFx0XHRcdC8vIEdyb3VwIG9mIGxheWVycywgYXBwZW5kIGNoaWxkcmVuIHRvIGxheWVyc0FycmF5IGFuZCBza2lwLlxuXHRcdFx0XHRcdFx0Ly8gU2lkZSBlZmZlY3RzOlxuXHRcdFx0XHRcdFx0Ly8gLSBUb3RhbCBpbmNyZWFzZXMsIHNvIGNodW5rUHJvZ3Jlc3MgcmF0aW8ganVtcHMgYmFja3dhcmQuXG5cdFx0XHRcdFx0XHQvLyAtIEdyb3VwcyBhcmUgbm90IGluY2x1ZGVkIGluIHRoaXMgZ3JvdXAsIG9ubHkgdGhlaXIgbm9uLWdyb3VwIGNoaWxkIGxheWVycyAoaGFzTGF5ZXIpLlxuXHRcdFx0XHRcdFx0Ly8gQ2hhbmdpbmcgYXJyYXkgbGVuZ3RoIHdoaWxlIGxvb3BpbmcgZG9lcyBub3QgYWZmZWN0IHBlcmZvcm1hbmNlIGluIGN1cnJlbnQgYnJvd3NlcnM6XG5cdFx0XHRcdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS9mb3ItbG9vcC1jaGFuZ2luZy1sZW5ndGgvNlxuXHRcdFx0XHRcdFx0aWYgKG0gaW5zdGFuY2VvZiBMLkxheWVyR3JvdXApIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9yaWdpbmFsQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0XHRsYXllcnNBcnJheSA9IGxheWVyc0FycmF5LnNsaWNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhtLCBsYXllcnNBcnJheSk7XG5cdFx0XHRcdFx0XHRcdGwgPSBsYXllcnNBcnJheS5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvL05vdCBwb2ludCBkYXRhLCBjYW4ndCBiZSBjbHVzdGVyZWRcblx0XHRcdFx0XHRcdGlmICghbS5nZXRMYXRMbmcpIHtcblx0XHRcdFx0XHRcdFx0bnBnLmFkZExheWVyKG0pO1xuXHRcdFx0XHRcdFx0XHRpZiAoIXNraXBMYXllckFkZEV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5maXJlKCdsYXllcmFkZCcsIHsgbGF5ZXI6IG0gfSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICh0aGlzLmhhc0xheWVyKG0pKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLl9hZGRMYXllcihtLCB0aGlzLl9tYXhab29tKTtcblx0XHRcdFx0XHRcdGlmICghc2tpcExheWVyQWRkRXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5maXJlKCdsYXllcmFkZCcsIHsgbGF5ZXI6IG0gfSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vSWYgd2UganVzdCBtYWRlIGEgY2x1c3RlciBvZiBzaXplIDIgdGhlbiB3ZSBuZWVkIHRvIHJlbW92ZSB0aGUgb3RoZXIgbWFya2VyIGZyb20gdGhlIG1hcCAoaWYgaXQgaXMpIG9yIHdlIG5ldmVyIHdpbGxcblx0XHRcdFx0XHRcdGlmIChtLl9fcGFyZW50KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChtLl9fcGFyZW50LmdldENoaWxkQ291bnQoKSA9PT0gMikge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBtYXJrZXJzID0gbS5fX3BhcmVudC5nZXRBbGxDaGlsZE1hcmtlcnMoKSxcblx0XHRcdFx0XHRcdFx0XHQgICAgb3RoZXJNYXJrZXIgPSBtYXJrZXJzWzBdID09PSBtID8gbWFya2Vyc1sxXSA6IG1hcmtlcnNbMF07XG5cdFx0XHRcdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIob3RoZXJNYXJrZXIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGNodW5rUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHRcdC8vIHJlcG9ydCBwcm9ncmVzcyBhbmQgdGltZSBlbGFwc2VkOlxuXHRcdFx0XHRcdFx0Y2h1bmtQcm9ncmVzcyhvZmZzZXQsIGwsIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSBzdGFydGVkKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDb21wbGV0ZWQgcHJvY2Vzc2luZyBhbGwgbWFya2Vycy5cblx0XHRcdFx0XHRpZiAob2Zmc2V0ID09PSBsKSB7XG5cblx0XHRcdFx0XHRcdC8vIFJlZnJlc2ggYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbnMuXG5cdFx0XHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY2FsY3VsYXRlQm91bmRzKCk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3JlZnJlc2hDbHVzdGVyc0ljb25zKCk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwKG51bGwsIHRoaXMuX3pvb20sIHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQocHJvY2VzcywgdGhpcy5vcHRpb25zLmNodW5rRGVsYXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgdGhpcyk7XG5cblx0XHRcdFx0cHJvY2VzcygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIG5lZWRzQ2x1c3RlcmluZyA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZztcblxuXHRcdFx0XHRmb3IgKDsgb2Zmc2V0IDwgbDsgb2Zmc2V0KyspIHtcblx0XHRcdFx0XHRtID0gbGF5ZXJzQXJyYXlbb2Zmc2V0XTtcblxuXHRcdFx0XHRcdC8vIEdyb3VwIG9mIGxheWVycywgYXBwZW5kIGNoaWxkcmVuIHRvIGxheWVyc0FycmF5IGFuZCBza2lwLlxuXHRcdFx0XHRcdGlmIChtIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XG5cdFx0XHRcdFx0XHRpZiAob3JpZ2luYWxBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRsYXllcnNBcnJheSA9IGxheWVyc0FycmF5LnNsaWNlKCk7XG5cdFx0XHRcdFx0XHRcdG9yaWdpbmFsQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhtLCBsYXllcnNBcnJheSk7XG5cdFx0XHRcdFx0XHRsID0gbGF5ZXJzQXJyYXkubGVuZ3RoO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9Ob3QgcG9pbnQgZGF0YSwgY2FuJ3QgYmUgY2x1c3RlcmVkXG5cdFx0XHRcdFx0aWYgKCFtLmdldExhdExuZykge1xuXHRcdFx0XHRcdFx0bnBnLmFkZExheWVyKG0pO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuaGFzTGF5ZXIobSkpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5lZWRzQ2x1c3RlcmluZy5wdXNoKG0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Ly9UYWtlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGFuZCByZW1vdmVzIHRoZW0gaW4gYnVsa1xuXHRcdHJlbW92ZUxheWVyczogZnVuY3Rpb24gKGxheWVyc0FycmF5KSB7XG5cdFx0XHR2YXIgaSwgbSxcblx0XHRcdCAgICBsID0gbGF5ZXJzQXJyYXkubGVuZ3RoLFxuXHRcdFx0ICAgIGZnID0gdGhpcy5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0ICAgIG5wZyA9IHRoaXMuX25vblBvaW50R3JvdXAsXG5cdFx0XHQgICAgb3JpZ2luYWxBcnJheSA9IHRydWU7XG5cblx0XHRcdGlmICghdGhpcy5fbWFwKSB7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHRtID0gbGF5ZXJzQXJyYXlbaV07XG5cblx0XHRcdFx0XHQvLyBHcm91cCBvZiBsYXllcnMsIGFwcGVuZCBjaGlsZHJlbiB0byBsYXllcnNBcnJheSBhbmQgc2tpcC5cblx0XHRcdFx0XHRpZiAobSBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xuXHRcdFx0XHRcdFx0aWYgKG9yaWdpbmFsQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0bGF5ZXJzQXJyYXkgPSBsYXllcnNBcnJheS5zbGljZSgpO1xuXHRcdFx0XHRcdFx0XHRvcmlnaW5hbEFycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLl9leHRyYWN0Tm9uR3JvdXBMYXllcnMobSwgbGF5ZXJzQXJyYXkpO1xuXHRcdFx0XHRcdFx0bCA9IGxheWVyc0FycmF5Lmxlbmd0aDtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX2FycmF5U3BsaWNlKHRoaXMuX25lZWRzQ2x1c3RlcmluZywgbSk7XG5cdFx0XHRcdFx0bnBnLnJlbW92ZUxheWVyKG0pO1xuXHRcdFx0XHRcdGlmICh0aGlzLmhhc0xheWVyKG0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9uZWVkc1JlbW92aW5nLnB1c2goeyBsYXllcjogbSwgbGF0bG5nOiBtLl9sYXRsbmcgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBtIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdW5zcGlkZXJmeSkge1xuXHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XG5cblx0XHRcdFx0Ly8gV29yayBvbiBhIGNvcHkgb2YgdGhlIGFycmF5LCBzbyB0aGF0IG5leHQgbG9vcCBpcyBub3QgYWZmZWN0ZWQuXG5cdFx0XHRcdHZhciBsYXllcnNBcnJheTIgPSBsYXllcnNBcnJheS5zbGljZSgpLFxuXHRcdFx0XHQgICAgbDIgPSBsO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDI7IGkrKykge1xuXHRcdFx0XHRcdG0gPSBsYXllcnNBcnJheTJbaV07XG5cblx0XHRcdFx0XHQvLyBHcm91cCBvZiBsYXllcnMsIGFwcGVuZCBjaGlsZHJlbiB0byBsYXllcnNBcnJheSBhbmQgc2tpcC5cblx0XHRcdFx0XHRpZiAobSBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZXh0cmFjdE5vbkdyb3VwTGF5ZXJzKG0sIGxheWVyc0FycmF5Mik7XG5cdFx0XHRcdFx0XHRsMiA9IGxheWVyc0FycmF5Mi5sZW5ndGg7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5TGF5ZXIobSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRtID0gbGF5ZXJzQXJyYXlbaV07XG5cblx0XHRcdFx0Ly8gR3JvdXAgb2YgbGF5ZXJzLCBhcHBlbmQgY2hpbGRyZW4gdG8gbGF5ZXJzQXJyYXkgYW5kIHNraXAuXG5cdFx0XHRcdGlmIChtIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XG5cdFx0XHRcdFx0aWYgKG9yaWdpbmFsQXJyYXkpIHtcblx0XHRcdFx0XHRcdGxheWVyc0FycmF5ID0gbGF5ZXJzQXJyYXkuc2xpY2UoKTtcblx0XHRcdFx0XHRcdG9yaWdpbmFsQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fZXh0cmFjdE5vbkdyb3VwTGF5ZXJzKG0sIGxheWVyc0FycmF5KTtcblx0XHRcdFx0XHRsID0gbGF5ZXJzQXJyYXkubGVuZ3RoO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFtLl9fcGFyZW50KSB7XG5cdFx0XHRcdFx0bnBnLnJlbW92ZUxheWVyKG0pO1xuXHRcdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBtIH0pO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fcmVtb3ZlTGF5ZXIobSwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBtIH0pO1xuXG5cdFx0XHRcdGlmIChmZy5oYXNMYXllcihtKSkge1xuXHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKG0pO1xuXHRcdFx0XHRcdGlmIChtLmNsdXN0ZXJTaG93KSB7XG5cdFx0XHRcdFx0XHRtLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlZnJlc2ggYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbnMuXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY2FsY3VsYXRlQm91bmRzKCk7XG5cblx0XHRcdHRoaXMuX3JlZnJlc2hDbHVzdGVyc0ljb25zKCk7XG5cblx0XHRcdC8vRml4IHVwIHRoZSBjbHVzdGVycyBhbmQgbWFya2VycyBvbiB0aGUgbWFwXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcChudWxsLCB0aGlzLl96b29tLCB0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Ly9SZW1vdmVzIGFsbCBsYXllcnMgZnJvbSB0aGUgTWFya2VyQ2x1c3Rlckdyb3VwXG5cdFx0Y2xlYXJMYXllcnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vTmVlZCBvdXIgb3duIHNwZWNpYWwgaW1wbGVtZW50YXRpb24gYXMgdGhlIExheWVyR3JvdXAgb25lIGRvZXNuJ3Qgd29yayBmb3IgdXNcblxuXHRcdFx0Ly9JZiB3ZSBhcmVuJ3Qgb24gdGhlIG1hcCAoeWV0KSwgYmxvdyBhd2F5IHRoZSBtYXJrZXJzIHdlIGtub3cgb2Zcblx0XHRcdGlmICghdGhpcy5fbWFwKSB7XG5cdFx0XHRcdHRoaXMuX25lZWRzQ2x1c3RlcmluZyA9IFtdO1xuXHRcdFx0XHR0aGlzLl9uZWVkc1JlbW92aW5nID0gW107XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9ncmlkQ2x1c3RlcnM7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9ncmlkVW5jbHVzdGVyZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9ub2FuaW1hdGlvblVuc3BpZGVyZnkpIHtcblx0XHRcdFx0dGhpcy5fbm9hbmltYXRpb25VbnNwaWRlcmZ5KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vUmVtb3ZlIGFsbCB0aGUgdmlzaWJsZSBsYXllcnNcblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5jbGVhckxheWVycygpO1xuXHRcdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5jbGVhckxheWVycygpO1xuXG5cdFx0XHR0aGlzLmVhY2hMYXllcihmdW5jdGlvbiAobWFya2VyKSB7XG5cdFx0XHRcdG1hcmtlci5vZmYodGhpcy5fY2hpbGRNYXJrZXJFdmVudEhhbmRsZXJzLCB0aGlzKTtcblx0XHRcdFx0ZGVsZXRlIG1hcmtlci5fX3BhcmVudDtcblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHRpZiAodGhpcy5fbWFwKSB7XG5cdFx0XHRcdC8vUmVzZXQgX3RvcENsdXN0ZXJMZXZlbCBhbmQgdGhlIERpc3RhbmNlR3JpZHNcblx0XHRcdFx0dGhpcy5fZ2VuZXJhdGVJbml0aWFsQ2x1c3RlcnMoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGUgRmVhdHVyZUdyb3VwLmdldEJvdW5kcyBhcyBpdCBkb2Vzbid0IHdvcmtcblx0XHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcblxuXHRcdFx0aWYgKHRoaXMuX3RvcENsdXN0ZXJMZXZlbCkge1xuXHRcdFx0XHRib3VuZHMuZXh0ZW5kKHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fYm91bmRzKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaSA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRib3VuZHMuZXh0ZW5kKHRoaXMuX25lZWRzQ2x1c3RlcmluZ1tpXS5nZXRMYXRMbmcoKSk7XG5cdFx0XHR9XG5cblx0XHRcdGJvdW5kcy5leHRlbmQodGhpcy5fbm9uUG9pbnRHcm91cC5nZXRCb3VuZHMoKSk7XG5cblx0XHRcdHJldHVybiBib3VuZHM7XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGVzIExheWVyR3JvdXAuZWFjaExheWVyXG5cdFx0ZWFjaExheWVyOiBmdW5jdGlvbiAobWV0aG9kLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbWFya2VycyA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZy5zbGljZSgpLFxuXHRcdFx0XHRuZWVkc1JlbW92aW5nID0gdGhpcy5fbmVlZHNSZW1vdmluZyxcblx0XHRcdFx0dGhpc05lZWRzUmVtb3ZpbmcsIGksIGo7XG5cblx0XHRcdGlmICh0aGlzLl90b3BDbHVzdGVyTGV2ZWwpIHtcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLmdldEFsbENoaWxkTWFya2VycyhtYXJrZXJzKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHR0aGlzTmVlZHNSZW1vdmluZyA9IHRydWU7XG5cblx0XHRcdFx0Zm9yIChqID0gbmVlZHNSZW1vdmluZy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuXHRcdFx0XHRcdGlmIChuZWVkc1JlbW92aW5nW2pdLmxheWVyID09PSBtYXJrZXJzW2ldKSB7XG5cdFx0XHRcdFx0XHR0aGlzTmVlZHNSZW1vdmluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXNOZWVkc1JlbW92aW5nKSB7XG5cdFx0XHRcdFx0bWV0aG9kLmNhbGwoY29udGV4dCwgbWFya2Vyc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5lYWNoTGF5ZXIobWV0aG9kLCBjb250ZXh0KTtcblx0XHR9LFxuXG5cdFx0Ly9PdmVycmlkZXMgTGF5ZXJHcm91cC5nZXRMYXllcnNcblx0XHRnZXRMYXllcnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBsYXllcnMgPSBbXTtcblx0XHRcdHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRcdGxheWVycy5wdXNoKGwpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbGF5ZXJzO1xuXHRcdH0sXG5cblx0XHQvL092ZXJyaWRlcyBMYXllckdyb3VwLmdldExheWVyLCBXQVJOSU5HOiBSZWFsbHkgYmFkIHBlcmZvcm1hbmNlXG5cdFx0Z2V0TGF5ZXI6IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG51bGw7XG5cblx0XHRcdGlkID0gcGFyc2VJbnQoaWQsIDEwKTtcblxuXHRcdFx0dGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKGwpIHtcblx0XHRcdFx0aWYgKEwuc3RhbXAobCkgPT09IGlkKSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gbDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8vUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBsYXllciBpcyBpbiB0aGlzIE1hcmtlckNsdXN0ZXJHcm91cFxuXHRcdGhhc0xheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRcdGlmICghbGF5ZXIpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaSwgYW5BcnJheSA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZztcblxuXHRcdFx0Zm9yIChpID0gYW5BcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRpZiAoYW5BcnJheVtpXSA9PT0gbGF5ZXIpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRhbkFycmF5ID0gdGhpcy5fbmVlZHNSZW1vdmluZztcblx0XHRcdGZvciAoaSA9IGFuQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGFuQXJyYXlbaV0ubGF5ZXIgPT09IGxheWVyKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAhIShsYXllci5fX3BhcmVudCAmJiBsYXllci5fX3BhcmVudC5fZ3JvdXAgPT09IHRoaXMpIHx8IHRoaXMuX25vblBvaW50R3JvdXAuaGFzTGF5ZXIobGF5ZXIpO1xuXHRcdH0sXG5cblx0XHQvL1pvb20gZG93biB0byBzaG93IHRoZSBnaXZlbiBsYXllciAoc3BpZGVyZnlpbmcgaWYgbmVjZXNzYXJ5KSB0aGVuIGNhbGxzIHRoZSBjYWxsYmFja1xuXHRcdHpvb21Ub1Nob3dMYXllcjogZnVuY3Rpb24gKGxheWVyLCBjYWxsYmFjaykge1xuXG5cdFx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXG5cdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzaG93TWFya2VyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvLyBBc3N1bWVzIHRoYXQgbWFwLmhhc0xheWVyIGNoZWNrcyBmb3IgZGlyZWN0IGFwcGVhcmFuY2Ugb24gbWFwLCBub3QgcmVjdXJzaXZlbHkgY2FsbGluZ1xuXHRcdFx0XHQvLyBoYXNMYXllciBvbiBMYXllciBHcm91cHMgdGhhdCBhcmUgb24gbWFwICh0eXBpY2FsbHkgbm90IGNhbGxpbmcgdGhpcyBNYXJrZXJDbHVzdGVyR3JvdXAuaGFzTGF5ZXIsIHdoaWNoIHdvdWxkIGFsd2F5cyByZXR1cm4gdHJ1ZSlcblx0XHRcdFx0aWYgKChtYXAuaGFzTGF5ZXIobGF5ZXIpIHx8IG1hcC5oYXNMYXllcihsYXllci5fX3BhcmVudCkpICYmICF0aGlzLl9pblpvb21BbmltYXRpb24pIHtcblx0XHRcdFx0XHR0aGlzLl9tYXAub2ZmKCdtb3ZlZW5kJywgc2hvd01hcmtlciwgdGhpcyk7XG5cdFx0XHRcdFx0dGhpcy5vZmYoJ2FuaW1hdGlvbmVuZCcsIHNob3dNYXJrZXIsIHRoaXMpO1xuXG5cdFx0XHRcdFx0aWYgKG1hcC5oYXNMYXllcihsYXllcikpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsYXllci5fX3BhcmVudC5faWNvbikge1xuXHRcdFx0XHRcdFx0dGhpcy5vbmNlKCdzcGlkZXJmaWVkJywgY2FsbGJhY2ssIHRoaXMpO1xuXHRcdFx0XHRcdFx0bGF5ZXIuX19wYXJlbnQuc3BpZGVyZnkoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGlmIChsYXllci5faWNvbiAmJiB0aGlzLl9tYXAuZ2V0Qm91bmRzKCkuY29udGFpbnMobGF5ZXIuZ2V0TGF0TG5nKCkpKSB7XG5cdFx0XHRcdC8vTGF5ZXIgaXMgdmlzaWJsZSBvbmQgb24gc2NyZWVuLCBpbW1lZGlhdGUgcmV0dXJuXG5cdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGxheWVyLl9fcGFyZW50Ll96b29tIDwgTWF0aC5yb3VuZCh0aGlzLl9tYXAuX3pvb20pKSB7XG5cdFx0XHRcdC8vTGF5ZXIgc2hvdWxkIGJlIHZpc2libGUgYXQgdGhpcyB6b29tIGxldmVsLiBJdCBtdXN0IG5vdCBiZSBvbiBzY3JlZW4gc28ganVzdCBwYW4gb3ZlciB0byBpdFxuXHRcdFx0XHR0aGlzLl9tYXAub24oJ21vdmVlbmQnLCBzaG93TWFya2VyLCB0aGlzKTtcblx0XHRcdFx0dGhpcy5fbWFwLnBhblRvKGxheWVyLmdldExhdExuZygpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX21hcC5vbignbW92ZWVuZCcsIHNob3dNYXJrZXIsIHRoaXMpO1xuXHRcdFx0XHR0aGlzLm9uKCdhbmltYXRpb25lbmQnLCBzaG93TWFya2VyLCB0aGlzKTtcblx0XHRcdFx0bGF5ZXIuX19wYXJlbnQuem9vbVRvQm91bmRzKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGVzIEZlYXR1cmVHcm91cC5vbkFkZFxuXHRcdG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0XHR0aGlzLl9tYXAgPSBtYXA7XG5cdFx0XHR2YXIgaSwgbCwgbGF5ZXI7XG5cblx0XHRcdGlmICghaXNGaW5pdGUodGhpcy5fbWFwLmdldE1heFpvb20oKSkpIHtcblx0XHRcdFx0dGhyb3cgXCJNYXAgaGFzIG5vIG1heFpvb20gc3BlY2lmaWVkXCI7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5hZGRUbyhtYXApO1xuXHRcdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5hZGRUbyhtYXApO1xuXG5cdFx0XHRpZiAoIXRoaXMuX2dyaWRDbHVzdGVycykge1xuXHRcdFx0XHR0aGlzLl9nZW5lcmF0ZUluaXRpYWxDbHVzdGVycygpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9tYXhMYXQgPSBtYXAub3B0aW9ucy5jcnMucHJvamVjdGlvbi5NQVhfTEFUSVRVREU7XG5cblx0XHRcdC8vUmVzdG9yZSBhbGwgdGhlIHBvc2l0aW9ucyBhcyB0aGV5IGFyZSBpbiB0aGUgTUNHIGJlZm9yZSByZW1vdmluZyB0aGVtXG5cdFx0XHRmb3IgKGkgPSAwLCBsID0gdGhpcy5fbmVlZHNSZW1vdmluZy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0bGF5ZXIgPSB0aGlzLl9uZWVkc1JlbW92aW5nW2ldO1xuXHRcdFx0XHRsYXllci5uZXdsYXRsbmcgPSBsYXllci5sYXllci5fbGF0bG5nO1xuXHRcdFx0XHRsYXllci5sYXllci5fbGF0bG5nID0gbGF5ZXIubGF0bG5nO1xuXHRcdFx0fVxuXHRcdFx0Ly9SZW1vdmUgdGhlbSwgdGhlbiByZXN0b3JlIHRoZWlyIG5ldyBwb3NpdGlvbnNcblx0XHRcdGZvciAoaSA9IDAsIGwgPSB0aGlzLl9uZWVkc1JlbW92aW5nLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRsYXllciA9IHRoaXMuX25lZWRzUmVtb3ZpbmdbaV07XG5cdFx0XHRcdHRoaXMuX3JlbW92ZUxheWVyKGxheWVyLmxheWVyLCB0cnVlKTtcblx0XHRcdFx0bGF5ZXIubGF5ZXIuX2xhdGxuZyA9IGxheWVyLm5ld2xhdGxuZztcblx0XHRcdH1cblx0XHRcdHRoaXMuX25lZWRzUmVtb3ZpbmcgPSBbXTtcblxuXHRcdFx0Ly9SZW1lbWJlciB0aGUgY3VycmVudCB6b29tIGxldmVsIGFuZCBib3VuZHNcblx0XHRcdHRoaXMuX3pvb20gPSBNYXRoLnJvdW5kKHRoaXMuX21hcC5fem9vbSk7XG5cdFx0XHR0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMgPSB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKTtcblxuXHRcdFx0dGhpcy5fbWFwLm9uKCd6b29tZW5kJywgdGhpcy5fem9vbUVuZCwgdGhpcyk7XG5cdFx0XHR0aGlzLl9tYXAub24oJ21vdmVlbmQnLCB0aGlzLl9tb3ZlRW5kLCB0aGlzKTtcblxuXHRcdFx0aWYgKHRoaXMuX3NwaWRlcmZpZXJPbkFkZCkgeyAvL1RPRE8gRklYTUU6IE5vdCBzdXJlIGhvdyB0byBoYXZlIHNwaWRlcmZpZXIgYWRkIHNvbWV0aGluZyBvbiBoZXJlIG5pY2VseVxuXHRcdFx0XHR0aGlzLl9zcGlkZXJmaWVyT25BZGQoKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYmluZEV2ZW50cygpO1xuXG5cdFx0XHQvL0FjdHVhbGx5IGFkZCBvdXIgbWFya2VycyB0byB0aGUgbWFwOlxuXHRcdFx0bCA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZztcblx0XHRcdHRoaXMuX25lZWRzQ2x1c3RlcmluZyA9IFtdO1xuXHRcdFx0dGhpcy5hZGRMYXllcnMobCwgdHJ1ZSk7XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGVzIEZlYXR1cmVHcm91cC5vblJlbW92ZVxuXHRcdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0XHRtYXAub2ZmKCd6b29tZW5kJywgdGhpcy5fem9vbUVuZCwgdGhpcyk7XG5cdFx0XHRtYXAub2ZmKCdtb3ZlZW5kJywgdGhpcy5fbW92ZUVuZCwgdGhpcyk7XG5cblx0XHRcdHRoaXMuX3VuYmluZEV2ZW50cygpO1xuXG5cdFx0XHQvL0luIGNhc2Ugd2UgYXJlIGluIGEgY2x1c3RlciBhbmltYXRpb25cblx0XHRcdHRoaXMuX21hcC5fbWFwUGFuZS5jbGFzc05hbWUgPSB0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lLnJlcGxhY2UoJyBsZWFmbGV0LWNsdXN0ZXItYW5pbScsICcnKTtcblxuXHRcdFx0aWYgKHRoaXMuX3NwaWRlcmZpZXJPblJlbW92ZSkgeyAvL1RPRE8gRklYTUU6IE5vdCBzdXJlIGhvdyB0byBoYXZlIHNwaWRlcmZpZXIgYWRkIHNvbWV0aGluZyBvbiBoZXJlIG5pY2VseVxuXHRcdFx0XHR0aGlzLl9zcGlkZXJmaWVyT25SZW1vdmUoKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsZXRlIHRoaXMuX21heExhdDtcblxuXHRcdFx0Ly9DbGVhbiB1cCBhbGwgdGhlIGxheWVycyB3ZSBhZGRlZCB0byB0aGUgbWFwXG5cdFx0XHR0aGlzLl9oaWRlQ292ZXJhZ2UoKTtcblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5yZW1vdmUoKTtcblx0XHRcdHRoaXMuX25vblBvaW50R3JvdXAucmVtb3ZlKCk7XG5cblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5jbGVhckxheWVycygpO1xuXG5cdFx0XHR0aGlzLl9tYXAgPSBudWxsO1xuXHRcdH0sXG5cblx0XHRnZXRWaXNpYmxlUGFyZW50OiBmdW5jdGlvbiAobWFya2VyKSB7XG5cdFx0XHR2YXIgdk1hcmtlciA9IG1hcmtlcjtcblx0XHRcdHdoaWxlICh2TWFya2VyICYmICF2TWFya2VyLl9pY29uKSB7XG5cdFx0XHRcdHZNYXJrZXIgPSB2TWFya2VyLl9fcGFyZW50O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZNYXJrZXIgfHwgbnVsbDtcblx0XHR9LFxuXG5cdFx0Ly9SZW1vdmUgdGhlIGdpdmVuIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBhcnJheVxuXHRcdF9hcnJheVNwbGljZTogZnVuY3Rpb24gKGFuQXJyYXksIG9iaikge1xuXHRcdFx0Zm9yICh2YXIgaSA9IGFuQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGFuQXJyYXlbaV0gPT09IG9iaikge1xuXHRcdFx0XHRcdGFuQXJyYXkuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZXMgYSBtYXJrZXIgZnJvbSBhbGwgX2dyaWRVbmNsdXN0ZXJlZCB6b29tIGxldmVscywgc3RhcnRpbmcgYXQgdGhlIHN1cHBsaWVkIHpvb20uXG5cdFx0ICogQHBhcmFtIG1hcmtlciB0byBiZSByZW1vdmVkIGZyb20gX2dyaWRVbmNsdXN0ZXJlZC5cblx0XHQgKiBAcGFyYW0geiBpbnRlZ2VyIGJvdHRvbSBzdGFydCB6b29tIGxldmVsIChpbmNsdWRlZClcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9yZW1vdmVGcm9tR3JpZFVuY2x1c3RlcmVkOiBmdW5jdGlvbiAobWFya2VyLCB6KSB7XG5cdFx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxuXHRcdFx0ICAgIGdyaWRVbmNsdXN0ZXJlZCA9IHRoaXMuX2dyaWRVbmNsdXN0ZXJlZCxcblx0XHRcdFx0bWluWm9vbSA9IE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSk7XG5cblx0XHRcdGZvciAoOyB6ID49IG1pblpvb207IHotLSkge1xuXHRcdFx0XHRpZiAoIWdyaWRVbmNsdXN0ZXJlZFt6XS5yZW1vdmVPYmplY3QobWFya2VyLCBtYXAucHJvamVjdChtYXJrZXIuZ2V0TGF0TG5nKCksIHopKSkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9jaGlsZE1hcmtlckRyYWdTdGFydDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUudGFyZ2V0Ll9fZHJhZ1N0YXJ0ID0gZS50YXJnZXQuX2xhdGxuZztcblx0XHR9LFxuXG5cdFx0X2NoaWxkTWFya2VyTW92ZWQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRpZiAoIXRoaXMuX2lnbm9yZU1vdmUgJiYgIWUudGFyZ2V0Ll9fZHJhZ1N0YXJ0KSB7XG5cdFx0XHRcdHZhciBpc1BvcHVwT3BlbiA9IGUudGFyZ2V0Ll9wb3B1cCAmJiBlLnRhcmdldC5fcG9wdXAuaXNPcGVuKCk7XG5cblx0XHRcdFx0dGhpcy5fbW92ZUNoaWxkKGUudGFyZ2V0LCBlLm9sZExhdExuZywgZS5sYXRsbmcpO1xuXG5cdFx0XHRcdGlmIChpc1BvcHVwT3Blbikge1xuXHRcdFx0XHRcdGUudGFyZ2V0Lm9wZW5Qb3B1cCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9tb3ZlQ2hpbGQ6IGZ1bmN0aW9uIChsYXllciwgZnJvbSwgdG8pIHtcblx0XHRcdGxheWVyLl9sYXRsbmcgPSBmcm9tO1xuXHRcdFx0dGhpcy5yZW1vdmVMYXllcihsYXllcik7XG5cblx0XHRcdGxheWVyLl9sYXRsbmcgPSB0bztcblx0XHRcdHRoaXMuYWRkTGF5ZXIobGF5ZXIpO1xuXHRcdH0sXG5cblx0XHRfY2hpbGRNYXJrZXJEcmFnRW5kOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIGRyYWdTdGFydCA9IGUudGFyZ2V0Ll9fZHJhZ1N0YXJ0O1xuXHRcdFx0ZGVsZXRlIGUudGFyZ2V0Ll9fZHJhZ1N0YXJ0O1xuXHRcdFx0aWYgKGRyYWdTdGFydCkge1xuXHRcdFx0XHR0aGlzLl9tb3ZlQ2hpbGQoZS50YXJnZXQsIGRyYWdTdGFydCwgZS50YXJnZXQuX2xhdGxuZyk7XG5cdFx0XHR9XHRcdFxuXHRcdH0sXG5cblxuXHRcdC8vSW50ZXJuYWwgZnVuY3Rpb24gZm9yIHJlbW92aW5nIGEgbWFya2VyIGZyb20gZXZlcnl0aGluZy5cblx0XHQvL2RvbnRVcGRhdGVNYXA6IHNldCB0byB0cnVlIGlmIHlvdSB3aWxsIGhhbmRsZSB1cGRhdGluZyB0aGUgbWFwIG1hbnVhbGx5IChmb3IgYnVsayBmdW5jdGlvbnMpXG5cdFx0X3JlbW92ZUxheWVyOiBmdW5jdGlvbiAobWFya2VyLCByZW1vdmVGcm9tRGlzdGFuY2VHcmlkLCBkb250VXBkYXRlTWFwKSB7XG5cdFx0XHR2YXIgZ3JpZENsdXN0ZXJzID0gdGhpcy5fZ3JpZENsdXN0ZXJzLFxuXHRcdFx0XHRncmlkVW5jbHVzdGVyZWQgPSB0aGlzLl9ncmlkVW5jbHVzdGVyZWQsXG5cdFx0XHRcdGZnID0gdGhpcy5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0XHRtYXAgPSB0aGlzLl9tYXAsXG5cdFx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpO1xuXG5cdFx0XHQvL1JlbW92ZSB0aGUgbWFya2VyIGZyb20gZGlzdGFuY2UgY2x1c3RlcnMgaXQgbWlnaHQgYmUgaW5cblx0XHRcdGlmIChyZW1vdmVGcm9tRGlzdGFuY2VHcmlkKSB7XG5cdFx0XHRcdHRoaXMuX3JlbW92ZUZyb21HcmlkVW5jbHVzdGVyZWQobWFya2VyLCB0aGlzLl9tYXhab29tKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9Xb3JrIG91ciB3YXkgdXAgdGhlIGNsdXN0ZXJzIHJlbW92aW5nIHRoZW0gYXMgd2UgZ28gaWYgcmVxdWlyZWRcblx0XHRcdHZhciBjbHVzdGVyID0gbWFya2VyLl9fcGFyZW50LFxuXHRcdFx0XHRtYXJrZXJzID0gY2x1c3Rlci5fbWFya2Vycyxcblx0XHRcdFx0b3RoZXJNYXJrZXI7XG5cblx0XHRcdC8vUmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgaW1tZWRpYXRlIHBhcmVudHMgbWFya2VyIGxpc3Rcblx0XHRcdHRoaXMuX2FycmF5U3BsaWNlKG1hcmtlcnMsIG1hcmtlcik7XG5cblx0XHRcdHdoaWxlIChjbHVzdGVyKSB7XG5cdFx0XHRcdGNsdXN0ZXIuX2NoaWxkQ291bnQtLTtcblx0XHRcdFx0Y2x1c3Rlci5fYm91bmRzTmVlZFVwZGF0ZSA9IHRydWU7XG5cblx0XHRcdFx0aWYgKGNsdXN0ZXIuX3pvb20gPCBtaW5ab29tKSB7XG5cdFx0XHRcdFx0Ly9Ub3AgbGV2ZWwsIGRvIG5vdGhpbmdcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fSBlbHNlIGlmIChyZW1vdmVGcm9tRGlzdGFuY2VHcmlkICYmIGNsdXN0ZXIuX2NoaWxkQ291bnQgPD0gMSkgeyAvL0NsdXN0ZXIgbm8gbG9uZ2VyIHJlcXVpcmVkXG5cdFx0XHRcdFx0Ly9XZSBuZWVkIHRvIHB1c2ggdGhlIG90aGVyIG1hcmtlciB1cCB0byB0aGUgcGFyZW50XG5cdFx0XHRcdFx0b3RoZXJNYXJrZXIgPSBjbHVzdGVyLl9tYXJrZXJzWzBdID09PSBtYXJrZXIgPyBjbHVzdGVyLl9tYXJrZXJzWzFdIDogY2x1c3Rlci5fbWFya2Vyc1swXTtcblxuXHRcdFx0XHRcdC8vVXBkYXRlIGRpc3RhbmNlIGdyaWRcblx0XHRcdFx0XHRncmlkQ2x1c3RlcnNbY2x1c3Rlci5fem9vbV0ucmVtb3ZlT2JqZWN0KGNsdXN0ZXIsIG1hcC5wcm9qZWN0KGNsdXN0ZXIuX2NMYXRMbmcsIGNsdXN0ZXIuX3pvb20pKTtcblx0XHRcdFx0XHRncmlkVW5jbHVzdGVyZWRbY2x1c3Rlci5fem9vbV0uYWRkT2JqZWN0KG90aGVyTWFya2VyLCBtYXAucHJvamVjdChvdGhlck1hcmtlci5nZXRMYXRMbmcoKSwgY2x1c3Rlci5fem9vbSkpO1xuXG5cdFx0XHRcdFx0Ly9Nb3ZlIG90aGVyTWFya2VyIHVwIHRvIHBhcmVudFxuXHRcdFx0XHRcdHRoaXMuX2FycmF5U3BsaWNlKGNsdXN0ZXIuX19wYXJlbnQuX2NoaWxkQ2x1c3RlcnMsIGNsdXN0ZXIpO1xuXHRcdFx0XHRcdGNsdXN0ZXIuX19wYXJlbnQuX21hcmtlcnMucHVzaChvdGhlck1hcmtlcik7XG5cdFx0XHRcdFx0b3RoZXJNYXJrZXIuX19wYXJlbnQgPSBjbHVzdGVyLl9fcGFyZW50O1xuXG5cdFx0XHRcdFx0aWYgKGNsdXN0ZXIuX2ljb24pIHtcblx0XHRcdFx0XHRcdC8vQ2x1c3RlciBpcyBjdXJyZW50bHkgb24gdGhlIG1hcCwgbmVlZCB0byBwdXQgdGhlIG1hcmtlciBvbiB0aGUgbWFwIGluc3RlYWRcblx0XHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKGNsdXN0ZXIpO1xuXHRcdFx0XHRcdFx0aWYgKCFkb250VXBkYXRlTWFwKSB7XG5cdFx0XHRcdFx0XHRcdGZnLmFkZExheWVyKG90aGVyTWFya2VyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2x1c3Rlci5faWNvbk5lZWRzVXBkYXRlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNsdXN0ZXIgPSBjbHVzdGVyLl9fcGFyZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRkZWxldGUgbWFya2VyLl9fcGFyZW50O1xuXHRcdH0sXG5cblx0XHRfaXNPcklzUGFyZW50OiBmdW5jdGlvbiAoZWwsIG9lbCkge1xuXHRcdFx0d2hpbGUgKG9lbCkge1xuXHRcdFx0XHRpZiAoZWwgPT09IG9lbCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG9lbCA9IG9lbC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0sXG5cblx0XHQvL092ZXJyaWRlIEwuRXZlbnRlZC5maXJlXG5cdFx0ZmlyZTogZnVuY3Rpb24gKHR5cGUsIGRhdGEsIHByb3BhZ2F0ZSkge1xuXHRcdFx0aWYgKGRhdGEgJiYgZGF0YS5sYXllciBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlcikge1xuXHRcdFx0XHQvL1ByZXZlbnQgbXVsdGlwbGUgY2x1c3Rlcm1vdXNlb3Zlci9vZmYgZXZlbnRzIGlmIHRoZSBpY29uIGlzIG1hZGUgdXAgb2Ygc3RhY2tlZCBkaXZzIChEb2Vzbid0IHdvcmsgaW4gaWUgPD0gOCwgbm8gcmVsYXRlZFRhcmdldClcblx0XHRcdFx0aWYgKGRhdGEub3JpZ2luYWxFdmVudCAmJiB0aGlzLl9pc09ySXNQYXJlbnQoZGF0YS5sYXllci5faWNvbiwgZGF0YS5vcmlnaW5hbEV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHR5cGUgPSAnY2x1c3RlcicgKyB0eXBlO1xuXHRcdFx0fVxuXG5cdFx0XHRMLkZlYXR1cmVHcm91cC5wcm90b3R5cGUuZmlyZS5jYWxsKHRoaXMsIHR5cGUsIGRhdGEsIHByb3BhZ2F0ZSk7XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGUgTC5FdmVudGVkLmxpc3RlbnNcblx0XHRsaXN0ZW5zOiBmdW5jdGlvbiAodHlwZSwgcHJvcGFnYXRlKSB7XG5cdFx0XHRyZXR1cm4gTC5GZWF0dXJlR3JvdXAucHJvdG90eXBlLmxpc3RlbnMuY2FsbCh0aGlzLCB0eXBlLCBwcm9wYWdhdGUpIHx8IEwuRmVhdHVyZUdyb3VwLnByb3RvdHlwZS5saXN0ZW5zLmNhbGwodGhpcywgJ2NsdXN0ZXInICsgdHlwZSwgcHJvcGFnYXRlKTtcblx0XHR9LFxuXG5cdFx0Ly9EZWZhdWx0IGZ1bmN0aW9uYWxpdHlcblx0XHRfZGVmYXVsdEljb25DcmVhdGVGdW5jdGlvbjogZnVuY3Rpb24gKGNsdXN0ZXIpIHtcblx0XHRcdHZhciBjaGlsZENvdW50ID0gY2x1c3Rlci5nZXRDaGlsZENvdW50KCk7XG5cblx0XHRcdHZhciBjID0gJyBtYXJrZXItY2x1c3Rlci0nO1xuXHRcdFx0aWYgKGNoaWxkQ291bnQgPCAxMCkge1xuXHRcdFx0XHRjICs9ICdzbWFsbCc7XG5cdFx0XHR9IGVsc2UgaWYgKGNoaWxkQ291bnQgPCAxMDApIHtcblx0XHRcdFx0YyArPSAnbWVkaXVtJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGMgKz0gJ2xhcmdlJztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG5ldyBMLkRpdkljb24oeyBodG1sOiAnPGRpdj48c3Bhbj4nICsgY2hpbGRDb3VudCArICc8L3NwYW4+PC9kaXY+JywgY2xhc3NOYW1lOiAnbWFya2VyLWNsdXN0ZXInICsgYywgaWNvblNpemU6IG5ldyBMLlBvaW50KDQwLCA0MCkgfSk7XG5cdFx0fSxcblxuXHRcdF9iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxuXHRcdFx0ICAgIHNwaWRlcmZ5T25NYXhab29tID0gdGhpcy5vcHRpb25zLnNwaWRlcmZ5T25NYXhab29tLFxuXHRcdFx0ICAgIHNob3dDb3ZlcmFnZU9uSG92ZXIgPSB0aGlzLm9wdGlvbnMuc2hvd0NvdmVyYWdlT25Ib3Zlcixcblx0XHRcdCAgICB6b29tVG9Cb3VuZHNPbkNsaWNrID0gdGhpcy5vcHRpb25zLnpvb21Ub0JvdW5kc09uQ2xpY2s7XG5cblx0XHRcdC8vWm9vbSBvbiBjbHVzdGVyIGNsaWNrIG9yIHNwaWRlcmZ5IGlmIHdlIGFyZSBhdCB0aGUgbG93ZXN0IGxldmVsXG5cdFx0XHRpZiAoc3BpZGVyZnlPbk1heFpvb20gfHwgem9vbVRvQm91bmRzT25DbGljaykge1xuXHRcdFx0XHR0aGlzLm9uKCdjbHVzdGVyY2xpY2sgY2x1c3RlcmtleXByZXNzJywgdGhpcy5fem9vbU9yU3BpZGVyZnksIHRoaXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL1Nob3cgY29udmV4IGh1bGwgKGJvdW5kYXJ5KSBwb2x5Z29uIG9uIG1vdXNlIG92ZXJcblx0XHRcdGlmIChzaG93Q292ZXJhZ2VPbkhvdmVyKSB7XG5cdFx0XHRcdHRoaXMub24oJ2NsdXN0ZXJtb3VzZW92ZXInLCB0aGlzLl9zaG93Q292ZXJhZ2UsIHRoaXMpO1xuXHRcdFx0XHR0aGlzLm9uKCdjbHVzdGVybW91c2VvdXQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xuXHRcdFx0XHRtYXAub24oJ3pvb21lbmQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfem9vbU9yU3BpZGVyZnk6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgY2x1c3RlciA9IGUubGF5ZXIsXG5cdFx0XHQgICAgYm90dG9tQ2x1c3RlciA9IGNsdXN0ZXI7XG5cblx0XHRcdGlmIChlLnR5cGUgPT09ICdjbHVzdGVya2V5cHJlc3MnICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQua2V5Q29kZSAhPT0gMTMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAoYm90dG9tQ2x1c3Rlci5fY2hpbGRDbHVzdGVycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0Ym90dG9tQ2x1c3RlciA9IGJvdHRvbUNsdXN0ZXIuX2NoaWxkQ2x1c3RlcnNbMF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChib3R0b21DbHVzdGVyLl96b29tID09PSB0aGlzLl9tYXhab29tICYmXG5cdFx0XHRcdGJvdHRvbUNsdXN0ZXIuX2NoaWxkQ291bnQgPT09IGNsdXN0ZXIuX2NoaWxkQ291bnQgJiZcblx0XHRcdFx0dGhpcy5vcHRpb25zLnNwaWRlcmZ5T25NYXhab29tKSB7XG5cblx0XHRcdFx0Ly8gQWxsIGNoaWxkIG1hcmtlcnMgYXJlIGNvbnRhaW5lZCBpbiBhIHNpbmdsZSBjbHVzdGVyIGZyb20gdGhpcy5fbWF4Wm9vbSB0byB0aGlzIGNsdXN0ZXIuXG5cdFx0XHRcdGNsdXN0ZXIuc3BpZGVyZnkoKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnpvb21Ub0JvdW5kc09uQ2xpY2spIHtcblx0XHRcdFx0Y2x1c3Rlci56b29tVG9Cb3VuZHMoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9jdXMgdGhlIG1hcCBhZ2FpbiBmb3Iga2V5Ym9hcmQgdXNlcnMuXG5cdFx0XHRpZiAoZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5rZXlDb2RlID09PSAxMykge1xuXHRcdFx0XHR0aGlzLl9tYXAuX2NvbnRhaW5lci5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfc2hvd0NvdmVyYWdlOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIG1hcCA9IHRoaXMuX21hcDtcblx0XHRcdGlmICh0aGlzLl9pblpvb21BbmltYXRpb24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX3Nob3duUG9seWdvbikge1xuXHRcdFx0XHRtYXAucmVtb3ZlTGF5ZXIodGhpcy5fc2hvd25Qb2x5Z29uKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLmxheWVyLmdldENoaWxkQ291bnQoKSA+IDIgJiYgZS5sYXllciAhPT0gdGhpcy5fc3BpZGVyZmllZCkge1xuXHRcdFx0XHR0aGlzLl9zaG93blBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKGUubGF5ZXIuZ2V0Q29udmV4SHVsbCgpLCB0aGlzLm9wdGlvbnMucG9seWdvbk9wdGlvbnMpO1xuXHRcdFx0XHRtYXAuYWRkTGF5ZXIodGhpcy5fc2hvd25Qb2x5Z29uKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X2hpZGVDb3ZlcmFnZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuX3Nob3duUG9seWdvbikge1xuXHRcdFx0XHR0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fc2hvd25Qb2x5Z29uKTtcblx0XHRcdFx0dGhpcy5fc2hvd25Qb2x5Z29uID0gbnVsbDtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3VuYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHNwaWRlcmZ5T25NYXhab29tID0gdGhpcy5vcHRpb25zLnNwaWRlcmZ5T25NYXhab29tLFxuXHRcdFx0XHRzaG93Q292ZXJhZ2VPbkhvdmVyID0gdGhpcy5vcHRpb25zLnNob3dDb3ZlcmFnZU9uSG92ZXIsXG5cdFx0XHRcdHpvb21Ub0JvdW5kc09uQ2xpY2sgPSB0aGlzLm9wdGlvbnMuem9vbVRvQm91bmRzT25DbGljayxcblx0XHRcdFx0bWFwID0gdGhpcy5fbWFwO1xuXG5cdFx0XHRpZiAoc3BpZGVyZnlPbk1heFpvb20gfHwgem9vbVRvQm91bmRzT25DbGljaykge1xuXHRcdFx0XHR0aGlzLm9mZignY2x1c3RlcmNsaWNrIGNsdXN0ZXJrZXlwcmVzcycsIHRoaXMuX3pvb21PclNwaWRlcmZ5LCB0aGlzKTtcblx0XHRcdH1cblx0XHRcdGlmIChzaG93Q292ZXJhZ2VPbkhvdmVyKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCdjbHVzdGVybW91c2VvdmVyJywgdGhpcy5fc2hvd0NvdmVyYWdlLCB0aGlzKTtcblx0XHRcdFx0dGhpcy5vZmYoJ2NsdXN0ZXJtb3VzZW91dCcsIHRoaXMuX2hpZGVDb3ZlcmFnZSwgdGhpcyk7XG5cdFx0XHRcdG1hcC5vZmYoJ3pvb21lbmQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfem9vbUVuZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCF0aGlzLl9tYXApIHsgLy9NYXkgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgbWFwIGJ5IGEgem9vbUVuZCBoYW5kbGVyXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuX21lcmdlU3BsaXRDbHVzdGVycygpO1xuXG5cdFx0XHR0aGlzLl96b29tID0gTWF0aC5yb3VuZCh0aGlzLl9tYXAuX3pvb20pO1xuXHRcdFx0dGhpcy5fY3VycmVudFNob3duQm91bmRzID0gdGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCk7XG5cdFx0fSxcblxuXHRcdF9tb3ZlRW5kOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5faW5ab29tQW5pbWF0aW9uKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG5ld0JvdW5kcyA9IHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpO1xuXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcywgTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSwgdGhpcy5fem9vbSwgbmV3Qm91bmRzKTtcblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwKG51bGwsIE1hdGgucm91bmQodGhpcy5fbWFwLl96b29tKSwgbmV3Qm91bmRzKTtcblxuXHRcdFx0dGhpcy5fY3VycmVudFNob3duQm91bmRzID0gbmV3Qm91bmRzO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0sXG5cblx0XHRfZ2VuZXJhdGVJbml0aWFsQ2x1c3RlcnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBtYXhab29tID0gTWF0aC5jZWlsKHRoaXMuX21hcC5nZXRNYXhab29tKCkpLFxuXHRcdFx0XHRtaW5ab29tID0gTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSxcblx0XHRcdFx0cmFkaXVzID0gdGhpcy5vcHRpb25zLm1heENsdXN0ZXJSYWRpdXMsXG5cdFx0XHRcdHJhZGl1c0ZuID0gcmFkaXVzO1xuXG5cdFx0XHQvL0lmIHdlIGp1c3Qgc2V0IG1heENsdXN0ZXJSYWRpdXMgdG8gYSBzaW5nbGUgbnVtYmVyLCB3ZSBuZWVkIHRvIGNyZWF0ZVxuXHRcdFx0Ly9hIHNpbXBsZSBmdW5jdGlvbiB0byByZXR1cm4gdGhhdCBudW1iZXIuIE90aGVyd2lzZSwgd2UganVzdCBoYXZlIHRvXG5cdFx0XHQvL3VzZSB0aGUgZnVuY3Rpb24gd2UndmUgcGFzc2VkIGluLlxuXHRcdFx0aWYgKHR5cGVvZiByYWRpdXMgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRyYWRpdXNGbiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJhZGl1czsgfTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQ2x1c3RlcmluZ0F0Wm9vbSAhPT0gbnVsbCkge1xuXHRcdFx0XHRtYXhab29tID0gdGhpcy5vcHRpb25zLmRpc2FibGVDbHVzdGVyaW5nQXRab29tIC0gMTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX21heFpvb20gPSBtYXhab29tO1xuXHRcdFx0dGhpcy5fZ3JpZENsdXN0ZXJzID0ge307XG5cdFx0XHR0aGlzLl9ncmlkVW5jbHVzdGVyZWQgPSB7fTtcblxuXHRcdFx0Ly9TZXQgdXAgRGlzdGFuY2VHcmlkcyBmb3IgZWFjaCB6b29tXG5cdFx0XHRmb3IgKHZhciB6b29tID0gbWF4Wm9vbTsgem9vbSA+PSBtaW5ab29tOyB6b29tLS0pIHtcblx0XHRcdFx0dGhpcy5fZ3JpZENsdXN0ZXJzW3pvb21dID0gbmV3IEwuRGlzdGFuY2VHcmlkKHJhZGl1c0ZuKHpvb20pKTtcblx0XHRcdFx0dGhpcy5fZ3JpZFVuY2x1c3RlcmVkW3pvb21dID0gbmV3IEwuRGlzdGFuY2VHcmlkKHJhZGl1c0ZuKHpvb20pKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5zdGFudGlhdGUgdGhlIGFwcHJvcHJpYXRlIEwuTWFya2VyQ2x1c3RlciBjbGFzcyAoYW5pbWF0ZWQgb3Igbm90KS5cblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbCA9IG5ldyB0aGlzLl9tYXJrZXJDbHVzdGVyKHRoaXMsIG1pblpvb20gLSAxKTtcblx0XHR9LFxuXG5cdFx0Ly9ab29tOiBab29tIHRvIHN0YXJ0IGFkZGluZyBhdCAoUGFzcyB0aGlzLl9tYXhab29tIHRvIHN0YXJ0IGF0IHRoZSBib3R0b20pXG5cdFx0X2FkZExheWVyOiBmdW5jdGlvbiAobGF5ZXIsIHpvb20pIHtcblx0XHRcdHZhciBncmlkQ2x1c3RlcnMgPSB0aGlzLl9ncmlkQ2x1c3RlcnMsXG5cdFx0XHQgICAgZ3JpZFVuY2x1c3RlcmVkID0gdGhpcy5fZ3JpZFVuY2x1c3RlcmVkLFxuXHRcdFx0XHRtaW5ab29tID0gTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSxcblx0XHRcdCAgICBtYXJrZXJQb2ludCwgejtcblxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5zaW5nbGVNYXJrZXJNb2RlKSB7XG5cdFx0XHRcdHRoaXMuX292ZXJyaWRlTWFya2VySWNvbihsYXllcik7XG5cdFx0XHR9XG5cblx0XHRcdGxheWVyLm9uKHRoaXMuX2NoaWxkTWFya2VyRXZlbnRIYW5kbGVycywgdGhpcyk7XG5cblx0XHRcdC8vRmluZCB0aGUgbG93ZXN0IHpvb20gbGV2ZWwgdG8gc2xvdCB0aGlzIG9uZSBpblxuXHRcdFx0Zm9yICg7IHpvb20gPj0gbWluWm9vbTsgem9vbS0tKSB7XG5cdFx0XHRcdG1hcmtlclBvaW50ID0gdGhpcy5fbWFwLnByb2plY3QobGF5ZXIuZ2V0TGF0TG5nKCksIHpvb20pOyAvLyBjYWxjdWxhdGUgcGl4ZWwgcG9zaXRpb25cblxuXHRcdFx0XHQvL1RyeSBmaW5kIGEgY2x1c3RlciBjbG9zZSBieVxuXHRcdFx0XHR2YXIgY2xvc2VzdCA9IGdyaWRDbHVzdGVyc1t6b29tXS5nZXROZWFyT2JqZWN0KG1hcmtlclBvaW50KTtcblx0XHRcdFx0aWYgKGNsb3Nlc3QpIHtcblx0XHRcdFx0XHRjbG9zZXN0Ll9hZGRDaGlsZChsYXllcik7XG5cdFx0XHRcdFx0bGF5ZXIuX19wYXJlbnQgPSBjbG9zZXN0O1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vVHJ5IGZpbmQgYSBtYXJrZXIgY2xvc2UgYnkgdG8gZm9ybSBhIG5ldyBjbHVzdGVyIHdpdGhcblx0XHRcdFx0Y2xvc2VzdCA9IGdyaWRVbmNsdXN0ZXJlZFt6b29tXS5nZXROZWFyT2JqZWN0KG1hcmtlclBvaW50KTtcblx0XHRcdFx0aWYgKGNsb3Nlc3QpIHtcblx0XHRcdFx0XHR2YXIgcGFyZW50ID0gY2xvc2VzdC5fX3BhcmVudDtcblx0XHRcdFx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZW1vdmVMYXllcihjbG9zZXN0LCBmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9DcmVhdGUgbmV3IGNsdXN0ZXIgd2l0aCB0aGVzZSAyIGluIGl0XG5cblx0XHRcdFx0XHR2YXIgbmV3Q2x1c3RlciA9IG5ldyB0aGlzLl9tYXJrZXJDbHVzdGVyKHRoaXMsIHpvb20sIGNsb3Nlc3QsIGxheWVyKTtcblx0XHRcdFx0XHRncmlkQ2x1c3RlcnNbem9vbV0uYWRkT2JqZWN0KG5ld0NsdXN0ZXIsIHRoaXMuX21hcC5wcm9qZWN0KG5ld0NsdXN0ZXIuX2NMYXRMbmcsIHpvb20pKTtcblx0XHRcdFx0XHRjbG9zZXN0Ll9fcGFyZW50ID0gbmV3Q2x1c3Rlcjtcblx0XHRcdFx0XHRsYXllci5fX3BhcmVudCA9IG5ld0NsdXN0ZXI7XG5cblx0XHRcdFx0XHQvL0ZpcnN0IGNyZWF0ZSBhbnkgbmV3IGludGVybWVkaWF0ZSBwYXJlbnQgY2x1c3RlcnMgdGhhdCBkb24ndCBleGlzdFxuXHRcdFx0XHRcdHZhciBsYXN0UGFyZW50ID0gbmV3Q2x1c3Rlcjtcblx0XHRcdFx0XHRmb3IgKHogPSB6b29tIC0gMTsgeiA+IHBhcmVudC5fem9vbTsgei0tKSB7XG5cdFx0XHRcdFx0XHRsYXN0UGFyZW50ID0gbmV3IHRoaXMuX21hcmtlckNsdXN0ZXIodGhpcywgeiwgbGFzdFBhcmVudCk7XG5cdFx0XHRcdFx0XHRncmlkQ2x1c3RlcnNbel0uYWRkT2JqZWN0KGxhc3RQYXJlbnQsIHRoaXMuX21hcC5wcm9qZWN0KGNsb3Nlc3QuZ2V0TGF0TG5nKCksIHopKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cGFyZW50Ll9hZGRDaGlsZChsYXN0UGFyZW50KTtcblxuXHRcdFx0XHRcdC8vUmVtb3ZlIGNsb3Nlc3QgZnJvbSB0aGlzIHpvb20gbGV2ZWwgYW5kIGFueSBhYm92ZSB0aGF0IGl0IGlzIGluLCByZXBsYWNlIHdpdGggbmV3Q2x1c3RlclxuXHRcdFx0XHRcdHRoaXMuX3JlbW92ZUZyb21HcmlkVW5jbHVzdGVyZWQoY2xvc2VzdCwgem9vbSk7XG5cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0RpZG4ndCBtYW5hZ2UgdG8gY2x1c3RlciBpbiBhdCB0aGlzIHpvb20sIHJlY29yZCB1cyBhcyBhIG1hcmtlciBoZXJlIGFuZCBjb250aW51ZSB1cHdhcmRzXG5cdFx0XHRcdGdyaWRVbmNsdXN0ZXJlZFt6b29tXS5hZGRPYmplY3QobGF5ZXIsIG1hcmtlclBvaW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly9EaWRuJ3QgZ2V0IGluIGFueXRoaW5nLCBhZGQgdXMgdG8gdGhlIHRvcFxuXHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9hZGRDaGlsZChsYXllcik7XG5cdFx0XHRsYXllci5fX3BhcmVudCA9IHRoaXMuX3RvcENsdXN0ZXJMZXZlbDtcblx0XHRcdHJldHVybjtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmVmcmVzaGVzIHRoZSBpY29uIG9mIGFsbCBcImRpcnR5XCIgdmlzaWJsZSBjbHVzdGVycy5cblx0XHQgKiBOb24tdmlzaWJsZSBcImRpcnR5XCIgY2x1c3RlcnMgd2lsbCBiZSB1cGRhdGVkIHdoZW4gdGhleSBhcmUgYWRkZWQgdG8gdGhlIG1hcC5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9yZWZyZXNoQ2x1c3RlcnNJY29uczogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmVhY2hMYXllcihmdW5jdGlvbiAoYykge1xuXHRcdFx0XHRpZiAoYyBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3RlciAmJiBjLl9pY29uTmVlZHNVcGRhdGUpIHtcblx0XHRcdFx0XHRjLl91cGRhdGVJY29uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvL0VucXVldWUgY29kZSB0byBmaXJlIGFmdGVyIHRoZSBtYXJrZXIgZXhwYW5kL2NvbnRyYWN0IGhhcyBoYXBwZW5lZFxuXHRcdF9lbnF1ZXVlOiBmdW5jdGlvbiAoZm4pIHtcblx0XHRcdHRoaXMuX3F1ZXVlLnB1c2goZm4pO1xuXHRcdFx0aWYgKCF0aGlzLl9xdWV1ZVRpbWVvdXQpIHtcblx0XHRcdFx0dGhpcy5fcXVldWVUaW1lb3V0ID0gc2V0VGltZW91dChMLmJpbmQodGhpcy5fcHJvY2Vzc1F1ZXVlLCB0aGlzKSwgMzAwKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdF9wcm9jZXNzUXVldWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcXVldWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dGhpcy5fcXVldWVbaV0uY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3F1ZXVlLmxlbmd0aCA9IDA7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fcXVldWVUaW1lb3V0KTtcblx0XHRcdHRoaXMuX3F1ZXVlVGltZW91dCA9IG51bGw7XG5cdFx0fSxcblxuXHRcdC8vTWVyZ2UgYW5kIHNwbGl0IGFueSBleGlzdGluZyBjbHVzdGVycyB0aGF0IGFyZSB0b28gYmlnIG9yIHNtYWxsXG5cdFx0X21lcmdlU3BsaXRDbHVzdGVyczogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIG1hcFpvb20gPSBNYXRoLnJvdW5kKHRoaXMuX21hcC5fem9vbSk7XG5cblx0XHRcdC8vSW4gY2FzZSB3ZSBhcmUgc3RhcnRpbmcgdG8gc3BsaXQgYmVmb3JlIHRoZSBhbmltYXRpb24gZmluaXNoZWRcblx0XHRcdHRoaXMuX3Byb2Nlc3NRdWV1ZSgpO1xuXG5cdFx0XHRpZiAodGhpcy5fem9vbSA8IG1hcFpvb20gJiYgdGhpcy5fY3VycmVudFNob3duQm91bmRzLmludGVyc2VjdHModGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCkpKSB7IC8vWm9vbSBpbiwgc3BsaXRcblx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uU3RhcnQoKTtcblx0XHRcdFx0Ly9SZW1vdmUgY2x1c3RlcnMgbm93IG9mZiBzY3JlZW5cblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseVJlbW92ZUNoaWxkcmVuRnJvbU1hcCh0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMsIE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksIHRoaXMuX3pvb20sIHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpKTtcblxuXHRcdFx0XHR0aGlzLl9hbmltYXRpb25ab29tSW4odGhpcy5fem9vbSwgbWFwWm9vbSk7XG5cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fem9vbSA+IG1hcFpvb20pIHsgLy9ab29tIG91dCwgbWVyZ2Vcblx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uU3RhcnQoKTtcblxuXHRcdFx0XHR0aGlzLl9hbmltYXRpb25ab29tT3V0KHRoaXMuX3pvb20sIG1hcFpvb20pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbW92ZUVuZCgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL0dldHMgdGhlIG1hcHMgdmlzaWJsZSBib3VuZHMgZXhwYW5kZWQgaW4gZWFjaCBkaXJlY3Rpb24gYnkgdGhlIHNpemUgb2YgdGhlIHNjcmVlbiAoc28gdGhlIHVzZXIgY2Fubm90IHNlZSBhbiBhcmVhIHdlIGRvIG5vdCBjb3ZlciBpbiBvbmUgcGFuKVxuXHRcdF9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLnJlbW92ZU91dHNpZGVWaXNpYmxlQm91bmRzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9tYXBCb3VuZHNJbmZpbml0ZTtcblx0XHRcdH0gZWxzZSBpZiAoTC5Ccm93c2VyLm1vYmlsZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY2hlY2tCb3VuZHNNYXhMYXQodGhpcy5fbWFwLmdldEJvdW5kcygpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXMuX2NoZWNrQm91bmRzTWF4TGF0KHRoaXMuX21hcC5nZXRCb3VuZHMoKS5wYWQoMSkpOyAvLyBQYWRkaW5nIGV4cGFuZHMgdGhlIGJvdW5kcyBieSBpdHMgb3duIGRpbWVuc2lvbnMgYnV0IHNjYWxlZCB3aXRoIHRoZSBnaXZlbiBmYWN0b3IuXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEV4cGFuZHMgdGhlIGxhdGl0dWRlIHRvIEluZmluaXR5IChvciAtSW5maW5pdHkpIGlmIHRoZSBpbnB1dCBib3VuZHMgcmVhY2ggdGhlIG1hcCBwcm9qZWN0aW9uIG1heGltdW0gZGVmaW5lZCBsYXRpdHVkZVxuXHRcdCAqIChpbiB0aGUgY2FzZSBvZiBXZWIvU3BoZXJpY2FsIE1lcmNhdG9yLCBpdCBpcyA4NS4wNTExMjg3Nzk4IC8gc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dlYl9NZXJjYXRvciNGb3JtdWxhcykuXG5cdFx0ICogT3RoZXJ3aXNlLCB0aGUgcmVtb3ZlT3V0c2lkZVZpc2libGVCb3VuZHMgb3B0aW9uIHdpbGwgcmVtb3ZlIG1hcmtlcnMgYmV5b25kIHRoYXQgbGltaXQsIHdoZXJlYXMgdGhlIHNhbWUgbWFya2VycyB3aXRob3V0XG5cdFx0ICogdGhpcyBvcHRpb24gKG9yIG91dHNpZGUgTUNHKSB3aWxsIGhhdmUgdGhlaXIgcG9zaXRpb24gZmxvb3JlZCAoY2VpbGVkKSBieSB0aGUgcHJvamVjdGlvbiBhbmQgcmVuZGVyZWQgYXQgdGhhdCBsaW1pdCxcblx0XHQgKiBtYWtpbmcgdGhlIHVzZXIgdGhpbmsgdGhhdCBNQ0cgXCJlYXRzXCIgdGhlbSBhbmQgbmV2ZXIgZGlzcGxheXMgdGhlbSBhZ2Fpbi5cblx0XHQgKiBAcGFyYW0gYm91bmRzIEwuTGF0TG5nQm91bmRzXG5cdFx0ICogQHJldHVybnMge0wuTGF0TG5nQm91bmRzfVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0X2NoZWNrQm91bmRzTWF4TGF0OiBmdW5jdGlvbiAoYm91bmRzKSB7XG5cdFx0XHR2YXIgbWF4TGF0ID0gdGhpcy5fbWF4TGF0O1xuXG5cdFx0XHRpZiAobWF4TGF0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKGJvdW5kcy5nZXROb3J0aCgpID49IG1heExhdCkge1xuXHRcdFx0XHRcdGJvdW5kcy5fbm9ydGhFYXN0LmxhdCA9IEluZmluaXR5O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChib3VuZHMuZ2V0U291dGgoKSA8PSAtbWF4TGF0KSB7XG5cdFx0XHRcdFx0Ym91bmRzLl9zb3V0aFdlc3QubGF0ID0gLUluZmluaXR5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBib3VuZHM7XG5cdFx0fSxcblxuXHRcdC8vU2hhcmVkIGFuaW1hdGlvbiBjb2RlXG5cdFx0X2FuaW1hdGlvbkFkZExheWVyTm9uQW5pbWF0ZWQ6IGZ1bmN0aW9uIChsYXllciwgbmV3Q2x1c3Rlcikge1xuXHRcdFx0aWYgKG5ld0NsdXN0ZXIgPT09IGxheWVyKSB7XG5cdFx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5hZGRMYXllcihsYXllcik7XG5cdFx0XHR9IGVsc2UgaWYgKG5ld0NsdXN0ZXIuX2NoaWxkQ291bnQgPT09IDIpIHtcblx0XHRcdFx0bmV3Q2x1c3Rlci5fYWRkVG9NYXAoKTtcblxuXHRcdFx0XHR2YXIgbWFya2VycyA9IG5ld0NsdXN0ZXIuZ2V0QWxsQ2hpbGRNYXJrZXJzKCk7XG5cdFx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5yZW1vdmVMYXllcihtYXJrZXJzWzBdKTtcblx0XHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLnJlbW92ZUxheWVyKG1hcmtlcnNbMV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3Q2x1c3Rlci5fdXBkYXRlSWNvbigpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBFeHRyYWN0cyBpbmRpdmlkdWFsIChpLmUuIG5vbi1ncm91cCkgbGF5ZXJzIGZyb20gYSBMYXllciBHcm91cC5cblx0XHQgKiBAcGFyYW0gZ3JvdXAgdG8gZXh0cmFjdCBsYXllcnMgZnJvbS5cblx0XHQgKiBAcGFyYW0gb3V0cHV0IHtBcnJheX0gaW4gd2hpY2ggdG8gc3RvcmUgdGhlIGV4dHJhY3RlZCBsYXllcnMuXG5cdFx0ICogQHJldHVybnMgeyp8QXJyYXl9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRfZXh0cmFjdE5vbkdyb3VwTGF5ZXJzOiBmdW5jdGlvbiAoZ3JvdXAsIG91dHB1dCkge1xuXHRcdFx0dmFyIGxheWVycyA9IGdyb3VwLmdldExheWVycygpLFxuXHRcdFx0ICAgIGkgPSAwLFxuXHRcdFx0ICAgIGxheWVyO1xuXG5cdFx0XHRvdXRwdXQgPSBvdXRwdXQgfHwgW107XG5cblx0XHRcdGZvciAoOyBpIDwgbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxheWVyID0gbGF5ZXJzW2ldO1xuXG5cdFx0XHRcdGlmIChsYXllciBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xuXHRcdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhsYXllciwgb3V0cHV0KTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG91dHB1dC5wdXNoKGxheWVyKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW1wbGVtZW50cyB0aGUgc2luZ2xlTWFya2VyTW9kZSBvcHRpb24uXG5cdFx0ICogQHBhcmFtIGxheWVyIE1hcmtlciB0byByZS1zdHlsZSB1c2luZyB0aGUgQ2x1c3RlcnMgaWNvbkNyZWF0ZUZ1bmN0aW9uLlxuXHRcdCAqIEByZXR1cm5zIHtMLkljb259IFRoZSBuZXdseSBjcmVhdGVkIGljb24uXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRfb3ZlcnJpZGVNYXJrZXJJY29uOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRcdHZhciBpY29uID0gbGF5ZXIub3B0aW9ucy5pY29uID0gdGhpcy5vcHRpb25zLmljb25DcmVhdGVGdW5jdGlvbih7XG5cdFx0XHRcdGdldENoaWxkQ291bnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Z2V0QWxsQ2hpbGRNYXJrZXJzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtsYXllcl07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gaWNvbjtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIENvbnN0YW50IGJvdW5kcyB1c2VkIGluIGNhc2Ugb3B0aW9uIFwicmVtb3ZlT3V0c2lkZVZpc2libGVCb3VuZHNcIiBpcyBzZXQgdG8gZmFsc2UuXG5cdEwuTWFya2VyQ2x1c3Rlckdyb3VwLmluY2x1ZGUoe1xuXHRcdF9tYXBCb3VuZHNJbmZpbml0ZTogbmV3IEwuTGF0TG5nQm91bmRzKG5ldyBMLkxhdExuZygtSW5maW5pdHksIC1JbmZpbml0eSksIG5ldyBMLkxhdExuZyhJbmZpbml0eSwgSW5maW5pdHkpKVxuXHR9KTtcblxuXHRMLk1hcmtlckNsdXN0ZXJHcm91cC5pbmNsdWRlKHtcblx0XHRfbm9BbmltYXRpb246IHtcblx0XHRcdC8vTm9uIEFuaW1hdGVkIHZlcnNpb25zIG9mIGV2ZXJ5dGhpbmdcblx0XHRcdF9hbmltYXRpb25TdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvL0RvIG5vdGhpbmcuLi5cblx0XHRcdH0sXG5cdFx0XHRfYW5pbWF0aW9uWm9vbUluOiBmdW5jdGlvbiAocHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCkge1xuXHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcywgTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSwgcHJldmlvdXNab29tTGV2ZWwpO1xuXHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcChudWxsLCBuZXdab29tTGV2ZWwsIHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpKTtcblxuXHRcdFx0XHQvL1dlIGRpZG4ndCBhY3R1YWxseSBhbmltYXRlLCBidXQgd2UgdXNlIHRoaXMgZXZlbnQgdG8gbWVhbiBcImNsdXN0ZXJpbmcgYW5pbWF0aW9ucyBoYXZlIGZpbmlzaGVkXCJcblx0XHRcdFx0dGhpcy5maXJlKCdhbmltYXRpb25lbmQnKTtcblx0XHRcdH0sXG5cdFx0XHRfYW5pbWF0aW9uWm9vbU91dDogZnVuY3Rpb24gKHByZXZpb3VzWm9vbUxldmVsLCBuZXdab29tTGV2ZWwpIHtcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseVJlbW92ZUNoaWxkcmVuRnJvbU1hcCh0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMsIE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksIHByZXZpb3VzWm9vbUxldmVsKTtcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseUFkZENoaWxkcmVuVG9NYXAobnVsbCwgbmV3Wm9vbUxldmVsLCB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSk7XG5cblx0XHRcdFx0Ly9XZSBkaWRuJ3QgYWN0dWFsbHkgYW5pbWF0ZSwgYnV0IHdlIHVzZSB0aGlzIGV2ZW50IHRvIG1lYW4gXCJjbHVzdGVyaW5nIGFuaW1hdGlvbnMgaGF2ZSBmaW5pc2hlZFwiXG5cdFx0XHRcdHRoaXMuZmlyZSgnYW5pbWF0aW9uZW5kJyk7XG5cdFx0XHR9LFxuXHRcdFx0X2FuaW1hdGlvbkFkZExheWVyOiBmdW5jdGlvbiAobGF5ZXIsIG5ld0NsdXN0ZXIpIHtcblx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uQWRkTGF5ZXJOb25BbmltYXRlZChsYXllciwgbmV3Q2x1c3Rlcik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF93aXRoQW5pbWF0aW9uOiB7XG5cdFx0XHQvL0FuaW1hdGVkIHZlcnNpb25zIGhlcmVcblx0XHRcdF9hbmltYXRpb25TdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lICs9ICcgbGVhZmxldC1jbHVzdGVyLWFuaW0nO1xuXHRcdFx0XHR0aGlzLl9pblpvb21BbmltYXRpb24rKztcblx0XHRcdH0sXG5cblx0XHRcdF9hbmltYXRpb25ab29tSW46IGZ1bmN0aW9uIChwcmV2aW91c1pvb21MZXZlbCwgbmV3Wm9vbUxldmVsKSB7XG5cdFx0XHRcdHZhciBib3VuZHMgPSB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSxcblx0XHRcdFx0ICAgIGZnID0gdGhpcy5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpLFxuXHRcdFx0XHQgICAgaTtcblxuXHRcdFx0XHR0aGlzLl9pZ25vcmVNb3ZlID0gdHJ1ZTtcblxuXHRcdFx0XHQvL0FkZCBhbGwgY2hpbGRyZW4gb2YgY3VycmVudCBjbHVzdGVycyB0byBtYXAgYW5kIHJlbW92ZSB0aG9zZSBjbHVzdGVycyBmcm9tIG1hcFxuXHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5KGJvdW5kcywgcHJldmlvdXNab29tTGV2ZWwsIG1pblpvb20sIGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0dmFyIHN0YXJ0UG9zID0gYy5fbGF0bG5nLFxuXHRcdFx0XHRcdCAgICBtYXJrZXJzICA9IGMuX21hcmtlcnMsXG5cdFx0XHRcdFx0ICAgIG07XG5cblx0XHRcdFx0XHRpZiAoIWJvdW5kcy5jb250YWlucyhzdGFydFBvcykpIHtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoYy5faXNTaW5nbGVQYXJlbnQoKSAmJiBwcmV2aW91c1pvb21MZXZlbCArIDEgPT09IG5ld1pvb21MZXZlbCkgeyAvL0ltbWVkaWF0ZWx5IGFkZCB0aGUgbmV3IGNoaWxkIGFuZCByZW1vdmUgdXNcblx0XHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKGMpO1xuXHRcdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwKG51bGwsIG5ld1pvb21MZXZlbCwgYm91bmRzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly9GYWRlIG91dCBvbGQgY2x1c3RlclxuXHRcdFx0XHRcdFx0Yy5jbHVzdGVySGlkZSgpO1xuXHRcdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwKHN0YXJ0UG9zLCBuZXdab29tTGV2ZWwsIGJvdW5kcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9SZW1vdmUgYWxsIG1hcmtlcnMgdGhhdCBhcmVuJ3QgdmlzaWJsZSBhbnkgbW9yZVxuXHRcdFx0XHRcdC8vVE9ETzogRG8gd2UgYWN0dWFsbHkgbmVlZCB0byBkbyB0aGlzIG9uIHRoZSBoaWdoZXIgbGV2ZWxzIHRvbz9cblx0XHRcdFx0XHRmb3IgKGkgPSBtYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRtID0gbWFya2Vyc1tpXTtcblx0XHRcdFx0XHRcdGlmICghYm91bmRzLmNvbnRhaW5zKG0uX2xhdGxuZykpIHtcblx0XHRcdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIobSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuX2ZvcmNlTGF5b3V0KCk7XG5cblx0XHRcdFx0Ly9VcGRhdGUgb3BhY2l0aWVzXG5cdFx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHlCZWNvbWVWaXNpYmxlKGJvdW5kcywgbmV3Wm9vbUxldmVsKTtcblx0XHRcdFx0Ly9UT0RPIE1heWJlPyBVcGRhdGUgbWFya2VycyBpbiBfcmVjdXJzaXZlbHlCZWNvbWVWaXNpYmxlXG5cdFx0XHRcdGZnLmVhY2hMYXllcihmdW5jdGlvbiAobikge1xuXHRcdFx0XHRcdGlmICghKG4gaW5zdGFuY2VvZiBMLk1hcmtlckNsdXN0ZXIpICYmIG4uX2ljb24pIHtcblx0XHRcdFx0XHRcdG4uY2x1c3RlclNob3coKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vdXBkYXRlIHRoZSBwb3NpdGlvbnMgb2YgdGhlIGp1c3QgYWRkZWQgY2x1c3RlcnMvbWFya2Vyc1xuXHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5KGJvdW5kcywgcHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCwgZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHRjLl9yZWN1cnNpdmVseVJlc3RvcmVDaGlsZFBvc2l0aW9ucyhuZXdab29tTGV2ZWwpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLl9pZ25vcmVNb3ZlID0gZmFsc2U7XG5cblx0XHRcdFx0Ly9SZW1vdmUgdGhlIG9sZCBjbHVzdGVycyBhbmQgY2xvc2UgdGhlIHpvb20gYW5pbWF0aW9uXG5cdFx0XHRcdHRoaXMuX2VucXVldWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vdXBkYXRlIHRoZSBwb3NpdGlvbnMgb2YgdGhlIGp1c3QgYWRkZWQgY2x1c3RlcnMvbWFya2Vyc1xuXHRcdFx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHkoYm91bmRzLCBwcmV2aW91c1pvb21MZXZlbCwgbWluWm9vbSwgZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKGMpO1xuXHRcdFx0XHRcdFx0Yy5jbHVzdGVyU2hvdygpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uRW5kKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0X2FuaW1hdGlvblpvb21PdXQ6IGZ1bmN0aW9uIChwcmV2aW91c1pvb21MZXZlbCwgbmV3Wm9vbUxldmVsKSB7XG5cdFx0XHRcdHRoaXMuX2FuaW1hdGlvblpvb21PdXRTaW5nbGUodGhpcy5fdG9wQ2x1c3RlckxldmVsLCBwcmV2aW91c1pvb21MZXZlbCAtIDEsIG5ld1pvb21MZXZlbCk7XG5cblx0XHRcdFx0Ly9OZWVkIHRvIGFkZCBtYXJrZXJzIGZvciB0aG9zZSB0aGF0IHdlcmVuJ3Qgb24gdGhlIG1hcCBiZWZvcmUgYnV0IGFyZSBub3dcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseUFkZENoaWxkcmVuVG9NYXAobnVsbCwgbmV3Wm9vbUxldmVsLCB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSk7XG5cdFx0XHRcdC8vUmVtb3ZlIG1hcmtlcnMgdGhhdCB3ZXJlIG9uIHRoZSBtYXAgYmVmb3JlIGJ1dCB3b24ndCBiZSBub3dcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseVJlbW92ZUNoaWxkcmVuRnJvbU1hcCh0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMsIE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksIHByZXZpb3VzWm9vbUxldmVsLCB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRfYW5pbWF0aW9uQWRkTGF5ZXI6IGZ1bmN0aW9uIChsYXllciwgbmV3Q2x1c3Rlcikge1xuXHRcdFx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdFx0XHQgICAgZmcgPSB0aGlzLl9mZWF0dXJlR3JvdXA7XG5cblx0XHRcdFx0ZmcuYWRkTGF5ZXIobGF5ZXIpO1xuXHRcdFx0XHRpZiAobmV3Q2x1c3RlciAhPT0gbGF5ZXIpIHtcblx0XHRcdFx0XHRpZiAobmV3Q2x1c3Rlci5fY2hpbGRDb3VudCA+IDIpIHsgLy9XYXMgYWxyZWFkeSBhIGNsdXN0ZXJcblxuXHRcdFx0XHRcdFx0bmV3Q2x1c3Rlci5fdXBkYXRlSWNvbigpO1xuXHRcdFx0XHRcdFx0dGhpcy5fZm9yY2VMYXlvdXQoKTtcblx0XHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvblN0YXJ0KCk7XG5cblx0XHRcdFx0XHRcdGxheWVyLl9zZXRQb3ModGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChuZXdDbHVzdGVyLmdldExhdExuZygpKSk7XG5cdFx0XHRcdFx0XHRsYXllci5jbHVzdGVySGlkZSgpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9lbnF1ZXVlKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuXHRcdFx0XHRcdFx0XHRsYXllci5jbHVzdGVyU2hvdygpO1xuXG5cdFx0XHRcdFx0XHRcdG1lLl9hbmltYXRpb25FbmQoKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHsgLy9KdXN0IGJlY2FtZSBhIGNsdXN0ZXJcblx0XHRcdFx0XHRcdHRoaXMuX2ZvcmNlTGF5b3V0KCk7XG5cblx0XHRcdFx0XHRcdG1lLl9hbmltYXRpb25TdGFydCgpO1xuXHRcdFx0XHRcdFx0bWUuX2FuaW1hdGlvblpvb21PdXRTaW5nbGUobmV3Q2x1c3RlciwgdGhpcy5fbWFwLmdldE1heFpvb20oKSwgdGhpcy5fem9vbSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFByaXZhdGUgbWV0aG9kcyBmb3IgYW5pbWF0ZWQgdmVyc2lvbnMuXG5cdFx0X2FuaW1hdGlvblpvb21PdXRTaW5nbGU6IGZ1bmN0aW9uIChjbHVzdGVyLCBwcmV2aW91c1pvb21MZXZlbCwgbmV3Wm9vbUxldmVsKSB7XG5cdFx0XHR2YXIgYm91bmRzID0gdGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCksXG5cdFx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpO1xuXG5cdFx0XHQvL0FuaW1hdGUgYWxsIG9mIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVycyB0byBtb3ZlIHRvIHRoZWlyIGNsdXN0ZXIgY2VudGVyIHBvaW50XG5cdFx0XHRjbHVzdGVyLl9yZWN1cnNpdmVseUFuaW1hdGVDaGlsZHJlbkluQW5kQWRkU2VsZlRvTWFwKGJvdW5kcywgbWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwgKyAxLCBuZXdab29tTGV2ZWwpO1xuXG5cdFx0XHR2YXIgbWUgPSB0aGlzO1xuXG5cdFx0XHQvL1VwZGF0ZSB0aGUgb3BhY2l0eSAoSWYgd2UgaW1tZWRpYXRlbHkgc2V0IGl0IHRoZXkgd29uJ3QgYW5pbWF0ZSlcblx0XHRcdHRoaXMuX2ZvcmNlTGF5b3V0KCk7XG5cdFx0XHRjbHVzdGVyLl9yZWN1cnNpdmVseUJlY29tZVZpc2libGUoYm91bmRzLCBuZXdab29tTGV2ZWwpO1xuXG5cdFx0XHQvL1RPRE86IE1heWJlIHVzZSB0aGUgdHJhbnNpdGlvbiB0aW1pbmcgc3R1ZmYgdG8gbWFrZSB0aGlzIG1vcmUgcmVsaWFibGVcblx0XHRcdC8vV2hlbiB0aGUgYW5pbWF0aW9ucyBhcmUgZG9uZSwgdGlkeSB1cFxuXHRcdFx0dGhpcy5fZW5xdWV1ZShmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0Ly9UaGlzIGNsdXN0ZXIgc3RvcHBlZCBiZWluZyBhIGNsdXN0ZXIgYmVmb3JlIHRoZSB0aW1lb3V0IGZpcmVkXG5cdFx0XHRcdGlmIChjbHVzdGVyLl9jaGlsZENvdW50ID09PSAxKSB7XG5cdFx0XHRcdFx0dmFyIG0gPSBjbHVzdGVyLl9tYXJrZXJzWzBdO1xuXHRcdFx0XHRcdC8vSWYgd2Ugd2VyZSBpbiBhIGNsdXN0ZXIgYW5pbWF0aW9uIGF0IHRoZSB0aW1lIHRoZW4gdGhlIG9wYWNpdHkgYW5kIHBvc2l0aW9uIG9mIG91ciBjaGlsZCBjb3VsZCBiZSB3cm9uZyBub3csIHNvIGZpeCBpdFxuXHRcdFx0XHRcdHRoaXMuX2lnbm9yZU1vdmUgPSB0cnVlO1xuXHRcdFx0XHRcdG0uc2V0TGF0TG5nKG0uZ2V0TGF0TG5nKCkpO1xuXHRcdFx0XHRcdHRoaXMuX2lnbm9yZU1vdmUgPSBmYWxzZTtcblx0XHRcdFx0XHRpZiAobS5jbHVzdGVyU2hvdykge1xuXHRcdFx0XHRcdFx0bS5jbHVzdGVyU2hvdygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjbHVzdGVyLl9yZWN1cnNpdmVseShib3VuZHMsIG5ld1pvb21MZXZlbCwgbWluWm9vbSwgZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHRcdGMuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKGJvdW5kcywgbWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwgKyAxKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRtZS5fYW5pbWF0aW9uRW5kKCk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0X2FuaW1hdGlvbkVuZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuX21hcCkge1xuXHRcdFx0XHR0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lID0gdGhpcy5fbWFwLl9tYXBQYW5lLmNsYXNzTmFtZS5yZXBsYWNlKCcgbGVhZmxldC1jbHVzdGVyLWFuaW0nLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9pblpvb21BbmltYXRpb24tLTtcblx0XHRcdHRoaXMuZmlyZSgnYW5pbWF0aW9uZW5kJyk7XG5cdFx0fSxcblxuXHRcdC8vRm9yY2UgYSBicm93c2VyIGxheW91dCBvZiBzdHVmZiBpbiB0aGUgbWFwXG5cdFx0Ly8gU2hvdWxkIGFwcGx5IHRoZSBjdXJyZW50IG9wYWNpdHkgYW5kIGxvY2F0aW9uIHRvIGFsbCBlbGVtZW50cyBzbyB3ZSBjYW4gdXBkYXRlIHRoZW0gYWdhaW4gZm9yIGFuIGFuaW1hdGlvblxuXHRcdF9mb3JjZUxheW91dDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly9JbiBteSB0ZXN0aW5nIHRoaXMgd29ya3MsIGluZmFjdCBvZmZzZXRXaWR0aCBvZiBhbnkgZWxlbWVudCBzZWVtcyB0byB3b3JrLlxuXHRcdFx0Ly9Db3VsZCBsb29wIGFsbCB0aGlzLl9sYXllcnMgYW5kIGRvIHRoaXMgZm9yIGVhY2ggX2ljb24gaWYgaXQgc3RvcHMgd29ya2luZ1xuXG5cdFx0XHRMLlV0aWwuZmFsc2VGbihkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoKTtcblx0XHR9XG5cdH0pO1xuXG5cdEwubWFya2VyQ2x1c3Rlckdyb3VwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gbmV3IEwuTWFya2VyQ2x1c3Rlckdyb3VwKG9wdGlvbnMpO1xuXHR9O1xuXG5cdHZhciBNYXJrZXJDbHVzdGVyID0gTC5NYXJrZXJDbHVzdGVyID0gTC5NYXJrZXIuZXh0ZW5kKHtcblx0XHRvcHRpb25zOiBMLkljb24ucHJvdG90eXBlLm9wdGlvbnMsXG5cblx0XHRpbml0aWFsaXplOiBmdW5jdGlvbiAoZ3JvdXAsIHpvb20sIGEsIGIpIHtcblxuXHRcdFx0TC5NYXJrZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBhID8gKGEuX2NMYXRMbmcgfHwgYS5nZXRMYXRMbmcoKSkgOiBuZXcgTC5MYXRMbmcoMCwgMCksXG5cdCAgICAgICAgICAgIHsgaWNvbjogdGhpcywgcGFuZTogZ3JvdXAub3B0aW9ucy5jbHVzdGVyUGFuZSB9KTtcblxuXHRcdFx0dGhpcy5fZ3JvdXAgPSBncm91cDtcblx0XHRcdHRoaXMuX3pvb20gPSB6b29tO1xuXG5cdFx0XHR0aGlzLl9tYXJrZXJzID0gW107XG5cdFx0XHR0aGlzLl9jaGlsZENsdXN0ZXJzID0gW107XG5cdFx0XHR0aGlzLl9jaGlsZENvdW50ID0gMDtcblx0XHRcdHRoaXMuX2ljb25OZWVkc1VwZGF0ZSA9IHRydWU7XG5cdFx0XHR0aGlzLl9ib3VuZHNOZWVkVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy5fYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKCk7XG5cblx0XHRcdGlmIChhKSB7XG5cdFx0XHRcdHRoaXMuX2FkZENoaWxkKGEpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGIpIHtcblx0XHRcdFx0dGhpcy5fYWRkQ2hpbGQoYik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vUmVjdXJzaXZlbHkgcmV0cmlldmUgYWxsIGNoaWxkIG1hcmtlcnMgb2YgdGhpcyBjbHVzdGVyXG5cdFx0Z2V0QWxsQ2hpbGRNYXJrZXJzOiBmdW5jdGlvbiAoc3RvcmFnZUFycmF5LCBpZ25vcmVEcmFnZ2VkTWFya2VyKSB7XG5cdFx0XHRzdG9yYWdlQXJyYXkgPSBzdG9yYWdlQXJyYXkgfHwgW107XG5cblx0XHRcdGZvciAodmFyIGkgPSB0aGlzLl9jaGlsZENsdXN0ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdHRoaXMuX2NoaWxkQ2x1c3RlcnNbaV0uZ2V0QWxsQ2hpbGRNYXJrZXJzKHN0b3JhZ2VBcnJheSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGogPSB0aGlzLl9tYXJrZXJzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG5cdFx0XHRcdGlmIChpZ25vcmVEcmFnZ2VkTWFya2VyICYmIHRoaXMuX21hcmtlcnNbal0uX19kcmFnU3RhcnQpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzdG9yYWdlQXJyYXkucHVzaCh0aGlzLl9tYXJrZXJzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHN0b3JhZ2VBcnJheTtcblx0XHR9LFxuXG5cdFx0Ly9SZXR1cm5zIHRoZSBjb3VudCBvZiBob3cgbWFueSBjaGlsZCBtYXJrZXJzIHdlIGhhdmVcblx0XHRnZXRDaGlsZENvdW50OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY2hpbGRDb3VudDtcblx0XHR9LFxuXG5cdFx0Ly9ab29tIHRvIHRoZSBtaW5pbXVtIG9mIHNob3dpbmcgYWxsIG9mIHRoZSBjaGlsZCBtYXJrZXJzLCBvciB0aGUgZXh0ZW50cyBvZiB0aGlzIGNsdXN0ZXJcblx0XHR6b29tVG9Cb3VuZHM6IGZ1bmN0aW9uIChmaXRCb3VuZHNPcHRpb25zKSB7XG5cdFx0XHR2YXIgY2hpbGRDbHVzdGVycyA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMuc2xpY2UoKSxcblx0XHRcdFx0bWFwID0gdGhpcy5fZ3JvdXAuX21hcCxcblx0XHRcdFx0Ym91bmRzWm9vbSA9IG1hcC5nZXRCb3VuZHNab29tKHRoaXMuX2JvdW5kcyksXG5cdFx0XHRcdHpvb20gPSB0aGlzLl96b29tICsgMSxcblx0XHRcdFx0bWFwWm9vbSA9IG1hcC5nZXRab29tKCksXG5cdFx0XHRcdGk7XG5cblx0XHRcdC8vY2FsY3VsYXRlIGhvdyBmYXIgd2UgbmVlZCB0byB6b29tIGRvd24gdG8gc2VlIGFsbCBvZiB0aGUgbWFya2Vyc1xuXHRcdFx0d2hpbGUgKGNoaWxkQ2x1c3RlcnMubGVuZ3RoID4gMCAmJiBib3VuZHNab29tID4gem9vbSkge1xuXHRcdFx0XHR6b29tKys7XG5cdFx0XHRcdHZhciBuZXdDbHVzdGVycyA9IFtdO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hpbGRDbHVzdGVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdG5ld0NsdXN0ZXJzID0gbmV3Q2x1c3RlcnMuY29uY2F0KGNoaWxkQ2x1c3RlcnNbaV0uX2NoaWxkQ2x1c3RlcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNoaWxkQ2x1c3RlcnMgPSBuZXdDbHVzdGVycztcblx0XHRcdH1cblxuXHRcdFx0aWYgKGJvdW5kc1pvb20gPiB6b29tKSB7XG5cdFx0XHRcdHRoaXMuX2dyb3VwLl9tYXAuc2V0Vmlldyh0aGlzLl9sYXRsbmcsIHpvb20pO1xuXHRcdFx0fSBlbHNlIGlmIChib3VuZHNab29tIDw9IG1hcFpvb20pIHsgLy9JZiBmaXRCb3VuZHMgd291bGRuJ3Qgem9vbSB1cyBkb3duLCB6b29tIHVzIGRvd24gaW5zdGVhZFxuXHRcdFx0XHR0aGlzLl9ncm91cC5fbWFwLnNldFZpZXcodGhpcy5fbGF0bG5nLCBtYXBab29tICsgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9ncm91cC5fbWFwLmZpdEJvdW5kcyh0aGlzLl9ib3VuZHMsIGZpdEJvdW5kc09wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcblx0XHRcdGJvdW5kcy5leHRlbmQodGhpcy5fYm91bmRzKTtcblx0XHRcdHJldHVybiBib3VuZHM7XG5cdFx0fSxcblxuXHRcdF91cGRhdGVJY29uOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9pY29uTmVlZHNVcGRhdGUgPSB0cnVlO1xuXHRcdFx0aWYgKHRoaXMuX2ljb24pIHtcblx0XHRcdFx0dGhpcy5zZXRJY29uKHRoaXMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL0NsdWRnZSBmb3IgSWNvbiwgd2UgcHJldGVuZCB0byBiZSBhbiBpY29uIGZvciBwZXJmb3JtYW5jZVxuXHRcdGNyZWF0ZUljb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLl9pY29uTmVlZHNVcGRhdGUpIHtcblx0XHRcdFx0dGhpcy5faWNvbk9iaiA9IHRoaXMuX2dyb3VwLm9wdGlvbnMuaWNvbkNyZWF0ZUZ1bmN0aW9uKHRoaXMpO1xuXHRcdFx0XHR0aGlzLl9pY29uTmVlZHNVcGRhdGUgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLl9pY29uT2JqLmNyZWF0ZUljb24oKTtcblx0XHR9LFxuXHRcdGNyZWF0ZVNoYWRvdzogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2ljb25PYmouY3JlYXRlU2hhZG93KCk7XG5cdFx0fSxcblxuXG5cdFx0X2FkZENoaWxkOiBmdW5jdGlvbiAobmV3MSwgaXNOb3RpZmljYXRpb25Gcm9tQ2hpbGQpIHtcblxuXHRcdFx0dGhpcy5faWNvbk5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy5fYm91bmRzTmVlZFVwZGF0ZSA9IHRydWU7XG5cdFx0XHR0aGlzLl9zZXRDbHVzdGVyQ2VudGVyKG5ldzEpO1xuXG5cdFx0XHRpZiAobmV3MSBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlcikge1xuXHRcdFx0XHRpZiAoIWlzTm90aWZpY2F0aW9uRnJvbUNoaWxkKSB7XG5cdFx0XHRcdFx0dGhpcy5fY2hpbGRDbHVzdGVycy5wdXNoKG5ldzEpO1xuXHRcdFx0XHRcdG5ldzEuX19wYXJlbnQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2NoaWxkQ291bnQgKz0gbmV3MS5fY2hpbGRDb3VudDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghaXNOb3RpZmljYXRpb25Gcm9tQ2hpbGQpIHtcblx0XHRcdFx0XHR0aGlzLl9tYXJrZXJzLnB1c2gobmV3MSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2hpbGRDb3VudCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fX3BhcmVudCkge1xuXHRcdFx0XHR0aGlzLl9fcGFyZW50Ll9hZGRDaGlsZChuZXcxLCB0cnVlKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTWFrZXMgc3VyZSB0aGUgY2x1c3RlciBjZW50ZXIgaXMgc2V0LiBJZiBub3QsIHVzZXMgdGhlIGNoaWxkIGNlbnRlciBpZiBpdCBpcyBhIGNsdXN0ZXIsIG9yIHRoZSBtYXJrZXIgcG9zaXRpb24uXG5cdFx0ICogQHBhcmFtIGNoaWxkIEwuTWFya2VyQ2x1c3RlcnxMLk1hcmtlciB0aGF0IHdpbGwgYmUgdXNlZCBhcyBjbHVzdGVyIGNlbnRlciBpZiBub3QgZGVmaW5lZCB5ZXQuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRfc2V0Q2x1c3RlckNlbnRlcjogZnVuY3Rpb24gKGNoaWxkKSB7XG5cdFx0XHRpZiAoIXRoaXMuX2NMYXRMbmcpIHtcblx0XHRcdFx0Ly8gd2hlbiBjbHVzdGVyaW5nLCB0YWtlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2ludCBhcyB0aGUgY2x1c3RlciBjZW50ZXJcblx0XHRcdFx0dGhpcy5fY0xhdExuZyA9IGNoaWxkLl9jTGF0TG5nIHx8IGNoaWxkLl9sYXRsbmc7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEFzc2lnbnMgaW1wb3NzaWJsZSBib3VuZGluZyB2YWx1ZXMgc28gdGhhdCB0aGUgbmV4dCBleHRlbmQgZW50aXJlbHkgZGV0ZXJtaW5lcyB0aGUgbmV3IGJvdW5kcy5cblx0XHQgKiBUaGlzIG1ldGhvZCBhdm9pZHMgaGF2aW5nIHRvIHRyYXNoIHRoZSBwcmV2aW91cyBMLkxhdExuZ0JvdW5kcyBvYmplY3QgYW5kIHRvIGNyZWF0ZSBhIG5ldyBvbmUsIHdoaWNoIGlzIG11Y2ggc2xvd2VyIGZvciB0aGlzIGNsYXNzLlxuXHRcdCAqIEFzIGxvbmcgYXMgdGhlIGJvdW5kcyBhcmUgbm90IGV4dGVuZGVkLCBtb3N0IG90aGVyIG1ldGhvZHMgd291bGQgcHJvYmFibHkgZmFpbCwgYXMgdGhleSB3b3VsZCB3aXRoIGJvdW5kcyBpbml0aWFsaXplZCBidXQgbm90IGV4dGVuZGVkLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0X3Jlc2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xuXG5cdFx0XHRpZiAoYm91bmRzLl9zb3V0aFdlc3QpIHtcblx0XHRcdFx0Ym91bmRzLl9zb3V0aFdlc3QubGF0ID0gSW5maW5pdHk7XG5cdFx0XHRcdGJvdW5kcy5fc291dGhXZXN0LmxuZyA9IEluZmluaXR5O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGJvdW5kcy5fbm9ydGhFYXN0KSB7XG5cdFx0XHRcdGJvdW5kcy5fbm9ydGhFYXN0LmxhdCA9IC1JbmZpbml0eTtcblx0XHRcdFx0Ym91bmRzLl9ub3J0aEVhc3QubG5nID0gLUluZmluaXR5O1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcmVjYWxjdWxhdGVCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBtYXJrZXJzID0gdGhpcy5fbWFya2Vycyxcblx0XHRcdCAgICBjaGlsZENsdXN0ZXJzID0gdGhpcy5fY2hpbGRDbHVzdGVycyxcblx0XHRcdCAgICBsYXRTdW0gPSAwLFxuXHRcdFx0ICAgIGxuZ1N1bSA9IDAsXG5cdFx0XHQgICAgdG90YWxDb3VudCA9IHRoaXMuX2NoaWxkQ291bnQsXG5cdFx0XHQgICAgaSwgY2hpbGQsIGNoaWxkTGF0TG5nLCBjaGlsZENvdW50O1xuXG5cdFx0XHQvLyBDYXNlIHdoZXJlIGFsbCBtYXJrZXJzIGFyZSByZW1vdmVkIGZyb20gdGhlIG1hcCBhbmQgd2UgYXJlIGxlZnQgd2l0aCBqdXN0IGFuIGVtcHR5IF90b3BDbHVzdGVyTGV2ZWwuXG5cdFx0XHRpZiAodG90YWxDb3VudCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlc2V0IHJhdGhlciB0aGFuIGNyZWF0aW5nIGEgbmV3IG9iamVjdCwgZm9yIHBlcmZvcm1hbmNlLlxuXHRcdFx0dGhpcy5fcmVzZXRCb3VuZHMoKTtcblxuXHRcdFx0Ly8gQ2hpbGQgbWFya2Vycy5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNoaWxkTGF0TG5nID0gbWFya2Vyc1tpXS5fbGF0bG5nO1xuXG5cdFx0XHRcdHRoaXMuX2JvdW5kcy5leHRlbmQoY2hpbGRMYXRMbmcpO1xuXG5cdFx0XHRcdGxhdFN1bSArPSBjaGlsZExhdExuZy5sYXQ7XG5cdFx0XHRcdGxuZ1N1bSArPSBjaGlsZExhdExuZy5sbmc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoaWxkIGNsdXN0ZXJzLlxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGNoaWxkQ2x1c3RlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y2hpbGQgPSBjaGlsZENsdXN0ZXJzW2ldO1xuXG5cdFx0XHRcdC8vIFJlLWNvbXB1dGUgY2hpbGQgYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbiBmaXJzdCBpZiBuZWNlc3NhcnkuXG5cdFx0XHRcdGlmIChjaGlsZC5fYm91bmRzTmVlZFVwZGF0ZSkge1xuXHRcdFx0XHRcdGNoaWxkLl9yZWNhbGN1bGF0ZUJvdW5kcygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fYm91bmRzLmV4dGVuZChjaGlsZC5fYm91bmRzKTtcblxuXHRcdFx0XHRjaGlsZExhdExuZyA9IGNoaWxkLl93TGF0TG5nO1xuXHRcdFx0XHRjaGlsZENvdW50ID0gY2hpbGQuX2NoaWxkQ291bnQ7XG5cblx0XHRcdFx0bGF0U3VtICs9IGNoaWxkTGF0TG5nLmxhdCAqIGNoaWxkQ291bnQ7XG5cdFx0XHRcdGxuZ1N1bSArPSBjaGlsZExhdExuZy5sbmcgKiBjaGlsZENvdW50O1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9sYXRsbmcgPSB0aGlzLl93TGF0TG5nID0gbmV3IEwuTGF0TG5nKGxhdFN1bSAvIHRvdGFsQ291bnQsIGxuZ1N1bSAvIHRvdGFsQ291bnQpO1xuXG5cdFx0XHQvLyBSZXNldCBkaXJ0eSBmbGFnLlxuXHRcdFx0dGhpcy5fYm91bmRzTmVlZFVwZGF0ZSA9IGZhbHNlO1xuXHRcdH0sXG5cblx0XHQvL1NldCBvdXIgbWFya2VycyBwb3NpdGlvbiBhcyBnaXZlbiBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcblx0XHRfYWRkVG9NYXA6IGZ1bmN0aW9uIChzdGFydFBvcykge1xuXHRcdFx0aWYgKHN0YXJ0UG9zKSB7XG5cdFx0XHRcdHRoaXMuX2JhY2t1cExhdGxuZyA9IHRoaXMuX2xhdGxuZztcblx0XHRcdFx0dGhpcy5zZXRMYXRMbmcoc3RhcnRQb3MpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZ3JvdXAuX2ZlYXR1cmVHcm91cC5hZGRMYXllcih0aGlzKTtcblx0XHR9LFxuXG5cdFx0X3JlY3Vyc2l2ZWx5QW5pbWF0ZUNoaWxkcmVuSW46IGZ1bmN0aW9uIChib3VuZHMsIGNlbnRlciwgbWF4Wm9vbSkge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCB0aGlzLl9ncm91cC5fbWFwLmdldE1pblpvb20oKSwgbWF4Wm9vbSAtIDEsXG5cdFx0XHRcdGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0dmFyIG1hcmtlcnMgPSBjLl9tYXJrZXJzLFxuXHRcdFx0XHRcdFx0aSwgbTtcblx0XHRcdFx0XHRmb3IgKGkgPSBtYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRtID0gbWFya2Vyc1tpXTtcblxuXHRcdFx0XHRcdFx0Ly9Pbmx5IGRvIGl0IGlmIHRoZSBpY29uIGlzIHN0aWxsIG9uIHRoZSBtYXBcblx0XHRcdFx0XHRcdGlmIChtLl9pY29uKSB7XG5cdFx0XHRcdFx0XHRcdG0uX3NldFBvcyhjZW50ZXIpO1xuXHRcdFx0XHRcdFx0XHRtLmNsdXN0ZXJIaWRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbiAoYykge1xuXHRcdFx0XHRcdHZhciBjaGlsZENsdXN0ZXJzID0gYy5fY2hpbGRDbHVzdGVycyxcblx0XHRcdFx0XHRcdGosIGNtO1xuXHRcdFx0XHRcdGZvciAoaiA9IGNoaWxkQ2x1c3RlcnMubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcblx0XHRcdFx0XHRcdGNtID0gY2hpbGRDbHVzdGVyc1tqXTtcblx0XHRcdFx0XHRcdGlmIChjbS5faWNvbikge1xuXHRcdFx0XHRcdFx0XHRjbS5fc2V0UG9zKGNlbnRlcik7XG5cdFx0XHRcdFx0XHRcdGNtLmNsdXN0ZXJIaWRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRfcmVjdXJzaXZlbHlBbmltYXRlQ2hpbGRyZW5JbkFuZEFkZFNlbGZUb01hcDogZnVuY3Rpb24gKGJvdW5kcywgbWFwTWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCkge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCBuZXdab29tTGV2ZWwsIG1hcE1pblpvb20sXG5cdFx0XHRcdGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHlBbmltYXRlQ2hpbGRyZW5Jbihib3VuZHMsIGMuX2dyb3VwLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGMuZ2V0TGF0TG5nKCkpLnJvdW5kKCksIHByZXZpb3VzWm9vbUxldmVsKTtcblxuXHRcdFx0XHRcdC8vVE9ETzogZGVwdGhUb0FuaW1hdGVJbiBhZmZlY3RzIF9pc1NpbmdsZVBhcmVudCwgaWYgdGhlcmUgaXMgYSBtdWx0aXpvb20gd2UgbWF5L21heSBub3QgYmUuXG5cdFx0XHRcdFx0Ly9BcyBhIGhhY2sgd2Ugb25seSBkbyBhIGFuaW1hdGlvbiBmcmVlIHpvb20gb24gYSBzaW5nbGUgbGV2ZWwgem9vbSwgaWYgc29tZW9uZSBkb2VzIG11bHRpcGxlIGxldmVscyB0aGVuIHdlIGFsd2F5cyBhbmltYXRlXG5cdFx0XHRcdFx0aWYgKGMuX2lzU2luZ2xlUGFyZW50KCkgJiYgcHJldmlvdXNab29tTGV2ZWwgLSAxID09PSBuZXdab29tTGV2ZWwpIHtcblx0XHRcdFx0XHRcdGMuY2x1c3RlclNob3coKTtcblx0XHRcdFx0XHRcdGMuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKGJvdW5kcywgbWFwTWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwpOyAvL0ltbWVkaWF0ZWx5IHJlbW92ZSBvdXIgY2hpbGRyZW4gYXMgd2UgYXJlIHJlcGxhY2luZyB0aGVtLiBUT0RPIHByZXZpb3VzQm91bmRzIG5vdCBib3VuZHNcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Yy5jbHVzdGVySGlkZSgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGMuX2FkZFRvTWFwKCk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdF9yZWN1cnNpdmVseUJlY29tZVZpc2libGU6IGZ1bmN0aW9uIChib3VuZHMsIHpvb21MZXZlbCkge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCB0aGlzLl9ncm91cC5fbWFwLmdldE1pblpvb20oKSwgem9vbUxldmVsLCBudWxsLCBmdW5jdGlvbiAoYykge1xuXHRcdFx0XHRjLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0X3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcDogZnVuY3Rpb24gKHN0YXJ0UG9zLCB6b29tTGV2ZWwsIGJvdW5kcykge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCB0aGlzLl9ncm91cC5fbWFwLmdldE1pblpvb20oKSAtIDEsIHpvb21MZXZlbCxcblx0XHRcdFx0ZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHRpZiAoem9vbUxldmVsID09PSBjLl96b29tKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9BZGQgb3VyIGNoaWxkIG1hcmtlcnMgYXQgc3RhcnRQb3MgKHNvIHRoZXkgY2FuIGJlIGFuaW1hdGVkIG91dClcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gYy5fbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0dmFyIG5tID0gYy5fbWFya2Vyc1tpXTtcblxuXHRcdFx0XHRcdFx0aWYgKCFib3VuZHMuY29udGFpbnMobm0uX2xhdGxuZykpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChzdGFydFBvcykge1xuXHRcdFx0XHRcdFx0XHRubS5fYmFja3VwTGF0bG5nID0gbm0uZ2V0TGF0TG5nKCk7XG5cblx0XHRcdFx0XHRcdFx0bm0uc2V0TGF0TG5nKHN0YXJ0UG9zKTtcblx0XHRcdFx0XHRcdFx0aWYgKG5tLmNsdXN0ZXJIaWRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm0uY2x1c3RlckhpZGUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjLl9ncm91cC5fZmVhdHVyZUdyb3VwLmFkZExheWVyKG5tKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0Yy5fYWRkVG9NYXAoc3RhcnRQb3MpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRfcmVjdXJzaXZlbHlSZXN0b3JlQ2hpbGRQb3NpdGlvbnM6IGZ1bmN0aW9uICh6b29tTGV2ZWwpIHtcblx0XHRcdC8vRml4IHBvc2l0aW9ucyBvZiBjaGlsZCBtYXJrZXJzXG5cdFx0XHRmb3IgKHZhciBpID0gdGhpcy5fbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHR2YXIgbm0gPSB0aGlzLl9tYXJrZXJzW2ldO1xuXHRcdFx0XHRpZiAobm0uX2JhY2t1cExhdGxuZykge1xuXHRcdFx0XHRcdG5tLnNldExhdExuZyhubS5fYmFja3VwTGF0bG5nKTtcblx0XHRcdFx0XHRkZWxldGUgbm0uX2JhY2t1cExhdGxuZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoem9vbUxldmVsIC0gMSA9PT0gdGhpcy5fem9vbSkge1xuXHRcdFx0XHQvL1JlcG9zaXRpb24gY2hpbGQgY2x1c3RlcnNcblx0XHRcdFx0Zm9yICh2YXIgaiA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcblx0XHRcdFx0XHR0aGlzLl9jaGlsZENsdXN0ZXJzW2pdLl9yZXN0b3JlUG9zaXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICh2YXIgayA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMubGVuZ3RoIC0gMTsgayA+PSAwOyBrLS0pIHtcblx0XHRcdFx0XHR0aGlzLl9jaGlsZENsdXN0ZXJzW2tdLl9yZWN1cnNpdmVseVJlc3RvcmVDaGlsZFBvc2l0aW9ucyh6b29tTGV2ZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9yZXN0b3JlUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLl9iYWNrdXBMYXRsbmcpIHtcblx0XHRcdFx0dGhpcy5zZXRMYXRMbmcodGhpcy5fYmFja3VwTGF0bG5nKTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2JhY2t1cExhdGxuZztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9leGNlcHRCb3VuZHM6IElmIHNldCwgZG9uJ3QgcmVtb3ZlIGFueSBtYXJrZXJzL2NsdXN0ZXJzIGluIGl0XG5cdFx0X3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwOiBmdW5jdGlvbiAocHJldmlvdXNCb3VuZHMsIG1hcE1pblpvb20sIHpvb21MZXZlbCwgZXhjZXB0Qm91bmRzKSB7XG5cdFx0XHR2YXIgbSwgaTtcblx0XHRcdHRoaXMuX3JlY3Vyc2l2ZWx5KHByZXZpb3VzQm91bmRzLCBtYXBNaW5ab29tIC0gMSwgem9vbUxldmVsIC0gMSxcblx0XHRcdFx0ZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHQvL1JlbW92ZSBtYXJrZXJzIGF0IGV2ZXJ5IGxldmVsXG5cdFx0XHRcdFx0Zm9yIChpID0gYy5fbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0bSA9IGMuX21hcmtlcnNbaV07XG5cdFx0XHRcdFx0XHRpZiAoIWV4Y2VwdEJvdW5kcyB8fCAhZXhjZXB0Qm91bmRzLmNvbnRhaW5zKG0uX2xhdGxuZykpIHtcblx0XHRcdFx0XHRcdFx0Yy5fZ3JvdXAuX2ZlYXR1cmVHcm91cC5yZW1vdmVMYXllcihtKTtcblx0XHRcdFx0XHRcdFx0aWYgKG0uY2x1c3RlclNob3cpIHtcblx0XHRcdFx0XHRcdFx0XHRtLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0Ly9SZW1vdmUgY2hpbGQgY2x1c3RlcnMgYXQganVzdCB0aGUgYm90dG9tIGxldmVsXG5cdFx0XHRcdFx0Zm9yIChpID0gYy5fY2hpbGRDbHVzdGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0bSA9IGMuX2NoaWxkQ2x1c3RlcnNbaV07XG5cdFx0XHRcdFx0XHRpZiAoIWV4Y2VwdEJvdW5kcyB8fCAhZXhjZXB0Qm91bmRzLmNvbnRhaW5zKG0uX2xhdGxuZykpIHtcblx0XHRcdFx0XHRcdFx0Yy5fZ3JvdXAuX2ZlYXR1cmVHcm91cC5yZW1vdmVMYXllcihtKTtcblx0XHRcdFx0XHRcdFx0aWYgKG0uY2x1c3RlclNob3cpIHtcblx0XHRcdFx0XHRcdFx0XHRtLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdC8vUnVuIHRoZSBnaXZlbiBmdW5jdGlvbnMgcmVjdXJzaXZlbHkgdG8gdGhpcyBhbmQgY2hpbGQgY2x1c3RlcnNcblx0XHQvLyBib3VuZHNUb0FwcGx5VG86IGEgTC5MYXRMbmdCb3VuZHMgcmVwcmVzZW50aW5nIHRoZSBib3VuZHMgb2Ygd2hhdCBjbHVzdGVycyB0byByZWN1cnNlIGluIHRvXG5cdFx0Ly8gem9vbUxldmVsVG9TdGFydDogem9vbSBsZXZlbCB0byBzdGFydCBydW5uaW5nIGZ1bmN0aW9ucyAoaW5jbHVzaXZlKVxuXHRcdC8vIHpvb21MZXZlbFRvU3RvcDogem9vbSBsZXZlbCB0byBzdG9wIHJ1bm5pbmcgZnVuY3Rpb25zIChpbmNsdXNpdmUpXG5cdFx0Ly8gcnVuQXRFdmVyeUxldmVsOiBmdW5jdGlvbiB0aGF0IHRha2VzIGFuIEwuTWFya2VyQ2x1c3RlciBhcyBhbiBhcmd1bWVudCB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIG9uIGV2ZXJ5IGxldmVsXG5cdFx0Ly8gcnVuQXRCb3R0b21MZXZlbDogZnVuY3Rpb24gdGhhdCB0YWtlcyBhbiBMLk1hcmtlckNsdXN0ZXIgYXMgYW4gYXJndW1lbnQgdGhhdCBzaG91bGQgYmUgYXBwbGllZCBhdCBvbmx5IHRoZSBib3R0b20gbGV2ZWxcblx0XHRfcmVjdXJzaXZlbHk6IGZ1bmN0aW9uIChib3VuZHNUb0FwcGx5VG8sIHpvb21MZXZlbFRvU3RhcnQsIHpvb21MZXZlbFRvU3RvcCwgcnVuQXRFdmVyeUxldmVsLCBydW5BdEJvdHRvbUxldmVsKSB7XG5cdFx0XHR2YXIgY2hpbGRDbHVzdGVycyA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMsXG5cdFx0XHQgICAgem9vbSA9IHRoaXMuX3pvb20sXG5cdFx0XHQgICAgaSwgYztcblxuXHRcdFx0aWYgKHpvb21MZXZlbFRvU3RhcnQgPD0gem9vbSkge1xuXHRcdFx0XHRpZiAocnVuQXRFdmVyeUxldmVsKSB7XG5cdFx0XHRcdFx0cnVuQXRFdmVyeUxldmVsKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChydW5BdEJvdHRvbUxldmVsICYmIHpvb20gPT09IHpvb21MZXZlbFRvU3RvcCkge1xuXHRcdFx0XHRcdHJ1bkF0Qm90dG9tTGV2ZWwodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHpvb20gPCB6b29tTGV2ZWxUb1N0YXJ0IHx8IHpvb20gPCB6b29tTGV2ZWxUb1N0b3ApIHtcblx0XHRcdFx0Zm9yIChpID0gY2hpbGRDbHVzdGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdGMgPSBjaGlsZENsdXN0ZXJzW2ldO1xuXHRcdFx0XHRcdGlmIChjLl9ib3VuZHNOZWVkVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRjLl9yZWNhbGN1bGF0ZUJvdW5kcygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYm91bmRzVG9BcHBseVRvLmludGVyc2VjdHMoYy5fYm91bmRzKSkge1xuXHRcdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHkoYm91bmRzVG9BcHBseVRvLCB6b29tTGV2ZWxUb1N0YXJ0LCB6b29tTGV2ZWxUb1N0b3AsIHJ1bkF0RXZlcnlMZXZlbCwgcnVuQXRCb3R0b21MZXZlbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vUmV0dXJucyB0cnVlIGlmIHdlIGFyZSB0aGUgcGFyZW50IG9mIG9ubHkgb25lIGNsdXN0ZXIgYW5kIHRoYXQgY2x1c3RlciBpcyB0aGUgc2FtZSBhcyB1c1xuXHRcdF9pc1NpbmdsZVBhcmVudDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly9Eb24ndCBuZWVkIHRvIGNoZWNrIHRoaXMuX21hcmtlcnMgYXMgdGhlIHJlc3Qgd29uJ3Qgd29yayBpZiB0aGVyZSBhcmUgYW55XG5cdFx0XHRyZXR1cm4gdGhpcy5fY2hpbGRDbHVzdGVycy5sZW5ndGggPiAwICYmIHRoaXMuX2NoaWxkQ2x1c3RlcnNbMF0uX2NoaWxkQ291bnQgPT09IHRoaXMuX2NoaWxkQ291bnQ7XG5cdFx0fVxuXHR9KTtcblxuXHQvKlxuXHQqIEV4dGVuZHMgTC5NYXJrZXIgdG8gaW5jbHVkZSB0d28gZXh0cmEgbWV0aG9kczogY2x1c3RlckhpZGUgYW5kIGNsdXN0ZXJTaG93LlxuXHQqIFxuXHQqIFRoZXkgd29yayBhcyBzZXRPcGFjaXR5KDApIGFuZCBzZXRPcGFjaXR5KDEpIHJlc3BlY3RpdmVseSwgYnV0XG5cdCogZG9uJ3Qgb3ZlcndyaXRlIHRoZSBvcHRpb25zLm9wYWNpdHlcblx0KiBcblx0Ki9cblxuXHRMLk1hcmtlci5pbmNsdWRlKHtcblx0XHRjbHVzdGVySGlkZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGJhY2t1cCA9IHRoaXMub3B0aW9ucy5vcGFjaXR5O1xuXHRcdFx0dGhpcy5zZXRPcGFjaXR5KDApO1xuXHRcdFx0dGhpcy5vcHRpb25zLm9wYWNpdHkgPSBiYWNrdXA7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdFxuXHRcdGNsdXN0ZXJTaG93OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRPcGFjaXR5KHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcblx0XHR9XG5cdH0pO1xuXG5cdEwuRGlzdGFuY2VHcmlkID0gZnVuY3Rpb24gKGNlbGxTaXplKSB7XG5cdFx0dGhpcy5fY2VsbFNpemUgPSBjZWxsU2l6ZTtcblx0XHR0aGlzLl9zcUNlbGxTaXplID0gY2VsbFNpemUgKiBjZWxsU2l6ZTtcblx0XHR0aGlzLl9ncmlkID0ge307XG5cdFx0dGhpcy5fb2JqZWN0UG9pbnQgPSB7IH07XG5cdH07XG5cblx0TC5EaXN0YW5jZUdyaWQucHJvdG90eXBlID0ge1xuXG5cdFx0YWRkT2JqZWN0OiBmdW5jdGlvbiAob2JqLCBwb2ludCkge1xuXHRcdFx0dmFyIHggPSB0aGlzLl9nZXRDb29yZChwb2ludC54KSxcblx0XHRcdCAgICB5ID0gdGhpcy5fZ2V0Q29vcmQocG9pbnQueSksXG5cdFx0XHQgICAgZ3JpZCA9IHRoaXMuX2dyaWQsXG5cdFx0XHQgICAgcm93ID0gZ3JpZFt5XSA9IGdyaWRbeV0gfHwge30sXG5cdFx0XHQgICAgY2VsbCA9IHJvd1t4XSA9IHJvd1t4XSB8fCBbXSxcblx0XHRcdCAgICBzdGFtcCA9IEwuVXRpbC5zdGFtcChvYmopO1xuXG5cdFx0XHR0aGlzLl9vYmplY3RQb2ludFtzdGFtcF0gPSBwb2ludDtcblxuXHRcdFx0Y2VsbC5wdXNoKG9iaik7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZU9iamVjdDogZnVuY3Rpb24gKG9iaiwgcG9pbnQpIHtcblx0XHRcdHRoaXMucmVtb3ZlT2JqZWN0KG9iaik7XG5cdFx0XHR0aGlzLmFkZE9iamVjdChvYmosIHBvaW50KTtcblx0XHR9LFxuXG5cdFx0Ly9SZXR1cm5zIHRydWUgaWYgdGhlIG9iamVjdCB3YXMgZm91bmRcblx0XHRyZW1vdmVPYmplY3Q6IGZ1bmN0aW9uIChvYmosIHBvaW50KSB7XG5cdFx0XHR2YXIgeCA9IHRoaXMuX2dldENvb3JkKHBvaW50LngpLFxuXHRcdFx0ICAgIHkgPSB0aGlzLl9nZXRDb29yZChwb2ludC55KSxcblx0XHRcdCAgICBncmlkID0gdGhpcy5fZ3JpZCxcblx0XHRcdCAgICByb3cgPSBncmlkW3ldID0gZ3JpZFt5XSB8fCB7fSxcblx0XHRcdCAgICBjZWxsID0gcm93W3hdID0gcm93W3hdIHx8IFtdLFxuXHRcdFx0ICAgIGksIGxlbjtcblxuXHRcdFx0ZGVsZXRlIHRoaXMuX29iamVjdFBvaW50W0wuVXRpbC5zdGFtcChvYmopXTtcblxuXHRcdFx0Zm9yIChpID0gMCwgbGVuID0gY2VsbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRpZiAoY2VsbFtpXSA9PT0gb2JqKSB7XG5cblx0XHRcdFx0XHRjZWxsLnNwbGljZShpLCAxKTtcblxuXHRcdFx0XHRcdGlmIChsZW4gPT09IDEpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSByb3dbeF07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRlYWNoT2JqZWN0OiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBpLCBqLCBrLCBsZW4sIHJvdywgY2VsbCwgcmVtb3ZlZCxcblx0XHRcdCAgICBncmlkID0gdGhpcy5fZ3JpZDtcblxuXHRcdFx0Zm9yIChpIGluIGdyaWQpIHtcblx0XHRcdFx0cm93ID0gZ3JpZFtpXTtcblxuXHRcdFx0XHRmb3IgKGogaW4gcm93KSB7XG5cdFx0XHRcdFx0Y2VsbCA9IHJvd1tqXTtcblxuXHRcdFx0XHRcdGZvciAoayA9IDAsIGxlbiA9IGNlbGwubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcblx0XHRcdFx0XHRcdHJlbW92ZWQgPSBmbi5jYWxsKGNvbnRleHQsIGNlbGxba10pO1xuXHRcdFx0XHRcdFx0aWYgKHJlbW92ZWQpIHtcblx0XHRcdFx0XHRcdFx0ay0tO1xuXHRcdFx0XHRcdFx0XHRsZW4tLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Z2V0TmVhck9iamVjdDogZnVuY3Rpb24gKHBvaW50KSB7XG5cdFx0XHR2YXIgeCA9IHRoaXMuX2dldENvb3JkKHBvaW50LngpLFxuXHRcdFx0ICAgIHkgPSB0aGlzLl9nZXRDb29yZChwb2ludC55KSxcblx0XHRcdCAgICBpLCBqLCBrLCByb3csIGNlbGwsIGxlbiwgb2JqLCBkaXN0LFxuXHRcdFx0ICAgIG9iamVjdFBvaW50ID0gdGhpcy5fb2JqZWN0UG9pbnQsXG5cdFx0XHQgICAgY2xvc2VzdERpc3RTcSA9IHRoaXMuX3NxQ2VsbFNpemUsXG5cdFx0XHQgICAgY2xvc2VzdCA9IG51bGw7XG5cblx0XHRcdGZvciAoaSA9IHkgLSAxOyBpIDw9IHkgKyAxOyBpKyspIHtcblx0XHRcdFx0cm93ID0gdGhpcy5fZ3JpZFtpXTtcblx0XHRcdFx0aWYgKHJvdykge1xuXG5cdFx0XHRcdFx0Zm9yIChqID0geCAtIDE7IGogPD0geCArIDE7IGorKykge1xuXHRcdFx0XHRcdFx0Y2VsbCA9IHJvd1tqXTtcblx0XHRcdFx0XHRcdGlmIChjZWxsKSB7XG5cblx0XHRcdFx0XHRcdFx0Zm9yIChrID0gMCwgbGVuID0gY2VsbC5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuXHRcdFx0XHRcdFx0XHRcdG9iaiA9IGNlbGxba107XG5cdFx0XHRcdFx0XHRcdFx0ZGlzdCA9IHRoaXMuX3NxRGlzdChvYmplY3RQb2ludFtMLlV0aWwuc3RhbXAob2JqKV0sIHBvaW50KTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZGlzdCA8IGNsb3Nlc3REaXN0U3EgfHxcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3QgPD0gY2xvc2VzdERpc3RTcSAmJiBjbG9zZXN0ID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbG9zZXN0RGlzdFNxID0gZGlzdDtcblx0XHRcdFx0XHRcdFx0XHRcdGNsb3Nlc3QgPSBvYmo7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2xvc2VzdDtcblx0XHR9LFxuXG5cdFx0X2dldENvb3JkOiBmdW5jdGlvbiAoeCkge1xuXHRcdFx0dmFyIGNvb3JkID0gTWF0aC5mbG9vcih4IC8gdGhpcy5fY2VsbFNpemUpO1xuXHRcdFx0cmV0dXJuIGlzRmluaXRlKGNvb3JkKSA/IGNvb3JkIDogeDtcblx0XHR9LFxuXG5cdFx0X3NxRGlzdDogZnVuY3Rpb24gKHAsIHAyKSB7XG5cdFx0XHR2YXIgZHggPSBwMi54IC0gcC54LFxuXHRcdFx0ICAgIGR5ID0gcDIueSAtIHAueTtcblx0XHRcdHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcblx0XHR9XG5cdH07XG5cblx0LyogQ29weXJpZ2h0IChjKSAyMDEyIHRoZSBhdXRob3JzIGxpc3RlZCBhdCB0aGUgZm9sbG93aW5nIFVSTCwgYW5kL29yXG5cdHRoZSBhdXRob3JzIG9mIHJlZmVyZW5jZWQgYXJ0aWNsZXMgb3IgaW5jb3Jwb3JhdGVkIGV4dGVybmFsIGNvZGU6XG5cdGh0dHA6Ly9lbi5saXRlcmF0ZXByb2dyYW1zLm9yZy9RdWlja2h1bGxfKEphdmFzY3JpcHQpP2FjdGlvbj1oaXN0b3J5Jm9mZnNldD0yMDEyMDQxMDE3NTI1NlxuXG5cdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuXHRhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcblx0XCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG5cdHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcblx0ZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG5cdHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xuXHR0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcblx0aW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcblx0RVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG5cdE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC5cblx0SU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcblx0Q0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCxcblx0VE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEVcblx0U09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cblx0UmV0cmlldmVkIGZyb206IGh0dHA6Ly9lbi5saXRlcmF0ZXByb2dyYW1zLm9yZy9RdWlja2h1bGxfKEphdmFzY3JpcHQpP29sZGlkPTE4NDM0XG5cdCovXG5cblx0KGZ1bmN0aW9uICgpIHtcblx0XHRMLlF1aWNrSHVsbCA9IHtcblxuXHRcdFx0Lypcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBjcHQgYSBwb2ludCB0byBiZSBtZWFzdXJlZCBmcm9tIHRoZSBiYXNlbGluZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gYmwgdGhlIGJhc2VsaW5lLCBhcyByZXByZXNlbnRlZCBieSBhIHR3by1lbGVtZW50XG5cdFx0XHQgKiAgIGFycmF5IG9mIGxhdGxuZyBvYmplY3RzLlxuXHRcdFx0ICogQHJldHVybnMge051bWJlcn0gYW4gYXBwcm94aW1hdGUgZGlzdGFuY2UgbWVhc3VyZVxuXHRcdFx0ICovXG5cdFx0XHRnZXREaXN0YW50OiBmdW5jdGlvbiAoY3B0LCBibCkge1xuXHRcdFx0XHR2YXIgdlkgPSBibFsxXS5sYXQgLSBibFswXS5sYXQsXG5cdFx0XHRcdFx0dlggPSBibFswXS5sbmcgLSBibFsxXS5sbmc7XG5cdFx0XHRcdHJldHVybiAodlggKiAoY3B0LmxhdCAtIGJsWzBdLmxhdCkgKyB2WSAqIChjcHQubG5nIC0gYmxbMF0ubG5nKSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKlxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gYmFzZUxpbmUgYSB0d28tZWxlbWVudCBhcnJheSBvZiBsYXRsbmcgb2JqZWN0c1xuXHRcdFx0ICogICByZXByZXNlbnRpbmcgdGhlIGJhc2VsaW5lIHRvIHByb2plY3QgZnJvbVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gbGF0TG5ncyBhbiBhcnJheSBvZiBsYXRsbmcgb2JqZWN0c1xuXHRcdFx0ICogQHJldHVybnMge09iamVjdH0gdGhlIG1heGltdW0gcG9pbnQgYW5kIGFsbCBuZXcgcG9pbnRzIHRvIHN0YXlcblx0XHRcdCAqICAgaW4gY29uc2lkZXJhdGlvbiBmb3IgdGhlIGh1bGwuXG5cdFx0XHQgKi9cblx0XHRcdGZpbmRNb3N0RGlzdGFudFBvaW50RnJvbUJhc2VMaW5lOiBmdW5jdGlvbiAoYmFzZUxpbmUsIGxhdExuZ3MpIHtcblx0XHRcdFx0dmFyIG1heEQgPSAwLFxuXHRcdFx0XHRcdG1heFB0ID0gbnVsbCxcblx0XHRcdFx0XHRuZXdQb2ludHMgPSBbXSxcblx0XHRcdFx0XHRpLCBwdCwgZDtcblxuXHRcdFx0XHRmb3IgKGkgPSBsYXRMbmdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0cHQgPSBsYXRMbmdzW2ldO1xuXHRcdFx0XHRcdGQgPSB0aGlzLmdldERpc3RhbnQocHQsIGJhc2VMaW5lKTtcblxuXHRcdFx0XHRcdGlmIChkID4gMCkge1xuXHRcdFx0XHRcdFx0bmV3UG9pbnRzLnB1c2gocHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoZCA+IG1heEQpIHtcblx0XHRcdFx0XHRcdG1heEQgPSBkO1xuXHRcdFx0XHRcdFx0bWF4UHQgPSBwdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4geyBtYXhQb2ludDogbWF4UHQsIG5ld1BvaW50czogbmV3UG9pbnRzIH07XG5cdFx0XHR9LFxuXG5cblx0XHRcdC8qXG5cdFx0XHQgKiBHaXZlbiBhIGJhc2VsaW5lLCBjb21wdXRlIHRoZSBjb252ZXggaHVsbCBvZiBsYXRMbmdzIGFzIGFuIGFycmF5XG5cdFx0XHQgKiBvZiBsYXRMbmdzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IGxhdExuZ3Ncblx0XHRcdCAqIEByZXR1cm5zIHtBcnJheX1cblx0XHRcdCAqL1xuXHRcdFx0YnVpbGRDb252ZXhIdWxsOiBmdW5jdGlvbiAoYmFzZUxpbmUsIGxhdExuZ3MpIHtcblx0XHRcdFx0dmFyIGNvbnZleEh1bGxCYXNlTGluZXMgPSBbXSxcblx0XHRcdFx0XHR0ID0gdGhpcy5maW5kTW9zdERpc3RhbnRQb2ludEZyb21CYXNlTGluZShiYXNlTGluZSwgbGF0TG5ncyk7XG5cblx0XHRcdFx0aWYgKHQubWF4UG9pbnQpIHsgLy8gaWYgdGhlcmUgaXMgc3RpbGwgYSBwb2ludCBcIm91dHNpZGVcIiB0aGUgYmFzZSBsaW5lXG5cdFx0XHRcdFx0Y29udmV4SHVsbEJhc2VMaW5lcyA9XG5cdFx0XHRcdFx0XHRjb252ZXhIdWxsQmFzZUxpbmVzLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0dGhpcy5idWlsZENvbnZleEh1bGwoW2Jhc2VMaW5lWzBdLCB0Lm1heFBvaW50XSwgdC5uZXdQb2ludHMpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGNvbnZleEh1bGxCYXNlTGluZXMgPVxuXHRcdFx0XHRcdFx0Y29udmV4SHVsbEJhc2VMaW5lcy5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdHRoaXMuYnVpbGRDb252ZXhIdWxsKFt0Lm1heFBvaW50LCBiYXNlTGluZVsxXV0sIHQubmV3UG9pbnRzKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm4gY29udmV4SHVsbEJhc2VMaW5lcztcblx0XHRcdFx0fSBlbHNlIHsgIC8vIGlmIHRoZXJlIGlzIG5vIG1vcmUgcG9pbnQgXCJvdXRzaWRlXCIgdGhlIGJhc2UgbGluZSwgdGhlIGN1cnJlbnQgYmFzZSBsaW5lIGlzIHBhcnQgb2YgdGhlIGNvbnZleCBodWxsXG5cdFx0XHRcdFx0cmV0dXJuIFtiYXNlTGluZVswXV07XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qXG5cdFx0XHQgKiBHaXZlbiBhbiBhcnJheSBvZiBsYXRsbmdzLCBjb21wdXRlIGEgY29udmV4IGh1bGwgYXMgYW4gYXJyYXlcblx0XHRcdCAqIG9mIGxhdGxuZ3Ncblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBsYXRMbmdzXG5cdFx0XHQgKiBAcmV0dXJucyB7QXJyYXl9XG5cdFx0XHQgKi9cblx0XHRcdGdldENvbnZleEh1bGw6IGZ1bmN0aW9uIChsYXRMbmdzKSB7XG5cdFx0XHRcdC8vIGZpbmQgZmlyc3QgYmFzZWxpbmVcblx0XHRcdFx0dmFyIG1heExhdCA9IGZhbHNlLCBtaW5MYXQgPSBmYWxzZSxcblx0XHRcdFx0XHRtYXhMbmcgPSBmYWxzZSwgbWluTG5nID0gZmFsc2UsXG5cdFx0XHRcdFx0bWF4TGF0UHQgPSBudWxsLCBtaW5MYXRQdCA9IG51bGwsXG5cdFx0XHRcdFx0bWF4TG5nUHQgPSBudWxsLCBtaW5MbmdQdCA9IG51bGwsXG5cdFx0XHRcdFx0bWF4UHQgPSBudWxsLCBtaW5QdCA9IG51bGwsXG5cdFx0XHRcdFx0aTtcblxuXHRcdFx0XHRmb3IgKGkgPSBsYXRMbmdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0dmFyIHB0ID0gbGF0TG5nc1tpXTtcblx0XHRcdFx0XHRpZiAobWF4TGF0ID09PSBmYWxzZSB8fCBwdC5sYXQgPiBtYXhMYXQpIHtcblx0XHRcdFx0XHRcdG1heExhdFB0ID0gcHQ7XG5cdFx0XHRcdFx0XHRtYXhMYXQgPSBwdC5sYXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChtaW5MYXQgPT09IGZhbHNlIHx8IHB0LmxhdCA8IG1pbkxhdCkge1xuXHRcdFx0XHRcdFx0bWluTGF0UHQgPSBwdDtcblx0XHRcdFx0XHRcdG1pbkxhdCA9IHB0LmxhdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG1heExuZyA9PT0gZmFsc2UgfHwgcHQubG5nID4gbWF4TG5nKSB7XG5cdFx0XHRcdFx0XHRtYXhMbmdQdCA9IHB0O1xuXHRcdFx0XHRcdFx0bWF4TG5nID0gcHQubG5nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobWluTG5nID09PSBmYWxzZSB8fCBwdC5sbmcgPCBtaW5MbmcpIHtcblx0XHRcdFx0XHRcdG1pbkxuZ1B0ID0gcHQ7XG5cdFx0XHRcdFx0XHRtaW5MbmcgPSBwdC5sbmc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAobWluTGF0ICE9PSBtYXhMYXQpIHtcblx0XHRcdFx0XHRtaW5QdCA9IG1pbkxhdFB0O1xuXHRcdFx0XHRcdG1heFB0ID0gbWF4TGF0UHQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bWluUHQgPSBtaW5MbmdQdDtcblx0XHRcdFx0XHRtYXhQdCA9IG1heExuZ1B0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGNoID0gW10uY29uY2F0KHRoaXMuYnVpbGRDb252ZXhIdWxsKFttaW5QdCwgbWF4UHRdLCBsYXRMbmdzKSxcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuYnVpbGRDb252ZXhIdWxsKFttYXhQdCwgbWluUHRdLCBsYXRMbmdzKSk7XG5cdFx0XHRcdHJldHVybiBjaDtcblx0XHRcdH1cblx0XHR9O1xuXHR9KCkpO1xuXG5cdEwuTWFya2VyQ2x1c3Rlci5pbmNsdWRlKHtcblx0XHRnZXRDb252ZXhIdWxsOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY2hpbGRNYXJrZXJzID0gdGhpcy5nZXRBbGxDaGlsZE1hcmtlcnMoKSxcblx0XHRcdFx0cG9pbnRzID0gW10sXG5cdFx0XHRcdHAsIGk7XG5cblx0XHRcdGZvciAoaSA9IGNoaWxkTWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRwID0gY2hpbGRNYXJrZXJzW2ldLmdldExhdExuZygpO1xuXHRcdFx0XHRwb2ludHMucHVzaChwKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEwuUXVpY2tIdWxsLmdldENvbnZleEh1bGwocG9pbnRzKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vVGhpcyBjb2RlIGlzIDEwMCUgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2phd2ovT3ZlcmxhcHBpbmdNYXJrZXJTcGlkZXJmaWVyLUxlYWZsZXRcblx0Ly9IdWdlIHRoYW5rcyB0byBqYXdqIGZvciBpbXBsZW1lbnRpbmcgaXQgZmlyc3QgdG8gbWFrZSBteSBqb2IgZWFzeSA6LSlcblxuXHRMLk1hcmtlckNsdXN0ZXIuaW5jbHVkZSh7XG5cblx0XHRfMlBJOiBNYXRoLlBJICogMixcblx0XHRfY2lyY2xlRm9vdFNlcGFyYXRpb246IDI1LCAvL3JlbGF0ZWQgdG8gY2lyY3VtZmVyZW5jZSBvZiBjaXJjbGVcblx0XHRfY2lyY2xlU3RhcnRBbmdsZTogMCxcblxuXHRcdF9zcGlyYWxGb290U2VwYXJhdGlvbjogIDI4LCAvL3JlbGF0ZWQgdG8gc2l6ZSBvZiBzcGlyYWwgKGV4cGVyaW1lbnQhKVxuXHRcdF9zcGlyYWxMZW5ndGhTdGFydDogMTEsXG5cdFx0X3NwaXJhbExlbmd0aEZhY3RvcjogNSxcblxuXHRcdF9jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyOiA5LCAvL3Nob3cgc3BpcmFsIGluc3RlYWQgb2YgY2lyY2xlIGZyb20gdGhpcyBtYXJrZXIgY291bnQgdXB3YXJkcy5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIDAgLT4gYWx3YXlzIHNwaXJhbDsgSW5maW5pdHkgLT4gYWx3YXlzIGNpcmNsZVxuXG5cdFx0c3BpZGVyZnk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLl9ncm91cC5fc3BpZGVyZmllZCA9PT0gdGhpcyB8fCB0aGlzLl9ncm91cC5faW5ab29tQW5pbWF0aW9uKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNoaWxkTWFya2VycyA9IHRoaXMuZ2V0QWxsQ2hpbGRNYXJrZXJzKG51bGwsIHRydWUpLFxuXHRcdFx0XHRncm91cCA9IHRoaXMuX2dyb3VwLFxuXHRcdFx0XHRtYXAgPSBncm91cC5fbWFwLFxuXHRcdFx0XHRjZW50ZXIgPSBtYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZyksXG5cdFx0XHRcdHBvc2l0aW9ucztcblxuXHRcdFx0dGhpcy5fZ3JvdXAuX3Vuc3BpZGVyZnkoKTtcblx0XHRcdHRoaXMuX2dyb3VwLl9zcGlkZXJmaWVkID0gdGhpcztcblxuXHRcdFx0Ly9UT0RPIE1heWJlOiBjaGlsZE1hcmtlcnMgb3JkZXIgYnkgZGlzdGFuY2UgdG8gY2VudGVyXG5cblx0XHRcdGlmICh0aGlzLl9ncm91cC5vcHRpb25zLnNwaWRlcmZ5U2hhcGVQb3NpdGlvbnMpIHtcblx0XHRcdFx0cG9zaXRpb25zID0gdGhpcy5fZ3JvdXAub3B0aW9ucy5zcGlkZXJmeVNoYXBlUG9zaXRpb25zKGNoaWxkTWFya2Vycy5sZW5ndGgsIGNlbnRlcik7XG5cdFx0XHR9IGVsc2UgaWYgKGNoaWxkTWFya2Vycy5sZW5ndGggPj0gdGhpcy5fY2lyY2xlU3BpcmFsU3dpdGNob3Zlcikge1xuXHRcdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9nZW5lcmF0ZVBvaW50c1NwaXJhbChjaGlsZE1hcmtlcnMubGVuZ3RoLCBjZW50ZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2VudGVyLnkgKz0gMTA7IC8vIE90aGVyd2lzZSBjaXJjbGVzIGxvb2sgd3JvbmcgPT4gaGFjayBmb3Igc3RhbmRhcmQgYmx1ZSBpY29uLCByZW5kZXJzIGRpZmZlcmVudGx5IGZvciBvdGhlciBpY29ucy5cblx0XHRcdFx0cG9zaXRpb25zID0gdGhpcy5fZ2VuZXJhdGVQb2ludHNDaXJjbGUoY2hpbGRNYXJrZXJzLmxlbmd0aCwgY2VudGVyKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYW5pbWF0aW9uU3BpZGVyZnkoY2hpbGRNYXJrZXJzLCBwb3NpdGlvbnMpO1xuXHRcdH0sXG5cblx0XHR1bnNwaWRlcmZ5OiBmdW5jdGlvbiAoem9vbURldGFpbHMpIHtcblx0XHRcdC8vLyA8cGFyYW0gTmFtZT1cInpvb21EZXRhaWxzXCI+QXJndW1lbnQgZnJvbSB6b29tYW5pbSBpZiBiZWluZyBjYWxsZWQgaW4gYSB6b29tIGFuaW1hdGlvbiBvciBudWxsIG90aGVyd2lzZTwvcGFyYW0+XG5cdFx0XHRpZiAodGhpcy5fZ3JvdXAuX2luWm9vbUFuaW1hdGlvbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hbmltYXRpb25VbnNwaWRlcmZ5KHpvb21EZXRhaWxzKTtcblxuXHRcdFx0dGhpcy5fZ3JvdXAuX3NwaWRlcmZpZWQgPSBudWxsO1xuXHRcdH0sXG5cblx0XHRfZ2VuZXJhdGVQb2ludHNDaXJjbGU6IGZ1bmN0aW9uIChjb3VudCwgY2VudGVyUHQpIHtcblx0XHRcdHZhciBjaXJjdW1mZXJlbmNlID0gdGhpcy5fZ3JvdXAub3B0aW9ucy5zcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciAqIHRoaXMuX2NpcmNsZUZvb3RTZXBhcmF0aW9uICogKDIgKyBjb3VudCksXG5cdFx0XHRcdGxlZ0xlbmd0aCA9IGNpcmN1bWZlcmVuY2UgLyB0aGlzLl8yUEksICAvL3JhZGl1cyBmcm9tIGNpcmN1bWZlcmVuY2Vcblx0XHRcdFx0YW5nbGVTdGVwID0gdGhpcy5fMlBJIC8gY291bnQsXG5cdFx0XHRcdHJlcyA9IFtdLFxuXHRcdFx0XHRpLCBhbmdsZTtcblxuXHRcdFx0bGVnTGVuZ3RoID0gTWF0aC5tYXgobGVnTGVuZ3RoLCAzNSk7IC8vIE1pbmltdW0gZGlzdGFuY2UgdG8gZ2V0IG91dHNpZGUgdGhlIGNsdXN0ZXIgaWNvbi5cblxuXHRcdFx0cmVzLmxlbmd0aCA9IGNvdW50O1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgY291bnQ7IGkrKykgeyAvLyBDbG9ja3dpc2UsIGxpa2Ugc3BpcmFsLlxuXHRcdFx0XHRhbmdsZSA9IHRoaXMuX2NpcmNsZVN0YXJ0QW5nbGUgKyBpICogYW5nbGVTdGVwO1xuXHRcdFx0XHRyZXNbaV0gPSBuZXcgTC5Qb2ludChjZW50ZXJQdC54ICsgbGVnTGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLCBjZW50ZXJQdC55ICsgbGVnTGVuZ3RoICogTWF0aC5zaW4oYW5nbGUpKS5fcm91bmQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9LFxuXG5cdFx0X2dlbmVyYXRlUG9pbnRzU3BpcmFsOiBmdW5jdGlvbiAoY291bnQsIGNlbnRlclB0KSB7XG5cdFx0XHR2YXIgc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgPSB0aGlzLl9ncm91cC5vcHRpb25zLnNwaWRlcmZ5RGlzdGFuY2VNdWx0aXBsaWVyLFxuXHRcdFx0XHRsZWdMZW5ndGggPSBzcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciAqIHRoaXMuX3NwaXJhbExlbmd0aFN0YXJ0LFxuXHRcdFx0XHRzZXBhcmF0aW9uID0gc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgKiB0aGlzLl9zcGlyYWxGb290U2VwYXJhdGlvbixcblx0XHRcdFx0bGVuZ3RoRmFjdG9yID0gc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgKiB0aGlzLl9zcGlyYWxMZW5ndGhGYWN0b3IgKiB0aGlzLl8yUEksXG5cdFx0XHRcdGFuZ2xlID0gMCxcblx0XHRcdFx0cmVzID0gW10sXG5cdFx0XHRcdGk7XG5cblx0XHRcdHJlcy5sZW5ndGggPSBjb3VudDtcblxuXHRcdFx0Ly8gSGlnaGVyIGluZGV4LCBjbG9zZXIgcG9zaXRpb24gdG8gY2x1c3RlciBjZW50ZXIuXG5cdFx0XHRmb3IgKGkgPSBjb3VudDsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0Ly8gU2tpcCB0aGUgZmlyc3QgcG9zaXRpb24sIHNvIHRoYXQgd2UgYXJlIGFscmVhZHkgZmFydGhlciBmcm9tIGNlbnRlciBhbmQgd2UgYXZvaWRcblx0XHRcdFx0Ly8gYmVpbmcgdW5kZXIgdGhlIGRlZmF1bHQgY2x1c3RlciBpY29uIChlc3BlY2lhbGx5IGltcG9ydGFudCBmb3IgQ2lyY2xlIE1hcmtlcnMpLlxuXHRcdFx0XHRpZiAoaSA8IGNvdW50KSB7XG5cdFx0XHRcdFx0cmVzW2ldID0gbmV3IEwuUG9pbnQoY2VudGVyUHQueCArIGxlZ0xlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSwgY2VudGVyUHQueSArIGxlZ0xlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkuX3JvdW5kKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YW5nbGUgKz0gc2VwYXJhdGlvbiAvIGxlZ0xlbmd0aCArIGkgKiAwLjAwMDU7XG5cdFx0XHRcdGxlZ0xlbmd0aCArPSBsZW5ndGhGYWN0b3IgLyBhbmdsZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXM7XG5cdFx0fSxcblxuXHRcdF9ub2FuaW1hdGlvblVuc3BpZGVyZnk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBncm91cCA9IHRoaXMuX2dyb3VwLFxuXHRcdFx0XHRtYXAgPSBncm91cC5fbWFwLFxuXHRcdFx0XHRmZyA9IGdyb3VwLl9mZWF0dXJlR3JvdXAsXG5cdFx0XHRcdGNoaWxkTWFya2VycyA9IHRoaXMuZ2V0QWxsQ2hpbGRNYXJrZXJzKG51bGwsIHRydWUpLFxuXHRcdFx0XHRtLCBpO1xuXG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XG5cblx0XHRcdHRoaXMuc2V0T3BhY2l0eSgxKTtcblx0XHRcdGZvciAoaSA9IGNoaWxkTWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xuXG5cdFx0XHRcdGZnLnJlbW92ZUxheWVyKG0pO1xuXG5cdFx0XHRcdGlmIChtLl9wcmVTcGlkZXJmeUxhdGxuZykge1xuXHRcdFx0XHRcdG0uc2V0TGF0TG5nKG0uX3ByZVNwaWRlcmZ5TGF0bG5nKTtcblx0XHRcdFx0XHRkZWxldGUgbS5fcHJlU3BpZGVyZnlMYXRsbmc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG0uc2V0WkluZGV4T2Zmc2V0KSB7XG5cdFx0XHRcdFx0bS5zZXRaSW5kZXhPZmZzZXQoMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAobS5fc3BpZGVyTGVnKSB7XG5cdFx0XHRcdFx0bWFwLnJlbW92ZUxheWVyKG0uX3NwaWRlckxlZyk7XG5cdFx0XHRcdFx0ZGVsZXRlIG0uX3NwaWRlckxlZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRncm91cC5maXJlKCd1bnNwaWRlcmZpZWQnLCB7XG5cdFx0XHRcdGNsdXN0ZXI6IHRoaXMsXG5cdFx0XHRcdG1hcmtlcnM6IGNoaWxkTWFya2Vyc1xuXHRcdFx0fSk7XG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IGZhbHNlO1xuXHRcdFx0Z3JvdXAuX3NwaWRlcmZpZWQgPSBudWxsO1xuXHRcdH1cblx0fSk7XG5cblx0Ly9Ob24gQW5pbWF0ZWQgdmVyc2lvbnMgb2YgZXZlcnl0aGluZ1xuXHRMLk1hcmtlckNsdXN0ZXJOb25BbmltYXRlZCA9IEwuTWFya2VyQ2x1c3Rlci5leHRlbmQoe1xuXHRcdF9hbmltYXRpb25TcGlkZXJmeTogZnVuY3Rpb24gKGNoaWxkTWFya2VycywgcG9zaXRpb25zKSB7XG5cdFx0XHR2YXIgZ3JvdXAgPSB0aGlzLl9ncm91cCxcblx0XHRcdFx0bWFwID0gZ3JvdXAuX21hcCxcblx0XHRcdFx0ZmcgPSBncm91cC5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0XHRsZWdPcHRpb25zID0gdGhpcy5fZ3JvdXAub3B0aW9ucy5zcGlkZXJMZWdQb2x5bGluZU9wdGlvbnMsXG5cdFx0XHRcdGksIG0sIGxlZywgbmV3UG9zO1xuXG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XG5cblx0XHRcdC8vIFRyYXZlcnNlIGluIGFzY2VuZGluZyBvcmRlciB0byBtYWtlIHN1cmUgdGhhdCBpbm5lciBjaXJjbGVNYXJrZXJzIGFyZSBvbiB0b3Agb2YgZnVydGhlciBsZWdzLiBOb3JtYWwgbWFya2VycyBhcmUgcmUtb3JkZXJlZCBieSBuZXdQb3NpdGlvbi5cblx0XHRcdC8vIFRoZSByZXZlcnNlIG9yZGVyIHRyaWNrIG5vIGxvbmdlciBpbXByb3ZlcyBwZXJmb3JtYW5jZSBvbiBtb2Rlcm4gYnJvd3NlcnMuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hpbGRNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG5ld1BvcyA9IG1hcC5sYXllclBvaW50VG9MYXRMbmcocG9zaXRpb25zW2ldKTtcblx0XHRcdFx0bSA9IGNoaWxkTWFya2Vyc1tpXTtcblxuXHRcdFx0XHQvLyBBZGQgdGhlIGxlZyBiZWZvcmUgdGhlIG1hcmtlciwgc28gdGhhdCBpbiBjYXNlIHRoZSBsYXR0ZXIgaXMgYSBjaXJjbGVNYXJrZXIsIHRoZSBsZWcgaXMgYmVoaW5kIGl0LlxuXHRcdFx0XHRsZWcgPSBuZXcgTC5Qb2x5bGluZShbdGhpcy5fbGF0bG5nLCBuZXdQb3NdLCBsZWdPcHRpb25zKTtcblx0XHRcdFx0bWFwLmFkZExheWVyKGxlZyk7XG5cdFx0XHRcdG0uX3NwaWRlckxlZyA9IGxlZztcblxuXHRcdFx0XHQvLyBOb3cgYWRkIHRoZSBtYXJrZXIuXG5cdFx0XHRcdG0uX3ByZVNwaWRlcmZ5TGF0bG5nID0gbS5fbGF0bG5nO1xuXHRcdFx0XHRtLnNldExhdExuZyhuZXdQb3MpO1xuXHRcdFx0XHRpZiAobS5zZXRaSW5kZXhPZmZzZXQpIHtcblx0XHRcdFx0XHRtLnNldFpJbmRleE9mZnNldCgxMDAwMDAwKTsgLy9NYWtlIHRoZXNlIGFwcGVhciBvbiB0b3Agb2YgRVZFUllUSElOR1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZmcuYWRkTGF5ZXIobSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldE9wYWNpdHkoMC4zKTtcblxuXHRcdFx0Z3JvdXAuX2lnbm9yZU1vdmUgPSBmYWxzZTtcblx0XHRcdGdyb3VwLmZpcmUoJ3NwaWRlcmZpZWQnLCB7XG5cdFx0XHRcdGNsdXN0ZXI6IHRoaXMsXG5cdFx0XHRcdG1hcmtlcnM6IGNoaWxkTWFya2Vyc1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdF9hbmltYXRpb25VbnNwaWRlcmZ5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9ub2FuaW1hdGlvblVuc3BpZGVyZnkoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vQW5pbWF0ZWQgdmVyc2lvbnMgaGVyZVxuXHRMLk1hcmtlckNsdXN0ZXIuaW5jbHVkZSh7XG5cblx0XHRfYW5pbWF0aW9uU3BpZGVyZnk6IGZ1bmN0aW9uIChjaGlsZE1hcmtlcnMsIHBvc2l0aW9ucykge1xuXHRcdFx0dmFyIG1lID0gdGhpcyxcblx0XHRcdFx0Z3JvdXAgPSB0aGlzLl9ncm91cCxcblx0XHRcdFx0bWFwID0gZ3JvdXAuX21hcCxcblx0XHRcdFx0ZmcgPSBncm91cC5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0XHR0aGlzTGF5ZXJMYXRMbmcgPSB0aGlzLl9sYXRsbmcsXG5cdFx0XHRcdHRoaXNMYXllclBvcyA9IG1hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpc0xheWVyTGF0TG5nKSxcblx0XHRcdFx0c3ZnID0gTC5QYXRoLlNWRyxcblx0XHRcdFx0bGVnT3B0aW9ucyA9IEwuZXh0ZW5kKHt9LCB0aGlzLl9ncm91cC5vcHRpb25zLnNwaWRlckxlZ1BvbHlsaW5lT3B0aW9ucyksIC8vIENvcHkgdGhlIG9wdGlvbnMgc28gdGhhdCB3ZSBjYW4gbW9kaWZ5IHRoZW0gZm9yIGFuaW1hdGlvbi5cblx0XHRcdFx0ZmluYWxMZWdPcGFjaXR5ID0gbGVnT3B0aW9ucy5vcGFjaXR5LFxuXHRcdFx0XHRpLCBtLCBsZWcsIGxlZ1BhdGgsIGxlZ0xlbmd0aCwgbmV3UG9zO1xuXG5cdFx0XHRpZiAoZmluYWxMZWdPcGFjaXR5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0ZmluYWxMZWdPcGFjaXR5ID0gTC5NYXJrZXJDbHVzdGVyR3JvdXAucHJvdG90eXBlLm9wdGlvbnMuc3BpZGVyTGVnUG9seWxpbmVPcHRpb25zLm9wYWNpdHk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdmcpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIGluaXRpYWwgb3BhY2l0eSBvZiB0aGUgc3BpZGVyIGxlZyBpcyBub3QgMCB0aGVuIGl0IGFwcGVhcnMgYmVmb3JlIHRoZSBhbmltYXRpb24gc3RhcnRzLlxuXHRcdFx0XHRsZWdPcHRpb25zLm9wYWNpdHkgPSAwO1xuXG5cdFx0XHRcdC8vIEFkZCB0aGUgY2xhc3MgZm9yIENTUyB0cmFuc2l0aW9ucy5cblx0XHRcdFx0bGVnT3B0aW9ucy5jbGFzc05hbWUgPSAobGVnT3B0aW9ucy5jbGFzc05hbWUgfHwgJycpICsgJyBsZWFmbGV0LWNsdXN0ZXItc3BpZGVyLWxlZyc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIGRlZmluZWQgb3BhY2l0eS5cblx0XHRcdFx0bGVnT3B0aW9ucy5vcGFjaXR5ID0gZmluYWxMZWdPcGFjaXR5O1xuXHRcdFx0fVxuXG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XG5cblx0XHRcdC8vIEFkZCBtYXJrZXJzIGFuZCBzcGlkZXIgbGVncyB0byBtYXAsIGhpZGRlbiBhdCBvdXIgY2VudGVyIHBvaW50LlxuXHRcdFx0Ly8gVHJhdmVyc2UgaW4gYXNjZW5kaW5nIG9yZGVyIHRvIG1ha2Ugc3VyZSB0aGF0IGlubmVyIGNpcmNsZU1hcmtlcnMgYXJlIG9uIHRvcCBvZiBmdXJ0aGVyIGxlZ3MuIE5vcm1hbCBtYXJrZXJzIGFyZSByZS1vcmRlcmVkIGJ5IG5ld1Bvc2l0aW9uLlxuXHRcdFx0Ly8gVGhlIHJldmVyc2Ugb3JkZXIgdHJpY2sgbm8gbG9uZ2VyIGltcHJvdmVzIHBlcmZvcm1hbmNlIG9uIG1vZGVybiBicm93c2Vycy5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBjaGlsZE1hcmtlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bSA9IGNoaWxkTWFya2Vyc1tpXTtcblxuXHRcdFx0XHRuZXdQb3MgPSBtYXAubGF5ZXJQb2ludFRvTGF0TG5nKHBvc2l0aW9uc1tpXSk7XG5cblx0XHRcdFx0Ly8gQWRkIHRoZSBsZWcgYmVmb3JlIHRoZSBtYXJrZXIsIHNvIHRoYXQgaW4gY2FzZSB0aGUgbGF0dGVyIGlzIGEgY2lyY2xlTWFya2VyLCB0aGUgbGVnIGlzIGJlaGluZCBpdC5cblx0XHRcdFx0bGVnID0gbmV3IEwuUG9seWxpbmUoW3RoaXNMYXllckxhdExuZywgbmV3UG9zXSwgbGVnT3B0aW9ucyk7XG5cdFx0XHRcdG1hcC5hZGRMYXllcihsZWcpO1xuXHRcdFx0XHRtLl9zcGlkZXJMZWcgPSBsZWc7XG5cblx0XHRcdFx0Ly8gRXhwbGFuYXRpb25zOiBodHRwczovL2pha2VhcmNoaWJhbGQuY29tLzIwMTMvYW5pbWF0ZWQtbGluZS1kcmF3aW5nLXN2Zy9cblx0XHRcdFx0Ly8gSW4gb3VyIGNhc2UgdGhlIHRyYW5zaXRpb24gcHJvcGVydHkgaXMgZGVjbGFyZWQgaW4gdGhlIENTUyBmaWxlLlxuXHRcdFx0XHRpZiAoc3ZnKSB7XG5cdFx0XHRcdFx0bGVnUGF0aCA9IGxlZy5fcGF0aDtcblx0XHRcdFx0XHRsZWdMZW5ndGggPSBsZWdQYXRoLmdldFRvdGFsTGVuZ3RoKCkgKyAwLjE7IC8vIE5lZWQgYSBzbWFsbCBleHRyYSBsZW5ndGggdG8gYXZvaWQgcmVtYWluaW5nIGRvdCBpbiBGaXJlZm94LlxuXHRcdFx0XHRcdGxlZ1BhdGguc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gbGVnTGVuZ3RoOyAvLyBKdXN0IDEgbGVuZ3RoIGlzIGVub3VnaCwgaXQgd2lsbCBiZSBkdXBsaWNhdGVkLlxuXHRcdFx0XHRcdGxlZ1BhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGxlZ0xlbmd0aDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElmIGl0IGlzIGEgbWFya2VyLCBhZGQgaXQgbm93IGFuZCB3ZSdsbCBhbmltYXRlIGl0IG91dFxuXHRcdFx0XHRpZiAobS5zZXRaSW5kZXhPZmZzZXQpIHtcblx0XHRcdFx0XHRtLnNldFpJbmRleE9mZnNldCgxMDAwMDAwKTsgLy8gTWFrZSBub3JtYWwgbWFya2VycyBhcHBlYXIgb24gdG9wIG9mIEVWRVJZVEhJTkdcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobS5jbHVzdGVySGlkZSkge1xuXHRcdFx0XHRcdG0uY2x1c3RlckhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gVmVjdG9ycyBqdXN0IGdldCBpbW1lZGlhdGVseSBhZGRlZFxuXHRcdFx0XHRmZy5hZGRMYXllcihtKTtcblxuXHRcdFx0XHRpZiAobS5fc2V0UG9zKSB7XG5cdFx0XHRcdFx0bS5fc2V0UG9zKHRoaXNMYXllclBvcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Z3JvdXAuX2ZvcmNlTGF5b3V0KCk7XG5cdFx0XHRncm91cC5fYW5pbWF0aW9uU3RhcnQoKTtcblxuXHRcdFx0Ly8gUmV2ZWFsIG1hcmtlcnMgYW5kIHNwaWRlciBsZWdzLlxuXHRcdFx0Zm9yIChpID0gY2hpbGRNYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdG5ld1BvcyA9IG1hcC5sYXllclBvaW50VG9MYXRMbmcocG9zaXRpb25zW2ldKTtcblx0XHRcdFx0bSA9IGNoaWxkTWFya2Vyc1tpXTtcblxuXHRcdFx0XHQvL01vdmUgbWFya2VyIHRvIG5ldyBwb3NpdGlvblxuXHRcdFx0XHRtLl9wcmVTcGlkZXJmeUxhdGxuZyA9IG0uX2xhdGxuZztcblx0XHRcdFx0bS5zZXRMYXRMbmcobmV3UG9zKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChtLmNsdXN0ZXJTaG93KSB7XG5cdFx0XHRcdFx0bS5jbHVzdGVyU2hvdygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQW5pbWF0ZSBsZWcgKGFuaW1hdGlvbiBpcyBhY3R1YWxseSBkZWxlZ2F0ZWQgdG8gQ1NTIHRyYW5zaXRpb24pLlxuXHRcdFx0XHRpZiAoc3ZnKSB7XG5cdFx0XHRcdFx0bGVnID0gbS5fc3BpZGVyTGVnO1xuXHRcdFx0XHRcdGxlZ1BhdGggPSBsZWcuX3BhdGg7XG5cdFx0XHRcdFx0bGVnUGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gMDtcblx0XHRcdFx0XHQvL2xlZ1BhdGguc3R5bGUuc3Ryb2tlT3BhY2l0eSA9IGZpbmFsTGVnT3BhY2l0eTtcblx0XHRcdFx0XHRsZWcuc2V0U3R5bGUoe29wYWNpdHk6IGZpbmFsTGVnT3BhY2l0eX0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldE9wYWNpdHkoMC4zKTtcblxuXHRcdFx0Z3JvdXAuX2lnbm9yZU1vdmUgPSBmYWxzZTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGdyb3VwLl9hbmltYXRpb25FbmQoKTtcblx0XHRcdFx0Z3JvdXAuZmlyZSgnc3BpZGVyZmllZCcsIHtcblx0XHRcdFx0XHRjbHVzdGVyOiBtZSxcblx0XHRcdFx0XHRtYXJrZXJzOiBjaGlsZE1hcmtlcnNcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCAyMDApO1xuXHRcdH0sXG5cblx0XHRfYW5pbWF0aW9uVW5zcGlkZXJmeTogZnVuY3Rpb24gKHpvb21EZXRhaWxzKSB7XG5cdFx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdFx0XHRncm91cCA9IHRoaXMuX2dyb3VwLFxuXHRcdFx0XHRtYXAgPSBncm91cC5fbWFwLFxuXHRcdFx0XHRmZyA9IGdyb3VwLl9mZWF0dXJlR3JvdXAsXG5cdFx0XHRcdHRoaXNMYXllclBvcyA9IHpvb21EZXRhaWxzID8gbWFwLl9sYXRMbmdUb05ld0xheWVyUG9pbnQodGhpcy5fbGF0bG5nLCB6b29tRGV0YWlscy56b29tLCB6b29tRGV0YWlscy5jZW50ZXIpIDogbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcpLFxuXHRcdFx0XHRjaGlsZE1hcmtlcnMgPSB0aGlzLmdldEFsbENoaWxkTWFya2VycyhudWxsLCB0cnVlKSxcblx0XHRcdFx0c3ZnID0gTC5QYXRoLlNWRyxcblx0XHRcdFx0bSwgaSwgbGVnLCBsZWdQYXRoLCBsZWdMZW5ndGgsIG5vbkFuaW1hdGFibGU7XG5cblx0XHRcdGdyb3VwLl9pZ25vcmVNb3ZlID0gdHJ1ZTtcblx0XHRcdGdyb3VwLl9hbmltYXRpb25TdGFydCgpO1xuXG5cdFx0XHQvL01ha2UgdXMgdmlzaWJsZSBhbmQgYnJpbmcgdGhlIGNoaWxkIG1hcmtlcnMgYmFjayBpblxuXHRcdFx0dGhpcy5zZXRPcGFjaXR5KDEpO1xuXHRcdFx0Zm9yIChpID0gY2hpbGRNYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdG0gPSBjaGlsZE1hcmtlcnNbaV07XG5cblx0XHRcdFx0Ly9NYXJrZXIgd2FzIGFkZGVkIHRvIHVzIGFmdGVyIHdlIHdlcmUgc3BpZGVyZmllZFxuXHRcdFx0XHRpZiAoIW0uX3ByZVNwaWRlcmZ5TGF0bG5nKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0Nsb3NlIGFueSBwb3B1cCBvbiB0aGUgbWFya2VyIGZpcnN0LCBvdGhlcndpc2Ugc2V0dGluZyB0aGUgbG9jYXRpb24gb2YgdGhlIG1hcmtlciB3aWxsIG1ha2UgdGhlIG1hcCBzY3JvbGxcblx0XHRcdFx0bS5jbG9zZVBvcHVwKCk7XG5cblx0XHRcdFx0Ly9GaXggdXAgdGhlIGxvY2F0aW9uIHRvIHRoZSByZWFsIG9uZVxuXHRcdFx0XHRtLnNldExhdExuZyhtLl9wcmVTcGlkZXJmeUxhdGxuZyk7XG5cdFx0XHRcdGRlbGV0ZSBtLl9wcmVTcGlkZXJmeUxhdGxuZztcblxuXHRcdFx0XHQvL0hhY2sgb3ZlcnJpZGUgdGhlIGxvY2F0aW9uIHRvIGJlIG91ciBjZW50ZXJcblx0XHRcdFx0bm9uQW5pbWF0YWJsZSA9IHRydWU7XG5cdFx0XHRcdGlmIChtLl9zZXRQb3MpIHtcblx0XHRcdFx0XHRtLl9zZXRQb3ModGhpc0xheWVyUG9zKTtcblx0XHRcdFx0XHRub25BbmltYXRhYmxlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG0uY2x1c3RlckhpZGUpIHtcblx0XHRcdFx0XHRtLmNsdXN0ZXJIaWRlKCk7XG5cdFx0XHRcdFx0bm9uQW5pbWF0YWJsZSA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChub25BbmltYXRhYmxlKSB7XG5cdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIobSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBbmltYXRlIHRoZSBzcGlkZXIgbGVnIGJhY2sgaW4gKGFuaW1hdGlvbiBpcyBhY3R1YWxseSBkZWxlZ2F0ZWQgdG8gQ1NTIHRyYW5zaXRpb24pLlxuXHRcdFx0XHRpZiAoc3ZnKSB7XG5cdFx0XHRcdFx0bGVnID0gbS5fc3BpZGVyTGVnO1xuXHRcdFx0XHRcdGxlZ1BhdGggPSBsZWcuX3BhdGg7XG5cdFx0XHRcdFx0bGVnTGVuZ3RoID0gbGVnUGF0aC5nZXRUb3RhbExlbmd0aCgpICsgMC4xO1xuXHRcdFx0XHRcdGxlZ1BhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGxlZ0xlbmd0aDtcblx0XHRcdFx0XHRsZWcuc2V0U3R5bGUoe29wYWNpdHk6IDB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IGZhbHNlO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly9JZiB3ZSBoYXZlIG9ubHkgPD0gb25lIGNoaWxkIGxlZnQgdGhlbiB0aGF0IG1hcmtlciB3aWxsIGJlIHNob3duIG9uIHRoZSBtYXAgc28gZG9uJ3QgcmVtb3ZlIGl0IVxuXHRcdFx0XHR2YXIgc3RpbGxUaGVyZUNoaWxkQ291bnQgPSAwO1xuXHRcdFx0XHRmb3IgKGkgPSBjaGlsZE1hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xuXHRcdFx0XHRcdGlmIChtLl9zcGlkZXJMZWcpIHtcblx0XHRcdFx0XHRcdHN0aWxsVGhlcmVDaGlsZENvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblxuXHRcdFx0XHRmb3IgKGkgPSBjaGlsZE1hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xuXG5cdFx0XHRcdFx0aWYgKCFtLl9zcGlkZXJMZWcpIHsgLy9IYXMgYWxyZWFkeSBiZWVuIHVuc3BpZGVyZmllZFxuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKG0uY2x1c3RlclNob3cpIHtcblx0XHRcdFx0XHRcdG0uY2x1c3RlclNob3coKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG0uc2V0WkluZGV4T2Zmc2V0KSB7XG5cdFx0XHRcdFx0XHRtLnNldFpJbmRleE9mZnNldCgwKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoc3RpbGxUaGVyZUNoaWxkQ291bnQgPiAxKSB7XG5cdFx0XHRcdFx0XHRmZy5yZW1vdmVMYXllcihtKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRtYXAucmVtb3ZlTGF5ZXIobS5fc3BpZGVyTGVnKTtcblx0XHRcdFx0XHRkZWxldGUgbS5fc3BpZGVyTGVnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGdyb3VwLl9hbmltYXRpb25FbmQoKTtcblx0XHRcdFx0Z3JvdXAuZmlyZSgndW5zcGlkZXJmaWVkJywge1xuXHRcdFx0XHRcdGNsdXN0ZXI6IG1lLFxuXHRcdFx0XHRcdG1hcmtlcnM6IGNoaWxkTWFya2Vyc1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sIDIwMCk7XG5cdFx0fVxuXHR9KTtcblxuXG5cdEwuTWFya2VyQ2x1c3Rlckdyb3VwLmluY2x1ZGUoe1xuXHRcdC8vVGhlIE1hcmtlckNsdXN0ZXIgY3VycmVudGx5IHNwaWRlcmZpZWQgKGlmIGFueSlcblx0XHRfc3BpZGVyZmllZDogbnVsbCxcblxuXHRcdHVuc3BpZGVyZnk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX3Vuc3BpZGVyZnkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9LFxuXG5cdFx0X3NwaWRlcmZpZXJPbkFkZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX3Vuc3BpZGVyZnlXcmFwcGVyLCB0aGlzKTtcblxuXHRcdFx0aWYgKHRoaXMuX21hcC5vcHRpb25zLnpvb21BbmltYXRpb24pIHtcblx0XHRcdFx0dGhpcy5fbWFwLm9uKCd6b29tc3RhcnQnLCB0aGlzLl91bnNwaWRlcmZ5Wm9vbVN0YXJ0LCB0aGlzKTtcblx0XHRcdH1cblx0XHRcdC8vQnJvd3NlcnMgd2l0aG91dCB6b29tQW5pbWF0aW9uIG9yIGEgYmlnIHpvb20gZG9uJ3QgZmlyZSB6b29tc3RhcnRcblx0XHRcdHRoaXMuX21hcC5vbignem9vbWVuZCcsIHRoaXMuX25vYW5pbWF0aW9uVW5zcGlkZXJmeSwgdGhpcyk7XG5cblx0XHRcdGlmICghTC5Ccm93c2VyLnRvdWNoKSB7XG5cdFx0XHRcdHRoaXMuX21hcC5nZXRSZW5kZXJlcih0aGlzKTtcblx0XHRcdFx0Ly9OZWVkcyB0byBoYXBwZW4gaW4gdGhlIHBhZ2Vsb2FkLCBub3QgYWZ0ZXIsIG9yIGFuaW1hdGlvbnMgZG9uJ3Qgd29yayBpbiB3ZWJraXRcblx0XHRcdFx0Ly8gIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODQ1NTIwMC9zdmctYW5pbWF0ZS13aXRoLWR5bmFtaWNhbGx5LWFkZGVkLWVsZW1lbnRzXG5cdFx0XHRcdC8vRGlzYWJsZSBvbiB0b3VjaCBicm93c2VycyBhcyB0aGUgYW5pbWF0aW9uIG1lc3NlcyB1cCBvbiBhIHRvdWNoIHpvb20gYW5kIGlzbid0IHZlcnkgbm90aWNhYmxlXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9zcGlkZXJmaWVyT25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fdW5zcGlkZXJmeVdyYXBwZXIsIHRoaXMpO1xuXHRcdFx0dGhpcy5fbWFwLm9mZignem9vbXN0YXJ0JywgdGhpcy5fdW5zcGlkZXJmeVpvb21TdGFydCwgdGhpcyk7XG5cdFx0XHR0aGlzLl9tYXAub2ZmKCd6b29tYW5pbScsIHRoaXMuX3Vuc3BpZGVyZnlab29tQW5pbSwgdGhpcyk7XG5cdFx0XHR0aGlzLl9tYXAub2ZmKCd6b29tZW5kJywgdGhpcy5fbm9hbmltYXRpb25VbnNwaWRlcmZ5LCB0aGlzKTtcblxuXHRcdFx0Ly9FbnN1cmUgdGhhdCBtYXJrZXJzIGFyZSBiYWNrIHdoZXJlIHRoZXkgc2hvdWxkIGJlXG5cdFx0XHQvLyBVc2Ugbm8gYW5pbWF0aW9uIHRvIGF2b2lkIGEgc3RpY2t5IGxlYWZsZXQtY2x1c3Rlci1hbmltIGNsYXNzIG9uIG1hcFBhbmVcblx0XHRcdHRoaXMuX25vYW5pbWF0aW9uVW5zcGlkZXJmeSgpO1xuXHRcdH0sXG5cblx0XHQvL09uIHpvb20gc3RhcnQgd2UgYWRkIGEgem9vbWFuaW0gaGFuZGxlciBzbyB0aGF0IHdlIGFyZSBndWFyYW50ZWVkIHRvIGJlIGxhc3QgKGFmdGVyIG1hcmtlcnMgYXJlIGFuaW1hdGVkKVxuXHRcdC8vVGhpcyBtZWFucyB3ZSBjYW4gZGVmaW5lIHRoZSBhbmltYXRpb24gdGhleSBkbyByYXRoZXIgdGhhbiBNYXJrZXJzIGRvaW5nIGFuIGFuaW1hdGlvbiB0byB0aGVpciBhY3R1YWwgbG9jYXRpb25cblx0XHRfdW5zcGlkZXJmeVpvb21TdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCF0aGlzLl9tYXApIHsgLy9NYXkgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgbWFwIGJ5IGEgem9vbUVuZCBoYW5kbGVyXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fbWFwLm9uKCd6b29tYW5pbScsIHRoaXMuX3Vuc3BpZGVyZnlab29tQW5pbSwgdGhpcyk7XG5cdFx0fSxcblxuXHRcdF91bnNwaWRlcmZ5Wm9vbUFuaW06IGZ1bmN0aW9uICh6b29tRGV0YWlscykge1xuXHRcdFx0Ly9XYWl0IHVudGlsIHRoZSBmaXJzdCB6b29tYW5pbSBhZnRlciB0aGUgdXNlciBoYXMgZmluaXNoZWQgdG91Y2gtem9vbWluZyBiZWZvcmUgcnVubmluZyB0aGUgYW5pbWF0aW9uXG5cdFx0XHRpZiAoTC5Eb21VdGlsLmhhc0NsYXNzKHRoaXMuX21hcC5fbWFwUGFuZSwgJ2xlYWZsZXQtdG91Y2hpbmcnKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX21hcC5vZmYoJ3pvb21hbmltJywgdGhpcy5fdW5zcGlkZXJmeVpvb21BbmltLCB0aGlzKTtcblx0XHRcdHRoaXMuX3Vuc3BpZGVyZnkoem9vbURldGFpbHMpO1xuXHRcdH0sXG5cblx0XHRfdW5zcGlkZXJmeVdyYXBwZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vLyA8c3VtbWFyeT5fdW5zcGlkZXJmeSBidXQgcGFzc2VzIG5vIGFyZ3VtZW50czwvc3VtbWFyeT5cblx0XHRcdHRoaXMuX3Vuc3BpZGVyZnkoKTtcblx0XHR9LFxuXG5cdFx0X3Vuc3BpZGVyZnk6IGZ1bmN0aW9uICh6b29tRGV0YWlscykge1xuXHRcdFx0aWYgKHRoaXMuX3NwaWRlcmZpZWQpIHtcblx0XHRcdFx0dGhpcy5fc3BpZGVyZmllZC51bnNwaWRlcmZ5KHpvb21EZXRhaWxzKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X25vYW5pbWF0aW9uVW5zcGlkZXJmeTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuX3NwaWRlcmZpZWQpIHtcblx0XHRcdFx0dGhpcy5fc3BpZGVyZmllZC5fbm9hbmltYXRpb25VbnNwaWRlcmZ5KCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vSWYgdGhlIGdpdmVuIGxheWVyIGlzIGN1cnJlbnRseSBiZWluZyBzcGlkZXJmaWVkIHRoZW4gd2UgdW5zcGlkZXJmeSBpdCBzbyBpdCBpc24ndCBvbiB0aGUgbWFwIGFueW1vcmUgZXRjXG5cdFx0X3Vuc3BpZGVyZnlMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0XHRpZiAobGF5ZXIuX3NwaWRlckxlZykge1xuXHRcdFx0XHR0aGlzLl9mZWF0dXJlR3JvdXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuXG5cdFx0XHRcdGlmIChsYXllci5jbHVzdGVyU2hvdykge1xuXHRcdFx0XHRcdGxheWVyLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XHQvL1Bvc2l0aW9uIHdpbGwgYmUgZml4ZWQgdXAgaW1tZWRpYXRlbHkgaW4gX2FuaW1hdGlvblVuc3BpZGVyZnlcblx0XHRcdFx0aWYgKGxheWVyLnNldFpJbmRleE9mZnNldCkge1xuXHRcdFx0XHRcdGxheWVyLnNldFpJbmRleE9mZnNldCgwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX21hcC5yZW1vdmVMYXllcihsYXllci5fc3BpZGVyTGVnKTtcblx0XHRcdFx0ZGVsZXRlIGxheWVyLl9zcGlkZXJMZWc7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogQWRkcyAxIHB1YmxpYyBtZXRob2QgdG8gTUNHIGFuZCAxIHRvIEwuTWFya2VyIHRvIGZhY2lsaXRhdGUgY2hhbmdpbmdcblx0ICogbWFya2VycycgaWNvbiBvcHRpb25zIGFuZCByZWZyZXNoaW5nIHRoZWlyIGljb24gYW5kIHRoZWlyIHBhcmVudCBjbHVzdGVyc1xuXHQgKiBhY2NvcmRpbmdseSAoY2FzZSB3aGVyZSB0aGVpciBpY29uQ3JlYXRlRnVuY3Rpb24gdXNlcyBkYXRhIG9mIGNoaWxkTWFya2Vyc1xuXHQgKiB0byBtYWtlIHVwIHRoZSBjbHVzdGVyIGljb24pLlxuXHQgKi9cblxuXG5cdEwuTWFya2VyQ2x1c3Rlckdyb3VwLmluY2x1ZGUoe1xuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZXMgdGhlIGljb24gb2YgYWxsIGNsdXN0ZXJzIHdoaWNoIGFyZSBwYXJlbnRzIG9mIHRoZSBnaXZlbiBtYXJrZXIocykuXG5cdFx0ICogSW4gc2luZ2xlTWFya2VyTW9kZSwgYWxzbyB1cGRhdGVzIHRoZSBnaXZlbiBtYXJrZXIocykgaWNvbi5cblx0XHQgKiBAcGFyYW0gbGF5ZXJzIEwuTWFya2VyQ2x1c3Rlckdyb3VwfEwuTGF5ZXJHcm91cHxBcnJheShMLk1hcmtlcil8TWFwKEwuTWFya2VyKXxcblx0XHQgKiBMLk1hcmtlckNsdXN0ZXJ8TC5NYXJrZXIgKG9wdGlvbmFsKSBsaXN0IG9mIG1hcmtlcnMgKG9yIHNpbmdsZSBtYXJrZXIpIHdob3NlIHBhcmVudFxuXHRcdCAqIGNsdXN0ZXJzIG5lZWQgdG8gYmUgdXBkYXRlZC4gSWYgbm90IHByb3ZpZGVkLCByZXRyaWV2ZXMgYWxsIGNoaWxkIG1hcmtlcnMgb2YgdGhpcy5cblx0XHQgKiBAcmV0dXJucyB7TC5NYXJrZXJDbHVzdGVyR3JvdXB9XG5cdFx0ICovXG5cdFx0cmVmcmVzaENsdXN0ZXJzOiBmdW5jdGlvbiAobGF5ZXJzKSB7XG5cdFx0XHRpZiAoIWxheWVycykge1xuXHRcdFx0XHRsYXllcnMgPSB0aGlzLl90b3BDbHVzdGVyTGV2ZWwuZ2V0QWxsQ2hpbGRNYXJrZXJzKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGxheWVycyBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlckdyb3VwKSB7XG5cdFx0XHRcdGxheWVycyA9IGxheWVycy5fdG9wQ2x1c3RlckxldmVsLmdldEFsbENoaWxkTWFya2VycygpO1xuXHRcdFx0fSBlbHNlIGlmIChsYXllcnMgaW5zdGFuY2VvZiBMLkxheWVyR3JvdXApIHtcblx0XHRcdFx0bGF5ZXJzID0gbGF5ZXJzLl9sYXllcnM7XG5cdFx0XHR9IGVsc2UgaWYgKGxheWVycyBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlcikge1xuXHRcdFx0XHRsYXllcnMgPSBsYXllcnMuZ2V0QWxsQ2hpbGRNYXJrZXJzKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGxheWVycyBpbnN0YW5jZW9mIEwuTWFya2VyKSB7XG5cdFx0XHRcdGxheWVycyA9IFtsYXllcnNdO1xuXHRcdFx0fSAvLyBlbHNlOiBtdXN0IGJlIGFuIEFycmF5KEwuTWFya2VyKXxNYXAoTC5NYXJrZXIpXG5cdFx0XHR0aGlzLl9mbGFnUGFyZW50c0ljb25zTmVlZFVwZGF0ZShsYXllcnMpO1xuXHRcdFx0dGhpcy5fcmVmcmVzaENsdXN0ZXJzSWNvbnMoKTtcblxuXHRcdFx0Ly8gSW4gY2FzZSBvZiBzaW5nbGVNYXJrZXJNb2RlLCBhbHNvIHJlLWRyYXcgdGhlIG1hcmtlcnMuXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnNpbmdsZU1hcmtlck1vZGUpIHtcblx0XHRcdFx0dGhpcy5fcmVmcmVzaFNpbmdsZU1hcmtlck1vZGVNYXJrZXJzKGxheWVycyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBTaW1wbHkgZmxhZ3MgYWxsIHBhcmVudCBjbHVzdGVycyBvZiB0aGUgZ2l2ZW4gbWFya2VycyBhcyBoYXZpbmcgYSBcImRpcnR5XCIgaWNvbi5cblx0XHQgKiBAcGFyYW0gbGF5ZXJzIEFycmF5KEwuTWFya2VyKXxNYXAoTC5NYXJrZXIpIGxpc3Qgb2YgbWFya2Vycy5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9mbGFnUGFyZW50c0ljb25zTmVlZFVwZGF0ZTogZnVuY3Rpb24gKGxheWVycykge1xuXHRcdFx0dmFyIGlkLCBwYXJlbnQ7XG5cblx0XHRcdC8vIEFzc3VtZXMgbGF5ZXJzIGlzIGFuIEFycmF5IG9yIGFuIE9iamVjdCB3aG9zZSBwcm90b3R5cGUgaXMgbm9uLWVudW1lcmFibGUuXG5cdFx0XHRmb3IgKGlkIGluIGxheWVycykge1xuXHRcdFx0XHQvLyBGbGFnIHBhcmVudCBjbHVzdGVycycgaWNvbiBhcyBcImRpcnR5XCIsIGFsbCB0aGUgd2F5IHVwLlxuXHRcdFx0XHQvLyBEdW1iIHByb2Nlc3MgdGhhdCBmbGFncyBtdWx0aXBsZSB0aW1lcyB1cHBlciBwYXJlbnRzLCBidXQgc3RpbGxcblx0XHRcdFx0Ly8gbXVjaCBtb3JlIGVmZmljaWVudCB0aGFuIHRyeWluZyB0byBiZSBzbWFydCBhbmQgbWFrZSBzaG9ydCBsaXN0cyxcblx0XHRcdFx0Ly8gYXQgbGVhc3QgaW4gdGhlIGNhc2Ugb2YgYSBoaWVyYXJjaHkgZm9sbG93aW5nIGEgcG93ZXIgbGF3OlxuXHRcdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS9mbGFnLW5vZGVzLWluLXBvd2VyLWhpZXJhcmNoeS8yXG5cdFx0XHRcdHBhcmVudCA9IGxheWVyc1tpZF0uX19wYXJlbnQ7XG5cdFx0XHRcdHdoaWxlIChwYXJlbnQpIHtcblx0XHRcdFx0XHRwYXJlbnQuX2ljb25OZWVkc1VwZGF0ZSA9IHRydWU7XG5cdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50Ll9fcGFyZW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJlLWRyYXdzIHRoZSBpY29uIG9mIHRoZSBzdXBwbGllZCBtYXJrZXJzLlxuXHRcdCAqIFRvIGJlIHVzZWQgaW4gc2luZ2xlTWFya2VyTW9kZSBvbmx5LlxuXHRcdCAqIEBwYXJhbSBsYXllcnMgQXJyYXkoTC5NYXJrZXIpfE1hcChMLk1hcmtlcikgbGlzdCBvZiBtYXJrZXJzLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0X3JlZnJlc2hTaW5nbGVNYXJrZXJNb2RlTWFya2VyczogZnVuY3Rpb24gKGxheWVycykge1xuXHRcdFx0dmFyIGlkLCBsYXllcjtcblxuXHRcdFx0Zm9yIChpZCBpbiBsYXllcnMpIHtcblx0XHRcdFx0bGF5ZXIgPSBsYXllcnNbaWRdO1xuXG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBkbyBub3Qgb3ZlcnJpZGUgbWFya2VycyB0aGF0IGRvIG5vdCBiZWxvbmcgdG8gVEhJUyBncm91cC5cblx0XHRcdFx0aWYgKHRoaXMuaGFzTGF5ZXIobGF5ZXIpKSB7XG5cdFx0XHRcdFx0Ly8gTmVlZCB0byByZS1jcmVhdGUgdGhlIGljb24gZmlyc3QsIHRoZW4gcmUtZHJhdyB0aGUgbWFya2VyLlxuXHRcdFx0XHRcdGxheWVyLnNldEljb24odGhpcy5fb3ZlcnJpZGVNYXJrZXJJY29uKGxheWVyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdEwuTWFya2VyLmluY2x1ZGUoe1xuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZXMgdGhlIGdpdmVuIG9wdGlvbnMgaW4gdGhlIG1hcmtlcidzIGljb24gYW5kIHJlZnJlc2hlcyB0aGUgbWFya2VyLlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIG1hcCBvYmplY3Qgb2YgaWNvbiBvcHRpb25zLlxuXHRcdCAqIEBwYXJhbSBkaXJlY3RseVJlZnJlc2hDbHVzdGVycyBib29sZWFuIChvcHRpb25hbCkgdHJ1ZSB0byB0cmlnZ2VyXG5cdFx0ICogTUNHLnJlZnJlc2hDbHVzdGVyc09mKCkgcmlnaHQgYXdheSB3aXRoIHRoaXMgc2luZ2xlIG1hcmtlci5cblx0XHQgKiBAcmV0dXJucyB7TC5NYXJrZXJ9XG5cdFx0ICovXG5cdFx0cmVmcmVzaEljb25PcHRpb25zOiBmdW5jdGlvbiAob3B0aW9ucywgZGlyZWN0bHlSZWZyZXNoQ2x1c3RlcnMpIHtcblx0XHRcdHZhciBpY29uID0gdGhpcy5vcHRpb25zLmljb247XG5cblx0XHRcdEwuc2V0T3B0aW9ucyhpY29uLCBvcHRpb25zKTtcblxuXHRcdFx0dGhpcy5zZXRJY29uKGljb24pO1xuXG5cdFx0XHQvLyBTaG9ydGN1dCB0byByZWZyZXNoIHRoZSBhc3NvY2lhdGVkIE1DRyBjbHVzdGVycyByaWdodCBhd2F5LlxuXHRcdFx0Ly8gVG8gYmUgdXNlZCB3aGVuIHJlZnJlc2hpbmcgYSBzaW5nbGUgbWFya2VyLlxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBiZXR0ZXIgdXNlIE1DRy5yZWZyZXNoQ2x1c3RlcnMoKSBvbmNlIGF0IHRoZSBlbmQgd2l0aFxuXHRcdFx0Ly8gdGhlIGxpc3Qgb2YgbW9kaWZpZWQgbWFya2Vycy5cblx0XHRcdGlmIChkaXJlY3RseVJlZnJlc2hDbHVzdGVycyAmJiB0aGlzLl9fcGFyZW50KSB7XG5cdFx0XHRcdHRoaXMuX19wYXJlbnQuX2dyb3VwLnJlZnJlc2hDbHVzdGVycyh0aGlzKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHR9KTtcblxuXHRleHBvcnRzLk1hcmtlckNsdXN0ZXJHcm91cCA9IE1hcmtlckNsdXN0ZXJHcm91cDtcblx0ZXhwb3J0cy5NYXJrZXJDbHVzdGVyID0gTWFya2VyQ2x1c3RlcjtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSk7XG4iLCI8ZGl2IGNsYXNzPVwiY29hY2htYXJrLWJhY2tkcm9wXCIgKm5nSWY9XCJzaG93Q29hY2hNYXJrcyQgfCBhc3luY1wiIChjbGljayk9XCJoaWRlKClcIj5cclxuICA8YXBwLWdlby1mYWIgW2lzT3Blbl09XCJpc09wZW5cIiBbc2hvd0xhYmVsc109XCJmYWxzZVwiIFthbmltYXRlT25FbnRlcl09XCJ0cnVlXCI+PC9hcHAtZ2VvLWZhYj5cclxuICA8ZGl2IGNsYXNzPVwiZ2VvLWNvYWNobWFya1wiIEBnZW8tY29hY2htYXJrLWFuaW1hdGlvbj5cclxuICAgIDxzdmcgd2lkdGg9XCI2NVwiIGhlaWdodD1cIjc2XCIgdmlld0JveD1cIjAgMCA2NSA3NlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICA8cGF0aCBkPVwiTTY0IDYyQzY0IDYyIDUxLjUgNDQuNSAzOC41IDM1LjVDMjUuNSAyNi41IDMgMTUuNSAzIDE1LjVNMyAxNS41TDE4IDE1LjVNMyAxNS41TDEyLjUgMjhcIiBzdHJva2U9XCJ3aGl0ZVwiXHJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMlwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICAgIDxpb24tdGV4dCBjbGFzcz1cImNvYWNobWFyay10ZXh0XCI+e3snQ09BQ0hfTUFSS1MuU0VMRUNUX0dFT19IQVpBUkQnIHwgdHJhbnNsYXRlfX08L2lvbi10ZXh0PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJhZGQtY29hY2htYXJrXCIgQGFkZC10ZXh0LWFuaW1hdGlvbj5cclxuICAgIDxzdmcgd2lkdGg9XCI0MFwiIGhlaWdodD1cIjQ2XCIgdmlld0JveD1cIjAgMCA0MCA0NlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICA8cGF0aCBkPVwiTTEgMUMxIDEgMS41IDE3LjUgMTIgMjdDMjIuNSAzNi41IDM3LjUgNDIuNSAzNy41IDQyLjVNMzcuNSA0Mi41TDI5IDI4LjVNMzcuNSA0Mi41TDIxIDQ0LjVcIiBzdHJva2U9XCJ3aGl0ZVwiXHJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMlwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICAgIDxpb24tdGV4dCBjbGFzcz1cImNvYWNobWFyay10ZXh0XCI+e3snQ09BQ0hfTUFSS1MuQUREX09CU0VSVkFUSU9OUycgfCB0cmFuc2xhdGV9fTwvaW9uLXRleHQ+XHJcbiAgPC9kaXY+XHJcbiAgPGlvbi1mYWIgQGFkZC1mYWItYW5pbWF0aW9uIGNsYXNzPVwiYWRkLWZhYlwiIHZlcnRpY2FsPVwiYm90dG9tXCIgaG9yaXpvbnRhbD1cImVuZFwiIHNsb3Q9XCJmaXhlZFwiPlxyXG4gICAgPGlvbi1mYWItYnV0dG9uPlxyXG4gICAgICA8aW9uLWljb24gbmFtZT1cImFkZFwiPjwvaW9uLWljb24+XHJcbiAgICA8L2lvbi1mYWItYnV0dG9uPlxyXG4gIDwvaW9uLWZhYj5cclxuICA8ZGl2IGNsYXNzPVwid2FybmluZy1jb2FjaG1hcmtcIiBAd2FybmluZy1jb2FjaG1hcmstYW5pbWF0aW9uPlxyXG4gICAgPHN2ZyB3aWR0aD1cIjkwXCIgaGVpZ2h0PVwiNDBcIiB2aWV3Qm94PVwiMCAwIDkwIDQwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgIDxwYXRoIGQ9XCJNMSAxLjVDMSAxLjUgOCAxMCAyNS41IDE4LjVDNDMgMjcgODYuNSAzNS41IDg2LjUgMzUuNU04Ni41IDM1LjVMNzMgMjUuNU04Ni41IDM1LjVMNjQuNSAzOC41XCJcclxuICAgICAgICBzdHJva2U9XCJ3aGl0ZVwiIHN0cm9rZS13aWR0aD1cIjJcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgICA8aW9uLXRleHQgY2xhc3M9XCJjb2FjaG1hcmstdGV4dFwiPnt7ICdDT0FDSF9NQVJLUy5WSUVXX1dBUk5JTkdTJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRleHQ+XHJcbiAgPC9kaXY+XHJcbiAgPGlvbi10YWItYmFyPlxyXG4gICAgPGlvbi10YWItYnV0dG9uIHRhYj1cImhvbWVcIj5cclxuICAgICAgPGlvbi1pY29uIG5hbWU9XCJtYXBcIj48L2lvbi1pY29uPlxyXG4gICAgICA8aW9uLWxhYmVsPnt7J1RBQlMuTUFQJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICA8L2lvbi10YWItYnV0dG9uPlxyXG4gICAgPGlvbi10YWItYnV0dG9uIHRhYj1cIm9ic2VydmF0aW9uLWxpc3RcIj5cclxuICAgICAgPGlvbi1pY29uIG5hbWU9XCJsaXN0XCI+PC9pb24taWNvbj5cclxuICAgICAgPGlvbi1sYWJlbD57eydUQUJTLkxJU1QnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLXRhYi1idXR0b24+XHJcbiAgICA8aW9uLXRhYi1idXR0b24gdGFiPVwid2FybmluZy1saXN0XCI+XHJcbiAgICAgIDxpb24taWNvbiBuYW1lPVwid2FybmluZ1wiIEB3YXJuaW5nLWljb24tYW5pbWF0aW9uIGNsYXNzPVwid2FybmluZy1pY29uXCI+PC9pb24taWNvbj5cclxuICAgICAgPGlvbi1sYWJlbD57eydUQUJTLldBUk5JTkdTJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICA8L2lvbi10YWItYnV0dG9uPlxyXG4gIDwvaW9uLXRhYi1iYXI+XHJcbjwvZGl2PiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIGZyb20sIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgbWFwLFxyXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxyXG4gIGNvbmNhdE1hcCxcclxuICB0YWtlLFxyXG4gIHRha2VVbnRpbCxcclxuICBmaWx0ZXIsXHJcbiAgZGVsYXlcclxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHtcclxuICBDdXN0b21BbmltYXRpb24sXHJcbiAgRUFTRV9JTl9PVVRfQkFDSyxcclxuICBFQVNFX0lOX09VVFxyXG59IGZyb20gJy4uLy4uL2NvcmUvYW5pbWF0aW9ucy9jdXN0b20uYW5pbWF0aW9uJztcclxuaW1wb3J0IHsgZW50ZXJab25lIH0gZnJvbSAnLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWNvYWNoLW1hcmtzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29hY2gtbWFya3MuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvYWNoLW1hcmtzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcihcclxuICAgICAgJ2dlby1jb2FjaG1hcmstYW5pbWF0aW9uJyxcclxuICAgICAgQ3VzdG9tQW5pbWF0aW9uLmNyZWF0ZUVudGVyU2NhbGVJbkFuaW1hdGlvbigxMDAwLCA1MDAsIEVBU0VfSU5fT1VULCAwLjkpXHJcbiAgICApLFxyXG4gICAgdHJpZ2dlcihcclxuICAgICAgJ2FkZC1mYWItYW5pbWF0aW9uJyxcclxuICAgICAgQ3VzdG9tQW5pbWF0aW9uLmNyZWF0ZUVudGVyU2NhbGVJbkFuaW1hdGlvbigzMDAwLCA1MDAsIEVBU0VfSU5fT1VUX0JBQ0spXHJcbiAgICApLFxyXG4gICAgdHJpZ2dlcihcclxuICAgICAgJ2FkZC10ZXh0LWFuaW1hdGlvbicsXHJcbiAgICAgIEN1c3RvbUFuaW1hdGlvbi5jcmVhdGVFbnRlclNjYWxlSW5BbmltYXRpb24oNDAwMCwgNTAwLCBFQVNFX0lOX09VVCwgMC45KVxyXG4gICAgKSxcclxuICAgIHRyaWdnZXIoXHJcbiAgICAgICd3YXJuaW5nLWljb24tYW5pbWF0aW9uJyxcclxuICAgICAgQ3VzdG9tQW5pbWF0aW9uLmNyZWF0ZUVudGVyU2NhbGVJbkFuaW1hdGlvbig1MDAwLCA1MDAsIEVBU0VfSU5fT1VUX0JBQ0spXHJcbiAgICApLFxyXG4gICAgdHJpZ2dlcihcclxuICAgICAgJ3dhcm5pbmctY29hY2htYXJrLWFuaW1hdGlvbicsXHJcbiAgICAgIEN1c3RvbUFuaW1hdGlvbi5jcmVhdGVFbnRlclNjYWxlSW5BbmltYXRpb24oNjAwMCwgNTAwLCBFQVNFX0lOX09VVCwgMC45KVxyXG4gICAgKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvYWNoTWFya3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgc2hvd0NvYWNoTWFya3MkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIGlzT3BlbiA9IGZhbHNlO1xyXG4gIG5nRGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gIGhpZGVTdWJqZWN0ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNob3dDb2FjaE1hcmtzJCA9IG1lcmdlKFxyXG4gICAgICB0aGlzLmdldFNob3dHZW9TZWxlY3RPYnNlcnZhYmxlKCksXHJcbiAgICAgIHRoaXMuaGlkZVN1YmplY3RcclxuICAgICkucGlwZShlbnRlclpvbmUodGhpcy5uZ1pvbmUpKTtcclxuICAgIHRoaXMuZ2V0U2hvd0dlb1NlbGVjdE9ic2VydmFibGUoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSxcclxuICAgICAgICBmaWx0ZXIoKHZhbCkgPT4gdmFsKSxcclxuICAgICAgICBkZWxheSgyMDAwKSxcclxuICAgICAgICBlbnRlclpvbmUodGhpcy5uZ1pvbmUpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2hvd0dlb1NlbGVjdE9ic2VydmFibGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckLnBpcGUoXHJcbiAgICAgIG1hcCgodXMpID0+IHVzLnNob3dHZW9TZWxlY3RJbmZvKSxcclxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGhpZGUoKSB7XHJcbiAgICB0aGlzLmhpZGVTdWJqZWN0Lm5leHQoZmFsc2UpO1xyXG4gICAgY29uc3QgY3VycmVudFNldHRpbmdzID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnNhdmVVc2VyU2V0dGluZ3Moe1xyXG4gICAgICAuLi5jdXJyZW50U2V0dGluZ3MsXHJcbiAgICAgIHNob3dHZW9TZWxlY3RJbmZvOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdEZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cIm1hcC1pdGVtLWJhclwiIChjbGljayk9XCJuYXZpZ2F0ZVRvSXRlbSgpXCIgKm5nSWY9XCJ2aXNpYmxlXCI+XHJcbiAgPGlvbi1ncmlkIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgPGlvbi1yb3c+XHJcbiAgICAgIDxpb24tY29sPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWljb24taXRlbVwiPlxyXG4gICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiY2FyZC1pY29uLWl0ZW0taWNvblwiIHNyYz1cIi9hc3NldHMvaWNvbi90aW1lLnN2Z1wiXHJcbiAgICAgICAgICAgIFtzdmdTdHlsZV09XCJ7J3dpZHRoLnB4JzoxNiwgJ2hlaWdodC5weCc6MTYgIH1cIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57eyB0b3BIZWFkZXIgfCBmb3JtYXREYXRlIHwgYXN5bmMgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pY29uLWl0ZW1cIiAqbmdJZj1cIm1hc2xcIj5cclxuICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImNhcmQtaWNvbi1pdGVtLWljb25cIiBzcmM9XCIvYXNzZXRzL2ljb24vbW9oLnN2Z1wiXHJcbiAgICAgICAgICAgIFtzdmdTdHlsZV09XCJ7J3dpZHRoLnB4JzoxNiwgJ2hlaWdodC5weCc6MTYgIH1cIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57eyBtYXNsIH19IHt7J01BUF9DRU5URVJfSU5GTy5BQk9WRV9TRUFfTEVWRUwnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3c+XHJcbiAgICAgIDxpb24tY29sPlxyXG4gICAgICAgIDxoNSBjbGFzcz1cImlvbi1uby1tYXJnaW4gaW9uLXRleHQtbm93cmFwXCI+e3t0aXRsZX19PC9oNT5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3c+XHJcbiAgICAgIDxpb24tY29sPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWljb24taXRlbVwiPlxyXG4gICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiY2FyZC1pY29uLWl0ZW0taWNvblwiIHNyYz1cIi9hc3NldHMvaWNvbi91c2VyLnN2Z1wiXHJcbiAgICAgICAgICAgIFtzdmdTdHlsZV09XCJ7J3dpZHRoLnB4JzoxNiwgJ2hlaWdodC5weCc6MTYgIH1cIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57e25hbWV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWljb24taXRlbVwiPlxyXG4gICAgICAgICAgPGFwcC1jb21wZXRlbmNlIFtjb21wZXRlbmNlTGV2ZWxdPVwiY29tcGV0ZW5jZUxldmVsXCI+PC9hcHAtY29tcGV0ZW5jZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbiAgPGRpdiBjbGFzcz1cImltZy13cmFwcGVyXCIgKm5nSWY9XCJpbWFnZVVybHMubGVuZ3RoID4gMFwiIFtuZ0NsYXNzXT1cInsnZnVsbCc6IGltYWdlVXJscy5sZW5ndGggPiAxIH1cIj5cclxuICAgIDxhcHAtaW1nLXN3aXBlciBbc2hvd0xhYmVsc109XCJmYWxzZVwiIFtpbWdVcmxdPVwiaW1hZ2VVcmxzXCI+PC9hcHAtaW1nLXN3aXBlcj5cclxuICA8L2Rpdj5cclxuPC9kaXY+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXBJdGVtIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvbWFwLWl0ZW0ubW9kZWwnO1xyXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9oZWxwZXJzL2hlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQsIEFwcE1vZGUgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IEF0dGFjaG1lbnRWaWV3TW9kZWwsIFJlZ2lzdHJhdGlvblZpZXdNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHZW9Qb3NpdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2dlby1wb3NpdGlvbi9nZW8tcG9zaXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IGdldFN0YXJDb3VudCB9IGZyb20gJy4uLy4uL2NvcmUvaGVscGVycy9jb21wZXRlbmNlLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1tYXAtaXRlbS1iYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXAtaXRlbS1iYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hcC1pdGVtLWJhci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBJdGVtQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHZpc2libGU6IGJvb2xlYW47XHJcbiAgdG9wSGVhZGVyOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkaXN0YW5jZUFuZFR5cGU6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBnZW9IYXphcmQ6IEdlb0hhemFyZDtcclxuICBpbWFnZVVybHM6IHN0cmluZ1tdID0gW107XHJcbiAgbWFzbDogbnVtYmVyO1xyXG4gIGNvbXBldGVuY2VMZXZlbDogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2lzVmlzaWJsZTogU3ViamVjdDxib29sZWFuPjtcclxuICBwcml2YXRlIGFwcE1vZGU6IEFwcE1vZGU7XHJcblxyXG4gIGdldCBpc1Zpc2libGUoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogUmV3cml0ZSB0aGlzIGNvbXBvbmVudCB0byB1c2Ugb2JzZXJ2YWJsZS4gTWF5YmUgcHV0IHZpc2libGVNYXBJdGVtIG9ic2VydmFibGUgaW4gbWFwIHNlcnZpY2U/XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBnZW9Qb3NpdGlvblNlcnZpY2U6IEdlb1Bvc2l0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgaGVscGVyOiBIZWxwZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9pc1Zpc2libGUgPSBuZXcgU3ViamVjdCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmFwcE1vZGVMYW5ndWFnZUFuZEN1cnJlbnRHZW9IYXphcmQkLnN1YnNjcmliZShcclxuICAgICAgKFthcHBNb2RlLCBfLCBfX10pID0+IHtcclxuICAgICAgICB0aGlzLmFwcE1vZGUgPSBhcHBNb2RlO1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRpdGxlKGl0ZW06IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCkge1xyXG4gICAgY29uc3QgYWxsUmVnaXN0cmF0aW9uTmFtZXM6IEFycmF5PHN0cmluZz4gPSAoaXRlbS5TdW1tYXJpZXMgfHwgW10pLm1hcChcclxuICAgICAgKHJlZ2lzdHJhdGlvbikgPT4gcmVnaXN0cmF0aW9uLlJlZ2lzdHJhdGlvbk5hbWVcclxuICAgICk7XHJcbiAgICBjb25zdCB1bmlxdWVWYWx1ZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoYWxsUmVnaXN0cmF0aW9uTmFtZXMpKTtcclxuICAgIHJldHVybiB1bmlxdWVWYWx1ZXMuam9pbignLCAnKTtcclxuICB9XHJcblxyXG4gIHNob3coaXRlbTogTWFwSXRlbSkge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuaWQgPSBpdGVtLlJlZ0lkO1xyXG4gICAgICB0aGlzLnRvcEhlYWRlciA9IGl0ZW0uRHRPYnNUaW1lO1xyXG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy5nZXRUaXRsZShpdGVtKTtcclxuICAgICAgdGhpcy5uYW1lID0gaXRlbS5PYnNlcnZlci5OaWNrTmFtZTtcclxuICAgICAgdGhpcy5jb21wZXRlbmNlTGV2ZWwgPSBnZXRTdGFyQ291bnQoaXRlbS5PYnNlcnZlci5Db21wZXRlbmNlTGV2ZWxOYW1lKTtcclxuICAgICAgdGhpcy5nZW9IYXphcmQgPSBpdGVtLkdlb0hhemFyZFRJRDtcclxuICAgICAgdGhpcy5tYXNsID0gaXRlbS5PYnNMb2NhdGlvbiA/IGl0ZW0uT2JzTG9jYXRpb24uSGVpZ2h0IDogdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnNldERpc3RhbmNlQW5kVHlwZShpdGVtKTtcclxuICAgICAgdGhpcy5pbWFnZVVybHMgPSBbXTtcclxuICAgICAgaWYgKHRoaXMuYXBwTW9kZSAmJiBpdGVtLkF0dGFjaG1lbnRzICYmIGl0ZW0uQXR0YWNobWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VVcmxzID0gaXRlbS5BdHRhY2htZW50cy5tYXAoKGF0dGFjaG1lbnQpID0+XHJcbiAgICAgICAgICB0aGlzLmdldEltYWdlVXJsKFxyXG4gICAgICAgICAgICBhdHRhY2htZW50LFxyXG4gICAgICAgICAgICAnTWVkaXVtJ1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5wdWJsaXNoQ2hhbmdlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucHVibGlzaENoYW5nZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRJbWFnZVVybChcclxuICAgIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRWaWV3TW9kZWwsXHJcbiAgICBzaXplOiAnVGh1bWJuYWlsJyB8ICdNZWRpdW0nIHwgJ0xhcmdlJyB8ICdPcmlnaW5hbCcgfCAnUmF3JyA9ICdNZWRpdW0nXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gYXR0YWNobWVudC5VcmxGb3JtYXRzW3NpemVdO1xyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUb0l0ZW0oKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGB2aWV3LW9ic2VydmF0aW9uLyR7dGhpcy5pZH1gKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVibGlzaENoYW5nZSgpIHtcclxuICAgIHRoaXMuX2lzVmlzaWJsZS5uZXh0KHRoaXMudmlzaWJsZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHNldERpc3RhbmNlQW5kVHlwZShpdGVtOiBNYXBJdGVtKSB7XHJcbiAgICB0aGlzLmRpc3RhbmNlQW5kVHlwZSA9ICcnOyAvLyBzZXQgYnkgcHJvbWlzZVxyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoWydNQVBfSVRFTV9CQVIuT0JTRVJWQVRJT04nLCAnTUFQX0lURU1fQkFSLkFXQVknXSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gYXdhaXQgdGhpcy5nZW9Qb3NpdGlvblNlcnZpY2UuY3VycmVudFBvc2l0aW9uJFxyXG4gICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICBpZiAoY3VycmVudFBvc2l0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBMLmxhdExuZyhcclxuICAgICAgICAgIGl0ZW0uT2JzTG9jYXRpb24uTGF0aXR1ZGUsXHJcbiAgICAgICAgICBpdGVtLk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgICAgICkuZGlzdGFuY2VUbyhcclxuICAgICAgICAgIEwubGF0TG5nKFxyXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRpc3RhbmNlQW5kVHlwZSA9XHJcbiAgICAgICAgICAgIGAke2l0ZW0uR2VvSGF6YXJkTmFtZX0ke3RyYW5zbGF0aW9uc1tcclxuICAgICAgICAgICAgICAnTUFQX0lURU1fQkFSLk9CU0VSVkFUSU9OJ1xyXG4gICAgICAgICAgICBdLnRvTG93ZXJDYXNlKCl9IGAgK1xyXG4gICAgICAgICAgICBgJHt0aGlzLmhlbHBlci5nZXREaXN0YW5jZVRleHQoZGlzdGFuY2UpfSAke3RyYW5zbGF0aW9uc1tcclxuICAgICAgICAgICAgICAnTUFQX0lURU1fQkFSLkFXQVknXHJcbiAgICAgICAgICAgIF0udG9Mb3dlckNhc2UoKX1gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5kaXN0YW5jZUFuZFR5cGUgPSBgJHtpdGVtLkdlb0hhemFyZE5hbWV9JHt0cmFuc2xhdGlvbnNbXHJcbiAgICAgICAgICAgICdNQVBfSVRFTV9CQVIuT0JTRVJWQVRJT04nXHJcbiAgICAgICAgICBdLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VBbmRUeXBlID0gYCR7aXRlbS5HZW9IYXphcmROYW1lfSR7dHJhbnNsYXRpb25zW1xyXG4gICAgICAgICAgJ01BUF9JVEVNX0JBUi5PQlNFUlZBVElPTidcclxuICAgICAgICBdLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIFJlbmRlcmVyMixcclxuICBWaWV3Q2hpbGQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2FybmluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3dhcm5pbmcvd2FybmluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFdhcm5pbmdHcm91cEtleSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvd2FybmluZy93YXJuaW5nLWdyb3VwLWtleS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFRvYXN0Q29udHJvbGxlciwgRG9tQ29udHJvbGxlciwgSW9uSWNvbiB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXdhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3dhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vd2FybmluZy1ncm91cC1mYXZvdXJpdGUtdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFdhcm5pbmdHcm91cEZhdm91cml0ZVRvZ2dsZUNvbXBvbmVudFxyXG5pbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGtleTogV2FybmluZ0dyb3VwS2V5O1xyXG4gIEBWaWV3Q2hpbGQoSW9uSWNvbikgaW9uSWNvbjogSW9uSWNvbjtcclxuXHJcbiAgcHJpdmF0ZSB3YXJuaW5nSXNGYXZvdXJpdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBpc0Zhdm91cml0ZTogYm9vbGVhbjtcclxuICBwcml2YXRlIF9sYXN0S2V5OiBXYXJuaW5nR3JvdXBLZXk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB3YXJuaW5nU2VydmljZTogV2FybmluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBkb21DdHJsOiBEb21Db250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSB0b2FzdENvbnRyb2xsZXI6IFRvYXN0Q29udHJvbGxlclxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBjb25zdCBjdXJyZW50S2V5OiBXYXJuaW5nR3JvdXBLZXkgPSBjaGFuZ2VzLmtleS5jdXJyZW50VmFsdWU7XHJcbiAgICBpZiAoIXRoaXMuX2xhc3RLZXkgfHwgdGhpcy5fbGFzdEtleS5ncm91cElkICE9PSBjdXJyZW50S2V5Lmdyb3VwSWQpIHtcclxuICAgICAgdGhpcy5fbGFzdEtleSA9IGN1cnJlbnRLZXk7XHJcbiAgICAgIHRoaXMuc3RhcnRTdWJzY3JpcHRpb24oY3VycmVudEtleSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGFydFN1YnNjcmlwdGlvbihrZXk6IFdhcm5pbmdHcm91cEtleSkge1xyXG4gICAgdGhpcy53YXJuaW5nSXNGYXZvdXJpdGVTdWJzY3JpcHRpb24gPSB0aGlzLndhcm5pbmdTZXJ2aWNlXHJcbiAgICAgIC5nZXRJc0Zhdm91cml0ZU9ic2VydmFibGUoa2V5Lmdyb3VwSWQsIGtleS5nZW9IYXphcmQpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzRmF2b3VyaXRlID0gdmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldE9wZW4ob3BlbkFtb3VudDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzY2FsZUFtb3VudCA9IDEgKyBvcGVuQW1vdW50IC8gMi4wO1xyXG4gICAgY29uc3Qgc2NhbGUgPSBgc2NhbGUzZCgke3NjYWxlQW1vdW50fSwke3NjYWxlQW1vdW50fSwxKWA7XHJcbiAgICB0aGlzLmRvbUN0cmwud3JpdGUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCg8YW55PnRoaXMuaW9uSWNvbikuZWwsICd0cmFuc2Zvcm0nLCBzY2FsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMud2FybmluZ0lzRmF2b3VyaXRlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMud2FybmluZ0lzRmF2b3VyaXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc0Zhdm91cml0ZSkge1xyXG4gICAgICB0aGlzLndhcm5pbmdTZXJ2aWNlXHJcbiAgICAgICAgLnJlbW92ZUZyb21GYXZvdXJpdGUodGhpcy5rZXkuZ3JvdXBJZCwgdGhpcy5rZXkuZ2VvSGF6YXJkKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMucHJlc2VudFRvYXN0KGZhbHNlKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndhcm5pbmdTZXJ2aWNlXHJcbiAgICAgICAgLmFkZFRvRmF2b3VyaXRlKHRoaXMua2V5Lmdyb3VwSWQsIHRoaXMua2V5Lmdlb0hhemFyZClcclxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLnByZXNlbnRUb2FzdCh0cnVlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcmVzZW50VG9hc3QoYWRkZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KFtcclxuICAgICAgICAnV0FSTklOR19MSVNULkFEREVEX1RPX0ZBVk9VUklURVMnLFxyXG4gICAgICAgICdXQVJOSU5HX0xJU1QuUkVNT1ZFRF9GUk9NX0ZBVk9VUklURVMnLFxyXG4gICAgICAgICdBTEVSVC5VTkRPJ1xyXG4gICAgICBdKVxyXG4gICAgICAuc3Vic2NyaWJlKGFzeW5jICh0cmFuc2xhdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvYXN0ID0gYXdhaXQgdGhpcy50b2FzdENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgICAgIG1lc3NhZ2U6IGAke3RoaXMua2V5Lmdyb3VwTmFtZX0gJHtcclxuICAgICAgICAgICAgYWRkZWRcclxuICAgICAgICAgICAgICA/IHRyYW5zbGF0aW9uWydXQVJOSU5HX0xJU1QuQURERURfVE9fRkFWT1VSSVRFUyddXHJcbiAgICAgICAgICAgICAgOiB0cmFuc2xhdGlvblsnV0FSTklOR19MSVNULlJFTU9WRURfRlJPTV9GQVZPVVJJVEVTJ11cclxuICAgICAgICAgIH1gLFxyXG4gICAgICAgICAgbW9kZTogJ21kJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiA0MDAwLFxyXG4gICAgICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25bJ0FMRVJULlVORE8nXSxcclxuICAgICAgICAgICAgICByb2xlOiAnY2FuY2VsJyxcclxuICAgICAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy53YXJuaW5nU2VydmljZS5yZW1vdmVGcm9tRmF2b3VyaXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Lmdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXkuZ2VvSGF6YXJkXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLndhcm5pbmdTZXJ2aWNlLmFkZFRvRmF2b3VyaXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Lmdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXkuZ2VvSGF6YXJkXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdG9hc3QucHJlc2VudCgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pY29uIFtuZ0NsYXNzXT1cInsnZmF2b3VyaXRlJzogaXNGYXZvdXJpdGUgfVwiIHNsb3Q9XCJpY29uLW9ubHlcIiBuYW1lPVwic3RhclwiPlxyXG48L2lvbi1pY29uPiIsIjxpb24tZ3JpZCBjbGFzcz1cImhlYWRlci1ncmlkIGlvbi1uby1wYWRkaW5nIGlvbi1uby1tYXJnaW5cIiBbbmdDbGFzc109XCJ7J2lvcyc6IGlvc31cIiAqbmdJZj1cIiFzdWJUaXRsZVwiPlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgc2l6ZT1cIjZcIiBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7IHRpdGxlIHwgdHJhbnNsYXRlIH19PC9oMz5cclxuICAgIDwvaW9uLWNvbD5cclxuICAgIDxpb24tY29sIHNpemU9XCI2XCIgY2xhc3M9XCJpb24tbm8tcGFkZGluZyBpb24tYWxpZ24tc2VsZi1lbmRcIiAqbmdJZj1cInNob3dEYXlOYW1lc1wiPlxyXG4gICAgICA8ZGl2ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGF5TmFtZXNcIj48L2Rpdj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvaW9uLWdyaWQ+XHJcbjxpb24tZ3JpZCBjbGFzcz1cImhlYWRlci1ncmlkIGlvbi1uby1tYXJnaW4gaW9uLW5vLXBhZGRpbmdcIiAqbmdJZj1cInN1YlRpdGxlXCI+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyB0aXRsZSB8IHRyYW5zbGF0ZSB9fTwvaDM+XHJcbiAgPC9pb24tcm93PlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIiBjb2xvcj1cIm1lZGl1bVwiPlxyXG4gICAgICB7eyBzdWJUaXRsZSB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24tcm93PlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgb2Zmc2V0PVwiNlwiIHNpemU9XCI2XCIgY2xhc3M9XCJpb24tbm8tcGFkZGluZyBpb24tYWxpZ24tc2VsZi1lbmRcIiAqbmdJZj1cInNob3dEYXlOYW1lc1wiPlxyXG4gICAgICA8ZGl2ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGF5TmFtZXNcIj48L2Rpdj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvaW9uLWdyaWQ+XHJcbjxuZy10ZW1wbGF0ZSAjZGF5TmFtZXM+XHJcbiAgPGlvbi1ncmlkIGNsYXNzPVwiZGF5TmFtZXMgaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIHt7IGdldERheU5hbWUoMCkgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIHt7IGdldERheU5hbWUoMSkgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIHt7IGdldERheU5hbWUoMikgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC13YXJuaW5nLWxpc3QtaGVhZGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vd2FybmluZy1saXN0LWhlYWRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vd2FybmluZy1saXN0LWhlYWRlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXYXJuaW5nTGlzdEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKSBzdWJUaXRsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNob3dEYXlOYW1lczogYm9vbGVhbjtcclxuXHJcbiAgZ2V0IGlvcygpIHtcclxuICAgIHJldHVybiB0aGlzLnBsYXRmb3JtLmlzKCdpb3MnKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGdldERheU5hbWUoZGF5c1RvQWRkOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBgREFZUy5TSE9SVC4ke21vbWVudCgpLmFkZChkYXlzVG9BZGQsICdkYXlzJykuZGF5KCl9YDtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtLXNsaWRpbmcgKGlvbkRyYWcpPVwib25EcmFnKClcIj5cclxuICA8aW9uLWl0ZW0gKm5nSWY9XCJ3YXJuaW5nR3JvdXAua2V5Lmdlb0hhemFyZCAhPT0gR2VvSGF6YXJkLkljZVwiIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIiBbZGV0YWlsXT1cImZhbHNlXCIgbGluZXM9XCJmdWxsXCI+XHJcbiAgICA8ZGl2IHNsb3Q9XCJzdGFydFwiIGNsYXNzPVwiZ2VvLWljb24tY2lyY2xlXCIgKGNsaWNrKT1cIm5hdmlnYXRlVG9XZWIoJGV2ZW50LCB3YXJuaW5nR3JvdXApXCI+XHJcbiAgICAgIDxhcHAtZ2VvLWljb24gW2dlb0hhemFyZHNdPVwiW3dhcm5pbmdHcm91cC5rZXkuZ2VvSGF6YXJkXVwiPjwvYXBwLWdlby1pY29uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aW9uLWxhYmVsIChjbGljayk9XCJuYXZpZ2F0ZVRvV2ViKCRldmVudCwgd2FybmluZ0dyb3VwKVwiPlxyXG4gICAgICA8aDI+e3t3YXJuaW5nR3JvdXAua2V5Lmdyb3VwTmFtZX19PC9oMj5cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPGlvbi1ncmlkPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCAqbmdGb3I9XCJsZXQgZGF5IG9mIFswLCAxLCAyXVwiPlxyXG4gICAgICAgICAgPGlvbi1iYWRnZSAqbmdJZj1cIndhcm5pbmdHcm91cC5nZXREYXlXYXJuaW5nKGRheSkgYXMgd2FybmluZyBlbHNlIGVtcHR5V2FybmluZ1wiXHJcbiAgICAgICAgICAgIFtjb2xvcl09XCInd2FybmluZ2xldmVsLScrd2FybmluZy53YXJuaW5nTGV2ZWxcIiAoY2xpY2spPVwibmF2aWdhdGVUb1dlYkJ5RGF5KCRldmVudCwgd2FybmluZ0dyb3VwLCBkYXkpXCI+XHJcbiAgICAgICAgICAgIHt7d2FybmluZy53YXJuaW5nTGV2ZWwgPiAwID8gd2FybmluZy53YXJuaW5nTGV2ZWwgOiAnPyd9fVxyXG4gICAgICAgICAgICA8aW9uLWljb24gKm5nSWY9XCJ3YXJuaW5nLmVtZXJnZW5jeVdhcm5pbmdcIiBuYW1lPVwiYWxlcnRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgPC9pb24tYmFkZ2U+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvaW9uLWl0ZW0+XHJcbiAgPGlvbi1pdGVtICpuZ0lmPVwid2FybmluZ0dyb3VwLmtleS5nZW9IYXphcmQgPT09IEdlb0hhemFyZC5JY2VcIiBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCIgW2RldGFpbF09XCJ0cnVlXCIgbGluZXM9XCJmdWxsXCI+XHJcbiAgICA8ZGl2IHNsb3Q9XCJzdGFydFwiIGNsYXNzPVwiZ2VvLWljb24tY2lyY2xlXCIgKGNsaWNrKT1cIm5hdmlnYXRlVG9XZWIoJGV2ZW50LCB3YXJuaW5nR3JvdXApXCI+XHJcbiAgICAgIDxhcHAtZ2VvLWljb24gW2dlb0hhemFyZHNdPVwiW3dhcm5pbmdHcm91cC5rZXkuZ2VvSGF6YXJkXVwiPjwvYXBwLWdlby1pY29uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aW9uLWxhYmVsIChjbGljayk9XCJuYXZpZ2F0ZVRvV2ViKCRldmVudCwgd2FybmluZ0dyb3VwKVwiPlxyXG4gICAgICA8aDI+e3t3YXJuaW5nR3JvdXAua2V5Lmdyb3VwTmFtZX19PC9oMj5cclxuICAgICAgPHA+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJ3YXJuaW5nR3JvdXAudmFsaWRGcm9tXCI+e3snV0FSTklOR19MSVNULlZBTElEX0ZST00nIHwgdHJhbnNsYXRlfX06IHt7d2FybmluZ0dyb3VwLnZhbGlkRnJvbSB8XHJcbiAgICAgICAgICBmb3JtYXREYXRlOnRydWU6ZmFsc2U6ZmFsc2UgfCBhc3luYyB9fTwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cIndhcm5pbmdHcm91cC52YWxpZFRvXCI+IC0ge3t3YXJuaW5nR3JvdXAudmFsaWRUbyB8IGZvcm1hdERhdGU6dHJ1ZTpmYWxzZTpmYWxzZSB8IGFzeW5jfX08L3NwYW4+XHJcbiAgICAgIDwvcD5cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWl0ZW0+XHJcbiAgPGlvbi1pdGVtLW9wdGlvbnMgc2lkZT1cImVuZFwiIChpb25Td2lwZSk9XCJpdGVtU3dpcGVkKClcIj5cclxuICAgIDxpb24taXRlbS1vcHRpb24gZXhwYW5kYWJsZT1cInRydWVcIiAoY2xpY2spPVwidG9nZ2xlRmF2b3VyaXRlKClcIj5cclxuICAgICAgPGFwcC13YXJuaW5nLWdyb3VwLWZhdm91cml0ZS10b2dnbGUgW2tleV09XCJ3YXJuaW5nR3JvdXAua2V5XCI+XHJcbiAgICAgIDwvYXBwLXdhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZT5cclxuICAgIDwvaW9uLWl0ZW0tb3B0aW9uPlxyXG4gIDwvaW9uLWl0ZW0tb3B0aW9ucz5cclxuPC9pb24taXRlbS1zbGlkaW5nPlxyXG48bmctdGVtcGxhdGUgI2VtcHR5V2FybmluZz5cclxuICA8aW9uLWJhZGdlIGNvbG9yPVwid2FybmluZ2xldmVsLTBcIj4/PC9pb24tYmFkZ2U+XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJb25JdGVtU2xpZGluZywgRG9tQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgV2FybmluZ0dyb3VwIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy93YXJuaW5nL3dhcm5pbmctZ3JvdXAubW9kZWwnO1xyXG5pbXBvcnQgeyBFeHRlcm5hbExpbmtTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9leHRlcm5hbC1saW5rL2V4dGVybmFsLWxpbmsuc2VydmljZSc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCwgTGFuZ0tleSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi8uLi8uLi9zZXR0aW5ncyc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXYXJuaW5nR3JvdXBGYXZvdXJpdGVUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuLi93YXJuaW5nLWdyb3VwLWZhdm91cml0ZS10b2dnbGUvd2FybmluZy1ncm91cC1mYXZvdXJpdGUtdG9nZ2xlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFuYWx5dGljU2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvYW5hbHl0aWNzL3NlcnZpY2VzL2FuYWx5dGljLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBcHBFdmVudENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9hbmFseXRpY3MvZW51bXMvYXBwLWV2ZW50LWNhdGVnb3J5LmVudW0nO1xyXG5pbXBvcnQgeyBBcHBFdmVudEFjdGlvbiB9IGZyb20gJy4uLy4uL21vZHVsZXMvYW5hbHl0aWNzL2VudW1zL2FwcC1ldmVudC1hY3Rpb24uZW51bSc7XHJcbmltcG9ydCB7IGZyb20sIG9mLCBTdWJqZWN0LCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IsIHRha2VVbnRpbCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXdhcm5pbmctbGlzdC1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vd2FybmluZy1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3dhcm5pbmctbGlzdC1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudCBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHdhcm5pbmdHcm91cDogV2FybmluZ0dyb3VwO1xyXG4gIEdlb0hhemFyZCA9IEdlb0hhemFyZDtcclxuXHJcbiAgQFZpZXdDaGlsZChJb25JdGVtU2xpZGluZywgeyBzdGF0aWM6IHRydWUgfSkgaXRlbVNsaWRlOiBJb25JdGVtU2xpZGluZztcclxuICBAVmlld0NoaWxkKFdhcm5pbmdHcm91cEZhdm91cml0ZVRvZ2dsZUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcclxuICBmYXZvdXJpdGVUb2dnbGU6IFdhcm5pbmdHcm91cEZhdm91cml0ZVRvZ2dsZUNvbXBvbmVudDtcclxuICBwcml2YXRlIGRyYWdTdWJqZWN0ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4dGVybmFsTGlua1NlcnZpY2U6IEV4dGVybmFsTGlua1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkb21DdHJsOiBEb21Db250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBhbmFseXRpY1NlcnZpY2U6IEFuYWx5dGljU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5kcmFnU3ViamVjdFxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSxcclxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5nZXRPcGVuQW1vdW50KCkpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgob3BlbkFtb3VudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSBvcGVuQW1vdW50ID4gMSA/IDEgOiBvcGVuQW1vdW50ID4gMCA/IG9wZW5BbW91bnQgOiAwO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gYHJnYmEoMTg2LDE5NiwyMDQsJHtvcGFjaXR5fSlgO1xyXG4gICAgICAgIHRoaXMuZmF2b3VyaXRlVG9nZ2xlLnNldE9wZW4ob3BhY2l0eSk7XHJcbiAgICAgICAgdGhpcy5kb21DdHJsLndyaXRlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgICAgICg8YW55PnRoaXMuaXRlbVNsaWRlKS5lbCxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InLFxyXG4gICAgICAgICAgICBjb2xvclxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIGlmICh0aGlzLml0ZW1TbGlkZSkge1xyXG4gICAgICB0aGlzLml0ZW1TbGlkZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25EcmFnKCkge1xyXG4gICAgdGhpcy5kcmFnU3ViamVjdC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9wZW5BbW91bnQoKSB7XHJcbiAgICByZXR1cm4gZnJvbSh0aGlzLml0ZW1TbGlkZS5nZXRPcGVuQW1vdW50KCkpLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YoMCkpLFxyXG4gICAgICBtYXAoKHZhbCkgPT4gKHZhbCA+IDAgPyB2YWwgLyAxMDAuMCA6IDApKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUZhdm91cml0ZSgpIHtcclxuICAgIHRoaXMuZmF2b3VyaXRlVG9nZ2xlLnRvZ2dsZSgpO1xyXG4gICAgdGltZXIoMjAwMClcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1TbGlkZSkge1xyXG4gICAgICAgICAgdGhpcy5pdGVtU2xpZGUuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaXRlbVN3aXBlZCgpIHtcclxuICAgIHRoaXMudG9nZ2xlRmF2b3VyaXRlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRVcmwoZ3JvdXA6IFdhcm5pbmdHcm91cCwgZGF5ID0gJycpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgaWYgKGdyb3VwLnVybCkge1xyXG4gICAgICByZXR1cm4gZ3JvdXAudXJsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY3VycmVudExhbmcgPSBhd2FpdCB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5sYW5ndWFnZSRcclxuICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgIC50b1Byb21pc2UoKTtcclxuICAgICAgY29uc3Qgc3VwcG9ydGVkTGFuZyA9IHRoaXMuZ2V0U3VwcG9ydGVkTGFuZ09yRmFsbGJhY2tUb0VuKGN1cnJlbnRMYW5nKTtcclxuICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPVxyXG4gICAgICAgIHNldHRpbmdzLnNlcnZpY2VzLndhcm5pbmdbR2VvSGF6YXJkW2dyb3VwLmtleS5nZW9IYXphcmRdXS53ZWJVcmxbXHJcbiAgICAgICAgICBMYW5nS2V5W3N1cHBvcnRlZExhbmddXHJcbiAgICAgICAgXTtcclxuICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgIHJldHVybiBlbmNvZGVVUkkoXHJcbiAgICAgICAgICB1cmxcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ3tyZWdpb25OYW1lfScsIGdyb3VwLmtleS5ncm91cE5hbWUpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7cmVnaW9uSWR9JywgZ3JvdXAua2V5Lmdyb3VwSWQpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7ZGF5fScsIGRheSlcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTdXBwb3J0ZWRMYW5nT3JGYWxsYmFja1RvRW4obGFuZzogTGFuZ0tleSkge1xyXG4gICAgaWYgKGxhbmcgPT09IExhbmdLZXkubmIgfHwgbGFuZyA9PT0gTGFuZ0tleS5ubikge1xyXG4gICAgICByZXR1cm4gTGFuZ0tleS5uYjtcclxuICAgIH1cclxuICAgIHJldHVybiBMYW5nS2V5LmVuO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmF2aWdhdGVUb1dlYihldmVudDogRXZlbnQsIGdyb3VwOiBXYXJuaW5nR3JvdXApIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB1cmwgPSBhd2FpdCB0aGlzLmdldFVybChncm91cCk7XHJcbiAgICBpZiAodXJsKSB7XHJcbiAgICAgIHRoaXMuYW5hbHl0aWNTZXJ2aWNlLnRyYWNrRXZlbnQoXHJcbiAgICAgICAgQXBwRXZlbnRDYXRlZ29yeS5XYXJuaW5ncyxcclxuICAgICAgICBBcHBFdmVudEFjdGlvbi5DbGljayxcclxuICAgICAgICBncm91cC5nZXRLZXlBc1N0cmluZygpXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZXh0ZXJuYWxMaW5rU2VydmljZS5vcGVuRXh0ZXJuYWxMaW5rKHVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBuYXZpZ2F0ZVRvV2ViQnlEYXkoZXZlbnQ6IEV2ZW50LCBncm91cDogV2FybmluZ0dyb3VwLCBkYXk6IG51bWJlcikge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBtb21lbnQoKVxyXG4gICAgICAuc3RhcnRPZignZGF5JylcclxuICAgICAgLmFkZChkYXksICdkYXlzJylcclxuICAgICAgLmZvcm1hdChzZXR0aW5ncy5zZXJ2aWNlcy53YXJuaW5nLmRhdGVGb3JtYXQpO1xyXG4gICAgY29uc3QgdXJsID0gYXdhaXQgdGhpcy5nZXRVcmwoZ3JvdXAsIGRhdGVTdHJpbmcpO1xyXG4gICAgaWYgKHVybCkge1xyXG4gICAgICB0aGlzLmFuYWx5dGljU2VydmljZS50cmFja0V2ZW50KFxyXG4gICAgICAgIEFwcEV2ZW50Q2F0ZWdvcnkuV2FybmluZ3MsXHJcbiAgICAgICAgQXBwRXZlbnRBY3Rpb24uQ2xpY2ssXHJcbiAgICAgICAgZ3JvdXAuZ2V0S2V5QXNTdHJpbmcoKVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmV4dGVybmFsTGlua1NlcnZpY2Uub3BlbkV4dGVybmFsTGluayh1cmwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBNYXBJdGVtIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21hcC1pdGVtLm1vZGVsJztcclxuaW1wb3J0IHsgUmVnb2JzR2VvSGF6YXJkTWFya2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vbW9kdWxlcy9tYXAvY29yZS9jbGFzc2VzL3JlZ29icy1nZW9oYXphcmQtbWFya2VyJztcclxuZXhwb3J0IGNsYXNzIE1hcEl0ZW1NYXJrZXIgZXh0ZW5kcyBMLk1hcmtlciB7XHJcbiAgcHJpdmF0ZSBfaXRlbTogTWFwSXRlbTtcclxuICBwcml2YXRlIF9pc1NlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICBnZXQgaXRlbSgpOiBNYXBJdGVtIHtcclxuICAgIHJldHVybiB7IC4uLnRoaXMuX2l0ZW0gfTtcclxuICB9XHJcblxyXG4gIGdldCBpZCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2l0ZW0uUmVnSWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoaXRlbTogTWFwSXRlbSwgbGF0bG5nOiBMLkxhdExuZywgb3B0aW9uczogTC5NYXJrZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihsYXRsbmcsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5faXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLnVwZGF0ZUljb24oKTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICB0aGlzLnVwZGF0ZUljb24oKTtcclxuICB9XHJcblxyXG4gIGRlc2VsZWN0KCkge1xyXG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy51cGRhdGVJY29uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUljb24oKSB7XHJcbiAgICB0aGlzLnNldEljb24oXHJcbiAgICAgIG5ldyBSZWdvYnNHZW9IYXphcmRNYXJrZXIodGhpcy5faXRlbS5HZW9IYXphcmRUSUQsIHRoaXMuX2lzU2VsZWN0ZWQpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBSb3V0ZXIsXHJcbiAgTmF2aWdhdGlvbkVuZCxcclxuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gIEFjdGl2YXRlZFJvdXRlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3ViamVjdCwgZnJvbSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwsIGZpbHRlciwgdGFwLCBtYXAsIGNvbmNhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm91dGVyUGFnZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIG5nVW5zdWJzY3JpYmU6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xyXG4gIHByaXZhdGUgaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHJvdXRlci5ldmVudHNcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdVbnN1YnNjcmliZSksXHJcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcclxuICAgICAgICBjb25jYXRNYXAoKCkgPT4gZnJvbShQcm9taXNlLnJlc29sdmUodGhpcy5kZXRlY3RFbnRlck9yTGVhdmUoKSkpKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNDb21wb25lbnRBY3RpdmUoXHJcbiAgICBwYXRoOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90W10sXHJcbiAgICBjb21wb25lbnQ6IGFueVxyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICBwYXRoLmZvckVhY2goKHNzOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSA9PiB7XHJcbiAgICAgIGlmIChzcy5jb21wb25lbnQgPT09IGNvbXBvbmVudCkge1xyXG4gICAgICAgIGlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpc0FjdGl2ZSA9IHRoaXMuaXNDb21wb25lbnRBY3RpdmUoc3MuY2hpbGRyZW4sIGNvbXBvbmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzQWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBkZXRlY3RFbnRlck9yTGVhdmUoKSB7XHJcbiAgICBjb25zdCBpc0FjdGl2ZU5vdyA9IHRoaXMuaXNDb21wb25lbnRBY3RpdmUoXHJcbiAgICAgIHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnJvb3QucGF0aEZyb21Sb290LFxyXG4gICAgICB0aGlzLnJvdXRlLnNuYXBzaG90LmNvbXBvbmVudFxyXG4gICAgKTtcclxuICAgIGlmICghdGhpcy5pc0FjdGl2ZSAmJiBpc0FjdGl2ZU5vdykge1xyXG4gICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgYXdhaXQgdGhpcy5vbkVudGVyKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNBY3RpdmUgJiYgIWlzQWN0aXZlTm93KSB7XHJcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgYXdhaXQgdGhpcy5vbkxlYXZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhYnN0cmFjdCBvbkVudGVyKCk6IHZvaWQgfCBQcm9taXNlPHVua25vd24+O1xyXG4gIGFic3RyYWN0IG9uTGVhdmUoKTogdm9pZCB8IFByb21pc2U8dW5rbm93bj47XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdVbnN1YnNjcmliZS5uZXh0KCk7XHJcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIsIFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5jb25zdCBBTExPV19BTkFMWVRJQ1NfSEVBREVSID0gJ1NFVFRJTkdTLkFMTE9XX0FOQUxZVElDU19IRUFERVInO1xyXG5jb25zdCBBTExPV19BTkFMWVRJQ1NfREVTQ1JJUFRJT04gPSAnU0VUVElOR1MuQUxMT1dfQU5BTFlUSUNTX0RFU0NSSVBUSU9OJztcclxuY29uc3QgQUxMT1dfQU5BTFlUSUNTX0RFU0NSSVBUSU9OX0xJTkVfMiA9XHJcbiAgJ1NFVFRJTkdTLkFMTE9XX0FOQUxZVElDU19ERVNDUklQVElPTl9MSU5FMic7XHJcbmNvbnN0IFJFQURfTU9SRV9URVhUID0gJ1NFVFRJTkdTLlJFQURfTU9SRV9JTl9MSUNFTlNFX0FHUkVFTUVOVCc7XHJcbmNvbnN0IE9LID0gJ0FMRVJULkZJTkUnO1xyXG5jb25zdCBOT19USEFOS1MgPSAnQUxFUlQuTk9fVEhBTktTJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVzYWdlQW5hbHl0aWNzQ29uc2VudFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY2hlY2tVc2VyRGF0YUNvbnNlbnREaWFsb2coKSB7XHJcbiAgICBjb25zdCB1c2VyU2V0dGluZ3MgPSBhd2FpdCB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS51c2VyU2V0dGluZyRcclxuICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgaWYgKCF1c2VyU2V0dGluZ3MuY29uc2VudEZvclNlbmRpbmdBbmFseXRpY3NEaWFsb2dDb21wbGV0ZWQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5zaG93Q29uc2VudEZvclNlbmRpbmdBbmFseXRpY3NEaWFsb2coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNob3dDb25zZW50Rm9yU2VuZGluZ0FuYWx5dGljc0RpYWxvZygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgICAuZ2V0KFtcclxuICAgICAgICAgIEFMTE9XX0FOQUxZVElDU19IRUFERVIsXHJcbiAgICAgICAgICBBTExPV19BTkFMWVRJQ1NfREVTQ1JJUFRJT04sXHJcbiAgICAgICAgICBBTExPV19BTkFMWVRJQ1NfREVTQ1JJUFRJT05fTElORV8yLFxyXG4gICAgICAgICAgUkVBRF9NT1JFX1RFWFQsXHJcbiAgICAgICAgICBPSyxcclxuICAgICAgICAgIE5PX1RIQU5LU1xyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICBjb25zdCBjc3NDbGFzcyA9IHRoaXMucGxhdGZvcm0uaXMoJ2lvcycpXHJcbiAgICAgICAgPyBbJ25vcm1hbC13ZWlnaHQnLCAnZnVsbC13aWR0aCddXHJcbiAgICAgICAgOiBbXTtcclxuICAgICAgY29uc3QgYnV0dG9uT0sgPSB7XHJcbiAgICAgICAgY3NzQ2xhc3MsXHJcbiAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zW09LXSxcclxuICAgICAgICBoYW5kbGVyOiAoKSA9PiB0aGlzLnNhdmVTZXR0aW5ncyh0cnVlKS50aGVuKCgpID0+IHJlc29sdmUoKSlcclxuICAgICAgfTtcclxuICAgICAgY29uc3QgYnV0dG9uTm8gPSB7XHJcbiAgICAgICAgY3NzQ2xhc3MsXHJcbiAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zW05PX1RIQU5LU10sXHJcbiAgICAgICAgaGFuZGxlcjogKCkgPT4gdGhpcy5zYXZlU2V0dGluZ3MoZmFsc2UpLnRoZW4oKCkgPT4gcmVzb2x2ZSgpKVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBidXR0b25zID0gdGhpcy5wbGF0Zm9ybS5pcygnaW9zJylcclxuICAgICAgICA/IFtidXR0b25PSywgYnV0dG9uTm9dXHJcbiAgICAgICAgOiBbYnV0dG9uTm8sIGJ1dHRvbk9LXTtcclxuICAgICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIGhlYWRlcjogdHJhbnNsYXRpb25zW0FMTE9XX0FOQUxZVElDU19IRUFERVJdLFxyXG4gICAgICAgIG1lc3NhZ2U6IGAke3RyYW5zbGF0aW9uc1tBTExPV19BTkFMWVRJQ1NfREVTQ1JJUFRJT05dfTxiciAvPjxiciAvPiR7dHJhbnNsYXRpb25zW0FMTE9XX0FOQUxZVElDU19ERVNDUklQVElPTl9MSU5FXzJdfTxiciAvPjxiciAvPiR7dHJhbnNsYXRpb25zW1JFQURfTU9SRV9URVhUXX1gLFxyXG4gICAgICAgIGJ1dHRvbnMsXHJcbiAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiBmYWxzZSAvLyBQcmV2ZW50IGZyb20gY2xvc2luZyB3aXRob3V0IGNob29zaW5nXHJcbiAgICAgIH0pO1xyXG4gICAgICBhd2FpdCBhbGVydC5wcmVzZW50KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVTZXR0aW5ncyhhY2NlcHRlZDogYm9vbGVhbikge1xyXG4gICAgY29uc3QgY3VycmVudFNldHRpbmdzID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnNhdmVVc2VyU2V0dGluZ3Moe1xyXG4gICAgICAuLi5jdXJyZW50U2V0dGluZ3MsXHJcbiAgICAgIGNvbnNlbnRGb3JTZW5kaW5nQW5hbHl0aWNzOiBhY2NlcHRlZCxcclxuICAgICAgY29uc2VudEZvclNlbmRpbmdBbmFseXRpY3NEaWFsb2dDb21wbGV0ZWQ6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiZGF0YS1sb2FkIGFuaW1hdGVkXCIgW25nQ2xhc3NdPVwieydmYWRlSW4nOiBpc0xvYWRpbmcsICdmYWRlT3V0JzogIWlzTG9hZGluZ31cIj5cclxuICA8aW9uLWdyaWQgKm5nSWY9XCIhc2ltcGxlXCI+XHJcbiAgICA8aW9uLXJvdyAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhTG9hZFwiPlxyXG4gICAgICA8aW9uLWNvbD5cclxuICAgICAgICA8aW9uLWxhYmVsPnt7ICdEQVRBX0xPQUQuTE9BRElORycgfCB0cmFuc2xhdGUgfX0ge3sgKGl0ZW0ucHJvZ3Jlc3MgKiAxMDApIHwgbnVtYmVyOiAnLjEnIH19ICU8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbiAgPGlvbi1zcGlubmVyICpuZ0lmPVwic2ltcGxlXCI+PC9pb24tc3Bpbm5lcj5cclxuPC9kaXY+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSURhdGFMb2FkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2RhdGEtbG9hZC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGF0YUxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0YS1sb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtbG9hZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGEtbG9hZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGF0YS1sb2FkLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFMb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgZGF0YUxvYWQ6IElEYXRhTG9hZFtdID0gW107XHJcbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgZ2V0IGlzTG9hZGluZygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFMb2FkLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgaWRzOiBzdHJpbmdbXTtcclxuICBASW5wdXQoKVxyXG4gIHNpbXBsZTogYm9vbGVhbjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGF0YUxvYWRTZXJ2aWNlOiBEYXRhTG9hZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7fVxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3QgaWRzID0gY2hhbmdlcy5pZHMuY3VycmVudFZhbHVlIGFzIHN0cmluZ1tdO1xyXG4gICAgaWYgKGlkcyAmJiBpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoXHJcbiAgICAgICAgaWRzLm1hcCgoaWQpID0+IHRoaXMuZGF0YUxvYWRTZXJ2aWNlLmdldFN0YXRlQXNPYnNlcnZhYmxlKGlkKSlcclxuICAgICAgKVxyXG4gICAgICAgIC5waXBlKG1hcCgodmFsKSA9PiB2YWwuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlzTG9hZGluZykpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTG9hZCA9IHZhbDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRGF0YUxvYWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YS1sb2FkL2RhdGEtbG9hZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElvbmljTW9kdWxlLCBUcmFuc2xhdGVNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0RhdGFMb2FkQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbRGF0YUxvYWRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhTG9hZE1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uLy4uLy4uLy4uL3NldHRpbmdzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMZWFmbGV0Q2x1c3RlckhlbHBlciB7XHJcbiAgc3RhdGljIGNyZWF0ZU1hcmtlckNsdXN0ZXJHcm91cChvcHRpb25zPzogTC5NYXJrZXJDbHVzdGVyR3JvdXBPcHRpb25zKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgc3BpZGVyZnlPbk1heFpvb206IHRydWUsXHJcbiAgICAgIHNob3dDb3ZlcmFnZU9uSG92ZXI6IGZhbHNlLFxyXG4gICAgICB6b29tVG9Cb3VuZHNPbkNsaWNrOiB0cnVlLFxyXG4gICAgICBtYXhDbHVzdGVyUmFkaXVzOiBzZXR0aW5ncy5tYXAubWF4Q2x1c3RlclJhZGl1cyxcclxuICAgICAgaWNvbkNyZWF0ZUZ1bmN0aW9uOiBMZWFmbGV0Q2x1c3RlckhlbHBlci5jcmVhdGVDbHVzdGVySWNvblxyXG4gICAgfTtcclxuICAgIHJldHVybiBMLm1hcmtlckNsdXN0ZXJHcm91cCh7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi4ob3B0aW9ucyB8fCB7fSkgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlQ2x1c3Rlckljb24oY2x1c3RlcjogTC5NYXJrZXJDbHVzdGVyKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSBjbHVzdGVyLmdldEFsbENoaWxkTWFya2VycygpLmxlbmd0aDtcclxuICAgIGNvbnN0IHNpemUgPSBsZW5ndGggPCAxMDAgPyAzNSA6IGxlbmd0aCA8IDEwMDAgPyA1MCA6IDcwO1xyXG4gICAgcmV0dXJuIEwuZGl2SWNvbih7XHJcbiAgICAgIGh0bWw6ICc8ZGl2PicgKyBsZW5ndGggKyAnPC9kaXY+JyxcclxuICAgICAgaWNvblNpemU6IFtzaXplLCBzaXplXSxcclxuICAgICAgaWNvbkFuY2hvcjogW3NpemUgLyAyLjAsIHNpemUgLyAyLjBdLFxyXG4gICAgICBjbGFzc05hbWU6ICdjaXJjbGUtbWFya2VyLWNsdXN0ZXInXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSG9tZVBhZ2UgfSBmcm9tICcuL2hvbWUucGFnZSc7XHJcbmltcG9ydCB7IE1hcEl0ZW1CYXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1pdGVtLWJhci9tYXAtaXRlbS1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IERhdGFMb2FkTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kYXRhLWxvYWQvZGF0YS1sb2FkLm1vZHVsZSc7XHJcbmltcG9ydCB7IE1hcE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvbWFwL21hcC5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgY29tcG9uZW50OiBIb21lUGFnZVxyXG4gICAgICB9XHJcbiAgICBdKSxcclxuICAgIFNoYXJlZE1vZHVsZSxcclxuICAgIERhdGFMb2FkTW9kdWxlLFxyXG4gICAgTWFwTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtIb21lUGFnZSwgTWFwSXRlbUJhckNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlTW9kdWxlIHt9XHJcbiIsIjxhcHAtaGVhZGVyIHRpdGxlPVwiVmFyc29tIFJlZ29ic1wiIFtmdWxsc2NyZWVuU3VwcG9ydF09XCJ0cnVlXCI+PC9hcHAtaGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgXHJcbiAgPGFwcC1tYXAgXHJcbiAgICAobWFwUmVhZHkpPVwib25NYXBSZWFkeSgkZXZlbnQpXCJcclxuICAgIFthdXRvQWN0aXZhdGVdPVwiZmFsc2VcIlxyXG4gICAgW2dlb1RhZ109XCInSG9tZVBhZ2UnXCJcclxuICA+PC9hcHAtbWFwPlxyXG5cclxuICA8YXBwLW1hcC1jZW50ZXItaW5mb1xyXG4gICAgKm5nSWY9XCJ1c2VyU2V0dGluZ1NlcnZpY2Uuc2hvd01hcENlbnRlciQgfCBhc3luY1wiXHJcbiAgPjwvYXBwLW1hcC1jZW50ZXItaW5mbz5cclxuICBcclxuICA8YXBwLW1hcC1pdGVtLWJhcj48L2FwcC1tYXAtaXRlbS1iYXI+XHJcbiAgXHJcbiAgPGFwcC1nZW8tZmFiIHNsb3Q9XCJmaXhlZFwiICpuZ0lmPVwic2hvd0dlb1NlbGVjdEluZm8gPT09IGZhbHNlXCI+PC9hcHAtZ2VvLWZhYj5cclxuICBcclxuICA8YXBwLWFkZC1tZW51PjwvYXBwLWFkZC1tZW51PlxyXG4gIFxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhTG9hZElkcyQgfCBhc3luYyBhcyBkYXRhTG9hZElkc1wiPlxyXG4gICAgPGFwcC1kYXRhLWxvYWQgW2lkc109XCJkYXRhTG9hZElkc1wiIHNpbXBsZT1cInRydWVcIj48L2FwcC1kYXRhLWxvYWQ+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgTmdab25lLCBBZnRlclZpZXdDaGVja2VkLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0ICdsZWFmbGV0Lm1hcmtlcmNsdXN0ZXInO1xyXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCByYWNlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9ic2VydmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvb2JzZXJ2YXRpb24vb2JzZXJ2YXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcEl0ZW1CYXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1pdGVtLWJhci9tYXAtaXRlbS1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwSXRlbU1hcmtlciB9IGZyb20gJy4uLy4uL2NvcmUvaGVscGVycy9sZWFmbGV0L21hcC1pdGVtLW1hcmtlci9tYXAtaXRlbS1tYXJrZXInO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcENvbXBvbmVudCB9IGZyb20gJy4uLy4uL21vZHVsZXMvbWFwL2NvbXBvbmVudHMvbWFwL21hcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25WaWV3TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9mdWxsc2NyZWVuL2Z1bGxzY3JlZW4uc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2dnaW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMZWFmbGV0Q2x1c3RlckhlbHBlciB9IGZyb20gJy4uLy4uL21vZHVsZXMvbWFwL2hlbHBlcnMvbGVhZmxldC1jbHVzZXIuaGVscGVyJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7XHJcbiAgbWFwLFxyXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxyXG4gIHRha2VVbnRpbCxcclxuICB0YWtlLFxyXG4gIGRlYm91bmNlVGltZVxyXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi8uLi8uLi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IFVzYWdlQW5hbHl0aWNzQ29uc2VudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3VzYWdlLWFuYWx5dGljcy1jb25zZW50L3VzYWdlLWFuYWx5dGljcy1jb25zZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSb3V0ZXJQYWdlIH0gZnJvbSAnLi4vLi4vY29yZS9oZWxwZXJzL3JvdXRlZC1wYWdlJztcclxuaW1wb3J0IHsgZW50ZXJab25lIH0gZnJvbSAnLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuaW1wb3J0IHsgTWFwQ2VudGVySW5mb0NvbXBvbmVudCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9tYXAvY29tcG9uZW50cy9tYXAtY2VudGVyLWluZm8vbWFwLWNlbnRlci1pbmZvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdIb21lUGFnZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1ob21lJyxcclxuICB0ZW1wbGF0ZVVybDogJ2hvbWUucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnaG9tZS5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBSb3V0ZXJQYWdlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkIHtcclxuICBAVmlld0NoaWxkKE1hcEl0ZW1CYXJDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pIG1hcEl0ZW1CYXI6IE1hcEl0ZW1CYXJDb21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZChNYXBDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pIG1hcENvbXBvbmVudDogTWFwQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgbWFwOiBMLk1hcDtcclxuICBwcml2YXRlIG1hcmtlckxheWVyID0gTGVhZmxldENsdXN0ZXJIZWxwZXIuY3JlYXRlTWFya2VyQ2x1c3Rlckdyb3VwKHtcclxuICAgIHNwaWRlcmZ5T25NYXhab29tOiBmYWxzZSxcclxuICAgIHpvb21Ub0JvdW5kc09uQ2xpY2s6IGZhbHNlXHJcbiAgfSk7XHJcbiAgcHJpdmF0ZSBnZW9Db2FjaE1hcmtzQ2xvc2VkU3ViamVjdCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGZ1bGxzY3JlZW4kOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIHNlbGVjdGVkTWFya2VyOiBNYXBJdGVtTWFya2VyO1xyXG4gIHNob3dHZW9TZWxlY3RJbmZvID0gZmFsc2U7XHJcbiAgZGF0YUxvYWRJZHMkOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcclxuXHJcbiAgQFZpZXdDaGlsZChNYXBDZW50ZXJJbmZvQ29tcG9uZW50KSBtYXBDZW50ZXI6IE1hcENlbnRlckluZm9Db21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBtYXBDZW50ZXJJbmZvSGVpZ2h0ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBvYnNlcnZhdGlvblNlcnZpY2U6IE9ic2VydmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZnVsbHNjcmVlblNlcnZpY2U6IEZ1bGxzY3JlZW5TZXJ2aWNlLFxyXG4gICAgcHVibGljIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB1c2FnZUFuYWx5dGljc0NvbnNlbnRTZXJ2aWNlOiBVc2FnZUFuYWx5dGljc0NvbnNlbnRTZXJ2aWNlLFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnRcclxuICApIHtcclxuICAgIHN1cGVyKHJvdXRlciwgcm91dGUpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBnbG9iYWwgY3NzIHByb3BlcnR5IGNvbnRhaW5pbmcgaW5mbyBib3ggaGVpZ2h0IHdoZW4gaGVpZ2h0IGNoYW5nZXMuXHJcbiAgICAvLyBUaGlzIGlzIHVzZWQgdG8gcG9zaXRpb24gbWFwIHNjYWxlIGFib3ZlIG1hcCBjZW50ZXIgaW5mbyBib3guXHJcbiAgICB0aGlzLm1hcENlbnRlckluZm9IZWlnaHQucGlwZShcclxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICAgICAgZGVib3VuY2VUaW1lKDUwMCksXHJcbiAgICAgIHRha2VVbnRpbCh0aGlzLm5nVW5zdWJzY3JpYmUpXHJcbiAgICApLnN1YnNjcmliZSgobmV3SW5mb0JveEhlaWdodCkgPT4ge1xyXG4gICAgICB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tYXAtY2VudGVyLWluZm8taGVpZ2h0JywgYCR7bmV3SW5mb0JveEhlaWdodH1weGApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZUluZm9Cb3hIZWlnaHQoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5mdWxsc2NyZWVuJCA9IHRoaXMuZnVsbHNjcmVlblNlcnZpY2UuaXNGdWxsc2NyZWVuJDtcclxuICAgIHRoaXMuZGF0YUxvYWRJZHMkID0gdGhpcy5vYnNlcnZhdGlvblNlcnZpY2UuZGF0YUxvYWQkLnBpcGUoXHJcbiAgICAgIG1hcCgodmFsKSA9PiBbdmFsXSksXHJcbiAgICAgIGVudGVyWm9uZSh0aGlzLm5nWm9uZSlcclxuICAgICk7XHJcbiAgICB0aGlzLmNoZWNrRm9yRmlyc3RTdGFydHVwKCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0ZvckZpcnN0U3RhcnR1cCgpIHtcclxuICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHVzKSA9PiB1cy5zaG93R2VvU2VsZWN0SW5mbyksXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICAgICAgICB0YWtlVW50aWwocmFjZSh0aGlzLm5nVW5zdWJzY3JpYmUsIHRoaXMuZ2VvQ29hY2hNYXJrc0Nsb3NlZFN1YmplY3QpKSxcclxuICAgICAgICBlbnRlclpvbmUodGhpcy5uZ1pvbmUpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoc2hvd0dlb1NlbGVjdEluZm8pID0+IHtcclxuICAgICAgICB0aGlzLnNob3dHZW9TZWxlY3RJbmZvID0gc2hvd0dlb1NlbGVjdEluZm87XHJcbiAgICAgICAgaWYgKCFzaG93R2VvU2VsZWN0SW5mbykge1xyXG4gICAgICAgICAgdGhpcy5nZW9Db2FjaE1hcmtzQ2xvc2VkU3ViamVjdC5uZXh0KCk7XHJcbiAgICAgICAgICB0aGlzLmdlb0NvYWNoTWFya3NDbG9zZWRTdWJqZWN0LmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dVc2FnZUFuYWx5dGljc0RpYWxvZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzaG93VXNhZ2VBbmFseXRpY3NEaWFsb2coKSB7XHJcbiAgICBhd2FpdCB0aGlzLnVzYWdlQW5hbHl0aWNzQ29uc2VudFNlcnZpY2UuY2hlY2tVc2VyRGF0YUNvbnNlbnREaWFsb2coKTtcclxuICAgIHRoaXMubWFwQ29tcG9uZW50LmNvbXBvbmVudElzQWN0aXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgb25NYXBSZWFkeShsZWFmbGV0TWFwOiBMLk1hcCkge1xyXG4gICAgdGhpcy5tYXAgPSBsZWFmbGV0TWFwO1xyXG4gICAgdGhpcy5tYXJrZXJMYXllci5hZGRUbyh0aGlzLm1hcCk7XHJcbiAgICB0aGlzLm1hcmtlckxheWVyLm9uKCdjbHVzdGVyY2xpY2snLCAoYTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IGdyb3VwTGF0TG5nOiBMLkxhdExuZyA9IGEubGF0bG5nO1xyXG4gICAgICBjb25zdCBjdXJyZW50Wm9vbSA9IHRoaXMubWFwLmdldFpvb20oKTtcclxuICAgICAgY29uc3QgbmV3Wm9vbSA9IGN1cnJlbnRab29tICsgMjtcclxuICAgICAgaWYgKG5ld1pvb20gPj0gc2V0dGluZ3MubWFwLnRpbGVzLm1heFpvb20pIHtcclxuICAgICAgICBhLmxheWVyLnNwaWRlcmZ5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tYXAuc2V0VmlldyhcclxuICAgICAgICAgIGdyb3VwTGF0TG5nLFxyXG4gICAgICAgICAgTWF0aC5taW4obmV3Wm9vbSwgc2V0dGluZ3MubWFwLnRpbGVzLm1heFpvb20pXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hcC5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWFya2VyKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1hcmtlci5kZXNlbGVjdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRNYXJrZXIgPSBudWxsO1xyXG4gICAgICB0aGlzLm1hcEl0ZW1CYXIuaGlkZSgpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gY3VzdG9tIG1hcmtlciBsYXllcj9cclxuICAgIGNvbnN0IG9ic2VydmF0aW9uT2JzZXJ2YWJsZSA9IGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLm9ic2VydmF0aW9uU2VydmljZS5vYnNlcnZhdGlvbnMkLFxyXG4gICAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5zaG93T2JzZXJ2YXRpb25zJFxyXG4gICAgXSk7XHJcbiAgICBvYnNlcnZhdGlvbk9ic2VydmFibGVcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdVbnN1YnNjcmliZSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKFtyZWdPYnNlcnZhdGlvbnMsIHNob3dPYnNlcnZhdGlvbnNdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdPYnNlcnZhdGlvbk1hcmtlcnMoc2hvd09ic2VydmF0aW9ucyA/IHJlZ09ic2VydmF0aW9ucyA6IFtdKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkVudGVyKCkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnSG9tZSBwYWdlIGlvblZpZXdEaWRFbnRlci4nLCBERUJVR19UQUcpO1xyXG4gICAgY29uc3QgdXNlclNldHRpbmdzID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGlmICh1c2VyU2V0dGluZ3Muc2hvd0dlb1NlbGVjdEluZm8pIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZyhcclxuICAgICAgICAnRGlzcGxheSBjb2FjaG1hcmtzLCB3YWl0IHdpdGggc3RhcnRpbmcgZ2VvcG9zdGlvbicsXHJcbiAgICAgICAgREVCVUdfVEFHXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoXHJcbiAgICAgICdBY3RpdmF0ZSBtYXAgdXBkYXRlcyBhbmQgR2VvTG9jYXRpb24nLFxyXG4gICAgICBERUJVR19UQUdcclxuICAgICk7XHJcbiAgICB0aGlzLm1hcENvbXBvbmVudC5jb21wb25lbnRJc0FjdGl2ZSh0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlSW5mb0JveEhlaWdodCgpO1xyXG4gIH1cclxuXHJcbiAgb25MZWF2ZSgpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoXHJcbiAgICAgICdIb21lIHBhZ2Ugb25MZWF2ZS4gRGlzYWJsZSBtYXAgdXBkYXRlcyBhbmQgR2VvTG9jYXRpb24nLFxyXG4gICAgICBERUJVR19UQUdcclxuICAgICk7XHJcbiAgICB0aGlzLm1hcENvbXBvbmVudC5jb21wb25lbnRJc0FjdGl2ZShmYWxzZSk7XHJcblxyXG4gICAgLy8gQXMgd2UgbGVhdmUgdGhlIHBhZ2UsIG1hcCBjZW50ZXIgaW5mbyBpcyBub3QgdmlzaWJsZSBhbnkgbW9yZSwgcmVzZXQgaGVpZ2h0XHJcbiAgICB0aGlzLm1hcENlbnRlckluZm9IZWlnaHQubmV4dCgwKTtcclxuICB9XHJcblxyXG4gIC8vIGFzeW5jIGlvblZpZXdEaWRFbnRlcigpIHtcclxuICAvLyBVc2UgdGFiIHBhZ2Ugd29ya2Fyb3VuZCBmcm9tOlxyXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pb25pYy10ZWFtL2lvbmljL2lzc3Vlcy8xNTI2MFxyXG4gIC8vIH1cclxuXHJcbiAgLy8gaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAvLyAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoYEhvbWUgcGFnZSBpb25WaWV3V2lsbExlYXZlLiBEaXNhYmxlIG1hcCB1cGRhdGVzIGFuZCBHZW9Mb2NhdGlvbi5gLCBERUJVR19UQUcpO1xyXG4gIC8vICAgdGhpcy5tYXBDb21wb25lbnQuc3RvcEdlb1Bvc2l0aW9uVXBkYXRlcygpO1xyXG4gIC8vIH1cclxuXHJcbiAgcHJpdmF0ZSByZWRyYXdPYnNlcnZhdGlvbk1hcmtlcnMocmVnT2JzZXJ2YXRpb25zOiBSZWdpc3RyYXRpb25WaWV3TW9kZWxbXSkge1xyXG4gICAgdGhpcy5tYXJrZXJMYXllci5jbGVhckxheWVycygpO1xyXG4gICAgZm9yIChjb25zdCByZWdPYnNlcnZhdGlvbiBvZiByZWdPYnNlcnZhdGlvbnMpIHtcclxuICAgICAgY29uc3QgbGF0TG5nID0gTC5sYXRMbmcoXHJcbiAgICAgICAgcmVnT2JzZXJ2YXRpb24uT2JzTG9jYXRpb24uTGF0aXR1ZGUsXHJcbiAgICAgICAgcmVnT2JzZXJ2YXRpb24uT2JzTG9jYXRpb24uTG9uZ2l0dWRlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1hcmtlciA9IG5ldyBNYXBJdGVtTWFya2VyKHJlZ09ic2VydmF0aW9uLCBsYXRMbmcsIHt9KTtcclxuICAgICAgbWFya2VyLm9uKCdjbGljaycsIChldmVudDogTC5MZWFmbGV0RXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBtOiBNYXBJdGVtTWFya2VyID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWFya2VyKSB7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkTWFya2VyLmRlc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkTWFya2VyID0gbTtcclxuICAgICAgICBtLnNldFNlbGVjdGVkKCk7XHJcbiAgICAgICAgdGhpcy5tYXBJdGVtQmFyLnNob3cobS5pdGVtKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG1hcmtlci5hZGRUbyh0aGlzLm1hcmtlckxheWVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlSW5mb0JveEhlaWdodCgpIHtcclxuICAgIGNvbnN0IG1hcENlbnRlckVsZW1lbnQgPSB0aGlzLm1hcENlbnRlcj8ubmF0aXZlRWxlbWVudDtcclxuICAgIGlmIChtYXBDZW50ZXJFbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IG1hcENlbnRlckVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICB0aGlzLm1hcENlbnRlckluZm9IZWlnaHQubmV4dChoZWlnaHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tYXBDZW50ZXJJbmZvSGVpZ2h0Lm5leHQoMCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRhYnNQYWdlUm91dGluZ01vZHVsZSB9IGZyb20gJy4vdGFicy5yb3V0ZXIubW9kdWxlJztcclxuaW1wb3J0IHsgVGFic1BhZ2UgfSBmcm9tICcuL3RhYnMucGFnZSc7XHJcbmltcG9ydCB7IEhvbWVQYWdlTW9kdWxlIH0gZnJvbSAnLi4vaG9tZS9ob21lLm1vZHVsZSc7XHJcbmltcG9ydCB7IFRyaXBQYWdlTW9kdWxlIH0gZnJvbSAnLi4vdHJpcC90cmlwLm1vZHVsZSc7XHJcbmltcG9ydCB7IFdhcm5pbmdMaXN0UGFnZU1vZHVsZSB9IGZyb20gJy4uL3dhcm5pbmctbGlzdC93YXJuaW5nLWxpc3QubW9kdWxlJztcclxuaW1wb3J0IHsgT2JzZXJ2YXRpb25MaXN0UGFnZU1vZHVsZSB9IGZyb20gJy4uL29ic2VydmF0aW9uLWxpc3Qvb2JzZXJ2YXRpb24tbGlzdC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuaW1wb3J0IHsgQ29hY2hNYXJrc0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29hY2gtbWFya3MvY29hY2gtbWFya3MuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgVGFic1BhZ2VSb3V0aW5nTW9kdWxlLFxyXG4gICAgSG9tZVBhZ2VNb2R1bGUsXHJcbiAgICBUcmlwUGFnZU1vZHVsZSxcclxuICAgIFdhcm5pbmdMaXN0UGFnZU1vZHVsZSxcclxuICAgIE9ic2VydmF0aW9uTGlzdFBhZ2VNb2R1bGUsXHJcbiAgICBTaGFyZWRNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1RhYnNQYWdlLCBDb2FjaE1hcmtzQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFic1BhZ2VNb2R1bGUge31cclxuIiwiPGlvbi10YWJzIHRhYmJhci1oaWdobGlnaHQ9XCJ0cnVlXCIgW25nQ2xhc3NdPVwieydpb3MnOiBpc0lvcywgJ21kJzogaXNBbmRyb2lkfVwiPlxyXG4gIDxpb24tdGFiLWJhciBbaGlkZGVuXT1cImZ1bGxzY3JlZW4kIHwgYXN5bmNcIiBzbG90PVwiYm90dG9tXCI+XHJcbiAgICA8aW9uLXRhYi1idXR0b24gdGFiPVwiaG9tZVwiPlxyXG4gICAgICA8aW9uLWljb24gbmFtZT1cIm1hcFwiPjwvaW9uLWljb24+XHJcbiAgICAgIDxpb24tbGFiZWw+e3snVEFCUy5NQVAnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLXRhYi1idXR0b24+XHJcbiAgICA8aW9uLXRhYi1idXR0b24gdGFiPVwib2JzZXJ2YXRpb24tbGlzdFwiPlxyXG4gICAgICA8aW9uLWljb24gbmFtZT1cImxpc3RcIj48L2lvbi1pY29uPlxyXG4gICAgICA8aW9uLWxhYmVsPnt7J1RBQlMuTElTVCcgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24tdGFiLWJ1dHRvbj5cclxuICAgIDxpb24tdGFiLWJ1dHRvbiB0YWI9XCJ3YXJuaW5nLWxpc3RcIj5cclxuICAgICAgPGlvbi1pY29uIG5hbWU9XCJ3YXJuaW5nXCI+PC9pb24taWNvbj5cclxuICAgICAgPGlvbi1sYWJlbD57eydUQUJTLldBUk5JTkdTJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tYmFkZ2UgKm5nSWY9XCJzaG93QmFkZ2VcIiBbY29sb3JdPVwiYmFkZ2VDb2xvclwiPnt7IGJhZGdlVGV4dCB9fTwvaW9uLWJhZGdlPlxyXG4gICAgPC9pb24tdGFiLWJ1dHRvbj5cclxuICA8L2lvbi10YWItYmFyPlxyXG48L2lvbi10YWJzPlxyXG48YXBwLWNvYWNoLW1hcmtzPjwvYXBwLWNvYWNoLW1hcmtzPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFdhcm5pbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy93YXJuaW5nL3dhcm5pbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2Z1bGxzY3JlZW4vZnVsbHNjcmVlbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC10YWJzJyxcclxuICB0ZW1wbGF0ZVVybDogJ3RhYnMucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsndGFicy5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFic1BhZ2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSB3YXJuaW5nR3JvdXBJbk1hcFZpZXdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGN1cnJlbnRHZW9IYXphcmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgd2FybmluZ3NJblZpZXc6IHtcclxuICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICBtYXhXYXJuaW5nOiBudW1iZXI7XHJcbiAgICBoYXNFbWVyZ2VuY3lXYXJuaW5nOiBib29sZWFuO1xyXG4gIH07XHJcbiAgaXNJb3M6IGJvb2xlYW47XHJcbiAgaXNBbmRyb2lkOiBib29sZWFuO1xyXG4gIGZ1bGxzY3JlZW4kOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIHNob3dUcmlwcyA9IGZhbHNlO1xyXG5cclxuICBnZXQgc2hvd0JhZGdlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMud2FybmluZ3NJblZpZXcgJiYgdGhpcy53YXJuaW5nc0luVmlldy5tYXhXYXJuaW5nID4gMDtcclxuICB9XHJcblxyXG4gIGdldCBiYWRnZUNvbG9yKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ3dhcm5pbmdsZXZlbC0nICsgdGhpcy53YXJuaW5nc0luVmlldy5tYXhXYXJuaW5nO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJhZGdlVGV4dCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGAke3RoaXMud2FybmluZ3NJblZpZXcubWF4V2FybmluZ30ke1xyXG4gICAgICB0aGlzLndhcm5pbmdzSW5WaWV3Lmhhc0VtZXJnZW5jeVdhcm5pbmcgPyAnIScgOiAnJ1xyXG4gICAgfWA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZnVsbHNjcmVlblNlcnZpY2U6IEZ1bGxzY3JlZW5TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICBwcml2YXRlIHdhcm5pbmdTZXJ2aWNlOiBXYXJuaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlzSW9zID0gdGhpcy5wbGF0Zm9ybS5pcygnaW9zJyk7XHJcbiAgICB0aGlzLmlzQW5kcm9pZCA9IHRoaXMucGxhdGZvcm0uaXMoJ2FuZHJvaWQnKTtcclxuICAgIHRoaXMuZnVsbHNjcmVlbiQgPSB0aGlzLmZ1bGxzY3JlZW5TZXJ2aWNlLmlzRnVsbHNjcmVlbiQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMud2FybmluZ0dyb3VwSW5NYXBWaWV3U3Vic2NyaXB0aW9uID0gdGhpcy53YXJuaW5nU2VydmljZS53YXJuaW5nR3JvdXBJbk1hcFZpZXdPYnNlcnZhYmxlJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHdhcm5pbmdzSW5WaWV3KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBhbGxXYXJuaW5ncyA9IFtcclxuICAgICAgICAgICAgLi4ud2FybmluZ3NJblZpZXcuY2VudGVyLFxyXG4gICAgICAgICAgICAuLi53YXJuaW5nc0luVmlldy52aWV3Qm91bmRzXHJcbiAgICAgICAgICBdO1xyXG4gICAgICAgICAgY29uc3QgYWxsTWF4V2FybmluZ3MgPSBhbGxXYXJuaW5ncy5tYXAoKGcpID0+IGcuZ2V0TWF4V2FybmluZygwKSk7XHJcbiAgICAgICAgICBjb25zdCBtYXhXYXJuaW5nID0gTWF0aC5tYXgoLi4uYWxsTWF4V2FybmluZ3MubWFwKCh4KSA9PiB4Lm1heCkpO1xyXG4gICAgICAgICAgY29uc3QgaGFzRW1lcmdlbmN5V2FybmluZyA9IGFsbE1heFdhcm5pbmdzLnNvbWUoXHJcbiAgICAgICAgICAgICh4KSA9PiB4Lm1heCA9PT0gbWF4V2FybmluZyAmJiB4Lmhhc1dhcm5pbmdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb3VudDogYWxsV2FybmluZ3MubGVuZ3RoLFxyXG4gICAgICAgICAgICB0ZXh0OiBhbGxXYXJuaW5ncy5sZW5ndGggPiA5ID8gJzkrJyA6IGFsbFdhcm5pbmdzLmxlbmd0aC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBtYXhXYXJuaW5nLFxyXG4gICAgICAgICAgICBoYXNFbWVyZ2VuY3lXYXJuaW5nXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMud2FybmluZ3NJblZpZXcgPSB2YWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY3VycmVudEdlb0hhemFyZFN1YnNjcmlwdGlvbiA9IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmN1cnJlbnRHZW9IYXphcmQkLnN1YnNjcmliZShcclxuICAgICAgKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNob3dUcmlwcyA9IHZhbC5pbmRleE9mKEdlb0hhemFyZC5Tbm93KSA+PSAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLndhcm5pbmdHcm91cEluTWFwVmlld1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5jdXJyZW50R2VvSGF6YXJkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVGFic1BhZ2UgfSBmcm9tICcuL3RhYnMucGFnZSc7XHJcbmltcG9ydCB7IFN0YXJ0V2l6YXJkR3VhcmQgfSBmcm9tICcuLi8uLi9jb3JlL2d1YXJkcy9zdGFydC13aXphcmQuZ3VhcmQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJ3RhYnMnLFxyXG4gICAgY29tcG9uZW50OiBUYWJzUGFnZSxcclxuICAgIGNhbkFjdGl2YXRlOiBbU3RhcnRXaXphcmRHdWFyZF0sXHJcbiAgICBjaGlsZHJlbjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgcmVkaXJlY3RUbzogJy90YWJzL2hvbWUnLFxyXG4gICAgICAgIHBhdGhNYXRjaDogJ2Z1bGwnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwYXRoOiAnaG9tZScsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogKCkgPT5cclxuICAgICAgICAgICAgICBpbXBvcnQoJy4uL2hvbWUvaG9tZS5tb2R1bGUnKS50aGVuKChtKSA9PiBtLkhvbWVQYWdlTW9kdWxlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHBhdGg6ICd0cmlwJyxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnJyxcclxuICAgICAgICAgICAgbG9hZENoaWxkcmVuOiAoKSA9PlxyXG4gICAgICAgICAgICAgIGltcG9ydCgnLi4vdHJpcC90cmlwLm1vZHVsZScpLnRoZW4oKG0pID0+IG0uVHJpcFBhZ2VNb2R1bGUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogJ29ic2VydmF0aW9uLWxpc3QnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICcnLFxyXG4gICAgICAgICAgICBsb2FkQ2hpbGRyZW46ICgpID0+XHJcbiAgICAgICAgICAgICAgaW1wb3J0KCcuLi9vYnNlcnZhdGlvbi1saXN0L29ic2VydmF0aW9uLWxpc3QubW9kdWxlJykudGhlbihcclxuICAgICAgICAgICAgICAgIChtKSA9PiBtLk9ic2VydmF0aW9uTGlzdFBhZ2VNb2R1bGVcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogJ3dhcm5pbmctbGlzdCcsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogKCkgPT5cclxuICAgICAgICAgICAgICBpbXBvcnQoJy4uL3dhcm5pbmctbGlzdC93YXJuaW5nLWxpc3QubW9kdWxlJykudGhlbihcclxuICAgICAgICAgICAgICAgIChtKSA9PiBtLldhcm5pbmdMaXN0UGFnZU1vZHVsZVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgcmVkaXJlY3RUbzogJy90YWJzL2hvbWUnLFxyXG4gICAgcGF0aE1hdGNoOiAnZnVsbCdcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYnNQYWdlUm91dGluZ01vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcbmltcG9ydCB7IElvbmljTW9kdWxlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgVHJpcFBhZ2UgfSBmcm9tICcuL3RyaXAucGFnZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogVHJpcFBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgSW9uaWNNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVHJpcFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmlwUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXRyaXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cmlwLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdHJpcC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJpcFBhZ2Uge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwiZW5kXCI+XHJcbiAgICAgIDxpb24tbWVudS1idXR0b24+PC9pb24tbWVudS1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT57eyBcIlRSSVAuVElUTEVcIiB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudD5cclxuICA8aW9uLWxpc3Q+XHJcbiAgICA8aW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICBQbGFubGVnZyB0dXJcclxuICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cIm1hcFwiPjwvaW9uLWljb24+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgVHVyZm9yc2xhZ1xyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiBuYW1lPVwiY2hldnJvbi1mb3J3YXJkXCI+PC9pb24taWNvbj5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8aW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwibWFwXCI+PC9pb24taWNvbj5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICBSZWdpc3RyZXJ0ZSB0dXJlclxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiBuYW1lPVwiY2hldnJvbi1mb3J3YXJkXCI+PC9pb24taWNvbj5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8aW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwid2Fsa1wiPjwvaW9uLWljb24+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgUGxhbmxlZ2cgbnkgdHVyXHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLWljb24gc2xvdD1cImVuZFwiIG5hbWU9XCJjaGV2cm9uLWZvcndhcmRcIj48L2lvbi1pY29uPlxyXG4gICAgPC9pb24taXRlbT5cclxuICA8L2lvbi1saXN0PlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFeHRlcm5hbExpbmtTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9leHRlcm5hbC1saW5rL2V4dGVybmFsLWxpbmsuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hYm9ubmVyLWJhbm5lcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Fib25uZXItYmFubmVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hYm9ubmVyLWJhbm5lci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBYm9ubmVyQmFubmVyQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVybmFsTGlua1NlcnZpY2U6IEV4dGVybmFsTGlua1NlcnZpY2UpIHt9XHJcblxyXG4gIGJ1dHRvbkNsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmV4dGVybmFsTGlua1NlcnZpY2Uub3BlbkV4dGVybmFsTGluaygnaHR0cHM6Ly9hYm9ubmVyLnZhcnNvbS5ubycpO1xyXG4gIH1cclxufVxyXG4iLCI8aDMgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydBQk9OTkVSX0JBTk5FUi5USVRMRScgfCB0cmFuc2xhdGUgfX08L2gzPlxyXG48cD57eydBQk9OTkVSX0JBTk5FUi5CQU5ORVJfVEVYVF9MSU5FXzEnIHwgdHJhbnNsYXRlIH19PGJyIC8+e3snQUJPTk5FUl9CQU5ORVIuQkFOTkVSX1RFWFRfTElORV8yJyB8IHRyYW5zbGF0ZSB9fTwvcD5cclxuPGlvbi1idXR0b24gY2xhc3M9XCJpb24tbm8tbWFyZ2luXCIgY29sb3I9XCJwcmltYXJ5XCIgZmlsbD1cIm91dGxpbmVcIiAoY2xpY2spPVwiYnV0dG9uQ2xpY2tlZCgpXCI+XHJcbiAge3sgJ0FCT05ORVJfQkFOTkVSLkxJTktfVEVYVCcgfCB0cmFuc2xhdGUgfX1cclxuPC9pb24tYnV0dG9uPiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IElvbmljTW9kdWxlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBXYXJuaW5nTGlzdFBhZ2UgfSBmcm9tICcuL3dhcm5pbmctbGlzdC5wYWdlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBXYXJuaW5nTGlzdEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvd2FybmluZy1saXN0LWhlYWRlci93YXJuaW5nLWxpc3QtaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvd2FybmluZy1saXN0LWl0ZW0vd2FybmluZy1saXN0LWl0ZW0uY29tcG9uZW50JztcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG5pbXBvcnQgeyBXYXJuaW5nR3JvdXBGYXZvdXJpdGVUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3dhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS93YXJuaW5nLWdyb3VwLWZhdm91cml0ZS10b2dnbGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWJvbm5lckJhbm5lckNvbXBvbmVudCB9IGZyb20gJy4vYWJvbm5lci1iYW5uZXIvYWJvbm5lci1iYW5uZXIuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBXYXJuaW5nTGlzdFBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgSW9uaWNNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFNoYXJlZE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBXYXJuaW5nTGlzdFBhZ2UsXHJcbiAgICBXYXJuaW5nTGlzdEhlYWRlckNvbXBvbmVudCxcclxuICAgIFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudCxcclxuICAgIFdhcm5pbmdHcm91cEZhdm91cml0ZVRvZ2dsZUNvbXBvbmVudCxcclxuICAgIEFib25uZXJCYW5uZXJDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXYXJuaW5nTGlzdFBhZ2VNb2R1bGUge31cclxuIiwiPGFwcC1oZWFkZXIgW3RpdGxlXT1cInRpdGxlXCI+PC9hcHAtaGVhZGVyPlxyXG48aW9uLXNlZ21lbnQgbW9kZT1cIm1kXCIgc2xvdD1cImZpeGVkXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFRhYlwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uU2VnbWVudENoYW5nZSgpXCI+XHJcbiAgPGlvbi1zZWdtZW50LWJ1dHRvbiBtb2RlPVwibWRcIiB2YWx1ZT1cImluTWFwVmlld1wiPlxyXG4gICAgPGlvbi1sYWJlbD57eydXQVJOSU5HX0xJU1QuUkVMRVZBTlQnfHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgPC9pb24tc2VnbWVudC1idXR0b24+XHJcbiAgPGlvbi1zZWdtZW50LWJ1dHRvbiBtb2RlPVwibWRcIiB2YWx1ZT1cImFsbFwiPlxyXG4gICAgPGlvbi1sYWJlbD57eydXQVJOSU5HX0xJU1QuQUxMJ3x0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLXNlZ21lbnQtYnV0dG9uPlxyXG4gIDxpb24tc2VnbWVudC1idXR0b24gbW9kZT1cIm1kXCIgdmFsdWU9XCJmYXZvdXJpdGVzXCI+XHJcbiAgICA8aW9uLWxhYmVsPnt7J1dBUk5JTkdfTElTVC5GQVZPVVJJVEVTJ3x0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLXNlZ21lbnQtYnV0dG9uPlxyXG48L2lvbi1zZWdtZW50PlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWZyZXNoLXdpdGgtY2FuY2VsIFtyZWZyZXNoRnVuY109XCJyZWZyZXNoRnVuY1wiPjwvYXBwLXJlZnJlc2gtd2l0aC1jYW5jZWw+XHJcbiAgPGlvbi12aXJ0dWFsLXNjcm9sbCAqbmdJZj1cIiFzaG93RW1wdHlTdGF0ZSBlbHNlIGVtcHR5XCIgW25nQ2xhc3NdPVwieydsb2FkZWQnOiBsb2FkZWR9XCIgW2l0ZW1zXT1cIndhcm5pbmdHcm91cHNcIlxyXG4gICAgW2hlYWRlckZuXT1cIm15SGVhZGVyRm5cIiBbZm9vdGVyRm5dPVwibXlGb290ZXJGblwiIFthcHByb3hJdGVtSGVpZ2h0XT1cIjQ5XCIgW2FwcHJveEhlYWRlckhlaWdodF09XCIzOFwiXHJcbiAgICBbdHJhY2tCeV09XCJ0cmFja0J5RnVuY1wiPlxyXG4gICAgPGlvbi1pdGVtLWRpdmlkZXIgKnZpcnR1YWxIZWFkZXI9XCJsZXQgaGVhZGVyXCI+XHJcbiAgICAgIDxhcHAtd2FybmluZy1saXN0LWhlYWRlciBbdGl0bGVdPVwiaGVhZGVyLmhlYWRlclwiIFtzdWJUaXRsZV09XCJoZWFkZXIuaW5mb1RleHRcIlxyXG4gICAgICAgIFtzaG93RGF5TmFtZXNdPVwiaGVhZGVyLnNob3dEYXlOYW1lc1wiPjwvYXBwLXdhcm5pbmctbGlzdC1oZWFkZXI+XHJcbiAgICA8L2lvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICA8ZGl2ICp2aXJ0dWFsSXRlbT1cImxldCB2aXJ0aWFsSXRlbVwiPlxyXG4gICAgICA8YXBwLXdhcm5pbmctbGlzdC1pdGVtIFt3YXJuaW5nR3JvdXBdPVwidmlydGlhbEl0ZW0uaXRlbVwiPjwvYXBwLXdhcm5pbmctbGlzdC1pdGVtPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aW9uLWl0ZW0tZGl2aWRlciBjbGFzcz1cInZpcnR1YWwtbGlzdC1mb290ZXJcIiAqdmlydHVhbEZvb3Rlcj1cImxldCBmb290ZXJcIj5cclxuICAgIDwvaW9uLWl0ZW0tZGl2aWRlcj5cclxuICA8L2lvbi12aXJ0dWFsLXNjcm9sbD5cclxuICA8ZGl2IGlkPVwiYWJvbm5lci1iYW5uZXJcIiAqbmdJZj1cInNlbGVjdGVkVGFiID09PSAnaW5NYXBWaWV3J1wiIGNsYXNzPVwiaW9uLW1hcmdpblwiIFtuZ0NsYXNzXT1cInsnbG9hZGVkJzogbG9hZGVkfVwiPlxyXG4gICAgPGFwcC1hYm9ubmVyLWJhbm5lcj48L2FwcC1hYm9ubmVyLWJhbm5lcj5cclxuICA8L2Rpdj5cclxuPC9pb24tY29udGVudD5cclxuPGFwcC1hZGQtbWVudT48L2FwcC1hZGQtbWVudT5cclxuPGFwcC1nZW8tc2VsZWN0IHNsb3Q9XCJmaXhlZFwiPjwvYXBwLWdlby1zZWxlY3Q+XHJcbjxuZy10ZW1wbGF0ZSAjZW1wdHk+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNob3dOb0Zhdm91cml0ZXMgPyBlbXB0eUZhdm91cml0ZXMgOiBlbXB0eVJlbGV2YW50XCI+PC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbjxuZy10ZW1wbGF0ZSAjZW1wdHlGYXZvdXJpdGVzPlxyXG4gIDxpb24tZ3JpZCBjbGFzcz1cImZ1bGwtZ3JpZFwiPlxyXG4gICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyIGlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgIDxzdmctaWNvbiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9lbXB0eS1zdGF0ZXMvbm8tZmF2b3VyaXRlcy5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLW1hcmdpbi1ob3Jpem9udGFsXCI+XHJcbiAgICAgICAgPGgyPiB7eyAnV0FSTklOR19MSVNULk5PX0ZBVk9VUklURVMnIHwgdHJhbnNsYXRlIH19PC9oMj5cclxuICAgICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+e3snV0FSTklOR19MSVNULk5PX0ZBVk9VUklURVNfVEVYVCd8dHJhbnNsYXRlfX08L2gzPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgPC9pb24tZ3JpZD5cclxuPC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNlbXB0eVJlbGV2YW50PlxyXG4gIDxpb24tZ3JpZCBjbGFzcz1cImZ1bGwtZ3JpZFwiPlxyXG4gICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyIGlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgIDxzdmctaWNvbiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9lbXB0eS1zdGF0ZXMvbm8td2FybmluZ3Muc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyIGlvbi1tYXJnaW4taG9yaXpvbnRhbFwiPlxyXG4gICAgICAgIDxoMj4ge3sgJ1dBUk5JTkdfTElTVC5OT19XQVJOSU5HUycgfCB0cmFuc2xhdGUgfX08L2gyPlxyXG4gICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj57eydXQVJOSU5HX0xJU1QuTk9fV0FSTklOR1NfVEVYVCd8dHJhbnNsYXRlfX08L2gzPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgPC9pb24tZ3JpZD5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgTmdab25lLFxyXG4gIFZpZXdDaGlsZHJlbixcclxuICBRdWVyeUxpc3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2FybmluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3dhcm5pbmcvd2FybmluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCB0YXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgV2FybmluZ0dyb3VwIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy93YXJuaW5nL3dhcm5pbmctZ3JvdXAubW9kZWwnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IElWaXJ0dWFsU2Nyb2xsSXRlbSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3ZpcnR1YWwtc2Nyb2xsLWl0ZW0ubW9kZWwnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvd2FybmluZy1saXN0LWl0ZW0vd2FybmluZy1saXN0LWl0ZW0uY29tcG9uZW50JztcclxuXHJcbnR5cGUgU2VsZWN0ZWRUYWIgPSAnaW5NYXBWaWV3JyB8ICdhbGwnIHwgJ2Zhdm91cml0ZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtd2FybmluZy1saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vd2FybmluZy1saXN0LnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vd2FybmluZy1saXN0LnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXYXJuaW5nTGlzdFBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHNlbGVjdGVkVGFiOiBTZWxlY3RlZFRhYjtcclxuICB3YXJuaW5nR3JvdXBzOiBJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPltdID0gW107XHJcbiAgcHJpdmF0ZSBzZWdtZW50UGFnZVN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxTZWxlY3RlZFRhYj47XHJcbiAgcHJpdmF0ZSBzZWdtZW50UGFnZU9ic2VydmFibGU6IE9ic2VydmFibGU8U2VsZWN0ZWRUYWI+O1xyXG4gIHByaXZhdGUgbmdEZXN0cm95U3ViamVjdDogU3ViamVjdDx2b2lkPjtcclxuICByZWZyZXNoRnVuYyA9IHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpO1xyXG4gIHRpdGxlID0gJ1dBUk5JTkdfTElTVC5USVRMRSc7XHJcbiAgbm9GYXZvdXJpdGVzID0gZmFsc2U7XHJcbiAgbm9SZWxldmFudCA9IGZhbHNlO1xyXG4gIHRyYWNrQnlGdW5jID0gdGhpcy50cmFja0J5SW50ZXJuYWwuYmluZCh0aGlzKTtcclxuICBsb2FkZWQgPSBmYWxzZTtcclxuICBteUZvb3RlckZuID0gdGhpcy5mb290ZXJGbi5iaW5kKHRoaXMpO1xyXG5cclxuICBAVmlld0NoaWxkcmVuKFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudClcclxuICB3YXJuaW5nTGlzdEl0ZW1zOiBRdWVyeUxpc3Q8V2FybmluZ0xpc3RJdGVtQ29tcG9uZW50PjtcclxuXHJcbiAgZ2V0IHNob3dOb0Zhdm91cml0ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYiA9PT0gJ2Zhdm91cml0ZXMnICYmIHRoaXMubm9GYXZvdXJpdGVzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNob3dOb1JlbGV2YW50RW1wdHlTdGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiID09PSAnaW5NYXBWaWV3JyAmJiB0aGlzLm5vUmVsZXZhbnQ7XHJcbiAgfVxyXG5cclxuICBnZXQgc2hvd0VtcHR5U3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaG93Tm9GYXZvdXJpdGVzIHx8IHRoaXMuc2hvd05vUmVsZXZhbnRFbXB0eVN0YXRlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHdhcm5pbmdTZXJ2aWNlOiBXYXJuaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAnaW5NYXBWaWV3JztcclxuICAgIHRoaXMuc2VnbWVudFBhZ2VTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTZWxlY3RlZFRhYj4oXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWJcclxuICAgICk7XHJcbiAgICB0aGlzLnNlZ21lbnRQYWdlT2JzZXJ2YWJsZSA9IHRoaXMuc2VnbWVudFBhZ2VTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VBbGxPcGVuKCkge1xyXG4gICAgaWYgKHRoaXMud2FybmluZ0xpc3RJdGVtcykge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy53YXJuaW5nTGlzdEl0ZW1zLnRvQXJyYXkoKSkge1xyXG4gICAgICAgIGl0ZW0uY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW9uVmlld0RpZEVudGVyKCkge1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3lTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcclxuICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XHJcbiAgICBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgdGhpcy5zZWdtZW50UGFnZU9ic2VydmFibGUsXHJcbiAgICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmN1cnJlbnRHZW9IYXphcmQkXHJcbiAgICBdKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBzd2l0Y2hNYXAoKFtzZWdtZW50LCBjdXJyZW50R2VvSGF6YXJkXSkgPT5cclxuICAgICAgICAgIHRoaXMuZ2V0V2FybmluZ0dyb3VwT2JzZXJ2YWJsZShzZWdtZW50LCBjdXJyZW50R2VvSGF6YXJkKVxyXG4gICAgICAgICksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95U3ViamVjdClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCh3YXJuaW5nR3JvdXBzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2xvc2VBbGxPcGVuKCk7XHJcbiAgICAgICAgICB0aGlzLndhcm5pbmdHcm91cHMgPSB3YXJuaW5nR3JvdXBzO1xyXG4gICAgICAgICAgdGhpcy5oYWNrVG9TaG93VmlydHVhbFNjcm9sbEl0ZW1zVGhhdElzTm90VmlzaWJsZUF0Rmlyc3RMb2FkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgY29tYmluZUxhdGVzdChbXHJcbiAgICAgIHRoaXMuc2VnbWVudFBhZ2VPYnNlcnZhYmxlLFxyXG4gICAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5jdXJyZW50R2VvSGF6YXJkJFxyXG4gICAgXSlcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95U3ViamVjdCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKFtzZWxlY3RlZFRhYiwgY3VycmVudEdlb0hhemFyZF0pID0+IHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXRUaXRsZShzZWxlY3RlZFRhYiwgY3VycmVudEdlb0hhemFyZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYWNrVG9TaG93VmlydHVhbFNjcm9sbEl0ZW1zVGhhdElzTm90VmlzaWJsZUF0Rmlyc3RMb2FkKCkge1xyXG4gICAgaWYgKCF0aGlzLmxvYWRlZCAmJiB0aGlzLndhcm5pbmdHcm91cHMgJiYgdGhpcy53YXJuaW5nR3JvdXBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgY3VycmVudEl0ZW1zID0gWy4uLnRoaXMud2FybmluZ0dyb3Vwc107XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMud2FybmluZ0dyb3VwcyA9IG51bGw7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvLyBIYWNrIHRvIHZpcnR1YWwgc2Nyb2xsIGl0ZW1zIG5vdCBzaG93aW5nIGF0IGZpcnN0IGxvYWRcclxuICAgICAgICAgIHRoaXMud2FybmluZ0dyb3VwcyA9IGN1cnJlbnRJdGVtcztcclxuICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRUaXRsZShzZWxlY3RlZFRhYjogU2VsZWN0ZWRUYWIsIGN1cnJlbnRHZW9IYXphcmQ6IEdlb0hhemFyZFtdKSB7XHJcbiAgICBpZiAoc2VsZWN0ZWRUYWIgIT09ICdmYXZvdXJpdGVzJykge1xyXG4gICAgICB0aGlzLnRpdGxlID0gYFdBUk5JTkdfTElTVC5USVRMRV8ke0dlb0hhemFyZFtcclxuICAgICAgICBjdXJyZW50R2VvSGF6YXJkWzBdXHJcbiAgICAgIF0udG9VcHBlckNhc2UoKX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aXRsZSA9ICdXQVJOSU5HX0xJU1QuVElUTEUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVmcmVzaChjYW5jZWxQcm9taXNlOiBQcm9taXNlPGFueT4pIHtcclxuICAgIHJldHVybiB0aGlzLndhcm5pbmdTZXJ2aWNlLnVwZGF0ZVdhcm5pbmdzRm9yQ3VycmVudEdlb0hhemFyZChjYW5jZWxQcm9taXNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0V2FybmluZ0dyb3VwT2JzZXJ2YWJsZShcclxuICAgIHNlZ21lbnQ6IFNlbGVjdGVkVGFiLFxyXG4gICAgY3VycmVudEdlb0hhemFyZDogR2VvSGF6YXJkW11cclxuICApOiBPYnNlcnZhYmxlPElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W10+IHtcclxuICAgIHN3aXRjaCAoc2VnbWVudCkge1xyXG4gICAgY2FzZSAnaW5NYXBWaWV3JzpcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0V2FybmluZ3NJbk1hcFZpZXcoKTtcclxuICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEFsbFdhcm5pbmdzKGN1cnJlbnRHZW9IYXphcmQpO1xyXG4gICAgY2FzZSAnZmF2b3VyaXRlcyc6XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEZhdm91cml0ZXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1hcFRvVmlydHVhbFNjcm9sbEl0ZW0oXHJcbiAgICB3ZzogV2FybmluZ0dyb3VwW10sXHJcbiAgICBoZWFkZXI/OiBzdHJpbmcsXHJcbiAgICBpbmZvVGV4dD86IHN0cmluZ1xyXG4gICk6IElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W10ge1xyXG4gICAgcmV0dXJuIHdnLm1hcCgoaXRlbSwgaW5kZXgpID0+ICh7XHJcbiAgICAgIGhlYWRlcjogaW5kZXggPT09IDAgPyBoZWFkZXIgOiB1bmRlZmluZWQsXHJcbiAgICAgIGluZm9UZXh0OiBpbmRleCA9PT0gMCA/IGluZm9UZXh0IDogdW5kZWZpbmVkLFxyXG4gICAgICBpdGVtXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFdhcm5pbmdzSW5NYXBWaWV3KCkge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLmdldFdhcm5pbmdzSW5NYXBWaWV3Q2VudGVyKCksXHJcbiAgICAgIHRoaXMuZ2V0V2FybmluZ3NJbk1hcFZpZXdCb3VuZHMoKSxcclxuICAgICAgdGhpcy5nZXRXYXJuaW5nc0luTWFwVmlld0J1ZmZlcigpXHJcbiAgICBdKS5waXBlKFxyXG4gICAgICBtYXAoKFthLCBiLCBjXSkgPT4gWy4uLmEsIC4uLmIsIC4uLihiLmxlbmd0aCA8IDMgPyBjIDogW10pXSksXHJcbiAgICAgIHRhcCgodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMubm9SZWxldmFudCA9IHZhbC5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRXYXJuaW5nc0luTWFwVmlld0NlbnRlcigpOiBPYnNlcnZhYmxlPFxyXG4gICAgSVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD5bXVxyXG4gICAgPiB7XHJcbiAgICByZXR1cm4gdGhpcy53YXJuaW5nU2VydmljZS53YXJuaW5nR3JvdXBJbk1hcFZpZXdPYnNlcnZhYmxlJC5waXBlKFxyXG4gICAgICBtYXAoKHZhbCkgPT5cclxuICAgICAgICB0aGlzLm1hcFRvVmlydHVhbFNjcm9sbEl0ZW0odmFsLmNlbnRlciwgJ1dBUk5JTkdfTElTVC5JTl9NQVBfQ0VOVEVSJylcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0V2FybmluZ3NJbk1hcFZpZXdCb3VuZHMoKTogT2JzZXJ2YWJsZTxcclxuICAgIElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W11cclxuICAgID4ge1xyXG4gICAgcmV0dXJuIHRoaXMud2FybmluZ1NlcnZpY2Uud2FybmluZ0dyb3VwSW5NYXBWaWV3T2JzZXJ2YWJsZSQucGlwZShcclxuICAgICAgbWFwKCh2YWwpID0+XHJcbiAgICAgICAgdGhpcy5tYXBUb1ZpcnR1YWxTY3JvbGxJdGVtKHZhbC52aWV3Qm91bmRzLCAnV0FSTklOR19MSVNULklOX01BUF9WSUVXJylcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0V2FybmluZ3NJbk1hcFZpZXdCdWZmZXIoKTogT2JzZXJ2YWJsZTxcclxuICAgIElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W11cclxuICAgID4ge1xyXG4gICAgcmV0dXJuIHRoaXMud2FybmluZ1NlcnZpY2Uud2FybmluZ0dyb3VwSW5NYXBWaWV3T2JzZXJ2YWJsZSQucGlwZShcclxuICAgICAgbWFwKCh2YWwpID0+XHJcbiAgICAgICAgdGhpcy5tYXBUb1ZpcnR1YWxTY3JvbGxJdGVtKFxyXG4gICAgICAgICAgdmFsLmJ1ZmZlci5maWx0ZXIoKHdnKSA9PiB3Zy5oYXNBbnlXYXJuaW5ncygpKSxcclxuICAgICAgICAgICdXQVJOSU5HX0xJU1QuT1RIRVJfUkVMRVZBTlQnXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBbGxXYXJuaW5ncyhcclxuICAgIGN1cnJlbnRHZW9IYXphcmQ6IEdlb0hhemFyZFtdXHJcbiAgKTogT2JzZXJ2YWJsZTxJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPltdPiB7XHJcbiAgICBpZiAoY3VycmVudEdlb0hhemFyZFswXSA9PT0gR2VvSGF6YXJkLlNub3cpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U25vd1JlZ2lvbldhcm5pbmdzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy53YXJuaW5nU2VydmljZS53YXJuaW5nc0ZvckN1cnJlbnRHZW9IYXphcmRPYnNlcnZhYmxlJC5waXBlKFxyXG4gICAgICAgIG1hcCgod2c6IFdhcm5pbmdHcm91cFtdKSA9PlxyXG4gICAgICAgICAgdGhpcy5tYXBUb1ZpcnR1YWxTY3JvbGxJdGVtKHdnLCAnV0FSTklOR19MSVNULkFMTF9XQVJOSU5HUycpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTbm93UmVnaW9uV2FybmluZ3MoKTogT2JzZXJ2YWJsZTxcclxuICAgIElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W11cclxuICAgID4ge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLmdldEFSZWdpb25XYXJuaW5ncygpLFxyXG4gICAgICB0aGlzLmdldEJSZWdpb25XYXJuaW5ncygpXHJcbiAgICBdKS5waXBlKG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QVJlZ2lvbldhcm5pbmdzKCk6IE9ic2VydmFibGU8SVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD5bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMud2FybmluZ1NlcnZpY2Uud2FybmluZ3NGb3JDdXJyZW50R2VvSGF6YXJkT2JzZXJ2YWJsZSQucGlwZShcclxuICAgICAgbWFwKCh3ZzogV2FybmluZ0dyb3VwW10pID0+XHJcbiAgICAgICAgdGhpcy5tYXBUb1ZpcnR1YWxTY3JvbGxJdGVtKFxyXG4gICAgICAgICAgd2cuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmdyb3VwVHlwZSA9PT0gJ0EnKSxcclxuICAgICAgICAgICdXQVJOSU5HX0xJU1QuQV9SRUdJT05TJ1xyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QlJlZ2lvbldhcm5pbmdzKCk6IE9ic2VydmFibGU8SVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD5bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMud2FybmluZ1NlcnZpY2Uud2FybmluZ3NGb3JDdXJyZW50R2VvSGF6YXJkT2JzZXJ2YWJsZSQucGlwZShcclxuICAgICAgbWFwKCh3ZzogV2FybmluZ0dyb3VwW10pID0+XHJcbiAgICAgICAgdGhpcy5tYXBUb1ZpcnR1YWxTY3JvbGxJdGVtKFxyXG4gICAgICAgICAgd2cuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmdyb3VwVHlwZSA9PT0gJ0InKSxcclxuICAgICAgICAgICdXQVJOSU5HX0xJU1QuQl9SRUdJT05TJyxcclxuICAgICAgICAgICdXQVJOSU5HX0xJU1QuQl9SRUdJT05TX1NVQlRJVExFJ1xyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RmF2b3VyaXRlc09ic2VydmFibGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy53YXJuaW5nU2VydmljZS5nZXRXYXJuaW5nR3JvdXBGYXZvdXJpdGVzT2JzZXJ2YWJsZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMubm9GYXZvdXJpdGVzID0gdmFsLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSksXHJcbiAgICAgIG1hcCgod2FybmluZ0dyb3VwcykgPT5cclxuICAgICAgICB0aGlzLm1hcFRvVmlydHVhbFNjcm9sbEl0ZW0od2FybmluZ0dyb3VwcywgJ1dBUk5JTkdfTElTVC5GQVZPVVJJVEVTJylcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG15SGVhZGVyRm4oXHJcbiAgICBpdGVtOiBJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPixcclxuICAgIGluZGV4OiBudW1iZXIsXHJcbiAgICBpdGVtczogSVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD5bXVxyXG4gICkge1xyXG4gICAgcmV0dXJuIGl0ZW0uaGVhZGVyXHJcbiAgICAgID8ge1xyXG4gICAgICAgIGhlYWRlcjogaXRlbS5oZWFkZXIsXHJcbiAgICAgICAgaW5mb1RleHQ6IGl0ZW0uaW5mb1RleHQsXHJcbiAgICAgICAgc2hvd0RheU5hbWVzOiBpdGVtcy5zb21lKFxyXG4gICAgICAgICAgKHgpID0+IHguaXRlbS5rZXkuZ2VvSGF6YXJkICE9PSBHZW9IYXphcmQuSWNlXHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICAgIDogbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9vdGVyRm4oXHJcbiAgICBpdGVtOiBJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPixcclxuICAgIGluZGV4OiBudW1iZXIsXHJcbiAgICBpdGVtczogSVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD5bXVxyXG4gICkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgIT09ICdpbk1hcFZpZXcnICYmIGluZGV4ID09PSBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHJldHVybiAnZm9vdGVyJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYWNrQnlJbnRlcm5hbChfLCBpdGVtOiBJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPikge1xyXG4gICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5pdGVtID8gaXRlbS5pdGVtLmdldEtleUFzU3RyaW5nKCkgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgdGhpcy5jbG9zZUFsbE9wZW4oKTtcclxuICAgIHRoaXMubmdEZXN0cm95U3ViamVjdC5uZXh0KCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveVN1YmplY3QuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIG9uU2VnbWVudENoYW5nZSgpIHtcclxuICAgIHRoaXMuc2VnbWVudFBhZ2VTdWJqZWN0Lm5leHQodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgfVxyXG59XHJcbiJdfQ==