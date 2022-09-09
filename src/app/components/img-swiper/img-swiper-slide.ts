import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';
import { ImageLocation } from './image-location.model';

export interface ImgSwiperSlide {
  type: 'location' | 'image';
  img: AttachmentViewModel | ImageLocation;
  header?: string;
  description?: string;
}
