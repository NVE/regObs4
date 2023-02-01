import * as L from 'leaflet';
import { GeoHazard } from 'src/app/modules/common-core/models';

export class RegobsGeoHazardMarker extends L.DivIcon {
  constructor(geoHazard: GeoHazard) {
    super({
      html: RegobsGeoHazardMarker.getIconSvg(geoHazard),
      className: 'obs-marker',
      iconSize: [30, 40],
      iconAnchor: [15, 40],
    });
  }

  static getIconSvg(geoHazard: GeoHazard) {
    switch (geoHazard) {
      case GeoHazard.Snow:
        return this.getSnowSvg();
      case GeoHazard.Water:
        return this.getWaterSvg();
      case GeoHazard.Soil:
        return this.getDirtSvg();
      case GeoHazard.Ice:
        return this.getIceSvg();
      default:
        return '';
    }
  }

  static getDirtSvg() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="49" fill="none"><g filter="url(#a)"><ellipse cx="22.7" cy="30.7" fill="#222" fill-opacity=".5" rx="11.7" ry="5.6" transform="rotate(-22 22.7 30.7)"/></g><path fill="#fff" stroke="#6996A3" d="M16.2 36.7A66.2 66.2 0 0 0 23 27c1.2-2 2.3-4.1 3.2-6.4.8-2.2 1.3-4.3 1.3-6.1 0-3.6-1.3-6.7-3.8-9.2a12.6 12.6 0 0 0-9.2-3.8c-3.6 0-6.7 1.3-9.2 3.8a12.6 12.6 0 0 0-3.8 9.2c0 1.8.5 3.9 1.4 6.2a41.3 41.3 0 0 0 6.8 12 86 86 0 0 0 4.4 5.4l.4.4.4-.4 1.3-1.4Z"/><path fill="#735E2F" fill-rule="evenodd" d="m14.4 9-1.1-.6v-.8l.2-.5s-.1-.3.2-.6c.3-.3.7-.3.7-.3l1.2.4.4 1-.4.8-1.2.6Zm-5.2 9 2.5-1.3v-1.8l-.5-1s.3-.9-.3-1.6c-.7-.7-1.7-.5-1.7-.5l-2.4.8-1 2.3 1 1.8L9.2 18Zm6.2-4.6-1.7.7-1.5-1s-.2-.8 0-1.5c.3-.8 1-1 1.5-1h.4c.4 0 .6 0 .9.3.3.4.6 1 .6 1.5l-.2 1ZM19 7.8l2.2 1 .3 1.5c0 .6-.3 1.6-.8 2.2-.4.5-.7.4-1.2.4H19a2 2 0 0 1-2-1.4c-.4-1.2 0-2.3 0-2.3l2-1.4Zm.5 14-3.6 1.4-3-1.4-1.2-3.3 1.7-1.2s.5-1.3 1.1-1.8c.6-.5 2.2-1 2.2-1l3 1.2 1.4 3.2-1.2 1.3-.4 1.6Z" clip-rule="evenodd"/><defs><filter id="a" width="41.9" height="35.1" x="1.7" y="13.2" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur" stdDeviation="4"/></filter></defs></svg>';
  }

  static getIceSvg() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="49" fill="none"><g filter="url(#a)"><ellipse cx="22.7" cy="30.7" fill="#222" fill-opacity=".5" rx="11.7" ry="5.6" transform="rotate(-22 22.7 30.7)"/></g><path fill="#fff" stroke="#6996A3" d="M16.2 36.7A66.2 66.2 0 0 0 23 27c1.2-2 2.3-4.1 3.2-6.4.8-2.2 1.3-4.3 1.3-6.1 0-3.6-1.3-6.7-3.8-9.2a12.6 12.6 0 0 0-9.2-3.8c-3.6 0-6.7 1.3-9.2 3.8a12.6 12.6 0 0 0-3.8 9.2c0 1.8.5 3.9 1.4 6.2a41.3 41.3 0 0 0 6.8 12 86 86 0 0 0 4.4 5.4l.4.4.4-.4 1.3-1.4Z"/><path fill="#009FD4" fill-rule="evenodd" d="m9.5 16 1.2-5L12.3 22l1.6-10.7L16 27l2.3-16.3 1.4 5.3 2-6.8H7.8L9.5 16Z" clip-rule="evenodd"/><defs><filter id="a" width="41.9" height="35.1" x="1.7" y="13.2" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur" stdDeviation="4"/></filter></defs></svg>';
  }

  static getWaterSvg() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="49" fill="none"><g filter="url(#a)"><ellipse cx="22.7" cy="30.7" fill="#222" fill-opacity=".5" rx="11.7" ry="5.6" transform="rotate(-22 22.7 30.7)"/></g><path fill="#fff" stroke="#6996A3" d="M16.2 36.7A66.2 66.2 0 0 0 23 27c1.2-2 2.3-4.1 3.2-6.4.8-2.2 1.3-4.3 1.3-6.1 0-3.6-1.3-6.7-3.8-9.2a12.6 12.6 0 0 0-9.2-3.8c-3.6 0-6.7 1.3-9.2 3.8a12.6 12.6 0 0 0-3.8 9.2c0 1.8.5 3.9 1.4 6.2a41.3 41.3 0 0 0 6.8 12 86 86 0 0 0 4.4 5.4l.4.4.4-.4 1.3-1.4Z"/><path fill="#009FD4" fill-rule="evenodd" d="M21.9 12.9c.6.5 1.3 1.1 2.5 1.1v-1.8c-.6 0-1-.3-1.4-.7-.6-.6-1.3-1.1-2.5-1.1-1.3 0-2 .6-2.5 1-.5.5-.8.8-1.5.8s-1-.3-1.5-.7a3.4 3.4 0 0 0-2.5-1.1c-1.3 0-2 .6-2.5 1-.5.5-.8.8-1.5.8s-1-.3-1.4-.7a3.6 3.6 0 0 0-2.5-1.1v1.8c.5 0 1 .3 1.4.7.6.5 1.2 1.1 2.5 1.1s2-.6 2.5-1c.5-.5.8-.8 1.5-.8s1 .3 1.5.7c.5.5 1.2 1.1 2.5 1.1s2-.6 2.5-1c.5-.5.8-.8 1.5-.8.6 0 1 .3 1.4.7Zm0 4.4c.6.5 1.3 1.1 2.5 1.1v-1.9c-.6 0-1-.3-1.4-.7-.6-.5-1.3-1-2.5-1-1.3 0-2 .5-2.5 1-.5.4-.8.7-1.5.7s-1-.3-1.5-.7a3.4 3.4 0 0 0-2.5-1c-1.3 0-2 .5-2.5 1-.5.4-.8.7-1.5.7s-1-.3-1.4-.7a3.6 3.6 0 0 0-2.5-1v1.8c.5 0 1 .3 1.4.7.6.5 1.2 1.1 2.5 1.1s2-.6 2.5-1.1c.5-.4.8-.7 1.5-.7s1 .3 1.5.7c.5.5 1.2 1.1 2.5 1.1s2-.6 2.5-1.1c.5-.4.8-.7 1.5-.7.6 0 1 .3 1.4.6Z" clip-rule="evenodd"/><defs><filter id="a" width="41.9" height="35.1" x="1.7" y="13.2" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur" stdDeviation="4"/></filter></defs></svg>';
  }

  static getSnowSvg() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="49" fill="none"><g filter="url(#a)"><ellipse cx="22.7" cy="30.7" fill="#222" fill-opacity=".5" rx="11.7" ry="5.6" transform="rotate(-22 22.7 30.7)"/></g><path fill="#fff" stroke="#6996A3" d="M16.2 36.7A66.2 66.2 0 0 0 23 27c1.2-2 2.3-4.1 3.2-6.4.8-2.2 1.3-4.3 1.3-6.1 0-3.6-1.3-6.7-3.8-9.2a12.6 12.6 0 0 0-9.2-3.8c-3.6 0-6.7 1.3-9.2 3.8a12.6 12.6 0 0 0-3.8 9.2c0 1.8.5 3.9 1.4 6.2a41.3 41.3 0 0 0 6.8 12 86 86 0 0 0 4.4 5.4l.4.4.4-.4 1.3-1.4Z"/><path fill="#009FD4" fill-rule="evenodd" d="m21.3 16.5-1.6.3 1.7 1c.2 0 .3.1.3.3v.4l-.4.2h-.4l-1.8-1 .5 1.5v.5c-.2.2-.4.2-.6.2a.5.5 0 0 1-.5-.4l-1-2.6-2.4-1.4v2.8l2 2v.8l-.3.2h-.3c-.2 0-.3 0-.4-.2l-1-1.1v1.9c0 .2 0 .3-.2.4l-.4.2c-.2 0-.3 0-.4-.2a.5.5 0 0 1-.2-.4V20l-1 1.1-.4.2h-.3a.9.9 0 0 1-.3-.2v-.7l2-2.1v-2.8l-2.5 1.4-1 2.6c0 .3-.2.4-.4.4s-.4 0-.5-.2c-.2-.1-.2-.3-.1-.5l.5-1.5-1.8 1h-.4a.6.6 0 0 1-.4-.2V18c0-.2.1-.3.3-.4l1.7-1-1.6-.2a.6.6 0 0 1-.5-.7l.3-.4H8l2.8.5 2.5-1.4-2.5-1.4-2.8.6h-.2c-.1 0-.3 0-.4-.2a.6.6 0 0 1-.1-.4v-.3c.1-.2.3-.2.4-.3l1.6-.3-1.7-1a.5.5 0 0 1-.3-.3v-.4l.4-.3.4.1 1.8 1-.5-1.5v-.5c.2-.2.4-.3.6-.2.2 0 .4.1.5.4l1 2.6 2.4 1.4v-2.8l-2-2a.5.5 0 0 1 0-.4v-.4l.3-.2h.3c.2 0 .3 0 .4.2l1 1.1V7s0-.2.2-.3l.4-.2c.2 0 .3 0 .4.2l.2.4V9l1-1.1.4-.2h.3l.3.2v.7l-2 2.1v2.8l2.5-1.4 1-2.6c0-.3.2-.4.4-.4s.4 0 .5.2c.2.1.2.3.1.5l-.5 1.5 1.8-1h.4c.2 0 .3 0 .4.2v.4c0 .2-.1.3-.3.4l-1.7 1 1.6.2c.1 0 .3.1.3.3.1 0 .2.2.1.3a.6.6 0 0 1-.5.6H21l-2.8-.6-2.5 1.4 2.5 1.4 2.8-.6.5.1.2.4a.6.6 0 0 1-.4.7Z" clip-rule="evenodd"/><defs><filter id="a" width="41.9" height="35.1" x="1.7" y="13.2" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur" stdDeviation="4"/></filter></defs></svg>';
  }
}
