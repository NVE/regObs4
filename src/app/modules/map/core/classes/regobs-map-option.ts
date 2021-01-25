export interface RegObsMapOption {
  name: string;
  url: string;
  isEmbedded?: boolean;
  embeddedUrl?: string;
  embeddedMinZoom?: number;
  embeddedMaxZoom?: number;
  validFunc?: (
    coords: L.Coords,
    bounds: L.LatLngBounds
  ) => boolean | Promise<boolean>;
}
