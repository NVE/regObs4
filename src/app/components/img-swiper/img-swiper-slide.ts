import { GeoHazard } from '../../core/models/geo-hazard.enum';

export interface ImgSwiperSlide {
    type: 'location' | 'image';
    img: string | { latLng: L.LatLng, geoHazard: GeoHazard };
    header?: string;
    description?: string;
}
