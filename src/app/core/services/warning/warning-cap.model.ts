import { CapFeedRssChannelItem } from '../../../modules/cap/models/cap-feed.model';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { CapAlert } from '../../../modules/cap/models/cap-alert.model';

export interface WarningCap extends CapFeedRssChannelItem {
    geoHazard: GeoHazard;
    timestamp: number;
    details?: CapAlert;
}
