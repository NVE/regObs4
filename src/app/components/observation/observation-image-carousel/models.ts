import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';

interface CarouselItem<T extends string> {
  type: T;
}

export interface CarouselImageItem extends CarouselItem<'Attachment'> {
  data: AttachmentViewModel;
}

export type CarouselSnowProfile = CarouselItem<'SnowProfile'>;

export type CarouselItems = (CarouselSnowProfile | CarouselImageItem)[];
