(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_tabs_tabs_module_ts"],{

/***/ 73008:
/*!******************************************************************************!*\
  !*** ./node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
 * Leaflet.markercluster 1.5.1+master.01e74ec,
 * Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 * https://github.com/Leaflet/Leaflet.markercluster
 * (c) 2012-2017, Dave Leaver, smartrak
 */
(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, function (exports) { 'use strict';

	/*
	 * L.MarkerClusterGroup extends L.FeatureGroup by clustering the markers contained within
	 */

	var MarkerClusterGroup = L.MarkerClusterGroup = L.FeatureGroup.extend({

		options: {
			maxClusterRadius: 80, //A cluster will cover at most this many pixels from its center
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
			spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0.5 },

			// When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
			chunkedLoading: false,
			chunkInterval: 200, // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
			chunkDelay: 50, // at the end of each interval, give n milliseconds back to system/browser
			chunkProgress: null, // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)

			//Options to pass to the L.Polygon constructor
			polygonOptions: {}
		},

		initialize: function (options) {
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
				'dragend': this._childMarkerDragEnd,
			};

			// Hook the appropriate animation methods.
			var animate = L.DomUtil.TRANSITION && this.options.animate;
			L.extend(this, animate ? this._withAnimation : this._noAnimation);
			// Remember which MarkerCluster class to instantiate (animated or not).
			this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated;
		},

		addLayer: function (layer) {

			if (layer instanceof L.LayerGroup) {
				return this.addLayers([layer]);
			}

			//Don't cluster non point data
			if (!layer.getLatLng) {
				this._nonPointGroup.addLayer(layer);
				this.fire('layeradd', { layer: layer });
				return this;
			}

			if (!this._map) {
				this._needsClustering.push(layer);
				this.fire('layeradd', { layer: layer });
				return this;
			}

			if (this.hasLayer(layer)) {
				return this;
			}


			//If we have already clustered we'll need to add this one to a cluster

			if (this._unspiderfy) {
				this._unspiderfy();
			}

			this._addLayer(layer, this._maxZoom);
			this.fire('layeradd', { layer: layer });

			// Refresh bounds and weighted positions.
			this._topClusterLevel._recalculateBounds();

			this._refreshClustersIcons();

			//Work out what is visible
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

		removeLayer: function (layer) {

			if (layer instanceof L.LayerGroup) {
				return this.removeLayers([layer]);
			}

			//Non point layers
			if (!layer.getLatLng) {
				this._nonPointGroup.removeLayer(layer);
				this.fire('layerremove', { layer: layer });
				return this;
			}

			if (!this._map) {
				if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
					this._needsRemoving.push({ layer: layer, latlng: layer._latlng });
				}
				this.fire('layerremove', { layer: layer });
				return this;
			}

			if (!layer.__parent) {
				return this;
			}

			if (this._unspiderfy) {
				this._unspiderfy();
				this._unspiderfyLayer(layer);
			}

			//Remove the marker from clusters
			this._removeLayer(layer, true);
			this.fire('layerremove', { layer: layer });

			// Refresh bounds and weighted positions.
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
		addLayers: function (layersArray, skipLayerAddEvent) {
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
				var started = (new Date()).getTime();
				var process = L.bind(function () {
					var start = (new Date()).getTime();

					// Make sure to unspiderfy before starting to add some layers
					if (this._map && this._unspiderfy) {
						this._unspiderfy();
					}

					for (; offset < l; offset++) {
						if (chunked && offset % 200 === 0) {
							// every couple hundred markers, instrument the time elapsed since processing started:
							var elapsed = (new Date()).getTime() - start;
							if (elapsed > chunkInterval) {
								break; // been working too hard, time to take a break :-)
							}
						}

						m = layersArray[offset];

						// Group of layers, append children to layersArray and skip.
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
						}

						//Not point data, can't be clustered
						if (!m.getLatLng) {
							npg.addLayer(m);
							if (!skipLayerAddEvent) {
								this.fire('layeradd', { layer: m });
							}
							continue;
						}

						if (this.hasLayer(m)) {
							continue;
						}

						this._addLayer(m, this._maxZoom);
						if (!skipLayerAddEvent) {
							this.fire('layeradd', { layer: m });
						}

						//If we just made a cluster of size 2 then we need to remove the other marker from the map (if it is) or we never will
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
						chunkProgress(offset, l, (new Date()).getTime() - started);
					}

					// Completed processing all markers.
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
					m = layersArray[offset];

					// Group of layers, append children to layersArray and skip.
					if (m instanceof L.LayerGroup) {
						if (originalArray) {
							layersArray = layersArray.slice();
							originalArray = false;
						}
						this._extractNonGroupLayers(m, layersArray);
						l = layersArray.length;
						continue;
					}

					//Not point data, can't be clustered
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
		removeLayers: function (layersArray) {
			var i, m,
			    l = layersArray.length,
			    fg = this._featureGroup,
			    npg = this._nonPointGroup,
			    originalArray = true;

			if (!this._map) {
				for (i = 0; i < l; i++) {
					m = layersArray[i];

					// Group of layers, append children to layersArray and skip.
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
						this._needsRemoving.push({ layer: m, latlng: m._latlng });
					}
					this.fire('layerremove', { layer: m });
				}
				return this;
			}

			if (this._unspiderfy) {
				this._unspiderfy();

				// Work on a copy of the array, so that next loop is not affected.
				var layersArray2 = layersArray.slice(),
				    l2 = l;
				for (i = 0; i < l2; i++) {
					m = layersArray2[i];

					// Group of layers, append children to layersArray and skip.
					if (m instanceof L.LayerGroup) {
						this._extractNonGroupLayers(m, layersArray2);
						l2 = layersArray2.length;
						continue;
					}

					this._unspiderfyLayer(m);
				}
			}

			for (i = 0; i < l; i++) {
				m = layersArray[i];

				// Group of layers, append children to layersArray and skip.
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
					this.fire('layerremove', { layer: m });
					continue;
				}

				this._removeLayer(m, true, true);
				this.fire('layerremove', { layer: m });

				if (fg.hasLayer(m)) {
					fg.removeLayer(m);
					if (m.clusterShow) {
						m.clusterShow();
					}
				}
			}

			// Refresh bounds and weighted positions.
			this._topClusterLevel._recalculateBounds();

			this._refreshClustersIcons();

			//Fix up the clusters and markers on the map
			this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);

			return this;
		},

		//Removes all layers from the MarkerClusterGroup
		clearLayers: function () {
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
			}

			//Remove all the visible layers
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
		getBounds: function () {
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
		eachLayer: function (method, context) {
			var markers = this._needsClustering.slice(),
				needsRemoving = this._needsRemoving,
				thisNeedsRemoving, i, j;

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
		getLayers: function () {
			var layers = [];
			this.eachLayer(function (l) {
				layers.push(l);
			});
			return layers;
		},

		//Overrides LayerGroup.getLayer, WARNING: Really bad performance
		getLayer: function (id) {
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
		hasLayer: function (layer) {
			if (!layer) {
				return false;
			}

			var i, anArray = this._needsClustering;

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
		zoomToShowLayer: function (layer, callback) {

			var map = this._map;

			if (typeof callback !== 'function') {
				callback = function () {};
			}

			var showMarker = function () {
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
		onAdd: function (map) {
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

			this._maxLat = map.options.crs.projection.MAX_LATITUDE;

			//Restore all the positions as they are in the MCG before removing them
			for (i = 0, l = this._needsRemoving.length; i < l; i++) {
				layer = this._needsRemoving[i];
				layer.newlatlng = layer.layer._latlng;
				layer.layer._latlng = layer.latlng;
			}
			//Remove them, then restore their new positions
			for (i = 0, l = this._needsRemoving.length; i < l; i++) {
				layer = this._needsRemoving[i];
				this._removeLayer(layer.layer, true);
				layer.layer._latlng = layer.newlatlng;
			}
			this._needsRemoving = [];

			//Remember the current zoom level and bounds
			this._zoom = Math.round(this._map._zoom);
			this._currentShownBounds = this._getExpandedVisibleBounds();

			this._map.on('zoomend', this._zoomEnd, this);
			this._map.on('moveend', this._moveEnd, this);

			if (this._spiderfierOnAdd) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
				this._spiderfierOnAdd();
			}

			this._bindEvents();

			//Actually add our markers to the map:
			l = this._needsClustering;
			this._needsClustering = [];
			this.addLayers(l, true);
		},

		//Overrides FeatureGroup.onRemove
		onRemove: function (map) {
			map.off('zoomend', this._zoomEnd, this);
			map.off('moveend', this._moveEnd, this);

			this._unbindEvents();

			//In case we are in a cluster animation
			this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');

			if (this._spiderfierOnRemove) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
				this._spiderfierOnRemove();
			}

			delete this._maxLat;

			//Clean up all the layers we added to the map
			this._hideCoverage();
			this._featureGroup.remove();
			this._nonPointGroup.remove();

			this._featureGroup.clearLayers();

			this._map = null;
		},

		getVisibleParent: function (marker) {
			var vMarker = marker;
			while (vMarker && !vMarker._icon) {
				vMarker = vMarker.__parent;
			}
			return vMarker || null;
		},

		//Remove the given object from the given array
		_arraySplice: function (anArray, obj) {
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
		_removeFromGridUnclustered: function (marker, z) {
			var map = this._map,
			    gridUnclustered = this._gridUnclustered,
				minZoom = Math.floor(this._map.getMinZoom());

			for (; z >= minZoom; z--) {
				if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) {
					break;
				}
			}
		},

		_childMarkerDragStart: function (e) {
			e.target.__dragStart = e.target._latlng;
		},

		_childMarkerMoved: function (e) {
			if (!this._ignoreMove && !e.target.__dragStart) {
				var isPopupOpen = e.target._popup && e.target._popup.isOpen();

				this._moveChild(e.target, e.oldLatLng, e.latlng);

				if (isPopupOpen) {
					e.target.openPopup();
				}
			}
		},

		_moveChild: function (layer, from, to) {
			layer._latlng = from;
			this.removeLayer(layer);

			layer._latlng = to;
			this.addLayer(layer);
		},

		_childMarkerDragEnd: function (e) {
			var dragStart = e.target.__dragStart;
			delete e.target.__dragStart;
			if (dragStart) {
				this._moveChild(e.target, dragStart, e.target._latlng);
			}		
		},


		//Internal function for removing a marker from everything.
		//dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
		_removeLayer: function (marker, removeFromDistanceGrid, dontUpdateMap) {
			var gridClusters = this._gridClusters,
				gridUnclustered = this._gridUnclustered,
				fg = this._featureGroup,
				map = this._map,
				minZoom = Math.floor(this._map.getMinZoom());

			//Remove the marker from distance clusters it might be in
			if (removeFromDistanceGrid) {
				this._removeFromGridUnclustered(marker, this._maxZoom);
			}

			//Work our way up the clusters removing them as we go if required
			var cluster = marker.__parent,
				markers = cluster._markers,
				otherMarker;

			//Remove the marker from the immediate parents marker list
			this._arraySplice(markers, marker);

			while (cluster) {
				cluster._childCount--;
				cluster._boundsNeedUpdate = true;

				if (cluster._zoom < minZoom) {
					//Top level, do nothing
					break;
				} else if (removeFromDistanceGrid && cluster._childCount <= 1) { //Cluster no longer required
					//We need to push the other marker up to the parent
					otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0];

					//Update distance grid
					gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom));
					gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom));

					//Move otherMarker up to parent
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

		_isOrIsParent: function (el, oel) {
			while (oel) {
				if (el === oel) {
					return true;
				}
				oel = oel.parentNode;
			}
			return false;
		},

		//Override L.Evented.fire
		fire: function (type, data, propagate) {
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
		listens: function (type, propagate) {
			return L.FeatureGroup.prototype.listens.call(this, type, propagate) || L.FeatureGroup.prototype.listens.call(this, 'cluster' + type, propagate);
		},

		//Default functionality
		_defaultIconCreateFunction: function (cluster) {
			var childCount = cluster.getChildCount();

			var c = ' marker-cluster-';
			if (childCount < 10) {
				c += 'small';
			} else if (childCount < 100) {
				c += 'medium';
			} else {
				c += 'large';
			}

			return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
		},

		_bindEvents: function () {
			var map = this._map,
			    spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
			    showCoverageOnHover = this.options.showCoverageOnHover,
			    zoomToBoundsOnClick = this.options.zoomToBoundsOnClick;

			//Zoom on cluster click or spiderfy if we are at the lowest level
			if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
				this.on('clusterclick clusterkeypress', this._zoomOrSpiderfy, this);
			}

			//Show convex hull (boundary) polygon on mouse over
			if (showCoverageOnHover) {
				this.on('clustermouseover', this._showCoverage, this);
				this.on('clustermouseout', this._hideCoverage, this);
				map.on('zoomend', this._hideCoverage, this);
			}
		},

		_zoomOrSpiderfy: function (e) {
			var cluster = e.layer,
			    bottomCluster = cluster;

			if (e.type === 'clusterkeypress' && e.originalEvent && e.originalEvent.keyCode !== 13) {
				return;
			}

			while (bottomCluster._childClusters.length === 1) {
				bottomCluster = bottomCluster._childClusters[0];
			}

			if (bottomCluster._zoom === this._maxZoom &&
				bottomCluster._childCount === cluster._childCount &&
				this.options.spiderfyOnMaxZoom) {

				// All child markers are contained in a single cluster from this._maxZoom to this cluster.
				cluster.spiderfy();
			} else if (this.options.zoomToBoundsOnClick) {
				cluster.zoomToBounds();
			}

			// Focus the map again for keyboard users.
			if (e.originalEvent && e.originalEvent.keyCode === 13) {
				this._map._container.focus();
			}
		},

		_showCoverage: function (e) {
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

		_hideCoverage: function () {
			if (this._shownPolygon) {
				this._map.removeLayer(this._shownPolygon);
				this._shownPolygon = null;
			}
		},

		_unbindEvents: function () {
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

		_zoomEnd: function () {
			if (!this._map) { //May have been removed from the map by a zoomEnd handler
				return;
			}
			this._mergeSplitClusters();

			this._zoom = Math.round(this._map._zoom);
			this._currentShownBounds = this._getExpandedVisibleBounds();
		},

		_moveEnd: function () {
			if (this._inZoomAnimation) {
				return;
			}

			var newBounds = this._getExpandedVisibleBounds();

			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, newBounds);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), newBounds);

			this._currentShownBounds = newBounds;
			return;
		},

		_generateInitialClusters: function () {
			var maxZoom = Math.ceil(this._map.getMaxZoom()),
				minZoom = Math.floor(this._map.getMinZoom()),
				radius = this.options.maxClusterRadius,
				radiusFn = radius;

			//If we just set maxClusterRadius to a single number, we need to create
			//a simple function to return that number. Otherwise, we just have to
			//use the function we've passed in.
			if (typeof radius !== "function") {
				radiusFn = function () { return radius; };
			}

			if (this.options.disableClusteringAtZoom !== null) {
				maxZoom = this.options.disableClusteringAtZoom - 1;
			}
			this._maxZoom = maxZoom;
			this._gridClusters = {};
			this._gridUnclustered = {};

			//Set up DistanceGrids for each zoom
			for (var zoom = maxZoom; zoom >= minZoom; zoom--) {
				this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom));
				this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom));
			}

			// Instantiate the appropriate L.MarkerCluster class (animated or not).
			this._topClusterLevel = new this._markerCluster(this, minZoom - 1);
		},

		//Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
		_addLayer: function (layer, zoom) {
			var gridClusters = this._gridClusters,
			    gridUnclustered = this._gridUnclustered,
				minZoom = Math.floor(this._map.getMinZoom()),
			    markerPoint, z;

			if (this.options.singleMarkerMode) {
				this._overrideMarkerIcon(layer);
			}

			layer.on(this._childMarkerEventHandlers, this);

			//Find the lowest zoom level to slot this one in
			for (; zoom >= minZoom; zoom--) {
				markerPoint = this._map.project(layer.getLatLng(), zoom); // calculate pixel position

				//Try find a cluster close by
				var closest = gridClusters[zoom].getNearObject(markerPoint);
				if (closest) {
					closest._addChild(layer);
					layer.__parent = closest;
					return;
				}

				//Try find a marker close by to form a new cluster with
				closest = gridUnclustered[zoom].getNearObject(markerPoint);
				if (closest) {
					var parent = closest.__parent;
					if (parent) {
						this._removeLayer(closest, false);
					}

					//Create new cluster with these 2 in it

					var newCluster = new this._markerCluster(this, zoom, closest, layer);
					gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom));
					closest.__parent = newCluster;
					layer.__parent = newCluster;

					//First create any new intermediate parent clusters that don't exist
					var lastParent = newCluster;
					for (z = zoom - 1; z > parent._zoom; z--) {
						lastParent = new this._markerCluster(this, z, lastParent);
						gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z));
					}
					parent._addChild(lastParent);

					//Remove closest from this zoom level and any above that it is in, replace with newCluster
					this._removeFromGridUnclustered(closest, zoom);

					return;
				}

				//Didn't manage to cluster in at this zoom, record us as a marker here and continue upwards
				gridUnclustered[zoom].addObject(layer, markerPoint);
			}

			//Didn't get in anything, add us to the top
			this._topClusterLevel._addChild(layer);
			layer.__parent = this._topClusterLevel;
			return;
		},

		/**
		 * Refreshes the icon of all "dirty" visible clusters.
		 * Non-visible "dirty" clusters will be updated when they are added to the map.
		 * @private
		 */
		_refreshClustersIcons: function () {
			this._featureGroup.eachLayer(function (c) {
				if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
					c._updateIcon();
				}
			});
		},

		//Enqueue code to fire after the marker expand/contract has happened
		_enqueue: function (fn) {
			this._queue.push(fn);
			if (!this._queueTimeout) {
				this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300);
			}
		},
		_processQueue: function () {
			for (var i = 0; i < this._queue.length; i++) {
				this._queue[i].call(this);
			}
			this._queue.length = 0;
			clearTimeout(this._queueTimeout);
			this._queueTimeout = null;
		},

		//Merge and split any existing clusters that are too big or small
		_mergeSplitClusters: function () {
			var mapZoom = Math.round(this._map._zoom);

			//In case we are starting to split before the animation finished
			this._processQueue();

			if (this._zoom < mapZoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) { //Zoom in, split
				this._animationStart();
				//Remove clusters now off screen
				this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds());

				this._animationZoomIn(this._zoom, mapZoom);

			} else if (this._zoom > mapZoom) { //Zoom out, merge
				this._animationStart();

				this._animationZoomOut(this._zoom, mapZoom);
			} else {
				this._moveEnd();
			}
		},

		//Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
		_getExpandedVisibleBounds: function () {
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
		_checkBoundsMaxLat: function (bounds) {
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
		_animationAddLayerNonAnimated: function (layer, newCluster) {
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
		_extractNonGroupLayers: function (group, output) {
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
		_overrideMarkerIcon: function (layer) {
			var icon = layer.options.icon = this.options.iconCreateFunction({
				getChildCount: function () {
					return 1;
				},
				getAllChildMarkers: function () {
					return [layer];
				}
			});

			return icon;
		}
	});

	// Constant bounds used in case option "removeOutsideVisibleBounds" is set to false.
	L.MarkerClusterGroup.include({
		_mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity))
	});

	L.MarkerClusterGroup.include({
		_noAnimation: {
			//Non Animated versions of everything
			_animationStart: function () {
				//Do nothing...
			},
			_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
				this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);
				this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

				//We didn't actually animate, but we use this event to mean "clustering animations have finished"
				this.fire('animationend');
			},
			_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
				this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);
				this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

				//We didn't actually animate, but we use this event to mean "clustering animations have finished"
				this.fire('animationend');
			},
			_animationAddLayer: function (layer, newCluster) {
				this._animationAddLayerNonAnimated(layer, newCluster);
			}
		},

		_withAnimation: {
			//Animated versions here
			_animationStart: function () {
				this._map._mapPane.className += ' leaflet-cluster-anim';
				this._inZoomAnimation++;
			},

			_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
				var bounds = this._getExpandedVisibleBounds(),
				    fg = this._featureGroup,
					minZoom = Math.floor(this._map.getMinZoom()),
				    i;

				this._ignoreMove = true;

				//Add all children of current clusters to map and remove those clusters from map
				this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function (c) {
					var startPos = c._latlng,
					    markers  = c._markers,
					    m;

					if (!bounds.contains(startPos)) {
						startPos = null;
					}

					if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) { //Immediately add the new child and remove us
						fg.removeLayer(c);
						c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
					} else {
						//Fade out old cluster
						c.clusterHide();
						c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
					}

					//Remove all markers that aren't visible any more
					//TODO: Do we actually need to do this on the higher levels too?
					for (i = markers.length - 1; i >= 0; i--) {
						m = markers[i];
						if (!bounds.contains(m._latlng)) {
							fg.removeLayer(m);
						}
					}

				});

				this._forceLayout();

				//Update opacities
				this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel);
				//TODO Maybe? Update markers in _recursivelyBecomeVisible
				fg.eachLayer(function (n) {
					if (!(n instanceof L.MarkerCluster) && n._icon) {
						n.clusterShow();
					}
				});

				//update the positions of the just added clusters/markers
				this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function (c) {
					c._recursivelyRestoreChildPositions(newZoomLevel);
				});

				this._ignoreMove = false;

				//Remove the old clusters and close the zoom animation
				this._enqueue(function () {
					//update the positions of the just added clusters/markers
					this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function (c) {
						fg.removeLayer(c);
						c.clusterShow();
					});

					this._animationEnd();
				});
			},

			_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
				this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel);

				//Need to add markers for those that weren't on the map before but are now
				this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
				//Remove markers that were on the map before but won't be now
				this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel, this._getExpandedVisibleBounds());
			},

			_animationAddLayer: function (layer, newCluster) {
				var me = this,
				    fg = this._featureGroup;

				fg.addLayer(layer);
				if (newCluster !== layer) {
					if (newCluster._childCount > 2) { //Was already a cluster

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

					} else { //Just became a cluster
						this._forceLayout();

						me._animationStart();
						me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._zoom);
					}
				}
			}
		},

		// Private methods for animated versions.
		_animationZoomOutSingle: function (cluster, previousZoomLevel, newZoomLevel) {
			var bounds = this._getExpandedVisibleBounds(),
				minZoom = Math.floor(this._map.getMinZoom());

			//Animate all of the markers in the clusters to move to their cluster center point
			cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, minZoom, previousZoomLevel + 1, newZoomLevel);

			var me = this;

			//Update the opacity (If we immediately set it they won't animate)
			this._forceLayout();
			cluster._recursivelyBecomeVisible(bounds, newZoomLevel);

			//TODO: Maybe use the transition timing stuff to make this more reliable
			//When the animations are done, tidy up
			this._enqueue(function () {

				//This cluster stopped being a cluster before the timeout fired
				if (cluster._childCount === 1) {
					var m = cluster._markers[0];
					//If we were in a cluster animation at the time then the opacity and position of our child could be wrong now, so fix it
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

		_animationEnd: function () {
			if (this._map) {
				this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');
			}
			this._inZoomAnimation--;
			this.fire('animationend');
		},

		//Force a browser layout of stuff in the map
		// Should apply the current opacity and location to all elements so we can update them again for an animation
		_forceLayout: function () {
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

		initialize: function (group, zoom, a, b) {

			L.Marker.prototype.initialize.call(this, a ? (a._cLatLng || a.getLatLng()) : new L.LatLng(0, 0),
	            { icon: this, pane: group.options.clusterPane });

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
		getAllChildMarkers: function (storageArray, ignoreDraggedMarker) {
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
		getChildCount: function () {
			return this._childCount;
		},

		//Zoom to the minimum of showing all of the child markers, or the extents of this cluster
		zoomToBounds: function (fitBoundsOptions) {
			var childClusters = this._childClusters.slice(),
				map = this._group._map,
				boundsZoom = map.getBoundsZoom(this._bounds),
				zoom = this._zoom + 1,
				mapZoom = map.getZoom(),
				i;

			//calculate how far we need to zoom down to see all of the markers
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
			} else if (boundsZoom <= mapZoom) { //If fitBounds wouldn't zoom us down, zoom us down instead
				this._group._map.setView(this._latlng, mapZoom + 1);
			} else {
				this._group._map.fitBounds(this._bounds, fitBoundsOptions);
			}
		},

		getBounds: function () {
			var bounds = new L.LatLngBounds();
			bounds.extend(this._bounds);
			return bounds;
		},

		_updateIcon: function () {
			this._iconNeedsUpdate = true;
			if (this._icon) {
				this.setIcon(this);
			}
		},

		//Cludge for Icon, we pretend to be an icon for performance
		createIcon: function () {
			if (this._iconNeedsUpdate) {
				this._iconObj = this._group.options.iconCreateFunction(this);
				this._iconNeedsUpdate = false;
			}
			return this._iconObj.createIcon();
		},
		createShadow: function () {
			return this._iconObj.createShadow();
		},


		_addChild: function (new1, isNotificationFromChild) {

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
		_setClusterCenter: function (child) {
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
		_resetBounds: function () {
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

		_recalculateBounds: function () {
			var markers = this._markers,
			    childClusters = this._childClusters,
			    latSum = 0,
			    lngSum = 0,
			    totalCount = this._childCount,
			    i, child, childLatLng, childCount;

			// Case where all markers are removed from the map and we are left with just an empty _topClusterLevel.
			if (totalCount === 0) {
				return;
			}

			// Reset rather than creating a new object, for performance.
			this._resetBounds();

			// Child markers.
			for (i = 0; i < markers.length; i++) {
				childLatLng = markers[i]._latlng;

				this._bounds.extend(childLatLng);

				latSum += childLatLng.lat;
				lngSum += childLatLng.lng;
			}

			// Child clusters.
			for (i = 0; i < childClusters.length; i++) {
				child = childClusters[i];

				// Re-compute child bounds and weighted position first if necessary.
				if (child._boundsNeedUpdate) {
					child._recalculateBounds();
				}

				this._bounds.extend(child._bounds);

				childLatLng = child._wLatLng;
				childCount = child._childCount;

				latSum += childLatLng.lat * childCount;
				lngSum += childLatLng.lng * childCount;
			}

			this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount);

			// Reset dirty flag.
			this._boundsNeedUpdate = false;
		},

		//Set our markers position as given and add it to the map
		_addToMap: function (startPos) {
			if (startPos) {
				this._backupLatlng = this._latlng;
				this.setLatLng(startPos);
			}
			this._group._featureGroup.addLayer(this);
		},

		_recursivelyAnimateChildrenIn: function (bounds, center, maxZoom) {
			this._recursively(bounds, this._group._map.getMinZoom(), maxZoom - 1,
				function (c) {
					var markers = c._markers,
						i, m;
					for (i = markers.length - 1; i >= 0; i--) {
						m = markers[i];

						//Only do it if the icon is still on the map
						if (m._icon) {
							m._setPos(center);
							m.clusterHide();
						}
					}
				},
				function (c) {
					var childClusters = c._childClusters,
						j, cm;
					for (j = childClusters.length - 1; j >= 0; j--) {
						cm = childClusters[j];
						if (cm._icon) {
							cm._setPos(center);
							cm.clusterHide();
						}
					}
				}
			);
		},

		_recursivelyAnimateChildrenInAndAddSelfToMap: function (bounds, mapMinZoom, previousZoomLevel, newZoomLevel) {
			this._recursively(bounds, newZoomLevel, mapMinZoom,
				function (c) {
					c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel);

					//TODO: depthToAnimateIn affects _isSingleParent, if there is a multizoom we may/may not be.
					//As a hack we only do a animation free zoom on a single level zoom, if someone does multiple levels then we always animate
					if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
						c.clusterShow();
						c._recursivelyRemoveChildrenFromMap(bounds, mapMinZoom, previousZoomLevel); //Immediately remove our children as we are replacing them. TODO previousBounds not bounds
					} else {
						c.clusterHide();
					}

					c._addToMap();
				}
			);
		},

		_recursivelyBecomeVisible: function (bounds, zoomLevel) {
			this._recursively(bounds, this._group._map.getMinZoom(), zoomLevel, null, function (c) {
				c.clusterShow();
			});
		},

		_recursivelyAddChildrenToMap: function (startPos, zoomLevel, bounds) {
			this._recursively(bounds, this._group._map.getMinZoom() - 1, zoomLevel,
				function (c) {
					if (zoomLevel === c._zoom) {
						return;
					}

					//Add our child markers at startPos (so they can be animated out)
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
				},
				function (c) {
					c._addToMap(startPos);
				}
			);
		},

		_recursivelyRestoreChildPositions: function (zoomLevel) {
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

		_restorePosition: function () {
			if (this._backupLatlng) {
				this.setLatLng(this._backupLatlng);
				delete this._backupLatlng;
			}
		},

		//exceptBounds: If set, don't remove any markers/clusters in it
		_recursivelyRemoveChildrenFromMap: function (previousBounds, mapMinZoom, zoomLevel, exceptBounds) {
			var m, i;
			this._recursively(previousBounds, mapMinZoom - 1, zoomLevel - 1,
				function (c) {
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
				},
				function (c) {
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
				}
			);
		},

		//Run the given functions recursively to this and child clusters
		// boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
		// zoomLevelToStart: zoom level to start running functions (inclusive)
		// zoomLevelToStop: zoom level to stop running functions (inclusive)
		// runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
		// runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
		_recursively: function (boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
			var childClusters = this._childClusters,
			    zoom = this._zoom,
			    i, c;

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
		_isSingleParent: function () {
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
		clusterHide: function () {
			var backup = this.options.opacity;
			this.setOpacity(0);
			this.options.opacity = backup;
			return this;
		},
		
		clusterShow: function () {
			return this.setOpacity(this.options.opacity);
		}
	});

	L.DistanceGrid = function (cellSize) {
		this._cellSize = cellSize;
		this._sqCellSize = cellSize * cellSize;
		this._grid = {};
		this._objectPoint = { };
	};

	L.DistanceGrid.prototype = {

		addObject: function (obj, point) {
			var x = this._getCoord(point.x),
			    y = this._getCoord(point.y),
			    grid = this._grid,
			    row = grid[y] = grid[y] || {},
			    cell = row[x] = row[x] || [],
			    stamp = L.Util.stamp(obj);

			this._objectPoint[stamp] = point;

			cell.push(obj);
		},

		updateObject: function (obj, point) {
			this.removeObject(obj);
			this.addObject(obj, point);
		},

		//Returns true if the object was found
		removeObject: function (obj, point) {
			var x = this._getCoord(point.x),
			    y = this._getCoord(point.y),
			    grid = this._grid,
			    row = grid[y] = grid[y] || {},
			    cell = row[x] = row[x] || [],
			    i, len;

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

		eachObject: function (fn, context) {
			var i, j, k, len, row, cell, removed,
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

		getNearObject: function (point) {
			var x = this._getCoord(point.x),
			    y = this._getCoord(point.y),
			    i, j, k, row, cell, len, obj, dist,
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
								if (dist < closestDistSq ||
									dist <= closestDistSq && closest === null) {
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

		_getCoord: function (x) {
			var coord = Math.floor(x / this._cellSize);
			return isFinite(coord) ? coord : x;
		},

		_sqDist: function (p, p2) {
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
			getDistant: function (cpt, bl) {
				var vY = bl[1].lat - bl[0].lat,
					vX = bl[0].lng - bl[1].lng;
				return (vX * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng));
			},

			/*
			 * @param {Array} baseLine a two-element array of latlng objects
			 *   representing the baseline to project from
			 * @param {Array} latLngs an array of latlng objects
			 * @returns {Object} the maximum point and all new points to stay
			 *   in consideration for the hull.
			 */
			findMostDistantPointFromBaseLine: function (baseLine, latLngs) {
				var maxD = 0,
					maxPt = null,
					newPoints = [],
					i, pt, d;

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

				return { maxPoint: maxPt, newPoints: newPoints };
			},


			/*
			 * Given a baseline, compute the convex hull of latLngs as an array
			 * of latLngs.
			 *
			 * @param {Array} latLngs
			 * @returns {Array}
			 */
			buildConvexHull: function (baseLine, latLngs) {
				var convexHullBaseLines = [],
					t = this.findMostDistantPointFromBaseLine(baseLine, latLngs);

				if (t.maxPoint) { // if there is still a point "outside" the base line
					convexHullBaseLines =
						convexHullBaseLines.concat(
							this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints)
						);
					convexHullBaseLines =
						convexHullBaseLines.concat(
							this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints)
						);
					return convexHullBaseLines;
				} else {  // if there is no more point "outside" the base line, the current base line is part of the convex hull
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
			getConvexHull: function (latLngs) {
				// find first baseline
				var maxLat = false, minLat = false,
					maxLng = false, minLng = false,
					maxLatPt = null, minLatPt = null,
					maxLngPt = null, minLngPt = null,
					maxPt = null, minPt = null,
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

				var ch = [].concat(this.buildConvexHull([minPt, maxPt], latLngs),
									this.buildConvexHull([maxPt, minPt], latLngs));
				return ch;
			}
		};
	}());

	L.MarkerCluster.include({
		getConvexHull: function () {
			var childMarkers = this.getAllChildMarkers(),
				points = [],
				p, i;

			for (i = childMarkers.length - 1; i >= 0; i--) {
				p = childMarkers[i].getLatLng();
				points.push(p);
			}

			return L.QuickHull.getConvexHull(points);
		}
	});

	//This code is 100% based on https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
	//Huge thanks to jawj for implementing it first to make my job easy :-)

	L.MarkerCluster.include({

		_2PI: Math.PI * 2,
		_circleFootSeparation: 25, //related to circumference of circle
		_circleStartAngle: 0,

		_spiralFootSeparation:  28, //related to size of spiral (experiment!)
		_spiralLengthStart: 11,
		_spiralLengthFactor: 5,

		_circleSpiralSwitchover: 9, //show spiral instead of circle from this marker count upwards.
									// 0 -> always spiral; Infinity -> always circle

		spiderfy: function () {
			if (this._group._spiderfied === this || this._group._inZoomAnimation) {
				return;
			}

			var childMarkers = this.getAllChildMarkers(null, true),
				group = this._group,
				map = group._map,
				center = map.latLngToLayerPoint(this._latlng),
				positions;

			this._group._unspiderfy();
			this._group._spiderfied = this;

			//TODO Maybe: childMarkers order by distance to center

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

		unspiderfy: function (zoomDetails) {
			/// <param Name="zoomDetails">Argument from zoomanim if being called in a zoom animation or null otherwise</param>
			if (this._group._inZoomAnimation) {
				return;
			}
			this._animationUnspiderfy(zoomDetails);

			this._group._spiderfied = null;
		},

		_generatePointsCircle: function (count, centerPt) {
			var circumference = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count),
				legLength = circumference / this._2PI,  //radius from circumference
				angleStep = this._2PI / count,
				res = [],
				i, angle;

			legLength = Math.max(legLength, 35); // Minimum distance to get outside the cluster icon.

			res.length = count;

			for (i = 0; i < count; i++) { // Clockwise, like spiral.
				angle = this._circleStartAngle + i * angleStep;
				res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
			}

			return res;
		},

		_generatePointsSpiral: function (count, centerPt) {
			var spiderfyDistanceMultiplier = this._group.options.spiderfyDistanceMultiplier,
				legLength = spiderfyDistanceMultiplier * this._spiralLengthStart,
				separation = spiderfyDistanceMultiplier * this._spiralFootSeparation,
				lengthFactor = spiderfyDistanceMultiplier * this._spiralLengthFactor * this._2PI,
				angle = 0,
				res = [],
				i;

			res.length = count;

			// Higher index, closer position to cluster center.
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

		_noanimationUnspiderfy: function () {
			var group = this._group,
				map = group._map,
				fg = group._featureGroup,
				childMarkers = this.getAllChildMarkers(null, true),
				m, i;

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
	});

	//Non Animated versions of everything
	L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
		_animationSpiderfy: function (childMarkers, positions) {
			var group = this._group,
				map = group._map,
				fg = group._featureGroup,
				legOptions = this._group.options.spiderLegPolylineOptions,
				i, m, leg, newPos;

			group._ignoreMove = true;

			// Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
			// The reverse order trick no longer improves performance on modern browsers.
			for (i = 0; i < childMarkers.length; i++) {
				newPos = map.layerPointToLatLng(positions[i]);
				m = childMarkers[i];

				// Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
				leg = new L.Polyline([this._latlng, newPos], legOptions);
				map.addLayer(leg);
				m._spiderLeg = leg;

				// Now add the marker.
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

		_animationUnspiderfy: function () {
			this._noanimationUnspiderfy();
		}
	});

	//Animated versions here
	L.MarkerCluster.include({

		_animationSpiderfy: function (childMarkers, positions) {
			var me = this,
				group = this._group,
				map = group._map,
				fg = group._featureGroup,
				thisLayerLatLng = this._latlng,
				thisLayerPos = map.latLngToLayerPoint(thisLayerLatLng),
				svg = L.Path.SVG,
				legOptions = L.extend({}, this._group.options.spiderLegPolylineOptions), // Copy the options so that we can modify them for animation.
				finalLegOpacity = legOptions.opacity,
				i, m, leg, legPath, legLength, newPos;

			if (finalLegOpacity === undefined) {
				finalLegOpacity = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity;
			}

			if (svg) {
				// If the initial opacity of the spider leg is not 0 then it appears before the animation starts.
				legOptions.opacity = 0;

				// Add the class for CSS transitions.
				legOptions.className = (legOptions.className || '') + ' leaflet-cluster-spider-leg';
			} else {
				// Make sure we have a defined opacity.
				legOptions.opacity = finalLegOpacity;
			}

			group._ignoreMove = true;

			// Add markers and spider legs to map, hidden at our center point.
			// Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
			// The reverse order trick no longer improves performance on modern browsers.
			for (i = 0; i < childMarkers.length; i++) {
				m = childMarkers[i];

				newPos = map.layerPointToLatLng(positions[i]);

				// Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
				leg = new L.Polyline([thisLayerLatLng, newPos], legOptions);
				map.addLayer(leg);
				m._spiderLeg = leg;

				// Explanations: https://jakearchibald.com/2013/animated-line-drawing-svg/
				// In our case the transition property is declared in the CSS file.
				if (svg) {
					legPath = leg._path;
					legLength = legPath.getTotalLength() + 0.1; // Need a small extra length to avoid remaining dot in Firefox.
					legPath.style.strokeDasharray = legLength; // Just 1 length is enough, it will be duplicated.
					legPath.style.strokeDashoffset = legLength;
				}

				// If it is a marker, add it now and we'll animate it out
				if (m.setZIndexOffset) {
					m.setZIndexOffset(1000000); // Make normal markers appear on top of EVERYTHING
				}
				if (m.clusterHide) {
					m.clusterHide();
				}
				
				// Vectors just get immediately added
				fg.addLayer(m);

				if (m._setPos) {
					m._setPos(thisLayerPos);
				}
			}

			group._forceLayout();
			group._animationStart();

			// Reveal markers and spider legs.
			for (i = childMarkers.length - 1; i >= 0; i--) {
				newPos = map.layerPointToLatLng(positions[i]);
				m = childMarkers[i];

				//Move marker to new position
				m._preSpiderfyLatlng = m._latlng;
				m.setLatLng(newPos);
				
				if (m.clusterShow) {
					m.clusterShow();
				}

				// Animate leg (animation is actually delegated to CSS transition).
				if (svg) {
					leg = m._spiderLeg;
					legPath = leg._path;
					legPath.style.strokeDashoffset = 0;
					//legPath.style.strokeOpacity = finalLegOpacity;
					leg.setStyle({opacity: finalLegOpacity});
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

		_animationUnspiderfy: function (zoomDetails) {
			var me = this,
				group = this._group,
				map = group._map,
				fg = group._featureGroup,
				thisLayerPos = zoomDetails ? map._latLngToNewLayerPoint(this._latlng, zoomDetails.zoom, zoomDetails.center) : map.latLngToLayerPoint(this._latlng),
				childMarkers = this.getAllChildMarkers(null, true),
				svg = L.Path.SVG,
				m, i, leg, legPath, legLength, nonAnimatable;

			group._ignoreMove = true;
			group._animationStart();

			//Make us visible and bring the child markers back in
			this.setOpacity(1);
			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];

				//Marker was added to us after we were spiderfied
				if (!m._preSpiderfyLatlng) {
					continue;
				}

				//Close any popup on the marker first, otherwise setting the location of the marker will make the map scroll
				m.closePopup();

				//Fix up the location to the real one
				m.setLatLng(m._preSpiderfyLatlng);
				delete m._preSpiderfyLatlng;

				//Hack override the location to be our center
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
				}

				// Animate the spider leg back in (animation is actually delegated to CSS transition).
				if (svg) {
					leg = m._spiderLeg;
					legPath = leg._path;
					legLength = legPath.getTotalLength() + 0.1;
					legPath.style.strokeDashoffset = legLength;
					leg.setStyle({opacity: 0});
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

					if (!m._spiderLeg) { //Has already been unspiderfied
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

		unspiderfy: function () {
			this._unspiderfy.apply(this, arguments);
		},

		_spiderfierOnAdd: function () {
			this._map.on('click', this._unspiderfyWrapper, this);

			if (this._map.options.zoomAnimation) {
				this._map.on('zoomstart', this._unspiderfyZoomStart, this);
			}
			//Browsers without zoomAnimation or a big zoom don't fire zoomstart
			this._map.on('zoomend', this._noanimationUnspiderfy, this);

			if (!L.Browser.touch) {
				this._map.getRenderer(this);
				//Needs to happen in the pageload, not after, or animations don't work in webkit
				//  http://stackoverflow.com/questions/8455200/svg-animate-with-dynamically-added-elements
				//Disable on touch browsers as the animation messes up on a touch zoom and isn't very noticable
			}
		},

		_spiderfierOnRemove: function () {
			this._map.off('click', this._unspiderfyWrapper, this);
			this._map.off('zoomstart', this._unspiderfyZoomStart, this);
			this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
			this._map.off('zoomend', this._noanimationUnspiderfy, this);

			//Ensure that markers are back where they should be
			// Use no animation to avoid a sticky leaflet-cluster-anim class on mapPane
			this._noanimationUnspiderfy();
		},

		//On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
		//This means we can define the animation they do rather than Markers doing an animation to their actual location
		_unspiderfyZoomStart: function () {
			if (!this._map) { //May have been removed from the map by a zoomEnd handler
				return;
			}

			this._map.on('zoomanim', this._unspiderfyZoomAnim, this);
		},

		_unspiderfyZoomAnim: function (zoomDetails) {
			//Wait until the first zoomanim after the user has finished touch-zooming before running the animation
			if (L.DomUtil.hasClass(this._map._mapPane, 'leaflet-touching')) {
				return;
			}

			this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
			this._unspiderfy(zoomDetails);
		},

		_unspiderfyWrapper: function () {
			/// <summary>_unspiderfy but passes no arguments</summary>
			this._unspiderfy();
		},

		_unspiderfy: function (zoomDetails) {
			if (this._spiderfied) {
				this._spiderfied.unspiderfy(zoomDetails);
			}
		},

		_noanimationUnspiderfy: function () {
			if (this._spiderfied) {
				this._spiderfied._noanimationUnspiderfy();
			}
		},

		//If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
		_unspiderfyLayer: function (layer) {
			if (layer._spiderLeg) {
				this._featureGroup.removeLayer(layer);

				if (layer.clusterShow) {
					layer.clusterShow();
				}
					//Position will be fixed up immediately in _animationUnspiderfy
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
		refreshClusters: function (layers) {
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
			this._refreshClustersIcons();

			// In case of singleMarkerMode, also re-draw the markers.
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
		_flagParentsIconsNeedUpdate: function (layers) {
			var id, parent;

			// Assumes layers is an Array or an Object whose prototype is non-enumerable.
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
		_refreshSingleMarkerModeMarkers: function (layers) {
			var id, layer;

			for (id in layers) {
				layer = layers[id];

				// Make sure we do not override markers that do not belong to THIS group.
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
		refreshIconOptions: function (options, directlyRefreshClusters) {
			var icon = this.options.icon;

			L.setOptions(icon, options);

			this.setIcon(icon);

			// Shortcut to refresh the associated MCG clusters right away.
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

	Object.defineProperty(exports, '__esModule', { value: true });

}));


/***/ }),

/***/ 50645:
/*!*****************************************************************!*\
  !*** ./src/app/components/coach-marks/coach-marks.component.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoachMarksComponent": function() { return /* binding */ CoachMarksComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 17159);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 76477);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 56913);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 52249);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/animations */ 97175);
/* harmony import */ var _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/animations/custom.animation */ 47692);
/* harmony import */ var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/shared/components/geo-fab/geo-fab.component */ 49744);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 70325);














function CoachMarksComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function CoachMarksComponent_div_0_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r1.hide(); });
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
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
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
} }
class CoachMarksComponent {
    constructor(userSettingService, ngZone) {
        this.userSettingService = userSettingService;
        this.ngZone = ngZone;
        this.isOpen = false;
        this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
        this.hideSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    }
    ngOnInit() {
        this.showCoachMarks$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.merge)(this.getShowGeoSelectObservable(), this.hideSubject).pipe((0,_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__.enterZone)(this.ngZone));
        this.getShowGeoSelectObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.filter)((val) => val), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.delay)(2000), (0,_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__.enterZone)(this.ngZone))
            .subscribe(() => {
            this.isOpen = true;
        });
    }
    getShowGeoSelectObservable() {
        return this.userSettingService.userSetting$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)((us) => us.showGeoSelectInfo), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.distinctUntilChanged)());
    }
    hide() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            this.hideSubject.next(false);
            const currentSettings = yield this.userSettingService.userSetting$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.take)(1))
                .toPromise();
            this.userSettingService.saveUserSettings(Object.assign(Object.assign({}, currentSettings), { showGeoSelectInfo: false }));
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
}
CoachMarksComponent.ɵfac = function CoachMarksComponent_Factory(t) { return new (t || CoachMarksComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone)); };
CoachMarksComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: CoachMarksComponent, selectors: [["app-coach-marks"]], decls: 2, vars: 3, consts: [["class", "coachmark-backdrop", 3, "click", 4, "ngIf"], [1, "coachmark-backdrop", 3, "click"], [3, "isOpen", "showLabels", "animateOnEnter"], [1, "geo-coachmark"], ["width", "65", "height", "76", "viewBox", "0 0 65 76", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M64 62C64 62 51.5 44.5 38.5 35.5C25.5 26.5 3 15.5 3 15.5M3 15.5L18 15.5M3 15.5L12.5 28", "stroke", "white", "stroke-width", "2"], [1, "coachmark-text"], [1, "add-coachmark"], ["width", "40", "height", "46", "viewBox", "0 0 40 46", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M1 1C1 1 1.5 17.5 12 27C22.5 36.5 37.5 42.5 37.5 42.5M37.5 42.5L29 28.5M37.5 42.5L21 44.5", "stroke", "white", "stroke-width", "2"], ["vertical", "bottom", "horizontal", "end", "slot", "fixed", 1, "add-fab"], ["name", "add"], [1, "warning-coachmark"], ["width", "90", "height", "40", "viewBox", "0 0 90 40", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M1 1.5C1 1.5 8 10 25.5 18.5C43 27 86.5 35.5 86.5 35.5M86.5 35.5L73 25.5M86.5 35.5L64.5 38.5", "stroke", "white", "stroke-width", "2"], ["tab", "home"], ["name", "map"], ["tab", "observation-list"], ["name", "list"], ["tab", "warning-list"], ["name", "warning", 1, "warning-icon"]], template: function CoachMarksComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, CoachMarksComponent_div_0_Template, 39, 26, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, ctx.showCoachMarks$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_3__.GeoFabComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonFab, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonFabButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonTabBar, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonTabButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonLabel], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe], styles: ["@font-face {\n  font-family: \"Shadows Into Light\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"/assets/fonts/shadows-into-light-v8-latin-regular.eot\");\n  \n  src: local(\"Shadows Into Light\"), local(\"ShadowsIntoLight\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.woff2\") format(\"woff2\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.woff\") format(\"woff\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.ttf\") format(\"truetype\"), url(\"/assets/fonts/shadows-into-light-v8-latin-regular.svg#ShadowsIntoLight\") format(\"svg\");\n  \n}\n.coachmark-backdrop[_ngcontent-%COMP%] {\n  background: var(--backdrop-background);\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1000;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   app-geo-fab[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(44px + env(safe-area-inset-top));\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%] {\n  --ion-tab-bar-background: #010f14;\n  --ion-tab-bar-background-focused: #010f14;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: -1;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .coachmark-text[_ngcontent-%COMP%] {\n  color: #fff;\n  font-family: \"Shadows Into Light\", \"Source Sans Pro\";\n  font-size: 32px;\n  line-height: 130%;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .add-fab[_ngcontent-%COMP%] {\n  --ion-color-primary: var(--ion-color-varsom-orange);\n  --background-activated: var(--ion-color-varsom-orange-shade);\n  --color: var(--ion-color-varsom-orange-contrast);\n  --color-activated: var(--ion-color-varsom-orange-contrast);\n  bottom: calc(60px + env(safe-area-inset-bottom));\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .warning-icon[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .geo-coachmark[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(40px + env(safe-area-inset-top));\n  left: 70px;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .geo-coachmark[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 31px;\n  left: 51px;\n  transform: rotate(4.28deg);\n  width: 112px;\n  text-align: center;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .add-coachmark[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: calc(117px + env(safe-area-inset-bottom));\n  right: 70px;\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .add-coachmark[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 60px;\n  right: -45px;\n  width: 180px;\n  text-align: center;\n  transform: rotate(-6.98deg);\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .warning-coachmark[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: calc(23px + env(safe-area-inset-bottom));\n  right: calc(50% - 100px);\n}\n.coachmark-backdrop[_ngcontent-%COMP%]   .warning-coachmark[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 57px;\n  right: 55px;\n  width: 183px;\n  text-align: center;\n  transform: rotate(-16.77deg);\n  font-size: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvYWNoLW1hcmtzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUVBQUE7RUFBbUUscUJBQUE7RUFDbkUsd2VBQUE7RUFNbUIsZUFBQTtBQUhyQjtBQU1BO0VBQ0Usc0NBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0FBSkY7QUFNRTtFQUNFLGtCQUFBO0VBQ0EsMENBQUE7QUFKSjtBQU9FO0VBQ0UsaUNBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtBQUxKO0FBUUU7RUFDRSxXQUFBO0VBQ0Esb0RBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFOSjtBQVNFO0VBQ0UsbURBQUE7RUFDQSw0REFBQTtFQUNBLGdEQUFBO0VBQ0EsMERBQUE7RUFDQSxnREFBQTtBQVBKO0FBVUU7RUFDRSxXQUFBO0FBUko7QUFXRTtFQUNFLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxVQUFBO0FBVEo7QUFXSTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSwwQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQVROO0FBYUU7RUFDRSxrQkFBQTtFQUNBLGlEQUFBO0VBQ0EsV0FBQTtBQVhKO0FBWUk7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7QUFWTjtBQWNFO0VBQ0Usa0JBQUE7RUFDQSxnREFBQTtFQUNBLHdCQUFBO0FBWko7QUFjSTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7QUFaTiIsImZpbGUiOiJjb2FjaC1tYXJrcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBmb250LWZhY2Uge1xyXG4gIGZvbnQtZmFtaWx5OiBcIlNoYWRvd3MgSW50byBMaWdodFwiO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIHNyYzogdXJsKFwiL2Fzc2V0cy9mb250cy9zaGFkb3dzLWludG8tbGlnaHQtdjgtbGF0aW4tcmVndWxhci5lb3RcIik7IC8qIElFOSBDb21wYXQgTW9kZXMgKi9cclxuICBzcmM6IGxvY2FsKFwiU2hhZG93cyBJbnRvIExpZ2h0XCIpLCBsb2NhbChcIlNoYWRvd3NJbnRvTGlnaHRcIiksXHJcbiAgICB1cmwoXCIvYXNzZXRzL2ZvbnRzL3NoYWRvd3MtaW50by1saWdodC12OC1sYXRpbi1yZWd1bGFyLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksXHJcbiAgICAvKiBJRTYtSUU4ICovIHVybChcIi9hc3NldHMvZm9udHMvc2hhZG93cy1pbnRvLWxpZ2h0LXY4LWxhdGluLXJlZ3VsYXIud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksXHJcbiAgICAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi8gdXJsKFwiL2Fzc2V0cy9mb250cy9zaGFkb3dzLWludG8tbGlnaHQtdjgtbGF0aW4tcmVndWxhci53b2ZmXCIpIGZvcm1hdChcIndvZmZcIiksXHJcbiAgICAvKiBNb2Rlcm4gQnJvd3NlcnMgKi8gdXJsKFwiL2Fzc2V0cy9mb250cy9zaGFkb3dzLWludG8tbGlnaHQtdjgtbGF0aW4tcmVndWxhci50dGZcIikgZm9ybWF0KFwidHJ1ZXR5cGVcIiksXHJcbiAgICAvKiBTYWZhcmksIEFuZHJvaWQsIGlPUyAqLyB1cmwoXCIvYXNzZXRzL2ZvbnRzL3NoYWRvd3MtaW50by1saWdodC12OC1sYXRpbi1yZWd1bGFyLnN2ZyNTaGFkb3dzSW50b0xpZ2h0XCIpXHJcbiAgICAgIGZvcm1hdChcInN2Z1wiKTsgLyogTGVnYWN5IGlPUyAqL1xyXG59XHJcblxyXG4uY29hY2htYXJrLWJhY2tkcm9wIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZHJvcC1iYWNrZ3JvdW5kKTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcblxyXG4gIGFwcC1nZW8tZmFiIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogY2FsYyg0NHB4ICsgZW52KHNhZmUtYXJlYS1pbnNldC10b3ApKTtcclxuICB9XHJcblxyXG4gIGlvbi10YWItYmFyIHtcclxuICAgIC0taW9uLXRhYi1iYXItYmFja2dyb3VuZDogIzAxMGYxNDtcclxuICAgIC0taW9uLXRhYi1iYXItYmFja2dyb3VuZC1mb2N1c2VkOiAjMDEwZjE0O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgei1pbmRleDogLTE7XHJcbiAgfVxyXG5cclxuICAuY29hY2htYXJrLXRleHQge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LWZhbWlseTogXCJTaGFkb3dzIEludG8gTGlnaHRcIiwgXCJTb3VyY2UgU2FucyBQcm9cIjtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxMzAlO1xyXG4gIH1cclxuXHJcbiAgLmFkZC1mYWIge1xyXG4gICAgLS1pb24tY29sb3ItcHJpbWFyeTogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1vcmFuZ2UpO1xyXG4gICAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1vcmFuZ2Utc2hhZGUpO1xyXG4gICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1vcmFuZ2UtY29udHJhc3QpO1xyXG4gICAgLS1jb2xvci1hY3RpdmF0ZWQ6IHZhcigtLWlvbi1jb2xvci12YXJzb20tb3JhbmdlLWNvbnRyYXN0KTtcclxuICAgIGJvdHRvbTogY2FsYyg2MHB4ICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pKTtcclxuICB9XHJcblxyXG4gIC53YXJuaW5nLWljb24ge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgfVxyXG5cclxuICAuZ2VvLWNvYWNobWFyayB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IGNhbGMoNDBweCArIGVudihzYWZlLWFyZWEtaW5zZXQtdG9wKSk7XHJcbiAgICBsZWZ0OiA3MHB4O1xyXG5cclxuICAgIGlvbi10ZXh0IHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDMxcHg7XHJcbiAgICAgIGxlZnQ6IDUxcHg7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQuMjhkZWcpO1xyXG4gICAgICB3aWR0aDogMTEycHg7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5hZGQtY29hY2htYXJrIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogY2FsYygxMTdweCArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKSk7XHJcbiAgICByaWdodDogNzBweDtcclxuICAgIGlvbi10ZXh0IHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBib3R0b206IDYwcHg7XHJcbiAgICAgIHJpZ2h0OiAtNDVweDtcclxuICAgICAgd2lkdGg6IDE4MHB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC02Ljk4ZGVnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC53YXJuaW5nLWNvYWNobWFyayB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IGNhbGMoMjNweCArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKSk7XHJcbiAgICByaWdodDogY2FsYyg1MCUgLSAxMDBweCk7XHJcblxyXG4gICAgaW9uLXRleHQge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGJvdHRvbTogNTdweDtcclxuICAgICAgcmlnaHQ6IDU1cHg7XHJcbiAgICAgIHdpZHRoOiAxODNweDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTYuNzdkZWcpO1xyXG4gICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"], data: { animation: [
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('geo-coachmark-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(1000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT, 0.9)),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('add-fab-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(3000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT_BACK)),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('add-text-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(4000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT, 0.9)),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('warning-icon-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(5000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT_BACK)),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('warning-coachmark-animation', _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.CustomAnimation.createEnterScaleInAnimation(6000, 500, _core_animations_custom_animation__WEBPACK_IMPORTED_MODULE_1__.EASE_IN_OUT, 0.9))
        ] } });


/***/ }),

/***/ 55759:
/*!*******************************************************************!*\
  !*** ./src/app/components/map-item-bar/map-item-bar.component.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapItemBarComponent": function() { return /* binding */ MapItemBarComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/helpers/helper.service */ 22791);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/geo-position/geo-position.service */ 27494);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _core_helpers_competence_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/helpers/competence-helper */ 26643);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! angular-svg-icon */ 70459);
/* harmony import */ var _competence_competence_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../competence/competence.component */ 87913);
/* harmony import */ var _img_swiper_img_swiper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../img-swiper/img-swiper.component */ 40855);
/* harmony import */ var _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/shared/pipes/format-date/format-date.pipe */ 16531);























const _c0 = function () { return { "width.px": 16, "height.px": 16 }; };
function MapItemBarComponent_div_0_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "svg-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("svgStyle", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](5, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"]("", ctx_r1.masl, " ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 3, "MAP_CENTER_INFO.ABOVE_SEA_LEVEL"), "");
} }
const _c1 = function (a0) { return { "full": a0 }; };
function MapItemBarComponent_div_0_div_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "app-img-swiper", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](3, _c1, ctx_r2.imageUrls.length > 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("showLabels", false)("imgUrl", ctx_r2.imageUrls);
} }
function MapItemBarComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MapItemBarComponent_div_0_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r3.navigateToItem(); });
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
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
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
} }
class MapItemBarComponent {
    // TODO: Rewrite this component to use observable. Maybe put visibleMapItem observable in map service?
    constructor(geoPositionService, helper, translateService, router, zone, userSettingService) {
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
    get isVisible() {
        return this._isVisible.asObservable();
    }
    ngOnInit() {
        this.subscription = this.userSettingService.appModeLanguageAndCurrentGeoHazard$.subscribe(([appMode, _, __]) => {
            this.appMode = appMode;
            this.hide();
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    getTitle(item) {
        const allRegistrationNames = (item.Summaries || []).map((registration) => registration.RegistrationName);
        const uniqueValues = Array.from(new Set(allRegistrationNames));
        return uniqueValues.join(', ');
    }
    show(item) {
        this.zone.run(() => {
            this.id = item.RegId;
            this.topHeader = item.DtObsTime;
            this.title = this.getTitle(item);
            this.name = item.Observer.NickName;
            this.competenceLevel = (0,_core_helpers_competence_helper__WEBPACK_IMPORTED_MODULE_4__.getStarCount)(item.Observer.CompetenceLevelName);
            this.geoHazard = item.GeoHazardTID;
            this.masl = item.ObsLocation ? item.ObsLocation.Height : undefined;
            this.setDistanceAndType(item);
            this.imageUrls = [];
            if (this.appMode && item.Attachments && item.Attachments.length > 0) {
                this.imageUrls = item.Attachments.map((attachment) => this.getImageUrl(attachment, 'Medium'));
            }
            this.visible = true;
            this.publishChange();
        });
    }
    hide() {
        this.zone.run(() => {
            this.visible = false;
            this.publishChange();
        });
    }
    getImageUrl(attachment, size = 'Medium') {
        return attachment.UrlFormats[size];
    }
    navigateToItem() {
        this.router.navigateByUrl(`view-observation/${this.id}`);
    }
    publishChange() {
        this._isVisible.next(this.visible);
    }
    setDistanceAndType(item) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.distanceAndType = ''; // set by promise
            const translations = yield this.translateService
                .get(['MAP_ITEM_BAR.OBSERVATION', 'MAP_ITEM_BAR.AWAY'])
                .toPromise();
            try {
                const currentPosition = yield this.geoPositionService.currentPosition$
                    .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1))
                    .toPromise();
                if (currentPosition) {
                    const distance = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(item.ObsLocation.Latitude, item.ObsLocation.Longitude).distanceTo(leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
                    this.zone.run(() => {
                        this.distanceAndType =
                            `${item.GeoHazardName}${translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase()} ` +
                                `${this.helper.getDistanceText(distance)} ${translations['MAP_ITEM_BAR.AWAY'].toLowerCase()}`;
                    });
                }
                else {
                    this.zone.run(() => {
                        this.distanceAndType = `${item.GeoHazardName}${translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase()}`;
                    });
                }
            }
            catch (_a) {
                this.zone.run(() => {
                    this.distanceAndType = `${item.GeoHazardName}${translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase()}`;
                });
            }
        });
    }
}
MapItemBarComponent.ɵfac = function MapItemBarComponent_Factory(t) { return new (t || MapItemBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_3__.GeoPositionService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_1__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__.UserSettingService)); };
MapItemBarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: MapItemBarComponent, selectors: [["app-map-item-bar"]], decls: 1, vars: 1, consts: [["class", "map-item-bar", 3, "click", 4, "ngIf"], [1, "map-item-bar", 3, "click"], [1, "ion-text-wrap"], [1, "card-icon-item"], ["src", "/assets/icon/time.svg", 1, "card-icon-item-icon", 3, "svgStyle"], ["class", "card-icon-item", 4, "ngIf"], [1, "ion-no-margin", "ion-text-nowrap"], ["src", "/assets/icon/user.svg", 1, "card-icon-item-icon", 3, "svgStyle"], [3, "competenceLevel"], ["class", "img-wrapper", 3, "ngClass", 4, "ngIf"], ["src", "/assets/icon/moh.svg", 1, "card-icon-item-icon", 3, "svgStyle"], [1, "img-wrapper", 3, "ngClass"], [3, "showLabels", "imgUrl"]], template: function MapItemBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, MapItemBarComponent_div_0_Template, 24, 14, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.visible);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonCol, angular_svg_icon__WEBPACK_IMPORTED_MODULE_16__.SvgIconComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonLabel, _competence_competence_component__WEBPACK_IMPORTED_MODULE_5__.CompetenceComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgClass, _img_swiper_img_swiper_component__WEBPACK_IMPORTED_MODULE_6__.ImgSwiperComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe, _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_7__.FormatDatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe], styles: [".map-item-bar[_ngcontent-%COMP%] {\n  --img-wrapper-height: 22vh;\n  --img-wrapper-width: 30vh;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #fff;\n  z-index: var(--z-index-over-map);\n}\n.map-item-bar[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.map-item-bar[_ngcontent-%COMP%]   .card-icon-item[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding-right: 16px;\n  line-height: normal;\n}\n.map-item-bar[_ngcontent-%COMP%]   .card-icon-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%], .map-item-bar[_ngcontent-%COMP%]   .card-icon-item[_ngcontent-%COMP%]   app-competence[_ngcontent-%COMP%] {\n  position: relative;\n  bottom: 2px;\n}\n.map-item-bar[_ngcontent-%COMP%]   .card-icon-item[_ngcontent-%COMP%]   .card-icon-item-icon[_ngcontent-%COMP%] {\n  margin-right: 5px;\n}\n.map-item-bar[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0px;\n  width: var(--img-wrapper-width);\n  height: var(--img-wrapper-height);\n  top: calc(var(--img-wrapper-height) * -1);\n  display: flex;\n  justify-content: center;\n}\n.map-item-bar[_ngcontent-%COMP%]   .img-wrapper.full[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: none;\n}\n.map-item-bar[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   app-img-swiper[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: row;\n  justify-content: left;\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC1pdGVtLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDBCQUFBO0VBQ0EseUJBQUE7RUFFQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7QUFBRjtBQUVFO0VBQ0UsZ0JBQUE7RUFDQSx1QkFBQTtBQUFKO0FBR0U7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFESjtBQUdJOztFQUVFLGtCQUFBO0VBQ0EsV0FBQTtBQUROO0FBSUk7RUFDRSxpQkFBQTtBQUZOO0FBTUU7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSwrQkFBQTtFQUNBLGlDQUFBO0VBQ0EseUNBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7QUFKSjtBQU1JO0VBQ0UsV0FBQTtFQUNBLGVBQUE7QUFKTjtBQU9JO0VBQ0UsYUFBQTtFQUNBLE9BQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFMTiIsImZpbGUiOiJtYXAtaXRlbS1iYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFwLWl0ZW0tYmFyIHtcclxuICAtLWltZy13cmFwcGVyLWhlaWdodDogMjJ2aDtcclxuICAtLWltZy13cmFwcGVyLXdpZHRoOiAzMHZoO1xyXG5cclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICB6LWluZGV4OiB2YXIoLS16LWluZGV4LW92ZXItbWFwKTtcclxuXHJcbiAgaDUge1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIH1cclxuXHJcbiAgLmNhcmQtaWNvbi1pdGVtIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHBhZGRpbmctcmlnaHQ6IDE2cHg7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG5cclxuICAgIGlvbi1sYWJlbCxcclxuICAgIGFwcC1jb21wZXRlbmNlIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBib3R0b206IDJweDtcclxuICAgIH1cclxuXHJcbiAgICAuY2FyZC1pY29uLWl0ZW0taWNvbiB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmltZy13cmFwcGVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDBweDtcclxuICAgIHdpZHRoOiB2YXIoLS1pbWctd3JhcHBlci13aWR0aCk7XHJcbiAgICBoZWlnaHQ6IHZhcigtLWltZy13cmFwcGVyLWhlaWdodCk7XHJcbiAgICB0b3A6IGNhbGModmFyKC0taW1nLXdyYXBwZXItaGVpZ2h0KSAqIC0xKTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICAmLmZ1bGwge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgbWF4LXdpZHRoOiBub25lO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC1pbWctc3dpcGVyIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleDogMTtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 34299:
/*!*******************************************************************************************************!*\
  !*** ./src/app/components/warning-group-favourite-toggle/warning-group-favourite-toggle.component.ts ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WarningGroupFavouriteToggleComponent": function() { return /* binding */ WarningGroupFavouriteToggleComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/warning/warning.service */ 90053);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 54364);










const _c0 = function (a0) { return { "favourite": a0 }; };
class WarningGroupFavouriteToggleComponent {
    constructor(warningService, translateService, ngZone, domCtrl, renderer, toastController) {
        this.warningService = warningService;
        this.translateService = translateService;
        this.ngZone = ngZone;
        this.domCtrl = domCtrl;
        this.renderer = renderer;
        this.toastController = toastController;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        const currentKey = changes.key.currentValue;
        if (!this._lastKey || this._lastKey.groupId !== currentKey.groupId) {
            this._lastKey = currentKey;
            this.startSubscription(currentKey);
        }
    }
    startSubscription(key) {
        this.warningIsFavouriteSubscription = this.warningService
            .getIsFavouriteObservable(key.groupId, key.geoHazard)
            .subscribe((val) => {
            this.ngZone.run(() => {
                this.isFavourite = val;
            });
        });
    }
    setOpen(openAmount) {
        const scaleAmount = 1 + openAmount / 2.0;
        const scale = `scale3d(${scaleAmount},${scaleAmount},1)`;
        this.domCtrl.write(() => {
            this.renderer.setStyle(this.ionIcon.el, 'transform', scale);
        });
    }
    ngOnDestroy() {
        if (this.warningIsFavouriteSubscription) {
            this.warningIsFavouriteSubscription.unsubscribe();
        }
    }
    toggle() {
        if (this.isFavourite) {
            this.warningService
                .removeFromFavourite(this.key.groupId, this.key.geoHazard)
                .then(() => this.presentToast(false));
        }
        else {
            this.warningService
                .addToFavourite(this.key.groupId, this.key.geoHazard)
                .then(() => this.presentToast(true));
        }
    }
    presentToast(added) {
        this.translateService
            .get([
            'WARNING_LIST.ADDED_TO_FAVOURITES',
            'WARNING_LIST.REMOVED_FROM_FAVOURITES',
            'ALERT.UNDO'
        ])
            .subscribe((translation) => (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: `${this.key.groupName} ${added
                    ? translation['WARNING_LIST.ADDED_TO_FAVOURITES']
                    : translation['WARNING_LIST.REMOVED_FROM_FAVOURITES']}`,
                mode: 'md',
                duration: 4000,
                buttons: [
                    {
                        text: translation['ALERT.UNDO'],
                        role: 'cancel',
                        handler: () => {
                            if (added) {
                                this.warningService.removeFromFavourite(this.key.groupId, this.key.geoHazard);
                            }
                            else {
                                this.warningService.addToFavourite(this.key.groupId, this.key.geoHazard);
                            }
                        }
                    }
                ]
            });
            toast.present();
        }));
    }
}
WarningGroupFavouriteToggleComponent.ɵfac = function WarningGroupFavouriteToggleComponent_Factory(t) { return new (t || WarningGroupFavouriteToggleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__.WarningService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.DomController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ToastController)); };
WarningGroupFavouriteToggleComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: WarningGroupFavouriteToggleComponent, selectors: [["app-warning-group-favourite-toggle"]], viewQuery: function WarningGroupFavouriteToggleComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.ionIcon = _t.first);
    } }, inputs: { key: "key" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]], decls: 1, vars: 3, consts: [["slot", "icon-only", "name", "star", 3, "ngClass"]], template: function WarningGroupFavouriteToggleComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](1, _c0, ctx.isFavourite));
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass], styles: ["ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\nion-icon.favourite[_ngcontent-%COMP%] {\n  color: yellow;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7QUFDSjtBQUFJO0VBQ0ksYUFBQTtBQUVSIiwiZmlsZSI6Indhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgICYuZmF2b3VyaXRlIHtcclxuICAgICAgICBjb2xvcjogeWVsbG93O1xyXG4gICAgfVxyXG59Il19 */"] });


/***/ }),

/***/ 68838:
/*!*********************************************************************************!*\
  !*** ./src/app/components/warning-list-header/warning-list-header.component.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WarningListHeaderComponent": function() { return /* binding */ WarningListHeaderComponent; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 70325);






function WarningListHeaderComponent_ion_grid_0_ion_col_6_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div");
} }
function WarningListHeaderComponent_ion_grid_0_ion_col_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, WarningListHeaderComponent_ion_grid_0_ion_col_6_div_1_Template, 1, 0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r2);
} }
const _c0 = function (a0) { return { "ios": a0 }; };
function WarningListHeaderComponent_ion_grid_0_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c0, ctx_r0.ios));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 3, ctx_r0.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.showDayNames);
} }
function WarningListHeaderComponent_ion_grid_1_ion_col_10_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div");
} }
function WarningListHeaderComponent_ion_grid_1_ion_col_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, WarningListHeaderComponent_ion_grid_1_ion_col_10_div_1_Template, 1, 0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r2);
} }
function WarningListHeaderComponent_ion_grid_1_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 3, ctx_r1.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 5, ctx_r1.subTitle), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.showDayNames);
} }
function WarningListHeaderComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 3, ctx_r3.getDayName(0)), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 5, ctx_r3.getDayName(1)), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](10, 7, ctx_r3.getDayName(2)), " ");
} }
class WarningListHeaderComponent {
    constructor(platform) {
        this.platform = platform;
    }
    get ios() {
        return this.platform.is('ios');
    }
    ngOnInit() { }
    getDayName(daysToAdd) {
        return `DAYS.SHORT.${moment__WEBPACK_IMPORTED_MODULE_0___default()().add(daysToAdd, 'days').day()}`;
    }
}
WarningListHeaderComponent.ɵfac = function WarningListHeaderComponent_Factory(t) { return new (t || WarningListHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.Platform)); };
WarningListHeaderComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: WarningListHeaderComponent, selectors: [["app-warning-list-header"]], inputs: { title: "title", subTitle: "subTitle", showDayNames: "showDayNames" }, decls: 4, vars: 2, consts: [["class", "header-grid ion-no-padding ion-no-margin", 3, "ngClass", 4, "ngIf"], ["class", "header-grid ion-no-margin ion-no-padding", 4, "ngIf"], ["dayNames", ""], [1, "header-grid", "ion-no-padding", "ion-no-margin", 3, "ngClass"], ["size", "6", 1, "ion-no-padding"], [1, "ion-text-uppercase"], ["size", "6", "class", "ion-no-padding ion-align-self-end", 4, "ngIf"], ["size", "6", 1, "ion-no-padding", "ion-align-self-end"], [4, "ngTemplateOutlet"], [1, "header-grid", "ion-no-margin", "ion-no-padding"], ["color", "medium", 1, "ion-text-wrap"], ["offset", "6", "size", "6", "class", "ion-no-padding ion-align-self-end", 4, "ngIf"], ["offset", "6", "size", "6", 1, "ion-no-padding", "ion-align-self-end"], [1, "dayNames", "ion-no-padding"], [1, "ion-text-center"]], template: function WarningListHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, WarningListHeaderComponent_ion_grid_0_Template, 7, 7, "ion-grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, WarningListHeaderComponent_ion_grid_1_Template, 11, 7, "ion-grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, WarningListHeaderComponent_ng_template_2_Template, 11, 9, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.subTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.subTitle);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonGrid, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgTemplateOutlet, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonLabel], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe], styles: ["ion-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 3px;\n}\nion-grid.header-grid.ios[_ngcontent-%COMP%] {\n  margin-right: -8px !important;\n}\n.dayNames[_ngcontent-%COMP%] {\n  width: 144px;\n  margin-right: 0px;\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmctbGlzdC1oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0k7RUFDSSxrQkFBQTtBQUFSO0FBR0k7RUFDSSw2QkFBQTtBQURSO0FBS0E7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBRkoiLCJmaWxlIjoid2FybmluZy1saXN0LWhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcclxuICAgIGgzIHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAzcHg7XHJcbiAgICB9XHJcblxyXG4gICAgJi5oZWFkZXItZ3JpZC5pb3Mge1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogLThweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG59XHJcblxyXG4uZGF5TmFtZXMge1xyXG4gICAgd2lkdGg6IDE0NHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 44843:
/*!*****************************************************************************!*\
  !*** ./src/app/components/warning-list-item/warning-list-item.component.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WarningListItemComponent": function() { return /* binding */ WarningListItemComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _core_services_warning_warning_group_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/warning/warning-group.model */ 32714);
/* harmony import */ var _core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/external-link/external-link.service */ 11810);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../settings */ 30015);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../warning-group-favourite-toggle/warning-group-favourite-toggle.component */ 34299);
/* harmony import */ var _modules_analytics_services_analytic_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/analytics/services/analytic.service */ 82367);
/* harmony import */ var _modules_analytics_enums_app_event_category_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/analytics/enums/app-event-category.enum */ 89220);
/* harmony import */ var _modules_analytics_enums_app_event_action_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/analytics/enums/app-event-action.enum */ 11995);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs */ 47599);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs */ 24390);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 34864);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _modules_shared_components_geo_icon_geo_icon_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/shared/components/geo-icon/geo-icon.component */ 12010);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../modules/shared/pipes/format-date/format-date.pipe */ 16531);


























function WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_ion_icon_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "ion-icon", 14);
} }
function WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-badge", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_Template_ion_badge_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r10); const day_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2); return ctx_r9.navigateToWebByDay($event, ctx_r9.warningGroup, day_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_ion_icon_2_Template, 1, 0, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const warning_r7 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", "warninglevel-" + warning_r7.warningLevel);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", warning_r7.warningLevel > 0 ? warning_r7.warningLevel : "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", warning_r7.emergencyWarning);
} }
function WarningListItemComponent_ion_item_1_ion_col_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, WarningListItemComponent_ion_item_1_ion_col_8_ion_badge_1_Template, 3, 3, "ion-badge", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const day_r5 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r4.warningGroup.getDayWarning(day_r5))("ngIfElse", _r2);
} }
const _c0 = function (a0) { return [a0]; };
const _c1 = function () { return [0, 1, 2]; };
function WarningListItemComponent_ion_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_1_Template_div_click_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r12.navigateToWeb($event, ctx_r12.warningGroup); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "app-geo-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_1_Template_ion_label_click_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r14.navigateToWeb($event, ctx_r14.warningGroup); });
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
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("detail", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("geoHazards", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](4, _c0, ctx_r0.warningGroup.key.geoHazard));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r0.warningGroup.key.groupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction0"](6, _c1));
} }
function WarningListItemComponent_ion_item_2_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 2, "WARNING_LIST.VALID_FROM"), ": ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind4"](4, 6, ctx_r15.warningGroup.validFrom, true, false, false)), "");
} }
function WarningListItemComponent_ion_item_2_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" - ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind4"](3, 3, ctx_r16.warningGroup.validTo, true, false, false)), "");
} }
function WarningListItemComponent_ion_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_2_Template_div_click_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r17.navigateToWeb($event, ctx_r17.warningGroup); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "app-geo-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_ion_item_2_Template_ion_label_click_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r18); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r19.navigateToWeb($event, ctx_r19.warningGroup); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, WarningListItemComponent_ion_item_2_span_7_Template, 5, 11, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, WarningListItemComponent_ion_item_2_span_8_Template, 4, 8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("detail", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("geoHazards", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](5, _c0, ctx_r1.warningGroup.key.geoHazard));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r1.warningGroup.key.groupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.warningGroup.validFrom);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.warningGroup.validTo);
} }
function WarningListItemComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-badge", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "?");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} }
class WarningListItemComponent extends _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_9__.NgDestoryBase {
    constructor(externalLinkService, userSettingService, domCtrl, analyticService, renderer) {
        super();
        this.externalLinkService = externalLinkService;
        this.userSettingService = userSettingService;
        this.domCtrl = domCtrl;
        this.analyticService = analyticService;
        this.renderer = renderer;
        this.GeoHazard = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.GeoHazard;
        this.dragSubject = new rxjs__WEBPACK_IMPORTED_MODULE_14__.Subject();
    }
    ngOnInit() {
        this.dragSubject
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.switchMap)(() => this.getOpenAmount()))
            .subscribe((openAmount) => {
            const opacity = openAmount > 1 ? 1 : openAmount > 0 ? openAmount : 0;
            const color = `rgba(186,196,204,${opacity})`;
            this.favouriteToggle.setOpen(opacity);
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.itemSlide.el, 'background-color', color);
            });
        });
        this.ngDestroy$.subscribe(() => {
            this.close();
        });
    }
    close() {
        if (this.itemSlide) {
            this.itemSlide.close();
        }
    }
    onDrag() {
        this.dragSubject.next();
    }
    getOpenAmount() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.from)(this.itemSlide.getOpenAmount()).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.of)(0)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.map)((val) => (val > 0 ? val / 100.0 : 0)));
    }
    toggleFavourite() {
        this.favouriteToggle.toggle();
        (0,rxjs__WEBPACK_IMPORTED_MODULE_21__.timer)(2000)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.ngDestroy$))
            .subscribe(() => {
            if (this.itemSlide) {
                this.itemSlide.close();
            }
        });
    }
    itemSwiped() {
        this.toggleFavourite();
    }
    getUrl(group, day = '') {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_22__.__awaiter)(this, void 0, void 0, function* () {
            if (group.url) {
                return group.url;
            }
            else {
                const currentLang = yield this.userSettingService.language$
                    .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.take)(1))
                    .toPromise();
                const supportedLang = this.getSupportedLangOrFallbackToEn(currentLang);
                const url = _settings__WEBPACK_IMPORTED_MODULE_2__.settings.services.warning[_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.GeoHazard[group.key.geoHazard]].webUrl[_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey[supportedLang]];
                if (url) {
                    return encodeURI(url
                        .replace('{regionName}', group.key.groupName)
                        .replace('{regionId}', group.key.groupId)
                        .replace('{day}', day));
                }
                else {
                    return null;
                }
            }
        });
    }
    getSupportedLangOrFallbackToEn(lang) {
        if (lang === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey.nb || lang === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey.nn) {
            return _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey.nb;
        }
        return _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_13__.LangKey.en;
    }
    navigateToWeb(event, group) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_22__.__awaiter)(this, void 0, void 0, function* () {
            event.preventDefault();
            const url = yield this.getUrl(group);
            if (url) {
                this.analyticService.trackEvent(_modules_analytics_enums_app_event_category_enum__WEBPACK_IMPORTED_MODULE_7__.AppEventCategory.Warnings, _modules_analytics_enums_app_event_action_enum__WEBPACK_IMPORTED_MODULE_8__.AppEventAction.Click, group.getKeyAsString());
                this.externalLinkService.openExternalLink(url);
            }
        });
    }
    navigateToWebByDay(event, group, day) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_22__.__awaiter)(this, void 0, void 0, function* () {
            event.preventDefault();
            const dateString = moment__WEBPACK_IMPORTED_MODULE_3___default()()
                .startOf('day')
                .add(day, 'days')
                .format(_settings__WEBPACK_IMPORTED_MODULE_2__.settings.services.warning.dateFormat);
            const url = yield this.getUrl(group, dateString);
            if (url) {
                this.analyticService.trackEvent(_modules_analytics_enums_app_event_category_enum__WEBPACK_IMPORTED_MODULE_7__.AppEventCategory.Warnings, _modules_analytics_enums_app_event_action_enum__WEBPACK_IMPORTED_MODULE_8__.AppEventAction.Click, group.getKeyAsString());
                this.externalLinkService.openExternalLink(url);
            }
        });
    }
}
WarningListItemComponent.ɵfac = function WarningListItemComponent_Factory(t) { return new (t || WarningListItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_1__.ExternalLinkService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_4__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_24__.DomController), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_modules_analytics_services_analytic_service__WEBPACK_IMPORTED_MODULE_6__.AnalyticService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Renderer2)); };
WarningListItemComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: WarningListItemComponent, selectors: [["app-warning-list-item"]], viewQuery: function WarningListItemComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItemSliding, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_5__.WarningGroupFavouriteToggleComponent, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.itemSlide = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.favouriteToggle = _t.first);
    } }, inputs: { warningGroup: "warningGroup" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]], decls: 8, vars: 3, consts: [[3, "ionDrag"], ["class", "ion-no-padding", "lines", "full", 3, "detail", 4, "ngIf"], ["side", "end", 3, "ionSwipe"], ["expandable", "true", 3, "click"], [3, "key"], ["emptyWarning", ""], ["lines", "full", 1, "ion-no-padding", 3, "detail"], ["slot", "start", 1, "geo-icon-circle", 3, "click"], [3, "geoHazards"], [3, "click"], [4, "ngFor", "ngForOf"], [3, "color", "click", 4, "ngIf", "ngIfElse"], [3, "color", "click"], ["name", "alert", 4, "ngIf"], ["name", "alert"], [4, "ngIf"], ["color", "warninglevel-0"]], template: function WarningListItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item-sliding", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionDrag", function WarningListItemComponent_Template_ion_item_sliding_ionDrag_0_listener() { return ctx.onDrag(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, WarningListItemComponent_ion_item_1_Template, 9, 7, "ion-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, WarningListItemComponent_ion_item_2_Template, 9, 7, "ion-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-item-options", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionSwipe", function WarningListItemComponent_Template_ion_item_options_ionSwipe_3_listener() { return ctx.itemSwiped(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "ion-item-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function WarningListItemComponent_Template_ion_item_option_click_4_listener() { return ctx.toggleFavourite(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "app-warning-group-favourite-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](6, WarningListItemComponent_ng_template_6_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.warningGroup.key.geoHazard !== ctx.GeoHazard.Ice);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.warningGroup.key.geoHazard === ctx.GeoHazard.Ice);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("key", ctx.warningGroup.key);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItemSliding, _angular_common__WEBPACK_IMPORTED_MODULE_25__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItemOptions, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItemOption, _warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_5__.WarningGroupFavouriteToggleComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonItem, _modules_shared_components_geo_icon_geo_icon_component__WEBPACK_IMPORTED_MODULE_10__.GeoIconComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonRow, _angular_common__WEBPACK_IMPORTED_MODULE_25__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonBadge, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_26__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_25__.AsyncPipe, _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_11__.FormatDatePipe], styles: ["[_ngcontent-%COMP%]:root {\n  --sliding-background: lightgrey;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --inner-padding-end: 0px;\n}\n\nion-item[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%] {\n  display: contents;\n}\n\nion-item-sliding[_ngcontent-%COMP%] {\n  --background: var(--sliding-background);\n}\n\nion-item-option[_ngcontent-%COMP%] {\n  --background: rgba(0,0,0,0);\n}\n\n.geo-icon-circle[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\nion-badge[_ngcontent-%COMP%] {\n  border-radius: 2px;\n  height: 36px;\n  width: 36px;\n  color: #fff;\n  font-size: 17px;\n  font-weight: bold;\n  line-height: 30px;\n  text-align: center;\n  display: block;\n}\n\nion-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  position: relative;\n  top: 3px;\n  left: -5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmctbGlzdC1pdGVtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksK0JBQUE7QUFDSjs7QUFFQTtFQUNJLHdCQUFBO0FBQ0o7O0FBQ0k7RUFDSSxpQkFBQTtBQUNSOztBQUdBO0VBQ0ksdUNBQUE7QUFBSjs7QUFHQTtFQUNJLDJCQUFBO0FBQUo7O0FBR0E7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQUo7O0FBRUk7RUFDSSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0FBQVIiLCJmaWxlIjoid2FybmluZy1saXN0LWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6cm9vdCB7XHJcbiAgICAtLXNsaWRpbmctYmFja2dyb3VuZDogbGlnaHRncmV5O1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwcHg7XHJcblxyXG4gICAgaW9uLWdyaWQge1xyXG4gICAgICAgIGRpc3BsYXk6IGNvbnRlbnRzO1xyXG4gICAgfVxyXG59XHJcblxyXG5pb24taXRlbS1zbGlkaW5nIHtcclxuICAgIC0tYmFja2dyb3VuZDogdmFyKC0tc2xpZGluZy1iYWNrZ3JvdW5kKTtcclxufVxyXG5cclxuaW9uLWl0ZW0tb3B0aW9uIHtcclxuICAgIC0tYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwKTtcclxufVxyXG5cclxuLmdlby1pY29uLWNpcmNsZSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuaW9uLWJhZGdlIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIGhlaWdodDogMzZweDtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcblxyXG4gICAgaW9uLWljb24ge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICB0b3A6IDNweDtcclxuICAgICAgICBsZWZ0OiAtNXB4O1xyXG4gICAgfVxyXG59ICAgIl19 */"] });


/***/ }),

/***/ 17644:
/*!*************************************************************************!*\
  !*** ./src/app/core/helpers/leaflet/map-item-marker/map-item-marker.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapItemMarker": function() { return /* binding */ MapItemMarker; }
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_map_core_classes_regobs_geohazard_marker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../modules/map/core/classes/regobs-geohazard-marker */ 80968);


class MapItemMarker extends leaflet__WEBPACK_IMPORTED_MODULE_0__.Marker {
    constructor(item, latlng, options) {
        super(latlng, options);
        this._item = item;
        this.updateIcon();
    }
    get item() {
        return Object.assign({}, this._item);
    }
    get id() {
        return this._item.RegId;
    }
    get isSelected() {
        return this._isSelected;
    }
    setSelected() {
        this._isSelected = true;
        this.updateIcon();
    }
    deselect() {
        this._isSelected = false;
        this.updateIcon();
    }
    updateIcon() {
        this.setIcon(new _modules_map_core_classes_regobs_geohazard_marker__WEBPACK_IMPORTED_MODULE_1__.RegobsGeoHazardMarker(this._item.GeoHazardTID, this._isSelected));
    }
}


/***/ }),

/***/ 8402:
/*!*********************************************!*\
  !*** ./src/app/core/helpers/routed-page.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RouterPage": function() { return /* binding */ RouterPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 76477);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 95051);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);






class RouterPage {
    constructor(router, route) {
        this.router = router;
        this.route = route;
        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        this.isActive = false;
        router.events
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.takeUntil)(this.ngUnsubscribe), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.concatMap)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.from)(Promise.resolve(this.detectEnterOrLeave()))))
            .subscribe();
    }
    isComponentActive(path, component) {
        let isActive = false;
        path.forEach((ss) => {
            if (ss.component === component) {
                isActive = true;
            }
            else {
                isActive = this.isComponentActive(ss.children, component);
            }
        });
        return isActive;
    }
    detectEnterOrLeave() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const isActiveNow = this.isComponentActive(this.router.routerState.snapshot.root.pathFromRoot, this.route.snapshot.component);
            if (!this.isActive && isActiveNow) {
                this.isActive = true;
                yield this.onEnter();
            }
            else if (this.isActive && !isActiveNow) {
                this.isActive = false;
                yield this.onLeave();
            }
        });
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
RouterPage.ɵfac = function RouterPage_Factory(t) { return new (t || RouterPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute)); };
RouterPage.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({ token: RouterPage, factory: RouterPage.ɵfac });


/***/ }),

/***/ 12031:
/*!******************************************************************************************!*\
  !*** ./src/app/core/services/usage-analytics-consent/usage-analytics-consent.service.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsageAnalyticsConsentService": function() { return /* binding */ UsageAnalyticsConsentService; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../user-setting/user-setting.service */ 22276);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 70325);









const ALLOW_ANALYTICS_HEADER = 'SETTINGS.ALLOW_ANALYTICS_HEADER';
const ALLOW_ANALYTICS_DESCRIPTION = 'SETTINGS.ALLOW_ANALYTICS_DESCRIPTION';
const ALLOW_ANALYTICS_DESCRIPTION_LINE_2 = 'SETTINGS.ALLOW_ANALYTICS_DESCRIPTION_LINE2';
const READ_MORE_TEXT = 'SETTINGS.READ_MORE_IN_LICENSE_AGREEMENT';
const OK = 'ALERT.FINE';
const NO_THANKS = 'ALERT.NO_THANKS';
class UsageAnalyticsConsentService {
    constructor(userSettingService, alertController, platform, translateService) {
        this.userSettingService = userSettingService;
        this.alertController = alertController;
        this.platform = platform;
        this.translateService = translateService;
    }
    checkUserDataConsentDialog() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const userSettings = yield this.userSettingService.userSetting$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1))
                .toPromise();
            if (!userSettings.consentForSendingAnalyticsDialogCompleted) {
                yield this.showConsentForSendingAnalyticsDialog();
            }
        });
    }
    showConsentForSendingAnalyticsDialog() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve) => (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
                const translations = yield this.translateService
                    .get([
                    ALLOW_ANALYTICS_HEADER,
                    ALLOW_ANALYTICS_DESCRIPTION,
                    ALLOW_ANALYTICS_DESCRIPTION_LINE_2,
                    READ_MORE_TEXT,
                    OK,
                    NO_THANKS
                ])
                    .toPromise();
                const cssClass = this.platform.is('ios')
                    ? ['normal-weight', 'full-width']
                    : [];
                const buttonOK = {
                    cssClass,
                    text: translations[OK],
                    handler: () => this.saveSettings(true).then(() => resolve())
                };
                const buttonNo = {
                    cssClass,
                    text: translations[NO_THANKS],
                    handler: () => this.saveSettings(false).then(() => resolve())
                };
                const buttons = this.platform.is('ios')
                    ? [buttonOK, buttonNo]
                    : [buttonNo, buttonOK];
                const alert = yield this.alertController.create({
                    header: translations[ALLOW_ANALYTICS_HEADER],
                    message: `${translations[ALLOW_ANALYTICS_DESCRIPTION]}<br /><br />${translations[ALLOW_ANALYTICS_DESCRIPTION_LINE_2]}<br /><br />${translations[READ_MORE_TEXT]}`,
                    buttons,
                    backdropDismiss: false // Prevent from closing without choosing
                });
                yield alert.present();
            }));
        });
    }
    saveSettings(accepted) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const currentSettings = yield this.userSettingService.userSetting$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1))
                .toPromise();
            this.userSettingService.saveUserSettings(Object.assign(Object.assign({}, currentSettings), { consentForSendingAnalytics: accepted, consentForSendingAnalyticsDialogCompleted: true }));
        });
    }
}
UsageAnalyticsConsentService.ɵfac = function UsageAnalyticsConsentService_Factory(t) { return new (t || UsageAnalyticsConsentService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService)); };
UsageAnalyticsConsentService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: UsageAnalyticsConsentService, factory: UsageAnalyticsConsentService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 37944:
/*!*******************************************************************************!*\
  !*** ./src/app/modules/data-load/components/data-load/data-load.component.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataLoadComponent": function() { return /* binding */ DataLoadComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var _services_data_load_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/data-load.service */ 97123);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 70325);









function DataLoadComponent_ion_grid_1_ion_row_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 2, "DATA_LOAD.LOADING"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](5, 4, item_r3.progress * 100, ".1"), " %");
} }
function DataLoadComponent_ion_grid_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-grid");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DataLoadComponent_ion_grid_1_ion_row_1_Template, 6, 7, "ion-row", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.dataLoad);
} }
function DataLoadComponent_ion_spinner_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "ion-spinner");
} }
const _c0 = function (a0, a1) { return { "fadeIn": a0, "fadeOut": a1 }; };
class DataLoadComponent {
    constructor(dataLoadService, ngZone) {
        this.dataLoadService = dataLoadService;
        this.ngZone = ngZone;
        this.dataLoad = [];
    }
    get isLoading() {
        return this.dataLoad.length > 0;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        const ids = changes.ids.currentValue;
        if (ids && ids.length > 0) {
            this.subscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.combineLatest)(ids.map((id) => this.dataLoadService.getStateAsObservable(id)))
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)((val) => val.filter((item) => item.isLoading)))
                .subscribe((val) => {
                this.ngZone.run(() => {
                    this.dataLoad = val;
                });
            });
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
DataLoadComponent.ɵfac = function DataLoadComponent_Factory(t) { return new (t || DataLoadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_data_load_service__WEBPACK_IMPORTED_MODULE_0__.DataLoadService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone)); };
DataLoadComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DataLoadComponent, selectors: [["app-data-load"]], inputs: { ids: "ids", simple: "simple" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 3, vars: 6, consts: [[1, "data-load", "animated", 3, "ngClass"], [4, "ngIf"], [4, "ngFor", "ngForOf"]], template: function DataLoadComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DataLoadComponent_ion_grid_1_Template, 2, 1, "ion-grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, DataLoadComponent_ion_spinner_2_Template, 1, 0, "ion-spinner", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](3, _c0, ctx.isLoading, !ctx.isLoading));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.simple);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.simple);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonGrid, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonSpinner], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DecimalPipe], styles: ["@-webkit-keyframes fadeOutFromCurrent {\n  0% {\n    opacity: 0;\n    opacity: var(--current-opacity, 0);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fadeOutFromCurrent {\n  0% {\n    opacity: 0;\n    opacity: var(--current-opacity, 0);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.data-load[_ngcontent-%COMP%] {\n  position: absolute;\n  color: #fff;\n  top: 20px;\n  left: 50%;\n  transform: translateX(-20px);\n  width: 28px;\n  height: 28px;\n  z-index: calc(var(--z-index-over-map) - 1);\n  opacity: 0;\n  opacity: var(--current-opacity, 0);\n}\n.data-load.fadeIn[_ngcontent-%COMP%] {\n  --current-opacity: 1;\n}\n.data-load.fadeOut[_ngcontent-%COMP%] {\n  --current-opacity: 0;\n  -webkit-animation-name: fadeOutFromCurrent;\n          animation-name: fadeOutFromCurrent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEtbG9hZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJO0lBQ0ksVUFBQTtJQUFBLGtDQUFBO0VBQ047RUFFRTtJQUNJLFVBQUE7RUFBTjtBQUNGO0FBUEE7RUFDSTtJQUNJLFVBQUE7SUFBQSxrQ0FBQTtFQUNOO0VBRUU7SUFDSSxVQUFBO0VBQU47QUFDRjtBQUdBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7RUFDQSw0QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsMENBQUE7RUFHQSxVQUFBO0VBQUEsa0NBQUE7QUFISjtBQUtJO0VBQ0ksb0JBQUE7QUFIUjtBQU1JO0VBQ0ksb0JBQUE7RUFDQSwwQ0FBQTtVQUFBLGtDQUFBO0FBSlIiLCJmaWxlIjoiZGF0YS1sb2FkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGtleWZyYW1lcyBmYWRlT3V0RnJvbUN1cnJlbnQge1xyXG4gICAgMCUge1xyXG4gICAgICAgIG9wYWNpdHk6IHZhcigtLWN1cnJlbnQtb3BhY2l0eSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgIH1cclxufVxyXG5cclxuLmRhdGEtbG9hZCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHRvcDogMjBweDtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XHJcbiAgICB3aWR0aDogMjhweDtcclxuICAgIGhlaWdodDogMjhweDtcclxuICAgIHotaW5kZXg6IGNhbGModmFyKC0tei1pbmRleC1vdmVyLW1hcCkgLSAxKTtcclxuICAgIC8vIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1hcC1mYWRlZC1vdmVybGF5LWJhY2tncm91bmQpO1xyXG4gICAgLy8gYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgb3BhY2l0eTogdmFyKC0tY3VycmVudC1vcGFjaXR5LCAwKTtcclxuXHJcbiAgICAmLmZhZGVJbiB7XHJcbiAgICAgICAgLS1jdXJyZW50LW9wYWNpdHk6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgJi5mYWRlT3V0IHtcclxuICAgICAgICAtLWN1cnJlbnQtb3BhY2l0eTogMDtcclxuICAgICAgICBhbmltYXRpb24tbmFtZTogZmFkZU91dEZyb21DdXJyZW50O1xyXG4gICAgfVxyXG59Il19 */"] });


/***/ }),

/***/ 35125:
/*!*******************************************************!*\
  !*** ./src/app/modules/data-load/data-load.module.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataLoadModule": function() { return /* binding */ DataLoadModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/data-load/data-load.component */ 37944);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);





class DataLoadModule {
}
DataLoadModule.ɵfac = function DataLoadModule_Factory(t) { return new (t || DataLoadModule)(); };
DataLoadModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: DataLoadModule });
DataLoadModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](DataLoadModule, { declarations: [_components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_0__.DataLoadComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateModule], exports: [_components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_0__.DataLoadComponent] }); })();


/***/ }),

/***/ 47434:
/*!**************************************************************!*\
  !*** ./src/app/modules/map/helpers/leaflet-cluser.helper.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ 57994:
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": function() { return /* binding */ HomePageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 10678);
/* harmony import */ var _components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/map-item-bar/map-item-bar.component */ 55759);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _modules_data_load_data_load_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/data-load/data-load.module */ 35125);
/* harmony import */ var _modules_map_map_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/map/map.module */ 14522);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);








class HomePageModule {
}
HomePageModule.ɵfac = function HomePageModule_Factory(t) { return new (t || HomePageModule)(); };
HomePageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: HomePageModule });
HomePageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild([
                {
                    path: '',
                    component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage
                }
            ]),
            _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _modules_data_load_data_load_module__WEBPACK_IMPORTED_MODULE_3__.DataLoadModule,
            _modules_map_map_module__WEBPACK_IMPORTED_MODULE_4__.MapModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](HomePageModule, { declarations: [_home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage, _components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_1__.MapItemBarComponent], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
        _modules_data_load_data_load_module__WEBPACK_IMPORTED_MODULE_3__.DataLoadModule,
        _modules_map_map_module__WEBPACK_IMPORTED_MODULE_4__.MapModule] }); })();


/***/ }),

/***/ 10678:
/*!*****************************************!*\
  !*** ./src/app/pages/home/home.page.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": function() { return /* binding */ HomePage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var leaflet_markercluster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet.markercluster */ 73008);
/* harmony import */ var leaflet_markercluster__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_markercluster__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! rxjs */ 87796);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var _core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/observation/observation.service */ 83497);
/* harmony import */ var _components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/map-item-bar/map-item-bar.component */ 55759);
/* harmony import */ var _core_helpers_leaflet_map_item_marker_map_item_marker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/helpers/leaflet/map-item-marker/map-item-marker */ 17644);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/map/components/map/map.component */ 6781);
/* harmony import */ var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/services/fullscreen/fullscreen.service */ 13653);
/* harmony import */ var _modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/shared/services/logging/logging.service */ 93042);
/* harmony import */ var _modules_map_helpers_leaflet_cluser_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/map/helpers/leaflet-cluser.helper */ 47434);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs/operators */ 52249);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs/operators */ 71775);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../settings */ 30015);
/* harmony import */ var _core_services_usage_analytics_consent_usage_analytics_consent_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/services/usage-analytics-consent/usage-analytics-consent.service */ 12031);
/* harmony import */ var _core_helpers_routed_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/helpers/routed-page */ 8402);
/* harmony import */ var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/helpers/observable-helper */ 59364);
/* harmony import */ var src_app_modules_map_components_map_center_info_map_center_info_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../modules/map/components/map-center-info/map-center-info.component */ 80454);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../modules/shared/components/header/header.component */ 24201);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../modules/shared/components/add-menu/add-menu.component */ 26331);
/* harmony import */ var _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../modules/shared/components/geo-fab/geo-fab.component */ 49744);
/* harmony import */ var _modules_data_load_components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../modules/data-load/components/data-load/data-load.component */ 37944);





































function HomePage_app_map_center_info_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "app-map-center-info");
} }
function HomePage_app_geo_fab_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "app-geo-fab", 4);
} }
function HomePage_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "app-data-load", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const dataLoadIds_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ids", dataLoadIds_r3);
} }
const DEBUG_TAG = 'HomePage';
class HomePage extends _core_helpers_routed_page__WEBPACK_IMPORTED_MODULE_12__.RouterPage {
    constructor(router, route, observationService, fullscreenService, userSettingService, ngZone, loggingService, usageAnalyticsConsentService, document) {
        super(router, route);
        this.observationService = observationService;
        this.fullscreenService = fullscreenService;
        this.userSettingService = userSettingService;
        this.ngZone = ngZone;
        this.loggingService = loggingService;
        this.usageAnalyticsConsentService = usageAnalyticsConsentService;
        this.document = document;
        this.markerLayer = _modules_map_helpers_leaflet_cluser_helper__WEBPACK_IMPORTED_MODULE_9__.LeafletClusterHelper.createMarkerClusterGroup({
            spiderfyOnMaxZoom: false,
            zoomToBoundsOnClick: false
        });
        this.geoCoachMarksClosedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_20__.Subject();
        this.showGeoSelectInfo = false;
        this.mapCenterInfoHeight = new rxjs__WEBPACK_IMPORTED_MODULE_20__.Subject();
        // Update global css property containing info box height when height changes.
        // This is used to position map scale above map center info box.
        this.mapCenterInfoHeight.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_22__.debounceTime)(500), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.takeUntil)(this.ngUnsubscribe)).subscribe((newInfoBoxHeight) => {
            this.document.documentElement.style.setProperty('--map-center-info-height', `${newInfoBoxHeight}px`);
        });
    }
    ngAfterViewChecked() {
        this.updateInfoBoxHeight();
    }
    ngOnInit() {
        this.fullscreen$ = this.fullscreenService.isFullscreen$;
        this.dataLoadIds$ = this.observationService.dataLoad$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.map)((val) => [val]), (0,_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_13__.enterZone)(this.ngZone));
        this.checkForFirstStartup();
    }
    checkForFirstStartup() {
        this.userSettingService.userSetting$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.map)((us) => us.showGeoSelectInfo), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.takeUntil)((0,rxjs__WEBPACK_IMPORTED_MODULE_25__.race)(this.ngUnsubscribe, this.geoCoachMarksClosedSubject)), (0,_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_13__.enterZone)(this.ngZone))
            .subscribe((showGeoSelectInfo) => {
            this.showGeoSelectInfo = showGeoSelectInfo;
            if (!showGeoSelectInfo) {
                this.geoCoachMarksClosedSubject.next();
                this.geoCoachMarksClosedSubject.complete();
                this.showUsageAnalyticsDialog();
            }
        });
    }
    showUsageAnalyticsDialog() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_26__.__awaiter)(this, void 0, void 0, function* () {
            yield this.usageAnalyticsConsentService.checkUserDataConsentDialog();
            this.mapComponent.componentIsActive(true);
        });
    }
    onMapReady(leafletMap) {
        this.map = leafletMap;
        this.markerLayer.addTo(this.map);
        this.markerLayer.on('clusterclick', (a) => {
            const groupLatLng = a.latlng;
            const currentZoom = this.map.getZoom();
            const newZoom = currentZoom + 2;
            if (newZoom >= _settings__WEBPACK_IMPORTED_MODULE_10__.settings.map.tiles.maxZoom) {
                a.layer.spiderfy();
            }
            else {
                this.map.setView(groupLatLng, Math.min(newZoom, _settings__WEBPACK_IMPORTED_MODULE_10__.settings.map.tiles.maxZoom));
            }
        });
        this.map.on('click', () => {
            if (this.selectedMarker) {
                this.selectedMarker.deselect();
            }
            this.selectedMarker = null;
            this.mapItemBar.hide();
        });
        // TODO: Move this to custom marker layer?
        const observationObservable = (0,rxjs__WEBPACK_IMPORTED_MODULE_27__.combineLatest)([
            this.observationService.observations$,
            this.userSettingService.showObservations$
        ]);
        observationObservable
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.takeUntil)(this.ngUnsubscribe))
            .subscribe(([regObservations, showObservations]) => {
            this.redrawObservationMarkers(showObservations ? regObservations : []);
        });
    }
    onEnter() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_26__.__awaiter)(this, void 0, void 0, function* () {
            this.loggingService.debug('Home page ionViewDidEnter.', DEBUG_TAG);
            const userSettings = yield this.userSettingService.userSetting$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_28__.take)(1))
                .toPromise();
            if (userSettings.showGeoSelectInfo) {
                this.loggingService.debug('Display coachmarks, wait with starting geopostion', DEBUG_TAG);
                return;
            }
            this.loggingService.debug('Activate map updates and GeoLocation', DEBUG_TAG);
            this.mapComponent.componentIsActive(true);
            this.updateInfoBoxHeight();
        });
    }
    onLeave() {
        this.loggingService.debug('Home page onLeave. Disable map updates and GeoLocation', DEBUG_TAG);
        this.mapComponent.componentIsActive(false);
        // As we leave the page, map center info is not visible any more, reset height
        this.mapCenterInfoHeight.next(0);
    }
    // async ionViewDidEnter() {
    // Use tab page workaround from:
    // https://github.com/ionic-team/ionic/issues/15260
    // }
    // ionViewWillLeave() {
    //   this.loggingService.debug(`Home page ionViewWillLeave. Disable map updates and GeoLocation.`, DEBUG_TAG);
    //   this.mapComponent.stopGeoPositionUpdates();
    // }
    redrawObservationMarkers(regObservations) {
        this.markerLayer.clearLayers();
        for (const regObservation of regObservations) {
            const latLng = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(regObservation.ObsLocation.Latitude, regObservation.ObsLocation.Longitude);
            const marker = new _core_helpers_leaflet_map_item_marker_map_item_marker__WEBPACK_IMPORTED_MODULE_4__.MapItemMarker(regObservation, latLng, {});
            marker.on('click', (event) => {
                const m = event.target;
                if (this.selectedMarker) {
                    this.selectedMarker.deselect();
                }
                this.selectedMarker = m;
                m.setSelected();
                this.mapItemBar.show(m.item);
            });
            marker.addTo(this.markerLayer);
        }
    }
    updateInfoBoxHeight() {
        var _a;
        const mapCenterElement = (_a = this.mapCenter) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if (mapCenterElement) {
            const height = mapCenterElement.offsetHeight;
            this.mapCenterInfoHeight.next(height);
        }
        else {
            this.mapCenterInfoHeight.next(0);
        }
    }
}
HomePage.ɵfac = function HomePage_Factory(t) { return new (t || HomePage)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_29__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_29__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_2__.ObservationService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_7__.FullscreenService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_8__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_services_usage_analytics_consent_usage_analytics_consent_service__WEBPACK_IMPORTED_MODULE_11__.UsageAnalyticsConsentService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_30__.DOCUMENT)); };
HomePage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({ type: HomePage, selectors: [["app-home"]], viewQuery: function HomePage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_3__.MapItemBarComponent, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_6__.MapComponent, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_modules_map_components_map_center_info_map_center_info_component__WEBPACK_IMPORTED_MODULE_14__.MapCenterInfoComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.mapItemBar = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.mapComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.mapCenter = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 10, consts: [["title", "Varsom Regobs", 3, "fullscreenSupport"], [3, "autoActivate", "geoTag", "mapReady"], [4, "ngIf"], ["slot", "fixed", 4, "ngIf"], ["slot", "fixed"], ["simple", "true", 3, "ids"]], template: function HomePage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "app-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "app-map", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("mapReady", function HomePage_Template_app_map_mapReady_2_listener($event) { return ctx.onMapReady($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, HomePage_app_map_center_info_3_Template, 1, 0, "app-map-center-info", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](5, "app-map-item-bar");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](6, HomePage_app_geo_fab_6_Template, 1, 0, "app-geo-fab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](7, "app-add-menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](8, HomePage_ng_container_8_Template, 2, 1, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](9, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("fullscreenSupport", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("autoActivate", false)("geoTag", "HomePage");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 6, ctx.userSettingService.showMapCenter$));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.showGeoSelectInfo === false);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](9, 8, ctx.dataLoadIds$));
    } }, directives: [_modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_15__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonContent, _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_6__.MapComponent, _angular_common__WEBPACK_IMPORTED_MODULE_30__.NgIf, _components_map_item_bar_map_item_bar_component__WEBPACK_IMPORTED_MODULE_3__.MapItemBarComponent, _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_16__.AddMenuComponent, src_app_modules_map_components_map_center_info_map_center_info_component__WEBPACK_IMPORTED_MODULE_14__.MapCenterInfoComponent, _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_17__.GeoFabComponent, _modules_data_load_components_data_load_data_load_component__WEBPACK_IMPORTED_MODULE_18__.DataLoadComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_30__.AsyncPipe], styles: ["ion-content[_ngcontent-%COMP%] {\n  --overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Esa0JBQUE7QUFDQSIsImZpbGUiOiJob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcclxuLS1vdmVyZmxvdzogaGlkZGVuO1xyXG59Il19 */"] });


/***/ }),

/***/ 5557:
/*!*******************************************!*\
  !*** ./src/app/pages/tabs/tabs.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPageModule": function() { return /* binding */ TabsPageModule; }
/* harmony export */ });
/* harmony import */ var _tabs_router_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs.router.module */ 64607);
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs.page */ 64101);
/* harmony import */ var _home_home_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../home/home.module */ 57994);
/* harmony import */ var _trip_trip_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trip/trip.module */ 33736);
/* harmony import */ var _warning_list_warning_list_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../warning-list/warning-list.module */ 51547);
/* harmony import */ var _observation_list_observation_list_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../observation-list/observation-list.module */ 73442);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _components_coach_marks_coach_marks_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/coach-marks/coach-marks.component */ 50645);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);









class TabsPageModule {
}
TabsPageModule.ɵfac = function TabsPageModule_Factory(t) { return new (t || TabsPageModule)(); };
TabsPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: TabsPageModule });
TabsPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _tabs_router_module__WEBPACK_IMPORTED_MODULE_0__.TabsPageRoutingModule,
            _home_home_module__WEBPACK_IMPORTED_MODULE_2__.HomePageModule,
            _trip_trip_module__WEBPACK_IMPORTED_MODULE_3__.TripPageModule,
            _warning_list_warning_list_module__WEBPACK_IMPORTED_MODULE_4__.WarningListPageModule,
            _observation_list_observation_list_module__WEBPACK_IMPORTED_MODULE_5__.ObservationListPageModule,
            _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_6__.SharedModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](TabsPageModule, { declarations: [_tabs_page__WEBPACK_IMPORTED_MODULE_1__.TabsPage, _components_coach_marks_coach_marks_component__WEBPACK_IMPORTED_MODULE_7__.CoachMarksComponent], imports: [_tabs_router_module__WEBPACK_IMPORTED_MODULE_0__.TabsPageRoutingModule,
        _home_home_module__WEBPACK_IMPORTED_MODULE_2__.HomePageModule,
        _trip_trip_module__WEBPACK_IMPORTED_MODULE_3__.TripPageModule,
        _warning_list_warning_list_module__WEBPACK_IMPORTED_MODULE_4__.WarningListPageModule,
        _observation_list_observation_list_module__WEBPACK_IMPORTED_MODULE_5__.ObservationListPageModule,
        _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_6__.SharedModule] }); })();


/***/ }),

/***/ 64101:
/*!*****************************************!*\
  !*** ./src/app/pages/tabs/tabs.page.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPage": function() { return /* binding */ TabsPage; }
/* harmony export */ });
/* harmony import */ var _core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/warning/warning.service */ 90053);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/fullscreen/fullscreen.service */ 13653);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_coach_marks_coach_marks_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/coach-marks/coach-marks.component */ 50645);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function TabsPage_ion_badge_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-badge", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("color", ctx_r0.badgeColor);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.badgeText);
} }
const _c0 = function (a0, a1) { return { "ios": a0, "md": a1 }; };
class TabsPage {
    constructor(fullscreenService, platform, warningService, userSettingService, ngZone) {
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
    get showBadge() {
        return this.warningsInView && this.warningsInView.maxWarning > 0;
    }
    get badgeColor() {
        return 'warninglevel-' + this.warningsInView.maxWarning;
    }
    get badgeText() {
        return `${this.warningsInView.maxWarning}${this.warningsInView.hasEmergencyWarning ? '!' : ''}`;
    }
    ngOnInit() {
        this.warningGroupInMapViewSubscription = this.warningService.warningGroupInMapViewObservable$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((warningsInView) => {
            const allWarnings = [
                ...warningsInView.center,
                ...warningsInView.viewBounds
            ];
            const allMaxWarnings = allWarnings.map((g) => g.getMaxWarning(0));
            const maxWarning = Math.max(...allMaxWarnings.map((x) => x.max));
            const hasEmergencyWarning = allMaxWarnings.some((x) => x.max === maxWarning && x.hasWarning);
            return {
                count: allWarnings.length,
                text: allWarnings.length > 9 ? '9+' : allWarnings.length.toString(),
                maxWarning,
                hasEmergencyWarning
            };
        }))
            .subscribe((val) => {
            this.ngZone.run(() => {
                this.warningsInView = val;
            });
        });
        this.currentGeoHazardSubscription = this.userSettingService.currentGeoHazard$.subscribe((val) => {
            this.ngZone.run(() => {
                this.showTrips = val.indexOf(_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Snow) >= 0;
            });
        });
    }
    ngOnDestroy() {
        this.warningGroupInMapViewSubscription.unsubscribe();
        this.currentGeoHazardSubscription.unsubscribe();
    }
}
TabsPage.ɵfac = function TabsPage_Factory(t) { return new (t || TabsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_1__.FullscreenService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__.WarningService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone)); };
TabsPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TabsPage, selectors: [["app-tabs"]], decls: 20, vars: 17, consts: [["tabbar-highlight", "true", 3, "ngClass"], ["slot", "bottom", 3, "hidden"], ["tab", "home"], ["name", "map"], ["tab", "observation-list"], ["name", "list"], ["tab", "warning-list"], ["name", "warning"], [3, "color", 4, "ngIf"], [3, "color"]], template: function TabsPage_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
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
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTabs, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTabBar, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTabButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _components_coach_marks_coach_marks_component__WEBPACK_IMPORTED_MODULE_3__.CoachMarksComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonBadge], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe], styles: ["[_nghost-%COMP%] {\n  --ion-tab-bar-background: var(--ion-color-varsom-blue);\n  --ion-tab-bar-background-focused: var(--ion-color-varsom-blue-shade);\n  --ion-tab-bar-color: var(--ion-color-varsom-blue-contrast);\n  --ion-tab-bar-color-activated: var(--ion-color-varsom-blue-contrast);\n  --color-selected: var(--ion-tab-bar-color-selected);\n  --ion-tab-bar-color-selected: var(--ion-color-varsom-blue-contrast);\n}\n\nion-tab-button[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  border-radius: 0px;\n}\n\nion-tabs[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%] {\n  opacity: 0.8;\n}\n\nion-tabs[_ngcontent-%COMP%]   ion-tab-button.tab-selected[_ngcontent-%COMP%] {\n  opacity: 1;\n  background-color: var(--ion-color-varsom-blue-shade);\n  color: var(--ion-tab-bar-color-selected);\n}\n\nion-tabs.md[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  margin-top: -3px;\n}\n\nion-tabs.ios[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%] {\n  margin-top: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0RBQUE7RUFDQSxvRUFBQTtFQUNBLDBEQUFBO0VBQ0Esb0VBQUE7RUFDQSxtREFBQTtFQUNBLG1FQUFBO0FBQ0Y7O0FBR0U7RUFDRSxrQkFBQTtBQUFKOztBQUtFO0VBQ0UsWUFBQTtBQUZKOztBQUdJO0VBQ0UsVUFBQTtFQUNBLG9EQUFBO0VBQ0Esd0NBQUE7QUFETjs7QUFPTTtFQUNFLGdCQUFBO0FBTFI7O0FBWU07RUFDRSxlQUFBO0FBVlIiLCJmaWxlIjoidGFicy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgLS1pb24tdGFiLWJhci1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItdmFyc29tLWJsdWUpO1xyXG4gIC0taW9uLXRhYi1iYXItYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS1pb24tY29sb3ItdmFyc29tLWJsdWUtc2hhZGUpO1xyXG4gIC0taW9uLXRhYi1iYXItY29sb3I6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS1jb250cmFzdCk7XHJcbiAgLS1pb24tdGFiLWJhci1jb2xvci1hY3RpdmF0ZWQ6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS1jb250cmFzdCk7XHJcbiAgLS1jb2xvci1zZWxlY3RlZDogdmFyKC0taW9uLXRhYi1iYXItY29sb3Itc2VsZWN0ZWQpO1xyXG4gIC0taW9uLXRhYi1iYXItY29sb3Itc2VsZWN0ZWQ6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS1jb250cmFzdCk7XHJcbn1cclxuXHJcbmlvbi10YWItYnV0dG9uIHtcclxuICBpb24tYmFkZ2Uge1xyXG4gICAgYm9yZGVyLXJhZGl1czogMHB4O1xyXG4gIH1cclxufVxyXG5cclxuaW9uLXRhYnMge1xyXG4gIGlvbi10YWItYnV0dG9uIHtcclxuICAgIG9wYWNpdHk6IDAuODtcclxuICAgICYudGFiLXNlbGVjdGVkIHtcclxuICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1ibHVlLXNoYWRlKTtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi10YWItYmFyLWNvbG9yLXNlbGVjdGVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICYubWQge1xyXG4gICAgaW9uLXRhYi1idXR0b24ge1xyXG4gICAgICBpb24tYmFkZ2Uge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IC0zcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gICYuaW9zIHtcclxuICAgIGlvbi10YWItYnV0dG9uIHtcclxuICAgICAgaW9uLWJhZGdlIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiAzcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 64607:
/*!**************************************************!*\
  !*** ./src/app/pages/tabs/tabs.router.module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPageRoutingModule": function() { return /* binding */ TabsPageRoutingModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs.page */ 64101);
/* harmony import */ var _core_guards_start_wizard_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/guards/start-wizard.guard */ 38526);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);





const routes = [
    {
        path: 'tabs',
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_0__.TabsPage,
        canActivate: [_core_guards_start_wizard_guard__WEBPACK_IMPORTED_MODULE_1__.StartWizardGuard],
        children: [
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../home/home.module */ 57994)).then((m) => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'trip',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../trip/trip.module */ 33736)).then((m) => m.TripPageModule)
                    }
                ]
            },
            {
                path: 'observation-list',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../observation-list/observation-list.module */ 73442)).then((m) => m.ObservationListPageModule)
                    }
                ]
            },
            {
                path: 'warning-list',
                children: [
                    {
                        path: '',
                        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../warning-list/warning-list.module */ 51547)).then((m) => m.WarningListPageModule)
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];
class TabsPageRoutingModule {
}
TabsPageRoutingModule.ɵfac = function TabsPageRoutingModule_Factory(t) { return new (t || TabsPageRoutingModule)(); };
TabsPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TabsPageRoutingModule });
TabsPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TabsPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 33736:
/*!*******************************************!*\
  !*** ./src/app/pages/trip/trip.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TripPageModule": function() { return /* binding */ TripPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _trip_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trip.page */ 61000);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);








const routes = [
    {
        path: '',
        component: _trip_page__WEBPACK_IMPORTED_MODULE_0__.TripPage
    }
];
class TripPageModule {
}
TripPageModule.ɵfac = function TripPageModule_Factory(t) { return new (t || TripPageModule)(); };
TripPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: TripPageModule });
TripPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes),
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](TripPageModule, { declarations: [_trip_page__WEBPACK_IMPORTED_MODULE_0__.TripPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateModule] }); })();


/***/ }),

/***/ 61000:
/*!*****************************************!*\
  !*** ./src/app/pages/trip/trip.page.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TripPage": function() { return /* binding */ TripPage; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 70325);



class TripPage {
}
TripPage.ɵfac = function TripPage_Factory(t) { return new (t || TripPage)(); };
TripPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TripPage, selectors: [["app-trip"]], decls: 26, vars: 3, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "end"], ["slot", "start", "name", "map"], ["slot", "end", "name", "chevron-forward"], ["slot", "start", "name", "walk"]], template: function TripPage_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 1, "TRIP.TITLE"));
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonLabel], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmlwLnBhZ2Uuc2NzcyJ9 */"] });


/***/ }),

/***/ 2410:
/*!*******************************************************************************!*\
  !*** ./src/app/pages/warning-list/abonner-banner/abonner-banner.component.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbonnerBannerComponent": function() { return /* binding */ AbonnerBannerComponent; }
/* harmony export */ });
/* harmony import */ var _core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/external-link/external-link.service */ 11810);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 70325);





class AbonnerBannerComponent {
    constructor(externalLinkService) {
        this.externalLinkService = externalLinkService;
    }
    buttonClicked() {
        this.externalLinkService.openExternalLink('https://abonner.varsom.no');
    }
}
AbonnerBannerComponent.ɵfac = function AbonnerBannerComponent_Factory(t) { return new (t || AbonnerBannerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_0__.ExternalLinkService)); };
AbonnerBannerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AbonnerBannerComponent, selectors: [["app-abonner-banner"]], decls: 12, vars: 12, consts: [[1, "ion-text-uppercase"], ["color", "primary", "fill", "outline", 1, "ion-no-margin", 3, "click"]], template: function AbonnerBannerComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbonnerBannerComponent_Template_ion_button_click_9_listener() { return ctx.buttonClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](11, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 4, "ABONNER_BANNER.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 6, "ABONNER_BANNER.BANNER_TEXT_LINE_1"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 8, "ABONNER_BANNER.BANNER_TEXT_LINE_2"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](11, 10, "ABONNER_BANNER.LINK_TEXT"), "\n");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButton], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe], styles: ["p[_ngcontent-%COMP%] {\n  color: var(--ion-text-color-heading);\n  font-size: 14px;\n  line-height: 140%;\n}\n\nion-button[_ngcontent-%COMP%] {\n  --border-radius: 4px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib25uZXItYmFubmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0NBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFDQTtFQUNFLG9CQUFBO0FBRUYiLCJmaWxlIjoiYWJvbm5lci1iYW5uZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJwIHtcclxuICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3ItaGVhZGluZyk7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxNDAlO1xyXG59XHJcbmlvbi1idXR0b24ge1xyXG4gIC0tYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 51547:
/*!***********************************************************!*\
  !*** ./src/app/pages/warning-list/warning-list.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WarningListPageModule": function() { return /* binding */ WarningListPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _warning_list_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warning-list.page */ 99662);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _components_warning_list_header_warning_list_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/warning-list-header/warning-list-header.component */ 68838);
/* harmony import */ var _components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/warning-list-item/warning-list-item.component */ 44843);
/* harmony import */ var _components_warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/warning-group-favourite-toggle/warning-group-favourite-toggle.component */ 34299);
/* harmony import */ var _abonner_banner_abonner_banner_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./abonner-banner/abonner-banner.component */ 2410);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);









// tslint:disable-next-line:max-line-length




const routes = [
    {
        path: '',
        component: _warning_list_page__WEBPACK_IMPORTED_MODULE_0__.WarningListPage
    }
];
class WarningListPageModule {
}
WarningListPageModule.ɵfac = function WarningListPageModule_Factory(t) { return new (t || WarningListPageModule)(); };
WarningListPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: WarningListPageModule });
WarningListPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule.forChild(routes),
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateModule,
            _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](WarningListPageModule, { declarations: [_warning_list_page__WEBPACK_IMPORTED_MODULE_0__.WarningListPage,
        _components_warning_list_header_warning_list_header_component__WEBPACK_IMPORTED_MODULE_2__.WarningListHeaderComponent,
        _components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_3__.WarningListItemComponent,
        _components_warning_group_favourite_toggle_warning_group_favourite_toggle_component__WEBPACK_IMPORTED_MODULE_4__.WarningGroupFavouriteToggleComponent,
        _abonner_banner_abonner_banner_component__WEBPACK_IMPORTED_MODULE_5__.AbonnerBannerComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateModule,
        _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule] }); })();


/***/ }),

/***/ 99662:
/*!*********************************************************!*\
  !*** ./src/app/pages/warning-list/warning-list.page.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WarningListPage": function() { return /* binding */ WarningListPage; }
/* harmony export */ });
/* harmony import */ var _core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/warning/warning.service */ 90053);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 69606);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 39349);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/warning-list-item/warning-list-item.component */ 44843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/shared/components/header/header.component */ 24201);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component */ 30164);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/shared/components/add-menu/add-menu.component */ 26331);
/* harmony import */ var _modules_shared_components_geo_select_geo_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/shared/components/geo-select/geo-select.component */ 16450);
/* harmony import */ var _components_warning_list_header_warning_list_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/warning-list-header/warning-list-header.component */ 68838);
/* harmony import */ var _abonner_banner_abonner_banner_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./abonner-banner/abonner-banner.component */ 2410);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! angular-svg-icon */ 70459);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ngx-translate/core */ 70325);






















function WarningListPage_ion_virtual_scroll_16_ion_item_divider_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-warning-list-header", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", header_r11.header)("subTitle", header_r11.infoText)("showDayNames", header_r11.showDayNames);
} }
function WarningListPage_ion_virtual_scroll_16_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-warning-list-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const virtialItem_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("warningGroup", virtialItem_r12.item);
} }
function WarningListPage_ion_virtual_scroll_16_ion_item_divider_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "ion-item-divider", 18);
} }
const _c0 = function (a0) { return { "loaded": a0 }; };
function WarningListPage_ion_virtual_scroll_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-virtual-scroll", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, WarningListPage_ion_virtual_scroll_16_ion_item_divider_1_Template, 2, 3, "ion-item-divider", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, WarningListPage_ion_virtual_scroll_16_div_2_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, WarningListPage_ion_virtual_scroll_16_ion_item_divider_3_Template, 1, 0, "ion-item-divider", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](7, _c0, ctx_r0.loaded))("items", ctx_r0.warningGroups)("headerFn", ctx_r0.myHeaderFn)("footerFn", ctx_r0.myFooterFn)("approxItemHeight", 49)("approxHeaderHeight", 38)("trackBy", ctx_r0.trackByFunc);
} }
function WarningListPage_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-abonner-banner");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](1, _c0, ctx_r1.loaded));
} }
function WarningListPage_ng_template_20_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainer"](0);
} }
function WarningListPage_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, WarningListPage_ng_template_20_ng_container_0_Template, 1, 0, "ng-container", 20);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](23);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngTemplateOutlet", ctx_r3.showNoFavourites ? _r4 : _r6);
} }
function WarningListPage_ng_template_22_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 2, "WARNING_LIST.NO_FAVOURITES"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](11, 4, "WARNING_LIST.NO_FAVOURITES_TEXT"));
} }
function WarningListPage_ng_template_24_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 2, "WARNING_LIST.NO_WARNINGS"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](11, 4, "WARNING_LIST.NO_WARNINGS_TEXT"));
} }
class WarningListPage {
    constructor(warningService, userSettingService, ngZone) {
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
    get showNoFavourites() {
        return this.selectedTab === 'favourites' && this.noFavourites;
    }
    get showNoRelevantEmptyState() {
        return this.selectedTab === 'inMapView' && this.noRelevant;
    }
    get showEmptyState() {
        return this.showNoFavourites || this.showNoRelevantEmptyState;
    }
    ngOnInit() {
        this.selectedTab = 'inMapView';
        this.segmentPageSubject = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(this.selectedTab);
        this.segmentPageObservable = this.segmentPageSubject.asObservable();
    }
    closeAllOpen() {
        if (this.warningListItems) {
            for (const item of this.warningListItems.toArray()) {
                item.close();
            }
        }
    }
    ionViewDidEnter() {
        this.ngDestroySubject = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
        this.loaded = false;
        (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([
            this.segmentPageObservable,
            this.userSettingService.currentGeoHazard$
        ])
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.switchMap)(([segment, currentGeoHazard]) => this.getWarningGroupObservable(segment, currentGeoHazard)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroySubject))
            .subscribe((warningGroups) => {
            this.ngZone.run(() => {
                this.closeAllOpen();
                this.warningGroups = warningGroups;
                this.hackToShowVirtualScrollItemsThatIsNotVisibleAtFirstLoad();
            });
        });
        (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([
            this.segmentPageObservable,
            this.userSettingService.currentGeoHazard$
        ])
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroySubject))
            .subscribe(([selectedTab, currentGeoHazard]) => {
            this.ngZone.run(() => {
                this.setTitle(selectedTab, currentGeoHazard);
            });
        });
    }
    hackToShowVirtualScrollItemsThatIsNotVisibleAtFirstLoad() {
        if (!this.loaded && this.warningGroups && this.warningGroups.length > 0) {
            const currentItems = [...this.warningGroups];
            setTimeout(() => {
                this.warningGroups = null;
                setTimeout(() => {
                    // Hack to virtual scroll items not showing at first load
                    this.warningGroups = currentItems;
                    this.loaded = true;
                }, 200);
            }, 200);
        }
    }
    setTitle(selectedTab, currentGeoHazard) {
        if (selectedTab !== 'favourites') {
            this.title = `WARNING_LIST.TITLE_${_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__.GeoHazard[currentGeoHazard[0]].toUpperCase()}`;
        }
        else {
            this.title = 'WARNING_LIST.TITLE';
        }
    }
    refresh(cancelPromise) {
        return this.warningService.updateWarningsForCurrentGeoHazard(cancelPromise);
    }
    getWarningGroupObservable(segment, currentGeoHazard) {
        switch (segment) {
            case 'inMapView':
                return this.getWarningsInMapView();
            case 'all':
                return this.getAllWarnings(currentGeoHazard);
            case 'favourites':
                return this.getFavouritesObservable();
        }
    }
    mapToVirtualScrollItem(wg, header, infoText) {
        return wg.map((item, index) => ({
            header: index === 0 ? header : undefined,
            infoText: index === 0 ? infoText : undefined,
            item
        }));
    }
    getWarningsInMapView() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([
            this.getWarningsInMapViewCenter(),
            this.getWarningsInMapViewBounds(),
            this.getWarningsInMapViewBuffer()
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(([a, b, c]) => [...a, ...b, ...(b.length < 3 ? c : [])]), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.tap)((val) => {
            this.ngZone.run(() => {
                this.noRelevant = val.length === 0;
            });
        }));
    }
    getWarningsInMapViewCenter() {
        return this.warningService.warningGroupInMapViewObservable$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((val) => this.mapToVirtualScrollItem(val.center, 'WARNING_LIST.IN_MAP_CENTER')));
    }
    getWarningsInMapViewBounds() {
        return this.warningService.warningGroupInMapViewObservable$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((val) => this.mapToVirtualScrollItem(val.viewBounds, 'WARNING_LIST.IN_MAP_VIEW')));
    }
    getWarningsInMapViewBuffer() {
        return this.warningService.warningGroupInMapViewObservable$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((val) => this.mapToVirtualScrollItem(val.buffer.filter((wg) => wg.hasAnyWarnings()), 'WARNING_LIST.OTHER_RELEVANT')));
    }
    getAllWarnings(currentGeoHazard) {
        if (currentGeoHazard[0] === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__.GeoHazard.Snow) {
            return this.getSnowRegionWarnings();
        }
        else {
            return this.warningService.warningsForCurrentGeoHazardObservable$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((wg) => this.mapToVirtualScrollItem(wg, 'WARNING_LIST.ALL_WARNINGS')));
        }
    }
    getSnowRegionWarnings() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([
            this.getARegionWarnings(),
            this.getBRegionWarnings()
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(([a, b]) => [...a, ...b]));
    }
    getARegionWarnings() {
        return this.warningService.warningsForCurrentGeoHazardObservable$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((wg) => this.mapToVirtualScrollItem(wg.filter((item) => item.groupType === 'A'), 'WARNING_LIST.A_REGIONS')));
    }
    getBRegionWarnings() {
        return this.warningService.warningsForCurrentGeoHazardObservable$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((wg) => this.mapToVirtualScrollItem(wg.filter((item) => item.groupType === 'B'), 'WARNING_LIST.B_REGIONS', 'WARNING_LIST.B_REGIONS_SUBTITLE')));
    }
    getFavouritesObservable() {
        return this.warningService.getWarningGroupFavouritesObservable().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.tap)((val) => {
            this.ngZone.run(() => {
                this.noFavourites = val.length === 0;
            });
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((warningGroups) => this.mapToVirtualScrollItem(warningGroups, 'WARNING_LIST.FAVOURITES')));
    }
    myHeaderFn(item, index, items) {
        return item.header
            ? {
                header: item.header,
                infoText: item.infoText,
                showDayNames: items.some((x) => x.item.key.geoHazard !== _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__.GeoHazard.Ice)
            }
            : null;
    }
    footerFn(item, index, items) {
        if (this.selectedTab !== 'inMapView' && index === items.length - 1) {
            return 'footer';
        }
    }
    trackByInternal(_, item) {
        return item && item.item ? item.item.getKeyAsString() : undefined;
    }
    ionViewWillLeave() {
        this.closeAllOpen();
        this.ngDestroySubject.next();
        this.ngDestroySubject.complete();
    }
    onSegmentChange() {
        this.segmentPageSubject.next(this.selectedTab);
    }
}
WarningListPage.ɵfac = function WarningListPage_Factory(t) { return new (t || WarningListPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_warning_warning_service__WEBPACK_IMPORTED_MODULE_0__.WarningService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone)); };
WarningListPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: WarningListPage, selectors: [["app-warning-list"]], viewQuery: function WarningListPage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_2__.WarningListItemComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.warningListItems = _t);
    } }, decls: 26, vars: 15, consts: [[3, "title"], ["mode", "md", "slot", "fixed", 3, "ngModel", "ngModelChange"], ["mode", "md", "value", "inMapView"], ["mode", "md", "value", "all"], ["mode", "md", "value", "favourites"], [3, "refreshFunc"], [3, "ngClass", "items", "headerFn", "footerFn", "approxItemHeight", "approxHeaderHeight", "trackBy", 4, "ngIf", "ngIfElse"], ["id", "abonner-banner", "class", "ion-margin", 3, "ngClass", 4, "ngIf"], ["slot", "fixed"], ["empty", ""], ["emptyFavourites", ""], ["emptyRelevant", ""], [3, "ngClass", "items", "headerFn", "footerFn", "approxItemHeight", "approxHeaderHeight", "trackBy"], [4, "virtualHeader"], [4, "virtualItem"], ["class", "virtual-list-footer", 4, "virtualFooter"], [3, "title", "subTitle", "showDayNames"], [3, "warningGroup"], [1, "virtual-list-footer"], ["id", "abonner-banner", 1, "ion-margin", 3, "ngClass"], [4, "ngTemplateOutlet"], [1, "full-grid"], [1, "full-grid-row"], [1, "ion-text-center", "ion-align-self-center"], ["src", "/assets/images/empty-states/no-favourites.svg"], [1, "ion-text-center", "ion-margin-horizontal"], [1, "ion-text-wrap"], ["src", "/assets/images/empty-states/no-warnings.svg"]], template: function WarningListPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-segment", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function WarningListPage_Template_ion_segment_ngModelChange_1_listener($event) { return ctx.selectedTab = $event; })("ngModelChange", function WarningListPage_Template_ion_segment_ngModelChange_1_listener() { return ctx.onSegmentChange(); });
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
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](21);
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
    } }, directives: [_modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_3__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonSegment, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonSegmentButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_4__.RefreshWithCancelComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_5__.AddMenuComponent, _modules_shared_components_geo_select_geo_select_component__WEBPACK_IMPORTED_MODULE_6__.GeoSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonVirtualScroll, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.VirtualHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.VirtualItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.VirtualFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonItemDivider, _components_warning_list_header_warning_list_header_component__WEBPACK_IMPORTED_MODULE_7__.WarningListHeaderComponent, _components_warning_list_item_warning_list_item_component__WEBPACK_IMPORTED_MODULE_2__.WarningListItemComponent, _abonner_banner_abonner_banner_component__WEBPACK_IMPORTED_MODULE_8__.AbonnerBannerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgTemplateOutlet, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonCol, angular_svg_icon__WEBPACK_IMPORTED_MODULE_21__.SvgIconComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslatePipe], styles: ["ion-refresher[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%] {\n  background-color: #fff;\n  background-color: var(--ion-background-color, #fff);\n}\n\nion-virtual-scroll[_ngcontent-%COMP%], #abonner-banner[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 1s linear;\n}\n\nion-virtual-scroll.loaded[_ngcontent-%COMP%], #abonner-banner.loaded[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\nion-item-divider[_ngcontent-%COMP%]   app-warning-list-header[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.virtual-list-footer[_ngcontent-%COMP%] {\n  height: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmctbGlzdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsc0JBQUE7RUFBQSxtREFBQTtBQUNGOztBQUVBOztFQUVFLFVBQUE7RUFDQSw2QkFBQTtBQUNGOztBQUNFOztFQUNFLFVBQUE7QUFFSjs7QUFFRTtFQUNFLFdBQUE7QUFDSjs7QUFHQTtFQUNFLFlBQUE7QUFBRiIsImZpbGUiOiJ3YXJuaW5nLWxpc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXJlZnJlc2hlcixcclxuaW9uLWNvbnRlbnQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yLCAjZmZmKTtcclxufVxyXG5cclxuaW9uLXZpcnR1YWwtc2Nyb2xsLFxyXG4jYWJvbm5lci1iYW5uZXIge1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAxcyBsaW5lYXI7XHJcblxyXG4gICYubG9hZGVkIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG59XHJcbmlvbi1pdGVtLWRpdmlkZXIge1xyXG4gIGFwcC13YXJuaW5nLWxpc3QtaGVhZGVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxufVxyXG5cclxuLnZpcnR1YWwtbGlzdC1mb290ZXIge1xyXG4gIGhlaWdodDogNTBweDtcclxufVxyXG4iXX0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9wYWdlc190YWJzX3RhYnNfbW9kdWxlX3RzLWVzMjAxNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxLQUE0RDtBQUM3RCxDQUFDLENBQzhHO0FBQy9HLENBQUMsNEJBQTRCOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IsMENBQTBDOztBQUV6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsY0FBYztBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsY0FBYztBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLGNBQWM7O0FBRXpDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsY0FBYztBQUM3QztBQUNBOztBQUVBO0FBQ0E7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QUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLCtEQUErRDtBQUNyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsMEJBQTBCLG9IQUFvSDtBQUM5SSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsV0FBVztBQUM5QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLHNDQUFzQyxRQUFRO0FBQzlDOztBQUVBLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxL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SSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OzhFQTFSVSxlQUFlOzZHQUFmLGVBQWU7a0VBY1osK0dBQXdCOzs7OztRQ3JDeEMsMkVBQXlDO1FBQ3pDLGlGQUFrRztRQUE5RCw4TEFBeUIsb0dBQWtCLHFCQUFpQixJQUFuQztRQUMzRCx3RkFBZ0Q7UUFDOUMsNEVBQVc7UUFBQSx1REFBcUM7O1FBQUEsNERBQVk7UUFDOUQsNERBQXFCO1FBQ3JCLHdGQUEwQztRQUN4Qyw0RUFBVztRQUFBLHVEQUFnQzs7UUFBQSw0REFBWTtRQUN6RCw0REFBcUI7UUFDckIseUZBQWlEO1FBQy9DLDZFQUFXO1FBQUEsd0RBQXVDOztRQUFBLDREQUFZO1FBQ2hFLDREQUFxQjtRQUN2Qiw0REFBYztRQUNkLCtFQUFhO1FBQ1gseUZBQStFO1FBQy9FLDJJQVlxQjtRQUNyQiw2R0FFTTtRQUNSLDREQUFjO1FBQ2QsMkVBQTZCO1FBQzdCLGdGQUE4QztRQUM5Qyx5TUFFYztRQUNkLDJNQWNjO1FBQ2QsMk1BY2M7OztRQWpFRiw0RUFBZTtRQUNTLDBEQUF5QjtRQUF6QixvRkFBeUI7UUFFOUMsMERBQXFDO1FBQXJDLHlKQUFxQztRQUdyQywwREFBZ0M7UUFBaEMscUpBQWdDO1FBR2hDLDBEQUF1QztRQUF2Qyw2SkFBdUM7UUFJM0IsMERBQTJCO1FBQTNCLHdGQUEyQjtRQUMvQiwwREFBc0I7UUFBdEIscUZBQXNCO1FBYWpCLDBEQUFpQztRQUFqQyxpR0FBaUMiLCJzb3VyY2VzIjpbIi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQubWFya2VyY2x1c3Rlci9kaXN0L2xlYWZsZXQubWFya2VyY2x1c3Rlci1zcmMuanMiLCIuL3NyYy9hcHAvY29tcG9uZW50cy9jb2FjaC1tYXJrcy9jb2FjaC1tYXJrcy5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvY29tcG9uZW50cy9jb2FjaC1tYXJrcy9jb2FjaC1tYXJrcy5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9jb21wb25lbnRzL21hcC1pdGVtLWJhci9tYXAtaXRlbS1iYXIuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL2NvbXBvbmVudHMvbWFwLWl0ZW0tYmFyL21hcC1pdGVtLWJhci5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9jb21wb25lbnRzL3dhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS93YXJuaW5nLWdyb3VwLWZhdm91cml0ZS10b2dnbGUuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL2NvbXBvbmVudHMvd2FybmluZy1ncm91cC1mYXZvdXJpdGUtdG9nZ2xlL3dhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9jb21wb25lbnRzL3dhcm5pbmctbGlzdC1oZWFkZXIvd2FybmluZy1saXN0LWhlYWRlci5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvY29tcG9uZW50cy93YXJuaW5nLWxpc3QtaGVhZGVyL3dhcm5pbmctbGlzdC1oZWFkZXIuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvY29tcG9uZW50cy93YXJuaW5nLWxpc3QtaXRlbS93YXJuaW5nLWxpc3QtaXRlbS5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvY29tcG9uZW50cy93YXJuaW5nLWxpc3QtaXRlbS93YXJuaW5nLWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9jb3JlL2hlbHBlcnMvbGVhZmxldC9tYXAtaXRlbS1tYXJrZXIvbWFwLWl0ZW0tbWFya2VyLnRzIiwiLi9zcmMvYXBwL2NvcmUvaGVscGVycy9yb3V0ZWQtcGFnZS50cyIsIi4vc3JjL2FwcC9jb3JlL3NlcnZpY2VzL3VzYWdlLWFuYWx5dGljcy1jb25zZW50L3VzYWdlLWFuYWx5dGljcy1jb25zZW50LnNlcnZpY2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9kYXRhLWxvYWQvY29tcG9uZW50cy9kYXRhLWxvYWQvZGF0YS1sb2FkLmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL2RhdGEtbG9hZC9jb21wb25lbnRzL2RhdGEtbG9hZC9kYXRhLWxvYWQuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9kYXRhLWxvYWQvZGF0YS1sb2FkLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL21hcC9oZWxwZXJzL2xlYWZsZXQtY2x1c2VyLmhlbHBlci50cyIsIi4vc3JjL2FwcC9wYWdlcy9ob21lL2hvbWUubW9kdWxlLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL2hvbWUvaG9tZS5wYWdlLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL2hvbWUvaG9tZS5wYWdlLmh0bWwiLCIuL3NyYy9hcHAvcGFnZXMvdGFicy90YWJzLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9wYWdlcy90YWJzL3RhYnMucGFnZS50cyIsIi4vc3JjL2FwcC9wYWdlcy90YWJzL3RhYnMucGFnZS5odG1sIiwiLi9zcmMvYXBwL3BhZ2VzL3RhYnMvdGFicy5yb3V0ZXIubW9kdWxlLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL3RyaXAvdHJpcC5tb2R1bGUudHMiLCIuL3NyYy9hcHAvcGFnZXMvdHJpcC90cmlwLnBhZ2UudHMiLCIuL3NyYy9hcHAvcGFnZXMvdHJpcC90cmlwLnBhZ2UuaHRtbCIsIi4vc3JjL2FwcC9wYWdlcy93YXJuaW5nLWxpc3QvYWJvbm5lci1iYW5uZXIvYWJvbm5lci1iYW5uZXIuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL3BhZ2VzL3dhcm5pbmctbGlzdC9hYm9ubmVyLWJhbm5lci9hYm9ubmVyLWJhbm5lci5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9wYWdlcy93YXJuaW5nLWxpc3Qvd2FybmluZy1saXN0Lm1vZHVsZS50cyIsIi4vc3JjL2FwcC9wYWdlcy93YXJuaW5nLWxpc3Qvd2FybmluZy1saXN0LnBhZ2UudHMiLCIuL3NyYy9hcHAvcGFnZXMvd2FybmluZy1saXN0L3dhcm5pbmctbGlzdC5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIExlYWZsZXQubWFya2VyY2x1c3RlciAxLjUuMSttYXN0ZXIuMDFlNzRlYyxcbiAqIFByb3ZpZGVzIEJlYXV0aWZ1bCBBbmltYXRlZCBNYXJrZXIgQ2x1c3RlcmluZyBmdW5jdGlvbmFsaXR5IGZvciBMZWFmbGV0LCBhIEpTIGxpYnJhcnkgZm9yIGludGVyYWN0aXZlIG1hcHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0Lm1hcmtlcmNsdXN0ZXJcbiAqIChjKSAyMDEyLTIwMTcsIERhdmUgTGVhdmVyLCBzbWFydHJha1xuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZmFjdG9yeSgoZ2xvYmFsLkxlYWZsZXQgPSBnbG9iYWwuTGVhZmxldCB8fCB7fSwgZ2xvYmFsLkxlYWZsZXQubWFya2VyY2x1c3RlciA9IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cblx0Lypcblx0ICogTC5NYXJrZXJDbHVzdGVyR3JvdXAgZXh0ZW5kcyBMLkZlYXR1cmVHcm91cCBieSBjbHVzdGVyaW5nIHRoZSBtYXJrZXJzIGNvbnRhaW5lZCB3aXRoaW5cblx0ICovXG5cblx0dmFyIE1hcmtlckNsdXN0ZXJHcm91cCA9IEwuTWFya2VyQ2x1c3Rlckdyb3VwID0gTC5GZWF0dXJlR3JvdXAuZXh0ZW5kKHtcblxuXHRcdG9wdGlvbnM6IHtcblx0XHRcdG1heENsdXN0ZXJSYWRpdXM6IDgwLCAvL0EgY2x1c3RlciB3aWxsIGNvdmVyIGF0IG1vc3QgdGhpcyBtYW55IHBpeGVscyBmcm9tIGl0cyBjZW50ZXJcblx0XHRcdGljb25DcmVhdGVGdW5jdGlvbjogbnVsbCxcblx0XHRcdGNsdXN0ZXJQYW5lOiBMLk1hcmtlci5wcm90b3R5cGUub3B0aW9ucy5wYW5lLFxuXG5cdFx0XHRzcGlkZXJmeU9uTWF4Wm9vbTogdHJ1ZSxcblx0XHRcdHNob3dDb3ZlcmFnZU9uSG92ZXI6IHRydWUsXG5cdFx0XHR6b29tVG9Cb3VuZHNPbkNsaWNrOiB0cnVlLFxuXHRcdFx0c2luZ2xlTWFya2VyTW9kZTogZmFsc2UsXG5cblx0XHRcdGRpc2FibGVDbHVzdGVyaW5nQXRab29tOiBudWxsLFxuXG5cdFx0XHQvLyBTZXR0aW5nIHRoaXMgdG8gZmFsc2UgcHJldmVudHMgdGhlIHJlbW92YWwgb2YgYW55IGNsdXN0ZXJzIG91dHNpZGUgb2YgdGhlIHZpZXdwb2ludCwgd2hpY2hcblx0XHRcdC8vIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy5cblx0XHRcdHJlbW92ZU91dHNpZGVWaXNpYmxlQm91bmRzOiB0cnVlLFxuXG5cdFx0XHQvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSBhbGwgYW5pbWF0aW9ucyAoem9vbSBhbmQgc3BpZGVyZnkpLlxuXHRcdFx0Ly8gSWYgZmFsc2UsIG9wdGlvbiBhbmltYXRlQWRkaW5nTWFya2VycyBiZWxvdyBoYXMgbm8gZWZmZWN0LlxuXHRcdFx0Ly8gSWYgTC5Eb21VdGlsLlRSQU5TSVRJT04gaXMgZmFsc3ksIHRoaXMgb3B0aW9uIGhhcyBubyBlZmZlY3QuXG5cdFx0XHRhbmltYXRlOiB0cnVlLFxuXG5cdFx0XHQvL1doZXRoZXIgdG8gYW5pbWF0ZSBhZGRpbmcgbWFya2VycyBhZnRlciBhZGRpbmcgdGhlIE1hcmtlckNsdXN0ZXJHcm91cCB0byB0aGUgbWFwXG5cdFx0XHQvLyBJZiB5b3UgYXJlIGFkZGluZyBpbmRpdmlkdWFsIG1hcmtlcnMgc2V0IHRvIHRydWUsIGlmIGFkZGluZyBidWxrIG1hcmtlcnMgbGVhdmUgZmFsc2UgZm9yIG1hc3NpdmUgcGVyZm9ybWFuY2UgZ2FpbnMuXG5cdFx0XHRhbmltYXRlQWRkaW5nTWFya2VyczogZmFsc2UsXG5cblx0XHRcdC8vIE1ha2UgaXQgcG9zc2libGUgdG8gcHJvdmlkZSBjdXN0b20gZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHNwaWRlcmZ5IHNoYXBlIHBvc2l0aW9uc1xuXHRcdFx0c3BpZGVyZnlTaGFwZVBvc2l0aW9uczogbnVsbCxcblxuXHRcdFx0Ly9JbmNyZWFzZSB0byBpbmNyZWFzZSB0aGUgZGlzdGFuY2UgYXdheSB0aGF0IHNwaWRlcmZpZWQgbWFya2VycyBhcHBlYXIgZnJvbSB0aGUgY2VudGVyXG5cdFx0XHRzcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllcjogMSxcblxuXHRcdFx0Ly8gTWFrZSBpdCBwb3NzaWJsZSB0byBzcGVjaWZ5IGEgcG9seWxpbmUgb3B0aW9ucyBvbiBhIHNwaWRlciBsZWdcblx0XHRcdHNwaWRlckxlZ1BvbHlsaW5lT3B0aW9uczogeyB3ZWlnaHQ6IDEuNSwgY29sb3I6ICcjMjIyJywgb3BhY2l0eTogMC41IH0sXG5cblx0XHRcdC8vIFdoZW4gYnVsayBhZGRpbmcgbGF5ZXJzLCBhZGRzIG1hcmtlcnMgaW4gY2h1bmtzLiBNZWFucyBhZGRMYXllcnMgbWF5IG5vdCBhZGQgYWxsIHRoZSBsYXllcnMgaW4gdGhlIGNhbGwsIG90aGVycyB3aWxsIGJlIGxvYWRlZCBkdXJpbmcgc2V0VGltZW91dHNcblx0XHRcdGNodW5rZWRMb2FkaW5nOiBmYWxzZSxcblx0XHRcdGNodW5rSW50ZXJ2YWw6IDIwMCwgLy8gcHJvY2VzcyBtYXJrZXJzIGZvciBhIG1heGltdW0gb2YgfiBuIG1pbGxpc2Vjb25kcyAodGhlbiB0cmlnZ2VyIHRoZSBjaHVua1Byb2dyZXNzIGNhbGxiYWNrKVxuXHRcdFx0Y2h1bmtEZWxheTogNTAsIC8vIGF0IHRoZSBlbmQgb2YgZWFjaCBpbnRlcnZhbCwgZ2l2ZSBuIG1pbGxpc2Vjb25kcyBiYWNrIHRvIHN5c3RlbS9icm93c2VyXG5cdFx0XHRjaHVua1Byb2dyZXNzOiBudWxsLCAvLyBwcm9ncmVzcyBjYWxsYmFjazogZnVuY3Rpb24ocHJvY2Vzc2VkLCB0b3RhbCwgZWxhcHNlZCkgKGUuZy4gZm9yIGEgcHJvZ3Jlc3MgaW5kaWNhdG9yKVxuXG5cdFx0XHQvL09wdGlvbnMgdG8gcGFzcyB0byB0aGUgTC5Qb2x5Z29uIGNvbnN0cnVjdG9yXG5cdFx0XHRwb2x5Z29uT3B0aW9uczoge31cblx0XHR9LFxuXG5cdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRcdEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMuaWNvbkNyZWF0ZUZ1bmN0aW9uKSB7XG5cdFx0XHRcdHRoaXMub3B0aW9ucy5pY29uQ3JlYXRlRnVuY3Rpb24gPSB0aGlzLl9kZWZhdWx0SWNvbkNyZWF0ZUZ1bmN0aW9uO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9mZWF0dXJlR3JvdXAgPSBMLmZlYXR1cmVHcm91cCgpO1xuXHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG5cdFx0XHR0aGlzLl9ub25Qb2ludEdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcblx0XHRcdHRoaXMuX25vblBvaW50R3JvdXAuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cblx0XHRcdHRoaXMuX2luWm9vbUFuaW1hdGlvbiA9IDA7XG5cdFx0XHR0aGlzLl9uZWVkc0NsdXN0ZXJpbmcgPSBbXTtcblx0XHRcdHRoaXMuX25lZWRzUmVtb3ZpbmcgPSBbXTsgLy9NYXJrZXJzIHJlbW92ZWQgd2hpbGUgd2UgYXJlbid0IG9uIHRoZSBtYXAgbmVlZCB0byBiZSBrZXB0IHRyYWNrIG9mXG5cdFx0XHQvL1RoZSBib3VuZHMgb2YgdGhlIGN1cnJlbnRseSBzaG93biBhcmVhIChmcm9tIF9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMpIFVwZGF0ZWQgb24gem9vbS9tb3ZlXG5cdFx0XHR0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMgPSBudWxsO1xuXG5cdFx0XHR0aGlzLl9xdWV1ZSA9IFtdO1xuXG5cdFx0XHR0aGlzLl9jaGlsZE1hcmtlckV2ZW50SGFuZGxlcnMgPSB7XG5cdFx0XHRcdCdkcmFnc3RhcnQnOiB0aGlzLl9jaGlsZE1hcmtlckRyYWdTdGFydCxcblx0XHRcdFx0J21vdmUnOiB0aGlzLl9jaGlsZE1hcmtlck1vdmVkLFxuXHRcdFx0XHQnZHJhZ2VuZCc6IHRoaXMuX2NoaWxkTWFya2VyRHJhZ0VuZCxcblx0XHRcdH07XG5cblx0XHRcdC8vIEhvb2sgdGhlIGFwcHJvcHJpYXRlIGFuaW1hdGlvbiBtZXRob2RzLlxuXHRcdFx0dmFyIGFuaW1hdGUgPSBMLkRvbVV0aWwuVFJBTlNJVElPTiAmJiB0aGlzLm9wdGlvbnMuYW5pbWF0ZTtcblx0XHRcdEwuZXh0ZW5kKHRoaXMsIGFuaW1hdGUgPyB0aGlzLl93aXRoQW5pbWF0aW9uIDogdGhpcy5fbm9BbmltYXRpb24pO1xuXHRcdFx0Ly8gUmVtZW1iZXIgd2hpY2ggTWFya2VyQ2x1c3RlciBjbGFzcyB0byBpbnN0YW50aWF0ZSAoYW5pbWF0ZWQgb3Igbm90KS5cblx0XHRcdHRoaXMuX21hcmtlckNsdXN0ZXIgPSBhbmltYXRlID8gTC5NYXJrZXJDbHVzdGVyIDogTC5NYXJrZXJDbHVzdGVyTm9uQW5pbWF0ZWQ7XG5cdFx0fSxcblxuXHRcdGFkZExheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcblxuXHRcdFx0aWYgKGxheWVyIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmFkZExheWVycyhbbGF5ZXJdKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9Eb24ndCBjbHVzdGVyIG5vbiBwb2ludCBkYXRhXG5cdFx0XHRpZiAoIWxheWVyLmdldExhdExuZykge1xuXHRcdFx0XHR0aGlzLl9ub25Qb2ludEdyb3VwLmFkZExheWVyKGxheWVyKTtcblx0XHRcdFx0dGhpcy5maXJlKCdsYXllcmFkZCcsIHsgbGF5ZXI6IGxheWVyIH0pO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF0aGlzLl9tYXApIHtcblx0XHRcdFx0dGhpcy5fbmVlZHNDbHVzdGVyaW5nLnB1c2gobGF5ZXIpO1xuXHRcdFx0XHR0aGlzLmZpcmUoJ2xheWVyYWRkJywgeyBsYXllcjogbGF5ZXIgfSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5oYXNMYXllcihsYXllcikpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cblxuXHRcdFx0Ly9JZiB3ZSBoYXZlIGFscmVhZHkgY2x1c3RlcmVkIHdlJ2xsIG5lZWQgdG8gYWRkIHRoaXMgb25lIHRvIGEgY2x1c3RlclxuXG5cdFx0XHRpZiAodGhpcy5fdW5zcGlkZXJmeSkge1xuXHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2FkZExheWVyKGxheWVyLCB0aGlzLl9tYXhab29tKTtcblx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJhZGQnLCB7IGxheWVyOiBsYXllciB9KTtcblxuXHRcdFx0Ly8gUmVmcmVzaCBib3VuZHMgYW5kIHdlaWdodGVkIHBvc2l0aW9ucy5cblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjYWxjdWxhdGVCb3VuZHMoKTtcblxuXHRcdFx0dGhpcy5fcmVmcmVzaENsdXN0ZXJzSWNvbnMoKTtcblxuXHRcdFx0Ly9Xb3JrIG91dCB3aGF0IGlzIHZpc2libGVcblx0XHRcdHZhciB2aXNpYmxlTGF5ZXIgPSBsYXllcixcblx0XHRcdCAgICBjdXJyZW50Wm9vbSA9IHRoaXMuX3pvb207XG5cdFx0XHRpZiAobGF5ZXIuX19wYXJlbnQpIHtcblx0XHRcdFx0d2hpbGUgKHZpc2libGVMYXllci5fX3BhcmVudC5fem9vbSA+PSBjdXJyZW50Wm9vbSkge1xuXHRcdFx0XHRcdHZpc2libGVMYXllciA9IHZpc2libGVMYXllci5fX3BhcmVudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fY3VycmVudFNob3duQm91bmRzLmNvbnRhaW5zKHZpc2libGVMYXllci5nZXRMYXRMbmcoKSkpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5hbmltYXRlQWRkaW5nTWFya2Vycykge1xuXHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvbkFkZExheWVyKGxheWVyLCB2aXNpYmxlTGF5ZXIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvbkFkZExheWVyTm9uQW5pbWF0ZWQobGF5ZXIsIHZpc2libGVMYXllcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRyZW1vdmVMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG5cblx0XHRcdGlmIChsYXllciBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW1vdmVMYXllcnMoW2xheWVyXSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vTm9uIHBvaW50IGxheWVyc1xuXHRcdFx0aWYgKCFsYXllci5nZXRMYXRMbmcpIHtcblx0XHRcdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5yZW1vdmVMYXllcihsYXllcik7XG5cdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBsYXllciB9KTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy5fbWFwKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fYXJyYXlTcGxpY2UodGhpcy5fbmVlZHNDbHVzdGVyaW5nLCBsYXllcikgJiYgdGhpcy5oYXNMYXllcihsYXllcikpIHtcblx0XHRcdFx0XHR0aGlzLl9uZWVkc1JlbW92aW5nLnB1c2goeyBsYXllcjogbGF5ZXIsIGxhdGxuZzogbGF5ZXIuX2xhdGxuZyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmZpcmUoJ2xheWVycmVtb3ZlJywgeyBsYXllcjogbGF5ZXIgfSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWxheWVyLl9fcGFyZW50KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdW5zcGlkZXJmeSkge1xuXHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XG5cdFx0XHRcdHRoaXMuX3Vuc3BpZGVyZnlMYXllcihsYXllcik7XG5cdFx0XHR9XG5cblx0XHRcdC8vUmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSBjbHVzdGVyc1xuXHRcdFx0dGhpcy5fcmVtb3ZlTGF5ZXIobGF5ZXIsIHRydWUpO1xuXHRcdFx0dGhpcy5maXJlKCdsYXllcnJlbW92ZScsIHsgbGF5ZXI6IGxheWVyIH0pO1xuXG5cdFx0XHQvLyBSZWZyZXNoIGJvdW5kcyBhbmQgd2VpZ2h0ZWQgcG9zaXRpb25zLlxuXHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWNhbGN1bGF0ZUJvdW5kcygpO1xuXG5cdFx0XHR0aGlzLl9yZWZyZXNoQ2x1c3RlcnNJY29ucygpO1xuXG5cdFx0XHRsYXllci5vZmYodGhpcy5fY2hpbGRNYXJrZXJFdmVudEhhbmRsZXJzLCB0aGlzKTtcblxuXHRcdFx0aWYgKHRoaXMuX2ZlYXR1cmVHcm91cC5oYXNMYXllcihsYXllcikpIHtcblx0XHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLnJlbW92ZUxheWVyKGxheWVyKTtcblx0XHRcdFx0aWYgKGxheWVyLmNsdXN0ZXJTaG93KSB7XG5cdFx0XHRcdFx0bGF5ZXIuY2x1c3RlclNob3coKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Ly9UYWtlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGFuZCBhZGRzIHRoZW0gaW4gYnVsa1xuXHRcdGFkZExheWVyczogZnVuY3Rpb24gKGxheWVyc0FycmF5LCBza2lwTGF5ZXJBZGRFdmVudCkge1xuXHRcdFx0aWYgKCFMLlV0aWwuaXNBcnJheShsYXllcnNBcnJheSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWRkTGF5ZXIobGF5ZXJzQXJyYXkpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZmcgPSB0aGlzLl9mZWF0dXJlR3JvdXAsXG5cdFx0XHQgICAgbnBnID0gdGhpcy5fbm9uUG9pbnRHcm91cCxcblx0XHRcdCAgICBjaHVua2VkID0gdGhpcy5vcHRpb25zLmNodW5rZWRMb2FkaW5nLFxuXHRcdFx0ICAgIGNodW5rSW50ZXJ2YWwgPSB0aGlzLm9wdGlvbnMuY2h1bmtJbnRlcnZhbCxcblx0XHRcdCAgICBjaHVua1Byb2dyZXNzID0gdGhpcy5vcHRpb25zLmNodW5rUHJvZ3Jlc3MsXG5cdFx0XHQgICAgbCA9IGxheWVyc0FycmF5Lmxlbmd0aCxcblx0XHRcdCAgICBvZmZzZXQgPSAwLFxuXHRcdFx0ICAgIG9yaWdpbmFsQXJyYXkgPSB0cnVlLFxuXHRcdFx0ICAgIG07XG5cblx0XHRcdGlmICh0aGlzLl9tYXApIHtcblx0XHRcdFx0dmFyIHN0YXJ0ZWQgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRcdFx0XHR2YXIgcHJvY2VzcyA9IEwuYmluZChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIHN0YXJ0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0byB1bnNwaWRlcmZ5IGJlZm9yZSBzdGFydGluZyB0byBhZGQgc29tZSBsYXllcnNcblx0XHRcdFx0XHRpZiAodGhpcy5fbWFwICYmIHRoaXMuX3Vuc3BpZGVyZnkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3Vuc3BpZGVyZnkoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKDsgb2Zmc2V0IDwgbDsgb2Zmc2V0KyspIHtcblx0XHRcdFx0XHRcdGlmIChjaHVua2VkICYmIG9mZnNldCAlIDIwMCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHQvLyBldmVyeSBjb3VwbGUgaHVuZHJlZCBtYXJrZXJzLCBpbnN0cnVtZW50IHRoZSB0aW1lIGVsYXBzZWQgc2luY2UgcHJvY2Vzc2luZyBzdGFydGVkOlxuXHRcdFx0XHRcdFx0XHR2YXIgZWxhcHNlZCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSBzdGFydDtcblx0XHRcdFx0XHRcdFx0aWYgKGVsYXBzZWQgPiBjaHVua0ludGVydmFsKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7IC8vIGJlZW4gd29ya2luZyB0b28gaGFyZCwgdGltZSB0byB0YWtlIGEgYnJlYWsgOi0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bSA9IGxheWVyc0FycmF5W29mZnNldF07XG5cblx0XHRcdFx0XHRcdC8vIEdyb3VwIG9mIGxheWVycywgYXBwZW5kIGNoaWxkcmVuIHRvIGxheWVyc0FycmF5IGFuZCBza2lwLlxuXHRcdFx0XHRcdFx0Ly8gU2lkZSBlZmZlY3RzOlxuXHRcdFx0XHRcdFx0Ly8gLSBUb3RhbCBpbmNyZWFzZXMsIHNvIGNodW5rUHJvZ3Jlc3MgcmF0aW8ganVtcHMgYmFja3dhcmQuXG5cdFx0XHRcdFx0XHQvLyAtIEdyb3VwcyBhcmUgbm90IGluY2x1ZGVkIGluIHRoaXMgZ3JvdXAsIG9ubHkgdGhlaXIgbm9uLWdyb3VwIGNoaWxkIGxheWVycyAoaGFzTGF5ZXIpLlxuXHRcdFx0XHRcdFx0Ly8gQ2hhbmdpbmcgYXJyYXkgbGVuZ3RoIHdoaWxlIGxvb3BpbmcgZG9lcyBub3QgYWZmZWN0IHBlcmZvcm1hbmNlIGluIGN1cnJlbnQgYnJvd3NlcnM6XG5cdFx0XHRcdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS9mb3ItbG9vcC1jaGFuZ2luZy1sZW5ndGgvNlxuXHRcdFx0XHRcdFx0aWYgKG0gaW5zdGFuY2VvZiBMLkxheWVyR3JvdXApIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9yaWdpbmFsQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0XHRsYXllcnNBcnJheSA9IGxheWVyc0FycmF5LnNsaWNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhtLCBsYXllcnNBcnJheSk7XG5cdFx0XHRcdFx0XHRcdGwgPSBsYXllcnNBcnJheS5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvL05vdCBwb2ludCBkYXRhLCBjYW4ndCBiZSBjbHVzdGVyZWRcblx0XHRcdFx0XHRcdGlmICghbS5nZXRMYXRMbmcpIHtcblx0XHRcdFx0XHRcdFx0bnBnLmFkZExheWVyKG0pO1xuXHRcdFx0XHRcdFx0XHRpZiAoIXNraXBMYXllckFkZEV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5maXJlKCdsYXllcmFkZCcsIHsgbGF5ZXI6IG0gfSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICh0aGlzLmhhc0xheWVyKG0pKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLl9hZGRMYXllcihtLCB0aGlzLl9tYXhab29tKTtcblx0XHRcdFx0XHRcdGlmICghc2tpcExheWVyQWRkRXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5maXJlKCdsYXllcmFkZCcsIHsgbGF5ZXI6IG0gfSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vSWYgd2UganVzdCBtYWRlIGEgY2x1c3RlciBvZiBzaXplIDIgdGhlbiB3ZSBuZWVkIHRvIHJlbW92ZSB0aGUgb3RoZXIgbWFya2VyIGZyb20gdGhlIG1hcCAoaWYgaXQgaXMpIG9yIHdlIG5ldmVyIHdpbGxcblx0XHRcdFx0XHRcdGlmIChtLl9fcGFyZW50KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChtLl9fcGFyZW50LmdldENoaWxkQ291bnQoKSA9PT0gMikge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBtYXJrZXJzID0gbS5fX3BhcmVudC5nZXRBbGxDaGlsZE1hcmtlcnMoKSxcblx0XHRcdFx0XHRcdFx0XHQgICAgb3RoZXJNYXJrZXIgPSBtYXJrZXJzWzBdID09PSBtID8gbWFya2Vyc1sxXSA6IG1hcmtlcnNbMF07XG5cdFx0XHRcdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIob3RoZXJNYXJrZXIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGNodW5rUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHRcdC8vIHJlcG9ydCBwcm9ncmVzcyBhbmQgdGltZSBlbGFwc2VkOlxuXHRcdFx0XHRcdFx0Y2h1bmtQcm9ncmVzcyhvZmZzZXQsIGwsIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSBzdGFydGVkKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDb21wbGV0ZWQgcHJvY2Vzc2luZyBhbGwgbWFya2Vycy5cblx0XHRcdFx0XHRpZiAob2Zmc2V0ID09PSBsKSB7XG5cblx0XHRcdFx0XHRcdC8vIFJlZnJlc2ggYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbnMuXG5cdFx0XHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY2FsY3VsYXRlQm91bmRzKCk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3JlZnJlc2hDbHVzdGVyc0ljb25zKCk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwKG51bGwsIHRoaXMuX3pvb20sIHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQocHJvY2VzcywgdGhpcy5vcHRpb25zLmNodW5rRGVsYXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgdGhpcyk7XG5cblx0XHRcdFx0cHJvY2VzcygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIG5lZWRzQ2x1c3RlcmluZyA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZztcblxuXHRcdFx0XHRmb3IgKDsgb2Zmc2V0IDwgbDsgb2Zmc2V0KyspIHtcblx0XHRcdFx0XHRtID0gbGF5ZXJzQXJyYXlbb2Zmc2V0XTtcblxuXHRcdFx0XHRcdC8vIEdyb3VwIG9mIGxheWVycywgYXBwZW5kIGNoaWxkcmVuIHRvIGxheWVyc0FycmF5IGFuZCBza2lwLlxuXHRcdFx0XHRcdGlmIChtIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XG5cdFx0XHRcdFx0XHRpZiAob3JpZ2luYWxBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRsYXllcnNBcnJheSA9IGxheWVyc0FycmF5LnNsaWNlKCk7XG5cdFx0XHRcdFx0XHRcdG9yaWdpbmFsQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhtLCBsYXllcnNBcnJheSk7XG5cdFx0XHRcdFx0XHRsID0gbGF5ZXJzQXJyYXkubGVuZ3RoO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9Ob3QgcG9pbnQgZGF0YSwgY2FuJ3QgYmUgY2x1c3RlcmVkXG5cdFx0XHRcdFx0aWYgKCFtLmdldExhdExuZykge1xuXHRcdFx0XHRcdFx0bnBnLmFkZExheWVyKG0pO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuaGFzTGF5ZXIobSkpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5lZWRzQ2x1c3RlcmluZy5wdXNoKG0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Ly9UYWtlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGFuZCByZW1vdmVzIHRoZW0gaW4gYnVsa1xuXHRcdHJlbW92ZUxheWVyczogZnVuY3Rpb24gKGxheWVyc0FycmF5KSB7XG5cdFx0XHR2YXIgaSwgbSxcblx0XHRcdCAgICBsID0gbGF5ZXJzQXJyYXkubGVuZ3RoLFxuXHRcdFx0ICAgIGZnID0gdGhpcy5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0ICAgIG5wZyA9IHRoaXMuX25vblBvaW50R3JvdXAsXG5cdFx0XHQgICAgb3JpZ2luYWxBcnJheSA9IHRydWU7XG5cblx0XHRcdGlmICghdGhpcy5fbWFwKSB7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHRtID0gbGF5ZXJzQXJyYXlbaV07XG5cblx0XHRcdFx0XHQvLyBHcm91cCBvZiBsYXllcnMsIGFwcGVuZCBjaGlsZHJlbiB0byBsYXllcnNBcnJheSBhbmQgc2tpcC5cblx0XHRcdFx0XHRpZiAobSBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xuXHRcdFx0XHRcdFx0aWYgKG9yaWdpbmFsQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0bGF5ZXJzQXJyYXkgPSBsYXllcnNBcnJheS5zbGljZSgpO1xuXHRcdFx0XHRcdFx0XHRvcmlnaW5hbEFycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLl9leHRyYWN0Tm9uR3JvdXBMYXllcnMobSwgbGF5ZXJzQXJyYXkpO1xuXHRcdFx0XHRcdFx0bCA9IGxheWVyc0FycmF5Lmxlbmd0aDtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX2FycmF5U3BsaWNlKHRoaXMuX25lZWRzQ2x1c3RlcmluZywgbSk7XG5cdFx0XHRcdFx0bnBnLnJlbW92ZUxheWVyKG0pO1xuXHRcdFx0XHRcdGlmICh0aGlzLmhhc0xheWVyKG0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9uZWVkc1JlbW92aW5nLnB1c2goeyBsYXllcjogbSwgbGF0bG5nOiBtLl9sYXRsbmcgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBtIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdW5zcGlkZXJmeSkge1xuXHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XG5cblx0XHRcdFx0Ly8gV29yayBvbiBhIGNvcHkgb2YgdGhlIGFycmF5LCBzbyB0aGF0IG5leHQgbG9vcCBpcyBub3QgYWZmZWN0ZWQuXG5cdFx0XHRcdHZhciBsYXllcnNBcnJheTIgPSBsYXllcnNBcnJheS5zbGljZSgpLFxuXHRcdFx0XHQgICAgbDIgPSBsO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDI7IGkrKykge1xuXHRcdFx0XHRcdG0gPSBsYXllcnNBcnJheTJbaV07XG5cblx0XHRcdFx0XHQvLyBHcm91cCBvZiBsYXllcnMsIGFwcGVuZCBjaGlsZHJlbiB0byBsYXllcnNBcnJheSBhbmQgc2tpcC5cblx0XHRcdFx0XHRpZiAobSBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZXh0cmFjdE5vbkdyb3VwTGF5ZXJzKG0sIGxheWVyc0FycmF5Mik7XG5cdFx0XHRcdFx0XHRsMiA9IGxheWVyc0FycmF5Mi5sZW5ndGg7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5TGF5ZXIobSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRtID0gbGF5ZXJzQXJyYXlbaV07XG5cblx0XHRcdFx0Ly8gR3JvdXAgb2YgbGF5ZXJzLCBhcHBlbmQgY2hpbGRyZW4gdG8gbGF5ZXJzQXJyYXkgYW5kIHNraXAuXG5cdFx0XHRcdGlmIChtIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XG5cdFx0XHRcdFx0aWYgKG9yaWdpbmFsQXJyYXkpIHtcblx0XHRcdFx0XHRcdGxheWVyc0FycmF5ID0gbGF5ZXJzQXJyYXkuc2xpY2UoKTtcblx0XHRcdFx0XHRcdG9yaWdpbmFsQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fZXh0cmFjdE5vbkdyb3VwTGF5ZXJzKG0sIGxheWVyc0FycmF5KTtcblx0XHRcdFx0XHRsID0gbGF5ZXJzQXJyYXkubGVuZ3RoO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFtLl9fcGFyZW50KSB7XG5cdFx0XHRcdFx0bnBnLnJlbW92ZUxheWVyKG0pO1xuXHRcdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBtIH0pO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fcmVtb3ZlTGF5ZXIobSwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBtIH0pO1xuXG5cdFx0XHRcdGlmIChmZy5oYXNMYXllcihtKSkge1xuXHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKG0pO1xuXHRcdFx0XHRcdGlmIChtLmNsdXN0ZXJTaG93KSB7XG5cdFx0XHRcdFx0XHRtLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlZnJlc2ggYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbnMuXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY2FsY3VsYXRlQm91bmRzKCk7XG5cblx0XHRcdHRoaXMuX3JlZnJlc2hDbHVzdGVyc0ljb25zKCk7XG5cblx0XHRcdC8vRml4IHVwIHRoZSBjbHVzdGVycyBhbmQgbWFya2VycyBvbiB0aGUgbWFwXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcChudWxsLCB0aGlzLl96b29tLCB0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Ly9SZW1vdmVzIGFsbCBsYXllcnMgZnJvbSB0aGUgTWFya2VyQ2x1c3Rlckdyb3VwXG5cdFx0Y2xlYXJMYXllcnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vTmVlZCBvdXIgb3duIHNwZWNpYWwgaW1wbGVtZW50YXRpb24gYXMgdGhlIExheWVyR3JvdXAgb25lIGRvZXNuJ3Qgd29yayBmb3IgdXNcblxuXHRcdFx0Ly9JZiB3ZSBhcmVuJ3Qgb24gdGhlIG1hcCAoeWV0KSwgYmxvdyBhd2F5IHRoZSBtYXJrZXJzIHdlIGtub3cgb2Zcblx0XHRcdGlmICghdGhpcy5fbWFwKSB7XG5cdFx0XHRcdHRoaXMuX25lZWRzQ2x1c3RlcmluZyA9IFtdO1xuXHRcdFx0XHR0aGlzLl9uZWVkc1JlbW92aW5nID0gW107XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9ncmlkQ2x1c3RlcnM7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9ncmlkVW5jbHVzdGVyZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9ub2FuaW1hdGlvblVuc3BpZGVyZnkpIHtcblx0XHRcdFx0dGhpcy5fbm9hbmltYXRpb25VbnNwaWRlcmZ5KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vUmVtb3ZlIGFsbCB0aGUgdmlzaWJsZSBsYXllcnNcblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5jbGVhckxheWVycygpO1xuXHRcdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5jbGVhckxheWVycygpO1xuXG5cdFx0XHR0aGlzLmVhY2hMYXllcihmdW5jdGlvbiAobWFya2VyKSB7XG5cdFx0XHRcdG1hcmtlci5vZmYodGhpcy5fY2hpbGRNYXJrZXJFdmVudEhhbmRsZXJzLCB0aGlzKTtcblx0XHRcdFx0ZGVsZXRlIG1hcmtlci5fX3BhcmVudDtcblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHRpZiAodGhpcy5fbWFwKSB7XG5cdFx0XHRcdC8vUmVzZXQgX3RvcENsdXN0ZXJMZXZlbCBhbmQgdGhlIERpc3RhbmNlR3JpZHNcblx0XHRcdFx0dGhpcy5fZ2VuZXJhdGVJbml0aWFsQ2x1c3RlcnMoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGUgRmVhdHVyZUdyb3VwLmdldEJvdW5kcyBhcyBpdCBkb2Vzbid0IHdvcmtcblx0XHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcblxuXHRcdFx0aWYgKHRoaXMuX3RvcENsdXN0ZXJMZXZlbCkge1xuXHRcdFx0XHRib3VuZHMuZXh0ZW5kKHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fYm91bmRzKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaSA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRib3VuZHMuZXh0ZW5kKHRoaXMuX25lZWRzQ2x1c3RlcmluZ1tpXS5nZXRMYXRMbmcoKSk7XG5cdFx0XHR9XG5cblx0XHRcdGJvdW5kcy5leHRlbmQodGhpcy5fbm9uUG9pbnRHcm91cC5nZXRCb3VuZHMoKSk7XG5cblx0XHRcdHJldHVybiBib3VuZHM7XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGVzIExheWVyR3JvdXAuZWFjaExheWVyXG5cdFx0ZWFjaExheWVyOiBmdW5jdGlvbiAobWV0aG9kLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbWFya2VycyA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZy5zbGljZSgpLFxuXHRcdFx0XHRuZWVkc1JlbW92aW5nID0gdGhpcy5fbmVlZHNSZW1vdmluZyxcblx0XHRcdFx0dGhpc05lZWRzUmVtb3ZpbmcsIGksIGo7XG5cblx0XHRcdGlmICh0aGlzLl90b3BDbHVzdGVyTGV2ZWwpIHtcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLmdldEFsbENoaWxkTWFya2VycyhtYXJrZXJzKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHR0aGlzTmVlZHNSZW1vdmluZyA9IHRydWU7XG5cblx0XHRcdFx0Zm9yIChqID0gbmVlZHNSZW1vdmluZy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuXHRcdFx0XHRcdGlmIChuZWVkc1JlbW92aW5nW2pdLmxheWVyID09PSBtYXJrZXJzW2ldKSB7XG5cdFx0XHRcdFx0XHR0aGlzTmVlZHNSZW1vdmluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXNOZWVkc1JlbW92aW5nKSB7XG5cdFx0XHRcdFx0bWV0aG9kLmNhbGwoY29udGV4dCwgbWFya2Vyc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5lYWNoTGF5ZXIobWV0aG9kLCBjb250ZXh0KTtcblx0XHR9LFxuXG5cdFx0Ly9PdmVycmlkZXMgTGF5ZXJHcm91cC5nZXRMYXllcnNcblx0XHRnZXRMYXllcnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBsYXllcnMgPSBbXTtcblx0XHRcdHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRcdGxheWVycy5wdXNoKGwpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbGF5ZXJzO1xuXHRcdH0sXG5cblx0XHQvL092ZXJyaWRlcyBMYXllckdyb3VwLmdldExheWVyLCBXQVJOSU5HOiBSZWFsbHkgYmFkIHBlcmZvcm1hbmNlXG5cdFx0Z2V0TGF5ZXI6IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG51bGw7XG5cblx0XHRcdGlkID0gcGFyc2VJbnQoaWQsIDEwKTtcblxuXHRcdFx0dGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKGwpIHtcblx0XHRcdFx0aWYgKEwuc3RhbXAobCkgPT09IGlkKSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gbDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8vUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBsYXllciBpcyBpbiB0aGlzIE1hcmtlckNsdXN0ZXJHcm91cFxuXHRcdGhhc0xheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRcdGlmICghbGF5ZXIpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaSwgYW5BcnJheSA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZztcblxuXHRcdFx0Zm9yIChpID0gYW5BcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRpZiAoYW5BcnJheVtpXSA9PT0gbGF5ZXIpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRhbkFycmF5ID0gdGhpcy5fbmVlZHNSZW1vdmluZztcblx0XHRcdGZvciAoaSA9IGFuQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGFuQXJyYXlbaV0ubGF5ZXIgPT09IGxheWVyKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAhIShsYXllci5fX3BhcmVudCAmJiBsYXllci5fX3BhcmVudC5fZ3JvdXAgPT09IHRoaXMpIHx8IHRoaXMuX25vblBvaW50R3JvdXAuaGFzTGF5ZXIobGF5ZXIpO1xuXHRcdH0sXG5cblx0XHQvL1pvb20gZG93biB0byBzaG93IHRoZSBnaXZlbiBsYXllciAoc3BpZGVyZnlpbmcgaWYgbmVjZXNzYXJ5KSB0aGVuIGNhbGxzIHRoZSBjYWxsYmFja1xuXHRcdHpvb21Ub1Nob3dMYXllcjogZnVuY3Rpb24gKGxheWVyLCBjYWxsYmFjaykge1xuXG5cdFx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXG5cdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzaG93TWFya2VyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvLyBBc3N1bWVzIHRoYXQgbWFwLmhhc0xheWVyIGNoZWNrcyBmb3IgZGlyZWN0IGFwcGVhcmFuY2Ugb24gbWFwLCBub3QgcmVjdXJzaXZlbHkgY2FsbGluZ1xuXHRcdFx0XHQvLyBoYXNMYXllciBvbiBMYXllciBHcm91cHMgdGhhdCBhcmUgb24gbWFwICh0eXBpY2FsbHkgbm90IGNhbGxpbmcgdGhpcyBNYXJrZXJDbHVzdGVyR3JvdXAuaGFzTGF5ZXIsIHdoaWNoIHdvdWxkIGFsd2F5cyByZXR1cm4gdHJ1ZSlcblx0XHRcdFx0aWYgKChtYXAuaGFzTGF5ZXIobGF5ZXIpIHx8IG1hcC5oYXNMYXllcihsYXllci5fX3BhcmVudCkpICYmICF0aGlzLl9pblpvb21BbmltYXRpb24pIHtcblx0XHRcdFx0XHR0aGlzLl9tYXAub2ZmKCdtb3ZlZW5kJywgc2hvd01hcmtlciwgdGhpcyk7XG5cdFx0XHRcdFx0dGhpcy5vZmYoJ2FuaW1hdGlvbmVuZCcsIHNob3dNYXJrZXIsIHRoaXMpO1xuXG5cdFx0XHRcdFx0aWYgKG1hcC5oYXNMYXllcihsYXllcikpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsYXllci5fX3BhcmVudC5faWNvbikge1xuXHRcdFx0XHRcdFx0dGhpcy5vbmNlKCdzcGlkZXJmaWVkJywgY2FsbGJhY2ssIHRoaXMpO1xuXHRcdFx0XHRcdFx0bGF5ZXIuX19wYXJlbnQuc3BpZGVyZnkoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGlmIChsYXllci5faWNvbiAmJiB0aGlzLl9tYXAuZ2V0Qm91bmRzKCkuY29udGFpbnMobGF5ZXIuZ2V0TGF0TG5nKCkpKSB7XG5cdFx0XHRcdC8vTGF5ZXIgaXMgdmlzaWJsZSBvbmQgb24gc2NyZWVuLCBpbW1lZGlhdGUgcmV0dXJuXG5cdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGxheWVyLl9fcGFyZW50Ll96b29tIDwgTWF0aC5yb3VuZCh0aGlzLl9tYXAuX3pvb20pKSB7XG5cdFx0XHRcdC8vTGF5ZXIgc2hvdWxkIGJlIHZpc2libGUgYXQgdGhpcyB6b29tIGxldmVsLiBJdCBtdXN0IG5vdCBiZSBvbiBzY3JlZW4gc28ganVzdCBwYW4gb3ZlciB0byBpdFxuXHRcdFx0XHR0aGlzLl9tYXAub24oJ21vdmVlbmQnLCBzaG93TWFya2VyLCB0aGlzKTtcblx0XHRcdFx0dGhpcy5fbWFwLnBhblRvKGxheWVyLmdldExhdExuZygpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX21hcC5vbignbW92ZWVuZCcsIHNob3dNYXJrZXIsIHRoaXMpO1xuXHRcdFx0XHR0aGlzLm9uKCdhbmltYXRpb25lbmQnLCBzaG93TWFya2VyLCB0aGlzKTtcblx0XHRcdFx0bGF5ZXIuX19wYXJlbnQuem9vbVRvQm91bmRzKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGVzIEZlYXR1cmVHcm91cC5vbkFkZFxuXHRcdG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0XHR0aGlzLl9tYXAgPSBtYXA7XG5cdFx0XHR2YXIgaSwgbCwgbGF5ZXI7XG5cblx0XHRcdGlmICghaXNGaW5pdGUodGhpcy5fbWFwLmdldE1heFpvb20oKSkpIHtcblx0XHRcdFx0dGhyb3cgXCJNYXAgaGFzIG5vIG1heFpvb20gc3BlY2lmaWVkXCI7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5hZGRUbyhtYXApO1xuXHRcdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5hZGRUbyhtYXApO1xuXG5cdFx0XHRpZiAoIXRoaXMuX2dyaWRDbHVzdGVycykge1xuXHRcdFx0XHR0aGlzLl9nZW5lcmF0ZUluaXRpYWxDbHVzdGVycygpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9tYXhMYXQgPSBtYXAub3B0aW9ucy5jcnMucHJvamVjdGlvbi5NQVhfTEFUSVRVREU7XG5cblx0XHRcdC8vUmVzdG9yZSBhbGwgdGhlIHBvc2l0aW9ucyBhcyB0aGV5IGFyZSBpbiB0aGUgTUNHIGJlZm9yZSByZW1vdmluZyB0aGVtXG5cdFx0XHRmb3IgKGkgPSAwLCBsID0gdGhpcy5fbmVlZHNSZW1vdmluZy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0bGF5ZXIgPSB0aGlzLl9uZWVkc1JlbW92aW5nW2ldO1xuXHRcdFx0XHRsYXllci5uZXdsYXRsbmcgPSBsYXllci5sYXllci5fbGF0bG5nO1xuXHRcdFx0XHRsYXllci5sYXllci5fbGF0bG5nID0gbGF5ZXIubGF0bG5nO1xuXHRcdFx0fVxuXHRcdFx0Ly9SZW1vdmUgdGhlbSwgdGhlbiByZXN0b3JlIHRoZWlyIG5ldyBwb3NpdGlvbnNcblx0XHRcdGZvciAoaSA9IDAsIGwgPSB0aGlzLl9uZWVkc1JlbW92aW5nLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRsYXllciA9IHRoaXMuX25lZWRzUmVtb3ZpbmdbaV07XG5cdFx0XHRcdHRoaXMuX3JlbW92ZUxheWVyKGxheWVyLmxheWVyLCB0cnVlKTtcblx0XHRcdFx0bGF5ZXIubGF5ZXIuX2xhdGxuZyA9IGxheWVyLm5ld2xhdGxuZztcblx0XHRcdH1cblx0XHRcdHRoaXMuX25lZWRzUmVtb3ZpbmcgPSBbXTtcblxuXHRcdFx0Ly9SZW1lbWJlciB0aGUgY3VycmVudCB6b29tIGxldmVsIGFuZCBib3VuZHNcblx0XHRcdHRoaXMuX3pvb20gPSBNYXRoLnJvdW5kKHRoaXMuX21hcC5fem9vbSk7XG5cdFx0XHR0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMgPSB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKTtcblxuXHRcdFx0dGhpcy5fbWFwLm9uKCd6b29tZW5kJywgdGhpcy5fem9vbUVuZCwgdGhpcyk7XG5cdFx0XHR0aGlzLl9tYXAub24oJ21vdmVlbmQnLCB0aGlzLl9tb3ZlRW5kLCB0aGlzKTtcblxuXHRcdFx0aWYgKHRoaXMuX3NwaWRlcmZpZXJPbkFkZCkgeyAvL1RPRE8gRklYTUU6IE5vdCBzdXJlIGhvdyB0byBoYXZlIHNwaWRlcmZpZXIgYWRkIHNvbWV0aGluZyBvbiBoZXJlIG5pY2VseVxuXHRcdFx0XHR0aGlzLl9zcGlkZXJmaWVyT25BZGQoKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYmluZEV2ZW50cygpO1xuXG5cdFx0XHQvL0FjdHVhbGx5IGFkZCBvdXIgbWFya2VycyB0byB0aGUgbWFwOlxuXHRcdFx0bCA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZztcblx0XHRcdHRoaXMuX25lZWRzQ2x1c3RlcmluZyA9IFtdO1xuXHRcdFx0dGhpcy5hZGRMYXllcnMobCwgdHJ1ZSk7XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGVzIEZlYXR1cmVHcm91cC5vblJlbW92ZVxuXHRcdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG5cdFx0XHRtYXAub2ZmKCd6b29tZW5kJywgdGhpcy5fem9vbUVuZCwgdGhpcyk7XG5cdFx0XHRtYXAub2ZmKCdtb3ZlZW5kJywgdGhpcy5fbW92ZUVuZCwgdGhpcyk7XG5cblx0XHRcdHRoaXMuX3VuYmluZEV2ZW50cygpO1xuXG5cdFx0XHQvL0luIGNhc2Ugd2UgYXJlIGluIGEgY2x1c3RlciBhbmltYXRpb25cblx0XHRcdHRoaXMuX21hcC5fbWFwUGFuZS5jbGFzc05hbWUgPSB0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lLnJlcGxhY2UoJyBsZWFmbGV0LWNsdXN0ZXItYW5pbScsICcnKTtcblxuXHRcdFx0aWYgKHRoaXMuX3NwaWRlcmZpZXJPblJlbW92ZSkgeyAvL1RPRE8gRklYTUU6IE5vdCBzdXJlIGhvdyB0byBoYXZlIHNwaWRlcmZpZXIgYWRkIHNvbWV0aGluZyBvbiBoZXJlIG5pY2VseVxuXHRcdFx0XHR0aGlzLl9zcGlkZXJmaWVyT25SZW1vdmUoKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsZXRlIHRoaXMuX21heExhdDtcblxuXHRcdFx0Ly9DbGVhbiB1cCBhbGwgdGhlIGxheWVycyB3ZSBhZGRlZCB0byB0aGUgbWFwXG5cdFx0XHR0aGlzLl9oaWRlQ292ZXJhZ2UoKTtcblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5yZW1vdmUoKTtcblx0XHRcdHRoaXMuX25vblBvaW50R3JvdXAucmVtb3ZlKCk7XG5cblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5jbGVhckxheWVycygpO1xuXG5cdFx0XHR0aGlzLl9tYXAgPSBudWxsO1xuXHRcdH0sXG5cblx0XHRnZXRWaXNpYmxlUGFyZW50OiBmdW5jdGlvbiAobWFya2VyKSB7XG5cdFx0XHR2YXIgdk1hcmtlciA9IG1hcmtlcjtcblx0XHRcdHdoaWxlICh2TWFya2VyICYmICF2TWFya2VyLl9pY29uKSB7XG5cdFx0XHRcdHZNYXJrZXIgPSB2TWFya2VyLl9fcGFyZW50O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZNYXJrZXIgfHwgbnVsbDtcblx0XHR9LFxuXG5cdFx0Ly9SZW1vdmUgdGhlIGdpdmVuIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBhcnJheVxuXHRcdF9hcnJheVNwbGljZTogZnVuY3Rpb24gKGFuQXJyYXksIG9iaikge1xuXHRcdFx0Zm9yICh2YXIgaSA9IGFuQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGFuQXJyYXlbaV0gPT09IG9iaikge1xuXHRcdFx0XHRcdGFuQXJyYXkuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZXMgYSBtYXJrZXIgZnJvbSBhbGwgX2dyaWRVbmNsdXN0ZXJlZCB6b29tIGxldmVscywgc3RhcnRpbmcgYXQgdGhlIHN1cHBsaWVkIHpvb20uXG5cdFx0ICogQHBhcmFtIG1hcmtlciB0byBiZSByZW1vdmVkIGZyb20gX2dyaWRVbmNsdXN0ZXJlZC5cblx0XHQgKiBAcGFyYW0geiBpbnRlZ2VyIGJvdHRvbSBzdGFydCB6b29tIGxldmVsIChpbmNsdWRlZClcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9yZW1vdmVGcm9tR3JpZFVuY2x1c3RlcmVkOiBmdW5jdGlvbiAobWFya2VyLCB6KSB7XG5cdFx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxuXHRcdFx0ICAgIGdyaWRVbmNsdXN0ZXJlZCA9IHRoaXMuX2dyaWRVbmNsdXN0ZXJlZCxcblx0XHRcdFx0bWluWm9vbSA9IE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSk7XG5cblx0XHRcdGZvciAoOyB6ID49IG1pblpvb207IHotLSkge1xuXHRcdFx0XHRpZiAoIWdyaWRVbmNsdXN0ZXJlZFt6XS5yZW1vdmVPYmplY3QobWFya2VyLCBtYXAucHJvamVjdChtYXJrZXIuZ2V0TGF0TG5nKCksIHopKSkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9jaGlsZE1hcmtlckRyYWdTdGFydDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUudGFyZ2V0Ll9fZHJhZ1N0YXJ0ID0gZS50YXJnZXQuX2xhdGxuZztcblx0XHR9LFxuXG5cdFx0X2NoaWxkTWFya2VyTW92ZWQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRpZiAoIXRoaXMuX2lnbm9yZU1vdmUgJiYgIWUudGFyZ2V0Ll9fZHJhZ1N0YXJ0KSB7XG5cdFx0XHRcdHZhciBpc1BvcHVwT3BlbiA9IGUudGFyZ2V0Ll9wb3B1cCAmJiBlLnRhcmdldC5fcG9wdXAuaXNPcGVuKCk7XG5cblx0XHRcdFx0dGhpcy5fbW92ZUNoaWxkKGUudGFyZ2V0LCBlLm9sZExhdExuZywgZS5sYXRsbmcpO1xuXG5cdFx0XHRcdGlmIChpc1BvcHVwT3Blbikge1xuXHRcdFx0XHRcdGUudGFyZ2V0Lm9wZW5Qb3B1cCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9tb3ZlQ2hpbGQ6IGZ1bmN0aW9uIChsYXllciwgZnJvbSwgdG8pIHtcblx0XHRcdGxheWVyLl9sYXRsbmcgPSBmcm9tO1xuXHRcdFx0dGhpcy5yZW1vdmVMYXllcihsYXllcik7XG5cblx0XHRcdGxheWVyLl9sYXRsbmcgPSB0bztcblx0XHRcdHRoaXMuYWRkTGF5ZXIobGF5ZXIpO1xuXHRcdH0sXG5cblx0XHRfY2hpbGRNYXJrZXJEcmFnRW5kOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIGRyYWdTdGFydCA9IGUudGFyZ2V0Ll9fZHJhZ1N0YXJ0O1xuXHRcdFx0ZGVsZXRlIGUudGFyZ2V0Ll9fZHJhZ1N0YXJ0O1xuXHRcdFx0aWYgKGRyYWdTdGFydCkge1xuXHRcdFx0XHR0aGlzLl9tb3ZlQ2hpbGQoZS50YXJnZXQsIGRyYWdTdGFydCwgZS50YXJnZXQuX2xhdGxuZyk7XG5cdFx0XHR9XHRcdFxuXHRcdH0sXG5cblxuXHRcdC8vSW50ZXJuYWwgZnVuY3Rpb24gZm9yIHJlbW92aW5nIGEgbWFya2VyIGZyb20gZXZlcnl0aGluZy5cblx0XHQvL2RvbnRVcGRhdGVNYXA6IHNldCB0byB0cnVlIGlmIHlvdSB3aWxsIGhhbmRsZSB1cGRhdGluZyB0aGUgbWFwIG1hbnVhbGx5IChmb3IgYnVsayBmdW5jdGlvbnMpXG5cdFx0X3JlbW92ZUxheWVyOiBmdW5jdGlvbiAobWFya2VyLCByZW1vdmVGcm9tRGlzdGFuY2VHcmlkLCBkb250VXBkYXRlTWFwKSB7XG5cdFx0XHR2YXIgZ3JpZENsdXN0ZXJzID0gdGhpcy5fZ3JpZENsdXN0ZXJzLFxuXHRcdFx0XHRncmlkVW5jbHVzdGVyZWQgPSB0aGlzLl9ncmlkVW5jbHVzdGVyZWQsXG5cdFx0XHRcdGZnID0gdGhpcy5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0XHRtYXAgPSB0aGlzLl9tYXAsXG5cdFx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpO1xuXG5cdFx0XHQvL1JlbW92ZSB0aGUgbWFya2VyIGZyb20gZGlzdGFuY2UgY2x1c3RlcnMgaXQgbWlnaHQgYmUgaW5cblx0XHRcdGlmIChyZW1vdmVGcm9tRGlzdGFuY2VHcmlkKSB7XG5cdFx0XHRcdHRoaXMuX3JlbW92ZUZyb21HcmlkVW5jbHVzdGVyZWQobWFya2VyLCB0aGlzLl9tYXhab29tKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9Xb3JrIG91ciB3YXkgdXAgdGhlIGNsdXN0ZXJzIHJlbW92aW5nIHRoZW0gYXMgd2UgZ28gaWYgcmVxdWlyZWRcblx0XHRcdHZhciBjbHVzdGVyID0gbWFya2VyLl9fcGFyZW50LFxuXHRcdFx0XHRtYXJrZXJzID0gY2x1c3Rlci5fbWFya2Vycyxcblx0XHRcdFx0b3RoZXJNYXJrZXI7XG5cblx0XHRcdC8vUmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgaW1tZWRpYXRlIHBhcmVudHMgbWFya2VyIGxpc3Rcblx0XHRcdHRoaXMuX2FycmF5U3BsaWNlKG1hcmtlcnMsIG1hcmtlcik7XG5cblx0XHRcdHdoaWxlIChjbHVzdGVyKSB7XG5cdFx0XHRcdGNsdXN0ZXIuX2NoaWxkQ291bnQtLTtcblx0XHRcdFx0Y2x1c3Rlci5fYm91bmRzTmVlZFVwZGF0ZSA9IHRydWU7XG5cblx0XHRcdFx0aWYgKGNsdXN0ZXIuX3pvb20gPCBtaW5ab29tKSB7XG5cdFx0XHRcdFx0Ly9Ub3AgbGV2ZWwsIGRvIG5vdGhpbmdcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fSBlbHNlIGlmIChyZW1vdmVGcm9tRGlzdGFuY2VHcmlkICYmIGNsdXN0ZXIuX2NoaWxkQ291bnQgPD0gMSkgeyAvL0NsdXN0ZXIgbm8gbG9uZ2VyIHJlcXVpcmVkXG5cdFx0XHRcdFx0Ly9XZSBuZWVkIHRvIHB1c2ggdGhlIG90aGVyIG1hcmtlciB1cCB0byB0aGUgcGFyZW50XG5cdFx0XHRcdFx0b3RoZXJNYXJrZXIgPSBjbHVzdGVyLl9tYXJrZXJzWzBdID09PSBtYXJrZXIgPyBjbHVzdGVyLl9tYXJrZXJzWzFdIDogY2x1c3Rlci5fbWFya2Vyc1swXTtcblxuXHRcdFx0XHRcdC8vVXBkYXRlIGRpc3RhbmNlIGdyaWRcblx0XHRcdFx0XHRncmlkQ2x1c3RlcnNbY2x1c3Rlci5fem9vbV0ucmVtb3ZlT2JqZWN0KGNsdXN0ZXIsIG1hcC5wcm9qZWN0KGNsdXN0ZXIuX2NMYXRMbmcsIGNsdXN0ZXIuX3pvb20pKTtcblx0XHRcdFx0XHRncmlkVW5jbHVzdGVyZWRbY2x1c3Rlci5fem9vbV0uYWRkT2JqZWN0KG90aGVyTWFya2VyLCBtYXAucHJvamVjdChvdGhlck1hcmtlci5nZXRMYXRMbmcoKSwgY2x1c3Rlci5fem9vbSkpO1xuXG5cdFx0XHRcdFx0Ly9Nb3ZlIG90aGVyTWFya2VyIHVwIHRvIHBhcmVudFxuXHRcdFx0XHRcdHRoaXMuX2FycmF5U3BsaWNlKGNsdXN0ZXIuX19wYXJlbnQuX2NoaWxkQ2x1c3RlcnMsIGNsdXN0ZXIpO1xuXHRcdFx0XHRcdGNsdXN0ZXIuX19wYXJlbnQuX21hcmtlcnMucHVzaChvdGhlck1hcmtlcik7XG5cdFx0XHRcdFx0b3RoZXJNYXJrZXIuX19wYXJlbnQgPSBjbHVzdGVyLl9fcGFyZW50O1xuXG5cdFx0XHRcdFx0aWYgKGNsdXN0ZXIuX2ljb24pIHtcblx0XHRcdFx0XHRcdC8vQ2x1c3RlciBpcyBjdXJyZW50bHkgb24gdGhlIG1hcCwgbmVlZCB0byBwdXQgdGhlIG1hcmtlciBvbiB0aGUgbWFwIGluc3RlYWRcblx0XHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKGNsdXN0ZXIpO1xuXHRcdFx0XHRcdFx0aWYgKCFkb250VXBkYXRlTWFwKSB7XG5cdFx0XHRcdFx0XHRcdGZnLmFkZExheWVyKG90aGVyTWFya2VyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2x1c3Rlci5faWNvbk5lZWRzVXBkYXRlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNsdXN0ZXIgPSBjbHVzdGVyLl9fcGFyZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRkZWxldGUgbWFya2VyLl9fcGFyZW50O1xuXHRcdH0sXG5cblx0XHRfaXNPcklzUGFyZW50OiBmdW5jdGlvbiAoZWwsIG9lbCkge1xuXHRcdFx0d2hpbGUgKG9lbCkge1xuXHRcdFx0XHRpZiAoZWwgPT09IG9lbCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG9lbCA9IG9lbC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0sXG5cblx0XHQvL092ZXJyaWRlIEwuRXZlbnRlZC5maXJlXG5cdFx0ZmlyZTogZnVuY3Rpb24gKHR5cGUsIGRhdGEsIHByb3BhZ2F0ZSkge1xuXHRcdFx0aWYgKGRhdGEgJiYgZGF0YS5sYXllciBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlcikge1xuXHRcdFx0XHQvL1ByZXZlbnQgbXVsdGlwbGUgY2x1c3Rlcm1vdXNlb3Zlci9vZmYgZXZlbnRzIGlmIHRoZSBpY29uIGlzIG1hZGUgdXAgb2Ygc3RhY2tlZCBkaXZzIChEb2Vzbid0IHdvcmsgaW4gaWUgPD0gOCwgbm8gcmVsYXRlZFRhcmdldClcblx0XHRcdFx0aWYgKGRhdGEub3JpZ2luYWxFdmVudCAmJiB0aGlzLl9pc09ySXNQYXJlbnQoZGF0YS5sYXllci5faWNvbiwgZGF0YS5vcmlnaW5hbEV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHR5cGUgPSAnY2x1c3RlcicgKyB0eXBlO1xuXHRcdFx0fVxuXG5cdFx0XHRMLkZlYXR1cmVHcm91cC5wcm90b3R5cGUuZmlyZS5jYWxsKHRoaXMsIHR5cGUsIGRhdGEsIHByb3BhZ2F0ZSk7XG5cdFx0fSxcblxuXHRcdC8vT3ZlcnJpZGUgTC5FdmVudGVkLmxpc3RlbnNcblx0XHRsaXN0ZW5zOiBmdW5jdGlvbiAodHlwZSwgcHJvcGFnYXRlKSB7XG5cdFx0XHRyZXR1cm4gTC5GZWF0dXJlR3JvdXAucHJvdG90eXBlLmxpc3RlbnMuY2FsbCh0aGlzLCB0eXBlLCBwcm9wYWdhdGUpIHx8IEwuRmVhdHVyZUdyb3VwLnByb3RvdHlwZS5saXN0ZW5zLmNhbGwodGhpcywgJ2NsdXN0ZXInICsgdHlwZSwgcHJvcGFnYXRlKTtcblx0XHR9LFxuXG5cdFx0Ly9EZWZhdWx0IGZ1bmN0aW9uYWxpdHlcblx0XHRfZGVmYXVsdEljb25DcmVhdGVGdW5jdGlvbjogZnVuY3Rpb24gKGNsdXN0ZXIpIHtcblx0XHRcdHZhciBjaGlsZENvdW50ID0gY2x1c3Rlci5nZXRDaGlsZENvdW50KCk7XG5cblx0XHRcdHZhciBjID0gJyBtYXJrZXItY2x1c3Rlci0nO1xuXHRcdFx0aWYgKGNoaWxkQ291bnQgPCAxMCkge1xuXHRcdFx0XHRjICs9ICdzbWFsbCc7XG5cdFx0XHR9IGVsc2UgaWYgKGNoaWxkQ291bnQgPCAxMDApIHtcblx0XHRcdFx0YyArPSAnbWVkaXVtJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGMgKz0gJ2xhcmdlJztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG5ldyBMLkRpdkljb24oeyBodG1sOiAnPGRpdj48c3Bhbj4nICsgY2hpbGRDb3VudCArICc8L3NwYW4+PC9kaXY+JywgY2xhc3NOYW1lOiAnbWFya2VyLWNsdXN0ZXInICsgYywgaWNvblNpemU6IG5ldyBMLlBvaW50KDQwLCA0MCkgfSk7XG5cdFx0fSxcblxuXHRcdF9iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxuXHRcdFx0ICAgIHNwaWRlcmZ5T25NYXhab29tID0gdGhpcy5vcHRpb25zLnNwaWRlcmZ5T25NYXhab29tLFxuXHRcdFx0ICAgIHNob3dDb3ZlcmFnZU9uSG92ZXIgPSB0aGlzLm9wdGlvbnMuc2hvd0NvdmVyYWdlT25Ib3Zlcixcblx0XHRcdCAgICB6b29tVG9Cb3VuZHNPbkNsaWNrID0gdGhpcy5vcHRpb25zLnpvb21Ub0JvdW5kc09uQ2xpY2s7XG5cblx0XHRcdC8vWm9vbSBvbiBjbHVzdGVyIGNsaWNrIG9yIHNwaWRlcmZ5IGlmIHdlIGFyZSBhdCB0aGUgbG93ZXN0IGxldmVsXG5cdFx0XHRpZiAoc3BpZGVyZnlPbk1heFpvb20gfHwgem9vbVRvQm91bmRzT25DbGljaykge1xuXHRcdFx0XHR0aGlzLm9uKCdjbHVzdGVyY2xpY2sgY2x1c3RlcmtleXByZXNzJywgdGhpcy5fem9vbU9yU3BpZGVyZnksIHRoaXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL1Nob3cgY29udmV4IGh1bGwgKGJvdW5kYXJ5KSBwb2x5Z29uIG9uIG1vdXNlIG92ZXJcblx0XHRcdGlmIChzaG93Q292ZXJhZ2VPbkhvdmVyKSB7XG5cdFx0XHRcdHRoaXMub24oJ2NsdXN0ZXJtb3VzZW92ZXInLCB0aGlzLl9zaG93Q292ZXJhZ2UsIHRoaXMpO1xuXHRcdFx0XHR0aGlzLm9uKCdjbHVzdGVybW91c2VvdXQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xuXHRcdFx0XHRtYXAub24oJ3pvb21lbmQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfem9vbU9yU3BpZGVyZnk6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgY2x1c3RlciA9IGUubGF5ZXIsXG5cdFx0XHQgICAgYm90dG9tQ2x1c3RlciA9IGNsdXN0ZXI7XG5cblx0XHRcdGlmIChlLnR5cGUgPT09ICdjbHVzdGVya2V5cHJlc3MnICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQua2V5Q29kZSAhPT0gMTMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAoYm90dG9tQ2x1c3Rlci5fY2hpbGRDbHVzdGVycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0Ym90dG9tQ2x1c3RlciA9IGJvdHRvbUNsdXN0ZXIuX2NoaWxkQ2x1c3RlcnNbMF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChib3R0b21DbHVzdGVyLl96b29tID09PSB0aGlzLl9tYXhab29tICYmXG5cdFx0XHRcdGJvdHRvbUNsdXN0ZXIuX2NoaWxkQ291bnQgPT09IGNsdXN0ZXIuX2NoaWxkQ291bnQgJiZcblx0XHRcdFx0dGhpcy5vcHRpb25zLnNwaWRlcmZ5T25NYXhab29tKSB7XG5cblx0XHRcdFx0Ly8gQWxsIGNoaWxkIG1hcmtlcnMgYXJlIGNvbnRhaW5lZCBpbiBhIHNpbmdsZSBjbHVzdGVyIGZyb20gdGhpcy5fbWF4Wm9vbSB0byB0aGlzIGNsdXN0ZXIuXG5cdFx0XHRcdGNsdXN0ZXIuc3BpZGVyZnkoKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnpvb21Ub0JvdW5kc09uQ2xpY2spIHtcblx0XHRcdFx0Y2x1c3Rlci56b29tVG9Cb3VuZHMoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9jdXMgdGhlIG1hcCBhZ2FpbiBmb3Iga2V5Ym9hcmQgdXNlcnMuXG5cdFx0XHRpZiAoZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5rZXlDb2RlID09PSAxMykge1xuXHRcdFx0XHR0aGlzLl9tYXAuX2NvbnRhaW5lci5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfc2hvd0NvdmVyYWdlOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIG1hcCA9IHRoaXMuX21hcDtcblx0XHRcdGlmICh0aGlzLl9pblpvb21BbmltYXRpb24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX3Nob3duUG9seWdvbikge1xuXHRcdFx0XHRtYXAucmVtb3ZlTGF5ZXIodGhpcy5fc2hvd25Qb2x5Z29uKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLmxheWVyLmdldENoaWxkQ291bnQoKSA+IDIgJiYgZS5sYXllciAhPT0gdGhpcy5fc3BpZGVyZmllZCkge1xuXHRcdFx0XHR0aGlzLl9zaG93blBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKGUubGF5ZXIuZ2V0Q29udmV4SHVsbCgpLCB0aGlzLm9wdGlvbnMucG9seWdvbk9wdGlvbnMpO1xuXHRcdFx0XHRtYXAuYWRkTGF5ZXIodGhpcy5fc2hvd25Qb2x5Z29uKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X2hpZGVDb3ZlcmFnZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuX3Nob3duUG9seWdvbikge1xuXHRcdFx0XHR0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fc2hvd25Qb2x5Z29uKTtcblx0XHRcdFx0dGhpcy5fc2hvd25Qb2x5Z29uID0gbnVsbDtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3VuYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHNwaWRlcmZ5T25NYXhab29tID0gdGhpcy5vcHRpb25zLnNwaWRlcmZ5T25NYXhab29tLFxuXHRcdFx0XHRzaG93Q292ZXJhZ2VPbkhvdmVyID0gdGhpcy5vcHRpb25zLnNob3dDb3ZlcmFnZU9uSG92ZXIsXG5cdFx0XHRcdHpvb21Ub0JvdW5kc09uQ2xpY2sgPSB0aGlzLm9wdGlvbnMuem9vbVRvQm91bmRzT25DbGljayxcblx0XHRcdFx0bWFwID0gdGhpcy5fbWFwO1xuXG5cdFx0XHRpZiAoc3BpZGVyZnlPbk1heFpvb20gfHwgem9vbVRvQm91bmRzT25DbGljaykge1xuXHRcdFx0XHR0aGlzLm9mZignY2x1c3RlcmNsaWNrIGNsdXN0ZXJrZXlwcmVzcycsIHRoaXMuX3pvb21PclNwaWRlcmZ5LCB0aGlzKTtcblx0XHRcdH1cblx0XHRcdGlmIChzaG93Q292ZXJhZ2VPbkhvdmVyKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCdjbHVzdGVybW91c2VvdmVyJywgdGhpcy5fc2hvd0NvdmVyYWdlLCB0aGlzKTtcblx0XHRcdFx0dGhpcy5vZmYoJ2NsdXN0ZXJtb3VzZW91dCcsIHRoaXMuX2hpZGVDb3ZlcmFnZSwgdGhpcyk7XG5cdFx0XHRcdG1hcC5vZmYoJ3pvb21lbmQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfem9vbUVuZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCF0aGlzLl9tYXApIHsgLy9NYXkgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgbWFwIGJ5IGEgem9vbUVuZCBoYW5kbGVyXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuX21lcmdlU3BsaXRDbHVzdGVycygpO1xuXG5cdFx0XHR0aGlzLl96b29tID0gTWF0aC5yb3VuZCh0aGlzLl9tYXAuX3pvb20pO1xuXHRcdFx0dGhpcy5fY3VycmVudFNob3duQm91bmRzID0gdGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCk7XG5cdFx0fSxcblxuXHRcdF9tb3ZlRW5kOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5faW5ab29tQW5pbWF0aW9uKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG5ld0JvdW5kcyA9IHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpO1xuXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcywgTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSwgdGhpcy5fem9vbSwgbmV3Qm91bmRzKTtcblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwKG51bGwsIE1hdGgucm91bmQodGhpcy5fbWFwLl96b29tKSwgbmV3Qm91bmRzKTtcblxuXHRcdFx0dGhpcy5fY3VycmVudFNob3duQm91bmRzID0gbmV3Qm91bmRzO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0sXG5cblx0XHRfZ2VuZXJhdGVJbml0aWFsQ2x1c3RlcnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBtYXhab29tID0gTWF0aC5jZWlsKHRoaXMuX21hcC5nZXRNYXhab29tKCkpLFxuXHRcdFx0XHRtaW5ab29tID0gTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSxcblx0XHRcdFx0cmFkaXVzID0gdGhpcy5vcHRpb25zLm1heENsdXN0ZXJSYWRpdXMsXG5cdFx0XHRcdHJhZGl1c0ZuID0gcmFkaXVzO1xuXG5cdFx0XHQvL0lmIHdlIGp1c3Qgc2V0IG1heENsdXN0ZXJSYWRpdXMgdG8gYSBzaW5nbGUgbnVtYmVyLCB3ZSBuZWVkIHRvIGNyZWF0ZVxuXHRcdFx0Ly9hIHNpbXBsZSBmdW5jdGlvbiB0byByZXR1cm4gdGhhdCBudW1iZXIuIE90aGVyd2lzZSwgd2UganVzdCBoYXZlIHRvXG5cdFx0XHQvL3VzZSB0aGUgZnVuY3Rpb24gd2UndmUgcGFzc2VkIGluLlxuXHRcdFx0aWYgKHR5cGVvZiByYWRpdXMgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRyYWRpdXNGbiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJhZGl1czsgfTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQ2x1c3RlcmluZ0F0Wm9vbSAhPT0gbnVsbCkge1xuXHRcdFx0XHRtYXhab29tID0gdGhpcy5vcHRpb25zLmRpc2FibGVDbHVzdGVyaW5nQXRab29tIC0gMTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX21heFpvb20gPSBtYXhab29tO1xuXHRcdFx0dGhpcy5fZ3JpZENsdXN0ZXJzID0ge307XG5cdFx0XHR0aGlzLl9ncmlkVW5jbHVzdGVyZWQgPSB7fTtcblxuXHRcdFx0Ly9TZXQgdXAgRGlzdGFuY2VHcmlkcyBmb3IgZWFjaCB6b29tXG5cdFx0XHRmb3IgKHZhciB6b29tID0gbWF4Wm9vbTsgem9vbSA+PSBtaW5ab29tOyB6b29tLS0pIHtcblx0XHRcdFx0dGhpcy5fZ3JpZENsdXN0ZXJzW3pvb21dID0gbmV3IEwuRGlzdGFuY2VHcmlkKHJhZGl1c0ZuKHpvb20pKTtcblx0XHRcdFx0dGhpcy5fZ3JpZFVuY2x1c3RlcmVkW3pvb21dID0gbmV3IEwuRGlzdGFuY2VHcmlkKHJhZGl1c0ZuKHpvb20pKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5zdGFudGlhdGUgdGhlIGFwcHJvcHJpYXRlIEwuTWFya2VyQ2x1c3RlciBjbGFzcyAoYW5pbWF0ZWQgb3Igbm90KS5cblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbCA9IG5ldyB0aGlzLl9tYXJrZXJDbHVzdGVyKHRoaXMsIG1pblpvb20gLSAxKTtcblx0XHR9LFxuXG5cdFx0Ly9ab29tOiBab29tIHRvIHN0YXJ0IGFkZGluZyBhdCAoUGFzcyB0aGlzLl9tYXhab29tIHRvIHN0YXJ0IGF0IHRoZSBib3R0b20pXG5cdFx0X2FkZExheWVyOiBmdW5jdGlvbiAobGF5ZXIsIHpvb20pIHtcblx0XHRcdHZhciBncmlkQ2x1c3RlcnMgPSB0aGlzLl9ncmlkQ2x1c3RlcnMsXG5cdFx0XHQgICAgZ3JpZFVuY2x1c3RlcmVkID0gdGhpcy5fZ3JpZFVuY2x1c3RlcmVkLFxuXHRcdFx0XHRtaW5ab29tID0gTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSxcblx0XHRcdCAgICBtYXJrZXJQb2ludCwgejtcblxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5zaW5nbGVNYXJrZXJNb2RlKSB7XG5cdFx0XHRcdHRoaXMuX292ZXJyaWRlTWFya2VySWNvbihsYXllcik7XG5cdFx0XHR9XG5cblx0XHRcdGxheWVyLm9uKHRoaXMuX2NoaWxkTWFya2VyRXZlbnRIYW5kbGVycywgdGhpcyk7XG5cblx0XHRcdC8vRmluZCB0aGUgbG93ZXN0IHpvb20gbGV2ZWwgdG8gc2xvdCB0aGlzIG9uZSBpblxuXHRcdFx0Zm9yICg7IHpvb20gPj0gbWluWm9vbTsgem9vbS0tKSB7XG5cdFx0XHRcdG1hcmtlclBvaW50ID0gdGhpcy5fbWFwLnByb2plY3QobGF5ZXIuZ2V0TGF0TG5nKCksIHpvb20pOyAvLyBjYWxjdWxhdGUgcGl4ZWwgcG9zaXRpb25cblxuXHRcdFx0XHQvL1RyeSBmaW5kIGEgY2x1c3RlciBjbG9zZSBieVxuXHRcdFx0XHR2YXIgY2xvc2VzdCA9IGdyaWRDbHVzdGVyc1t6b29tXS5nZXROZWFyT2JqZWN0KG1hcmtlclBvaW50KTtcblx0XHRcdFx0aWYgKGNsb3Nlc3QpIHtcblx0XHRcdFx0XHRjbG9zZXN0Ll9hZGRDaGlsZChsYXllcik7XG5cdFx0XHRcdFx0bGF5ZXIuX19wYXJlbnQgPSBjbG9zZXN0O1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vVHJ5IGZpbmQgYSBtYXJrZXIgY2xvc2UgYnkgdG8gZm9ybSBhIG5ldyBjbHVzdGVyIHdpdGhcblx0XHRcdFx0Y2xvc2VzdCA9IGdyaWRVbmNsdXN0ZXJlZFt6b29tXS5nZXROZWFyT2JqZWN0KG1hcmtlclBvaW50KTtcblx0XHRcdFx0aWYgKGNsb3Nlc3QpIHtcblx0XHRcdFx0XHR2YXIgcGFyZW50ID0gY2xvc2VzdC5fX3BhcmVudDtcblx0XHRcdFx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZW1vdmVMYXllcihjbG9zZXN0LCBmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9DcmVhdGUgbmV3IGNsdXN0ZXIgd2l0aCB0aGVzZSAyIGluIGl0XG5cblx0XHRcdFx0XHR2YXIgbmV3Q2x1c3RlciA9IG5ldyB0aGlzLl9tYXJrZXJDbHVzdGVyKHRoaXMsIHpvb20sIGNsb3Nlc3QsIGxheWVyKTtcblx0XHRcdFx0XHRncmlkQ2x1c3RlcnNbem9vbV0uYWRkT2JqZWN0KG5ld0NsdXN0ZXIsIHRoaXMuX21hcC5wcm9qZWN0KG5ld0NsdXN0ZXIuX2NMYXRMbmcsIHpvb20pKTtcblx0XHRcdFx0XHRjbG9zZXN0Ll9fcGFyZW50ID0gbmV3Q2x1c3Rlcjtcblx0XHRcdFx0XHRsYXllci5fX3BhcmVudCA9IG5ld0NsdXN0ZXI7XG5cblx0XHRcdFx0XHQvL0ZpcnN0IGNyZWF0ZSBhbnkgbmV3IGludGVybWVkaWF0ZSBwYXJlbnQgY2x1c3RlcnMgdGhhdCBkb24ndCBleGlzdFxuXHRcdFx0XHRcdHZhciBsYXN0UGFyZW50ID0gbmV3Q2x1c3Rlcjtcblx0XHRcdFx0XHRmb3IgKHogPSB6b29tIC0gMTsgeiA+IHBhcmVudC5fem9vbTsgei0tKSB7XG5cdFx0XHRcdFx0XHRsYXN0UGFyZW50ID0gbmV3IHRoaXMuX21hcmtlckNsdXN0ZXIodGhpcywgeiwgbGFzdFBhcmVudCk7XG5cdFx0XHRcdFx0XHRncmlkQ2x1c3RlcnNbel0uYWRkT2JqZWN0KGxhc3RQYXJlbnQsIHRoaXMuX21hcC5wcm9qZWN0KGNsb3Nlc3QuZ2V0TGF0TG5nKCksIHopKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cGFyZW50Ll9hZGRDaGlsZChsYXN0UGFyZW50KTtcblxuXHRcdFx0XHRcdC8vUmVtb3ZlIGNsb3Nlc3QgZnJvbSB0aGlzIHpvb20gbGV2ZWwgYW5kIGFueSBhYm92ZSB0aGF0IGl0IGlzIGluLCByZXBsYWNlIHdpdGggbmV3Q2x1c3RlclxuXHRcdFx0XHRcdHRoaXMuX3JlbW92ZUZyb21HcmlkVW5jbHVzdGVyZWQoY2xvc2VzdCwgem9vbSk7XG5cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0RpZG4ndCBtYW5hZ2UgdG8gY2x1c3RlciBpbiBhdCB0aGlzIHpvb20sIHJlY29yZCB1cyBhcyBhIG1hcmtlciBoZXJlIGFuZCBjb250aW51ZSB1cHdhcmRzXG5cdFx0XHRcdGdyaWRVbmNsdXN0ZXJlZFt6b29tXS5hZGRPYmplY3QobGF5ZXIsIG1hcmtlclBvaW50KTtcblx0XHRcdH1cblxuXHRcdFx0Ly9EaWRuJ3QgZ2V0IGluIGFueXRoaW5nLCBhZGQgdXMgdG8gdGhlIHRvcFxuXHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9hZGRDaGlsZChsYXllcik7XG5cdFx0XHRsYXllci5fX3BhcmVudCA9IHRoaXMuX3RvcENsdXN0ZXJMZXZlbDtcblx0XHRcdHJldHVybjtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmVmcmVzaGVzIHRoZSBpY29uIG9mIGFsbCBcImRpcnR5XCIgdmlzaWJsZSBjbHVzdGVycy5cblx0XHQgKiBOb24tdmlzaWJsZSBcImRpcnR5XCIgY2x1c3RlcnMgd2lsbCBiZSB1cGRhdGVkIHdoZW4gdGhleSBhcmUgYWRkZWQgdG8gdGhlIG1hcC5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9yZWZyZXNoQ2x1c3RlcnNJY29uczogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmVhY2hMYXllcihmdW5jdGlvbiAoYykge1xuXHRcdFx0XHRpZiAoYyBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3RlciAmJiBjLl9pY29uTmVlZHNVcGRhdGUpIHtcblx0XHRcdFx0XHRjLl91cGRhdGVJY29uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvL0VucXVldWUgY29kZSB0byBmaXJlIGFmdGVyIHRoZSBtYXJrZXIgZXhwYW5kL2NvbnRyYWN0IGhhcyBoYXBwZW5lZFxuXHRcdF9lbnF1ZXVlOiBmdW5jdGlvbiAoZm4pIHtcblx0XHRcdHRoaXMuX3F1ZXVlLnB1c2goZm4pO1xuXHRcdFx0aWYgKCF0aGlzLl9xdWV1ZVRpbWVvdXQpIHtcblx0XHRcdFx0dGhpcy5fcXVldWVUaW1lb3V0ID0gc2V0VGltZW91dChMLmJpbmQodGhpcy5fcHJvY2Vzc1F1ZXVlLCB0aGlzKSwgMzAwKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdF9wcm9jZXNzUXVldWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcXVldWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dGhpcy5fcXVldWVbaV0uY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3F1ZXVlLmxlbmd0aCA9IDA7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fcXVldWVUaW1lb3V0KTtcblx0XHRcdHRoaXMuX3F1ZXVlVGltZW91dCA9IG51bGw7XG5cdFx0fSxcblxuXHRcdC8vTWVyZ2UgYW5kIHNwbGl0IGFueSBleGlzdGluZyBjbHVzdGVycyB0aGF0IGFyZSB0b28gYmlnIG9yIHNtYWxsXG5cdFx0X21lcmdlU3BsaXRDbHVzdGVyczogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIG1hcFpvb20gPSBNYXRoLnJvdW5kKHRoaXMuX21hcC5fem9vbSk7XG5cblx0XHRcdC8vSW4gY2FzZSB3ZSBhcmUgc3RhcnRpbmcgdG8gc3BsaXQgYmVmb3JlIHRoZSBhbmltYXRpb24gZmluaXNoZWRcblx0XHRcdHRoaXMuX3Byb2Nlc3NRdWV1ZSgpO1xuXG5cdFx0XHRpZiAodGhpcy5fem9vbSA8IG1hcFpvb20gJiYgdGhpcy5fY3VycmVudFNob3duQm91bmRzLmludGVyc2VjdHModGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCkpKSB7IC8vWm9vbSBpbiwgc3BsaXRcblx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uU3RhcnQoKTtcblx0XHRcdFx0Ly9SZW1vdmUgY2x1c3RlcnMgbm93IG9mZiBzY3JlZW5cblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseVJlbW92ZUNoaWxkcmVuRnJvbU1hcCh0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMsIE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksIHRoaXMuX3pvb20sIHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpKTtcblxuXHRcdFx0XHR0aGlzLl9hbmltYXRpb25ab29tSW4odGhpcy5fem9vbSwgbWFwWm9vbSk7XG5cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fem9vbSA+IG1hcFpvb20pIHsgLy9ab29tIG91dCwgbWVyZ2Vcblx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uU3RhcnQoKTtcblxuXHRcdFx0XHR0aGlzLl9hbmltYXRpb25ab29tT3V0KHRoaXMuX3pvb20sIG1hcFpvb20pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fbW92ZUVuZCgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL0dldHMgdGhlIG1hcHMgdmlzaWJsZSBib3VuZHMgZXhwYW5kZWQgaW4gZWFjaCBkaXJlY3Rpb24gYnkgdGhlIHNpemUgb2YgdGhlIHNjcmVlbiAoc28gdGhlIHVzZXIgY2Fubm90IHNlZSBhbiBhcmVhIHdlIGRvIG5vdCBjb3ZlciBpbiBvbmUgcGFuKVxuXHRcdF9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLnJlbW92ZU91dHNpZGVWaXNpYmxlQm91bmRzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9tYXBCb3VuZHNJbmZpbml0ZTtcblx0XHRcdH0gZWxzZSBpZiAoTC5Ccm93c2VyLm1vYmlsZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY2hlY2tCb3VuZHNNYXhMYXQodGhpcy5fbWFwLmdldEJvdW5kcygpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXMuX2NoZWNrQm91bmRzTWF4TGF0KHRoaXMuX21hcC5nZXRCb3VuZHMoKS5wYWQoMSkpOyAvLyBQYWRkaW5nIGV4cGFuZHMgdGhlIGJvdW5kcyBieSBpdHMgb3duIGRpbWVuc2lvbnMgYnV0IHNjYWxlZCB3aXRoIHRoZSBnaXZlbiBmYWN0b3IuXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEV4cGFuZHMgdGhlIGxhdGl0dWRlIHRvIEluZmluaXR5IChvciAtSW5maW5pdHkpIGlmIHRoZSBpbnB1dCBib3VuZHMgcmVhY2ggdGhlIG1hcCBwcm9qZWN0aW9uIG1heGltdW0gZGVmaW5lZCBsYXRpdHVkZVxuXHRcdCAqIChpbiB0aGUgY2FzZSBvZiBXZWIvU3BoZXJpY2FsIE1lcmNhdG9yLCBpdCBpcyA4NS4wNTExMjg3Nzk4IC8gc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dlYl9NZXJjYXRvciNGb3JtdWxhcykuXG5cdFx0ICogT3RoZXJ3aXNlLCB0aGUgcmVtb3ZlT3V0c2lkZVZpc2libGVCb3VuZHMgb3B0aW9uIHdpbGwgcmVtb3ZlIG1hcmtlcnMgYmV5b25kIHRoYXQgbGltaXQsIHdoZXJlYXMgdGhlIHNhbWUgbWFya2VycyB3aXRob3V0XG5cdFx0ICogdGhpcyBvcHRpb24gKG9yIG91dHNpZGUgTUNHKSB3aWxsIGhhdmUgdGhlaXIgcG9zaXRpb24gZmxvb3JlZCAoY2VpbGVkKSBieSB0aGUgcHJvamVjdGlvbiBhbmQgcmVuZGVyZWQgYXQgdGhhdCBsaW1pdCxcblx0XHQgKiBtYWtpbmcgdGhlIHVzZXIgdGhpbmsgdGhhdCBNQ0cgXCJlYXRzXCIgdGhlbSBhbmQgbmV2ZXIgZGlzcGxheXMgdGhlbSBhZ2Fpbi5cblx0XHQgKiBAcGFyYW0gYm91bmRzIEwuTGF0TG5nQm91bmRzXG5cdFx0ICogQHJldHVybnMge0wuTGF0TG5nQm91bmRzfVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0X2NoZWNrQm91bmRzTWF4TGF0OiBmdW5jdGlvbiAoYm91bmRzKSB7XG5cdFx0XHR2YXIgbWF4TGF0ID0gdGhpcy5fbWF4TGF0O1xuXG5cdFx0XHRpZiAobWF4TGF0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKGJvdW5kcy5nZXROb3J0aCgpID49IG1heExhdCkge1xuXHRcdFx0XHRcdGJvdW5kcy5fbm9ydGhFYXN0LmxhdCA9IEluZmluaXR5O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChib3VuZHMuZ2V0U291dGgoKSA8PSAtbWF4TGF0KSB7XG5cdFx0XHRcdFx0Ym91bmRzLl9zb3V0aFdlc3QubGF0ID0gLUluZmluaXR5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBib3VuZHM7XG5cdFx0fSxcblxuXHRcdC8vU2hhcmVkIGFuaW1hdGlvbiBjb2RlXG5cdFx0X2FuaW1hdGlvbkFkZExheWVyTm9uQW5pbWF0ZWQ6IGZ1bmN0aW9uIChsYXllciwgbmV3Q2x1c3Rlcikge1xuXHRcdFx0aWYgKG5ld0NsdXN0ZXIgPT09IGxheWVyKSB7XG5cdFx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5hZGRMYXllcihsYXllcik7XG5cdFx0XHR9IGVsc2UgaWYgKG5ld0NsdXN0ZXIuX2NoaWxkQ291bnQgPT09IDIpIHtcblx0XHRcdFx0bmV3Q2x1c3Rlci5fYWRkVG9NYXAoKTtcblxuXHRcdFx0XHR2YXIgbWFya2VycyA9IG5ld0NsdXN0ZXIuZ2V0QWxsQ2hpbGRNYXJrZXJzKCk7XG5cdFx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5yZW1vdmVMYXllcihtYXJrZXJzWzBdKTtcblx0XHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLnJlbW92ZUxheWVyKG1hcmtlcnNbMV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3Q2x1c3Rlci5fdXBkYXRlSWNvbigpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBFeHRyYWN0cyBpbmRpdmlkdWFsIChpLmUuIG5vbi1ncm91cCkgbGF5ZXJzIGZyb20gYSBMYXllciBHcm91cC5cblx0XHQgKiBAcGFyYW0gZ3JvdXAgdG8gZXh0cmFjdCBsYXllcnMgZnJvbS5cblx0XHQgKiBAcGFyYW0gb3V0cHV0IHtBcnJheX0gaW4gd2hpY2ggdG8gc3RvcmUgdGhlIGV4dHJhY3RlZCBsYXllcnMuXG5cdFx0ICogQHJldHVybnMgeyp8QXJyYXl9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRfZXh0cmFjdE5vbkdyb3VwTGF5ZXJzOiBmdW5jdGlvbiAoZ3JvdXAsIG91dHB1dCkge1xuXHRcdFx0dmFyIGxheWVycyA9IGdyb3VwLmdldExheWVycygpLFxuXHRcdFx0ICAgIGkgPSAwLFxuXHRcdFx0ICAgIGxheWVyO1xuXG5cdFx0XHRvdXRwdXQgPSBvdXRwdXQgfHwgW107XG5cblx0XHRcdGZvciAoOyBpIDwgbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxheWVyID0gbGF5ZXJzW2ldO1xuXG5cdFx0XHRcdGlmIChsYXllciBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xuXHRcdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhsYXllciwgb3V0cHV0KTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG91dHB1dC5wdXNoKGxheWVyKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW1wbGVtZW50cyB0aGUgc2luZ2xlTWFya2VyTW9kZSBvcHRpb24uXG5cdFx0ICogQHBhcmFtIGxheWVyIE1hcmtlciB0byByZS1zdHlsZSB1c2luZyB0aGUgQ2x1c3RlcnMgaWNvbkNyZWF0ZUZ1bmN0aW9uLlxuXHRcdCAqIEByZXR1cm5zIHtMLkljb259IFRoZSBuZXdseSBjcmVhdGVkIGljb24uXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRfb3ZlcnJpZGVNYXJrZXJJY29uOiBmdW5jdGlvbiAobGF5ZXIpIHtcblx0XHRcdHZhciBpY29uID0gbGF5ZXIub3B0aW9ucy5pY29uID0gdGhpcy5vcHRpb25zLmljb25DcmVhdGVGdW5jdGlvbih7XG5cdFx0XHRcdGdldENoaWxkQ291bnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Z2V0QWxsQ2hpbGRNYXJrZXJzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtsYXllcl07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gaWNvbjtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIENvbnN0YW50IGJvdW5kcyB1c2VkIGluIGNhc2Ugb3B0aW9uIFwicmVtb3ZlT3V0c2lkZVZpc2libGVCb3VuZHNcIiBpcyBzZXQgdG8gZmFsc2UuXG5cdEwuTWFya2VyQ2x1c3Rlckdyb3VwLmluY2x1ZGUoe1xuXHRcdF9tYXBCb3VuZHNJbmZpbml0ZTogbmV3IEwuTGF0TG5nQm91bmRzKG5ldyBMLkxhdExuZygtSW5maW5pdHksIC1JbmZpbml0eSksIG5ldyBMLkxhdExuZyhJbmZpbml0eSwgSW5maW5pdHkpKVxuXHR9KTtcblxuXHRMLk1hcmtlckNsdXN0ZXJHcm91cC5pbmNsdWRlKHtcblx0XHRfbm9BbmltYXRpb246IHtcblx0XHRcdC8vTm9uIEFuaW1hdGVkIHZlcnNpb25zIG9mIGV2ZXJ5dGhpbmdcblx0XHRcdF9hbmltYXRpb25TdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvL0RvIG5vdGhpbmcuLi5cblx0XHRcdH0sXG5cdFx0XHRfYW5pbWF0aW9uWm9vbUluOiBmdW5jdGlvbiAocHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCkge1xuXHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcywgTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSwgcHJldmlvdXNab29tTGV2ZWwpO1xuXHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcChudWxsLCBuZXdab29tTGV2ZWwsIHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpKTtcblxuXHRcdFx0XHQvL1dlIGRpZG4ndCBhY3R1YWxseSBhbmltYXRlLCBidXQgd2UgdXNlIHRoaXMgZXZlbnQgdG8gbWVhbiBcImNsdXN0ZXJpbmcgYW5pbWF0aW9ucyBoYXZlIGZpbmlzaGVkXCJcblx0XHRcdFx0dGhpcy5maXJlKCdhbmltYXRpb25lbmQnKTtcblx0XHRcdH0sXG5cdFx0XHRfYW5pbWF0aW9uWm9vbU91dDogZnVuY3Rpb24gKHByZXZpb3VzWm9vbUxldmVsLCBuZXdab29tTGV2ZWwpIHtcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseVJlbW92ZUNoaWxkcmVuRnJvbU1hcCh0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMsIE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksIHByZXZpb3VzWm9vbUxldmVsKTtcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseUFkZENoaWxkcmVuVG9NYXAobnVsbCwgbmV3Wm9vbUxldmVsLCB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSk7XG5cblx0XHRcdFx0Ly9XZSBkaWRuJ3QgYWN0dWFsbHkgYW5pbWF0ZSwgYnV0IHdlIHVzZSB0aGlzIGV2ZW50IHRvIG1lYW4gXCJjbHVzdGVyaW5nIGFuaW1hdGlvbnMgaGF2ZSBmaW5pc2hlZFwiXG5cdFx0XHRcdHRoaXMuZmlyZSgnYW5pbWF0aW9uZW5kJyk7XG5cdFx0XHR9LFxuXHRcdFx0X2FuaW1hdGlvbkFkZExheWVyOiBmdW5jdGlvbiAobGF5ZXIsIG5ld0NsdXN0ZXIpIHtcblx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uQWRkTGF5ZXJOb25BbmltYXRlZChsYXllciwgbmV3Q2x1c3Rlcik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF93aXRoQW5pbWF0aW9uOiB7XG5cdFx0XHQvL0FuaW1hdGVkIHZlcnNpb25zIGhlcmVcblx0XHRcdF9hbmltYXRpb25TdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lICs9ICcgbGVhZmxldC1jbHVzdGVyLWFuaW0nO1xuXHRcdFx0XHR0aGlzLl9pblpvb21BbmltYXRpb24rKztcblx0XHRcdH0sXG5cblx0XHRcdF9hbmltYXRpb25ab29tSW46IGZ1bmN0aW9uIChwcmV2aW91c1pvb21MZXZlbCwgbmV3Wm9vbUxldmVsKSB7XG5cdFx0XHRcdHZhciBib3VuZHMgPSB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSxcblx0XHRcdFx0ICAgIGZnID0gdGhpcy5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpLFxuXHRcdFx0XHQgICAgaTtcblxuXHRcdFx0XHR0aGlzLl9pZ25vcmVNb3ZlID0gdHJ1ZTtcblxuXHRcdFx0XHQvL0FkZCBhbGwgY2hpbGRyZW4gb2YgY3VycmVudCBjbHVzdGVycyB0byBtYXAgYW5kIHJlbW92ZSB0aG9zZSBjbHVzdGVycyBmcm9tIG1hcFxuXHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5KGJvdW5kcywgcHJldmlvdXNab29tTGV2ZWwsIG1pblpvb20sIGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0dmFyIHN0YXJ0UG9zID0gYy5fbGF0bG5nLFxuXHRcdFx0XHRcdCAgICBtYXJrZXJzICA9IGMuX21hcmtlcnMsXG5cdFx0XHRcdFx0ICAgIG07XG5cblx0XHRcdFx0XHRpZiAoIWJvdW5kcy5jb250YWlucyhzdGFydFBvcykpIHtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoYy5faXNTaW5nbGVQYXJlbnQoKSAmJiBwcmV2aW91c1pvb21MZXZlbCArIDEgPT09IG5ld1pvb21MZXZlbCkgeyAvL0ltbWVkaWF0ZWx5IGFkZCB0aGUgbmV3IGNoaWxkIGFuZCByZW1vdmUgdXNcblx0XHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKGMpO1xuXHRcdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwKG51bGwsIG5ld1pvb21MZXZlbCwgYm91bmRzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly9GYWRlIG91dCBvbGQgY2x1c3RlclxuXHRcdFx0XHRcdFx0Yy5jbHVzdGVySGlkZSgpO1xuXHRcdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwKHN0YXJ0UG9zLCBuZXdab29tTGV2ZWwsIGJvdW5kcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9SZW1vdmUgYWxsIG1hcmtlcnMgdGhhdCBhcmVuJ3QgdmlzaWJsZSBhbnkgbW9yZVxuXHRcdFx0XHRcdC8vVE9ETzogRG8gd2UgYWN0dWFsbHkgbmVlZCB0byBkbyB0aGlzIG9uIHRoZSBoaWdoZXIgbGV2ZWxzIHRvbz9cblx0XHRcdFx0XHRmb3IgKGkgPSBtYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRtID0gbWFya2Vyc1tpXTtcblx0XHRcdFx0XHRcdGlmICghYm91bmRzLmNvbnRhaW5zKG0uX2xhdGxuZykpIHtcblx0XHRcdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIobSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuX2ZvcmNlTGF5b3V0KCk7XG5cblx0XHRcdFx0Ly9VcGRhdGUgb3BhY2l0aWVzXG5cdFx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHlCZWNvbWVWaXNpYmxlKGJvdW5kcywgbmV3Wm9vbUxldmVsKTtcblx0XHRcdFx0Ly9UT0RPIE1heWJlPyBVcGRhdGUgbWFya2VycyBpbiBfcmVjdXJzaXZlbHlCZWNvbWVWaXNpYmxlXG5cdFx0XHRcdGZnLmVhY2hMYXllcihmdW5jdGlvbiAobikge1xuXHRcdFx0XHRcdGlmICghKG4gaW5zdGFuY2VvZiBMLk1hcmtlckNsdXN0ZXIpICYmIG4uX2ljb24pIHtcblx0XHRcdFx0XHRcdG4uY2x1c3RlclNob3coKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vdXBkYXRlIHRoZSBwb3NpdGlvbnMgb2YgdGhlIGp1c3QgYWRkZWQgY2x1c3RlcnMvbWFya2Vyc1xuXHRcdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5KGJvdW5kcywgcHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCwgZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHRjLl9yZWN1cnNpdmVseVJlc3RvcmVDaGlsZFBvc2l0aW9ucyhuZXdab29tTGV2ZWwpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLl9pZ25vcmVNb3ZlID0gZmFsc2U7XG5cblx0XHRcdFx0Ly9SZW1vdmUgdGhlIG9sZCBjbHVzdGVycyBhbmQgY2xvc2UgdGhlIHpvb20gYW5pbWF0aW9uXG5cdFx0XHRcdHRoaXMuX2VucXVldWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vdXBkYXRlIHRoZSBwb3NpdGlvbnMgb2YgdGhlIGp1c3QgYWRkZWQgY2x1c3RlcnMvbWFya2Vyc1xuXHRcdFx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHkoYm91bmRzLCBwcmV2aW91c1pvb21MZXZlbCwgbWluWm9vbSwgZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKGMpO1xuXHRcdFx0XHRcdFx0Yy5jbHVzdGVyU2hvdygpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uRW5kKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0X2FuaW1hdGlvblpvb21PdXQ6IGZ1bmN0aW9uIChwcmV2aW91c1pvb21MZXZlbCwgbmV3Wm9vbUxldmVsKSB7XG5cdFx0XHRcdHRoaXMuX2FuaW1hdGlvblpvb21PdXRTaW5nbGUodGhpcy5fdG9wQ2x1c3RlckxldmVsLCBwcmV2aW91c1pvb21MZXZlbCAtIDEsIG5ld1pvb21MZXZlbCk7XG5cblx0XHRcdFx0Ly9OZWVkIHRvIGFkZCBtYXJrZXJzIGZvciB0aG9zZSB0aGF0IHdlcmVuJ3Qgb24gdGhlIG1hcCBiZWZvcmUgYnV0IGFyZSBub3dcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseUFkZENoaWxkcmVuVG9NYXAobnVsbCwgbmV3Wm9vbUxldmVsLCB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSk7XG5cdFx0XHRcdC8vUmVtb3ZlIG1hcmtlcnMgdGhhdCB3ZXJlIG9uIHRoZSBtYXAgYmVmb3JlIGJ1dCB3b24ndCBiZSBub3dcblx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseVJlbW92ZUNoaWxkcmVuRnJvbU1hcCh0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMsIE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksIHByZXZpb3VzWm9vbUxldmVsLCB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRfYW5pbWF0aW9uQWRkTGF5ZXI6IGZ1bmN0aW9uIChsYXllciwgbmV3Q2x1c3Rlcikge1xuXHRcdFx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdFx0XHQgICAgZmcgPSB0aGlzLl9mZWF0dXJlR3JvdXA7XG5cblx0XHRcdFx0ZmcuYWRkTGF5ZXIobGF5ZXIpO1xuXHRcdFx0XHRpZiAobmV3Q2x1c3RlciAhPT0gbGF5ZXIpIHtcblx0XHRcdFx0XHRpZiAobmV3Q2x1c3Rlci5fY2hpbGRDb3VudCA+IDIpIHsgLy9XYXMgYWxyZWFkeSBhIGNsdXN0ZXJcblxuXHRcdFx0XHRcdFx0bmV3Q2x1c3Rlci5fdXBkYXRlSWNvbigpO1xuXHRcdFx0XHRcdFx0dGhpcy5fZm9yY2VMYXlvdXQoKTtcblx0XHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvblN0YXJ0KCk7XG5cblx0XHRcdFx0XHRcdGxheWVyLl9zZXRQb3ModGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChuZXdDbHVzdGVyLmdldExhdExuZygpKSk7XG5cdFx0XHRcdFx0XHRsYXllci5jbHVzdGVySGlkZSgpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9lbnF1ZXVlKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuXHRcdFx0XHRcdFx0XHRsYXllci5jbHVzdGVyU2hvdygpO1xuXG5cdFx0XHRcdFx0XHRcdG1lLl9hbmltYXRpb25FbmQoKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHsgLy9KdXN0IGJlY2FtZSBhIGNsdXN0ZXJcblx0XHRcdFx0XHRcdHRoaXMuX2ZvcmNlTGF5b3V0KCk7XG5cblx0XHRcdFx0XHRcdG1lLl9hbmltYXRpb25TdGFydCgpO1xuXHRcdFx0XHRcdFx0bWUuX2FuaW1hdGlvblpvb21PdXRTaW5nbGUobmV3Q2x1c3RlciwgdGhpcy5fbWFwLmdldE1heFpvb20oKSwgdGhpcy5fem9vbSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFByaXZhdGUgbWV0aG9kcyBmb3IgYW5pbWF0ZWQgdmVyc2lvbnMuXG5cdFx0X2FuaW1hdGlvblpvb21PdXRTaW5nbGU6IGZ1bmN0aW9uIChjbHVzdGVyLCBwcmV2aW91c1pvb21MZXZlbCwgbmV3Wm9vbUxldmVsKSB7XG5cdFx0XHR2YXIgYm91bmRzID0gdGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCksXG5cdFx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpO1xuXG5cdFx0XHQvL0FuaW1hdGUgYWxsIG9mIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVycyB0byBtb3ZlIHRvIHRoZWlyIGNsdXN0ZXIgY2VudGVyIHBvaW50XG5cdFx0XHRjbHVzdGVyLl9yZWN1cnNpdmVseUFuaW1hdGVDaGlsZHJlbkluQW5kQWRkU2VsZlRvTWFwKGJvdW5kcywgbWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwgKyAxLCBuZXdab29tTGV2ZWwpO1xuXG5cdFx0XHR2YXIgbWUgPSB0aGlzO1xuXG5cdFx0XHQvL1VwZGF0ZSB0aGUgb3BhY2l0eSAoSWYgd2UgaW1tZWRpYXRlbHkgc2V0IGl0IHRoZXkgd29uJ3QgYW5pbWF0ZSlcblx0XHRcdHRoaXMuX2ZvcmNlTGF5b3V0KCk7XG5cdFx0XHRjbHVzdGVyLl9yZWN1cnNpdmVseUJlY29tZVZpc2libGUoYm91bmRzLCBuZXdab29tTGV2ZWwpO1xuXG5cdFx0XHQvL1RPRE86IE1heWJlIHVzZSB0aGUgdHJhbnNpdGlvbiB0aW1pbmcgc3R1ZmYgdG8gbWFrZSB0aGlzIG1vcmUgcmVsaWFibGVcblx0XHRcdC8vV2hlbiB0aGUgYW5pbWF0aW9ucyBhcmUgZG9uZSwgdGlkeSB1cFxuXHRcdFx0dGhpcy5fZW5xdWV1ZShmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0Ly9UaGlzIGNsdXN0ZXIgc3RvcHBlZCBiZWluZyBhIGNsdXN0ZXIgYmVmb3JlIHRoZSB0aW1lb3V0IGZpcmVkXG5cdFx0XHRcdGlmIChjbHVzdGVyLl9jaGlsZENvdW50ID09PSAxKSB7XG5cdFx0XHRcdFx0dmFyIG0gPSBjbHVzdGVyLl9tYXJrZXJzWzBdO1xuXHRcdFx0XHRcdC8vSWYgd2Ugd2VyZSBpbiBhIGNsdXN0ZXIgYW5pbWF0aW9uIGF0IHRoZSB0aW1lIHRoZW4gdGhlIG9wYWNpdHkgYW5kIHBvc2l0aW9uIG9mIG91ciBjaGlsZCBjb3VsZCBiZSB3cm9uZyBub3csIHNvIGZpeCBpdFxuXHRcdFx0XHRcdHRoaXMuX2lnbm9yZU1vdmUgPSB0cnVlO1xuXHRcdFx0XHRcdG0uc2V0TGF0TG5nKG0uZ2V0TGF0TG5nKCkpO1xuXHRcdFx0XHRcdHRoaXMuX2lnbm9yZU1vdmUgPSBmYWxzZTtcblx0XHRcdFx0XHRpZiAobS5jbHVzdGVyU2hvdykge1xuXHRcdFx0XHRcdFx0bS5jbHVzdGVyU2hvdygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjbHVzdGVyLl9yZWN1cnNpdmVseShib3VuZHMsIG5ld1pvb21MZXZlbCwgbWluWm9vbSwgZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHRcdGMuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKGJvdW5kcywgbWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwgKyAxKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRtZS5fYW5pbWF0aW9uRW5kKCk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0X2FuaW1hdGlvbkVuZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuX21hcCkge1xuXHRcdFx0XHR0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lID0gdGhpcy5fbWFwLl9tYXBQYW5lLmNsYXNzTmFtZS5yZXBsYWNlKCcgbGVhZmxldC1jbHVzdGVyLWFuaW0nLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9pblpvb21BbmltYXRpb24tLTtcblx0XHRcdHRoaXMuZmlyZSgnYW5pbWF0aW9uZW5kJyk7XG5cdFx0fSxcblxuXHRcdC8vRm9yY2UgYSBicm93c2VyIGxheW91dCBvZiBzdHVmZiBpbiB0aGUgbWFwXG5cdFx0Ly8gU2hvdWxkIGFwcGx5IHRoZSBjdXJyZW50IG9wYWNpdHkgYW5kIGxvY2F0aW9uIHRvIGFsbCBlbGVtZW50cyBzbyB3ZSBjYW4gdXBkYXRlIHRoZW0gYWdhaW4gZm9yIGFuIGFuaW1hdGlvblxuXHRcdF9mb3JjZUxheW91dDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly9JbiBteSB0ZXN0aW5nIHRoaXMgd29ya3MsIGluZmFjdCBvZmZzZXRXaWR0aCBvZiBhbnkgZWxlbWVudCBzZWVtcyB0byB3b3JrLlxuXHRcdFx0Ly9Db3VsZCBsb29wIGFsbCB0aGlzLl9sYXllcnMgYW5kIGRvIHRoaXMgZm9yIGVhY2ggX2ljb24gaWYgaXQgc3RvcHMgd29ya2luZ1xuXG5cdFx0XHRMLlV0aWwuZmFsc2VGbihkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoKTtcblx0XHR9XG5cdH0pO1xuXG5cdEwubWFya2VyQ2x1c3Rlckdyb3VwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gbmV3IEwuTWFya2VyQ2x1c3Rlckdyb3VwKG9wdGlvbnMpO1xuXHR9O1xuXG5cdHZhciBNYXJrZXJDbHVzdGVyID0gTC5NYXJrZXJDbHVzdGVyID0gTC5NYXJrZXIuZXh0ZW5kKHtcblx0XHRvcHRpb25zOiBMLkljb24ucHJvdG90eXBlLm9wdGlvbnMsXG5cblx0XHRpbml0aWFsaXplOiBmdW5jdGlvbiAoZ3JvdXAsIHpvb20sIGEsIGIpIHtcblxuXHRcdFx0TC5NYXJrZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBhID8gKGEuX2NMYXRMbmcgfHwgYS5nZXRMYXRMbmcoKSkgOiBuZXcgTC5MYXRMbmcoMCwgMCksXG5cdCAgICAgICAgICAgIHsgaWNvbjogdGhpcywgcGFuZTogZ3JvdXAub3B0aW9ucy5jbHVzdGVyUGFuZSB9KTtcblxuXHRcdFx0dGhpcy5fZ3JvdXAgPSBncm91cDtcblx0XHRcdHRoaXMuX3pvb20gPSB6b29tO1xuXG5cdFx0XHR0aGlzLl9tYXJrZXJzID0gW107XG5cdFx0XHR0aGlzLl9jaGlsZENsdXN0ZXJzID0gW107XG5cdFx0XHR0aGlzLl9jaGlsZENvdW50ID0gMDtcblx0XHRcdHRoaXMuX2ljb25OZWVkc1VwZGF0ZSA9IHRydWU7XG5cdFx0XHR0aGlzLl9ib3VuZHNOZWVkVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy5fYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKCk7XG5cblx0XHRcdGlmIChhKSB7XG5cdFx0XHRcdHRoaXMuX2FkZENoaWxkKGEpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGIpIHtcblx0XHRcdFx0dGhpcy5fYWRkQ2hpbGQoYik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vUmVjdXJzaXZlbHkgcmV0cmlldmUgYWxsIGNoaWxkIG1hcmtlcnMgb2YgdGhpcyBjbHVzdGVyXG5cdFx0Z2V0QWxsQ2hpbGRNYXJrZXJzOiBmdW5jdGlvbiAoc3RvcmFnZUFycmF5LCBpZ25vcmVEcmFnZ2VkTWFya2VyKSB7XG5cdFx0XHRzdG9yYWdlQXJyYXkgPSBzdG9yYWdlQXJyYXkgfHwgW107XG5cblx0XHRcdGZvciAodmFyIGkgPSB0aGlzLl9jaGlsZENsdXN0ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdHRoaXMuX2NoaWxkQ2x1c3RlcnNbaV0uZ2V0QWxsQ2hpbGRNYXJrZXJzKHN0b3JhZ2VBcnJheSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGogPSB0aGlzLl9tYXJrZXJzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG5cdFx0XHRcdGlmIChpZ25vcmVEcmFnZ2VkTWFya2VyICYmIHRoaXMuX21hcmtlcnNbal0uX19kcmFnU3RhcnQpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzdG9yYWdlQXJyYXkucHVzaCh0aGlzLl9tYXJrZXJzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHN0b3JhZ2VBcnJheTtcblx0XHR9LFxuXG5cdFx0Ly9SZXR1cm5zIHRoZSBjb3VudCBvZiBob3cgbWFueSBjaGlsZCBtYXJrZXJzIHdlIGhhdmVcblx0XHRnZXRDaGlsZENvdW50OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY2hpbGRDb3VudDtcblx0XHR9LFxuXG5cdFx0Ly9ab29tIHRvIHRoZSBtaW5pbXVtIG9mIHNob3dpbmcgYWxsIG9mIHRoZSBjaGlsZCBtYXJrZXJzLCBvciB0aGUgZXh0ZW50cyBvZiB0aGlzIGNsdXN0ZXJcblx0XHR6b29tVG9Cb3VuZHM6IGZ1bmN0aW9uIChmaXRCb3VuZHNPcHRpb25zKSB7XG5cdFx0XHR2YXIgY2hpbGRDbHVzdGVycyA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMuc2xpY2UoKSxcblx0XHRcdFx0bWFwID0gdGhpcy5fZ3JvdXAuX21hcCxcblx0XHRcdFx0Ym91bmRzWm9vbSA9IG1hcC5nZXRCb3VuZHNab29tKHRoaXMuX2JvdW5kcyksXG5cdFx0XHRcdHpvb20gPSB0aGlzLl96b29tICsgMSxcblx0XHRcdFx0bWFwWm9vbSA9IG1hcC5nZXRab29tKCksXG5cdFx0XHRcdGk7XG5cblx0XHRcdC8vY2FsY3VsYXRlIGhvdyBmYXIgd2UgbmVlZCB0byB6b29tIGRvd24gdG8gc2VlIGFsbCBvZiB0aGUgbWFya2Vyc1xuXHRcdFx0d2hpbGUgKGNoaWxkQ2x1c3RlcnMubGVuZ3RoID4gMCAmJiBib3VuZHNab29tID4gem9vbSkge1xuXHRcdFx0XHR6b29tKys7XG5cdFx0XHRcdHZhciBuZXdDbHVzdGVycyA9IFtdO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hpbGRDbHVzdGVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdG5ld0NsdXN0ZXJzID0gbmV3Q2x1c3RlcnMuY29uY2F0KGNoaWxkQ2x1c3RlcnNbaV0uX2NoaWxkQ2x1c3RlcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNoaWxkQ2x1c3RlcnMgPSBuZXdDbHVzdGVycztcblx0XHRcdH1cblxuXHRcdFx0aWYgKGJvdW5kc1pvb20gPiB6b29tKSB7XG5cdFx0XHRcdHRoaXMuX2dyb3VwLl9tYXAuc2V0Vmlldyh0aGlzLl9sYXRsbmcsIHpvb20pO1xuXHRcdFx0fSBlbHNlIGlmIChib3VuZHNab29tIDw9IG1hcFpvb20pIHsgLy9JZiBmaXRCb3VuZHMgd291bGRuJ3Qgem9vbSB1cyBkb3duLCB6b29tIHVzIGRvd24gaW5zdGVhZFxuXHRcdFx0XHR0aGlzLl9ncm91cC5fbWFwLnNldFZpZXcodGhpcy5fbGF0bG5nLCBtYXBab29tICsgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9ncm91cC5fbWFwLmZpdEJvdW5kcyh0aGlzLl9ib3VuZHMsIGZpdEJvdW5kc09wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcblx0XHRcdGJvdW5kcy5leHRlbmQodGhpcy5fYm91bmRzKTtcblx0XHRcdHJldHVybiBib3VuZHM7XG5cdFx0fSxcblxuXHRcdF91cGRhdGVJY29uOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9pY29uTmVlZHNVcGRhdGUgPSB0cnVlO1xuXHRcdFx0aWYgKHRoaXMuX2ljb24pIHtcblx0XHRcdFx0dGhpcy5zZXRJY29uKHRoaXMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL0NsdWRnZSBmb3IgSWNvbiwgd2UgcHJldGVuZCB0byBiZSBhbiBpY29uIGZvciBwZXJmb3JtYW5jZVxuXHRcdGNyZWF0ZUljb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLl9pY29uTmVlZHNVcGRhdGUpIHtcblx0XHRcdFx0dGhpcy5faWNvbk9iaiA9IHRoaXMuX2dyb3VwLm9wdGlvbnMuaWNvbkNyZWF0ZUZ1bmN0aW9uKHRoaXMpO1xuXHRcdFx0XHR0aGlzLl9pY29uTmVlZHNVcGRhdGUgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLl9pY29uT2JqLmNyZWF0ZUljb24oKTtcblx0XHR9LFxuXHRcdGNyZWF0ZVNoYWRvdzogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2ljb25PYmouY3JlYXRlU2hhZG93KCk7XG5cdFx0fSxcblxuXG5cdFx0X2FkZENoaWxkOiBmdW5jdGlvbiAobmV3MSwgaXNOb3RpZmljYXRpb25Gcm9tQ2hpbGQpIHtcblxuXHRcdFx0dGhpcy5faWNvbk5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy5fYm91bmRzTmVlZFVwZGF0ZSA9IHRydWU7XG5cdFx0XHR0aGlzLl9zZXRDbHVzdGVyQ2VudGVyKG5ldzEpO1xuXG5cdFx0XHRpZiAobmV3MSBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlcikge1xuXHRcdFx0XHRpZiAoIWlzTm90aWZpY2F0aW9uRnJvbUNoaWxkKSB7XG5cdFx0XHRcdFx0dGhpcy5fY2hpbGRDbHVzdGVycy5wdXNoKG5ldzEpO1xuXHRcdFx0XHRcdG5ldzEuX19wYXJlbnQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2NoaWxkQ291bnQgKz0gbmV3MS5fY2hpbGRDb3VudDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghaXNOb3RpZmljYXRpb25Gcm9tQ2hpbGQpIHtcblx0XHRcdFx0XHR0aGlzLl9tYXJrZXJzLnB1c2gobmV3MSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2hpbGRDb3VudCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fX3BhcmVudCkge1xuXHRcdFx0XHR0aGlzLl9fcGFyZW50Ll9hZGRDaGlsZChuZXcxLCB0cnVlKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTWFrZXMgc3VyZSB0aGUgY2x1c3RlciBjZW50ZXIgaXMgc2V0LiBJZiBub3QsIHVzZXMgdGhlIGNoaWxkIGNlbnRlciBpZiBpdCBpcyBhIGNsdXN0ZXIsIG9yIHRoZSBtYXJrZXIgcG9zaXRpb24uXG5cdFx0ICogQHBhcmFtIGNoaWxkIEwuTWFya2VyQ2x1c3RlcnxMLk1hcmtlciB0aGF0IHdpbGwgYmUgdXNlZCBhcyBjbHVzdGVyIGNlbnRlciBpZiBub3QgZGVmaW5lZCB5ZXQuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRfc2V0Q2x1c3RlckNlbnRlcjogZnVuY3Rpb24gKGNoaWxkKSB7XG5cdFx0XHRpZiAoIXRoaXMuX2NMYXRMbmcpIHtcblx0XHRcdFx0Ly8gd2hlbiBjbHVzdGVyaW5nLCB0YWtlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2ludCBhcyB0aGUgY2x1c3RlciBjZW50ZXJcblx0XHRcdFx0dGhpcy5fY0xhdExuZyA9IGNoaWxkLl9jTGF0TG5nIHx8IGNoaWxkLl9sYXRsbmc7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEFzc2lnbnMgaW1wb3NzaWJsZSBib3VuZGluZyB2YWx1ZXMgc28gdGhhdCB0aGUgbmV4dCBleHRlbmQgZW50aXJlbHkgZGV0ZXJtaW5lcyB0aGUgbmV3IGJvdW5kcy5cblx0XHQgKiBUaGlzIG1ldGhvZCBhdm9pZHMgaGF2aW5nIHRvIHRyYXNoIHRoZSBwcmV2aW91cyBMLkxhdExuZ0JvdW5kcyBvYmplY3QgYW5kIHRvIGNyZWF0ZSBhIG5ldyBvbmUsIHdoaWNoIGlzIG11Y2ggc2xvd2VyIGZvciB0aGlzIGNsYXNzLlxuXHRcdCAqIEFzIGxvbmcgYXMgdGhlIGJvdW5kcyBhcmUgbm90IGV4dGVuZGVkLCBtb3N0IG90aGVyIG1ldGhvZHMgd291bGQgcHJvYmFibHkgZmFpbCwgYXMgdGhleSB3b3VsZCB3aXRoIGJvdW5kcyBpbml0aWFsaXplZCBidXQgbm90IGV4dGVuZGVkLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0X3Jlc2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xuXG5cdFx0XHRpZiAoYm91bmRzLl9zb3V0aFdlc3QpIHtcblx0XHRcdFx0Ym91bmRzLl9zb3V0aFdlc3QubGF0ID0gSW5maW5pdHk7XG5cdFx0XHRcdGJvdW5kcy5fc291dGhXZXN0LmxuZyA9IEluZmluaXR5O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGJvdW5kcy5fbm9ydGhFYXN0KSB7XG5cdFx0XHRcdGJvdW5kcy5fbm9ydGhFYXN0LmxhdCA9IC1JbmZpbml0eTtcblx0XHRcdFx0Ym91bmRzLl9ub3J0aEVhc3QubG5nID0gLUluZmluaXR5O1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcmVjYWxjdWxhdGVCb3VuZHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBtYXJrZXJzID0gdGhpcy5fbWFya2Vycyxcblx0XHRcdCAgICBjaGlsZENsdXN0ZXJzID0gdGhpcy5fY2hpbGRDbHVzdGVycyxcblx0XHRcdCAgICBsYXRTdW0gPSAwLFxuXHRcdFx0ICAgIGxuZ1N1bSA9IDAsXG5cdFx0XHQgICAgdG90YWxDb3VudCA9IHRoaXMuX2NoaWxkQ291bnQsXG5cdFx0XHQgICAgaSwgY2hpbGQsIGNoaWxkTGF0TG5nLCBjaGlsZENvdW50O1xuXG5cdFx0XHQvLyBDYXNlIHdoZXJlIGFsbCBtYXJrZXJzIGFyZSByZW1vdmVkIGZyb20gdGhlIG1hcCBhbmQgd2UgYXJlIGxlZnQgd2l0aCBqdXN0IGFuIGVtcHR5IF90b3BDbHVzdGVyTGV2ZWwuXG5cdFx0XHRpZiAodG90YWxDb3VudCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlc2V0IHJhdGhlciB0aGFuIGNyZWF0aW5nIGEgbmV3IG9iamVjdCwgZm9yIHBlcmZvcm1hbmNlLlxuXHRcdFx0dGhpcy5fcmVzZXRCb3VuZHMoKTtcblxuXHRcdFx0Ly8gQ2hpbGQgbWFya2Vycy5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNoaWxkTGF0TG5nID0gbWFya2Vyc1tpXS5fbGF0bG5nO1xuXG5cdFx0XHRcdHRoaXMuX2JvdW5kcy5leHRlbmQoY2hpbGRMYXRMbmcpO1xuXG5cdFx0XHRcdGxhdFN1bSArPSBjaGlsZExhdExuZy5sYXQ7XG5cdFx0XHRcdGxuZ1N1bSArPSBjaGlsZExhdExuZy5sbmc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoaWxkIGNsdXN0ZXJzLlxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGNoaWxkQ2x1c3RlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y2hpbGQgPSBjaGlsZENsdXN0ZXJzW2ldO1xuXG5cdFx0XHRcdC8vIFJlLWNvbXB1dGUgY2hpbGQgYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbiBmaXJzdCBpZiBuZWNlc3NhcnkuXG5cdFx0XHRcdGlmIChjaGlsZC5fYm91bmRzTmVlZFVwZGF0ZSkge1xuXHRcdFx0XHRcdGNoaWxkLl9yZWNhbGN1bGF0ZUJvdW5kcygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fYm91bmRzLmV4dGVuZChjaGlsZC5fYm91bmRzKTtcblxuXHRcdFx0XHRjaGlsZExhdExuZyA9IGNoaWxkLl93TGF0TG5nO1xuXHRcdFx0XHRjaGlsZENvdW50ID0gY2hpbGQuX2NoaWxkQ291bnQ7XG5cblx0XHRcdFx0bGF0U3VtICs9IGNoaWxkTGF0TG5nLmxhdCAqIGNoaWxkQ291bnQ7XG5cdFx0XHRcdGxuZ1N1bSArPSBjaGlsZExhdExuZy5sbmcgKiBjaGlsZENvdW50O1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9sYXRsbmcgPSB0aGlzLl93TGF0TG5nID0gbmV3IEwuTGF0TG5nKGxhdFN1bSAvIHRvdGFsQ291bnQsIGxuZ1N1bSAvIHRvdGFsQ291bnQpO1xuXG5cdFx0XHQvLyBSZXNldCBkaXJ0eSBmbGFnLlxuXHRcdFx0dGhpcy5fYm91bmRzTmVlZFVwZGF0ZSA9IGZhbHNlO1xuXHRcdH0sXG5cblx0XHQvL1NldCBvdXIgbWFya2VycyBwb3NpdGlvbiBhcyBnaXZlbiBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcblx0XHRfYWRkVG9NYXA6IGZ1bmN0aW9uIChzdGFydFBvcykge1xuXHRcdFx0aWYgKHN0YXJ0UG9zKSB7XG5cdFx0XHRcdHRoaXMuX2JhY2t1cExhdGxuZyA9IHRoaXMuX2xhdGxuZztcblx0XHRcdFx0dGhpcy5zZXRMYXRMbmcoc3RhcnRQb3MpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZ3JvdXAuX2ZlYXR1cmVHcm91cC5hZGRMYXllcih0aGlzKTtcblx0XHR9LFxuXG5cdFx0X3JlY3Vyc2l2ZWx5QW5pbWF0ZUNoaWxkcmVuSW46IGZ1bmN0aW9uIChib3VuZHMsIGNlbnRlciwgbWF4Wm9vbSkge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCB0aGlzLl9ncm91cC5fbWFwLmdldE1pblpvb20oKSwgbWF4Wm9vbSAtIDEsXG5cdFx0XHRcdGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0dmFyIG1hcmtlcnMgPSBjLl9tYXJrZXJzLFxuXHRcdFx0XHRcdFx0aSwgbTtcblx0XHRcdFx0XHRmb3IgKGkgPSBtYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRtID0gbWFya2Vyc1tpXTtcblxuXHRcdFx0XHRcdFx0Ly9Pbmx5IGRvIGl0IGlmIHRoZSBpY29uIGlzIHN0aWxsIG9uIHRoZSBtYXBcblx0XHRcdFx0XHRcdGlmIChtLl9pY29uKSB7XG5cdFx0XHRcdFx0XHRcdG0uX3NldFBvcyhjZW50ZXIpO1xuXHRcdFx0XHRcdFx0XHRtLmNsdXN0ZXJIaWRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbiAoYykge1xuXHRcdFx0XHRcdHZhciBjaGlsZENsdXN0ZXJzID0gYy5fY2hpbGRDbHVzdGVycyxcblx0XHRcdFx0XHRcdGosIGNtO1xuXHRcdFx0XHRcdGZvciAoaiA9IGNoaWxkQ2x1c3RlcnMubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcblx0XHRcdFx0XHRcdGNtID0gY2hpbGRDbHVzdGVyc1tqXTtcblx0XHRcdFx0XHRcdGlmIChjbS5faWNvbikge1xuXHRcdFx0XHRcdFx0XHRjbS5fc2V0UG9zKGNlbnRlcik7XG5cdFx0XHRcdFx0XHRcdGNtLmNsdXN0ZXJIaWRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRfcmVjdXJzaXZlbHlBbmltYXRlQ2hpbGRyZW5JbkFuZEFkZFNlbGZUb01hcDogZnVuY3Rpb24gKGJvdW5kcywgbWFwTWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCkge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCBuZXdab29tTGV2ZWwsIG1hcE1pblpvb20sXG5cdFx0XHRcdGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHlBbmltYXRlQ2hpbGRyZW5Jbihib3VuZHMsIGMuX2dyb3VwLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGMuZ2V0TGF0TG5nKCkpLnJvdW5kKCksIHByZXZpb3VzWm9vbUxldmVsKTtcblxuXHRcdFx0XHRcdC8vVE9ETzogZGVwdGhUb0FuaW1hdGVJbiBhZmZlY3RzIF9pc1NpbmdsZVBhcmVudCwgaWYgdGhlcmUgaXMgYSBtdWx0aXpvb20gd2UgbWF5L21heSBub3QgYmUuXG5cdFx0XHRcdFx0Ly9BcyBhIGhhY2sgd2Ugb25seSBkbyBhIGFuaW1hdGlvbiBmcmVlIHpvb20gb24gYSBzaW5nbGUgbGV2ZWwgem9vbSwgaWYgc29tZW9uZSBkb2VzIG11bHRpcGxlIGxldmVscyB0aGVuIHdlIGFsd2F5cyBhbmltYXRlXG5cdFx0XHRcdFx0aWYgKGMuX2lzU2luZ2xlUGFyZW50KCkgJiYgcHJldmlvdXNab29tTGV2ZWwgLSAxID09PSBuZXdab29tTGV2ZWwpIHtcblx0XHRcdFx0XHRcdGMuY2x1c3RlclNob3coKTtcblx0XHRcdFx0XHRcdGMuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKGJvdW5kcywgbWFwTWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwpOyAvL0ltbWVkaWF0ZWx5IHJlbW92ZSBvdXIgY2hpbGRyZW4gYXMgd2UgYXJlIHJlcGxhY2luZyB0aGVtLiBUT0RPIHByZXZpb3VzQm91bmRzIG5vdCBib3VuZHNcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Yy5jbHVzdGVySGlkZSgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGMuX2FkZFRvTWFwKCk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdF9yZWN1cnNpdmVseUJlY29tZVZpc2libGU6IGZ1bmN0aW9uIChib3VuZHMsIHpvb21MZXZlbCkge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCB0aGlzLl9ncm91cC5fbWFwLmdldE1pblpvb20oKSwgem9vbUxldmVsLCBudWxsLCBmdW5jdGlvbiAoYykge1xuXHRcdFx0XHRjLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0X3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcDogZnVuY3Rpb24gKHN0YXJ0UG9zLCB6b29tTGV2ZWwsIGJvdW5kcykge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCB0aGlzLl9ncm91cC5fbWFwLmdldE1pblpvb20oKSAtIDEsIHpvb21MZXZlbCxcblx0XHRcdFx0ZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHRpZiAoem9vbUxldmVsID09PSBjLl96b29tKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9BZGQgb3VyIGNoaWxkIG1hcmtlcnMgYXQgc3RhcnRQb3MgKHNvIHRoZXkgY2FuIGJlIGFuaW1hdGVkIG91dClcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gYy5fbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0dmFyIG5tID0gYy5fbWFya2Vyc1tpXTtcblxuXHRcdFx0XHRcdFx0aWYgKCFib3VuZHMuY29udGFpbnMobm0uX2xhdGxuZykpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChzdGFydFBvcykge1xuXHRcdFx0XHRcdFx0XHRubS5fYmFja3VwTGF0bG5nID0gbm0uZ2V0TGF0TG5nKCk7XG5cblx0XHRcdFx0XHRcdFx0bm0uc2V0TGF0TG5nKHN0YXJ0UG9zKTtcblx0XHRcdFx0XHRcdFx0aWYgKG5tLmNsdXN0ZXJIaWRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm0uY2x1c3RlckhpZGUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjLl9ncm91cC5fZmVhdHVyZUdyb3VwLmFkZExheWVyKG5tKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0Yy5fYWRkVG9NYXAoc3RhcnRQb3MpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRfcmVjdXJzaXZlbHlSZXN0b3JlQ2hpbGRQb3NpdGlvbnM6IGZ1bmN0aW9uICh6b29tTGV2ZWwpIHtcblx0XHRcdC8vRml4IHBvc2l0aW9ucyBvZiBjaGlsZCBtYXJrZXJzXG5cdFx0XHRmb3IgKHZhciBpID0gdGhpcy5fbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHR2YXIgbm0gPSB0aGlzLl9tYXJrZXJzW2ldO1xuXHRcdFx0XHRpZiAobm0uX2JhY2t1cExhdGxuZykge1xuXHRcdFx0XHRcdG5tLnNldExhdExuZyhubS5fYmFja3VwTGF0bG5nKTtcblx0XHRcdFx0XHRkZWxldGUgbm0uX2JhY2t1cExhdGxuZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoem9vbUxldmVsIC0gMSA9PT0gdGhpcy5fem9vbSkge1xuXHRcdFx0XHQvL1JlcG9zaXRpb24gY2hpbGQgY2x1c3RlcnNcblx0XHRcdFx0Zm9yICh2YXIgaiA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcblx0XHRcdFx0XHR0aGlzLl9jaGlsZENsdXN0ZXJzW2pdLl9yZXN0b3JlUG9zaXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICh2YXIgayA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMubGVuZ3RoIC0gMTsgayA+PSAwOyBrLS0pIHtcblx0XHRcdFx0XHR0aGlzLl9jaGlsZENsdXN0ZXJzW2tdLl9yZWN1cnNpdmVseVJlc3RvcmVDaGlsZFBvc2l0aW9ucyh6b29tTGV2ZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9yZXN0b3JlUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLl9iYWNrdXBMYXRsbmcpIHtcblx0XHRcdFx0dGhpcy5zZXRMYXRMbmcodGhpcy5fYmFja3VwTGF0bG5nKTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2JhY2t1cExhdGxuZztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9leGNlcHRCb3VuZHM6IElmIHNldCwgZG9uJ3QgcmVtb3ZlIGFueSBtYXJrZXJzL2NsdXN0ZXJzIGluIGl0XG5cdFx0X3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwOiBmdW5jdGlvbiAocHJldmlvdXNCb3VuZHMsIG1hcE1pblpvb20sIHpvb21MZXZlbCwgZXhjZXB0Qm91bmRzKSB7XG5cdFx0XHR2YXIgbSwgaTtcblx0XHRcdHRoaXMuX3JlY3Vyc2l2ZWx5KHByZXZpb3VzQm91bmRzLCBtYXBNaW5ab29tIC0gMSwgem9vbUxldmVsIC0gMSxcblx0XHRcdFx0ZnVuY3Rpb24gKGMpIHtcblx0XHRcdFx0XHQvL1JlbW92ZSBtYXJrZXJzIGF0IGV2ZXJ5IGxldmVsXG5cdFx0XHRcdFx0Zm9yIChpID0gYy5fbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0bSA9IGMuX21hcmtlcnNbaV07XG5cdFx0XHRcdFx0XHRpZiAoIWV4Y2VwdEJvdW5kcyB8fCAhZXhjZXB0Qm91bmRzLmNvbnRhaW5zKG0uX2xhdGxuZykpIHtcblx0XHRcdFx0XHRcdFx0Yy5fZ3JvdXAuX2ZlYXR1cmVHcm91cC5yZW1vdmVMYXllcihtKTtcblx0XHRcdFx0XHRcdFx0aWYgKG0uY2x1c3RlclNob3cpIHtcblx0XHRcdFx0XHRcdFx0XHRtLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uIChjKSB7XG5cdFx0XHRcdFx0Ly9SZW1vdmUgY2hpbGQgY2x1c3RlcnMgYXQganVzdCB0aGUgYm90dG9tIGxldmVsXG5cdFx0XHRcdFx0Zm9yIChpID0gYy5fY2hpbGRDbHVzdGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0bSA9IGMuX2NoaWxkQ2x1c3RlcnNbaV07XG5cdFx0XHRcdFx0XHRpZiAoIWV4Y2VwdEJvdW5kcyB8fCAhZXhjZXB0Qm91bmRzLmNvbnRhaW5zKG0uX2xhdGxuZykpIHtcblx0XHRcdFx0XHRcdFx0Yy5fZ3JvdXAuX2ZlYXR1cmVHcm91cC5yZW1vdmVMYXllcihtKTtcblx0XHRcdFx0XHRcdFx0aWYgKG0uY2x1c3RlclNob3cpIHtcblx0XHRcdFx0XHRcdFx0XHRtLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdC8vUnVuIHRoZSBnaXZlbiBmdW5jdGlvbnMgcmVjdXJzaXZlbHkgdG8gdGhpcyBhbmQgY2hpbGQgY2x1c3RlcnNcblx0XHQvLyBib3VuZHNUb0FwcGx5VG86IGEgTC5MYXRMbmdCb3VuZHMgcmVwcmVzZW50aW5nIHRoZSBib3VuZHMgb2Ygd2hhdCBjbHVzdGVycyB0byByZWN1cnNlIGluIHRvXG5cdFx0Ly8gem9vbUxldmVsVG9TdGFydDogem9vbSBsZXZlbCB0byBzdGFydCBydW5uaW5nIGZ1bmN0aW9ucyAoaW5jbHVzaXZlKVxuXHRcdC8vIHpvb21MZXZlbFRvU3RvcDogem9vbSBsZXZlbCB0byBzdG9wIHJ1bm5pbmcgZnVuY3Rpb25zIChpbmNsdXNpdmUpXG5cdFx0Ly8gcnVuQXRFdmVyeUxldmVsOiBmdW5jdGlvbiB0aGF0IHRha2VzIGFuIEwuTWFya2VyQ2x1c3RlciBhcyBhbiBhcmd1bWVudCB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIG9uIGV2ZXJ5IGxldmVsXG5cdFx0Ly8gcnVuQXRCb3R0b21MZXZlbDogZnVuY3Rpb24gdGhhdCB0YWtlcyBhbiBMLk1hcmtlckNsdXN0ZXIgYXMgYW4gYXJndW1lbnQgdGhhdCBzaG91bGQgYmUgYXBwbGllZCBhdCBvbmx5IHRoZSBib3R0b20gbGV2ZWxcblx0XHRfcmVjdXJzaXZlbHk6IGZ1bmN0aW9uIChib3VuZHNUb0FwcGx5VG8sIHpvb21MZXZlbFRvU3RhcnQsIHpvb21MZXZlbFRvU3RvcCwgcnVuQXRFdmVyeUxldmVsLCBydW5BdEJvdHRvbUxldmVsKSB7XG5cdFx0XHR2YXIgY2hpbGRDbHVzdGVycyA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMsXG5cdFx0XHQgICAgem9vbSA9IHRoaXMuX3pvb20sXG5cdFx0XHQgICAgaSwgYztcblxuXHRcdFx0aWYgKHpvb21MZXZlbFRvU3RhcnQgPD0gem9vbSkge1xuXHRcdFx0XHRpZiAocnVuQXRFdmVyeUxldmVsKSB7XG5cdFx0XHRcdFx0cnVuQXRFdmVyeUxldmVsKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChydW5BdEJvdHRvbUxldmVsICYmIHpvb20gPT09IHpvb21MZXZlbFRvU3RvcCkge1xuXHRcdFx0XHRcdHJ1bkF0Qm90dG9tTGV2ZWwodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHpvb20gPCB6b29tTGV2ZWxUb1N0YXJ0IHx8IHpvb20gPCB6b29tTGV2ZWxUb1N0b3ApIHtcblx0XHRcdFx0Zm9yIChpID0gY2hpbGRDbHVzdGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdGMgPSBjaGlsZENsdXN0ZXJzW2ldO1xuXHRcdFx0XHRcdGlmIChjLl9ib3VuZHNOZWVkVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRjLl9yZWNhbGN1bGF0ZUJvdW5kcygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYm91bmRzVG9BcHBseVRvLmludGVyc2VjdHMoYy5fYm91bmRzKSkge1xuXHRcdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHkoYm91bmRzVG9BcHBseVRvLCB6b29tTGV2ZWxUb1N0YXJ0LCB6b29tTGV2ZWxUb1N0b3AsIHJ1bkF0RXZlcnlMZXZlbCwgcnVuQXRCb3R0b21MZXZlbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vUmV0dXJucyB0cnVlIGlmIHdlIGFyZSB0aGUgcGFyZW50IG9mIG9ubHkgb25lIGNsdXN0ZXIgYW5kIHRoYXQgY2x1c3RlciBpcyB0aGUgc2FtZSBhcyB1c1xuXHRcdF9pc1NpbmdsZVBhcmVudDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly9Eb24ndCBuZWVkIHRvIGNoZWNrIHRoaXMuX21hcmtlcnMgYXMgdGhlIHJlc3Qgd29uJ3Qgd29yayBpZiB0aGVyZSBhcmUgYW55XG5cdFx0XHRyZXR1cm4gdGhpcy5fY2hpbGRDbHVzdGVycy5sZW5ndGggPiAwICYmIHRoaXMuX2NoaWxkQ2x1c3RlcnNbMF0uX2NoaWxkQ291bnQgPT09IHRoaXMuX2NoaWxkQ291bnQ7XG5cdFx0fVxuXHR9KTtcblxuXHQvKlxuXHQqIEV4dGVuZHMgTC5NYXJrZXIgdG8gaW5jbHVkZSB0d28gZXh0cmEgbWV0aG9kczogY2x1c3RlckhpZGUgYW5kIGNsdXN0ZXJTaG93LlxuXHQqIFxuXHQqIFRoZXkgd29yayBhcyBzZXRPcGFjaXR5KDApIGFuZCBzZXRPcGFjaXR5KDEpIHJlc3BlY3RpdmVseSwgYnV0XG5cdCogZG9uJ3Qgb3ZlcndyaXRlIHRoZSBvcHRpb25zLm9wYWNpdHlcblx0KiBcblx0Ki9cblxuXHRMLk1hcmtlci5pbmNsdWRlKHtcblx0XHRjbHVzdGVySGlkZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGJhY2t1cCA9IHRoaXMub3B0aW9ucy5vcGFjaXR5O1xuXHRcdFx0dGhpcy5zZXRPcGFjaXR5KDApO1xuXHRcdFx0dGhpcy5vcHRpb25zLm9wYWNpdHkgPSBiYWNrdXA7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdFxuXHRcdGNsdXN0ZXJTaG93OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRPcGFjaXR5KHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcblx0XHR9XG5cdH0pO1xuXG5cdEwuRGlzdGFuY2VHcmlkID0gZnVuY3Rpb24gKGNlbGxTaXplKSB7XG5cdFx0dGhpcy5fY2VsbFNpemUgPSBjZWxsU2l6ZTtcblx0XHR0aGlzLl9zcUNlbGxTaXplID0gY2VsbFNpemUgKiBjZWxsU2l6ZTtcblx0XHR0aGlzLl9ncmlkID0ge307XG5cdFx0dGhpcy5fb2JqZWN0UG9pbnQgPSB7IH07XG5cdH07XG5cblx0TC5EaXN0YW5jZUdyaWQucHJvdG90eXBlID0ge1xuXG5cdFx0YWRkT2JqZWN0OiBmdW5jdGlvbiAob2JqLCBwb2ludCkge1xuXHRcdFx0dmFyIHggPSB0aGlzLl9nZXRDb29yZChwb2ludC54KSxcblx0XHRcdCAgICB5ID0gdGhpcy5fZ2V0Q29vcmQocG9pbnQueSksXG5cdFx0XHQgICAgZ3JpZCA9IHRoaXMuX2dyaWQsXG5cdFx0XHQgICAgcm93ID0gZ3JpZFt5XSA9IGdyaWRbeV0gfHwge30sXG5cdFx0XHQgICAgY2VsbCA9IHJvd1t4XSA9IHJvd1t4XSB8fCBbXSxcblx0XHRcdCAgICBzdGFtcCA9IEwuVXRpbC5zdGFtcChvYmopO1xuXG5cdFx0XHR0aGlzLl9vYmplY3RQb2ludFtzdGFtcF0gPSBwb2ludDtcblxuXHRcdFx0Y2VsbC5wdXNoKG9iaik7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZU9iamVjdDogZnVuY3Rpb24gKG9iaiwgcG9pbnQpIHtcblx0XHRcdHRoaXMucmVtb3ZlT2JqZWN0KG9iaik7XG5cdFx0XHR0aGlzLmFkZE9iamVjdChvYmosIHBvaW50KTtcblx0XHR9LFxuXG5cdFx0Ly9SZXR1cm5zIHRydWUgaWYgdGhlIG9iamVjdCB3YXMgZm91bmRcblx0XHRyZW1vdmVPYmplY3Q6IGZ1bmN0aW9uIChvYmosIHBvaW50KSB7XG5cdFx0XHR2YXIgeCA9IHRoaXMuX2dldENvb3JkKHBvaW50LngpLFxuXHRcdFx0ICAgIHkgPSB0aGlzLl9nZXRDb29yZChwb2ludC55KSxcblx0XHRcdCAgICBncmlkID0gdGhpcy5fZ3JpZCxcblx0XHRcdCAgICByb3cgPSBncmlkW3ldID0gZ3JpZFt5XSB8fCB7fSxcblx0XHRcdCAgICBjZWxsID0gcm93W3hdID0gcm93W3hdIHx8IFtdLFxuXHRcdFx0ICAgIGksIGxlbjtcblxuXHRcdFx0ZGVsZXRlIHRoaXMuX29iamVjdFBvaW50W0wuVXRpbC5zdGFtcChvYmopXTtcblxuXHRcdFx0Zm9yIChpID0gMCwgbGVuID0gY2VsbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRpZiAoY2VsbFtpXSA9PT0gb2JqKSB7XG5cblx0XHRcdFx0XHRjZWxsLnNwbGljZShpLCAxKTtcblxuXHRcdFx0XHRcdGlmIChsZW4gPT09IDEpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSByb3dbeF07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRlYWNoT2JqZWN0OiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBpLCBqLCBrLCBsZW4sIHJvdywgY2VsbCwgcmVtb3ZlZCxcblx0XHRcdCAgICBncmlkID0gdGhpcy5fZ3JpZDtcblxuXHRcdFx0Zm9yIChpIGluIGdyaWQpIHtcblx0XHRcdFx0cm93ID0gZ3JpZFtpXTtcblxuXHRcdFx0XHRmb3IgKGogaW4gcm93KSB7XG5cdFx0XHRcdFx0Y2VsbCA9IHJvd1tqXTtcblxuXHRcdFx0XHRcdGZvciAoayA9IDAsIGxlbiA9IGNlbGwubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcblx0XHRcdFx0XHRcdHJlbW92ZWQgPSBmbi5jYWxsKGNvbnRleHQsIGNlbGxba10pO1xuXHRcdFx0XHRcdFx0aWYgKHJlbW92ZWQpIHtcblx0XHRcdFx0XHRcdFx0ay0tO1xuXHRcdFx0XHRcdFx0XHRsZW4tLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Z2V0TmVhck9iamVjdDogZnVuY3Rpb24gKHBvaW50KSB7XG5cdFx0XHR2YXIgeCA9IHRoaXMuX2dldENvb3JkKHBvaW50LngpLFxuXHRcdFx0ICAgIHkgPSB0aGlzLl9nZXRDb29yZChwb2ludC55KSxcblx0XHRcdCAgICBpLCBqLCBrLCByb3csIGNlbGwsIGxlbiwgb2JqLCBkaXN0LFxuXHRcdFx0ICAgIG9iamVjdFBvaW50ID0gdGhpcy5fb2JqZWN0UG9pbnQsXG5cdFx0XHQgICAgY2xvc2VzdERpc3RTcSA9IHRoaXMuX3NxQ2VsbFNpemUsXG5cdFx0XHQgICAgY2xvc2VzdCA9IG51bGw7XG5cblx0XHRcdGZvciAoaSA9IHkgLSAxOyBpIDw9IHkgKyAxOyBpKyspIHtcblx0XHRcdFx0cm93ID0gdGhpcy5fZ3JpZFtpXTtcblx0XHRcdFx0aWYgKHJvdykge1xuXG5cdFx0XHRcdFx0Zm9yIChqID0geCAtIDE7IGogPD0geCArIDE7IGorKykge1xuXHRcdFx0XHRcdFx0Y2VsbCA9IHJvd1tqXTtcblx0XHRcdFx0XHRcdGlmIChjZWxsKSB7XG5cblx0XHRcdFx0XHRcdFx0Zm9yIChrID0gMCwgbGVuID0gY2VsbC5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuXHRcdFx0XHRcdFx0XHRcdG9iaiA9IGNlbGxba107XG5cdFx0XHRcdFx0XHRcdFx0ZGlzdCA9IHRoaXMuX3NxRGlzdChvYmplY3RQb2ludFtMLlV0aWwuc3RhbXAob2JqKV0sIHBvaW50KTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZGlzdCA8IGNsb3Nlc3REaXN0U3EgfHxcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3QgPD0gY2xvc2VzdERpc3RTcSAmJiBjbG9zZXN0ID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbG9zZXN0RGlzdFNxID0gZGlzdDtcblx0XHRcdFx0XHRcdFx0XHRcdGNsb3Nlc3QgPSBvYmo7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2xvc2VzdDtcblx0XHR9LFxuXG5cdFx0X2dldENvb3JkOiBmdW5jdGlvbiAoeCkge1xuXHRcdFx0dmFyIGNvb3JkID0gTWF0aC5mbG9vcih4IC8gdGhpcy5fY2VsbFNpemUpO1xuXHRcdFx0cmV0dXJuIGlzRmluaXRlKGNvb3JkKSA/IGNvb3JkIDogeDtcblx0XHR9LFxuXG5cdFx0X3NxRGlzdDogZnVuY3Rpb24gKHAsIHAyKSB7XG5cdFx0XHR2YXIgZHggPSBwMi54IC0gcC54LFxuXHRcdFx0ICAgIGR5ID0gcDIueSAtIHAueTtcblx0XHRcdHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcblx0XHR9XG5cdH07XG5cblx0LyogQ29weXJpZ2h0IChjKSAyMDEyIHRoZSBhdXRob3JzIGxpc3RlZCBhdCB0aGUgZm9sbG93aW5nIFVSTCwgYW5kL29yXG5cdHRoZSBhdXRob3JzIG9mIHJlZmVyZW5jZWQgYXJ0aWNsZXMgb3IgaW5jb3Jwb3JhdGVkIGV4dGVybmFsIGNvZGU6XG5cdGh0dHA6Ly9lbi5saXRlcmF0ZXByb2dyYW1zLm9yZy9RdWlja2h1bGxfKEphdmFzY3JpcHQpP2FjdGlvbj1oaXN0b3J5Jm9mZnNldD0yMDEyMDQxMDE3NTI1NlxuXG5cdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuXHRhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcblx0XCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG5cdHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcblx0ZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG5cdHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xuXHR0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcblx0aW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcblx0RVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG5cdE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC5cblx0SU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcblx0Q0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCxcblx0VE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEVcblx0U09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cblx0UmV0cmlldmVkIGZyb206IGh0dHA6Ly9lbi5saXRlcmF0ZXByb2dyYW1zLm9yZy9RdWlja2h1bGxfKEphdmFzY3JpcHQpP29sZGlkPTE4NDM0XG5cdCovXG5cblx0KGZ1bmN0aW9uICgpIHtcblx0XHRMLlF1aWNrSHVsbCA9IHtcblxuXHRcdFx0Lypcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBjcHQgYSBwb2ludCB0byBiZSBtZWFzdXJlZCBmcm9tIHRoZSBiYXNlbGluZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gYmwgdGhlIGJhc2VsaW5lLCBhcyByZXByZXNlbnRlZCBieSBhIHR3by1lbGVtZW50XG5cdFx0XHQgKiAgIGFycmF5IG9mIGxhdGxuZyBvYmplY3RzLlxuXHRcdFx0ICogQHJldHVybnMge051bWJlcn0gYW4gYXBwcm94aW1hdGUgZGlzdGFuY2UgbWVhc3VyZVxuXHRcdFx0ICovXG5cdFx0XHRnZXREaXN0YW50OiBmdW5jdGlvbiAoY3B0LCBibCkge1xuXHRcdFx0XHR2YXIgdlkgPSBibFsxXS5sYXQgLSBibFswXS5sYXQsXG5cdFx0XHRcdFx0dlggPSBibFswXS5sbmcgLSBibFsxXS5sbmc7XG5cdFx0XHRcdHJldHVybiAodlggKiAoY3B0LmxhdCAtIGJsWzBdLmxhdCkgKyB2WSAqIChjcHQubG5nIC0gYmxbMF0ubG5nKSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKlxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gYmFzZUxpbmUgYSB0d28tZWxlbWVudCBhcnJheSBvZiBsYXRsbmcgb2JqZWN0c1xuXHRcdFx0ICogICByZXByZXNlbnRpbmcgdGhlIGJhc2VsaW5lIHRvIHByb2plY3QgZnJvbVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gbGF0TG5ncyBhbiBhcnJheSBvZiBsYXRsbmcgb2JqZWN0c1xuXHRcdFx0ICogQHJldHVybnMge09iamVjdH0gdGhlIG1heGltdW0gcG9pbnQgYW5kIGFsbCBuZXcgcG9pbnRzIHRvIHN0YXlcblx0XHRcdCAqICAgaW4gY29uc2lkZXJhdGlvbiBmb3IgdGhlIGh1bGwuXG5cdFx0XHQgKi9cblx0XHRcdGZpbmRNb3N0RGlzdGFudFBvaW50RnJvbUJhc2VMaW5lOiBmdW5jdGlvbiAoYmFzZUxpbmUsIGxhdExuZ3MpIHtcblx0XHRcdFx0dmFyIG1heEQgPSAwLFxuXHRcdFx0XHRcdG1heFB0ID0gbnVsbCxcblx0XHRcdFx0XHRuZXdQb2ludHMgPSBbXSxcblx0XHRcdFx0XHRpLCBwdCwgZDtcblxuXHRcdFx0XHRmb3IgKGkgPSBsYXRMbmdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0cHQgPSBsYXRMbmdzW2ldO1xuXHRcdFx0XHRcdGQgPSB0aGlzLmdldERpc3RhbnQocHQsIGJhc2VMaW5lKTtcblxuXHRcdFx0XHRcdGlmIChkID4gMCkge1xuXHRcdFx0XHRcdFx0bmV3UG9pbnRzLnB1c2gocHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoZCA+IG1heEQpIHtcblx0XHRcdFx0XHRcdG1heEQgPSBkO1xuXHRcdFx0XHRcdFx0bWF4UHQgPSBwdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4geyBtYXhQb2ludDogbWF4UHQsIG5ld1BvaW50czogbmV3UG9pbnRzIH07XG5cdFx0XHR9LFxuXG5cblx0XHRcdC8qXG5cdFx0XHQgKiBHaXZlbiBhIGJhc2VsaW5lLCBjb21wdXRlIHRoZSBjb252ZXggaHVsbCBvZiBsYXRMbmdzIGFzIGFuIGFycmF5XG5cdFx0XHQgKiBvZiBsYXRMbmdzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IGxhdExuZ3Ncblx0XHRcdCAqIEByZXR1cm5zIHtBcnJheX1cblx0XHRcdCAqL1xuXHRcdFx0YnVpbGRDb252ZXhIdWxsOiBmdW5jdGlvbiAoYmFzZUxpbmUsIGxhdExuZ3MpIHtcblx0XHRcdFx0dmFyIGNvbnZleEh1bGxCYXNlTGluZXMgPSBbXSxcblx0XHRcdFx0XHR0ID0gdGhpcy5maW5kTW9zdERpc3RhbnRQb2ludEZyb21CYXNlTGluZShiYXNlTGluZSwgbGF0TG5ncyk7XG5cblx0XHRcdFx0aWYgKHQubWF4UG9pbnQpIHsgLy8gaWYgdGhlcmUgaXMgc3RpbGwgYSBwb2ludCBcIm91dHNpZGVcIiB0aGUgYmFzZSBsaW5lXG5cdFx0XHRcdFx0Y29udmV4SHVsbEJhc2VMaW5lcyA9XG5cdFx0XHRcdFx0XHRjb252ZXhIdWxsQmFzZUxpbmVzLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0dGhpcy5idWlsZENvbnZleEh1bGwoW2Jhc2VMaW5lWzBdLCB0Lm1heFBvaW50XSwgdC5uZXdQb2ludHMpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGNvbnZleEh1bGxCYXNlTGluZXMgPVxuXHRcdFx0XHRcdFx0Y29udmV4SHVsbEJhc2VMaW5lcy5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdHRoaXMuYnVpbGRDb252ZXhIdWxsKFt0Lm1heFBvaW50LCBiYXNlTGluZVsxXV0sIHQubmV3UG9pbnRzKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm4gY29udmV4SHVsbEJhc2VMaW5lcztcblx0XHRcdFx0fSBlbHNlIHsgIC8vIGlmIHRoZXJlIGlzIG5vIG1vcmUgcG9pbnQgXCJvdXRzaWRlXCIgdGhlIGJhc2UgbGluZSwgdGhlIGN1cnJlbnQgYmFzZSBsaW5lIGlzIHBhcnQgb2YgdGhlIGNvbnZleCBodWxsXG5cdFx0XHRcdFx0cmV0dXJuIFtiYXNlTGluZVswXV07XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qXG5cdFx0XHQgKiBHaXZlbiBhbiBhcnJheSBvZiBsYXRsbmdzLCBjb21wdXRlIGEgY29udmV4IGh1bGwgYXMgYW4gYXJyYXlcblx0XHRcdCAqIG9mIGxhdGxuZ3Ncblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBsYXRMbmdzXG5cdFx0XHQgKiBAcmV0dXJucyB7QXJyYXl9XG5cdFx0XHQgKi9cblx0XHRcdGdldENvbnZleEh1bGw6IGZ1bmN0aW9uIChsYXRMbmdzKSB7XG5cdFx0XHRcdC8vIGZpbmQgZmlyc3QgYmFzZWxpbmVcblx0XHRcdFx0dmFyIG1heExhdCA9IGZhbHNlLCBtaW5MYXQgPSBmYWxzZSxcblx0XHRcdFx0XHRtYXhMbmcgPSBmYWxzZSwgbWluTG5nID0gZmFsc2UsXG5cdFx0XHRcdFx0bWF4TGF0UHQgPSBudWxsLCBtaW5MYXRQdCA9IG51bGwsXG5cdFx0XHRcdFx0bWF4TG5nUHQgPSBudWxsLCBtaW5MbmdQdCA9IG51bGwsXG5cdFx0XHRcdFx0bWF4UHQgPSBudWxsLCBtaW5QdCA9IG51bGwsXG5cdFx0XHRcdFx0aTtcblxuXHRcdFx0XHRmb3IgKGkgPSBsYXRMbmdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0dmFyIHB0ID0gbGF0TG5nc1tpXTtcblx0XHRcdFx0XHRpZiAobWF4TGF0ID09PSBmYWxzZSB8fCBwdC5sYXQgPiBtYXhMYXQpIHtcblx0XHRcdFx0XHRcdG1heExhdFB0ID0gcHQ7XG5cdFx0XHRcdFx0XHRtYXhMYXQgPSBwdC5sYXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChtaW5MYXQgPT09IGZhbHNlIHx8IHB0LmxhdCA8IG1pbkxhdCkge1xuXHRcdFx0XHRcdFx0bWluTGF0UHQgPSBwdDtcblx0XHRcdFx0XHRcdG1pbkxhdCA9IHB0LmxhdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG1heExuZyA9PT0gZmFsc2UgfHwgcHQubG5nID4gbWF4TG5nKSB7XG5cdFx0XHRcdFx0XHRtYXhMbmdQdCA9IHB0O1xuXHRcdFx0XHRcdFx0bWF4TG5nID0gcHQubG5nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobWluTG5nID09PSBmYWxzZSB8fCBwdC5sbmcgPCBtaW5MbmcpIHtcblx0XHRcdFx0XHRcdG1pbkxuZ1B0ID0gcHQ7XG5cdFx0XHRcdFx0XHRtaW5MbmcgPSBwdC5sbmc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAobWluTGF0ICE9PSBtYXhMYXQpIHtcblx0XHRcdFx0XHRtaW5QdCA9IG1pbkxhdFB0O1xuXHRcdFx0XHRcdG1heFB0ID0gbWF4TGF0UHQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bWluUHQgPSBtaW5MbmdQdDtcblx0XHRcdFx0XHRtYXhQdCA9IG1heExuZ1B0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGNoID0gW10uY29uY2F0KHRoaXMuYnVpbGRDb252ZXhIdWxsKFttaW5QdCwgbWF4UHRdLCBsYXRMbmdzKSxcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuYnVpbGRDb252ZXhIdWxsKFttYXhQdCwgbWluUHRdLCBsYXRMbmdzKSk7XG5cdFx0XHRcdHJldHVybiBjaDtcblx0XHRcdH1cblx0XHR9O1xuXHR9KCkpO1xuXG5cdEwuTWFya2VyQ2x1c3Rlci5pbmNsdWRlKHtcblx0XHRnZXRDb252ZXhIdWxsOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY2hpbGRNYXJrZXJzID0gdGhpcy5nZXRBbGxDaGlsZE1hcmtlcnMoKSxcblx0XHRcdFx0cG9pbnRzID0gW10sXG5cdFx0XHRcdHAsIGk7XG5cblx0XHRcdGZvciAoaSA9IGNoaWxkTWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRwID0gY2hpbGRNYXJrZXJzW2ldLmdldExhdExuZygpO1xuXHRcdFx0XHRwb2ludHMucHVzaChwKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEwuUXVpY2tIdWxsLmdldENvbnZleEh1bGwocG9pbnRzKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vVGhpcyBjb2RlIGlzIDEwMCUgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2phd2ovT3ZlcmxhcHBpbmdNYXJrZXJTcGlkZXJmaWVyLUxlYWZsZXRcblx0Ly9IdWdlIHRoYW5rcyB0byBqYXdqIGZvciBpbXBsZW1lbnRpbmcgaXQgZmlyc3QgdG8gbWFrZSBteSBqb2IgZWFzeSA6LSlcblxuXHRMLk1hcmtlckNsdXN0ZXIuaW5jbHVkZSh7XG5cblx0XHRfMlBJOiBNYXRoLlBJICogMixcblx0XHRfY2lyY2xlRm9vdFNlcGFyYXRpb246IDI1LCAvL3JlbGF0ZWQgdG8gY2lyY3VtZmVyZW5jZSBvZiBjaXJjbGVcblx0XHRfY2lyY2xlU3RhcnRBbmdsZTogMCxcblxuXHRcdF9zcGlyYWxGb290U2VwYXJhdGlvbjogIDI4LCAvL3JlbGF0ZWQgdG8gc2l6ZSBvZiBzcGlyYWwgKGV4cGVyaW1lbnQhKVxuXHRcdF9zcGlyYWxMZW5ndGhTdGFydDogMTEsXG5cdFx0X3NwaXJhbExlbmd0aEZhY3RvcjogNSxcblxuXHRcdF9jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyOiA5LCAvL3Nob3cgc3BpcmFsIGluc3RlYWQgb2YgY2lyY2xlIGZyb20gdGhpcyBtYXJrZXIgY291bnQgdXB3YXJkcy5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIDAgLT4gYWx3YXlzIHNwaXJhbDsgSW5maW5pdHkgLT4gYWx3YXlzIGNpcmNsZVxuXG5cdFx0c3BpZGVyZnk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLl9ncm91cC5fc3BpZGVyZmllZCA9PT0gdGhpcyB8fCB0aGlzLl9ncm91cC5faW5ab29tQW5pbWF0aW9uKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNoaWxkTWFya2VycyA9IHRoaXMuZ2V0QWxsQ2hpbGRNYXJrZXJzKG51bGwsIHRydWUpLFxuXHRcdFx0XHRncm91cCA9IHRoaXMuX2dyb3VwLFxuXHRcdFx0XHRtYXAgPSBncm91cC5fbWFwLFxuXHRcdFx0XHRjZW50ZXIgPSBtYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZyksXG5cdFx0XHRcdHBvc2l0aW9ucztcblxuXHRcdFx0dGhpcy5fZ3JvdXAuX3Vuc3BpZGVyZnkoKTtcblx0XHRcdHRoaXMuX2dyb3VwLl9zcGlkZXJmaWVkID0gdGhpcztcblxuXHRcdFx0Ly9UT0RPIE1heWJlOiBjaGlsZE1hcmtlcnMgb3JkZXIgYnkgZGlzdGFuY2UgdG8gY2VudGVyXG5cblx0XHRcdGlmICh0aGlzLl9ncm91cC5vcHRpb25zLnNwaWRlcmZ5U2hhcGVQb3NpdGlvbnMpIHtcblx0XHRcdFx0cG9zaXRpb25zID0gdGhpcy5fZ3JvdXAub3B0aW9ucy5zcGlkZXJmeVNoYXBlUG9zaXRpb25zKGNoaWxkTWFya2Vycy5sZW5ndGgsIGNlbnRlcik7XG5cdFx0XHR9IGVsc2UgaWYgKGNoaWxkTWFya2Vycy5sZW5ndGggPj0gdGhpcy5fY2lyY2xlU3BpcmFsU3dpdGNob3Zlcikge1xuXHRcdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9nZW5lcmF0ZVBvaW50c1NwaXJhbChjaGlsZE1hcmtlcnMubGVuZ3RoLCBjZW50ZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2VudGVyLnkgKz0gMTA7IC8vIE90aGVyd2lzZSBjaXJjbGVzIGxvb2sgd3JvbmcgPT4gaGFjayBmb3Igc3RhbmRhcmQgYmx1ZSBpY29uLCByZW5kZXJzIGRpZmZlcmVudGx5IGZvciBvdGhlciBpY29ucy5cblx0XHRcdFx0cG9zaXRpb25zID0gdGhpcy5fZ2VuZXJhdGVQb2ludHNDaXJjbGUoY2hpbGRNYXJrZXJzLmxlbmd0aCwgY2VudGVyKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYW5pbWF0aW9uU3BpZGVyZnkoY2hpbGRNYXJrZXJzLCBwb3NpdGlvbnMpO1xuXHRcdH0sXG5cblx0XHR1bnNwaWRlcmZ5OiBmdW5jdGlvbiAoem9vbURldGFpbHMpIHtcblx0XHRcdC8vLyA8cGFyYW0gTmFtZT1cInpvb21EZXRhaWxzXCI+QXJndW1lbnQgZnJvbSB6b29tYW5pbSBpZiBiZWluZyBjYWxsZWQgaW4gYSB6b29tIGFuaW1hdGlvbiBvciBudWxsIG90aGVyd2lzZTwvcGFyYW0+XG5cdFx0XHRpZiAodGhpcy5fZ3JvdXAuX2luWm9vbUFuaW1hdGlvbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hbmltYXRpb25VbnNwaWRlcmZ5KHpvb21EZXRhaWxzKTtcblxuXHRcdFx0dGhpcy5fZ3JvdXAuX3NwaWRlcmZpZWQgPSBudWxsO1xuXHRcdH0sXG5cblx0XHRfZ2VuZXJhdGVQb2ludHNDaXJjbGU6IGZ1bmN0aW9uIChjb3VudCwgY2VudGVyUHQpIHtcblx0XHRcdHZhciBjaXJjdW1mZXJlbmNlID0gdGhpcy5fZ3JvdXAub3B0aW9ucy5zcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciAqIHRoaXMuX2NpcmNsZUZvb3RTZXBhcmF0aW9uICogKDIgKyBjb3VudCksXG5cdFx0XHRcdGxlZ0xlbmd0aCA9IGNpcmN1bWZlcmVuY2UgLyB0aGlzLl8yUEksICAvL3JhZGl1cyBmcm9tIGNpcmN1bWZlcmVuY2Vcblx0XHRcdFx0YW5nbGVTdGVwID0gdGhpcy5fMlBJIC8gY291bnQsXG5cdFx0XHRcdHJlcyA9IFtdLFxuXHRcdFx0XHRpLCBhbmdsZTtcblxuXHRcdFx0bGVnTGVuZ3RoID0gTWF0aC5tYXgobGVnTGVuZ3RoLCAzNSk7IC8vIE1pbmltdW0gZGlzdGFuY2UgdG8gZ2V0IG91dHNpZGUgdGhlIGNsdXN0ZXIgaWNvbi5cblxuXHRcdFx0cmVzLmxlbmd0aCA9IGNvdW50O1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgY291bnQ7IGkrKykgeyAvLyBDbG9ja3dpc2UsIGxpa2Ugc3BpcmFsLlxuXHRcdFx0XHRhbmdsZSA9IHRoaXMuX2NpcmNsZVN0YXJ0QW5nbGUgKyBpICogYW5nbGVTdGVwO1xuXHRcdFx0XHRyZXNbaV0gPSBuZXcgTC5Qb2ludChjZW50ZXJQdC54ICsgbGVnTGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLCBjZW50ZXJQdC55ICsgbGVnTGVuZ3RoICogTWF0aC5zaW4oYW5nbGUpKS5fcm91bmQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9LFxuXG5cdFx0X2dlbmVyYXRlUG9pbnRzU3BpcmFsOiBmdW5jdGlvbiAoY291bnQsIGNlbnRlclB0KSB7XG5cdFx0XHR2YXIgc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgPSB0aGlzLl9ncm91cC5vcHRpb25zLnNwaWRlcmZ5RGlzdGFuY2VNdWx0aXBsaWVyLFxuXHRcdFx0XHRsZWdMZW5ndGggPSBzcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciAqIHRoaXMuX3NwaXJhbExlbmd0aFN0YXJ0LFxuXHRcdFx0XHRzZXBhcmF0aW9uID0gc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgKiB0aGlzLl9zcGlyYWxGb290U2VwYXJhdGlvbixcblx0XHRcdFx0bGVuZ3RoRmFjdG9yID0gc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgKiB0aGlzLl9zcGlyYWxMZW5ndGhGYWN0b3IgKiB0aGlzLl8yUEksXG5cdFx0XHRcdGFuZ2xlID0gMCxcblx0XHRcdFx0cmVzID0gW10sXG5cdFx0XHRcdGk7XG5cblx0XHRcdHJlcy5sZW5ndGggPSBjb3VudDtcblxuXHRcdFx0Ly8gSGlnaGVyIGluZGV4LCBjbG9zZXIgcG9zaXRpb24gdG8gY2x1c3RlciBjZW50ZXIuXG5cdFx0XHRmb3IgKGkgPSBjb3VudDsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0Ly8gU2tpcCB0aGUgZmlyc3QgcG9zaXRpb24sIHNvIHRoYXQgd2UgYXJlIGFscmVhZHkgZmFydGhlciBmcm9tIGNlbnRlciBhbmQgd2UgYXZvaWRcblx0XHRcdFx0Ly8gYmVpbmcgdW5kZXIgdGhlIGRlZmF1bHQgY2x1c3RlciBpY29uIChlc3BlY2lhbGx5IGltcG9ydGFudCBmb3IgQ2lyY2xlIE1hcmtlcnMpLlxuXHRcdFx0XHRpZiAoaSA8IGNvdW50KSB7XG5cdFx0XHRcdFx0cmVzW2ldID0gbmV3IEwuUG9pbnQoY2VudGVyUHQueCArIGxlZ0xlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSwgY2VudGVyUHQueSArIGxlZ0xlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkuX3JvdW5kKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YW5nbGUgKz0gc2VwYXJhdGlvbiAvIGxlZ0xlbmd0aCArIGkgKiAwLjAwMDU7XG5cdFx0XHRcdGxlZ0xlbmd0aCArPSBsZW5ndGhGYWN0b3IgLyBhbmdsZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXM7XG5cdFx0fSxcblxuXHRcdF9ub2FuaW1hdGlvblVuc3BpZGVyZnk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBncm91cCA9IHRoaXMuX2dyb3VwLFxuXHRcdFx0XHRtYXAgPSBncm91cC5fbWFwLFxuXHRcdFx0XHRmZyA9IGdyb3VwLl9mZWF0dXJlR3JvdXAsXG5cdFx0XHRcdGNoaWxkTWFya2VycyA9IHRoaXMuZ2V0QWxsQ2hpbGRNYXJrZXJzKG51bGwsIHRydWUpLFxuXHRcdFx0XHRtLCBpO1xuXG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XG5cblx0XHRcdHRoaXMuc2V0T3BhY2l0eSgxKTtcblx0XHRcdGZvciAoaSA9IGNoaWxkTWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xuXG5cdFx0XHRcdGZnLnJlbW92ZUxheWVyKG0pO1xuXG5cdFx0XHRcdGlmIChtLl9wcmVTcGlkZXJmeUxhdGxuZykge1xuXHRcdFx0XHRcdG0uc2V0TGF0TG5nKG0uX3ByZVNwaWRlcmZ5TGF0bG5nKTtcblx0XHRcdFx0XHRkZWxldGUgbS5fcHJlU3BpZGVyZnlMYXRsbmc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG0uc2V0WkluZGV4T2Zmc2V0KSB7XG5cdFx0XHRcdFx0bS5zZXRaSW5kZXhPZmZzZXQoMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAobS5fc3BpZGVyTGVnKSB7XG5cdFx0XHRcdFx0bWFwLnJlbW92ZUxheWVyKG0uX3NwaWRlckxlZyk7XG5cdFx0XHRcdFx0ZGVsZXRlIG0uX3NwaWRlckxlZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRncm91cC5maXJlKCd1bnNwaWRlcmZpZWQnLCB7XG5cdFx0XHRcdGNsdXN0ZXI6IHRoaXMsXG5cdFx0XHRcdG1hcmtlcnM6IGNoaWxkTWFya2Vyc1xuXHRcdFx0fSk7XG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IGZhbHNlO1xuXHRcdFx0Z3JvdXAuX3NwaWRlcmZpZWQgPSBudWxsO1xuXHRcdH1cblx0fSk7XG5cblx0Ly9Ob24gQW5pbWF0ZWQgdmVyc2lvbnMgb2YgZXZlcnl0aGluZ1xuXHRMLk1hcmtlckNsdXN0ZXJOb25BbmltYXRlZCA9IEwuTWFya2VyQ2x1c3Rlci5leHRlbmQoe1xuXHRcdF9hbmltYXRpb25TcGlkZXJmeTogZnVuY3Rpb24gKGNoaWxkTWFya2VycywgcG9zaXRpb25zKSB7XG5cdFx0XHR2YXIgZ3JvdXAgPSB0aGlzLl9ncm91cCxcblx0XHRcdFx0bWFwID0gZ3JvdXAuX21hcCxcblx0XHRcdFx0ZmcgPSBncm91cC5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0XHRsZWdPcHRpb25zID0gdGhpcy5fZ3JvdXAub3B0aW9ucy5zcGlkZXJMZWdQb2x5bGluZU9wdGlvbnMsXG5cdFx0XHRcdGksIG0sIGxlZywgbmV3UG9zO1xuXG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XG5cblx0XHRcdC8vIFRyYXZlcnNlIGluIGFzY2VuZGluZyBvcmRlciB0byBtYWtlIHN1cmUgdGhhdCBpbm5lciBjaXJjbGVNYXJrZXJzIGFyZSBvbiB0b3Agb2YgZnVydGhlciBsZWdzLiBOb3JtYWwgbWFya2VycyBhcmUgcmUtb3JkZXJlZCBieSBuZXdQb3NpdGlvbi5cblx0XHRcdC8vIFRoZSByZXZlcnNlIG9yZGVyIHRyaWNrIG5vIGxvbmdlciBpbXByb3ZlcyBwZXJmb3JtYW5jZSBvbiBtb2Rlcm4gYnJvd3NlcnMuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hpbGRNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG5ld1BvcyA9IG1hcC5sYXllclBvaW50VG9MYXRMbmcocG9zaXRpb25zW2ldKTtcblx0XHRcdFx0bSA9IGNoaWxkTWFya2Vyc1tpXTtcblxuXHRcdFx0XHQvLyBBZGQgdGhlIGxlZyBiZWZvcmUgdGhlIG1hcmtlciwgc28gdGhhdCBpbiBjYXNlIHRoZSBsYXR0ZXIgaXMgYSBjaXJjbGVNYXJrZXIsIHRoZSBsZWcgaXMgYmVoaW5kIGl0LlxuXHRcdFx0XHRsZWcgPSBuZXcgTC5Qb2x5bGluZShbdGhpcy5fbGF0bG5nLCBuZXdQb3NdLCBsZWdPcHRpb25zKTtcblx0XHRcdFx0bWFwLmFkZExheWVyKGxlZyk7XG5cdFx0XHRcdG0uX3NwaWRlckxlZyA9IGxlZztcblxuXHRcdFx0XHQvLyBOb3cgYWRkIHRoZSBtYXJrZXIuXG5cdFx0XHRcdG0uX3ByZVNwaWRlcmZ5TGF0bG5nID0gbS5fbGF0bG5nO1xuXHRcdFx0XHRtLnNldExhdExuZyhuZXdQb3MpO1xuXHRcdFx0XHRpZiAobS5zZXRaSW5kZXhPZmZzZXQpIHtcblx0XHRcdFx0XHRtLnNldFpJbmRleE9mZnNldCgxMDAwMDAwKTsgLy9NYWtlIHRoZXNlIGFwcGVhciBvbiB0b3Agb2YgRVZFUllUSElOR1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZmcuYWRkTGF5ZXIobSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldE9wYWNpdHkoMC4zKTtcblxuXHRcdFx0Z3JvdXAuX2lnbm9yZU1vdmUgPSBmYWxzZTtcblx0XHRcdGdyb3VwLmZpcmUoJ3NwaWRlcmZpZWQnLCB7XG5cdFx0XHRcdGNsdXN0ZXI6IHRoaXMsXG5cdFx0XHRcdG1hcmtlcnM6IGNoaWxkTWFya2Vyc1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdF9hbmltYXRpb25VbnNwaWRlcmZ5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9ub2FuaW1hdGlvblVuc3BpZGVyZnkoKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vQW5pbWF0ZWQgdmVyc2lvbnMgaGVyZVxuXHRMLk1hcmtlckNsdXN0ZXIuaW5jbHVkZSh7XG5cblx0XHRfYW5pbWF0aW9uU3BpZGVyZnk6IGZ1bmN0aW9uIChjaGlsZE1hcmtlcnMsIHBvc2l0aW9ucykge1xuXHRcdFx0dmFyIG1lID0gdGhpcyxcblx0XHRcdFx0Z3JvdXAgPSB0aGlzLl9ncm91cCxcblx0XHRcdFx0bWFwID0gZ3JvdXAuX21hcCxcblx0XHRcdFx0ZmcgPSBncm91cC5fZmVhdHVyZUdyb3VwLFxuXHRcdFx0XHR0aGlzTGF5ZXJMYXRMbmcgPSB0aGlzLl9sYXRsbmcsXG5cdFx0XHRcdHRoaXNMYXllclBvcyA9IG1hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpc0xheWVyTGF0TG5nKSxcblx0XHRcdFx0c3ZnID0gTC5QYXRoLlNWRyxcblx0XHRcdFx0bGVnT3B0aW9ucyA9IEwuZXh0ZW5kKHt9LCB0aGlzLl9ncm91cC5vcHRpb25zLnNwaWRlckxlZ1BvbHlsaW5lT3B0aW9ucyksIC8vIENvcHkgdGhlIG9wdGlvbnMgc28gdGhhdCB3ZSBjYW4gbW9kaWZ5IHRoZW0gZm9yIGFuaW1hdGlvbi5cblx0XHRcdFx0ZmluYWxMZWdPcGFjaXR5ID0gbGVnT3B0aW9ucy5vcGFjaXR5LFxuXHRcdFx0XHRpLCBtLCBsZWcsIGxlZ1BhdGgsIGxlZ0xlbmd0aCwgbmV3UG9zO1xuXG5cdFx0XHRpZiAoZmluYWxMZWdPcGFjaXR5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0ZmluYWxMZWdPcGFjaXR5ID0gTC5NYXJrZXJDbHVzdGVyR3JvdXAucHJvdG90eXBlLm9wdGlvbnMuc3BpZGVyTGVnUG9seWxpbmVPcHRpb25zLm9wYWNpdHk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdmcpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIGluaXRpYWwgb3BhY2l0eSBvZiB0aGUgc3BpZGVyIGxlZyBpcyBub3QgMCB0aGVuIGl0IGFwcGVhcnMgYmVmb3JlIHRoZSBhbmltYXRpb24gc3RhcnRzLlxuXHRcdFx0XHRsZWdPcHRpb25zLm9wYWNpdHkgPSAwO1xuXG5cdFx0XHRcdC8vIEFkZCB0aGUgY2xhc3MgZm9yIENTUyB0cmFuc2l0aW9ucy5cblx0XHRcdFx0bGVnT3B0aW9ucy5jbGFzc05hbWUgPSAobGVnT3B0aW9ucy5jbGFzc05hbWUgfHwgJycpICsgJyBsZWFmbGV0LWNsdXN0ZXItc3BpZGVyLWxlZyc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIGRlZmluZWQgb3BhY2l0eS5cblx0XHRcdFx0bGVnT3B0aW9ucy5vcGFjaXR5ID0gZmluYWxMZWdPcGFjaXR5O1xuXHRcdFx0fVxuXG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XG5cblx0XHRcdC8vIEFkZCBtYXJrZXJzIGFuZCBzcGlkZXIgbGVncyB0byBtYXAsIGhpZGRlbiBhdCBvdXIgY2VudGVyIHBvaW50LlxuXHRcdFx0Ly8gVHJhdmVyc2UgaW4gYXNjZW5kaW5nIG9yZGVyIHRvIG1ha2Ugc3VyZSB0aGF0IGlubmVyIGNpcmNsZU1hcmtlcnMgYXJlIG9uIHRvcCBvZiBmdXJ0aGVyIGxlZ3MuIE5vcm1hbCBtYXJrZXJzIGFyZSByZS1vcmRlcmVkIGJ5IG5ld1Bvc2l0aW9uLlxuXHRcdFx0Ly8gVGhlIHJldmVyc2Ugb3JkZXIgdHJpY2sgbm8gbG9uZ2VyIGltcHJvdmVzIHBlcmZvcm1hbmNlIG9uIG1vZGVybiBicm93c2Vycy5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBjaGlsZE1hcmtlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bSA9IGNoaWxkTWFya2Vyc1tpXTtcblxuXHRcdFx0XHRuZXdQb3MgPSBtYXAubGF5ZXJQb2ludFRvTGF0TG5nKHBvc2l0aW9uc1tpXSk7XG5cblx0XHRcdFx0Ly8gQWRkIHRoZSBsZWcgYmVmb3JlIHRoZSBtYXJrZXIsIHNvIHRoYXQgaW4gY2FzZSB0aGUgbGF0dGVyIGlzIGEgY2lyY2xlTWFya2VyLCB0aGUgbGVnIGlzIGJlaGluZCBpdC5cblx0XHRcdFx0bGVnID0gbmV3IEwuUG9seWxpbmUoW3RoaXNMYXllckxhdExuZywgbmV3UG9zXSwgbGVnT3B0aW9ucyk7XG5cdFx0XHRcdG1hcC5hZGRMYXllcihsZWcpO1xuXHRcdFx0XHRtLl9zcGlkZXJMZWcgPSBsZWc7XG5cblx0XHRcdFx0Ly8gRXhwbGFuYXRpb25zOiBodHRwczovL2pha2VhcmNoaWJhbGQuY29tLzIwMTMvYW5pbWF0ZWQtbGluZS1kcmF3aW5nLXN2Zy9cblx0XHRcdFx0Ly8gSW4gb3VyIGNhc2UgdGhlIHRyYW5zaXRpb24gcHJvcGVydHkgaXMgZGVjbGFyZWQgaW4gdGhlIENTUyBmaWxlLlxuXHRcdFx0XHRpZiAoc3ZnKSB7XG5cdFx0XHRcdFx0bGVnUGF0aCA9IGxlZy5fcGF0aDtcblx0XHRcdFx0XHRsZWdMZW5ndGggPSBsZWdQYXRoLmdldFRvdGFsTGVuZ3RoKCkgKyAwLjE7IC8vIE5lZWQgYSBzbWFsbCBleHRyYSBsZW5ndGggdG8gYXZvaWQgcmVtYWluaW5nIGRvdCBpbiBGaXJlZm94LlxuXHRcdFx0XHRcdGxlZ1BhdGguc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gbGVnTGVuZ3RoOyAvLyBKdXN0IDEgbGVuZ3RoIGlzIGVub3VnaCwgaXQgd2lsbCBiZSBkdXBsaWNhdGVkLlxuXHRcdFx0XHRcdGxlZ1BhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGxlZ0xlbmd0aDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElmIGl0IGlzIGEgbWFya2VyLCBhZGQgaXQgbm93IGFuZCB3ZSdsbCBhbmltYXRlIGl0IG91dFxuXHRcdFx0XHRpZiAobS5zZXRaSW5kZXhPZmZzZXQpIHtcblx0XHRcdFx0XHRtLnNldFpJbmRleE9mZnNldCgxMDAwMDAwKTsgLy8gTWFrZSBub3JtYWwgbWFya2VycyBhcHBlYXIgb24gdG9wIG9mIEVWRVJZVEhJTkdcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobS5jbHVzdGVySGlkZSkge1xuXHRcdFx0XHRcdG0uY2x1c3RlckhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gVmVjdG9ycyBqdXN0IGdldCBpbW1lZGlhdGVseSBhZGRlZFxuXHRcdFx0XHRmZy5hZGRMYXllcihtKTtcblxuXHRcdFx0XHRpZiAobS5fc2V0UG9zKSB7XG5cdFx0XHRcdFx0bS5fc2V0UG9zKHRoaXNMYXllclBvcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Z3JvdXAuX2ZvcmNlTGF5b3V0KCk7XG5cdFx0XHRncm91cC5fYW5pbWF0aW9uU3RhcnQoKTtcblxuXHRcdFx0Ly8gUmV2ZWFsIG1hcmtlcnMgYW5kIHNwaWRlciBsZWdzLlxuXHRcdFx0Zm9yIChpID0gY2hpbGRNYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdG5ld1BvcyA9IG1hcC5sYXllclBvaW50VG9MYXRMbmcocG9zaXRpb25zW2ldKTtcblx0XHRcdFx0bSA9IGNoaWxkTWFya2Vyc1tpXTtcblxuXHRcdFx0XHQvL01vdmUgbWFya2VyIHRvIG5ldyBwb3NpdGlvblxuXHRcdFx0XHRtLl9wcmVTcGlkZXJmeUxhdGxuZyA9IG0uX2xhdGxuZztcblx0XHRcdFx0bS5zZXRMYXRMbmcobmV3UG9zKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChtLmNsdXN0ZXJTaG93KSB7XG5cdFx0XHRcdFx0bS5jbHVzdGVyU2hvdygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQW5pbWF0ZSBsZWcgKGFuaW1hdGlvbiBpcyBhY3R1YWxseSBkZWxlZ2F0ZWQgdG8gQ1NTIHRyYW5zaXRpb24pLlxuXHRcdFx0XHRpZiAoc3ZnKSB7XG5cdFx0XHRcdFx0bGVnID0gbS5fc3BpZGVyTGVnO1xuXHRcdFx0XHRcdGxlZ1BhdGggPSBsZWcuX3BhdGg7XG5cdFx0XHRcdFx0bGVnUGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gMDtcblx0XHRcdFx0XHQvL2xlZ1BhdGguc3R5bGUuc3Ryb2tlT3BhY2l0eSA9IGZpbmFsTGVnT3BhY2l0eTtcblx0XHRcdFx0XHRsZWcuc2V0U3R5bGUoe29wYWNpdHk6IGZpbmFsTGVnT3BhY2l0eX0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldE9wYWNpdHkoMC4zKTtcblxuXHRcdFx0Z3JvdXAuX2lnbm9yZU1vdmUgPSBmYWxzZTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGdyb3VwLl9hbmltYXRpb25FbmQoKTtcblx0XHRcdFx0Z3JvdXAuZmlyZSgnc3BpZGVyZmllZCcsIHtcblx0XHRcdFx0XHRjbHVzdGVyOiBtZSxcblx0XHRcdFx0XHRtYXJrZXJzOiBjaGlsZE1hcmtlcnNcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCAyMDApO1xuXHRcdH0sXG5cblx0XHRfYW5pbWF0aW9uVW5zcGlkZXJmeTogZnVuY3Rpb24gKHpvb21EZXRhaWxzKSB7XG5cdFx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdFx0XHRncm91cCA9IHRoaXMuX2dyb3VwLFxuXHRcdFx0XHRtYXAgPSBncm91cC5fbWFwLFxuXHRcdFx0XHRmZyA9IGdyb3VwLl9mZWF0dXJlR3JvdXAsXG5cdFx0XHRcdHRoaXNMYXllclBvcyA9IHpvb21EZXRhaWxzID8gbWFwLl9sYXRMbmdUb05ld0xheWVyUG9pbnQodGhpcy5fbGF0bG5nLCB6b29tRGV0YWlscy56b29tLCB6b29tRGV0YWlscy5jZW50ZXIpIDogbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcpLFxuXHRcdFx0XHRjaGlsZE1hcmtlcnMgPSB0aGlzLmdldEFsbENoaWxkTWFya2VycyhudWxsLCB0cnVlKSxcblx0XHRcdFx0c3ZnID0gTC5QYXRoLlNWRyxcblx0XHRcdFx0bSwgaSwgbGVnLCBsZWdQYXRoLCBsZWdMZW5ndGgsIG5vbkFuaW1hdGFibGU7XG5cblx0XHRcdGdyb3VwLl9pZ25vcmVNb3ZlID0gdHJ1ZTtcblx0XHRcdGdyb3VwLl9hbmltYXRpb25TdGFydCgpO1xuXG5cdFx0XHQvL01ha2UgdXMgdmlzaWJsZSBhbmQgYnJpbmcgdGhlIGNoaWxkIG1hcmtlcnMgYmFjayBpblxuXHRcdFx0dGhpcy5zZXRPcGFjaXR5KDEpO1xuXHRcdFx0Zm9yIChpID0gY2hpbGRNYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdG0gPSBjaGlsZE1hcmtlcnNbaV07XG5cblx0XHRcdFx0Ly9NYXJrZXIgd2FzIGFkZGVkIHRvIHVzIGFmdGVyIHdlIHdlcmUgc3BpZGVyZmllZFxuXHRcdFx0XHRpZiAoIW0uX3ByZVNwaWRlcmZ5TGF0bG5nKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0Nsb3NlIGFueSBwb3B1cCBvbiB0aGUgbWFya2VyIGZpcnN0LCBvdGhlcndpc2Ugc2V0dGluZyB0aGUgbG9jYXRpb24gb2YgdGhlIG1hcmtlciB3aWxsIG1ha2UgdGhlIG1hcCBzY3JvbGxcblx0XHRcdFx0bS5jbG9zZVBvcHVwKCk7XG5cblx0XHRcdFx0Ly9GaXggdXAgdGhlIGxvY2F0aW9uIHRvIHRoZSByZWFsIG9uZVxuXHRcdFx0XHRtLnNldExhdExuZyhtLl9wcmVTcGlkZXJmeUxhdGxuZyk7XG5cdFx0XHRcdGRlbGV0ZSBtLl9wcmVTcGlkZXJmeUxhdGxuZztcblxuXHRcdFx0XHQvL0hhY2sgb3ZlcnJpZGUgdGhlIGxvY2F0aW9uIHRvIGJlIG91ciBjZW50ZXJcblx0XHRcdFx0bm9uQW5pbWF0YWJsZSA9IHRydWU7XG5cdFx0XHRcdGlmIChtLl9zZXRQb3MpIHtcblx0XHRcdFx0XHRtLl9zZXRQb3ModGhpc0xheWVyUG9zKTtcblx0XHRcdFx0XHRub25BbmltYXRhYmxlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG0uY2x1c3RlckhpZGUpIHtcblx0XHRcdFx0XHRtLmNsdXN0ZXJIaWRlKCk7XG5cdFx0XHRcdFx0bm9uQW5pbWF0YWJsZSA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChub25BbmltYXRhYmxlKSB7XG5cdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIobSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBbmltYXRlIHRoZSBzcGlkZXIgbGVnIGJhY2sgaW4gKGFuaW1hdGlvbiBpcyBhY3R1YWxseSBkZWxlZ2F0ZWQgdG8gQ1NTIHRyYW5zaXRpb24pLlxuXHRcdFx0XHRpZiAoc3ZnKSB7XG5cdFx0XHRcdFx0bGVnID0gbS5fc3BpZGVyTGVnO1xuXHRcdFx0XHRcdGxlZ1BhdGggPSBsZWcuX3BhdGg7XG5cdFx0XHRcdFx0bGVnTGVuZ3RoID0gbGVnUGF0aC5nZXRUb3RhbExlbmd0aCgpICsgMC4xO1xuXHRcdFx0XHRcdGxlZ1BhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGxlZ0xlbmd0aDtcblx0XHRcdFx0XHRsZWcuc2V0U3R5bGUoe29wYWNpdHk6IDB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRncm91cC5faWdub3JlTW92ZSA9IGZhbHNlO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly9JZiB3ZSBoYXZlIG9ubHkgPD0gb25lIGNoaWxkIGxlZnQgdGhlbiB0aGF0IG1hcmtlciB3aWxsIGJlIHNob3duIG9uIHRoZSBtYXAgc28gZG9uJ3QgcmVtb3ZlIGl0IVxuXHRcdFx0XHR2YXIgc3RpbGxUaGVyZUNoaWxkQ291bnQgPSAwO1xuXHRcdFx0XHRmb3IgKGkgPSBjaGlsZE1hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xuXHRcdFx0XHRcdGlmIChtLl9zcGlkZXJMZWcpIHtcblx0XHRcdFx0XHRcdHN0aWxsVGhlcmVDaGlsZENvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblxuXHRcdFx0XHRmb3IgKGkgPSBjaGlsZE1hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xuXG5cdFx0XHRcdFx0aWYgKCFtLl9zcGlkZXJMZWcpIHsgLy9IYXMgYWxyZWFkeSBiZWVuIHVuc3BpZGVyZmllZFxuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKG0uY2x1c3RlclNob3cpIHtcblx0XHRcdFx0XHRcdG0uY2x1c3RlclNob3coKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG0uc2V0WkluZGV4T2Zmc2V0KSB7XG5cdFx0XHRcdFx0XHRtLnNldFpJbmRleE9mZnNldCgwKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoc3RpbGxUaGVyZUNoaWxkQ291bnQgPiAxKSB7XG5cdFx0XHRcdFx0XHRmZy5yZW1vdmVMYXllcihtKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRtYXAucmVtb3ZlTGF5ZXIobS5fc3BpZGVyTGVnKTtcblx0XHRcdFx0XHRkZWxldGUgbS5fc3BpZGVyTGVnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGdyb3VwLl9hbmltYXRpb25FbmQoKTtcblx0XHRcdFx0Z3JvdXAuZmlyZSgndW5zcGlkZXJmaWVkJywge1xuXHRcdFx0XHRcdGNsdXN0ZXI6IG1lLFxuXHRcdFx0XHRcdG1hcmtlcnM6IGNoaWxkTWFya2Vyc1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sIDIwMCk7XG5cdFx0fVxuXHR9KTtcblxuXG5cdEwuTWFya2VyQ2x1c3Rlckdyb3VwLmluY2x1ZGUoe1xuXHRcdC8vVGhlIE1hcmtlckNsdXN0ZXIgY3VycmVudGx5IHNwaWRlcmZpZWQgKGlmIGFueSlcblx0XHRfc3BpZGVyZmllZDogbnVsbCxcblxuXHRcdHVuc3BpZGVyZnk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX3Vuc3BpZGVyZnkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9LFxuXG5cdFx0X3NwaWRlcmZpZXJPbkFkZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX3Vuc3BpZGVyZnlXcmFwcGVyLCB0aGlzKTtcblxuXHRcdFx0aWYgKHRoaXMuX21hcC5vcHRpb25zLnpvb21BbmltYXRpb24pIHtcblx0XHRcdFx0dGhpcy5fbWFwLm9uKCd6b29tc3RhcnQnLCB0aGlzLl91bnNwaWRlcmZ5Wm9vbVN0YXJ0LCB0aGlzKTtcblx0XHRcdH1cblx0XHRcdC8vQnJvd3NlcnMgd2l0aG91dCB6b29tQW5pbWF0aW9uIG9yIGEgYmlnIHpvb20gZG9uJ3QgZmlyZSB6b29tc3RhcnRcblx0XHRcdHRoaXMuX21hcC5vbignem9vbWVuZCcsIHRoaXMuX25vYW5pbWF0aW9uVW5zcGlkZXJmeSwgdGhpcyk7XG5cblx0XHRcdGlmICghTC5Ccm93c2VyLnRvdWNoKSB7XG5cdFx0XHRcdHRoaXMuX21hcC5nZXRSZW5kZXJlcih0aGlzKTtcblx0XHRcdFx0Ly9OZWVkcyB0byBoYXBwZW4gaW4gdGhlIHBhZ2Vsb2FkLCBub3QgYWZ0ZXIsIG9yIGFuaW1hdGlvbnMgZG9uJ3Qgd29yayBpbiB3ZWJraXRcblx0XHRcdFx0Ly8gIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODQ1NTIwMC9zdmctYW5pbWF0ZS13aXRoLWR5bmFtaWNhbGx5LWFkZGVkLWVsZW1lbnRzXG5cdFx0XHRcdC8vRGlzYWJsZSBvbiB0b3VjaCBicm93c2VycyBhcyB0aGUgYW5pbWF0aW9uIG1lc3NlcyB1cCBvbiBhIHRvdWNoIHpvb20gYW5kIGlzbid0IHZlcnkgbm90aWNhYmxlXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9zcGlkZXJmaWVyT25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fdW5zcGlkZXJmeVdyYXBwZXIsIHRoaXMpO1xuXHRcdFx0dGhpcy5fbWFwLm9mZignem9vbXN0YXJ0JywgdGhpcy5fdW5zcGlkZXJmeVpvb21TdGFydCwgdGhpcyk7XG5cdFx0XHR0aGlzLl9tYXAub2ZmKCd6b29tYW5pbScsIHRoaXMuX3Vuc3BpZGVyZnlab29tQW5pbSwgdGhpcyk7XG5cdFx0XHR0aGlzLl9tYXAub2ZmKCd6b29tZW5kJywgdGhpcy5fbm9hbmltYXRpb25VbnNwaWRlcmZ5LCB0aGlzKTtcblxuXHRcdFx0Ly9FbnN1cmUgdGhhdCBtYXJrZXJzIGFyZSBiYWNrIHdoZXJlIHRoZXkgc2hvdWxkIGJlXG5cdFx0XHQvLyBVc2Ugbm8gYW5pbWF0aW9uIHRvIGF2b2lkIGEgc3RpY2t5IGxlYWZsZXQtY2x1c3Rlci1hbmltIGNsYXNzIG9uIG1hcFBhbmVcblx0XHRcdHRoaXMuX25vYW5pbWF0aW9uVW5zcGlkZXJmeSgpO1xuXHRcdH0sXG5cblx0XHQvL09uIHpvb20gc3RhcnQgd2UgYWRkIGEgem9vbWFuaW0gaGFuZGxlciBzbyB0aGF0IHdlIGFyZSBndWFyYW50ZWVkIHRvIGJlIGxhc3QgKGFmdGVyIG1hcmtlcnMgYXJlIGFuaW1hdGVkKVxuXHRcdC8vVGhpcyBtZWFucyB3ZSBjYW4gZGVmaW5lIHRoZSBhbmltYXRpb24gdGhleSBkbyByYXRoZXIgdGhhbiBNYXJrZXJzIGRvaW5nIGFuIGFuaW1hdGlvbiB0byB0aGVpciBhY3R1YWwgbG9jYXRpb25cblx0XHRfdW5zcGlkZXJmeVpvb21TdGFydDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCF0aGlzLl9tYXApIHsgLy9NYXkgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgbWFwIGJ5IGEgem9vbUVuZCBoYW5kbGVyXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fbWFwLm9uKCd6b29tYW5pbScsIHRoaXMuX3Vuc3BpZGVyZnlab29tQW5pbSwgdGhpcyk7XG5cdFx0fSxcblxuXHRcdF91bnNwaWRlcmZ5Wm9vbUFuaW06IGZ1bmN0aW9uICh6b29tRGV0YWlscykge1xuXHRcdFx0Ly9XYWl0IHVudGlsIHRoZSBmaXJzdCB6b29tYW5pbSBhZnRlciB0aGUgdXNlciBoYXMgZmluaXNoZWQgdG91Y2gtem9vbWluZyBiZWZvcmUgcnVubmluZyB0aGUgYW5pbWF0aW9uXG5cdFx0XHRpZiAoTC5Eb21VdGlsLmhhc0NsYXNzKHRoaXMuX21hcC5fbWFwUGFuZSwgJ2xlYWZsZXQtdG91Y2hpbmcnKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX21hcC5vZmYoJ3pvb21hbmltJywgdGhpcy5fdW5zcGlkZXJmeVpvb21BbmltLCB0aGlzKTtcblx0XHRcdHRoaXMuX3Vuc3BpZGVyZnkoem9vbURldGFpbHMpO1xuXHRcdH0sXG5cblx0XHRfdW5zcGlkZXJmeVdyYXBwZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vLyA8c3VtbWFyeT5fdW5zcGlkZXJmeSBidXQgcGFzc2VzIG5vIGFyZ3VtZW50czwvc3VtbWFyeT5cblx0XHRcdHRoaXMuX3Vuc3BpZGVyZnkoKTtcblx0XHR9LFxuXG5cdFx0X3Vuc3BpZGVyZnk6IGZ1bmN0aW9uICh6b29tRGV0YWlscykge1xuXHRcdFx0aWYgKHRoaXMuX3NwaWRlcmZpZWQpIHtcblx0XHRcdFx0dGhpcy5fc3BpZGVyZmllZC51bnNwaWRlcmZ5KHpvb21EZXRhaWxzKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X25vYW5pbWF0aW9uVW5zcGlkZXJmeTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuX3NwaWRlcmZpZWQpIHtcblx0XHRcdFx0dGhpcy5fc3BpZGVyZmllZC5fbm9hbmltYXRpb25VbnNwaWRlcmZ5KCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vSWYgdGhlIGdpdmVuIGxheWVyIGlzIGN1cnJlbnRseSBiZWluZyBzcGlkZXJmaWVkIHRoZW4gd2UgdW5zcGlkZXJmeSBpdCBzbyBpdCBpc24ndCBvbiB0aGUgbWFwIGFueW1vcmUgZXRjXG5cdFx0X3Vuc3BpZGVyZnlMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG5cdFx0XHRpZiAobGF5ZXIuX3NwaWRlckxlZykge1xuXHRcdFx0XHR0aGlzLl9mZWF0dXJlR3JvdXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuXG5cdFx0XHRcdGlmIChsYXllci5jbHVzdGVyU2hvdykge1xuXHRcdFx0XHRcdGxheWVyLmNsdXN0ZXJTaG93KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XHQvL1Bvc2l0aW9uIHdpbGwgYmUgZml4ZWQgdXAgaW1tZWRpYXRlbHkgaW4gX2FuaW1hdGlvblVuc3BpZGVyZnlcblx0XHRcdFx0aWYgKGxheWVyLnNldFpJbmRleE9mZnNldCkge1xuXHRcdFx0XHRcdGxheWVyLnNldFpJbmRleE9mZnNldCgwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX21hcC5yZW1vdmVMYXllcihsYXllci5fc3BpZGVyTGVnKTtcblx0XHRcdFx0ZGVsZXRlIGxheWVyLl9zcGlkZXJMZWc7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogQWRkcyAxIHB1YmxpYyBtZXRob2QgdG8gTUNHIGFuZCAxIHRvIEwuTWFya2VyIHRvIGZhY2lsaXRhdGUgY2hhbmdpbmdcblx0ICogbWFya2VycycgaWNvbiBvcHRpb25zIGFuZCByZWZyZXNoaW5nIHRoZWlyIGljb24gYW5kIHRoZWlyIHBhcmVudCBjbHVzdGVyc1xuXHQgKiBhY2NvcmRpbmdseSAoY2FzZSB3aGVyZSB0aGVpciBpY29uQ3JlYXRlRnVuY3Rpb24gdXNlcyBkYXRhIG9mIGNoaWxkTWFya2Vyc1xuXHQgKiB0byBtYWtlIHVwIHRoZSBjbHVzdGVyIGljb24pLlxuXHQgKi9cblxuXG5cdEwuTWFya2VyQ2x1c3Rlckdyb3VwLmluY2x1ZGUoe1xuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZXMgdGhlIGljb24gb2YgYWxsIGNsdXN0ZXJzIHdoaWNoIGFyZSBwYXJlbnRzIG9mIHRoZSBnaXZlbiBtYXJrZXIocykuXG5cdFx0ICogSW4gc2luZ2xlTWFya2VyTW9kZSwgYWxzbyB1cGRhdGVzIHRoZSBnaXZlbiBtYXJrZXIocykgaWNvbi5cblx0XHQgKiBAcGFyYW0gbGF5ZXJzIEwuTWFya2VyQ2x1c3Rlckdyb3VwfEwuTGF5ZXJHcm91cHxBcnJheShMLk1hcmtlcil8TWFwKEwuTWFya2VyKXxcblx0XHQgKiBMLk1hcmtlckNsdXN0ZXJ8TC5NYXJrZXIgKG9wdGlvbmFsKSBsaXN0IG9mIG1hcmtlcnMgKG9yIHNpbmdsZSBtYXJrZXIpIHdob3NlIHBhcmVudFxuXHRcdCAqIGNsdXN0ZXJzIG5lZWQgdG8gYmUgdXBkYXRlZC4gSWYgbm90IHByb3ZpZGVkLCByZXRyaWV2ZXMgYWxsIGNoaWxkIG1hcmtlcnMgb2YgdGhpcy5cblx0XHQgKiBAcmV0dXJucyB7TC5NYXJrZXJDbHVzdGVyR3JvdXB9XG5cdFx0ICovXG5cdFx0cmVmcmVzaENsdXN0ZXJzOiBmdW5jdGlvbiAobGF5ZXJzKSB7XG5cdFx0XHRpZiAoIWxheWVycykge1xuXHRcdFx0XHRsYXllcnMgPSB0aGlzLl90b3BDbHVzdGVyTGV2ZWwuZ2V0QWxsQ2hpbGRNYXJrZXJzKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGxheWVycyBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlckdyb3VwKSB7XG5cdFx0XHRcdGxheWVycyA9IGxheWVycy5fdG9wQ2x1c3RlckxldmVsLmdldEFsbENoaWxkTWFya2VycygpO1xuXHRcdFx0fSBlbHNlIGlmIChsYXllcnMgaW5zdGFuY2VvZiBMLkxheWVyR3JvdXApIHtcblx0XHRcdFx0bGF5ZXJzID0gbGF5ZXJzLl9sYXllcnM7XG5cdFx0XHR9IGVsc2UgaWYgKGxheWVycyBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlcikge1xuXHRcdFx0XHRsYXllcnMgPSBsYXllcnMuZ2V0QWxsQ2hpbGRNYXJrZXJzKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGxheWVycyBpbnN0YW5jZW9mIEwuTWFya2VyKSB7XG5cdFx0XHRcdGxheWVycyA9IFtsYXllcnNdO1xuXHRcdFx0fSAvLyBlbHNlOiBtdXN0IGJlIGFuIEFycmF5KEwuTWFya2VyKXxNYXAoTC5NYXJrZXIpXG5cdFx0XHR0aGlzLl9mbGFnUGFyZW50c0ljb25zTmVlZFVwZGF0ZShsYXllcnMpO1xuXHRcdFx0dGhpcy5fcmVmcmVzaENsdXN0ZXJzSWNvbnMoKTtcblxuXHRcdFx0Ly8gSW4gY2FzZSBvZiBzaW5nbGVNYXJrZXJNb2RlLCBhbHNvIHJlLWRyYXcgdGhlIG1hcmtlcnMuXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnNpbmdsZU1hcmtlck1vZGUpIHtcblx0XHRcdFx0dGhpcy5fcmVmcmVzaFNpbmdsZU1hcmtlck1vZGVNYXJrZXJzKGxheWVycyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBTaW1wbHkgZmxhZ3MgYWxsIHBhcmVudCBjbHVzdGVycyBvZiB0aGUgZ2l2ZW4gbWFya2VycyBhcyBoYXZpbmcgYSBcImRpcnR5XCIgaWNvbi5cblx0XHQgKiBAcGFyYW0gbGF5ZXJzIEFycmF5KEwuTWFya2VyKXxNYXAoTC5NYXJrZXIpIGxpc3Qgb2YgbWFya2Vycy5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9mbGFnUGFyZW50c0ljb25zTmVlZFVwZGF0ZTogZnVuY3Rpb24gKGxheWVycykge1xuXHRcdFx0dmFyIGlkLCBwYXJlbnQ7XG5cblx0XHRcdC8vIEFzc3VtZXMgbGF5ZXJzIGlzIGFuIEFycmF5IG9yIGFuIE9iamVjdCB3aG9zZSBwcm90b3R5cGUgaXMgbm9uLWVudW1lcmFibGUuXG5cdFx0XHRmb3IgKGlkIGluIGxheWVycykge1xuXHRcdFx0XHQvLyBGbGFnIHBhcmVudCBjbHVzdGVycycgaWNvbiBhcyBcImRpcnR5XCIsIGFsbCB0aGUgd2F5IHVwLlxuXHRcdFx0XHQvLyBEdW1iIHByb2Nlc3MgdGhhdCBmbGFncyBtdWx0aXBsZSB0aW1lcyB1cHBlciBwYXJlbnRzLCBidXQgc3RpbGxcblx0XHRcdFx0Ly8gbXVjaCBtb3JlIGVmZmljaWVudCB0aGFuIHRyeWluZyB0byBiZSBzbWFydCBhbmQgbWFrZSBzaG9ydCBsaXN0cyxcblx0XHRcdFx0Ly8gYXQgbGVhc3QgaW4gdGhlIGNhc2Ugb2YgYSBoaWVyYXJjaHkgZm9sbG93aW5nIGEgcG93ZXIgbGF3OlxuXHRcdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS9mbGFnLW5vZGVzLWluLXBvd2VyLWhpZXJhcmNoeS8yXG5cdFx0XHRcdHBhcmVudCA9IGxheWVyc1tpZF0uX19wYXJlbnQ7XG5cdFx0XHRcdHdoaWxlIChwYXJlbnQpIHtcblx0XHRcdFx0XHRwYXJlbnQuX2ljb25OZWVkc1VwZGF0ZSA9IHRydWU7XG5cdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50Ll9fcGFyZW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJlLWRyYXdzIHRoZSBpY29uIG9mIHRoZSBzdXBwbGllZCBtYXJrZXJzLlxuXHRcdCAqIFRvIGJlIHVzZWQgaW4gc2luZ2xlTWFya2VyTW9kZSBvbmx5LlxuXHRcdCAqIEBwYXJhbSBsYXllcnMgQXJyYXkoTC5NYXJrZXIpfE1hcChMLk1hcmtlcikgbGlzdCBvZiBtYXJrZXJzLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0X3JlZnJlc2hTaW5nbGVNYXJrZXJNb2RlTWFya2VyczogZnVuY3Rpb24gKGxheWVycykge1xuXHRcdFx0dmFyIGlkLCBsYXllcjtcblxuXHRcdFx0Zm9yIChpZCBpbiBsYXllcnMpIHtcblx0XHRcdFx0bGF5ZXIgPSBsYXllcnNbaWRdO1xuXG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBkbyBub3Qgb3ZlcnJpZGUgbWFya2VycyB0aGF0IGRvIG5vdCBiZWxvbmcgdG8gVEhJUyBncm91cC5cblx0XHRcdFx0aWYgKHRoaXMuaGFzTGF5ZXIobGF5ZXIpKSB7XG5cdFx0XHRcdFx0Ly8gTmVlZCB0byByZS1jcmVhdGUgdGhlIGljb24gZmlyc3QsIHRoZW4gcmUtZHJhdyB0aGUgbWFya2VyLlxuXHRcdFx0XHRcdGxheWVyLnNldEljb24odGhpcy5fb3ZlcnJpZGVNYXJrZXJJY29uKGxheWVyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdEwuTWFya2VyLmluY2x1ZGUoe1xuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZXMgdGhlIGdpdmVuIG9wdGlvbnMgaW4gdGhlIG1hcmtlcidzIGljb24gYW5kIHJlZnJlc2hlcyB0aGUgbWFya2VyLlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIG1hcCBvYmplY3Qgb2YgaWNvbiBvcHRpb25zLlxuXHRcdCAqIEBwYXJhbSBkaXJlY3RseVJlZnJlc2hDbHVzdGVycyBib29sZWFuIChvcHRpb25hbCkgdHJ1ZSB0byB0cmlnZ2VyXG5cdFx0ICogTUNHLnJlZnJlc2hDbHVzdGVyc09mKCkgcmlnaHQgYXdheSB3aXRoIHRoaXMgc2luZ2xlIG1hcmtlci5cblx0XHQgKiBAcmV0dXJucyB7TC5NYXJrZXJ9XG5cdFx0ICovXG5cdFx0cmVmcmVzaEljb25PcHRpb25zOiBmdW5jdGlvbiAob3B0aW9ucywgZGlyZWN0bHlSZWZyZXNoQ2x1c3RlcnMpIHtcblx0XHRcdHZhciBpY29uID0gdGhpcy5vcHRpb25zLmljb247XG5cblx0XHRcdEwuc2V0T3B0aW9ucyhpY29uLCBvcHRpb25zKTtcblxuXHRcdFx0dGhpcy5zZXRJY29uKGljb24pO1xuXG5cdFx0XHQvLyBTaG9ydGN1dCB0byByZWZyZXNoIHRoZSBhc3NvY2lhdGVkIE1DRyBjbHVzdGVycyByaWdodCBhd2F5LlxuXHRcdFx0Ly8gVG8gYmUgdXNlZCB3aGVuIHJlZnJlc2hpbmcgYSBzaW5nbGUgbWFya2VyLlxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBiZXR0ZXIgdXNlIE1DRy5yZWZyZXNoQ2x1c3RlcnMoKSBvbmNlIGF0IHRoZSBlbmQgd2l0aFxuXHRcdFx0Ly8gdGhlIGxpc3Qgb2YgbW9kaWZpZWQgbWFya2Vycy5cblx0XHRcdGlmIChkaXJlY3RseVJlZnJlc2hDbHVzdGVycyAmJiB0aGlzLl9fcGFyZW50KSB7XG5cdFx0XHRcdHRoaXMuX19wYXJlbnQuX2dyb3VwLnJlZnJlc2hDbHVzdGVycyh0aGlzKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHR9KTtcblxuXHRleHBvcnRzLk1hcmtlckNsdXN0ZXJHcm91cCA9IE1hcmtlckNsdXN0ZXJHcm91cDtcblx0ZXhwb3J0cy5NYXJrZXJDbHVzdGVyID0gTWFya2VyQ2x1c3RlcjtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSk7XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBmcm9tLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIG1hcCxcclxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcclxuICBjb25jYXRNYXAsXHJcbiAgdGFrZSxcclxuICB0YWtlVW50aWwsXHJcbiAgZmlsdGVyLFxyXG4gIGRlbGF5XHJcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgQ3VzdG9tQW5pbWF0aW9uLFxyXG4gIEVBU0VfSU5fT1VUX0JBQ0ssXHJcbiAgRUFTRV9JTl9PVVRcclxufSBmcm9tICcuLi8uLi9jb3JlL2FuaW1hdGlvbnMvY3VzdG9tLmFuaW1hdGlvbic7XHJcbmltcG9ydCB7IGVudGVyWm9uZSB9IGZyb20gJy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jb2FjaC1tYXJrcycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvYWNoLW1hcmtzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb2FjaC1tYXJrcy5jb21wb25lbnQuc2NzcyddLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoXHJcbiAgICAgICdnZW8tY29hY2htYXJrLWFuaW1hdGlvbicsXHJcbiAgICAgIEN1c3RvbUFuaW1hdGlvbi5jcmVhdGVFbnRlclNjYWxlSW5BbmltYXRpb24oMTAwMCwgNTAwLCBFQVNFX0lOX09VVCwgMC45KVxyXG4gICAgKSxcclxuICAgIHRyaWdnZXIoXHJcbiAgICAgICdhZGQtZmFiLWFuaW1hdGlvbicsXHJcbiAgICAgIEN1c3RvbUFuaW1hdGlvbi5jcmVhdGVFbnRlclNjYWxlSW5BbmltYXRpb24oMzAwMCwgNTAwLCBFQVNFX0lOX09VVF9CQUNLKVxyXG4gICAgKSxcclxuICAgIHRyaWdnZXIoXHJcbiAgICAgICdhZGQtdGV4dC1hbmltYXRpb24nLFxyXG4gICAgICBDdXN0b21BbmltYXRpb24uY3JlYXRlRW50ZXJTY2FsZUluQW5pbWF0aW9uKDQwMDAsIDUwMCwgRUFTRV9JTl9PVVQsIDAuOSlcclxuICAgICksXHJcbiAgICB0cmlnZ2VyKFxyXG4gICAgICAnd2FybmluZy1pY29uLWFuaW1hdGlvbicsXHJcbiAgICAgIEN1c3RvbUFuaW1hdGlvbi5jcmVhdGVFbnRlclNjYWxlSW5BbmltYXRpb24oNTAwMCwgNTAwLCBFQVNFX0lOX09VVF9CQUNLKVxyXG4gICAgKSxcclxuICAgIHRyaWdnZXIoXHJcbiAgICAgICd3YXJuaW5nLWNvYWNobWFyay1hbmltYXRpb24nLFxyXG4gICAgICBDdXN0b21BbmltYXRpb24uY3JlYXRlRW50ZXJTY2FsZUluQW5pbWF0aW9uKDYwMDAsIDUwMCwgRUFTRV9JTl9PVVQsIDAuOSlcclxuICAgIClcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2FjaE1hcmtzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHNob3dDb2FjaE1hcmtzJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuICBpc09wZW4gPSBmYWxzZTtcclxuICBuZ0Rlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBoaWRlU3ViamVjdCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zaG93Q29hY2hNYXJrcyQgPSBtZXJnZShcclxuICAgICAgdGhpcy5nZXRTaG93R2VvU2VsZWN0T2JzZXJ2YWJsZSgpLFxyXG4gICAgICB0aGlzLmhpZGVTdWJqZWN0XHJcbiAgICApLnBpcGUoZW50ZXJab25lKHRoaXMubmdab25lKSk7XHJcbiAgICB0aGlzLmdldFNob3dHZW9TZWxlY3RPYnNlcnZhYmxlKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCksXHJcbiAgICAgICAgZmlsdGVyKCh2YWwpID0+IHZhbCksXHJcbiAgICAgICAgZGVsYXkoMjAwMCksXHJcbiAgICAgICAgZW50ZXJab25lKHRoaXMubmdab25lKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNob3dHZW9TZWxlY3RPYnNlcnZhYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJC5waXBlKFxyXG4gICAgICBtYXAoKHVzKSA9PiB1cy5zaG93R2VvU2VsZWN0SW5mbyksXHJcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBoaWRlKCkge1xyXG4gICAgdGhpcy5oaWRlU3ViamVjdC5uZXh0KGZhbHNlKTtcclxuICAgIGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5zYXZlVXNlclNldHRpbmdzKHtcclxuICAgICAgLi4uY3VycmVudFNldHRpbmdzLFxyXG4gICAgICBzaG93R2VvU2VsZWN0SW5mbzogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJjb2FjaG1hcmstYmFja2Ryb3BcIiAqbmdJZj1cInNob3dDb2FjaE1hcmtzJCB8IGFzeW5jXCIgKGNsaWNrKT1cImhpZGUoKVwiPlxyXG4gIDxhcHAtZ2VvLWZhYiBbaXNPcGVuXT1cImlzT3BlblwiIFtzaG93TGFiZWxzXT1cImZhbHNlXCIgW2FuaW1hdGVPbkVudGVyXT1cInRydWVcIj48L2FwcC1nZW8tZmFiPlxyXG4gIDxkaXYgY2xhc3M9XCJnZW8tY29hY2htYXJrXCIgQGdlby1jb2FjaG1hcmstYW5pbWF0aW9uPlxyXG4gICAgPHN2ZyB3aWR0aD1cIjY1XCIgaGVpZ2h0PVwiNzZcIiB2aWV3Qm94PVwiMCAwIDY1IDc2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgIDxwYXRoIGQ9XCJNNjQgNjJDNjQgNjIgNTEuNSA0NC41IDM4LjUgMzUuNUMyNS41IDI2LjUgMyAxNS41IDMgMTUuNU0zIDE1LjVMMTggMTUuNU0zIDE1LjVMMTIuNSAyOFwiIHN0cm9rZT1cIndoaXRlXCJcclxuICAgICAgICBzdHJva2Utd2lkdGg9XCIyXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICAgPGlvbi10ZXh0IGNsYXNzPVwiY29hY2htYXJrLXRleHRcIj57eydDT0FDSF9NQVJLUy5TRUxFQ1RfR0VPX0hBWkFSRCcgfCB0cmFuc2xhdGV9fTwvaW9uLXRleHQ+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cImFkZC1jb2FjaG1hcmtcIiBAYWRkLXRleHQtYW5pbWF0aW9uPlxyXG4gICAgPHN2ZyB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDZcIiB2aWV3Qm94PVwiMCAwIDQwIDQ2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgIDxwYXRoIGQ9XCJNMSAxQzEgMSAxLjUgMTcuNSAxMiAyN0MyMi41IDM2LjUgMzcuNSA0Mi41IDM3LjUgNDIuNU0zNy41IDQyLjVMMjkgMjguNU0zNy41IDQyLjVMMjEgNDQuNVwiIHN0cm9rZT1cIndoaXRlXCJcclxuICAgICAgICBzdHJva2Utd2lkdGg9XCIyXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICAgPGlvbi10ZXh0IGNsYXNzPVwiY29hY2htYXJrLXRleHRcIj57eydDT0FDSF9NQVJLUy5BRERfT0JTRVJWQVRJT05TJyB8IHRyYW5zbGF0ZX19PC9pb24tdGV4dD5cclxuICA8L2Rpdj5cclxuICA8aW9uLWZhYiBAYWRkLWZhYi1hbmltYXRpb24gY2xhc3M9XCJhZGQtZmFiXCIgdmVydGljYWw9XCJib3R0b21cIiBob3Jpem9udGFsPVwiZW5kXCIgc2xvdD1cImZpeGVkXCI+XHJcbiAgICA8aW9uLWZhYi1idXR0b24+XHJcbiAgICAgIDxpb24taWNvbiBuYW1lPVwiYWRkXCI+PC9pb24taWNvbj5cclxuICAgIDwvaW9uLWZhYi1idXR0b24+XHJcbiAgPC9pb24tZmFiPlxyXG4gIDxkaXYgY2xhc3M9XCJ3YXJuaW5nLWNvYWNobWFya1wiIEB3YXJuaW5nLWNvYWNobWFyay1hbmltYXRpb24+XHJcbiAgICA8c3ZnIHdpZHRoPVwiOTBcIiBoZWlnaHQ9XCI0MFwiIHZpZXdCb3g9XCIwIDAgOTAgNDBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgPHBhdGggZD1cIk0xIDEuNUMxIDEuNSA4IDEwIDI1LjUgMTguNUM0MyAyNyA4Ni41IDM1LjUgODYuNSAzNS41TTg2LjUgMzUuNUw3MyAyNS41TTg2LjUgMzUuNUw2NC41IDM4LjVcIlxyXG4gICAgICAgIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICAgIDxpb24tdGV4dCBjbGFzcz1cImNvYWNobWFyay10ZXh0XCI+e3sgJ0NPQUNIX01BUktTLlZJRVdfV0FSTklOR1MnIHwgdHJhbnNsYXRlIH19PC9pb24tdGV4dD5cclxuICA8L2Rpdj5cclxuICA8aW9uLXRhYi1iYXI+XHJcbiAgICA8aW9uLXRhYi1idXR0b24gdGFiPVwiaG9tZVwiPlxyXG4gICAgICA8aW9uLWljb24gbmFtZT1cIm1hcFwiPjwvaW9uLWljb24+XHJcbiAgICAgIDxpb24tbGFiZWw+e3snVEFCUy5NQVAnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLXRhYi1idXR0b24+XHJcbiAgICA8aW9uLXRhYi1idXR0b24gdGFiPVwib2JzZXJ2YXRpb24tbGlzdFwiPlxyXG4gICAgICA8aW9uLWljb24gbmFtZT1cImxpc3RcIj48L2lvbi1pY29uPlxyXG4gICAgICA8aW9uLWxhYmVsPnt7J1RBQlMuTElTVCcgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24tdGFiLWJ1dHRvbj5cclxuICAgIDxpb24tdGFiLWJ1dHRvbiB0YWI9XCJ3YXJuaW5nLWxpc3RcIj5cclxuICAgICAgPGlvbi1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgQHdhcm5pbmctaWNvbi1hbmltYXRpb24gY2xhc3M9XCJ3YXJuaW5nLWljb25cIj48L2lvbi1pY29uPlxyXG4gICAgICA8aW9uLWxhYmVsPnt7J1RBQlMuV0FSTklOR1MnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLXRhYi1idXR0b24+XHJcbiAgPC9pb24tdGFiLWJhcj5cclxuPC9kaXY+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXBJdGVtIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvbWFwLWl0ZW0ubW9kZWwnO1xyXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9oZWxwZXJzL2hlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQsIEFwcE1vZGUgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IEF0dGFjaG1lbnRWaWV3TW9kZWwsIFJlZ2lzdHJhdGlvblZpZXdNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHZW9Qb3NpdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2dlby1wb3NpdGlvbi9nZW8tcG9zaXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IGdldFN0YXJDb3VudCB9IGZyb20gJy4uLy4uL2NvcmUvaGVscGVycy9jb21wZXRlbmNlLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1tYXAtaXRlbS1iYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXAtaXRlbS1iYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hcC1pdGVtLWJhci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBJdGVtQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHZpc2libGU6IGJvb2xlYW47XHJcbiAgdG9wSGVhZGVyOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkaXN0YW5jZUFuZFR5cGU6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBnZW9IYXphcmQ6IEdlb0hhemFyZDtcclxuICBpbWFnZVVybHM6IHN0cmluZ1tdID0gW107XHJcbiAgbWFzbDogbnVtYmVyO1xyXG4gIGNvbXBldGVuY2VMZXZlbDogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2lzVmlzaWJsZTogU3ViamVjdDxib29sZWFuPjtcclxuICBwcml2YXRlIGFwcE1vZGU6IEFwcE1vZGU7XHJcblxyXG4gIGdldCBpc1Zpc2libGUoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogUmV3cml0ZSB0aGlzIGNvbXBvbmVudCB0byB1c2Ugb2JzZXJ2YWJsZS4gTWF5YmUgcHV0IHZpc2libGVNYXBJdGVtIG9ic2VydmFibGUgaW4gbWFwIHNlcnZpY2U/XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBnZW9Qb3NpdGlvblNlcnZpY2U6IEdlb1Bvc2l0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgaGVscGVyOiBIZWxwZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9pc1Zpc2libGUgPSBuZXcgU3ViamVjdCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmFwcE1vZGVMYW5ndWFnZUFuZEN1cnJlbnRHZW9IYXphcmQkLnN1YnNjcmliZShcclxuICAgICAgKFthcHBNb2RlLCBfLCBfX10pID0+IHtcclxuICAgICAgICB0aGlzLmFwcE1vZGUgPSBhcHBNb2RlO1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRpdGxlKGl0ZW06IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCkge1xyXG4gICAgY29uc3QgYWxsUmVnaXN0cmF0aW9uTmFtZXM6IEFycmF5PHN0cmluZz4gPSAoaXRlbS5TdW1tYXJpZXMgfHwgW10pLm1hcChcclxuICAgICAgKHJlZ2lzdHJhdGlvbikgPT4gcmVnaXN0cmF0aW9uLlJlZ2lzdHJhdGlvbk5hbWVcclxuICAgICk7XHJcbiAgICBjb25zdCB1bmlxdWVWYWx1ZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoYWxsUmVnaXN0cmF0aW9uTmFtZXMpKTtcclxuICAgIHJldHVybiB1bmlxdWVWYWx1ZXMuam9pbignLCAnKTtcclxuICB9XHJcblxyXG4gIHNob3coaXRlbTogTWFwSXRlbSkge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuaWQgPSBpdGVtLlJlZ0lkO1xyXG4gICAgICB0aGlzLnRvcEhlYWRlciA9IGl0ZW0uRHRPYnNUaW1lO1xyXG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy5nZXRUaXRsZShpdGVtKTtcclxuICAgICAgdGhpcy5uYW1lID0gaXRlbS5PYnNlcnZlci5OaWNrTmFtZTtcclxuICAgICAgdGhpcy5jb21wZXRlbmNlTGV2ZWwgPSBnZXRTdGFyQ291bnQoaXRlbS5PYnNlcnZlci5Db21wZXRlbmNlTGV2ZWxOYW1lKTtcclxuICAgICAgdGhpcy5nZW9IYXphcmQgPSBpdGVtLkdlb0hhemFyZFRJRDtcclxuICAgICAgdGhpcy5tYXNsID0gaXRlbS5PYnNMb2NhdGlvbiA/IGl0ZW0uT2JzTG9jYXRpb24uSGVpZ2h0IDogdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnNldERpc3RhbmNlQW5kVHlwZShpdGVtKTtcclxuICAgICAgdGhpcy5pbWFnZVVybHMgPSBbXTtcclxuICAgICAgaWYgKHRoaXMuYXBwTW9kZSAmJiBpdGVtLkF0dGFjaG1lbnRzICYmIGl0ZW0uQXR0YWNobWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VVcmxzID0gaXRlbS5BdHRhY2htZW50cy5tYXAoKGF0dGFjaG1lbnQpID0+XHJcbiAgICAgICAgICB0aGlzLmdldEltYWdlVXJsKFxyXG4gICAgICAgICAgICBhdHRhY2htZW50LFxyXG4gICAgICAgICAgICAnTWVkaXVtJ1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5wdWJsaXNoQ2hhbmdlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucHVibGlzaENoYW5nZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRJbWFnZVVybChcclxuICAgIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRWaWV3TW9kZWwsXHJcbiAgICBzaXplOiAnVGh1bWJuYWlsJyB8ICdNZWRpdW0nIHwgJ0xhcmdlJyB8ICdPcmlnaW5hbCcgfCAnUmF3JyA9ICdNZWRpdW0nXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gYXR0YWNobWVudC5VcmxGb3JtYXRzW3NpemVdO1xyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUb0l0ZW0oKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGB2aWV3LW9ic2VydmF0aW9uLyR7dGhpcy5pZH1gKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVibGlzaENoYW5nZSgpIHtcclxuICAgIHRoaXMuX2lzVmlzaWJsZS5uZXh0KHRoaXMudmlzaWJsZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHNldERpc3RhbmNlQW5kVHlwZShpdGVtOiBNYXBJdGVtKSB7XHJcbiAgICB0aGlzLmRpc3RhbmNlQW5kVHlwZSA9ICcnOyAvLyBzZXQgYnkgcHJvbWlzZVxyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoWydNQVBfSVRFTV9CQVIuT0JTRVJWQVRJT04nLCAnTUFQX0lURU1fQkFSLkFXQVknXSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gYXdhaXQgdGhpcy5nZW9Qb3NpdGlvblNlcnZpY2UuY3VycmVudFBvc2l0aW9uJFxyXG4gICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICBpZiAoY3VycmVudFBvc2l0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBMLmxhdExuZyhcclxuICAgICAgICAgIGl0ZW0uT2JzTG9jYXRpb24uTGF0aXR1ZGUsXHJcbiAgICAgICAgICBpdGVtLk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgICAgICkuZGlzdGFuY2VUbyhcclxuICAgICAgICAgIEwubGF0TG5nKFxyXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRpc3RhbmNlQW5kVHlwZSA9XHJcbiAgICAgICAgICAgIGAke2l0ZW0uR2VvSGF6YXJkTmFtZX0ke3RyYW5zbGF0aW9uc1tcclxuICAgICAgICAgICAgICAnTUFQX0lURU1fQkFSLk9CU0VSVkFUSU9OJ1xyXG4gICAgICAgICAgICBdLnRvTG93ZXJDYXNlKCl9IGAgK1xyXG4gICAgICAgICAgICBgJHt0aGlzLmhlbHBlci5nZXREaXN0YW5jZVRleHQoZGlzdGFuY2UpfSAke3RyYW5zbGF0aW9uc1tcclxuICAgICAgICAgICAgICAnTUFQX0lURU1fQkFSLkFXQVknXHJcbiAgICAgICAgICAgIF0udG9Mb3dlckNhc2UoKX1gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5kaXN0YW5jZUFuZFR5cGUgPSBgJHtpdGVtLkdlb0hhemFyZE5hbWV9JHt0cmFuc2xhdGlvbnNbXHJcbiAgICAgICAgICAgICdNQVBfSVRFTV9CQVIuT0JTRVJWQVRJT04nXHJcbiAgICAgICAgICBdLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VBbmRUeXBlID0gYCR7aXRlbS5HZW9IYXphcmROYW1lfSR7dHJhbnNsYXRpb25zW1xyXG4gICAgICAgICAgJ01BUF9JVEVNX0JBUi5PQlNFUlZBVElPTidcclxuICAgICAgICBdLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJtYXAtaXRlbS1iYXJcIiAoY2xpY2spPVwibmF2aWdhdGVUb0l0ZW0oKVwiICpuZ0lmPVwidmlzaWJsZVwiPlxyXG4gIDxpb24tZ3JpZCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pY29uLWl0ZW1cIj5cclxuICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImNhcmQtaWNvbi1pdGVtLWljb25cIiBzcmM9XCIvYXNzZXRzL2ljb24vdGltZS5zdmdcIlxyXG4gICAgICAgICAgICBbc3ZnU3R5bGVdPVwieyd3aWR0aC5weCc6MTYsICdoZWlnaHQucHgnOjE2ICB9XCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3sgdG9wSGVhZGVyIHwgZm9ybWF0RGF0ZSB8IGFzeW5jIH19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaWNvbi1pdGVtXCIgKm5nSWY9XCJtYXNsXCI+XHJcbiAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJjYXJkLWljb24taXRlbS1pY29uXCIgc3JjPVwiL2Fzc2V0cy9pY29uL21vaC5zdmdcIlxyXG4gICAgICAgICAgICBbc3ZnU3R5bGVdPVwieyd3aWR0aC5weCc6MTYsICdoZWlnaHQucHgnOjE2ICB9XCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3sgbWFzbCB9fSB7eydNQVBfQ0VOVEVSX0lORk8uQUJPVkVfU0VBX0xFVkVMJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbD5cclxuICAgICAgICA8aDUgY2xhc3M9XCJpb24tbm8tbWFyZ2luIGlvbi10ZXh0LW5vd3JhcFwiPnt7dGl0bGV9fTwvaDU+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pY29uLWl0ZW1cIj5cclxuICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImNhcmQtaWNvbi1pdGVtLWljb25cIiBzcmM9XCIvYXNzZXRzL2ljb24vdXNlci5zdmdcIlxyXG4gICAgICAgICAgICBbc3ZnU3R5bGVdPVwieyd3aWR0aC5weCc6MTYsICdoZWlnaHQucHgnOjE2ICB9XCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3tuYW1lfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pY29uLWl0ZW1cIj5cclxuICAgICAgICAgIDxhcHAtY29tcGV0ZW5jZSBbY29tcGV0ZW5jZUxldmVsXT1cImNvbXBldGVuY2VMZXZlbFwiPjwvYXBwLWNvbXBldGVuY2U+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICA8L2lvbi1ncmlkPlxyXG4gIDxkaXYgY2xhc3M9XCJpbWctd3JhcHBlclwiICpuZ0lmPVwiaW1hZ2VVcmxzLmxlbmd0aCA+IDBcIiBbbmdDbGFzc109XCJ7J2Z1bGwnOiBpbWFnZVVybHMubGVuZ3RoID4gMSB9XCI+XHJcbiAgICA8YXBwLWltZy1zd2lwZXIgW3Nob3dMYWJlbHNdPVwiZmFsc2VcIiBbaW1nVXJsXT1cImltYWdlVXJsc1wiPjwvYXBwLWltZy1zd2lwZXI+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIFJlbmRlcmVyMixcclxuICBWaWV3Q2hpbGQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2FybmluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3dhcm5pbmcvd2FybmluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFdhcm5pbmdHcm91cEtleSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvd2FybmluZy93YXJuaW5nLWdyb3VwLWtleS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFRvYXN0Q29udHJvbGxlciwgRG9tQ29udHJvbGxlciwgSW9uSWNvbiB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXdhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3dhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vd2FybmluZy1ncm91cC1mYXZvdXJpdGUtdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFdhcm5pbmdHcm91cEZhdm91cml0ZVRvZ2dsZUNvbXBvbmVudFxyXG5pbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGtleTogV2FybmluZ0dyb3VwS2V5O1xyXG4gIEBWaWV3Q2hpbGQoSW9uSWNvbikgaW9uSWNvbjogSW9uSWNvbjtcclxuXHJcbiAgcHJpdmF0ZSB3YXJuaW5nSXNGYXZvdXJpdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBpc0Zhdm91cml0ZTogYm9vbGVhbjtcclxuICBwcml2YXRlIF9sYXN0S2V5OiBXYXJuaW5nR3JvdXBLZXk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB3YXJuaW5nU2VydmljZTogV2FybmluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBkb21DdHJsOiBEb21Db250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSB0b2FzdENvbnRyb2xsZXI6IFRvYXN0Q29udHJvbGxlclxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBjb25zdCBjdXJyZW50S2V5OiBXYXJuaW5nR3JvdXBLZXkgPSBjaGFuZ2VzLmtleS5jdXJyZW50VmFsdWU7XHJcbiAgICBpZiAoIXRoaXMuX2xhc3RLZXkgfHwgdGhpcy5fbGFzdEtleS5ncm91cElkICE9PSBjdXJyZW50S2V5Lmdyb3VwSWQpIHtcclxuICAgICAgdGhpcy5fbGFzdEtleSA9IGN1cnJlbnRLZXk7XHJcbiAgICAgIHRoaXMuc3RhcnRTdWJzY3JpcHRpb24oY3VycmVudEtleSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGFydFN1YnNjcmlwdGlvbihrZXk6IFdhcm5pbmdHcm91cEtleSkge1xyXG4gICAgdGhpcy53YXJuaW5nSXNGYXZvdXJpdGVTdWJzY3JpcHRpb24gPSB0aGlzLndhcm5pbmdTZXJ2aWNlXHJcbiAgICAgIC5nZXRJc0Zhdm91cml0ZU9ic2VydmFibGUoa2V5Lmdyb3VwSWQsIGtleS5nZW9IYXphcmQpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzRmF2b3VyaXRlID0gdmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldE9wZW4ob3BlbkFtb3VudDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzY2FsZUFtb3VudCA9IDEgKyBvcGVuQW1vdW50IC8gMi4wO1xyXG4gICAgY29uc3Qgc2NhbGUgPSBgc2NhbGUzZCgke3NjYWxlQW1vdW50fSwke3NjYWxlQW1vdW50fSwxKWA7XHJcbiAgICB0aGlzLmRvbUN0cmwud3JpdGUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKCg8YW55PnRoaXMuaW9uSWNvbikuZWwsICd0cmFuc2Zvcm0nLCBzY2FsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMud2FybmluZ0lzRmF2b3VyaXRlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMud2FybmluZ0lzRmF2b3VyaXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc0Zhdm91cml0ZSkge1xyXG4gICAgICB0aGlzLndhcm5pbmdTZXJ2aWNlXHJcbiAgICAgICAgLnJlbW92ZUZyb21GYXZvdXJpdGUodGhpcy5rZXkuZ3JvdXBJZCwgdGhpcy5rZXkuZ2VvSGF6YXJkKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMucHJlc2VudFRvYXN0KGZhbHNlKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndhcm5pbmdTZXJ2aWNlXHJcbiAgICAgICAgLmFkZFRvRmF2b3VyaXRlKHRoaXMua2V5Lmdyb3VwSWQsIHRoaXMua2V5Lmdlb0hhemFyZClcclxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLnByZXNlbnRUb2FzdCh0cnVlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcmVzZW50VG9hc3QoYWRkZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KFtcclxuICAgICAgICAnV0FSTklOR19MSVNULkFEREVEX1RPX0ZBVk9VUklURVMnLFxyXG4gICAgICAgICdXQVJOSU5HX0xJU1QuUkVNT1ZFRF9GUk9NX0ZBVk9VUklURVMnLFxyXG4gICAgICAgICdBTEVSVC5VTkRPJ1xyXG4gICAgICBdKVxyXG4gICAgICAuc3Vic2NyaWJlKGFzeW5jICh0cmFuc2xhdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvYXN0ID0gYXdhaXQgdGhpcy50b2FzdENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgICAgIG1lc3NhZ2U6IGAke3RoaXMua2V5Lmdyb3VwTmFtZX0gJHtcclxuICAgICAgICAgICAgYWRkZWRcclxuICAgICAgICAgICAgICA/IHRyYW5zbGF0aW9uWydXQVJOSU5HX0xJU1QuQURERURfVE9fRkFWT1VSSVRFUyddXHJcbiAgICAgICAgICAgICAgOiB0cmFuc2xhdGlvblsnV0FSTklOR19MSVNULlJFTU9WRURfRlJPTV9GQVZPVVJJVEVTJ11cclxuICAgICAgICAgIH1gLFxyXG4gICAgICAgICAgbW9kZTogJ21kJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiA0MDAwLFxyXG4gICAgICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25bJ0FMRVJULlVORE8nXSxcclxuICAgICAgICAgICAgICByb2xlOiAnY2FuY2VsJyxcclxuICAgICAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy53YXJuaW5nU2VydmljZS5yZW1vdmVGcm9tRmF2b3VyaXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Lmdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXkuZ2VvSGF6YXJkXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLndhcm5pbmdTZXJ2aWNlLmFkZFRvRmF2b3VyaXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Lmdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXkuZ2VvSGF6YXJkXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdG9hc3QucHJlc2VudCgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pY29uIFtuZ0NsYXNzXT1cInsnZmF2b3VyaXRlJzogaXNGYXZvdXJpdGUgfVwiIHNsb3Q9XCJpY29uLW9ubHlcIiBuYW1lPVwic3RhclwiPlxyXG48L2lvbi1pY29uPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtd2FybmluZy1saXN0LWhlYWRlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3dhcm5pbmctbGlzdC1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3dhcm5pbmctbGlzdC1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2FybmluZ0xpc3RIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc3ViVGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKSBzaG93RGF5TmFtZXM6IGJvb2xlYW47XHJcblxyXG4gIGdldCBpb3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wbGF0Zm9ybS5pcygnaW9zJyk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBnZXREYXlOYW1lKGRheXNUb0FkZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYERBWVMuU0hPUlQuJHttb21lbnQoKS5hZGQoZGF5c1RvQWRkLCAnZGF5cycpLmRheSgpfWA7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24tZ3JpZCBjbGFzcz1cImhlYWRlci1ncmlkIGlvbi1uby1wYWRkaW5nIGlvbi1uby1tYXJnaW5cIiBbbmdDbGFzc109XCJ7J2lvcyc6IGlvc31cIiAqbmdJZj1cIiFzdWJUaXRsZVwiPlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgc2l6ZT1cIjZcIiBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7IHRpdGxlIHwgdHJhbnNsYXRlIH19PC9oMz5cclxuICAgIDwvaW9uLWNvbD5cclxuICAgIDxpb24tY29sIHNpemU9XCI2XCIgY2xhc3M9XCJpb24tbm8tcGFkZGluZyBpb24tYWxpZ24tc2VsZi1lbmRcIiAqbmdJZj1cInNob3dEYXlOYW1lc1wiPlxyXG4gICAgICA8ZGl2ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGF5TmFtZXNcIj48L2Rpdj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvaW9uLWdyaWQ+XHJcbjxpb24tZ3JpZCBjbGFzcz1cImhlYWRlci1ncmlkIGlvbi1uby1tYXJnaW4gaW9uLW5vLXBhZGRpbmdcIiAqbmdJZj1cInN1YlRpdGxlXCI+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyB0aXRsZSB8IHRyYW5zbGF0ZSB9fTwvaDM+XHJcbiAgPC9pb24tcm93PlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIiBjb2xvcj1cIm1lZGl1bVwiPlxyXG4gICAgICB7eyBzdWJUaXRsZSB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24tcm93PlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2wgb2Zmc2V0PVwiNlwiIHNpemU9XCI2XCIgY2xhc3M9XCJpb24tbm8tcGFkZGluZyBpb24tYWxpZ24tc2VsZi1lbmRcIiAqbmdJZj1cInNob3dEYXlOYW1lc1wiPlxyXG4gICAgICA8ZGl2ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGF5TmFtZXNcIj48L2Rpdj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvaW9uLWdyaWQ+XHJcbjxuZy10ZW1wbGF0ZSAjZGF5TmFtZXM+XHJcbiAgPGlvbi1ncmlkIGNsYXNzPVwiZGF5TmFtZXMgaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIHt7IGdldERheU5hbWUoMCkgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIHt7IGdldERheU5hbWUoMSkgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIHt7IGdldERheU5hbWUoMikgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJb25JdGVtU2xpZGluZywgRG9tQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgV2FybmluZ0dyb3VwIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy93YXJuaW5nL3dhcm5pbmctZ3JvdXAubW9kZWwnO1xyXG5pbXBvcnQgeyBFeHRlcm5hbExpbmtTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9leHRlcm5hbC1saW5rL2V4dGVybmFsLWxpbmsuc2VydmljZSc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCwgTGFuZ0tleSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi8uLi8uLi9zZXR0aW5ncyc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXYXJuaW5nR3JvdXBGYXZvdXJpdGVUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuLi93YXJuaW5nLWdyb3VwLWZhdm91cml0ZS10b2dnbGUvd2FybmluZy1ncm91cC1mYXZvdXJpdGUtdG9nZ2xlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFuYWx5dGljU2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvYW5hbHl0aWNzL3NlcnZpY2VzL2FuYWx5dGljLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBcHBFdmVudENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9hbmFseXRpY3MvZW51bXMvYXBwLWV2ZW50LWNhdGVnb3J5LmVudW0nO1xyXG5pbXBvcnQgeyBBcHBFdmVudEFjdGlvbiB9IGZyb20gJy4uLy4uL21vZHVsZXMvYW5hbHl0aWNzL2VudW1zL2FwcC1ldmVudC1hY3Rpb24uZW51bSc7XHJcbmltcG9ydCB7IGZyb20sIG9mLCBTdWJqZWN0LCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IsIHRha2VVbnRpbCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXdhcm5pbmctbGlzdC1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vd2FybmluZy1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3dhcm5pbmctbGlzdC1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudCBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHdhcm5pbmdHcm91cDogV2FybmluZ0dyb3VwO1xyXG4gIEdlb0hhemFyZCA9IEdlb0hhemFyZDtcclxuXHJcbiAgQFZpZXdDaGlsZChJb25JdGVtU2xpZGluZywgeyBzdGF0aWM6IHRydWUgfSkgaXRlbVNsaWRlOiBJb25JdGVtU2xpZGluZztcclxuICBAVmlld0NoaWxkKFdhcm5pbmdHcm91cEZhdm91cml0ZVRvZ2dsZUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcclxuICBmYXZvdXJpdGVUb2dnbGU6IFdhcm5pbmdHcm91cEZhdm91cml0ZVRvZ2dsZUNvbXBvbmVudDtcclxuICBwcml2YXRlIGRyYWdTdWJqZWN0ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4dGVybmFsTGlua1NlcnZpY2U6IEV4dGVybmFsTGlua1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkb21DdHJsOiBEb21Db250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBhbmFseXRpY1NlcnZpY2U6IEFuYWx5dGljU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5kcmFnU3ViamVjdFxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSxcclxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5nZXRPcGVuQW1vdW50KCkpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgob3BlbkFtb3VudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSBvcGVuQW1vdW50ID4gMSA/IDEgOiBvcGVuQW1vdW50ID4gMCA/IG9wZW5BbW91bnQgOiAwO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gYHJnYmEoMTg2LDE5NiwyMDQsJHtvcGFjaXR5fSlgO1xyXG4gICAgICAgIHRoaXMuZmF2b3VyaXRlVG9nZ2xlLnNldE9wZW4ob3BhY2l0eSk7XHJcbiAgICAgICAgdGhpcy5kb21DdHJsLndyaXRlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgICAgICg8YW55PnRoaXMuaXRlbVNsaWRlKS5lbCxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InLFxyXG4gICAgICAgICAgICBjb2xvclxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIGlmICh0aGlzLml0ZW1TbGlkZSkge1xyXG4gICAgICB0aGlzLml0ZW1TbGlkZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25EcmFnKCkge1xyXG4gICAgdGhpcy5kcmFnU3ViamVjdC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9wZW5BbW91bnQoKSB7XHJcbiAgICByZXR1cm4gZnJvbSh0aGlzLml0ZW1TbGlkZS5nZXRPcGVuQW1vdW50KCkpLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YoMCkpLFxyXG4gICAgICBtYXAoKHZhbCkgPT4gKHZhbCA+IDAgPyB2YWwgLyAxMDAuMCA6IDApKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUZhdm91cml0ZSgpIHtcclxuICAgIHRoaXMuZmF2b3VyaXRlVG9nZ2xlLnRvZ2dsZSgpO1xyXG4gICAgdGltZXIoMjAwMClcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1TbGlkZSkge1xyXG4gICAgICAgICAgdGhpcy5pdGVtU2xpZGUuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaXRlbVN3aXBlZCgpIHtcclxuICAgIHRoaXMudG9nZ2xlRmF2b3VyaXRlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRVcmwoZ3JvdXA6IFdhcm5pbmdHcm91cCwgZGF5ID0gJycpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgaWYgKGdyb3VwLnVybCkge1xyXG4gICAgICByZXR1cm4gZ3JvdXAudXJsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY3VycmVudExhbmcgPSBhd2FpdCB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5sYW5ndWFnZSRcclxuICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgIC50b1Byb21pc2UoKTtcclxuICAgICAgY29uc3Qgc3VwcG9ydGVkTGFuZyA9IHRoaXMuZ2V0U3VwcG9ydGVkTGFuZ09yRmFsbGJhY2tUb0VuKGN1cnJlbnRMYW5nKTtcclxuICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPVxyXG4gICAgICAgIHNldHRpbmdzLnNlcnZpY2VzLndhcm5pbmdbR2VvSGF6YXJkW2dyb3VwLmtleS5nZW9IYXphcmRdXS53ZWJVcmxbXHJcbiAgICAgICAgICBMYW5nS2V5W3N1cHBvcnRlZExhbmddXHJcbiAgICAgICAgXTtcclxuICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgIHJldHVybiBlbmNvZGVVUkkoXHJcbiAgICAgICAgICB1cmxcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ3tyZWdpb25OYW1lfScsIGdyb3VwLmtleS5ncm91cE5hbWUpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7cmVnaW9uSWR9JywgZ3JvdXAua2V5Lmdyb3VwSWQpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7ZGF5fScsIGRheSlcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTdXBwb3J0ZWRMYW5nT3JGYWxsYmFja1RvRW4obGFuZzogTGFuZ0tleSkge1xyXG4gICAgaWYgKGxhbmcgPT09IExhbmdLZXkubmIgfHwgbGFuZyA9PT0gTGFuZ0tleS5ubikge1xyXG4gICAgICByZXR1cm4gTGFuZ0tleS5uYjtcclxuICAgIH1cclxuICAgIHJldHVybiBMYW5nS2V5LmVuO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmF2aWdhdGVUb1dlYihldmVudDogRXZlbnQsIGdyb3VwOiBXYXJuaW5nR3JvdXApIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB1cmwgPSBhd2FpdCB0aGlzLmdldFVybChncm91cCk7XHJcbiAgICBpZiAodXJsKSB7XHJcbiAgICAgIHRoaXMuYW5hbHl0aWNTZXJ2aWNlLnRyYWNrRXZlbnQoXHJcbiAgICAgICAgQXBwRXZlbnRDYXRlZ29yeS5XYXJuaW5ncyxcclxuICAgICAgICBBcHBFdmVudEFjdGlvbi5DbGljayxcclxuICAgICAgICBncm91cC5nZXRLZXlBc1N0cmluZygpXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZXh0ZXJuYWxMaW5rU2VydmljZS5vcGVuRXh0ZXJuYWxMaW5rKHVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBuYXZpZ2F0ZVRvV2ViQnlEYXkoZXZlbnQ6IEV2ZW50LCBncm91cDogV2FybmluZ0dyb3VwLCBkYXk6IG51bWJlcikge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBtb21lbnQoKVxyXG4gICAgICAuc3RhcnRPZignZGF5JylcclxuICAgICAgLmFkZChkYXksICdkYXlzJylcclxuICAgICAgLmZvcm1hdChzZXR0aW5ncy5zZXJ2aWNlcy53YXJuaW5nLmRhdGVGb3JtYXQpO1xyXG4gICAgY29uc3QgdXJsID0gYXdhaXQgdGhpcy5nZXRVcmwoZ3JvdXAsIGRhdGVTdHJpbmcpO1xyXG4gICAgaWYgKHVybCkge1xyXG4gICAgICB0aGlzLmFuYWx5dGljU2VydmljZS50cmFja0V2ZW50KFxyXG4gICAgICAgIEFwcEV2ZW50Q2F0ZWdvcnkuV2FybmluZ3MsXHJcbiAgICAgICAgQXBwRXZlbnRBY3Rpb24uQ2xpY2ssXHJcbiAgICAgICAgZ3JvdXAuZ2V0S2V5QXNTdHJpbmcoKVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmV4dGVybmFsTGlua1NlcnZpY2Uub3BlbkV4dGVybmFsTGluayh1cmwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0tc2xpZGluZyAoaW9uRHJhZyk9XCJvbkRyYWcoKVwiPlxyXG4gIDxpb24taXRlbSAqbmdJZj1cIndhcm5pbmdHcm91cC5rZXkuZ2VvSGF6YXJkICE9PSBHZW9IYXphcmQuSWNlXCIgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiIFtkZXRhaWxdPVwiZmFsc2VcIiBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxkaXYgc2xvdD1cInN0YXJ0XCIgY2xhc3M9XCJnZW8taWNvbi1jaXJjbGVcIiAoY2xpY2spPVwibmF2aWdhdGVUb1dlYigkZXZlbnQsIHdhcm5pbmdHcm91cClcIj5cclxuICAgICAgPGFwcC1nZW8taWNvbiBbZ2VvSGF6YXJkc109XCJbd2FybmluZ0dyb3VwLmtleS5nZW9IYXphcmRdXCI+PC9hcHAtZ2VvLWljb24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxpb24tbGFiZWwgKGNsaWNrKT1cIm5hdmlnYXRlVG9XZWIoJGV2ZW50LCB3YXJuaW5nR3JvdXApXCI+XHJcbiAgICAgIDxoMj57e3dhcm5pbmdHcm91cC5rZXkuZ3JvdXBOYW1lfX08L2gyPlxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgICA8aW9uLWdyaWQ+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sICpuZ0Zvcj1cImxldCBkYXkgb2YgWzAsIDEsIDJdXCI+XHJcbiAgICAgICAgICA8aW9uLWJhZGdlICpuZ0lmPVwid2FybmluZ0dyb3VwLmdldERheVdhcm5pbmcoZGF5KSBhcyB3YXJuaW5nIGVsc2UgZW1wdHlXYXJuaW5nXCJcclxuICAgICAgICAgICAgW2NvbG9yXT1cIid3YXJuaW5nbGV2ZWwtJyt3YXJuaW5nLndhcm5pbmdMZXZlbFwiIChjbGljayk9XCJuYXZpZ2F0ZVRvV2ViQnlEYXkoJGV2ZW50LCB3YXJuaW5nR3JvdXAsIGRheSlcIj5cclxuICAgICAgICAgICAge3t3YXJuaW5nLndhcm5pbmdMZXZlbCA+IDAgPyB3YXJuaW5nLndhcm5pbmdMZXZlbCA6ICc/J319XHJcbiAgICAgICAgICAgIDxpb24taWNvbiAqbmdJZj1cIndhcm5pbmcuZW1lcmdlbmN5V2FybmluZ1wiIG5hbWU9XCJhbGVydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICA8L2lvbi1iYWRnZT5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgIDwvaW9uLWdyaWQ+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gKm5nSWY9XCJ3YXJuaW5nR3JvdXAua2V5Lmdlb0hhemFyZCA9PT0gR2VvSGF6YXJkLkljZVwiIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIiBbZGV0YWlsXT1cInRydWVcIiBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxkaXYgc2xvdD1cInN0YXJ0XCIgY2xhc3M9XCJnZW8taWNvbi1jaXJjbGVcIiAoY2xpY2spPVwibmF2aWdhdGVUb1dlYigkZXZlbnQsIHdhcm5pbmdHcm91cClcIj5cclxuICAgICAgPGFwcC1nZW8taWNvbiBbZ2VvSGF6YXJkc109XCJbd2FybmluZ0dyb3VwLmtleS5nZW9IYXphcmRdXCI+PC9hcHAtZ2VvLWljb24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxpb24tbGFiZWwgKGNsaWNrKT1cIm5hdmlnYXRlVG9XZWIoJGV2ZW50LCB3YXJuaW5nR3JvdXApXCI+XHJcbiAgICAgIDxoMj57e3dhcm5pbmdHcm91cC5rZXkuZ3JvdXBOYW1lfX08L2gyPlxyXG4gICAgICA8cD5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cIndhcm5pbmdHcm91cC52YWxpZEZyb21cIj57eydXQVJOSU5HX0xJU1QuVkFMSURfRlJPTScgfCB0cmFuc2xhdGV9fToge3t3YXJuaW5nR3JvdXAudmFsaWRGcm9tIHxcclxuICAgICAgICAgIGZvcm1hdERhdGU6dHJ1ZTpmYWxzZTpmYWxzZSB8IGFzeW5jIH19PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwid2FybmluZ0dyb3VwLnZhbGlkVG9cIj4gLSB7e3dhcm5pbmdHcm91cC52YWxpZFRvIHwgZm9ybWF0RGF0ZTp0cnVlOmZhbHNlOmZhbHNlIHwgYXN5bmN9fTwvc3Bhbj5cclxuICAgICAgPC9wPlxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0tb3B0aW9ucyBzaWRlPVwiZW5kXCIgKGlvblN3aXBlKT1cIml0ZW1Td2lwZWQoKVwiPlxyXG4gICAgPGlvbi1pdGVtLW9wdGlvbiBleHBhbmRhYmxlPVwidHJ1ZVwiIChjbGljayk9XCJ0b2dnbGVGYXZvdXJpdGUoKVwiPlxyXG4gICAgICA8YXBwLXdhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZSBba2V5XT1cIndhcm5pbmdHcm91cC5rZXlcIj5cclxuICAgICAgPC9hcHAtd2FybmluZy1ncm91cC1mYXZvdXJpdGUtdG9nZ2xlPlxyXG4gICAgPC9pb24taXRlbS1vcHRpb24+XHJcbiAgPC9pb24taXRlbS1vcHRpb25zPlxyXG48L2lvbi1pdGVtLXNsaWRpbmc+XHJcbjxuZy10ZW1wbGF0ZSAjZW1wdHlXYXJuaW5nPlxyXG4gIDxpb24tYmFkZ2UgY29sb3I9XCJ3YXJuaW5nbGV2ZWwtMFwiPj88L2lvbi1iYWRnZT5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBNYXBJdGVtIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21hcC1pdGVtLm1vZGVsJztcclxuaW1wb3J0IHsgUmVnb2JzR2VvSGF6YXJkTWFya2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vbW9kdWxlcy9tYXAvY29yZS9jbGFzc2VzL3JlZ29icy1nZW9oYXphcmQtbWFya2VyJztcclxuZXhwb3J0IGNsYXNzIE1hcEl0ZW1NYXJrZXIgZXh0ZW5kcyBMLk1hcmtlciB7XHJcbiAgcHJpdmF0ZSBfaXRlbTogTWFwSXRlbTtcclxuICBwcml2YXRlIF9pc1NlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICBnZXQgaXRlbSgpOiBNYXBJdGVtIHtcclxuICAgIHJldHVybiB7IC4uLnRoaXMuX2l0ZW0gfTtcclxuICB9XHJcblxyXG4gIGdldCBpZCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2l0ZW0uUmVnSWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoaXRlbTogTWFwSXRlbSwgbGF0bG5nOiBMLkxhdExuZywgb3B0aW9uczogTC5NYXJrZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihsYXRsbmcsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5faXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLnVwZGF0ZUljb24oKTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICB0aGlzLnVwZGF0ZUljb24oKTtcclxuICB9XHJcblxyXG4gIGRlc2VsZWN0KCkge1xyXG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy51cGRhdGVJY29uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUljb24oKSB7XHJcbiAgICB0aGlzLnNldEljb24oXHJcbiAgICAgIG5ldyBSZWdvYnNHZW9IYXphcmRNYXJrZXIodGhpcy5faXRlbS5HZW9IYXphcmRUSUQsIHRoaXMuX2lzU2VsZWN0ZWQpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBSb3V0ZXIsXHJcbiAgTmF2aWdhdGlvbkVuZCxcclxuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gIEFjdGl2YXRlZFJvdXRlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3ViamVjdCwgZnJvbSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwsIGZpbHRlciwgdGFwLCBtYXAsIGNvbmNhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm91dGVyUGFnZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIG5nVW5zdWJzY3JpYmU6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xyXG4gIHByaXZhdGUgaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHJvdXRlci5ldmVudHNcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdVbnN1YnNjcmliZSksXHJcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcclxuICAgICAgICBjb25jYXRNYXAoKCkgPT4gZnJvbShQcm9taXNlLnJlc29sdmUodGhpcy5kZXRlY3RFbnRlck9yTGVhdmUoKSkpKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNDb21wb25lbnRBY3RpdmUoXHJcbiAgICBwYXRoOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90W10sXHJcbiAgICBjb21wb25lbnQ6IGFueVxyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICBwYXRoLmZvckVhY2goKHNzOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSA9PiB7XHJcbiAgICAgIGlmIChzcy5jb21wb25lbnQgPT09IGNvbXBvbmVudCkge1xyXG4gICAgICAgIGlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpc0FjdGl2ZSA9IHRoaXMuaXNDb21wb25lbnRBY3RpdmUoc3MuY2hpbGRyZW4sIGNvbXBvbmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGlzQWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBkZXRlY3RFbnRlck9yTGVhdmUoKSB7XHJcbiAgICBjb25zdCBpc0FjdGl2ZU5vdyA9IHRoaXMuaXNDb21wb25lbnRBY3RpdmUoXHJcbiAgICAgIHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnJvb3QucGF0aEZyb21Sb290LFxyXG4gICAgICB0aGlzLnJvdXRlLnNuYXBzaG90LmNvbXBvbmVudFxyXG4gICAgKTtcclxuICAgIGlmICghdGhpcy5pc0FjdGl2ZSAmJiBpc0FjdGl2ZU5vdykge1xyXG4gICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgYXdhaXQgdGhpcy5vbkVudGVyKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNBY3RpdmUgJiYgIWlzQWN0aXZlTm93KSB7XHJcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgYXdhaXQgdGhpcy5vbkxlYXZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhYnN0cmFjdCBvbkVudGVyKCk6IHZvaWQgfCBQcm9taXNlPHVua25vd24+O1xyXG4gIGFic3RyYWN0IG9uTGVhdmUoKTogdm9pZCB8IFByb21pc2U8dW5rbm93bj47XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdVbnN1YnNjcmliZS5uZXh0KCk7XHJcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIsIFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5jb25zdCBBTExPV19BTkFMWVRJQ1NfSEVBREVSID0gJ1NFVFRJTkdTLkFMTE9XX0FOQUxZVElDU19IRUFERVInO1xyXG5jb25zdCBBTExPV19BTkFMWVRJQ1NfREVTQ1JJUFRJT04gPSAnU0VUVElOR1MuQUxMT1dfQU5BTFlUSUNTX0RFU0NSSVBUSU9OJztcclxuY29uc3QgQUxMT1dfQU5BTFlUSUNTX0RFU0NSSVBUSU9OX0xJTkVfMiA9XHJcbiAgJ1NFVFRJTkdTLkFMTE9XX0FOQUxZVElDU19ERVNDUklQVElPTl9MSU5FMic7XHJcbmNvbnN0IFJFQURfTU9SRV9URVhUID0gJ1NFVFRJTkdTLlJFQURfTU9SRV9JTl9MSUNFTlNFX0FHUkVFTUVOVCc7XHJcbmNvbnN0IE9LID0gJ0FMRVJULkZJTkUnO1xyXG5jb25zdCBOT19USEFOS1MgPSAnQUxFUlQuTk9fVEhBTktTJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVzYWdlQW5hbHl0aWNzQ29uc2VudFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY2hlY2tVc2VyRGF0YUNvbnNlbnREaWFsb2coKSB7XHJcbiAgICBjb25zdCB1c2VyU2V0dGluZ3MgPSBhd2FpdCB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS51c2VyU2V0dGluZyRcclxuICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgaWYgKCF1c2VyU2V0dGluZ3MuY29uc2VudEZvclNlbmRpbmdBbmFseXRpY3NEaWFsb2dDb21wbGV0ZWQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5zaG93Q29uc2VudEZvclNlbmRpbmdBbmFseXRpY3NEaWFsb2coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNob3dDb25zZW50Rm9yU2VuZGluZ0FuYWx5dGljc0RpYWxvZygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgICAuZ2V0KFtcclxuICAgICAgICAgIEFMTE9XX0FOQUxZVElDU19IRUFERVIsXHJcbiAgICAgICAgICBBTExPV19BTkFMWVRJQ1NfREVTQ1JJUFRJT04sXHJcbiAgICAgICAgICBBTExPV19BTkFMWVRJQ1NfREVTQ1JJUFRJT05fTElORV8yLFxyXG4gICAgICAgICAgUkVBRF9NT1JFX1RFWFQsXHJcbiAgICAgICAgICBPSyxcclxuICAgICAgICAgIE5PX1RIQU5LU1xyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICBjb25zdCBjc3NDbGFzcyA9IHRoaXMucGxhdGZvcm0uaXMoJ2lvcycpXHJcbiAgICAgICAgPyBbJ25vcm1hbC13ZWlnaHQnLCAnZnVsbC13aWR0aCddXHJcbiAgICAgICAgOiBbXTtcclxuICAgICAgY29uc3QgYnV0dG9uT0sgPSB7XHJcbiAgICAgICAgY3NzQ2xhc3MsXHJcbiAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zW09LXSxcclxuICAgICAgICBoYW5kbGVyOiAoKSA9PiB0aGlzLnNhdmVTZXR0aW5ncyh0cnVlKS50aGVuKCgpID0+IHJlc29sdmUoKSlcclxuICAgICAgfTtcclxuICAgICAgY29uc3QgYnV0dG9uTm8gPSB7XHJcbiAgICAgICAgY3NzQ2xhc3MsXHJcbiAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zW05PX1RIQU5LU10sXHJcbiAgICAgICAgaGFuZGxlcjogKCkgPT4gdGhpcy5zYXZlU2V0dGluZ3MoZmFsc2UpLnRoZW4oKCkgPT4gcmVzb2x2ZSgpKVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBidXR0b25zID0gdGhpcy5wbGF0Zm9ybS5pcygnaW9zJylcclxuICAgICAgICA/IFtidXR0b25PSywgYnV0dG9uTm9dXHJcbiAgICAgICAgOiBbYnV0dG9uTm8sIGJ1dHRvbk9LXTtcclxuICAgICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIGhlYWRlcjogdHJhbnNsYXRpb25zW0FMTE9XX0FOQUxZVElDU19IRUFERVJdLFxyXG4gICAgICAgIG1lc3NhZ2U6IGAke3RyYW5zbGF0aW9uc1tBTExPV19BTkFMWVRJQ1NfREVTQ1JJUFRJT05dfTxiciAvPjxiciAvPiR7dHJhbnNsYXRpb25zW0FMTE9XX0FOQUxZVElDU19ERVNDUklQVElPTl9MSU5FXzJdfTxiciAvPjxiciAvPiR7dHJhbnNsYXRpb25zW1JFQURfTU9SRV9URVhUXX1gLFxyXG4gICAgICAgIGJ1dHRvbnMsXHJcbiAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiBmYWxzZSAvLyBQcmV2ZW50IGZyb20gY2xvc2luZyB3aXRob3V0IGNob29zaW5nXHJcbiAgICAgIH0pO1xyXG4gICAgICBhd2FpdCBhbGVydC5wcmVzZW50KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmVTZXR0aW5ncyhhY2NlcHRlZDogYm9vbGVhbikge1xyXG4gICAgY29uc3QgY3VycmVudFNldHRpbmdzID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnNhdmVVc2VyU2V0dGluZ3Moe1xyXG4gICAgICAuLi5jdXJyZW50U2V0dGluZ3MsXHJcbiAgICAgIGNvbnNlbnRGb3JTZW5kaW5nQW5hbHl0aWNzOiBhY2NlcHRlZCxcclxuICAgICAgY29uc2VudEZvclNlbmRpbmdBbmFseXRpY3NEaWFsb2dDb21wbGV0ZWQ6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJRGF0YUxvYWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvZGF0YS1sb2FkLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEYXRhTG9hZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLWxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1sb2FkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGF0YS1sb2FkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9kYXRhLWxvYWQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YUxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICBkYXRhTG9hZDogSURhdGFMb2FkW10gPSBbXTtcclxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBnZXQgaXNMb2FkaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YUxvYWQubGVuZ3RoID4gMDtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBpZHM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2ltcGxlOiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkYXRhTG9hZFNlcnZpY2U6IERhdGFMb2FkU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHt9XHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBpZHMgPSBjaGFuZ2VzLmlkcy5jdXJyZW50VmFsdWUgYXMgc3RyaW5nW107XHJcbiAgICBpZiAoaWRzICYmIGlkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChcclxuICAgICAgICBpZHMubWFwKChpZCkgPT4gdGhpcy5kYXRhTG9hZFNlcnZpY2UuZ2V0U3RhdGVBc09ic2VydmFibGUoaWQpKVxyXG4gICAgICApXHJcbiAgICAgICAgLnBpcGUobWFwKCh2YWwpID0+IHZhbC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaXNMb2FkaW5nKSkpXHJcbiAgICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFMb2FkID0gdmFsO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiZGF0YS1sb2FkIGFuaW1hdGVkXCIgW25nQ2xhc3NdPVwieydmYWRlSW4nOiBpc0xvYWRpbmcsICdmYWRlT3V0JzogIWlzTG9hZGluZ31cIj5cclxuICA8aW9uLWdyaWQgKm5nSWY9XCIhc2ltcGxlXCI+XHJcbiAgICA8aW9uLXJvdyAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhTG9hZFwiPlxyXG4gICAgICA8aW9uLWNvbD5cclxuICAgICAgICA8aW9uLWxhYmVsPnt7ICdEQVRBX0xPQUQuTE9BRElORycgfCB0cmFuc2xhdGUgfX0ge3sgKGl0ZW0ucHJvZ3Jlc3MgKiAxMDApIHwgbnVtYmVyOiAnLjEnIH19ICU8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbiAgPGlvbi1zcGlubmVyICpuZ0lmPVwic2ltcGxlXCI+PC9pb24tc3Bpbm5lcj5cclxuPC9kaXY+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRGF0YUxvYWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YS1sb2FkL2RhdGEtbG9hZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElvbmljTW9kdWxlLCBUcmFuc2xhdGVNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0RhdGFMb2FkQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbRGF0YUxvYWRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhTG9hZE1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uLy4uLy4uLy4uL3NldHRpbmdzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMZWFmbGV0Q2x1c3RlckhlbHBlciB7XHJcbiAgc3RhdGljIGNyZWF0ZU1hcmtlckNsdXN0ZXJHcm91cChvcHRpb25zPzogTC5NYXJrZXJDbHVzdGVyR3JvdXBPcHRpb25zKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgc3BpZGVyZnlPbk1heFpvb206IHRydWUsXHJcbiAgICAgIHNob3dDb3ZlcmFnZU9uSG92ZXI6IGZhbHNlLFxyXG4gICAgICB6b29tVG9Cb3VuZHNPbkNsaWNrOiB0cnVlLFxyXG4gICAgICBtYXhDbHVzdGVyUmFkaXVzOiBzZXR0aW5ncy5tYXAubWF4Q2x1c3RlclJhZGl1cyxcclxuICAgICAgaWNvbkNyZWF0ZUZ1bmN0aW9uOiBMZWFmbGV0Q2x1c3RlckhlbHBlci5jcmVhdGVDbHVzdGVySWNvblxyXG4gICAgfTtcclxuICAgIHJldHVybiBMLm1hcmtlckNsdXN0ZXJHcm91cCh7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi4ob3B0aW9ucyB8fCB7fSkgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlQ2x1c3Rlckljb24oY2x1c3RlcjogTC5NYXJrZXJDbHVzdGVyKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSBjbHVzdGVyLmdldEFsbENoaWxkTWFya2VycygpLmxlbmd0aDtcclxuICAgIGNvbnN0IHNpemUgPSBsZW5ndGggPCAxMDAgPyAzNSA6IGxlbmd0aCA8IDEwMDAgPyA1MCA6IDcwO1xyXG4gICAgcmV0dXJuIEwuZGl2SWNvbih7XHJcbiAgICAgIGh0bWw6ICc8ZGl2PicgKyBsZW5ndGggKyAnPC9kaXY+JyxcclxuICAgICAgaWNvblNpemU6IFtzaXplLCBzaXplXSxcclxuICAgICAgaWNvbkFuY2hvcjogW3NpemUgLyAyLjAsIHNpemUgLyAyLjBdLFxyXG4gICAgICBjbGFzc05hbWU6ICdjaXJjbGUtbWFya2VyLWNsdXN0ZXInXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSG9tZVBhZ2UgfSBmcm9tICcuL2hvbWUucGFnZSc7XHJcbmltcG9ydCB7IE1hcEl0ZW1CYXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1pdGVtLWJhci9tYXAtaXRlbS1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IERhdGFMb2FkTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kYXRhLWxvYWQvZGF0YS1sb2FkLm1vZHVsZSc7XHJcbmltcG9ydCB7IE1hcE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvbWFwL21hcC5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgY29tcG9uZW50OiBIb21lUGFnZVxyXG4gICAgICB9XHJcbiAgICBdKSxcclxuICAgIFNoYXJlZE1vZHVsZSxcclxuICAgIERhdGFMb2FkTW9kdWxlLFxyXG4gICAgTWFwTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtIb21lUGFnZSwgTWFwSXRlbUJhckNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIE5nWm9uZSwgQWZ0ZXJWaWV3Q2hlY2tlZCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCAnbGVhZmxldC5tYXJrZXJjbHVzdGVyJztcclxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgcmFjZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL29ic2VydmF0aW9uL29ic2VydmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBJdGVtQmFyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtaXRlbS1iYXIvbWFwLWl0ZW0tYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcEl0ZW1NYXJrZXIgfSBmcm9tICcuLi8uLi9jb3JlL2hlbHBlcnMvbGVhZmxldC9tYXAtaXRlbS1tYXJrZXIvbWFwLWl0ZW0tbWFya2VyJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tb2R1bGVzL21hcC9jb21wb25lbnRzL21hcC9tYXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVmlld01vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBGdWxsc2NyZWVuU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZnVsbHNjcmVlbi9mdWxsc2NyZWVuLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGVhZmxldENsdXN0ZXJIZWxwZXIgfSBmcm9tICcuLi8uLi9tb2R1bGVzL21hcC9oZWxwZXJzL2xlYWZsZXQtY2x1c2VyLmhlbHBlcic7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQge1xyXG4gIG1hcCxcclxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcclxuICB0YWtlVW50aWwsXHJcbiAgdGFrZSxcclxuICBkZWJvdW5jZVRpbWVcclxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBVc2FnZUFuYWx5dGljc0NvbnNlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2FnZS1hbmFseXRpY3MtY29uc2VudC91c2FnZS1hbmFseXRpY3MtY29uc2VudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyUGFnZSB9IGZyb20gJy4uLy4uL2NvcmUvaGVscGVycy9yb3V0ZWQtcGFnZSc7XHJcbmltcG9ydCB7IGVudGVyWm9uZSB9IGZyb20gJy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcbmltcG9ydCB7IE1hcENlbnRlckluZm9Db21wb25lbnQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvbWFwL2NvbXBvbmVudHMvbWFwLWNlbnRlci1pbmZvL21hcC1jZW50ZXItaW5mby5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnSG9tZVBhZ2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtaG9tZScsXHJcbiAgdGVtcGxhdGVVcmw6ICdob21lLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ2hvbWUucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgUm91dGVyUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XHJcbiAgQFZpZXdDaGlsZChNYXBJdGVtQmFyQ29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KSBtYXBJdGVtQmFyOiBNYXBJdGVtQmFyQ29tcG9uZW50O1xyXG4gIEBWaWV3Q2hpbGQoTWFwQ29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KSBtYXBDb21wb25lbnQ6IE1hcENvbXBvbmVudDtcclxuICBwcml2YXRlIG1hcDogTC5NYXA7XHJcbiAgcHJpdmF0ZSBtYXJrZXJMYXllciA9IExlYWZsZXRDbHVzdGVySGVscGVyLmNyZWF0ZU1hcmtlckNsdXN0ZXJHcm91cCh7XHJcbiAgICBzcGlkZXJmeU9uTWF4Wm9vbTogZmFsc2UsXHJcbiAgICB6b29tVG9Cb3VuZHNPbkNsaWNrOiBmYWxzZVxyXG4gIH0pO1xyXG4gIHByaXZhdGUgZ2VvQ29hY2hNYXJrc0Nsb3NlZFN1YmplY3QgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBmdWxsc2NyZWVuJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuICBzZWxlY3RlZE1hcmtlcjogTWFwSXRlbU1hcmtlcjtcclxuICBzaG93R2VvU2VsZWN0SW5mbyA9IGZhbHNlO1xyXG4gIGRhdGFMb2FkSWRzJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XHJcblxyXG4gIEBWaWV3Q2hpbGQoTWFwQ2VudGVySW5mb0NvbXBvbmVudCkgbWFwQ2VudGVyOiBNYXBDZW50ZXJJbmZvQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgbWFwQ2VudGVySW5mb0hlaWdodCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICByb3V0ZXI6IFJvdXRlcixcclxuICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgb2JzZXJ2YXRpb25TZXJ2aWNlOiBPYnNlcnZhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZ1bGxzY3JlZW5TZXJ2aWNlOiBGdWxsc2NyZWVuU2VydmljZSxcclxuICAgIHB1YmxpYyB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNhZ2VBbmFseXRpY3NDb25zZW50U2VydmljZTogVXNhZ2VBbmFseXRpY3NDb25zZW50U2VydmljZSxcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XHJcbiAgKSB7XHJcbiAgICBzdXBlcihyb3V0ZXIsIHJvdXRlKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgZ2xvYmFsIGNzcyBwcm9wZXJ0eSBjb250YWluaW5nIGluZm8gYm94IGhlaWdodCB3aGVuIGhlaWdodCBjaGFuZ2VzLlxyXG4gICAgLy8gVGhpcyBpcyB1c2VkIHRvIHBvc2l0aW9uIG1hcCBzY2FsZSBhYm92ZSBtYXAgY2VudGVyIGluZm8gYm94LlxyXG4gICAgdGhpcy5tYXBDZW50ZXJJbmZvSGVpZ2h0LnBpcGUoXHJcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgIGRlYm91bmNlVGltZSg1MDApLFxyXG4gICAgICB0YWtlVW50aWwodGhpcy5uZ1Vuc3Vic2NyaWJlKVxyXG4gICAgKS5zdWJzY3JpYmUoKG5ld0luZm9Cb3hIZWlnaHQpID0+IHtcclxuICAgICAgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tbWFwLWNlbnRlci1pbmZvLWhlaWdodCcsIGAke25ld0luZm9Cb3hIZWlnaHR9cHhgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGVJbmZvQm94SGVpZ2h0KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZnVsbHNjcmVlbiQgPSB0aGlzLmZ1bGxzY3JlZW5TZXJ2aWNlLmlzRnVsbHNjcmVlbiQ7XHJcbiAgICB0aGlzLmRhdGFMb2FkSWRzJCA9IHRoaXMub2JzZXJ2YXRpb25TZXJ2aWNlLmRhdGFMb2FkJC5waXBlKFxyXG4gICAgICBtYXAoKHZhbCkgPT4gW3ZhbF0pLFxyXG4gICAgICBlbnRlclpvbmUodGhpcy5uZ1pvbmUpXHJcbiAgICApO1xyXG4gICAgdGhpcy5jaGVja0ZvckZpcnN0U3RhcnR1cCgpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tGb3JGaXJzdFN0YXJ0dXAoKSB7XHJcbiAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS51c2VyU2V0dGluZyRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCh1cykgPT4gdXMuc2hvd0dlb1NlbGVjdEluZm8pLFxyXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgdGFrZVVudGlsKHJhY2UodGhpcy5uZ1Vuc3Vic2NyaWJlLCB0aGlzLmdlb0NvYWNoTWFya3NDbG9zZWRTdWJqZWN0KSksXHJcbiAgICAgICAgZW50ZXJab25lKHRoaXMubmdab25lKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHNob3dHZW9TZWxlY3RJbmZvKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93R2VvU2VsZWN0SW5mbyA9IHNob3dHZW9TZWxlY3RJbmZvO1xyXG4gICAgICAgIGlmICghc2hvd0dlb1NlbGVjdEluZm8pIHtcclxuICAgICAgICAgIHRoaXMuZ2VvQ29hY2hNYXJrc0Nsb3NlZFN1YmplY3QubmV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5nZW9Db2FjaE1hcmtzQ2xvc2VkU3ViamVjdC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgdGhpcy5zaG93VXNhZ2VBbmFseXRpY3NEaWFsb2coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2hvd1VzYWdlQW5hbHl0aWNzRGlhbG9nKCkge1xyXG4gICAgYXdhaXQgdGhpcy51c2FnZUFuYWx5dGljc0NvbnNlbnRTZXJ2aWNlLmNoZWNrVXNlckRhdGFDb25zZW50RGlhbG9nKCk7XHJcbiAgICB0aGlzLm1hcENvbXBvbmVudC5jb21wb25lbnRJc0FjdGl2ZSh0cnVlKTtcclxuICB9XHJcblxyXG4gIG9uTWFwUmVhZHkobGVhZmxldE1hcDogTC5NYXApIHtcclxuICAgIHRoaXMubWFwID0gbGVhZmxldE1hcDtcclxuICAgIHRoaXMubWFya2VyTGF5ZXIuYWRkVG8odGhpcy5tYXApO1xyXG4gICAgdGhpcy5tYXJrZXJMYXllci5vbignY2x1c3RlcmNsaWNrJywgKGE6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBncm91cExhdExuZzogTC5MYXRMbmcgPSBhLmxhdGxuZztcclxuICAgICAgY29uc3QgY3VycmVudFpvb20gPSB0aGlzLm1hcC5nZXRab29tKCk7XHJcbiAgICAgIGNvbnN0IG5ld1pvb20gPSBjdXJyZW50Wm9vbSArIDI7XHJcbiAgICAgIGlmIChuZXdab29tID49IHNldHRpbmdzLm1hcC50aWxlcy5tYXhab29tKSB7XHJcbiAgICAgICAgYS5sYXllci5zcGlkZXJmeSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubWFwLnNldFZpZXcoXHJcbiAgICAgICAgICBncm91cExhdExuZyxcclxuICAgICAgICAgIE1hdGgubWluKG5ld1pvb20sIHNldHRpbmdzLm1hcC50aWxlcy5tYXhab29tKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5tYXAub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZE1hcmtlcikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNYXJrZXIuZGVzZWxlY3QoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjdGVkTWFya2VyID0gbnVsbDtcclxuICAgICAgdGhpcy5tYXBJdGVtQmFyLmhpZGUoKTtcclxuICAgIH0pO1xyXG4gICAgLy8gVE9ETzogTW92ZSB0aGlzIHRvIGN1c3RvbSBtYXJrZXIgbGF5ZXI/XHJcbiAgICBjb25zdCBvYnNlcnZhdGlvbk9ic2VydmFibGUgPSBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgdGhpcy5vYnNlcnZhdGlvblNlcnZpY2Uub2JzZXJ2YXRpb25zJCxcclxuICAgICAgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2Uuc2hvd09ic2VydmF0aW9ucyRcclxuICAgIF0pO1xyXG4gICAgb2JzZXJ2YXRpb25PYnNlcnZhYmxlXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nVW5zdWJzY3JpYmUpKVxyXG4gICAgICAuc3Vic2NyaWJlKChbcmVnT2JzZXJ2YXRpb25zLCBzaG93T2JzZXJ2YXRpb25zXSkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVkcmF3T2JzZXJ2YXRpb25NYXJrZXJzKHNob3dPYnNlcnZhdGlvbnMgPyByZWdPYnNlcnZhdGlvbnMgOiBbXSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25FbnRlcigpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ0hvbWUgcGFnZSBpb25WaWV3RGlkRW50ZXIuJywgREVCVUdfVEFHKTtcclxuICAgIGNvbnN0IHVzZXJTZXR0aW5ncyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICBpZiAodXNlclNldHRpbmdzLnNob3dHZW9TZWxlY3RJbmZvKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoXHJcbiAgICAgICAgJ0Rpc3BsYXkgY29hY2htYXJrcywgd2FpdCB3aXRoIHN0YXJ0aW5nIGdlb3Bvc3Rpb24nLFxyXG4gICAgICAgIERFQlVHX1RBR1xyXG4gICAgICApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKFxyXG4gICAgICAnQWN0aXZhdGUgbWFwIHVwZGF0ZXMgYW5kIEdlb0xvY2F0aW9uJyxcclxuICAgICAgREVCVUdfVEFHXHJcbiAgICApO1xyXG4gICAgdGhpcy5tYXBDb21wb25lbnQuY29tcG9uZW50SXNBY3RpdmUodHJ1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZUluZm9Cb3hIZWlnaHQoKTtcclxuICB9XHJcblxyXG4gIG9uTGVhdmUoKSB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKFxyXG4gICAgICAnSG9tZSBwYWdlIG9uTGVhdmUuIERpc2FibGUgbWFwIHVwZGF0ZXMgYW5kIEdlb0xvY2F0aW9uJyxcclxuICAgICAgREVCVUdfVEFHXHJcbiAgICApO1xyXG4gICAgdGhpcy5tYXBDb21wb25lbnQuY29tcG9uZW50SXNBY3RpdmUoZmFsc2UpO1xyXG5cclxuICAgIC8vIEFzIHdlIGxlYXZlIHRoZSBwYWdlLCBtYXAgY2VudGVyIGluZm8gaXMgbm90IHZpc2libGUgYW55IG1vcmUsIHJlc2V0IGhlaWdodFxyXG4gICAgdGhpcy5tYXBDZW50ZXJJbmZvSGVpZ2h0Lm5leHQoMCk7XHJcbiAgfVxyXG5cclxuICAvLyBhc3luYyBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgLy8gVXNlIHRhYiBwYWdlIHdvcmthcm91bmQgZnJvbTpcclxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vaW9uaWMtdGVhbS9pb25pYy9pc3N1ZXMvMTUyNjBcclxuICAvLyB9XHJcblxyXG4gIC8vIGlvblZpZXdXaWxsTGVhdmUoKSB7XHJcbiAgLy8gICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKGBIb21lIHBhZ2UgaW9uVmlld1dpbGxMZWF2ZS4gRGlzYWJsZSBtYXAgdXBkYXRlcyBhbmQgR2VvTG9jYXRpb24uYCwgREVCVUdfVEFHKTtcclxuICAvLyAgIHRoaXMubWFwQ29tcG9uZW50LnN0b3BHZW9Qb3NpdGlvblVwZGF0ZXMoKTtcclxuICAvLyB9XHJcblxyXG4gIHByaXZhdGUgcmVkcmF3T2JzZXJ2YXRpb25NYXJrZXJzKHJlZ09ic2VydmF0aW9uczogUmVnaXN0cmF0aW9uVmlld01vZGVsW10pIHtcclxuICAgIHRoaXMubWFya2VyTGF5ZXIuY2xlYXJMYXllcnMoKTtcclxuICAgIGZvciAoY29uc3QgcmVnT2JzZXJ2YXRpb24gb2YgcmVnT2JzZXJ2YXRpb25zKSB7XHJcbiAgICAgIGNvbnN0IGxhdExuZyA9IEwubGF0TG5nKFxyXG4gICAgICAgIHJlZ09ic2VydmF0aW9uLk9ic0xvY2F0aW9uLkxhdGl0dWRlLFxyXG4gICAgICAgIHJlZ09ic2VydmF0aW9uLk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBtYXJrZXIgPSBuZXcgTWFwSXRlbU1hcmtlcihyZWdPYnNlcnZhdGlvbiwgbGF0TG5nLCB7fSk7XHJcbiAgICAgIG1hcmtlci5vbignY2xpY2snLCAoZXZlbnQ6IEwuTGVhZmxldEV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbTogTWFwSXRlbU1hcmtlciA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE1hcmtlcikge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZE1hcmtlci5kZXNlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1hcmtlciA9IG07XHJcbiAgICAgICAgbS5zZXRTZWxlY3RlZCgpO1xyXG4gICAgICAgIHRoaXMubWFwSXRlbUJhci5zaG93KG0uaXRlbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBtYXJrZXIuYWRkVG8odGhpcy5tYXJrZXJMYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUluZm9Cb3hIZWlnaHQoKSB7XHJcbiAgICBjb25zdCBtYXBDZW50ZXJFbGVtZW50ID0gdGhpcy5tYXBDZW50ZXI/Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBpZiAobWFwQ2VudGVyRWxlbWVudCkge1xyXG4gICAgICBjb25zdCBoZWlnaHQgPSBtYXBDZW50ZXJFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgdGhpcy5tYXBDZW50ZXJJbmZvSGVpZ2h0Lm5leHQoaGVpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWFwQ2VudGVySW5mb0hlaWdodC5uZXh0KDApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8YXBwLWhlYWRlciB0aXRsZT1cIlZhcnNvbSBSZWdvYnNcIiBbZnVsbHNjcmVlblN1cHBvcnRdPVwidHJ1ZVwiPjwvYXBwLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIFxyXG4gIDxhcHAtbWFwIFxyXG4gICAgKG1hcFJlYWR5KT1cIm9uTWFwUmVhZHkoJGV2ZW50KVwiXHJcbiAgICBbYXV0b0FjdGl2YXRlXT1cImZhbHNlXCJcclxuICAgIFtnZW9UYWddPVwiJ0hvbWVQYWdlJ1wiXHJcbiAgPjwvYXBwLW1hcD5cclxuXHJcbiAgPGFwcC1tYXAtY2VudGVyLWluZm9cclxuICAgICpuZ0lmPVwidXNlclNldHRpbmdTZXJ2aWNlLnNob3dNYXBDZW50ZXIkIHwgYXN5bmNcIlxyXG4gID48L2FwcC1tYXAtY2VudGVyLWluZm8+XHJcbiAgXHJcbiAgPGFwcC1tYXAtaXRlbS1iYXI+PC9hcHAtbWFwLWl0ZW0tYmFyPlxyXG4gIFxyXG4gIDxhcHAtZ2VvLWZhYiBzbG90PVwiZml4ZWRcIiAqbmdJZj1cInNob3dHZW9TZWxlY3RJbmZvID09PSBmYWxzZVwiPjwvYXBwLWdlby1mYWI+XHJcbiAgXHJcbiAgPGFwcC1hZGQtbWVudT48L2FwcC1hZGQtbWVudT5cclxuICBcclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YUxvYWRJZHMkIHwgYXN5bmMgYXMgZGF0YUxvYWRJZHNcIj5cclxuICAgIDxhcHAtZGF0YS1sb2FkIFtpZHNdPVwiZGF0YUxvYWRJZHNcIiBzaW1wbGU9XCJ0cnVlXCI+PC9hcHAtZGF0YS1sb2FkPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRhYnNQYWdlUm91dGluZ01vZHVsZSB9IGZyb20gJy4vdGFicy5yb3V0ZXIubW9kdWxlJztcclxuaW1wb3J0IHsgVGFic1BhZ2UgfSBmcm9tICcuL3RhYnMucGFnZSc7XHJcbmltcG9ydCB7IEhvbWVQYWdlTW9kdWxlIH0gZnJvbSAnLi4vaG9tZS9ob21lLm1vZHVsZSc7XHJcbmltcG9ydCB7IFRyaXBQYWdlTW9kdWxlIH0gZnJvbSAnLi4vdHJpcC90cmlwLm1vZHVsZSc7XHJcbmltcG9ydCB7IFdhcm5pbmdMaXN0UGFnZU1vZHVsZSB9IGZyb20gJy4uL3dhcm5pbmctbGlzdC93YXJuaW5nLWxpc3QubW9kdWxlJztcclxuaW1wb3J0IHsgT2JzZXJ2YXRpb25MaXN0UGFnZU1vZHVsZSB9IGZyb20gJy4uL29ic2VydmF0aW9uLWxpc3Qvb2JzZXJ2YXRpb24tbGlzdC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuaW1wb3J0IHsgQ29hY2hNYXJrc0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29hY2gtbWFya3MvY29hY2gtbWFya3MuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgVGFic1BhZ2VSb3V0aW5nTW9kdWxlLFxyXG4gICAgSG9tZVBhZ2VNb2R1bGUsXHJcbiAgICBUcmlwUGFnZU1vZHVsZSxcclxuICAgIFdhcm5pbmdMaXN0UGFnZU1vZHVsZSxcclxuICAgIE9ic2VydmF0aW9uTGlzdFBhZ2VNb2R1bGUsXHJcbiAgICBTaGFyZWRNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1RhYnNQYWdlLCBDb2FjaE1hcmtzQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFic1BhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgV2FybmluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3dhcm5pbmcvd2FybmluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBGdWxsc2NyZWVuU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZnVsbHNjcmVlbi9mdWxsc2NyZWVuLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXRhYnMnLFxyXG4gIHRlbXBsYXRlVXJsOiAndGFicy5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWyd0YWJzLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJzUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHdhcm5pbmdHcm91cEluTWFwVmlld1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgY3VycmVudEdlb0hhemFyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICB3YXJuaW5nc0luVmlldzoge1xyXG4gICAgY291bnQ6IG51bWJlcjtcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIG1heFdhcm5pbmc6IG51bWJlcjtcclxuICAgIGhhc0VtZXJnZW5jeVdhcm5pbmc6IGJvb2xlYW47XHJcbiAgfTtcclxuICBpc0lvczogYm9vbGVhbjtcclxuICBpc0FuZHJvaWQ6IGJvb2xlYW47XHJcbiAgZnVsbHNjcmVlbiQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XHJcbiAgc2hvd1RyaXBzID0gZmFsc2U7XHJcblxyXG4gIGdldCBzaG93QmFkZ2UoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy53YXJuaW5nc0luVmlldyAmJiB0aGlzLndhcm5pbmdzSW5WaWV3Lm1heFdhcm5pbmcgPiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJhZGdlQ29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAnd2FybmluZ2xldmVsLScgKyB0aGlzLndhcm5pbmdzSW5WaWV3Lm1heFdhcm5pbmc7XHJcbiAgfVxyXG5cclxuICBnZXQgYmFkZ2VUZXh0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCR7dGhpcy53YXJuaW5nc0luVmlldy5tYXhXYXJuaW5nfSR7XHJcbiAgICAgIHRoaXMud2FybmluZ3NJblZpZXcuaGFzRW1lcmdlbmN5V2FybmluZyA/ICchJyA6ICcnXHJcbiAgICB9YDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBmdWxsc2NyZWVuU2VydmljZTogRnVsbHNjcmVlblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgIHByaXZhdGUgd2FybmluZ1NlcnZpY2U6IFdhcm5pbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHtcclxuICAgIHRoaXMuaXNJb3MgPSB0aGlzLnBsYXRmb3JtLmlzKCdpb3MnKTtcclxuICAgIHRoaXMuaXNBbmRyb2lkID0gdGhpcy5wbGF0Zm9ybS5pcygnYW5kcm9pZCcpO1xyXG4gICAgdGhpcy5mdWxsc2NyZWVuJCA9IHRoaXMuZnVsbHNjcmVlblNlcnZpY2UuaXNGdWxsc2NyZWVuJDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy53YXJuaW5nR3JvdXBJbk1hcFZpZXdTdWJzY3JpcHRpb24gPSB0aGlzLndhcm5pbmdTZXJ2aWNlLndhcm5pbmdHcm91cEluTWFwVmlld09ic2VydmFibGUkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgod2FybmluZ3NJblZpZXcpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGFsbFdhcm5pbmdzID0gW1xyXG4gICAgICAgICAgICAuLi53YXJuaW5nc0luVmlldy5jZW50ZXIsXHJcbiAgICAgICAgICAgIC4uLndhcm5pbmdzSW5WaWV3LnZpZXdCb3VuZHNcclxuICAgICAgICAgIF07XHJcbiAgICAgICAgICBjb25zdCBhbGxNYXhXYXJuaW5ncyA9IGFsbFdhcm5pbmdzLm1hcCgoZykgPT4gZy5nZXRNYXhXYXJuaW5nKDApKTtcclxuICAgICAgICAgIGNvbnN0IG1heFdhcm5pbmcgPSBNYXRoLm1heCguLi5hbGxNYXhXYXJuaW5ncy5tYXAoKHgpID0+IHgubWF4KSk7XHJcbiAgICAgICAgICBjb25zdCBoYXNFbWVyZ2VuY3lXYXJuaW5nID0gYWxsTWF4V2FybmluZ3Muc29tZShcclxuICAgICAgICAgICAgKHgpID0+IHgubWF4ID09PSBtYXhXYXJuaW5nICYmIHguaGFzV2FybmluZ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvdW50OiBhbGxXYXJuaW5ncy5sZW5ndGgsXHJcbiAgICAgICAgICAgIHRleHQ6IGFsbFdhcm5pbmdzLmxlbmd0aCA+IDkgPyAnOSsnIDogYWxsV2FybmluZ3MubGVuZ3RoLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIG1heFdhcm5pbmcsXHJcbiAgICAgICAgICAgIGhhc0VtZXJnZW5jeVdhcm5pbmdcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy53YXJuaW5nc0luVmlldyA9IHZhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50R2VvSGF6YXJkU3Vic2NyaXB0aW9uID0gdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UuY3VycmVudEdlb0hhemFyZCQuc3Vic2NyaWJlKFxyXG4gICAgICAodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2hvd1RyaXBzID0gdmFsLmluZGV4T2YoR2VvSGF6YXJkLlNub3cpID49IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMud2FybmluZ0dyb3VwSW5NYXBWaWV3U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmN1cnJlbnRHZW9IYXphcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi10YWJzIHRhYmJhci1oaWdobGlnaHQ9XCJ0cnVlXCIgW25nQ2xhc3NdPVwieydpb3MnOiBpc0lvcywgJ21kJzogaXNBbmRyb2lkfVwiPlxyXG4gIDxpb24tdGFiLWJhciBbaGlkZGVuXT1cImZ1bGxzY3JlZW4kIHwgYXN5bmNcIiBzbG90PVwiYm90dG9tXCI+XHJcbiAgICA8aW9uLXRhYi1idXR0b24gdGFiPVwiaG9tZVwiPlxyXG4gICAgICA8aW9uLWljb24gbmFtZT1cIm1hcFwiPjwvaW9uLWljb24+XHJcbiAgICAgIDxpb24tbGFiZWw+e3snVEFCUy5NQVAnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLXRhYi1idXR0b24+XHJcbiAgICA8aW9uLXRhYi1idXR0b24gdGFiPVwib2JzZXJ2YXRpb24tbGlzdFwiPlxyXG4gICAgICA8aW9uLWljb24gbmFtZT1cImxpc3RcIj48L2lvbi1pY29uPlxyXG4gICAgICA8aW9uLWxhYmVsPnt7J1RBQlMuTElTVCcgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24tdGFiLWJ1dHRvbj5cclxuICAgIDxpb24tdGFiLWJ1dHRvbiB0YWI9XCJ3YXJuaW5nLWxpc3RcIj5cclxuICAgICAgPGlvbi1pY29uIG5hbWU9XCJ3YXJuaW5nXCI+PC9pb24taWNvbj5cclxuICAgICAgPGlvbi1sYWJlbD57eydUQUJTLldBUk5JTkdTJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tYmFkZ2UgKm5nSWY9XCJzaG93QmFkZ2VcIiBbY29sb3JdPVwiYmFkZ2VDb2xvclwiPnt7IGJhZGdlVGV4dCB9fTwvaW9uLWJhZGdlPlxyXG4gICAgPC9pb24tdGFiLWJ1dHRvbj5cclxuICA8L2lvbi10YWItYmFyPlxyXG48L2lvbi10YWJzPlxyXG48YXBwLWNvYWNoLW1hcmtzPjwvYXBwLWNvYWNoLW1hcmtzPiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVGFic1BhZ2UgfSBmcm9tICcuL3RhYnMucGFnZSc7XHJcbmltcG9ydCB7IFN0YXJ0V2l6YXJkR3VhcmQgfSBmcm9tICcuLi8uLi9jb3JlL2d1YXJkcy9zdGFydC13aXphcmQuZ3VhcmQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJ3RhYnMnLFxyXG4gICAgY29tcG9uZW50OiBUYWJzUGFnZSxcclxuICAgIGNhbkFjdGl2YXRlOiBbU3RhcnRXaXphcmRHdWFyZF0sXHJcbiAgICBjaGlsZHJlbjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgcmVkaXJlY3RUbzogJy90YWJzL2hvbWUnLFxyXG4gICAgICAgIHBhdGhNYXRjaDogJ2Z1bGwnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwYXRoOiAnaG9tZScsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogKCkgPT5cclxuICAgICAgICAgICAgICBpbXBvcnQoJy4uL2hvbWUvaG9tZS5tb2R1bGUnKS50aGVuKChtKSA9PiBtLkhvbWVQYWdlTW9kdWxlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHBhdGg6ICd0cmlwJyxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnJyxcclxuICAgICAgICAgICAgbG9hZENoaWxkcmVuOiAoKSA9PlxyXG4gICAgICAgICAgICAgIGltcG9ydCgnLi4vdHJpcC90cmlwLm1vZHVsZScpLnRoZW4oKG0pID0+IG0uVHJpcFBhZ2VNb2R1bGUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogJ29ic2VydmF0aW9uLWxpc3QnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhdGg6ICcnLFxyXG4gICAgICAgICAgICBsb2FkQ2hpbGRyZW46ICgpID0+XHJcbiAgICAgICAgICAgICAgaW1wb3J0KCcuLi9vYnNlcnZhdGlvbi1saXN0L29ic2VydmF0aW9uLWxpc3QubW9kdWxlJykudGhlbihcclxuICAgICAgICAgICAgICAgIChtKSA9PiBtLk9ic2VydmF0aW9uTGlzdFBhZ2VNb2R1bGVcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcGF0aDogJ3dhcm5pbmctbGlzdCcsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogKCkgPT5cclxuICAgICAgICAgICAgICBpbXBvcnQoJy4uL3dhcm5pbmctbGlzdC93YXJuaW5nLWxpc3QubW9kdWxlJykudGhlbihcclxuICAgICAgICAgICAgICAgIChtKSA9PiBtLldhcm5pbmdMaXN0UGFnZU1vZHVsZVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgcmVkaXJlY3RUbzogJy90YWJzL2hvbWUnLFxyXG4gICAgcGF0aE1hdGNoOiAnZnVsbCdcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYnNQYWdlUm91dGluZ01vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcbmltcG9ydCB7IElvbmljTW9kdWxlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgVHJpcFBhZ2UgfSBmcm9tICcuL3RyaXAucGFnZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogVHJpcFBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgSW9uaWNNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVHJpcFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmlwUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXRyaXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cmlwLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdHJpcC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJpcFBhZ2Uge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwiZW5kXCI+XHJcbiAgICAgIDxpb24tbWVudS1idXR0b24+PC9pb24tbWVudS1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT57eyBcIlRSSVAuVElUTEVcIiB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudD5cclxuICA8aW9uLWxpc3Q+XHJcbiAgICA8aW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICBQbGFubGVnZyB0dXJcclxuICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cIm1hcFwiPjwvaW9uLWljb24+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgVHVyZm9yc2xhZ1xyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiBuYW1lPVwiY2hldnJvbi1mb3J3YXJkXCI+PC9pb24taWNvbj5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8aW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwibWFwXCI+PC9pb24taWNvbj5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICBSZWdpc3RyZXJ0ZSB0dXJlclxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiBuYW1lPVwiY2hldnJvbi1mb3J3YXJkXCI+PC9pb24taWNvbj5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8aW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwid2Fsa1wiPjwvaW9uLWljb24+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgUGxhbmxlZ2cgbnkgdHVyXHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLWljb24gc2xvdD1cImVuZFwiIG5hbWU9XCJjaGV2cm9uLWZvcndhcmRcIj48L2lvbi1pY29uPlxyXG4gICAgPC9pb24taXRlbT5cclxuICA8L2lvbi1saXN0PlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFeHRlcm5hbExpbmtTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9leHRlcm5hbC1saW5rL2V4dGVybmFsLWxpbmsuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hYm9ubmVyLWJhbm5lcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Fib25uZXItYmFubmVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hYm9ubmVyLWJhbm5lci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBYm9ubmVyQmFubmVyQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVybmFsTGlua1NlcnZpY2U6IEV4dGVybmFsTGlua1NlcnZpY2UpIHt9XHJcblxyXG4gIGJ1dHRvbkNsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmV4dGVybmFsTGlua1NlcnZpY2Uub3BlbkV4dGVybmFsTGluaygnaHR0cHM6Ly9hYm9ubmVyLnZhcnNvbS5ubycpO1xyXG4gIH1cclxufVxyXG4iLCI8aDMgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydBQk9OTkVSX0JBTk5FUi5USVRMRScgfCB0cmFuc2xhdGUgfX08L2gzPlxyXG48cD57eydBQk9OTkVSX0JBTk5FUi5CQU5ORVJfVEVYVF9MSU5FXzEnIHwgdHJhbnNsYXRlIH19PGJyIC8+e3snQUJPTk5FUl9CQU5ORVIuQkFOTkVSX1RFWFRfTElORV8yJyB8IHRyYW5zbGF0ZSB9fTwvcD5cclxuPGlvbi1idXR0b24gY2xhc3M9XCJpb24tbm8tbWFyZ2luXCIgY29sb3I9XCJwcmltYXJ5XCIgZmlsbD1cIm91dGxpbmVcIiAoY2xpY2spPVwiYnV0dG9uQ2xpY2tlZCgpXCI+XHJcbiAge3sgJ0FCT05ORVJfQkFOTkVSLkxJTktfVEVYVCcgfCB0cmFuc2xhdGUgfX1cclxuPC9pb24tYnV0dG9uPiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IElvbmljTW9kdWxlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBXYXJuaW5nTGlzdFBhZ2UgfSBmcm9tICcuL3dhcm5pbmctbGlzdC5wYWdlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBXYXJuaW5nTGlzdEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvd2FybmluZy1saXN0LWhlYWRlci93YXJuaW5nLWxpc3QtaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvd2FybmluZy1saXN0LWl0ZW0vd2FybmluZy1saXN0LWl0ZW0uY29tcG9uZW50JztcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG5pbXBvcnQgeyBXYXJuaW5nR3JvdXBGYXZvdXJpdGVUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3dhcm5pbmctZ3JvdXAtZmF2b3VyaXRlLXRvZ2dsZS93YXJuaW5nLWdyb3VwLWZhdm91cml0ZS10b2dnbGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWJvbm5lckJhbm5lckNvbXBvbmVudCB9IGZyb20gJy4vYWJvbm5lci1iYW5uZXIvYWJvbm5lci1iYW5uZXIuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBXYXJuaW5nTGlzdFBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgSW9uaWNNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFNoYXJlZE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBXYXJuaW5nTGlzdFBhZ2UsXHJcbiAgICBXYXJuaW5nTGlzdEhlYWRlckNvbXBvbmVudCxcclxuICAgIFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudCxcclxuICAgIFdhcm5pbmdHcm91cEZhdm91cml0ZVRvZ2dsZUNvbXBvbmVudCxcclxuICAgIEFib25uZXJCYW5uZXJDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXYXJuaW5nTGlzdFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE5nWm9uZSxcclxuICBWaWV3Q2hpbGRyZW4sXHJcbiAgUXVlcnlMaXN0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdhcm5pbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy93YXJuaW5nL3dhcm5pbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFdhcm5pbmdHcm91cCB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvd2FybmluZy93YXJuaW5nLWdyb3VwLm1vZGVsJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJVmlydHVhbFNjcm9sbEl0ZW0gfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy92aXJ0dWFsLXNjcm9sbC1pdGVtLm1vZGVsJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBXYXJuaW5nTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3dhcm5pbmctbGlzdC1pdGVtL3dhcm5pbmctbGlzdC1pdGVtLmNvbXBvbmVudCc7XHJcblxyXG50eXBlIFNlbGVjdGVkVGFiID0gJ2luTWFwVmlldycgfCAnYWxsJyB8ICdmYXZvdXJpdGVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXdhcm5pbmctbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3dhcm5pbmctbGlzdC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3dhcm5pbmctbGlzdC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2FybmluZ0xpc3RQYWdlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBzZWxlY3RlZFRhYjogU2VsZWN0ZWRUYWI7XHJcbiAgd2FybmluZ0dyb3VwczogSVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD5bXSA9IFtdO1xyXG4gIHByaXZhdGUgc2VnbWVudFBhZ2VTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8U2VsZWN0ZWRUYWI+O1xyXG4gIHByaXZhdGUgc2VnbWVudFBhZ2VPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFNlbGVjdGVkVGFiPjtcclxuICBwcml2YXRlIG5nRGVzdHJveVN1YmplY3Q6IFN1YmplY3Q8dm9pZD47XHJcbiAgcmVmcmVzaEZ1bmMgPSB0aGlzLnJlZnJlc2guYmluZCh0aGlzKTtcclxuICB0aXRsZSA9ICdXQVJOSU5HX0xJU1QuVElUTEUnO1xyXG4gIG5vRmF2b3VyaXRlcyA9IGZhbHNlO1xyXG4gIG5vUmVsZXZhbnQgPSBmYWxzZTtcclxuICB0cmFja0J5RnVuYyA9IHRoaXMudHJhY2tCeUludGVybmFsLmJpbmQodGhpcyk7XHJcbiAgbG9hZGVkID0gZmFsc2U7XHJcbiAgbXlGb290ZXJGbiA9IHRoaXMuZm9vdGVyRm4uYmluZCh0aGlzKTtcclxuXHJcbiAgQFZpZXdDaGlsZHJlbihXYXJuaW5nTGlzdEl0ZW1Db21wb25lbnQpXHJcbiAgd2FybmluZ0xpc3RJdGVtczogUXVlcnlMaXN0PFdhcm5pbmdMaXN0SXRlbUNvbXBvbmVudD47XHJcblxyXG4gIGdldCBzaG93Tm9GYXZvdXJpdGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUYWIgPT09ICdmYXZvdXJpdGVzJyAmJiB0aGlzLm5vRmF2b3VyaXRlcztcclxuICB9XHJcblxyXG4gIGdldCBzaG93Tm9SZWxldmFudEVtcHR5U3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYiA9PT0gJ2luTWFwVmlldycgJiYgdGhpcy5ub1JlbGV2YW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNob3dFbXB0eVN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hvd05vRmF2b3VyaXRlcyB8fCB0aGlzLnNob3dOb1JlbGV2YW50RW1wdHlTdGF0ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB3YXJuaW5nU2VydmljZTogV2FybmluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGFiID0gJ2luTWFwVmlldyc7XHJcbiAgICB0aGlzLnNlZ21lbnRQYWdlU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2VsZWN0ZWRUYWI+KFxyXG4gICAgICB0aGlzLnNlbGVjdGVkVGFiXHJcbiAgICApO1xyXG4gICAgdGhpcy5zZWdtZW50UGFnZU9ic2VydmFibGUgPSB0aGlzLnNlZ21lbnRQYWdlU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIGNsb3NlQWxsT3BlbigpIHtcclxuICAgIGlmICh0aGlzLndhcm5pbmdMaXN0SXRlbXMpIHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMud2FybmluZ0xpc3RJdGVtcy50b0FycmF5KCkpIHtcclxuICAgICAgICBpdGVtLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlvblZpZXdEaWRFbnRlcigpIHtcclxuICAgIHRoaXMubmdEZXN0cm95U3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgY29tYmluZUxhdGVzdChbXHJcbiAgICAgIHRoaXMuc2VnbWVudFBhZ2VPYnNlcnZhYmxlLFxyXG4gICAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5jdXJyZW50R2VvSGF6YXJkJFxyXG4gICAgXSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgc3dpdGNoTWFwKChbc2VnbWVudCwgY3VycmVudEdlb0hhemFyZF0pID0+XHJcbiAgICAgICAgICB0aGlzLmdldFdhcm5pbmdHcm91cE9ic2VydmFibGUoc2VnbWVudCwgY3VycmVudEdlb0hhemFyZClcclxuICAgICAgICApLFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveVN1YmplY3QpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgod2FybmluZ0dyb3VwcykgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlQWxsT3BlbigpO1xyXG4gICAgICAgICAgdGhpcy53YXJuaW5nR3JvdXBzID0gd2FybmluZ0dyb3VwcztcclxuICAgICAgICAgIHRoaXMuaGFja1RvU2hvd1ZpcnR1YWxTY3JvbGxJdGVtc1RoYXRJc05vdFZpc2libGVBdEZpcnN0TG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLnNlZ21lbnRQYWdlT2JzZXJ2YWJsZSxcclxuICAgICAgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UuY3VycmVudEdlb0hhemFyZCRcclxuICAgIF0pXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveVN1YmplY3QpKVxyXG4gICAgICAuc3Vic2NyaWJlKChbc2VsZWN0ZWRUYWIsIGN1cnJlbnRHZW9IYXphcmRdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2V0VGl0bGUoc2VsZWN0ZWRUYWIsIGN1cnJlbnRHZW9IYXphcmQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFja1RvU2hvd1ZpcnR1YWxTY3JvbGxJdGVtc1RoYXRJc05vdFZpc2libGVBdEZpcnN0TG9hZCgpIHtcclxuICAgIGlmICghdGhpcy5sb2FkZWQgJiYgdGhpcy53YXJuaW5nR3JvdXBzICYmIHRoaXMud2FybmluZ0dyb3Vwcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtcyA9IFsuLi50aGlzLndhcm5pbmdHcm91cHNdO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLndhcm5pbmdHcm91cHMgPSBudWxsO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgLy8gSGFjayB0byB2aXJ0dWFsIHNjcm9sbCBpdGVtcyBub3Qgc2hvd2luZyBhdCBmaXJzdCBsb2FkXHJcbiAgICAgICAgICB0aGlzLndhcm5pbmdHcm91cHMgPSBjdXJyZW50SXRlbXM7XHJcbiAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfSwgMjAwKTtcclxuICAgICAgfSwgMjAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0VGl0bGUoc2VsZWN0ZWRUYWI6IFNlbGVjdGVkVGFiLCBjdXJyZW50R2VvSGF6YXJkOiBHZW9IYXphcmRbXSkge1xyXG4gICAgaWYgKHNlbGVjdGVkVGFiICE9PSAnZmF2b3VyaXRlcycpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGBXQVJOSU5HX0xJU1QuVElUTEVfJHtHZW9IYXphcmRbXHJcbiAgICAgICAgY3VycmVudEdlb0hhemFyZFswXVxyXG4gICAgICBdLnRvVXBwZXJDYXNlKCl9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSAnV0FSTklOR19MSVNULlRJVExFJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZnJlc2goY2FuY2VsUHJvbWlzZTogUHJvbWlzZTxhbnk+KSB7XHJcbiAgICByZXR1cm4gdGhpcy53YXJuaW5nU2VydmljZS51cGRhdGVXYXJuaW5nc0ZvckN1cnJlbnRHZW9IYXphcmQoY2FuY2VsUHJvbWlzZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFdhcm5pbmdHcm91cE9ic2VydmFibGUoXHJcbiAgICBzZWdtZW50OiBTZWxlY3RlZFRhYixcclxuICAgIGN1cnJlbnRHZW9IYXphcmQ6IEdlb0hhemFyZFtdXHJcbiAgKTogT2JzZXJ2YWJsZTxJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPltdPiB7XHJcbiAgICBzd2l0Y2ggKHNlZ21lbnQpIHtcclxuICAgIGNhc2UgJ2luTWFwVmlldyc6XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFdhcm5pbmdzSW5NYXBWaWV3KCk7XHJcbiAgICBjYXNlICdhbGwnOlxyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBbGxXYXJuaW5ncyhjdXJyZW50R2VvSGF6YXJkKTtcclxuICAgIGNhc2UgJ2Zhdm91cml0ZXMnOlxyXG4gICAgICByZXR1cm4gdGhpcy5nZXRGYXZvdXJpdGVzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXBUb1ZpcnR1YWxTY3JvbGxJdGVtKFxyXG4gICAgd2c6IFdhcm5pbmdHcm91cFtdLFxyXG4gICAgaGVhZGVyPzogc3RyaW5nLFxyXG4gICAgaW5mb1RleHQ/OiBzdHJpbmdcclxuICApOiBJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPltdIHtcclxuICAgIHJldHVybiB3Zy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoe1xyXG4gICAgICBoZWFkZXI6IGluZGV4ID09PSAwID8gaGVhZGVyIDogdW5kZWZpbmVkLFxyXG4gICAgICBpbmZvVGV4dDogaW5kZXggPT09IDAgPyBpbmZvVGV4dCA6IHVuZGVmaW5lZCxcclxuICAgICAgaXRlbVxyXG4gICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRXYXJuaW5nc0luTWFwVmlldygpIHtcclxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgdGhpcy5nZXRXYXJuaW5nc0luTWFwVmlld0NlbnRlcigpLFxyXG4gICAgICB0aGlzLmdldFdhcm5pbmdzSW5NYXBWaWV3Qm91bmRzKCksXHJcbiAgICAgIHRoaXMuZ2V0V2FybmluZ3NJbk1hcFZpZXdCdWZmZXIoKVxyXG4gICAgXSkucGlwZShcclxuICAgICAgbWFwKChbYSwgYiwgY10pID0+IFsuLi5hLCAuLi5iLCAuLi4oYi5sZW5ndGggPCAzID8gYyA6IFtdKV0pLFxyXG4gICAgICB0YXAoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5vUmVsZXZhbnQgPSB2YWwubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0V2FybmluZ3NJbk1hcFZpZXdDZW50ZXIoKTogT2JzZXJ2YWJsZTxcclxuICAgIElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W11cclxuICAgID4ge1xyXG4gICAgcmV0dXJuIHRoaXMud2FybmluZ1NlcnZpY2Uud2FybmluZ0dyb3VwSW5NYXBWaWV3T2JzZXJ2YWJsZSQucGlwZShcclxuICAgICAgbWFwKCh2YWwpID0+XHJcbiAgICAgICAgdGhpcy5tYXBUb1ZpcnR1YWxTY3JvbGxJdGVtKHZhbC5jZW50ZXIsICdXQVJOSU5HX0xJU1QuSU5fTUFQX0NFTlRFUicpXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFdhcm5pbmdzSW5NYXBWaWV3Qm91bmRzKCk6IE9ic2VydmFibGU8XHJcbiAgICBJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPltdXHJcbiAgICA+IHtcclxuICAgIHJldHVybiB0aGlzLndhcm5pbmdTZXJ2aWNlLndhcm5pbmdHcm91cEluTWFwVmlld09ic2VydmFibGUkLnBpcGUoXHJcbiAgICAgIG1hcCgodmFsKSA9PlxyXG4gICAgICAgIHRoaXMubWFwVG9WaXJ0dWFsU2Nyb2xsSXRlbSh2YWwudmlld0JvdW5kcywgJ1dBUk5JTkdfTElTVC5JTl9NQVBfVklFVycpXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFdhcm5pbmdzSW5NYXBWaWV3QnVmZmVyKCk6IE9ic2VydmFibGU8XHJcbiAgICBJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPltdXHJcbiAgICA+IHtcclxuICAgIHJldHVybiB0aGlzLndhcm5pbmdTZXJ2aWNlLndhcm5pbmdHcm91cEluTWFwVmlld09ic2VydmFibGUkLnBpcGUoXHJcbiAgICAgIG1hcCgodmFsKSA9PlxyXG4gICAgICAgIHRoaXMubWFwVG9WaXJ0dWFsU2Nyb2xsSXRlbShcclxuICAgICAgICAgIHZhbC5idWZmZXIuZmlsdGVyKCh3ZykgPT4gd2cuaGFzQW55V2FybmluZ3MoKSksXHJcbiAgICAgICAgICAnV0FSTklOR19MSVNULk9USEVSX1JFTEVWQU5UJ1xyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWxsV2FybmluZ3MoXHJcbiAgICBjdXJyZW50R2VvSGF6YXJkOiBHZW9IYXphcmRbXVxyXG4gICk6IE9ic2VydmFibGU8SVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD5bXT4ge1xyXG4gICAgaWYgKGN1cnJlbnRHZW9IYXphcmRbMF0gPT09IEdlb0hhemFyZC5Tbm93KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFNub3dSZWdpb25XYXJuaW5ncygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMud2FybmluZ1NlcnZpY2Uud2FybmluZ3NGb3JDdXJyZW50R2VvSGF6YXJkT2JzZXJ2YWJsZSQucGlwZShcclxuICAgICAgICBtYXAoKHdnOiBXYXJuaW5nR3JvdXBbXSkgPT5cclxuICAgICAgICAgIHRoaXMubWFwVG9WaXJ0dWFsU2Nyb2xsSXRlbSh3ZywgJ1dBUk5JTkdfTElTVC5BTExfV0FSTklOR1MnKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U25vd1JlZ2lvbldhcm5pbmdzKCk6IE9ic2VydmFibGU8XHJcbiAgICBJVmlydHVhbFNjcm9sbEl0ZW08V2FybmluZ0dyb3VwPltdXHJcbiAgICA+IHtcclxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgdGhpcy5nZXRBUmVnaW9uV2FybmluZ3MoKSxcclxuICAgICAgdGhpcy5nZXRCUmVnaW9uV2FybmluZ3MoKVxyXG4gICAgXSkucGlwZShtYXAoKFthLCBiXSkgPT4gWy4uLmEsIC4uLmJdKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEFSZWdpb25XYXJuaW5ncygpOiBPYnNlcnZhYmxlPElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W10+IHtcclxuICAgIHJldHVybiB0aGlzLndhcm5pbmdTZXJ2aWNlLndhcm5pbmdzRm9yQ3VycmVudEdlb0hhemFyZE9ic2VydmFibGUkLnBpcGUoXHJcbiAgICAgIG1hcCgod2c6IFdhcm5pbmdHcm91cFtdKSA9PlxyXG4gICAgICAgIHRoaXMubWFwVG9WaXJ0dWFsU2Nyb2xsSXRlbShcclxuICAgICAgICAgIHdnLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5ncm91cFR5cGUgPT09ICdBJyksXHJcbiAgICAgICAgICAnV0FSTklOR19MSVNULkFfUkVHSU9OUydcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEJSZWdpb25XYXJuaW5ncygpOiBPYnNlcnZhYmxlPElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W10+IHtcclxuICAgIHJldHVybiB0aGlzLndhcm5pbmdTZXJ2aWNlLndhcm5pbmdzRm9yQ3VycmVudEdlb0hhemFyZE9ic2VydmFibGUkLnBpcGUoXHJcbiAgICAgIG1hcCgod2c6IFdhcm5pbmdHcm91cFtdKSA9PlxyXG4gICAgICAgIHRoaXMubWFwVG9WaXJ0dWFsU2Nyb2xsSXRlbShcclxuICAgICAgICAgIHdnLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5ncm91cFR5cGUgPT09ICdCJyksXHJcbiAgICAgICAgICAnV0FSTklOR19MSVNULkJfUkVHSU9OUycsXHJcbiAgICAgICAgICAnV0FSTklOR19MSVNULkJfUkVHSU9OU19TVUJUSVRMRSdcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZhdm91cml0ZXNPYnNlcnZhYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMud2FybmluZ1NlcnZpY2UuZ2V0V2FybmluZ0dyb3VwRmF2b3VyaXRlc09ic2VydmFibGUoKS5waXBlKFxyXG4gICAgICB0YXAoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5vRmF2b3VyaXRlcyA9IHZhbC5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBtYXAoKHdhcm5pbmdHcm91cHMpID0+XHJcbiAgICAgICAgdGhpcy5tYXBUb1ZpcnR1YWxTY3JvbGxJdGVtKHdhcm5pbmdHcm91cHMsICdXQVJOSU5HX0xJU1QuRkFWT1VSSVRFUycpXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBteUhlYWRlckZuKFxyXG4gICAgaXRlbTogSVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD4sXHJcbiAgICBpbmRleDogbnVtYmVyLFxyXG4gICAgaXRlbXM6IElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W11cclxuICApIHtcclxuICAgIHJldHVybiBpdGVtLmhlYWRlclxyXG4gICAgICA/IHtcclxuICAgICAgICBoZWFkZXI6IGl0ZW0uaGVhZGVyLFxyXG4gICAgICAgIGluZm9UZXh0OiBpdGVtLmluZm9UZXh0LFxyXG4gICAgICAgIHNob3dEYXlOYW1lczogaXRlbXMuc29tZShcclxuICAgICAgICAgICh4KSA9PiB4Lml0ZW0ua2V5Lmdlb0hhemFyZCAhPT0gR2VvSGF6YXJkLkljZVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgICA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvb3RlckZuKFxyXG4gICAgaXRlbTogSVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD4sXHJcbiAgICBpbmRleDogbnVtYmVyLFxyXG4gICAgaXRlbXM6IElWaXJ0dWFsU2Nyb2xsSXRlbTxXYXJuaW5nR3JvdXA+W11cclxuICApIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiICE9PSAnaW5NYXBWaWV3JyAmJiBpbmRleCA9PT0gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICByZXR1cm4gJ2Zvb3Rlcic7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SW50ZXJuYWwoXywgaXRlbTogSVZpcnR1YWxTY3JvbGxJdGVtPFdhcm5pbmdHcm91cD4pIHtcclxuICAgIHJldHVybiBpdGVtICYmIGl0ZW0uaXRlbSA/IGl0ZW0uaXRlbS5nZXRLZXlBc1N0cmluZygpIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIHRoaXMuY2xvc2VBbGxPcGVuKCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveVN1YmplY3QubmV4dCgpO1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3lTdWJqZWN0LmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBvblNlZ21lbnRDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLnNlZ21lbnRQYWdlU3ViamVjdC5uZXh0KHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gIH1cclxufVxyXG4iLCI8YXBwLWhlYWRlciBbdGl0bGVdPVwidGl0bGVcIj48L2FwcC1oZWFkZXI+XHJcbjxpb24tc2VnbWVudCBtb2RlPVwibWRcIiBzbG90PVwiZml4ZWRcIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkVGFiXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25TZWdtZW50Q2hhbmdlKClcIj5cclxuICA8aW9uLXNlZ21lbnQtYnV0dG9uIG1vZGU9XCJtZFwiIHZhbHVlPVwiaW5NYXBWaWV3XCI+XHJcbiAgICA8aW9uLWxhYmVsPnt7J1dBUk5JTkdfTElTVC5SRUxFVkFOVCd8dHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8L2lvbi1zZWdtZW50LWJ1dHRvbj5cclxuICA8aW9uLXNlZ21lbnQtYnV0dG9uIG1vZGU9XCJtZFwiIHZhbHVlPVwiYWxsXCI+XHJcbiAgICA8aW9uLWxhYmVsPnt7J1dBUk5JTkdfTElTVC5BTEwnfHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgPC9pb24tc2VnbWVudC1idXR0b24+XHJcbiAgPGlvbi1zZWdtZW50LWJ1dHRvbiBtb2RlPVwibWRcIiB2YWx1ZT1cImZhdm91cml0ZXNcIj5cclxuICAgIDxpb24tbGFiZWw+e3snV0FSTklOR19MSVNULkZBVk9VUklURVMnfHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgPC9pb24tc2VnbWVudC1idXR0b24+XHJcbjwvaW9uLXNlZ21lbnQ+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZnJlc2gtd2l0aC1jYW5jZWwgW3JlZnJlc2hGdW5jXT1cInJlZnJlc2hGdW5jXCI+PC9hcHAtcmVmcmVzaC13aXRoLWNhbmNlbD5cclxuICA8aW9uLXZpcnR1YWwtc2Nyb2xsICpuZ0lmPVwiIXNob3dFbXB0eVN0YXRlIGVsc2UgZW1wdHlcIiBbbmdDbGFzc109XCJ7J2xvYWRlZCc6IGxvYWRlZH1cIiBbaXRlbXNdPVwid2FybmluZ0dyb3Vwc1wiXHJcbiAgICBbaGVhZGVyRm5dPVwibXlIZWFkZXJGblwiIFtmb290ZXJGbl09XCJteUZvb3RlckZuXCIgW2FwcHJveEl0ZW1IZWlnaHRdPVwiNDlcIiBbYXBwcm94SGVhZGVySGVpZ2h0XT1cIjM4XCJcclxuICAgIFt0cmFja0J5XT1cInRyYWNrQnlGdW5jXCI+XHJcbiAgICA8aW9uLWl0ZW0tZGl2aWRlciAqdmlydHVhbEhlYWRlcj1cImxldCBoZWFkZXJcIj5cclxuICAgICAgPGFwcC13YXJuaW5nLWxpc3QtaGVhZGVyIFt0aXRsZV09XCJoZWFkZXIuaGVhZGVyXCIgW3N1YlRpdGxlXT1cImhlYWRlci5pbmZvVGV4dFwiXHJcbiAgICAgICAgW3Nob3dEYXlOYW1lc109XCJoZWFkZXIuc2hvd0RheU5hbWVzXCI+PC9hcHAtd2FybmluZy1saXN0LWhlYWRlcj5cclxuICAgIDwvaW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgIDxkaXYgKnZpcnR1YWxJdGVtPVwibGV0IHZpcnRpYWxJdGVtXCI+XHJcbiAgICAgIDxhcHAtd2FybmluZy1saXN0LWl0ZW0gW3dhcm5pbmdHcm91cF09XCJ2aXJ0aWFsSXRlbS5pdGVtXCI+PC9hcHAtd2FybmluZy1saXN0LWl0ZW0+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxpb24taXRlbS1kaXZpZGVyIGNsYXNzPVwidmlydHVhbC1saXN0LWZvb3RlclwiICp2aXJ0dWFsRm9vdGVyPVwibGV0IGZvb3RlclwiPlxyXG4gICAgPC9pb24taXRlbS1kaXZpZGVyPlxyXG4gIDwvaW9uLXZpcnR1YWwtc2Nyb2xsPlxyXG4gIDxkaXYgaWQ9XCJhYm9ubmVyLWJhbm5lclwiICpuZ0lmPVwic2VsZWN0ZWRUYWIgPT09ICdpbk1hcFZpZXcnXCIgY2xhc3M9XCJpb24tbWFyZ2luXCIgW25nQ2xhc3NdPVwieydsb2FkZWQnOiBsb2FkZWR9XCI+XHJcbiAgICA8YXBwLWFib25uZXItYmFubmVyPjwvYXBwLWFib25uZXItYmFubmVyPlxyXG4gIDwvZGl2PlxyXG48L2lvbi1jb250ZW50PlxyXG48YXBwLWFkZC1tZW51PjwvYXBwLWFkZC1tZW51PlxyXG48YXBwLWdlby1zZWxlY3Qgc2xvdD1cImZpeGVkXCI+PC9hcHAtZ2VvLXNlbGVjdD5cclxuPG5nLXRlbXBsYXRlICNlbXB0eT5cclxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2hvd05vRmF2b3VyaXRlcyA/IGVtcHR5RmF2b3VyaXRlcyA6IGVtcHR5UmVsZXZhbnRcIj48L25nLWNvbnRhaW5lcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNlbXB0eUZhdm91cml0ZXM+XHJcbiAgPGlvbi1ncmlkIGNsYXNzPVwiZnVsbC1ncmlkXCI+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgPHN2Zy1pY29uIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2VtcHR5LXN0YXRlcy9uby1mYXZvdXJpdGVzLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tbWFyZ2luLWhvcml6b250YWxcIj5cclxuICAgICAgICA8aDI+IHt7ICdXQVJOSU5HX0xJU1QuTk9fRkFWT1VSSVRFUycgfCB0cmFuc2xhdGUgfX08L2gyPlxyXG4gICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj57eydXQVJOSU5HX0xJU1QuTk9fRkFWT1VSSVRFU19URVhUJ3x0cmFuc2xhdGV9fTwvaDM+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICA8L2lvbi1ncmlkPlxyXG48L25nLXRlbXBsYXRlPlxyXG48bmctdGVtcGxhdGUgI2VtcHR5UmVsZXZhbnQ+XHJcbiAgPGlvbi1ncmlkIGNsYXNzPVwiZnVsbC1ncmlkXCI+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgPHN2Zy1pY29uIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2VtcHR5LXN0YXRlcy9uby13YXJuaW5ncy5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLW1hcmdpbi1ob3Jpem9udGFsXCI+XHJcbiAgICAgICAgPGgyPiB7eyAnV0FSTklOR19MSVNULk5PX1dBUk5JTkdTJyB8IHRyYW5zbGF0ZSB9fTwvaDI+XHJcbiAgICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPnt7J1dBUk5JTkdfTElTVC5OT19XQVJOSU5HU19URVhUJ3x0cmFuc2xhdGV9fTwvaDM+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICA8L2lvbi1ncmlkPlxyXG48L25nLXRlbXBsYXRlPiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9