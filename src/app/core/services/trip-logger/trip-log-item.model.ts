export interface TripLogItem {
    id?: number;
    latitude: number;
    longitude: number;
    timestamp: Date;
    altitude: number;
    speed: number;
    accuracy: number;
    heading: number;
}
