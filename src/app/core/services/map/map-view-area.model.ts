import { MapView } from './map-view.model';

export interface MapViewArea extends MapView {
    regionInCenter: string;
    regionsInViewBounds: string[];
}
