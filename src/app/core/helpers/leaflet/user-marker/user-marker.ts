import { Subscription } from 'rxjs';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import MapView from '@arcgis/core/views/MapView';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { Point } from '@arcgis/core/geometry';
import Graphic from '@arcgis/core/Graphic';
import Circle  from '@arcgis/core/geometry/Circle';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
export class UserMarker {
  private positionGraphic: Graphic;
  private accuracyGraphic: Graphic;
  private headingSubscription: Subscription;
  private position: Geoposition;

  accuracyCircleStyle = {
    stroke: true,
    color: '#03f',
    weight: 3,
    opacity: 0.5,
    fillOpacity: 0.15,
    fillColor: '#03f',
    clickable: false
  };

  constructor(view: MapView, position: Geoposition) {
    this.position = position;
    //TODO: assign css class to symbol
    // this.userMarkerIcon = L.divIcon({
    //   className: 'leaflet-usermarker',
    //   iconSize: [18, 18],
    //   html: '<div class=\'heading\'></div><i class=\'pulse\'></i>'
    // });
    const positionSymbol = new SimpleMarkerSymbol({
      style: 'circle',
      color: '#4286f4',
      size: 14,
      outline: {
        color: 'white',
        width: 1
      }
    });
    const accuracySymbol = new SimpleMarkerSymbol({
      style: 'circle',
      size: "8px",
      color: [30, 144, 255, 0.2],
      outline: {
        color: 'white',
        width: 1
      }
    });

    const point = new Point({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    const circle = new Circle({
      center: point,
      radius: 100,
      radiusUnit: "meters"
    })

    const animatedGif = new PictureMarkerSymbol( {
      url: '/assets/bluedot-unscreen.gif',
      width: '80px',
      height: '80px'
    })

    this.positionGraphic = new Graphic({
      geometry: point,
      symbol: animatedGif
    });
    this.accuracyGraphic = new Graphic({
      geometry: circle,
      symbol: accuracySymbol
    });

    this.setAccuracy(position);
    view.graphics.add(this.positionGraphic);
  }

  getPosition(): Geoposition {
    return this.position;
  }

  updatePosition(position: Geoposition): void {
    const point = this.createPoint(position);
    this.positionGraphic.geometry = point;
    this.accuracyGraphic.geometry = point;
    this.setAccuracy(position);
    this.position = position;
    // if (position.coords.heading !== null) {
    //     this.setHeading(position.coords.heading);
    // }
    // NOTE: This is set by compass instead of gps
  }

  setHeading(degrees: number): void {
    //we try to do this without css
    const symbol = this.positionGraphic.symbol as SimpleMarkerSymbol;
    symbol.angle = degrees;

    // const element: HTMLElement = this.userMarker.getElement()
    //   .childNodes[0] as HTMLElement;
    // const rotateZ = degrees - 90;
    // element.style['-webkit-transform'] =
    //   'rotate(' + rotateZ + 'deg) translateX(15px)';
    // element.style.display = 'block';
  }

  private setAccuracy(position: Geoposition) {
    // TODO: Fix accuracy symbol
    // We should use a circle geometry with radius in metres.
    // A circle will auto scale while zooming in/out.
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Circle.html#radiusUnit
    const symbol = this.accuracyGraphic.symbol as SimpleMarkerSymbol;
    symbol.size = position.coords.accuracy * 2; //TODO: convert from meters to points
  }

  private createPoint(position: Geoposition): Point {
    return new Point({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }
}
