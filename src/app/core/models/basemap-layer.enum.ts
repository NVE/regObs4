/**
 * IDs of basemap layers.
 *
 * We also have the BaseMap enum that defines the ids of base maps the user can choose among, where one base map may
 * use one or more of these base map layers, eg. arcgis for everywhere and statensKartverk for norway.
 * See settings.ts for how this relationship works.
 */
export enum BaseMapLayer {
  openTopo = 'openTopo',
  arcGisOnline = 'arcGisOnline',
  statensKartverk = 'statensKartverk',
  geoDataLandskap = 'geoDataLandskap',
  npolarBasiskart = 'npolarBasiskart'
}