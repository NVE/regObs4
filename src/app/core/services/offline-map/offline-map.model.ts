export interface OfflineMap {
    name: string;
    url: string;
    size: number;
    filename: string;
    filePath?: string;
    progress?: number;
    downloaded?: number;
    downloadStart?: number;
    downloadComplete?: number;
}
