/**
 * IDs of topomap / basemap layers.
 *
 * We also have the TopoMap enum that defines the ids of base maps the user can choose, where one base map may
 * use one or more of these base map layers, eg. arcgis for everywhere and statensKartverk for norway.
 * See settings.ts for how this works.
 */
export enum TopoMapLayer {
  openTopo = 'openTopo',
  arcGisOnline = 'arcGisOnline',
  statensKartverk = 'statensKartverk',
  geoDataLandskap = 'geoDataLandskap',
  npolarBasiskart = 'npolarBasiskart',
}
