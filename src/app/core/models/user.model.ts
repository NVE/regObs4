import { ObserverGroup } from './observer-group.model';

export interface User {
    Id: number;
    Guid: string;
    Nick: string;
    ObserverGroup: Array<ObserverGroup>;
}
