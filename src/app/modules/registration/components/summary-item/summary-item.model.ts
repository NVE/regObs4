import { PictureRequestDto } from '../../../regobs-api/models';

export interface ISummaryItem {
    id: number;
    href: string;
    queryParams?: any;
    title: string;
    subTitle?: string;
    hasData?: boolean;
    images?: PictureRequestDto[];
}
