export interface OfflineTile {
    id: string;
    mapName: string;
    lastAccess: number;
    size: number;
    dataUrl: string;
    imageBlob: Blob;
}
