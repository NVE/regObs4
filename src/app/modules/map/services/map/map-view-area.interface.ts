export interface IMapViewArea {
    /**
     * Region in current view center
     */
    regionInCenter: string;
    /**
     * Regions that is inside or intersects view bounds
     */
    regionsInViewBounds: string[];
    /**
     * Regions that is inside or intersects a buffer of 150 km from center
     */
    regionsInViewBuffer: string[];
}
