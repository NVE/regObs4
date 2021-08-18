export interface PackageMetadata {
    name: string;
    lastModified: string;
    xyz: number[];
    urls: string[];
    sizeInMib: number;
  }

  export interface PackageMetadataCombined {
    name: string;
    xyz: number[];
    sizeInMib: number;
    packages: PackageMetadata[];
  }