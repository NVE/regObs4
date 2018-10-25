import { PictureRequestDto } from '../../../regobs-api/models';

export interface ISummaryItem {
    href: string;
    title: string;
    subTitle?: string;
    hasData?: boolean;
    images?: PictureRequestDto[];
}
