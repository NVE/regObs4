import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { ImageLocation } from './image-location.model';

export interface ImgSwiperSlide {
  type: 'location' | 'image';
  img: string | ImageLocation;
  header?: string;
  description?: string;
}
