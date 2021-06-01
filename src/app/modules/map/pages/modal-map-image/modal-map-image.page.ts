import { Component, OnInit, Input } from '@angular/core';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { ModalController } from '@ionic/angular';
import { Point } from '@arcgis/core/geometry';
import Graphic from '@arcgis/core/Graphic';
import { MarkerHelper } from '../../../../core/helpers/arcgis/markerHelper';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { FeatureLayerType, MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-modal-map-image',
  templateUrl: './modal-map-image.page.html',
  styleUrls: ['./modal-map-image.page.scss']
})
export class ModalMapImagePage implements OnInit {
  @Input() location: { latLng: L.LatLng; geoHazard: GeoHazard };
  centerLocation: Point;
  private markerLayer = new GraphicsLayer({ id: 'MARKERS' });

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.centerLocation = new Point({
      latitude: this.location.latLng.lat,
      longitude: this.location.latLng.lng
    });
  }

  onMapReady(mapComponent: MapComponent) {
    const symbol = MarkerHelper.getGeoHazardSvg(this.location.geoHazard);
    const marker = new Graphic({
      geometry: this.centerLocation,
      symbol: symbol
    });
    this.markerLayer.add(marker);
    mapComponent.addFeatureLayer(this.markerLayer, FeatureLayerType.OBSERVATIONS);
  }

  close() {
    this.modalController.dismiss();
  }
}
